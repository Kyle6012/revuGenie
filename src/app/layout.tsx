import type { Metadata } from 'next'
import { Inter, Urbanist } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const urbanist = Urbanist({ 
  subsets: ['latin'],
  variable: '--font-urbanist',
})

export const metadata: Metadata = {
  title: 'RevuGenie - AI-Powered Review Management',
  description: 'Let AI handle your reputation. Automate customer review management, responses, and analytics for local businesses.',
  keywords: ['review management', 'AI responses', 'reputation management', 'customer reviews', 'business analytics'],
  authors: [{ name: 'RevuGenie Team' }],
  creator: 'RevuGenie',
  publisher: 'RevuGenie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.APP_URL || 'http://localhost:3000',
    title: 'RevuGenie - AI-Powered Review Management',
    description: 'Let AI handle your reputation. Automate customer review management, responses, and analytics for local businesses.',
    siteName: 'RevuGenie',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RevuGenie - AI-Powered Review Management',
    description: 'Let AI handle your reputation. Automate customer review management, responses, and analytics for local businesses.',
    creator: '@revugenie',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${urbanist.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}