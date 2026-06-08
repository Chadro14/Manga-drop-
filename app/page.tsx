// app/page.tsx
const LogoMD = () => (
  <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#2563EB"/>
    <path d="M12 28L16 12H24L28 28L24 26L20 18L16 26L12 28Z" fill="white"/>
    <rect x="18" y="14" width="4" height="6" fill="white"/>
  </svg>
)

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-4">
            <LogoMD />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Publiez votre manga<br />en quelques clics
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez une communauté de passionnés. Publiez vos planches, 
            gagnez des lecteurs et soyez récompensé.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Je suis créateur
            </a>
            <a href="/register" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800">
              Je lis des mangas
            </a>
          </div>
        </div>
      </div>

      {/* Section mangas populaires */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Mangas populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg">
              <div className="aspect-[3/4] bg-gray-200"></div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900">Titre manga</h3>
                <p className="text-sm text-gray-500">Auteur</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section créateurs */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vous dessinez ?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload gratuit, suivi des lecteurs, pourboires et abonnements.
          </p>
          <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Commencer à publier
          </a>
        </div>
      </div>
    </div>
  )
}