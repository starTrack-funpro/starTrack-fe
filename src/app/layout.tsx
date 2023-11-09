import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LayoutModule } from '@modules'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'starTrack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutModule>{children}</LayoutModule>
      </body>
    </html>
  )
}
