// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import MangaPage from './pages/MangaPage';
import ReaderPage from './pages/ReaderPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/"                  element={<HomePage />} />
      <Route path="/catalog"           element={<CatalogPage />} />
      <Route path="/manga/:id"         element={<MangaPage />} />
      <Route path="/read/:chapterId"   element={<ReaderPage />} />
      <Route path="/auth"              element={<AuthPage />} />
      <Route path="/dashboard"         element={<DashboardPage />} />
      <Route path="/profile/:userId"   element={<ProfilePage />} />
      <Route path="/settings"          element={<SettingsPage />} />
      <Route path="*"                  element={<NotFoundPage />} />
    </Routes>
  );
}
