import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Types from our app that we'll use in tests
export interface UserSession {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string;
  };
  status: 'authenticated' | 'loading' | 'unauthenticated';
}

export interface ReferralLink {
  id: string;
  name: string;
  url: string;
  shortCode: string;
  customSlug?: string;
  description?: string;
  clickCount: number;
  conversionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralLimitInfo {
  canCreate: boolean;
  currentCount: number;
  maxLinks: number;
}

export type ThemeOption = 'default' | 'sunset' | 'forest' | 'midnight';

// Mock the useSession hook
export const mockUseSession = (session: UserSession | null) => {
  jest.mock('next-auth/react', () => ({
    useSession: jest.fn(() => session),
    signIn: jest.fn(),
    signOut: jest.fn(),
    getSession: jest.fn(),
  }));
};

// Mock fetch for different API responses
export const mockFetchReferrals = (referrals: ReferralLink[], limitInfo: ReferralLimitInfo) => {
  global.fetch = jest.fn().mockImplementation((url) => {
    if (url === '/api/referral-links') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          links: referrals,
          limitInfo 
        }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
  }) as jest.Mock;
};

// Mock fetch for API errors
export const mockFetchError = (errorMessage: string) => {
  global.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: errorMessage }),
    });
  }) as jest.Mock;
};

// Custom render for testing with providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { ...options });

export * from '@testing-library/react';
export { customRender as render };
