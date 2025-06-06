import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import RegisterPage from '@/app/register/page'

// Mock the toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// Mock next-auth signIn
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: jest.fn(() => ({ 
    data: null, 
    status: 'unauthenticated' 
  })),
}))

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset fetch mock
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock
  })

  test('renders the register form', () => {
    render(<RegisterPage />)
    
    expect(screen.getByText(/create your account/i)).toBeInTheDocument()
    // Look for input fields by their ID instead of label text
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument()
    // Find password fields by placeholder
    expect(screen.getAllByPlaceholderText(/••••••••/i)[0]).toBeInTheDocument() // Password
    expect(screen.getAllByPlaceholderText(/••••••••/i)[1]).toBeInTheDocument() // Confirm password
    expect(screen.getByRole('checkbox', { name: /I agree to the/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  test('displays validation errors when form is submitted with empty fields', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    // Look for the actual error messages from the component
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/you must accept the terms/i)).toBeInTheDocument()
  })

  test('displays error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'test@example.com')
    const passwordFields = screen.getAllByPlaceholderText(/••••••••/i)
    await user.type(passwordFields[0], 'password123')
    await user.type(passwordFields[1], 'password456')
    await user.click(screen.getByRole('checkbox', { name: /I agree to the/i }))
    
    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument()
  })

  test('displays error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'invalid-email')
    const passwordFields = screen.getAllByPlaceholderText(/••••••••/i)
    await user.type(passwordFields[0], 'password123')
    await user.type(passwordFields[1], 'password123')
    await user.click(screen.getByRole('checkbox', { name: /I agree to the/i }))
    
    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    expect(await screen.findByText(/email is invalid/i)).toBeInTheDocument()
  })

  test('successful registration submits form data and signs in user', async () => {
    const mockSignIn = signIn as jest.Mock
    mockSignIn.mockResolvedValue({ error: null })
    
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'test@example.com')
    const passwordFields = screen.getAllByPlaceholderText(/••••••••/i)
    await user.type(passwordFields[0], 'password123')
    await user.type(passwordFields[1], 'password123')
    await user.click(screen.getByRole('checkbox', { name: /I agree to the/i }))
    
    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    await waitFor(() => {
      // Check that fetch was called with the right parameters
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        }),
      })
      
      // Check that signIn was called after successful registration
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
        callbackUrl: '/dashboard',
      })
    })
  })

  test('handles registration API error', async () => {
    // Mock fetch to return an error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Email already exists' }),
      })
    ) as jest.Mock
    
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'test@example.com')
    const passwordFields = screen.getAllByPlaceholderText(/••••••••/i)
    await user.type(passwordFields[0], 'password123')
    await user.type(passwordFields[1], 'password123')
    await user.click(screen.getByRole('checkbox', { name: /I agree to the/i }))
    
    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Email already exists'))
    })
  })
})
