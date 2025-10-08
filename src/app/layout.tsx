import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Safe Space Finder',
  description: 'Find inclusive and accessible spaces for everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
