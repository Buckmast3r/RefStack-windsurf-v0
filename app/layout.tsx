import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import MarketingLayout from "@/app/marketing/layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "RefStack - Manage Your Referrals",
  description: "A platform to manage and share your referral links",
  generator: 'v0.dev',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'RefStack - Manage Your Referrals',
    description: 'A platform to manage and share your referral links',
    url: '/',
    siteName: 'RefStack',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RefStack - Manage Your Referrals',
    description: 'A platform to manage and share your referral links',
    creator: '@refstack',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MarketingLayout>
            {children}
          </MarketingLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
