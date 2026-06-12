// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaure la session au démarrage
  useEffect(() => {
    const stored = localStorage.getItem('manga_drop_user');
    const token  = localStorage.getItem('manga_drop_token');

    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('manga_drop_user');
      }
    }

    // Vérifie que la session est toujours valide côté serveur
    if (token) {
      api.get('/api/auth/me')
        .then((data) => {
          const u = data.user || data;
          setUser(u);
          localStorage.setItem('manga_drop_user', JSON.stringify(u));
        })
        .catch(() => {
          localStorage.removeItem('manga_drop_token');
          localStorage.removeItem('manga_drop_user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Écoute l'event de logout forcé (token expiré dans api.js)
  useEffect(() => {
    const handler = () => {
      setUser(null);
      localStorage.removeItem('manga_drop_token');
      localStorage.removeItem('manga_drop_user');
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  const login = useCallback((userData, token) => {
    setUser(userData);
    localStorage.setItem('manga_drop_user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('manga_drop_token', token);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/signout');
    } catch {
      // ignore
    } finally {
      setUser(null);
      localStorage.removeItem('manga_drop_token');
      localStorage.removeItem('manga_drop_user');
    }
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('manga_drop_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
