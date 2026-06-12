// src/pages/AuthPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

// Générateur captcha simple
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operation = ['+', '-'][Math.floor(Math.random() * 2)];
  return { num1, num2, operation, answer: operation === '+' ? num1 + num2 : num1 - num2 };
}

const SOURCES = [
  { value: 'google', label: 'Google' },
  { value: 'friend', label: 'Un ami' },
  { value: 'social', label: 'Réseaux sociaux' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'other', label: 'Autre' },
];

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    source: 'google',
    captchaAnswer: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  }

  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setFormData((f) => ({ ...f, captchaAnswer: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validation commune
    if (!formData.email || !formData.password) {
      setError('Email et mot de passe requis.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }

    // Validation inscription
    if (mode === 'signup') {
      if (!formData.username.trim()) {
        setError('Le pseudo est requis.');
        return;
      }
      if (formData.password !== formData.passwordConfirm) {
        setError('Les mots de passe ne correspondent pas.');
        return;
      }
      if (!formData.captchaAnswer) {
        setError('Veuillez répondre au captcha.');
        return;
      }
      if (parseInt(formData.captchaAnswer) !== captcha.answer) {
        setError('Réponse captcha incorrecte.');
        refreshCaptcha();
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = mode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const body =
        mode === 'signin'
          ? { email: formData.email, password: formData.password }
          : {
              email: formData.email,
              password: formData.password,
              username: formData.username,
              how_you_found_us: formData.source,
            };

      const data = await api.post(endpoint, body);
      login(data.user || data);

      if (formData.rememberMe) {
        localStorage.setItem('manga_drop_remember_email', formData.email);
      }

      navigate('/');
    } catch (err) {
      setError(
        err?.message ||
          (mode === 'signin'
            ? 'Email ou mot de passe incorrect.'
            : 'Inscription échouée, réessaie.')
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !loading) handleSubmit(e);
  }

  return (
    <>
      <div className="auth-page">
        <div className="auth-card auth-card--enter">
          {/* Logo */}
          <div className="auth-logo">
            <img
              src="https://files.catbox.moe/zjnv47.jpeg"
              alt="Manga Drop"
              className="auth-logo__img"
            />
            <span className="auth-logo__text">Manga Drop</span>
          </div>

          {/* Titre animé */}
          <h1 className="auth-title auth-title--fade">
            {mode === 'signin' ? 'Bon retour !' : 'Rejoins-nous'}
          </h1>
          <p className="auth-subtitle auth-subtitle--fade">
            {mode === 'signin'
              ? 'Connecte-toi pour continuer à lire.'
              : 'Crée ton compte et découvre des milliers de mangas.'}
          </p>

          {/* Onglets */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'signin' ? 'auth-tab--active' : ''}`}
              onClick={() => {
                setMode('signin');
                setError('');
              }}
            >
              Connexion
            </button>
            <button
              className={`auth-tab ${mode === 'signup' ? 'auth-tab--active' : ''}`}
              onClick={() => {
                setMode('signup');
                setError('');
                setCaptcha(generateCaptcha());
              }}
            >
              Inscription
            </button>
          </div>

          {/* Formulaire */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Pseudo (inscription) */}
            {mode === 'signup' && (
              <div className="auth-field auth-field--slide">
                <label className="auth-label" htmlFor="username">
                  Pseudo
                </label>
                <div className="auth-input-wrap">
                  <User size={16} color="#94A3B8" strokeWidth={2} />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Ton pseudo"
                    value={formData.username}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="auth-input"
                    autoComplete="username"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="auth-field auth-field--slide">
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <div className="auth-input-wrap">
                <Mail size={16} color="#94A3B8" strokeWidth={2} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ton@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="auth-input"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="auth-field auth-field--slide">
              <label className="auth-label" htmlFor="password">
                Mot de passe
              </label>
              <div className="auth-input-wrap">
                <Lock size={16} color="#94A3B8" strokeWidth={2} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
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

            {/* Confirmation mot de passe (inscription) */}
            {mode === 'signup' && (
              <div className="auth-field auth-field--slide">
                <label className="auth-label" htmlFor="passwordConfirm">
                  Confirmer le mot de passe
                </label>
                <div className="auth-input-wrap">
                  <Lock size={16} color="#94A3B8" strokeWidth={2} />
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    placeholder="••••••••"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="auth-input"
                  />
                </div>
              </div>
            )}

            {/* Comment avez-vous connu (inscription) */}
            {mode === 'signup' && (
              <div className="auth-field auth-field--slide">
                <label className="auth-label" htmlFor="source">
                  Comment avez-vous connu Manga Drop ?
                </label>
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="auth-select"
                >
                  {SOURCES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Captcha (inscription) */}
            {mode === 'signup' && (
              <div className="auth-field auth-field--slide">
                <label className="auth-label">
                  Captcha : {captcha.num1} {captcha.operation} {captcha.num2} = ?
                </label>
                <div className="auth-captcha">
                  <input
                    type="number"
                    name="captchaAnswer"
                    placeholder="Réponse"
                    value={formData.captchaAnswer}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="auth-input"
                  />
                  <button
                    type="button"
                    className="auth-captcha-refresh"
                    onClick={refreshCaptcha}
                    title="Nouveau captcha"
                  >
                    <RefreshCw size={18} color="#2563EB" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}

            {/* Se souvenir de moi */}
            {mode === 'signin' && (
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Se souvenir de moi</span>
              </label>
            )}

            {/* Erreur */}
            {error && (
              <p className="auth-error auth-error--shake">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit auth-submit--pulse"
              disabled={loading}
            >
              {loading ? (
                <Loader2
                  size={18}
                  color="#fff"
                  strokeWidth={2}
                  className="auth-spinner"
                />
              ) : (
                <>
                  <span>
                    {mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}
                  </span>
                  <ArrowRight size={16} color="#fff" strokeWidth={2} />
                </>
              )}
            </button>
          </form>

          {/* Lien bas */}
          <p className="auth-switch auth-switch--fade">
            {mode === 'signin' ? "Pas encore de compte ? " : "Déjà un compte ? "}
            <button
              className="auth-switch__link"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError('');
                setCaptcha(generateCaptcha());
              }}
            >
              {mode === 'signin' ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>

          {/* Note Google OAuth */}
          <p className="auth-note">
            💡 Connexion Google à configurer avec une clé OAuth. Contacte-nous pour les détails.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .auth-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background);
          padding: 24px 16px;
          animation: fadeIn 0.5s ease-out;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .auth-card--enter {
          animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          animation: fadeIn 0.7s ease-out 0.1s backwards;
        }

        .auth-logo__img {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          object-fit: cover;
        }

        .auth-logo__text {
          font-family: var(--font-sans);
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: -0.02em;
        }

        .auth-title {
          font-family: var(--font-sans);
          font-size: 22px;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }

        .auth-title--fade {
          animation: fadeIn 0.6s ease-out 0.15s backwards;
        }

        .auth-subtitle {
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--color-text-light);
          margin: 0 0 22px;
          line-height: 1.5;
          animation: fadeIn 0.6s ease-out 0.2s backwards;
        }

        .auth-subtitle--fade {
          animation: fadeIn 0.6s ease-out 0.2s backwards;
        }

        .auth-tabs {
          display: flex;
          background: var(--color-background);
          border-radius: 10px;
          padding: 3px;
          margin-bottom: 22px;
          animation: fadeIn 0.6s ease-out 0.25s backwards;
        }

        .auth-tab {
          flex: 1;
          padding: 8px 0;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-light);
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .auth-tab--active {
          background: var(--color-white);
          color: var(--color-text);
          font-weight: 600;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }

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

        .auth-field--slide {
          animation: slideDown 0.4s ease-out backwards;
        }

        .auth-field--slide:nth-child(1) { animation-delay: 0.1s; }
        .auth-field--slide:nth-child(2) { animation-delay: 0.15s; }
        .auth-field--slide:nth-child(3) { animation-delay: 0.2s; }
        .auth-field--slide:nth-child(4) { animation-delay: 0.25s; }
        .auth-field--slide:nth-child(5) { animation-delay: 0.3s; }

        .auth-label {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text);
        }

        .auth-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 0 12px;
          height: 44px;
          background: var(--color-background);
          transition: border-color 0.2s, background 0.2s;
        }

        .auth-input-wrap:focus-within {
          border-color: var(--color-primary);
          background: var(--color-white);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .auth-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 15px;
          color: var(--color-text);
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
          transition: opacity 0.2s;
        }

        .auth-toggle-pw:active {
          opacity: 0.7;
        }

        .auth-select {
          width: 100%;
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 10px 12px;
          height: 44px;
          background: var(--color-background);
          font-family: var(--font-sans);
          font-size: 15px;
          color: var(--color-text);
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .auth-select:focus {
          border-color: var(--color-primary);
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .auth-captcha {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .auth-captcha .auth-input {
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }

        .auth-captcha-refresh {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border: 1px solid var(--color-border);
          border-radius: 10px;
          background: var(--color-background);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .auth-captcha-refresh:hover {
          background: #EFF6FF;
        }

        .auth-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--color-text);
        }

        .auth-checkbox input {
          cursor: pointer;
          width: 18px;
          height: 18px;
        }

        .auth-error {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--color-danger);
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          padding: 10px 12px;
          margin: 0;
        }

        .auth-error--shake {
          animation: shake 0.4s ease-in-out;
        }

        .auth-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 46px;
          background: var(--color-primary);
          color: white;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 4px;
          transition: background 0.2s;
        }

        .auth-submit:hover:not(:disabled) {
          background: var(--color-primary-hover);
        }

        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-submit--pulse {
          animation: pulse 0.6s ease-out 0.5s backwards;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-spinner {
          animation: spin 0.8s linear infinite;
        }

        .auth-switch {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--color-text-light);
          text-align: center;
          margin: 18px 0 0;
        }

        .auth-switch--fade {
          animation: fadeIn 0.6s ease-out 0.55s backwards;
        }

        .auth-switch__link {
          background: none;
          border: none;
          color: var(--color-primary);
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 13px;
          padding: 0;
          transition: opacity 0.2s;
        }

        .auth-switch__link:hover {
          text-decoration: underline;
          opacity: 0.8;
        }

        .auth-note {
          font-family: var(--font-sans);
          font-size: 12px;
          color: var(--color-text-light);
          text-align: center;
          margin: 14px 0 0;
          padding: 8px;
          background: #F0F9FF;
          border-radius: 6px;
          animation: fadeIn 0.6s ease-out 0.6s backwards;
        }
      `}</style>
    </>
  );
}