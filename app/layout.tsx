import { Metadata } from 'next'
import './globals.css'

import NavBar from '@/components/NavBar'
import { exo_2, orbitron } from './fonts'

export const metadata: Metadata = {
  title: {
    default: 'Indie Gamer',
    template: '%s | Indie Gamer'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${exo_2.variable} ${orbitron.variable}`}>
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="border-t py-3 text-center text-xs">
          Game data and images courtesy of{' '}
          <a href="https://rawg.io" target="_blank" className="text-orange-800 hover:underline">
            RAWG
          </a>
        </footer>
      </body>
    </html>
  )
}
