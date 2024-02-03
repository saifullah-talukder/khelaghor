import BlurredBackground from '@/components/global/BlurredBackground'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wheel of time',
  description: `Just Saifullah fanboying over Robert Jordan's Masterpiece`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/wot-favicon.ico" />
      </head>

      <body className={inter.className}>
        <main className="relative min-h-screen w-full bg-white">
          <BlurredBackground />
          <div className="relative">{children}</div>
        </main>
      </body>
    </html>
  )
}
