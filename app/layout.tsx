import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link href="https://fonts.cdnfonts.com/css/sansation" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Sansation, sans-serif' }}>
        <main className="pt-40">{children}</main>
      </body>
    </html>
  )
}
