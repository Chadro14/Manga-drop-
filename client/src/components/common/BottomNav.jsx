// src/components/common/BottomNav.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, User, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { label: 'Accueil',   icon: Home,            path: '/' },
  { label: 'Catalogue', icon: BookOpen,         path: '/catalog' },
  { label: 'Dashboard', icon: LayoutDashboard,  path: '/dashboard', authRequired: true },
  { label: 'Profil',    icon: User,             path: '/profile',   authRequired: true },
];

export default function BottomNav() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  function handleNav(item) {
    if (item.authRequired && !user) {
      navigate('/auth');
      return;
    }
    if (item.path === '/profile' && user) {
      navigate(`/profile/${user.id}`);
      return;
    }
    navigate(item.path);
  }

  function isActive(item) {
    if (item.path === '/') return location.pathname === '/';
    if (item.path === '/profile') return location.pathname.startsWith('/profile');
    return location.pathname.startsWith(item.path);
  }

  return (
    <>
      <nav className="bottom-nav" aria-label="Navigation principale">
        {NAV_ITEMS.map((item) => {
          const Icon   = item.icon;
          const active = isActive(item);

          return (
            <button
              key={item.path}
              className={`bottom-nav__item ${active ? 'bottom-nav__item--active' : ''}`}
              onClick={() => handleNav(item)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                color={active ? 'var(--color-primary)' : 'var(--color-text-light)'}
              />
              <span className="bottom-nav__label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: var(--color-white);
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          z-index: 100;
          padding-bottom: env(safe-area-inset-bottom);
        }

        .bottom-nav__item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          height: 100%;
          background: none;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .bottom-nav__item:active {
          opacity: 0.7;
        }

        .bottom-nav__label {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 500;
          color: var(--color-text-light);
          transition: color 0.15s;
        }
        .bottom-nav__item--active .bottom-nav__label {
          color: var(--color-primary);
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
