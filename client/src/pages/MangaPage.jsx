// src/pages/MangaPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, BookOpen } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import Loader from '../components/common/Loader';
import api from '../services/api';

export default function MangaPage() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchManga() {
      try {
        const data = await api.get(`/api/manga/${id}`);
        setManga(data.manga || data);
        setChapters(data.chapters || []);
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchManga();
  }, [id]);

  if (loading) return <Loader />;
  if (!manga) return <div style={{ padding: '20px', textAlign: 'center' }}>Manga non trouvé</div>;

  return (
    <>
      <Header />

      <main className="manga-page">
        <Link to="/catalog" className="manga-page__back">
          <ChevronLeft size={20} />
          Retour
        </Link>

        <div className="manga-page__hero">
          <img src={manga.cover_url} alt={manga.title} className="manga-page__cover" />
          <div className="manga-page__info">
            <h1 className="manga-page__title">{manga.title}</h1>
            <p className="manga-page__author">par {manga.author_name || 'Auteur inconnu'}</p>
            {manga.description && <p className="manga-page__desc">{manga.description}</p>}
            <div className="manga-page__stats">
              <span>{(manga.views_count || 0).toLocaleString()} vues</span>
              <span>{(manga.likes_count || 0).toLocaleString()} likes</span>
              <span>{chapters.length} chapitres</span>
            </div>
          </div>
        </div>

        {chapters.length > 0 && (
          <section className="manga-page__chapters">
            <h2>Chapitres</h2>
            <div className="manga-page__chapter-list">
              {chapters.map((ch) => (
                <Link key={ch.id} to={`/read/${ch.id}`} className="manga-page__chapter-item">
                  <BookOpen size={16} />
                  <span>Chapitre {ch.chapter_number}</span>
                  <span className="manga-page__chapter-date">{new Date(ch.created_at).toLocaleDateString('fr-FR')}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav />

      <style>{`
        .manga-page {
          padding: 16px 16px 96px;
          max-width: 900px;
          margin: 0 auto;
        }
        .manga-page__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-primary);
          font-weight: 500;
          margin-bottom: 16px;
          font-family: var(--font-sans);
        }
        .manga-page__hero {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
        }
        .manga-page__cover {
          width: 140px;
          height: 200px;
          object-fit: cover;
          border-radius: var(--radius-md);
          flex-shrink: 0;
        }
        .manga-page__info {
          flex: 1;
        }
        .manga-page__title {
          font-size: 24px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 8px;
          font-family: var(--font-sans);
        }
        .manga-page__author {
          font-size: 14px;
          color: var(--color-primary);
          font-weight: 500;
          margin: 0 0 12px;
          font-family: var(--font-sans);
        }
        .manga-page__desc {
          font-size: 14px;
          color: var(--color-text-light);
          line-height: 1.6;
          margin: 0 0 16px;
          font-family: var(--font-sans);
        }
        .manga-page__stats {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: var(--color-text-light);
          font-family: var(--font-sans);
        }
        .manga-page__chapters {
          margin-top: 32px;
        }
        .manga-page__chapters h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 16px;
          font-family: var(--font-sans);
        }
        .manga-page__chapter-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .manga-page__chapter-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text);
          font-family: var(--font-sans);
          font-size: 14px;
          transition: background 0.15s;
          text-decoration: none;
        }
        .manga-page__chapter-item:hover {
          background: #F1F5F9;
        }
        .manga-page__chapter-date {
          margin-left: auto;
          font-size: 12px;
          color: var(--color-text-light);
        }
      `}</style>
    </>
  );
}
