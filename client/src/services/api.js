// services/api.js - Version corrigée
import axios from 'axios';

const API_URL = 'https://backend-drop.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true,  // ✅ Ajouté
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('manga_drop_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('manga_drop_token');
      localStorage.removeItem('manga_drop_user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// ========== AUTH ==========
export async function registerUser(email, username, password) {
  try {
    const response = await api.post('/auth?action=register', {
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur réseau' };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await api.post('/auth?action=login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur réseau' };
  }
}

export async function logoutUser() {
  try {
    const response = await api.post('/auth?action=logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur réseau' };
  }
}

// ========== USER ==========
export async function getProfile() {
  const response = await api.get('/users?action=profile');
  return response.data;
}

export async function updateProfile(data) {
  const response = await api.put('/users?action=update-profile', data);
  return response.data;
}

export async function becomeCreator() {
  const response = await api.post('/users?action=become-creator');
  return response.data;
}

export async function getStats() {
  const response = await api.get('/users?action=stats');
  return response.data;
}

export async function getUserMangas(userId) {
  const response = await api.get(`/users?action=user-mangas&user_id=${userId}`);
  return response.data;
}

// ========== MANGA ==========
export async function getMangaList(filters = {}) {
  const params = new URLSearchParams({ action: 'list', ...filters });
  const response = await api.get(`/manga?${params}`);
  return response.data;
}

export async function getBestManga(limit = 10) {
  const response = await api.get(`/manga?action=best&limit=${limit}`);
  return response.data;
}

export async function getNewestManga(limit = 10) {
  const response = await api.get(`/manga?action=newest&limit=${limit}`);
  return response.data;
}

export async function getMangaById(id) {
  const response = await api.get(`/manga?action=detail&id=${id}`);
  return response.data;
}

export async function createManga(data) {
  const response = await api.post('/manga?action=create', data);
  return response.data;
}

export async function publishChapter(data) {
  const response = await api.post('/manga?action=publish-chapter', data);
  return response.data;
}

export async function addView(chapterId) {
  const response = await api.post('/manga?action=add-view', { chapter_id: chapterId });
  return response.data;
}

// ========== SOCIAL ==========
export async function toggleLike(chapterId) {
  const response = await api.post('/social?action=like', { chapter_id: chapterId });
  return response.data;
}

export async function addComment(chapterId, content, parentId = null) {
  const response = await api.post('/social?action=comment', {
    chapter_id: chapterId,
    content,
    parent_id: parentId,
  });
  return response.data;
}

export async function getComments(chapterId) {
  const response = await api.get(`/social?action=comments&chapter_id=${chapterId}`);
  return response.data;
}

export async function toggleFollow(creatorId) {
  const response = await api.post('/social?action=follow', { creator_id: creatorId });
  return response.data;
}

export async function getFollowers(userId) {
  const response = await api.get(`/social?action=followers&user_id=${userId}`);
  return response.data;
}

export async function getFollowing(userId) {
  const response = await api.get(`/social?action=following&user_id=${userId}`);
  return response.data;
}

export default api;