export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Manga Drop</h1>
      <p className="text-gray-600 mb-8">Plateforme de mangas amateurs</p>
      <a href="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Créer un compte
      </a>
    </div>
  )
}