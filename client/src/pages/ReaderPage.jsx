// src/pages/ReaderPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Loader from '../components/common/Loader';
import api from '../services/api';

export default function ReaderPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChapter() {
      try {
        const data = await api.get(`/api/manga/chapter/${chapterId}`);
        setChapter(data.chapter || data);
        // Log la vue
        await api.post('/api/manga/view', { chapter_id: chapterId }).catch(() => {});
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchChapter();
  }, [chapterId]);

  if (loading) return <Loader />;
  if (!chapter) return <div style={{ padding: '20px', textAlign: 'center' }}>Chapitre non trouvé</div>;

  return (
    <>
      <div className="reader-header">
        <Link to={`/manga/${chapter.manga_id}`} className="reader-back">
          <ChevronLeft size={20} />
          Retour
        </Link>
        <h1 className="reader-title">{chapter.title || `Chapitre ${chapter.chapter_number}`}</h1>
      </div>

      <main className="reader-main">
        {chapter.pages && chapter.pages.length > 0 ? (
          <div className="reader-pages">
            {chapter.pages.map((page, idx) => (
              <img key={idx} src={page} alt={`Page ${idx + 1}`} className="reader-page" />
            ))}
          </div>
        ) : (
          <p className="reader-empty">Aucune page dans ce chapitre</p>
        )}
      </main>

      <style>{`
        .reader-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--color-white);
          border-bottom: 1px solid var(--color-border);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .reader-back {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-primary);
          font-weight: 500;
          text-decoration: none;
          font-family: var(--font-sans);
        }
        .reader-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text);
          margin: 0;
          font-family: var(--font-sans);
          flex: 1;
        }
        .reader-main {
          max-width: 100%;
          margin: 0 auto;
          padding: 0;
        }
        .reader-pages {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .reader-page {
          width: 100%;
          height: auto;
          display: block;
        }
        .reader-empty {
          padding: 40px 20px;
          text-align: center;
          color: var(--color-text-light);
          font-family: var(--font-sans);
        }
      `}</style>
    </>
  );
}
