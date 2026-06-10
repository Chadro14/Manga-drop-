import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, User, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px 0',
    color: isActive(path) ? '#2563EB' : '#64748B',
    transition: 'color 0.2s ease',
    fontSize: '11px',
    fontWeight: isActive(path) ? '600' : '400',
    textDecoration: 'none',
    flex: 1,
  });

  const iconStyle = (path) => ({
    width: '22px',
    height: '22px',
    color: isActive(path) ? '#2563EB' : '#64748B',
    transition: 'color 0.2s ease',
  });

  const handleDashboardClick = (e) => {
    if (!user) {
      e.preventDefault();
      window.location.href = '/auth';
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px',
      height: '60px',
      zIndex: 1000,
      maxWidth: '100%',
    }}>
      <NavLink to="/" style={linkStyle('/')}>
        <Home style={iconStyle('/')} />
        <span>Accueil</span>
      </NavLink>

      <NavLink
        to={user ? '/dashboard' : '/auth'}
        style={linkStyle('/dashboard')}
        onClick={handleDashboardClick}
      >
        <LayoutDashboard style={iconStyle('/dashboard')} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to={user ? `/profile/${user.id}` : '/auth'}
        style={linkStyle('/profile')}
      >
        <User style={iconStyle('/profile')} />
        <span>Profil</span>
      </NavLink>

      <NavLink to="/catalog" style={linkStyle('/catalog')}>
        <Menu style={iconStyle('/catalog')} />
        <span>Menu</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;