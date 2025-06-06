import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import ReferralsPage from '@/app/dashboard/referrals/page'

// Mock the toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}))

// Mock data for testing
const mockReferralLinks = [
  {
    id: '1',
    name: 'Test Referral 1',
    url: 'https://example.com/test1',
    shortCode: 'abc123',
    customSlug: 'my-test-link',
    description: 'Test description 1',
    clickCount: 10,
    conversionCount: 2,
    createdAt: '2025-05-01T00:00:00.000Z',
    updatedAt: '2025-05-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Test Referral 2',
    url: 'https://example.com/test2',
    shortCode: 'def456',
    customSlug: '',
    description: '',
    clickCount: 5,
    conversionCount: 1,
    createdAt: '2025-05-02T00:00:00.000Z',
    updatedAt: '2025-05-02T00:00:00.000Z',
  },
]

describe('ReferralsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock fetch to return referral links
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === '/api/referral-links') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            links: mockReferralLinks,
            limitInfo: { canCreate: true, currentCount: 2, maxLinks: 5 }
          }),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    })

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    })

    // Mock window.location
    delete window.location
    window.location = {
      origin: 'https://refstack.me',
      ...window.location,
    }
  })

  test('renders the referrals page with referral links', async () => {
    render(<ReferralsPage />)
    
    // Check that the page title is rendered
    expect(screen.getByText(/referral links/i)).toBeInTheDocument()
    
    // Check that the create button is rendered
    expect(screen.getByText(/create referral link/i)).toBeInTheDocument()
    
    // Wait for referral links to be loaded
    await waitFor(() => {
      expect(screen.getByText('Test Referral 1')).toBeInTheDocument()
      expect(screen.getByText('Test Referral 2')).toBeInTheDocument()
    })
  })

  test('opens create dialog when create button is clicked', async () => {
    const user = userEvent.setup()
    render(<ReferralsPage />)
    
    // Click the create button
    const createButton = screen.getByText(/create referral link/i)
    await user.click(createButton)
    
    // Check that the create dialog is rendered
    expect(screen.getByText(/create new referral link/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/custom slug/i)).toBeInTheDocument()
  })

  test('validates form input in create dialog', async () => {
    const user = userEvent.setup()
    render(<ReferralsPage />)
    
    // Open create dialog
    const createButton = screen.getByText(/create referral link/i)
    await user.click(createButton)
    
    // Submit without required fields
    const submitButton = screen.getByRole('button', { name: /create link/i })
    await user.click(submitButton)
    
    // Check for validation errors
    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
  })

  test('creates a new referral link', async () => {
    // Mock successful API response
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (url === '/api/referral-links' && options?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: '3',
            name: 'New Test Referral',
            url: 'https://example.com/new',
            shortCode: 'ghi789',
          }),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          links: mockReferralLinks,
          limitInfo: { canCreate: true, currentCount: 2, maxLinks: 5 }
        }),
      })
    })
    
    const user = userEvent.setup()
    render(<ReferralsPage />)
    
    // Open create dialog
    const createButton = screen.getByText(/create referral link/i)
    await user.click(createButton)
    
    // Fill in form fields
    await user.type(screen.getByLabelText(/name/i), 'New Test Referral')
    await user.type(screen.getByLabelText(/description/i), 'New test description')
    await user.type(screen.getByLabelText(/custom slug/i), 'new-test-link')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /create link/i })
    await user.click(submitButton)
    
    // Check that API was called with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/referral-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Test Referral',
          url: expect.any(String),
          description: 'New test description',
          customSlug: 'new-test-link',
        }),
      })
      
      // Check that success toast was shown
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('created'))
    })
  })

  test('opens edit dialog when edit button is clicked', async () => {
    const user = userEvent.setup()
    render(<ReferralsPage />)
    
    // Wait for referral links to be loaded
    await waitFor(() => {
      expect(screen.getByText('Test Referral 1')).toBeInTheDocument()
    })
    
    // Find and click the edit button (usually in a dropdown)
    const actionsButtons = screen.getAllByLabelText(/actions/i)
    await user.click(actionsButtons[0])
    
    // Click edit in dropdown
    const editButton = screen.getByText(/edit/i)
    await user.click(editButton)
    
    // Check that edit dialog is rendered with prefilled data
    expect(screen.getByText(/edit referral link/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Referral 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test description 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('my-test-link')).toBeInTheDocument()
  })

  test('edits an existing referral link', async () => {
    // Mock successful API response for PATCH
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (url === '/api/referral-links' && options?.method === 'PATCH') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: '1',
            name: 'Updated Test Referral',
            url: 'https://example.com/test1',
            shortCode: 'abc123',
            customSlug: 'updated-test-link',
          }),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          links: mockReferralLinks,
          limitInfo: { canCreate: true, currentCount: 2, maxLinks: 5 }
        }),
      })
    })
    
    const user = userEvent.setup()
    render(<ReferralsPage />)
    
    // Wait for referral links to be loaded
    await waitFor(() => {
      expect(screen.getByText('Test Referral 1')).toBeInTheDocument()
    })
    
    // Find and click the edit button
    const actionsButtons = screen.getAllByLabelText(/actions/i)
    await user.click(actionsButtons[0])
    
    // Click edit in dropdown
    const editButton = screen.getByText(/edit/i)
    await user.click(editButton)
    
    // Update form fields
    const nameInput = screen.getByDisplayValue('Test Referral 1')
    await user.clear(nameInput)
    await user.type(nameInput, 'Updated Test Referral')
    
    const slugInput = screen.getByDisplayValue('my-test-link')
    await user.clear(slugInput)
    await user.type(slugInput, 'updated-test-link')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(submitButton)
    
    // Check that API was called with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/referral-links', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '1',
          name: 'Updated Test Referral',
          url: expect.any(String),
          description: 'Test description 1',
          customSlug: 'updated-test-link',
        }),
      })
      
      // Check that success toast was shown
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('updated'))
    })
  })

  test('deletes a referral link when delete is confirmed', async () => {
    // Mock successful API response for DELETE
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (url.includes('/api/referral-links?id=1') && options?.method === 'DELETE') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          links: mockReferralLinks,
          limitInfo: { canCreate: true, currentCount: 2, maxLinks: 5 }
        }),
      })
    })
    
    const user = userEvent.setup()
    render(<ReferralsPage />)
    
    // Wait for referral links to be loaded
    await waitFor(() => {
      expect(screen.getByText('Test Referral 1')).toBeInTheDocument()
    })
    
    // Find and click the delete button
    const actionsButtons = screen.getAllByLabelText(/actions/i)
    await user.click(actionsButtons[0])
    
    // Click delete in dropdown
    const deleteButton = screen.getByText(/delete/i)
    await user.click(deleteButton)
    
    // Confirm deletion in dialog
    expect(screen.getByText(/delete referral link/i)).toBeInTheDocument()
    const confirmButton = screen.getByRole('button', { name: /delete link/i })
    await user.click(confirmButton)
    
    // Check that API was called with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/referral-links?id=1', {
        method: 'DELETE',
      })
      
      // Check that success toast was shown
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('deleted'))
    })
  })

  test('copies referral link to clipboard', async () => {
    const user = userEvent.setup()
    render(<ReferralsPage />)
    
    // Wait for referral links to be loaded
    await waitFor(() => {
      expect(screen.getByText('Test Referral 1')).toBeInTheDocument()
    })
    
    // Find and click the copy button
    const copyButtons = screen.getAllByLabelText(/copy link/i)
    await user.click(copyButtons[0])
    
    // Check that clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://refstack.me/r/my-test-link')
    
    // Check that success toast was shown
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('copied'))
  })

  test('handles API error when fetching referral links', async () => {
    // Mock API error
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to fetch referral links' }),
      })
    })
    
    render(<ReferralsPage />)
    
    // Check that error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Failed to load'))
    })
  })
})
