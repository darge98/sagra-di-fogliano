import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'

const _playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})
const _lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'Sagra di Fogliano | Reggio Emilia',
  description:
    'Scopri la Sagra di Fogliano: eventi, gastronomia, musica e sport nel cuore di Reggio Emilia. Iscriviti agli eventi sportivi!',
}

export const viewport: Viewport = {
  themeColor: '#3a7d44',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${_playfair.variable} ${_lato.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
