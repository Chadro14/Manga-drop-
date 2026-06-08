// app/page.tsx

const LogoMD = () => (
  <svg width="70" height="70" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
)

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section - fond bleu avec dégradé léger */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Motif de fond discret */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl">
              <LogoMD />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Publiez votre manga
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Une plateforme dédiée aux créateurs amateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <BrushIcon />
              Je suis créateur
            </a>
            <a href="/register" className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-400 shadow-lg transition-all duration-300">
              <BookIcon />
              Je lis des mangas
            </a>
          </div>
        </div>
      </div>

      {/* Section Mangas populaires */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4">
            Mangas populaires
          </h2>
          <a href="/search" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition">
            Voir tout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Titre manga</h3>
                <p className="text-sm text-gray-500 mb-2">Auteur</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span className="text-xs text-gray-500">4.5</span>
                  </div>
                  <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-700 transition">
                    Lire →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section créateurs - fond gris clair */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm mb-6">
              <BrushIcon />
              <span>Créateurs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Vous dessinez ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Publiez vos œuvres gratuitement. Suivez vos statistiques et recevez des pourboires.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-blue-600 text-2xl mb-2">📄</div>
                <h3 className="font-semibold text-gray-800">Upload facile</h3>
                <p className="text-sm text-gray-500">Glissez vos planches</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-blue-600 text-2xl mb-2">💰</div>
                <h3 className="font-semibold text-gray-800">Gagnez de l'argent</h3>
                <p className="text-sm text-gray-500">Pourboires et abonnements</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-blue-600 text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-800">Statistiques</h3>
                <p className="text-sm text-gray-500">Analysez votre audience</p>
              </div>
            </div>
            <a href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <BrushIcon />
              Commencer à publier
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}