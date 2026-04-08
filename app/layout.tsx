import type { Metadata } from 'next'
import './globals.css'
import { cn } from "@/lib/utils";

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
    <html lang="en" className={cn("font-sans")}>
      <head>
        <link href="https://fonts.cdnfonts.com/css/sansation" rel="stylesheet" />
      </head>
      <body>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
