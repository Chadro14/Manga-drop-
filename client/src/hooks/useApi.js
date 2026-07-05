import { useState, useEffect } from 'react';
import api from '../services/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    api.get('/api/auth?action=me')
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const { data } = await api.post('/api/auth?action=login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
      throw err;
    }
  };

  const register = async (email, password, username) => {
    setError(null);
    try {
      const { data } = await api.post('/api/auth?action=register', { email, password, username });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.error || "Erreur d'inscription");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, error, login, register, logout };
}