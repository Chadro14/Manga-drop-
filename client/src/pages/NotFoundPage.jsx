// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page non trouvée</h2>
        <p className="notfound-desc">Oups ! La page que tu cherches n'existe pas.</p>
        <Link to="/" className="notfound-button">
          <Home size={18} />
          Retour à l'accueil
        </Link>
      </div>

      <style>{`
        .notfound {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100dvh;
          background: var(--color-background);
          padding: 20px;
        }
        .notfound-content {
          text-align: center;
        }
        .notfound-code {
          font-size: 120px;
          font-weight: 900;
          color: var(--color-primary);
          margin: 0;
          line-height: 1;
          font-family: var(--font-sans);
        }
        .notfound-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--color-text);
          margin: 12px 0 8px;
          font-family: var(--font-sans);
        }
        .notfound-desc {
          font-size: 16px;
          color: var(--color-text-light);
          margin: 0 0 24px;
          font-family: var(--font-sans);
        }
        .notfound-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          text-decoration: none;
          font-family: var(--font-sans);
          transition: background 0.15s;
        }
        .notfound-button:hover {
          background: var(--color-primary-hover);
        }
      `}</style>
    </div>
  );
}
