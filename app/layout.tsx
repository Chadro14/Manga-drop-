// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manga Drop - Publiez et lisez des mangas amateurs',
  description: 'Plateforme de publication de mangas pour créateurs amateurs',
}

// Logo SVG (à garder ou remplacer par votre image)
const LogoMD = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#2563EB"/>
    <path d="M12 28L16 12H24L28 28L24 26L20 18L16 26L12 28Z" fill="white"/>
    <rect x="18" y="14" width="4" height="6" fill="white"/>
  </svg>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogoMD />
              <span className="font-bold text-xl text-gray-900">Manga<span className="text-blue-600">Drop</span></span>
            </div>
            <nav className="flex gap-6">
              <a href="/" className="text-gray-600 hover:text-blue-600">Accueil</a>
              <a href="/search" className="text-gray-600 hover:text-blue-600">Explorer</a>
              <a href="/login" className="text-blue-600 hover:text-blue-700">Connexion</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* FOOTER À METTRE ICI */}
        <footer className="bg-white border-t border-gray-200 mt-20 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <LogoMD />
                <span className="font-bold text-gray-900">Manga<span className="text-blue-600">Drop</span></span>
              </div>
              <p className="text-gray-500 text-sm text-center">
                © 2024 Manga Drop - Tous droits réservés
              </p>
              <p className="text-gray-400 text-xs text-center">
                Plateforme de publication de mangas pour créateurs amateurs
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}