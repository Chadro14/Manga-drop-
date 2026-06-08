// app/page.tsx

const LogoMD = () => (
  <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#1E40AF"/>
    <path d="M12 28L16 12H24L28 28L24 26L20 18L16 26L12 28Z" fill="white"/>
    <rect x="18" y="14" width="4" height="6" fill="white"/>
  </svg>
)

const BrushIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21L7 17M7 17L5 15L9 11L13 15L11 17L7 17ZM7 17L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 5L19 9M19 9L21 7L17 3L15 5L19 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 4V20" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 4V20" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function HomePage() {
  return (
    <div>
      {/* Hero Section - Dégradé élégant */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              <LogoMD />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Publiez votre manga
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Une plateforme dédiée aux créateurs amateurs. Publiez vos planches, 
            fidélisez votre communauté et soyez récompensé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 shadow-xl transition-all hover:scale-105">
              <BrushIcon />
              Je suis créateur
            </a>
            <a href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 shadow-xl transition-all hover:scale-105">
              <BookIcon />
              Je lis des mangas
            </a>
          </div>
        </div>
      </div>

      {/* Section Mangas populaires */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 border-l-4 border-blue-600 pl-4">
            Mangas populaires
          </h2>
          <a href="/search" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition">
            Voir tout
            <ArrowRight />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 mb-1">Titre du manga</h3>
                <p className="text-sm text-slate-500 mb-2">Nom de l'auteur</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span className="text-xs text-slate-500">4.8</span>
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

      {/* Section pour les créateurs - Carte premium */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm mb-6">
              <BrushIcon />
              <span>Créateurs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Vous dessinez ?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Publiez vos œuvres gratuitement. Suivez vos statistiques, recevez des pourboires
              et construisez votre communauté de lecteurs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="text-blue-600 mb-3">📄</div>
                <h3 className="font-semibold text-slate-800 mb-1">Upload facile</h3>
                <p className="text-sm text-slate-500">Glissez vos planches, organisez vos chapitres</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="text-blue-600 mb-3">💰</div>
                <h3 className="font-semibold text-slate-800 mb-1">Gagnez de l'argent</h3>
                <p className="text-sm text-slate-500">Pourboires, abonnements, partage des revenus</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="text-blue-600 mb-3">📊</div>
                <h3 className="font-semibold text-slate-800 mb-1">Statistiques</h3>
                <p className="text-sm text-slate-500">Analysez votre audience et votre progression</p>
              </div>
            </div>
            <a href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg transition-all hover:scale-105">
              <BrushIcon />
              Commencer à publier
            </a>
          </div>
        </div>
      </div>

      {/* Section statistiques */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">500+</div>
            <div className="text-slate-500 text-sm mt-1">Mangas publiés</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">200+</div>
            <div className="text-slate-500 text-sm mt-1">Créateurs actifs</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">10k+</div>
            <div className="text-slate-500 text-sm mt-1">Lecteurs</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">50k+</div>
            <div className="text-slate-500 text-sm mt-1">Chapitres lus</div>
          </div>
        </div>
      </div>
    </div>
  )
}