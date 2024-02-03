import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import classNames from 'classnames'

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
      <body className={classNames(inter.className, 'bg-zinc-50')}>{children}</body>
    </html>
  )
}
