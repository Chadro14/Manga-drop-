// src/components/common/Header.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, LogIn } from 'lucide-react';
import Avatar from './Avatar';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/catalog?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setQuery('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setSearchOpen(false);
      setQuery('');
    }
  }

  return (
    <>
      <header className="header">
        <div className="header__inner">
          {/* Logo */}
          <a href="/" className="header__logo" aria-label="Manga Drop — accueil">
            <img
              src="https://files.catbox.moe/zjnv47.jpeg"
              alt="Manga Drop"
              className="header__logo-img"
            />
            <span className="header__logo-text">Manga Drop</span>
          </a>

          {/* Barre de recherche desktop */}
          <form
            className="header__search-desktop"
            onSubmit={handleSearch}
            role="search"
          >
            <Search size={16} color="#64748B" strokeWidth={2} />
            <input
              type="search"
              placeholder="Rechercher un manga…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="header__search-input"
              aria-label="Rechercher"
            />
          </form>

          {/* Actions droite */}
          <div className="header__actions">
            {/* Loupe mobile */}
            <button
              className="header__icon-btn header__search-toggle"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Ouvrir la recherche"
            >
              {searchOpen ? (
                <X size={20} color="#1E293B" strokeWidth={2} />
              ) : (
                <Search size={20} color="#1E293B" strokeWidth={2} />
              )}
            </button>

            {/* Avatar ou bouton connexion */}
            {user ? (
              <Avatar
                src={user.avatar_url}
                name={user.username || user.email}
                size={34}
                onClick={() => navigate(`/profile/${user.id}`)}
              />
            ) : (
              <button
                className="header__signin-btn"
                onClick={() => navigate('/auth')}
              >
                <LogIn size={16} color="#fff" strokeWidth={2} />
                <span>Connexion</span>
              </button>
            )}
          </div>
        </div>

        {/* Barre de recherche mobile dépliable */}
        {searchOpen && (
          <form
            className="header__search-mobile"
            onSubmit={handleSearch}
            role="search"
          >
            <Search size={16} color="#64748B" strokeWidth={2} />
            <input
              type="search"
              placeholder="Rechercher un manga…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="header__search-input"
              autoFocus
              aria-label="Rechercher"
            />
          </form>
        )}
      </header>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid #E2E8F0;
        }

        .header__inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          height: 56px;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Logo */
        .header__logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .header__logo-img {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          object-fit: cover;
        }
        .header__logo-text {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #2563EB;
          letter-spacing: -0.02em;
        }

        /* Recherche desktop */
        .header__search-desktop {
          display: none;
          flex: 1;
          max-width: 360px;
          align-items: center;
          gap: 8px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 0 12px;
          height: 38px;
        }
        @media (min-width: 640px) {
          .header__search-desktop {
            display: flex;
          }
          .header__search-toggle {
            display: none !important;
          }
        }
        .header__search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #1E293B;
          outline: none;
        }
        .header__search-input::placeholder {
          color: #94A3B8;
        }
        .header__search-input::-webkit-search-cancel-button {
          display: none;
        }

        /* Recherche mobile */
        .header__search-mobile {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-top: 1px solid #E2E8F0;
          background: #F8FAFC;
        }
        .header__search-mobile .header__search-input {
          font-size: 15px;
        }

        /* Actions */
        .header__actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }
        .header__icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: background 0.15s;
        }
        .header__icon-btn:hover {
          background: #F1F5F9;
        }

        /* Bouton connexion */
        .header__signin-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #2563EB;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .header__signin-btn:hover {
          background: #1D4ED8;
        }
      `}</style>
    </>
  );
}
