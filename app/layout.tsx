export const metadata = {
  title: 'Manga Drop',
  description: 'Plateforme de mangas amateurs',
}

const LogoMD = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#2563EB"/>
    <path d="M12 28L16 12H24L28 28L24 26L20 18L16 26L12 28Z" fill="white"/>
    <rect x="18" y="14" width="4" height="6" fill="white"/>
  </svg>
)

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogoMD />
              <span className="font-bold text-xl text-gray-900">Manga<span className="text-blue-600">Drop</span></span>
            </div>
            <nav className="flex gap-6">
              <a href="/" className="text-gray-600 hover:text-blue-600">Accueil</a>
              <a href="/register" className="text-gray-600 hover:text-blue-600">Inscription</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-20 py-8 text-center text-gray-500">
          © 2024 Manga Drop
        </footer>
      </body>
    </html>
  )
}