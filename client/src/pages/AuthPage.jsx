// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit() {
    setError('');

    if (!form.email || !form.password) {
      setError('Remplis tous les champs.');
      return;
    }
    if (mode === 'signup' && !form.username.trim()) {
      setError('Choisis un pseudo.');
      return;
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        mode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const body =
        mode === 'signin'
          ? { email: form.email, password: form.password }
          : { email: form.email, password: form.password, username: form.username };

      const data = await api.post(endpoint, body);
      login(data.user || data);
      navigate('/');
    } catch (err) {
      setError(
        err?.message ||
          (mode === 'signin'
            ? 'Email ou mot de passe incorrect.'
            : 'Inscription impossible, réessaie.')
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          {/* Logo */}
          <div className="auth-logo">
            <img
              src="https://files.catbox.moe/zjnv47.jpeg"
              alt="Manga Drop"
              className="auth-logo__img"
            />
            <span className="auth-logo__text">Manga Drop</span>
          </div>

          {/* Titre */}
          <h1 className="auth-title">
            {mode === 'signin' ? 'Bon retour !' : 'Rejoins-nous'}
          </h1>
          <p className="auth-subtitle">
            {mode === 'signin'
              ? 'Connecte-toi pour continuer à lire.'
              : 'Crée ton compte et découvre des milliers de mangas.'}
          </p>

          {/* Onglets */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'signin' ? 'auth-tab--active' : ''}`}
              onClick={() => { setMode('signin'); setError(''); }}
            >
              Connexion
            </button>
            <button
              className={`auth-tab ${mode === 'signup' ? 'auth-tab--active' : ''}`}
              onClick={() => { setMode('signup'); setError(''); }}
            >
              Inscription
            </button>
          </div>

          {/* Formulaire */}
          <div className="auth-form">
            {/* Pseudo (inscription uniquement) */}
            {mode === 'signup' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="username">Pseudo</label>
                <div className="auth-input-wrap">
                  <User size={16} color="#94A3B8" strokeWidth={2} />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Ton pseudo"
                    value={form.username}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="auth-input"
                    autoComplete="username"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email</label>
              <div className="auth-input-wrap">
                <Mail size={16} color="#94A3B8" strokeWidth={2} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ton@email.com"
                  value={form.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="auth-input"
                  autoComplete="email"
                  autoFocus={mode === 'signin'}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="password">Mot de passe</label>
              <div className="auth-input-wrap">
                <Lock size={16} color="#94A3B8" strokeWidth={2} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="auth-input"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="auth-toggle-pw"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Masquer' : 'Afficher'}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="#94A3B8" strokeWidth={2} />
                  ) : (
                    <Eye size={16} color="#94A3B8" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {/* Erreur */}
            {error && <p className="auth-error">{error}</p>}

            {/* Submit */}
            <button
              className="auth-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={18} color="#fff" strokeWidth={2} className="auth-spinner" />
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}</span>
                  <ArrowRight size={16} color="#fff" strokeWidth={2} />
                </>
              )}
            </button>
          </div>

          {/* Lien bas */}
          <p className="auth-switch">
            {mode === 'signin' ? "Pas encore de compte ? " : "Déjà un compte ? "}
            <button
              className="auth-switch__link"
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
            >
              {mode === 'signin' ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F8FAFC;
          padding: 24px 16px;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Logo */
        .auth-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .auth-logo__img {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          object-fit: cover;
        }
        .auth-logo__text {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #2563EB;
          letter-spacing: -0.02em;
        }

        /* Titre */
        .auth-title {
          font-family: 'Inter', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #1E293B;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        .auth-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #64748B;
          margin: 0 0 22px;
          line-height: 1.5;
        }

        /* Onglets */
        .auth-tabs {
          display: flex;
          background: #F1F5F9;
          border-radius: 10px;
          padding: 3px;
          margin-bottom: 22px;
        }
        .auth-tab {
          flex: 1;
          padding: 8px 0;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #64748B;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .auth-tab--active {
          background: #ffffff;
          color: #1E293B;
          font-weight: 600;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        /* Formulaire */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .auth-label {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1E293B;
        }
        .auth-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 0 12px;
          height: 44px;
          background: #F8FAFC;
          transition: border-color 0.15s;
        }
        .auth-input-wrap:focus-within {
          border-color: #2563EB;
          background: #fff;
        }
        .auth-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #1E293B;
          outline: none;
        }
        .auth-input::placeholder {
          color: #CBD5E1;
        }
        .auth-toggle-pw {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
        }

        /* Erreur */
        .auth-error {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #DC2626;
          margin: 0;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          padding: 8px 12px;
        }

        /* Submit */
        .auth-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 46px;
          background: #2563EB;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 4px;
          transition: background 0.15s;
        }
        .auth-submit:hover:not(:disabled) {
          background: #1D4ED8;
        }
        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .auth-spinner {
          animation: spin 0.8s linear infinite;
        }

        /* Switch */
        .auth-switch {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #64748B;
          text-align: center;
          margin: 18px 0 0;
        }
        .auth-switch__link {
          background: none;
          border: none;
          color: #2563EB;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          padding: 0;
        }
        .auth-switch__link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
