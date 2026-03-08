import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Accugeo - Corrosion Materials and Testing Center',
  description: 'Professional corrosion testing and materials services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/sansation" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Sansation, sans-serif' }}>{children}</body>
    </html>
  )
}
