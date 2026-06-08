// app/page.tsx

const LogoMD = () => (
  <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#2563EB"/>
    <path d="M12 28L16 12H24L28 28L24 26L20 18L16 26L12 28Z" fill="white"/>
    <rect x="18" y="14" width="4" height="6" fill="white"/>
  </svg>
)

const BrushIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21L7 17M7 17L5 15L9 11L13 15L11 17L7 17ZM7 17L3 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 5L19 9M19 9L21 7L17 3L15 5L19 9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L14 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 4V20" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 4V20" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Fond bleu simple */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <LogoMD />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Publiez votre manga
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Une plateforme dédiée aux créateurs amateurs.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              <BrushIcon />
              Je suis créateur
            </a>
            <a href="/register" className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400">
              <BookIcon />
              Je lis des mangas
            </a>
          </div>
        </div>
      </div>

      {/* Section Mangas populaires */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Mangas populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-[3/4] bg-gray-200"></div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800">Titre manga</h3>
                <p className="text-sm text-gray-500">Auteur</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section créateurs */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vous dessinez ?</h2>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
            Publiez vos œuvres gratuitement. Suivez vos statistiques et recevez des pourboires.
          </p>
          <a href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
            <BrushIcon />
            Commencer à publier
          </a>
        </div>
      </div>
    </div>
  )
}