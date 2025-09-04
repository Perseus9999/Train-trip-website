import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from "@/src/components/theme-provider"
import { Suspense } from "react"
import './globals.css'
import Footer from '../components/footer'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Book Train Travel With Crypto',
  description: 'Created by God',
  generator: 'God',
  applicationName: 'Train Trip',
  authors: [{ name: 'God'}],
  keywords: ['Train Trip', 'Next.js', 'React', 'Tailwind CSS', 'Geist UI'],
  icons: './favicon.png',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en"
      className='light'
      style={{colorScheme: "light"}}
    >
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="bottom-center" richColors />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
