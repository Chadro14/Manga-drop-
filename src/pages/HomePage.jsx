import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Sparkles, TrendingUp } from 'lucide-react';
import Header from '../components/common/Header';
import MangaCard from '../components/common/MangaCard';
import Loader from '../components/common/Loader';
import { api } from '../services/api';

const HomePage = () => {
  const [bestManga, setBestManga] = useState(null);
  const [bestAuthor, setBestAuthor] = useState(null);
  const [newMangas, setNewMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mangaRes, authorRes, newRes] = await Promise.all([
          api.get('/manga/best-of-month'),
          api.get('/manga/best-author'),
          api.get('/manga?sort=created_at&order=desc&limit=6'),
        ]);

        if (mangaRes.success) setBestManga(mangaRes.bestManga);
        if (authorRes.success) setBestAuthor(authorRes.bestAuthor);
        if (newRes.success) setNewMangas(newRes.mangas || []);
      } catch (error) {
        console.error('Erreur chargement page accueil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Header />

      <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Meilleur manga du mois */}
        {bestManga && (
          <section style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Trophy size={22} color="#2563EB" />
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>Meilleur manga du mois</h2>
            </div>
            <Link to={`/manga/${bestManga.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                display: 'flex',
                gap: '16px',
                padding: '16px',
              }}>
                <img
                  src={bestManga.cover_url || '/placeholder-cover.png'}
                  alt={bestManga.title}
                  style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>{bestManga.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                    par {bestManga.users?.username || 'Auteur inconnu'}
                  </p>
                  <p style={{ fontSize: '13px', color: '#475569', marginTop: '8px', lineClamp: 2 }}>
                    {bestManga.description?.slice(0, 100)}...
                  </p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '13px', color: '#64748B' }}>
                    <span>{bestManga.views_count || 0} vues</span>
                    <span>{bestManga.likes_count || 0} likes</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Meilleur dessinateur */}
        {bestAuthor && (
          <section style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <TrendingUp size={22} color="#2563EB" />
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>Meilleur dessinateur du mois</h2>
            </div>
            <Link to={`/profile/${bestAuthor.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#DBEAFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {bestAuthor.avatar_url ? (
                    <img src={bestAuthor.avatar_url} alt={bestAuthor.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '22px', fontWeight: '700', color: '#2563EB' }}>
                      {bestAuthor.username?.charAt(0)?.toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>{bestAuthor.username}</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Dessinateur le plus vu ce mois</p>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Nouveautés */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={22} color="#2563EB" />
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>Nouveautés</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
          }}>
            {newMangas.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;