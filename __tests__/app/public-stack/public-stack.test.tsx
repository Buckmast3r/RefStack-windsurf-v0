import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PublicStackPage from '@/app/public-stack/page'
import '@testing-library/jest-dom'

// Define interfaces for our test data using union types (like in the codebase)
interface PublicReferral {
  id: string;
  name: string;
  category: string;
  url: string;
  clicks: number;
  conversions: number;
  status: 'active' | 'inactive';
  dateCreated: string;
  logoColor: string;
  includeInPublicStack: boolean;
  displayOrder: number;
}

// Mock data for testing
const mockPublicReferrals: PublicReferral[] = [
  {
    id: '1',
    name: 'Dropbox',
    category: 'Tech',
    url: 'https://refstack.me/dropbox',
    clicks: 12,
    conversions: 2,
    status: 'active',
    dateCreated: '2025-04-15',
    logoColor: 'bg-blue-500',
    includeInPublicStack: true,
    displayOrder: 1,
  },
  {
    id: '2',
    name: 'Coinbase',
    category: 'Crypto',
    url: 'https://refstack.me/coinbase',
    clicks: 34,
    conversions: 5,
    status: 'active',
    dateCreated: '2025-04-10',
    logoColor: 'bg-blue-500',
    includeInPublicStack: true,
    displayOrder: 2,
  },
]

// Mock window.open
window.open = jest.fn() as jest.Mock

// Setup mock for window.location
const originalLocation = window.location
const mockLocation = {
  origin: 'https://refstack.me',
};

describe('PublicStackPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock window.location
    // @ts-ignore - TypeScript doesn't like us redefining window.location
    delete window.location;
    // @ts-ignore
    window.location = { ...originalLocation, ...mockLocation }
  })

  test('renders the public stack page with user profile and referrals', () => {
    render(<PublicStackPage />)
    
    // Check that profile section is rendered
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument()
    
    // Check that stats section is rendered
    expect(screen.getByText(/total clicks/i)).toBeInTheDocument()
    expect(screen.getByText(/conversions/i)).toBeInTheDocument()
    expect(screen.getByText(/active links/i)).toBeInTheDocument()
    
    // Check that referral stack section is rendered
    expect(screen.getByText(/my referral stack/i)).toBeInTheDocument()
    
    // Check that referral cards are rendered
    expect(screen.getByText(/dropbox/i)).toBeInTheDocument()
    expect(screen.getByText(/coinbase/i)).toBeInTheDocument()
  })

  test('allows theme switching', async () => {
    const user = userEvent.setup()
    render(<PublicStackPage />)
    
    // Find theme buttons
    const themeButtons = screen.getAllByLabelText(/theme/i)
    
    // Default theme should be 'default' (Ocean Blue)
    expect(screen.getByText(/ocean blue/i)).toBeInTheDocument()
    
    // Click on Sunset theme
    await user.click(themeButtons[1])
    
    // Check that theme changed
    expect(screen.getByText(/sunset glow/i)).toBeInTheDocument()
    
    // Click on Forest theme
    await user.click(themeButtons[2])
    
    // Check that theme changed
    expect(screen.getByText(/forest green/i)).toBeInTheDocument()
    
    // Click on Midnight theme
    await user.click(themeButtons[3])
    
    // Check that theme changed
    expect(screen.getByText(/midnight purple/i)).toBeInTheDocument()
  })

  test('navigates to register page when CTA button is clicked', async () => {
    const user = userEvent.setup()
    render(<PublicStackPage />)
    
    // Find CTA button
    const ctaButton = screen.getByRole('button', { name: /build your own referral stack/i })
    
    // Click CTA button
    await user.click(ctaButton)
    
    // Check that window.open was called with correct URL
    expect(window.open).toHaveBeenCalledWith('/register', '_blank')
  })

  test('referral cards display correctly with proper ordering', () => {
    render(<PublicStackPage />)
    
    // Check that referral cards are rendered in the correct order with order indicators
    const orderIndicators = screen.getAllByText(/1|2/)
    
    // First card should have order indicator 1
    expect(orderIndicators[0]).toHaveTextContent('1')
    
    // Second card should have order indicator 2
    expect(orderIndicators[1]).toHaveTextContent('2')
    
    // Check that referral cards have the correct company names
    const referralCards = screen.getAllByText(/dropbox|coinbase/i)
    expect(referralCards[0]).toHaveTextContent('Dropbox')
    expect(referralCards[1]).toHaveTextContent('Coinbase')
  })

  test('calculates and displays correct statistics', () => {
    render(<PublicStackPage />)
    
    // Check total clicks (12 + 34 = 46)
    expect(screen.getByText('46')).toBeInTheDocument()
    
    // Check conversions (2 + 5 = 7)
    expect(screen.getByText('7')).toBeInTheDocument()
    
    // Check active links (2)
    expect(screen.getByText('2', { selector: '.text-2xl, .text-3xl' })).toBeInTheDocument()
    
    // Check average clicks per link (46 / 2 = 23)
    expect(screen.getByText('23')).toBeInTheDocument()
  })

  test('displays profile social links', () => {
    render(<PublicStackPage />)
    
    // Check that social links are rendered
    const socialLinks = screen.getAllByLabelText(/social/i)
    expect(socialLinks).toHaveLength(3) // Twitter, GitHub, LinkedIn
    
    // Check that links have the correct URLs
    expect(socialLinks[0]).toHaveAttribute('href', expect.stringContaining('twitter.com'))
    expect(socialLinks[1]).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(socialLinks[2]).toHaveAttribute('href', expect.stringContaining('linkedin.com'))
  })

  test('displays the "Powered by RefStack.me" footer', () => {
    render(<PublicStackPage />)
    
    // Check that footer is rendered
    expect(screen.getByText(/powered by/i)).toBeInTheDocument()
    expect(screen.getByText(/refstack.me/i)).toBeInTheDocument()
    
    // Check that the pro tip is displayed
    expect(screen.getByText(/pro tip/i)).toBeInTheDocument()
    expect(
      screen.getByText(/using my referral links helps support my content creation/i)
    ).toBeInTheDocument()
  })
})
