const API_URL = import.meta.env.VITE_API_URL || 'https://backend-drop.vercel.app/api';

const getToken = () => localStorage.getItem('token');

const headers = (withAuth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (withAuth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

export const api = {
  get: async (endpoint, withAuth = false) => {
    const res = await fetch(`${API_URL}${endpoint}`, { headers: headers(withAuth) });
    return res.json();
  },

  post: async (endpoint, data, withAuth = false) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: headers(withAuth),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  put: async (endpoint, data, withAuth = true) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: headers(withAuth),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (endpoint, withAuth = true) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: headers(withAuth),
    });
    return res.json();
  },
};