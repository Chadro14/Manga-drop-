// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Mail, Users } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import Avatar from '../components/common/Avatar';
import MangaGrid from '../components/common/MangaGrid';
import Loader from '../components/common/Loader';
import api from '../services/api';

export default function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [mangas, setMangas] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const [userRes, mangasRes, followRes] = await Promise.all([
          api.get(`/api/users/profile/${userId}`),
          api.get(`/api/users/mangas/${userId}`),
          api.get(`/api/social/followers/${userId}`).catch(() => ({ count: 0 })),
        ]);
        setUser(userRes.user || userRes);
        setMangas(mangasRes.mangas || []);
        setFollowers(followRes.count || followRes.followers?.length || 0);
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [userId]);

  if (loading) return <Loader />;
  if (!user) return <div style={{ padding: '20px', textAlign: 'center' }}>Utilisateur non trouvé</div>;

  return (
    <>
      <Header />

      <main className="profile-main">
        <div className="profile-header">
          <Avatar src={user.avatar_url} name={user.username} size={80} />
          <div className="profile-info">
            <h1 className="profile-name">{user.username}</h1>
            {user.bio && <p className="profile-bio">{user.bio}</p>}
            <div className="profile-meta">
              {user.location && (
                <span>
                  <MapPin size={14} /> {user.location}
                </span>
              )}
              {user.email && (
                <span>
                  <Mail size={14} /> {user.email}
                </span>
              )}
              <span>
                <Users size={14} /> {followers} abonnés
              </span>
            </div>
          </div>
        </div>

        <section className="profile-section">
          <h2>Mangas ({mangas.length})</h2>
          <MangaGrid mangas={mangas} loading={false} />
        </section>
      </main>

      <BottomNav />

      <style>{`
        .profile-main {
          padding: 16px 16px 96px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .profile-header {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 32px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .profile-info {
          flex: 1;
        }
        .profile-name {
          font-size: 22px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 8px;
          font-family: var(--font-sans);
        }
        .profile-bio {
          font-size: 14px;
          color: var(--color-text-light);
          margin: 0 0 12px;
          line-height: 1.5;
          font-family: var(--font-sans);
        }
        .profile-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: var(--color-text-light);
          font-family: var(--font-sans);
        }
        .profile-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .profile-section {
          margin-top: 32px;
        }
        .profile-section h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 16px;
          font-family: var(--font-sans);
        }
      `}</style>
    </>
  );
}
