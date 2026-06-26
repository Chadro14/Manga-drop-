// services/api.js - Version corrigée pour Manga Drop
import axios from 'axios';

// Configuration de base
const API_URL = 'https://backend-drop.vercel.app/api';

// Création de l'instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('manga_drop_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('manga_drop_token');
      localStorage.removeItem('manga_drop_user');
      // Rediriger vers la page de connexion
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Fonction d'inscription (register)
export async function registerUser(email, username, password) {
  const response = await api.post('/auth?action=register', {
    email,
    username,
    password,
  });
  return response.data;
}

// Fonction de connexion (login)
export async function loginUser(email, password) {
  const response = await api.post('/auth?action=login', {
    email,
    password,
  });
  return response.data;
}

// Fonction de déconnexion (logout)
export async function logoutUser() {
  const response = await api.post('/auth?action=logout');
  return response.data;
}

// Récupérer le profil utilisateur
export async function getProfile() {
  const response = await api.get('/users?action=profile');
  return response.data;
}

// Mettre à jour le profil
export async function updateProfile(data) {
  const response = await api.put('/users?action=update-profile', data);
  return response.data;
}

// Récupérer la liste des mangas
export async function getMangaList(filters = {}) {
  const params = new URLSearchParams({ action: 'list', ...filters });
  const response = await api.get(`/manga?${params}`);
  return response.data;
}

// Récupérer les meilleurs mangas
export async function getBestManga(limit = 10) {
  const response = await api.get(`/manga?action=best&limit=${limit}`);
  return response.data;
}

// Récupérer les derniers mangas
export async function getNewestManga(limit = 10) {
  const response = await api.get(`/manga?action=newest&limit=${limit}`);
  return response.data;
}

// Récupérer un manga par son ID
export async function getMangaById(id) {
  const response = await api.get(`/manga?action=detail&id=${id}`);
  return response.data;
}

// Créer un manga (nécessite token)
export async function createManga(data) {
  const response = await api.post('/manga?action=create', data);
  return response.data;
}

// Ajouter un chapitre à une série
export async function publishChapter(data) {
  const response = await api.post('/manga?action=publish-chapter', data);
  return response.data;
}

// Ajouter une vue à un chapitre
export async function addView(chapterId) {
  const response = await api.post('/manga?action=add-view', { chapter_id: chapterId });
  return response.data;
}

// Liker ou unliker un chapitre
export async function toggleLike(chapterId) {
  const response = await api.post('/social?action=like', { chapter_id: chapterId });
  return response.data;
}

// Ajouter un commentaire
export async function addComment(chapterId, content, parentId = null) {
  const response = await api.post('/social?action=comment', {
    chapter_id: chapterId,
    content,
    parent_id: parentId,
  });
  return response.data;
}

// Récupérer les commentaires d'un chapitre
export async function getComments(chapterId) {
  const response = await api.get(`/social?action=comments&chapter_id=${chapterId}`);
  return response.data;
}

// Suivre un créateur
export async function toggleFollow(creatorId) {
  const response = await api.post('/social?action=follow', { creator_id: creatorId });
  return response.data;
}

// Récupérer les followers d'un utilisateur
export async function getFollowers(userId) {
  const response = await api.get(`/social?action=followers&user_id=${userId}`);
  return response.data;
}

// Récupérer les abonnements d'un utilisateur
export async function getFollowing(userId) {
  const response = await api.get(`/social?action=following&user_id=${userId}`);
  return response.data;
}

// Devenir créateur
export async function becomeCreator() {
  const response = await api.post('/users?action=become-creator');
  return response.data;
}

// Récupérer les statistiques d'un créateur
export async function getStats() {
  const response = await api.get('/users?action=stats');
  return response.data;
}

// Récupérer les mangas d'un créateur
export async function getUserMangas(userId) {
  const response = await api.get(`/users?action=user-mangas&user_id=${userId}`);
  return response.data;
}

// Export par défaut
export default api;