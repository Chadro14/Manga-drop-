// src/pages/CatalogPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import SearchBar from '../components/common/SearchBar';
import MangaGrid from '../components/common/MangaGrid';
import api from '../services/api';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMangas() {
      setLoading(true);
      setError(null);
      try {
        const q = searchParams.get('q');
        const path = q ? `/api/manga?search=${encodeURIComponent(q)}` : '/api/manga?limit=50';
        const data = await api.get(path);
        setMangas(data.mangas || data.data || []);
      } catch (err) {
        setError('Erreur lors du chargement des mangas');
      } finally {
        setLoading(false);
      }
    }
    fetchMangas();
  }, [searchParams]);

  return (
    <>
      <Header />

      <main className="catalog-main">
        <div className="catalog-search">
          <SearchBar
            placeholder="Rechercher un manga…"
            onSearch={(q) => {
              window.location.href = `/catalog?q=${encodeURIComponent(q)}`;
            }}
          />
        </div>

        {error && <p className="catalog-error">{error}</p>}
        <MangaGrid mangas={mangas} loading={loading} />
      </main>

      <BottomNav />

      <style>{`
        .catalog-main {
          padding: 16px 16px 96px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .catalog-search {
          margin-bottom: 24px;
        }
        .catalog-error {
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--color-danger);
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
