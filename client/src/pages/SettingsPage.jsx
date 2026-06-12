// src/pages/SettingsPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Bell } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import { useAuth } from '../hooks/useAuth';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await logout();
    navigate('/');
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <>
      <Header />

      <main className="settings-main">
        <h1 className="settings-title">Paramètres</h1>

        <section className="settings-section">
          <h2>
            <User size={18} /> Compte
          </h2>
          <div className="settings-item">
            <span>Pseudo</span>
            <span className="settings-value">{user.username}</span>
          </div>
          <div className="settings-item">
            <span>Email</span>
            <span className="settings-value">{user.email}</span>
          </div>
        </section>

        <section className="settings-section">
          <h2>
            <Bell size={18} /> Notifications
          </h2>
          <label className="settings-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Nouveaux chapitres de mes abonnements</span>
          </label>
          <label className="settings-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Nouveaux commentaires sur mes mangas</span>
          </label>
          <label className="settings-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Nouveaux abonnés</span>
          </label>
        </section>

        <section className="settings-section">
          <button className="settings-logout" onClick={handleLogout} disabled={loading}>
            <LogOut size={18} />
            {loading ? 'Déconnexion...' : 'Se déconnecter'}
          </button>
        </section>
      </main>

      <BottomNav />

      <style>{`
        .settings-main {
          padding: 16px 16px 96px;
          max-width: 600px;
          margin: 0 auto;
        }
        .settings-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 24px;
          font-family: var(--font-sans);
        }
        .settings-section {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-bottom: 16px;
        }
        .settings-section h2 {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text);
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
        }
        .settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          font-family: var(--font-sans);
          font-size: 14px;
        }
        .settings-item:not(:last-child) {
          border-bottom: 1px solid var(--color-border);
        }
        .settings-value {
          color: var(--color-text-light);
        }
        .settings-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 14px;
        }
        .settings-checkbox input {
          cursor: pointer;
        }
        .settings-logout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          background: var(--color-danger);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }
        .settings-logout:hover:not(:disabled) {
          background: #B91C1C;
        }
        .settings-logout:disabled {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}
