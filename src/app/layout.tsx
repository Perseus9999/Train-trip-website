import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

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
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
