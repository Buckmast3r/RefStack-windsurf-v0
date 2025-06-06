// jest.setup.js
import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { user: { id: 'test-user-id', name: 'Test User', email: 'test@example.com' } },
    status: 'authenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}))

// Mock window.fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
  })
)

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}))

// Add local storage mock
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

// Add window.matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Add resize observer mock
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
