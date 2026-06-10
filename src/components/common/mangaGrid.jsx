// src/components/common/MangaGrid.jsx
import MangaCard from './MangaCard';
import Loader from './Loader';

export default function MangaGrid({ mangas = [], loading = false, emptyMessage = 'Aucun manga trouvé.' }) {
  if (loading) return <Loader fullscreen={false} size={32} />;

  if (!mangas.length) {
    return (
      <>
        <div className="manga-grid-empty">
          <p className="manga-grid-empty__text">{emptyMessage}</p>
        </div>
        <style>{gridCSS}</style>
      </>
    );
  }

  return (
    <>
      <div className="manga-grid">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
      <style>{gridCSS}</style>
    </>
  );
}

const gridCSS = `
  .manga-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 14px;
  }

  @media (min-width: 480px) {
    .manga-grid {
      grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
    }
  }

  @media (min-width: 768px) {
    .manga-grid {
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 18px;
    }
  }

  .manga-grid-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 16px;
  }

  .manga-grid-empty__text {
    font-size: 14px;
    color: var(--color-text-light);
    text-align: center;
  }
`;
