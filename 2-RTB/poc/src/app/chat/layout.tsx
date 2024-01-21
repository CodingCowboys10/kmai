import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import 'typeface-roboto';
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KMAI | Chat',
  description: 'Capitolato 1 - IS 2023/2024',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
