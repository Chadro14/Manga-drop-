import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem('session');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, sessionData) => {
    setUser(userData);
    localStorage.setItem('session', JSON.stringify(userData));
    if (sessionData?.access_token) {
      localStorage.setItem('token', sessionData.access_token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};