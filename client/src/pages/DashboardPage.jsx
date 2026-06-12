// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Eye, Heart, Users } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import Loader from '../components/common/Loader';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    async function fetchDashboard() {
      try {
        const [statsRes, mangasRes] = await Promise.all([
          api.get('/api/users/stats'),
          api.get(`/api/users/mangas/${user.id}`),
        ]);
        setStats(statsRes);
        setMangas(mangasRes.mangas || []);
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [user, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <Header />

      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard Créateur</h1>

        {stats && (
          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <Eye size={24} color="#2563EB" />
              <div>
                <p className="dashboard-stat-label">Vues totales</p>
                <p className="dashboard-stat-value">{(stats.total_views || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="dashboard-stat-card">
              <Heart size={24} color="#2563EB" />
              <div>
                <p className="dashboard-stat-label">Likes totaux</p>
                <p className="dashboard-stat-value">{(stats.total_likes || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="dashboard-stat-card">
              <Users size={24} color="#2563EB" />
              <div>
                <p className="dashboard-stat-label">Abonnés</p>
                <p className="dashboard-stat-value">{(stats.followers_count || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="dashboard-stat-card">
              <BarChart3 size={24} color="#2563EB" />
              <div>
                <p className="dashboard-stat-label">Mangas publiés</p>
                <p className="dashboard-stat-value">{mangas.length}</p>
              </div>
            </div>
          </div>
        )}

        <section className="dashboard-section">
          <h2>Mes Mangas</h2>
          {mangas.length === 0 ? (
            <p className="dashboard-empty">Aucun manga publié encore</p>
          ) : (
            <div className="dashboard-mangas">
              {mangas.map((manga) => (
                <div key={manga.id} className="dashboard-manga-item">
                  <img src={manga.cover_url} alt={manga.title} />
                  <div>
                    <h3>{manga.title}</h3>
                    <p>{manga.chapters_count} chapitres</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />

      <style>{`
        .dashboard-main {
          padding: 16px 16px 96px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .dashboard-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 24px;
          font-family: var(--font-sans);
        }
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 14px;
          margin-bottom: 32px;
        }
        .dashboard-stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px;
        }
        .dashboard-stat-label {
          font-size: 12px;
          color: var(--color-text-light);
          margin: 0;
          font-family: var(--font-sans);
        }
        .dashboard-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-primary);
          margin: 4px 0 0;
          font-family: var(--font-sans);
        }
        .dashboard-section {
          margin-top: 32px;
        }
        .dashboard-section h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 16px;
          font-family: var(--font-sans);
        }
        .dashboard-empty {
          font-size: 14px;
          color: var(--color-text-light);
          text-align: center;
          padding: 32px 0;
          font-family: var(--font-sans);
        }
        .dashboard-mangas {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dashboard-manga-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }
        .dashboard-manga-item img {
          width: 60px;
          height: 90px;
          object-fit: cover;
          border-radius: var(--radius-sm);
        }
        .dashboard-manga-item h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text);
          margin: 0;
          font-family: var(--font-sans);
        }
        .dashboard-manga-item p {
          font-size: 12px;
          color: var(--color-text-light);
          margin: 4px 0 0;
          font-family: var(--font-sans);
        }
      `}</style>
    </>
  );
}
