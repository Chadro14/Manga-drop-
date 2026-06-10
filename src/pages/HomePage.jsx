// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Sparkles, TrendingUp } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import MangaCard from '../components/common/MangaCard';
import Loader from '../components/common/Loader';
import Avatar from '../components/common/Avatar';
import api from '../services/api';

export default function HomePage() {
  const [bestManga, setBestManga]   = useState(null);
  const [bestAuthor, setBestAuthor] = useState(null);
  const [newMangas, setNewMangas]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [mangaRes, authorRes, newRes] = await Promise.all([
          api.get('/api/manga/best-of-month'),
          api.get('/api/manga/best-author'),
          api.get('/api/manga?sort=created_at&order=desc&limit=6'),
        ]);

        setBestManga(mangaRes.bestManga || mangaRes.data || null);
        setBestAuthor(authorRes.bestAuthor || authorRes.data || null);
        setNewMangas(newRes.mangas || newRes.data || []);
      } catch (err) {
        console.error('Erreur chargement page accueil:', err);
        setError('Impossible de charger le contenu.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Header />

      <main className="home-main">
        {error && <p className="home-error">{error}</p>}

        {/* ── Meilleur manga du mois ── */}
        {bestManga && (
          <section className="home-section">
            <div className="home-section__title">
              <Trophy size={20} color="#2563EB" strokeWidth={2} />
              <h2>Meilleur manga du mois</h2>
            </div>

            <Link to={`/manga/${bestManga.id}`} className="home-featured-card">
              <img
                src={bestManga.cover_url || '/placeholder-cover.png'}
                alt={bestManga.title}
                className="home-featured-card__cover"
              />
              <div className="home-featured-card__info">
                <h3 className="home-featured-card__title">{bestManga.title}</h3>
                <p className="home-featured-card__author">
                  par {bestManga.users?.username || bestManga.author_name || 'Auteur inconnu'}
                </p>
                {bestManga.description && (
                  <p className="home-featured-card__desc">
                    {bestManga.description.slice(0, 120)}…
                  </p>
                )}
                <div className="home-featured-card__stats">
                  <span>{(bestManga.views_count || 0).toLocaleString()} vues</span>
                  <span>{(bestManga.likes_count || 0).toLocaleString()} likes</span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Meilleur dessinateur ── */}
        {bestAuthor && (
          <section className="home-section">
            <div className="home-section__title">
              <TrendingUp size={20} color="#2563EB" strokeWidth={2} />
              <h2>Meilleur dessinateur du mois</h2>
            </div>

            <Link to={`/profile/${bestAuthor.id}`} className="home-author-card">
              <Avatar
                src={bestAuthor.avatar_url}
                name={bestAuthor.username}
                size={52}
              />
              <div>
                <h3 className="home-author-card__name">{bestAuthor.username}</h3>
                <p className="home-author-card__sub">Dessinateur le plus vu ce mois</p>
                {bestAuthor.mangas_count > 0 && (
                  <p className="home-author-card__count">
                    {bestAuthor.mangas_count} manga{bestAuthor.mangas_count > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </Link>
          </section>
        )}

        {/* ── Nouveautés ── */}
        <section className="home-section">
          <div className="home-section__title">
            <Sparkles size={20} color="#2563EB" strokeWidth={2} />
            <h2>Nouveautés</h2>
          </div>

          {newMangas.length === 0 ? (
            <p className="home-empty">Aucun manga pour le moment.</p>
          ) : (
            <div className="home-grid">
              {newMangas.map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />

      <style>{`
        .home-main {
          padding: 16px 16px 96px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .home-error {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #DC2626;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 20px;
        }

        .home-empty {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #94A3B8;
          text-align: center;
          padding: 32px 0;
        }

        /* Section */
        .home-section {
          margin-bottom: 32px;
        }
        .home-section__title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .home-section__title h2 {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #1E293B;
          margin: 0;
        }

        /* Featured manga card */
        .home-featured-card {
          display: flex;
          gap: 14px;
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 14px;
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.15s;
        }
        .home-featured-card:hover {
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.10);
          transform: translateY(-2px);
        }
        .home-featured-card__cover {
          width: 90px;
          height: 126px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
          background: #F1F5F9;
        }
        .home-featured-card__info {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }
        .home-featured-card__title {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1E293B;
          margin: 0;
          line-height: 1.3;
        }
        .home-featured-card__author {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #2563EB;
          margin: 0;
          font-weight: 500;
        }
        .home-featured-card__desc {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #64748B;
          margin: 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .home-featured-card__stats {
          display: flex;
          gap: 14px;
          margin-top: auto;
          padding-top: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #94A3B8;
        }

        /* Author card */
        .home-author-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px;
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.15s;
        }
        .home-author-card:hover {
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.10);
          transform: translateY(-2px);
        }
        .home-author-card__name {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1E293B;
          margin: 0 0 3px;
        }
        .home-author-card__sub {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #64748B;
          margin: 0;
        }
        .home-author-card__count {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #2563EB;
          font-weight: 500;
          margin: 4px 0 0;
        }

        /* Grille nouveautés */
        .home-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 14px;
        }
        @media (min-width: 480px) {
          .home-grid {
            grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
          }
        }
      `}</style>
    </>
  );
}
