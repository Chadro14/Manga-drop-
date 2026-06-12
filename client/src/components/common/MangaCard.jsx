// src/components/common/MangaCard.jsx
import { useNavigate } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';
import Badge from './Badge';

function getBadgeType(manga) {
  if (manga.badge) return manga.badge;
  const daysSinceCreation =
    (Date.now() - new Date(manga.created_at)) / (1000 * 60 * 60 * 24);
  if (daysSinceCreation <= 7) return 'NOUVEAU';
  if (manga.is_completed) return 'COMPLET';
  if (manga.rank && manga.rank <= 10) return 'TOP 10';
  if (manga.views_count >= 10000) return 'HOT';
  return null;
}

function formatCount(n) {
  if (!n && n !== 0) return '0';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function MangaCard({ manga }) {
  const navigate = useNavigate();
  const badgeType = getBadgeType(manga);

  return (
    <>
      <article
        className="manga-card"
        onClick={() => navigate(`/manga/${manga.id}`)}
        tabIndex={0}
        role="button"
        aria-label={`Lire ${manga.title}`}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/manga/${manga.id}`)}
      >
        {/* Couverture */}
        <div className="manga-card__cover-wrap">
          <img
            src={manga.cover_url || '/placeholder-cover.jpg'}
            alt={`Couverture de ${manga.title}`}
            className="manga-card__cover"
            loading="lazy"
          />
          {badgeType && (
            <div className="manga-card__badge">
              <Badge type={badgeType} />
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="manga-card__info">
          <h3 className="manga-card__title">{manga.title}</h3>
          {manga.author_name && (
            <p className="manga-card__author">{manga.author_name}</p>
          )}
          <div className="manga-card__stats">
            <span className="manga-card__stat">
              <Eye size={12} color="#64748B" strokeWidth={2} />
              {formatCount(manga.views_count)}
            </span>
            <span className="manga-card__stat">
              <Heart size={12} color="#64748B" strokeWidth={2} />
              {formatCount(manga.likes_count)}
            </span>
            {manga.chapters_count > 0 && (
              <span className="manga-card__stat manga-card__stat--chapters">
                {manga.chapters_count} ch.
              </span>
            )}
          </div>
        </div>
      </article>

      <style>{`
        .manga-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          outline: none;
        }
        .manga-card:hover,
        .manga-card:focus-visible {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.10);
        }
        .manga-card:focus-visible {
          outline: 2px solid #2563EB;
          outline-offset: 2px;
        }

        /* Couverture */
        .manga-card__cover-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          background: #F1F5F9;
          overflow: hidden;
        }
        .manga-card__cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.2s;
        }
        .manga-card:hover .manga-card__cover {
          transform: scale(1.04);
        }
        .manga-card__badge {
          position: absolute;
          top: 8px;
          left: 8px;
        }

        /* Infos */
        .manga-card__info {
          padding: 10px 12px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .manga-card__title {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1E293B;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .manga-card__author {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #64748B;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .manga-card__stats {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
        }
        .manga-card__stat {
          display: flex;
          align-items: center;
          gap: 3px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #64748B;
        }
        .manga-card__stat--chapters {
          margin-left: auto;
          color: #2563EB;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}
