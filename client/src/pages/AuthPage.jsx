import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { registerUser, loginUser } from '../services/api';

const MODES = {
  SIGNIN: 'signin',
  SIGNUP: 'signup',
};

const INITIAL_FORM = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export default function AuthPage() {
  const [mode, setMode] = useState(MODES.SIGNIN);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    setError('');
    setFormData(INITIAL_FORM);
  }, []);

  const validate = () => {
    const { email, password, username, passwordConfirm } = formData;

    if (!email.trim() || !password) {
      return 'Email et mot de passe requis.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email invalide.';
    }

    if (password.length < 6) {
      return 'Le mot de passe doit faire au moins 6 caractères.';
    }

    if (mode === MODES.SIGNUP) {
      if (!username.trim()) {
        return 'Le pseudo est requis.';
      }
      if (username.trim().length < 3) {
        return 'Le pseudo doit faire au moins 3 caractères.';
      }
      if (password !== passwordConfirm) {
        return 'Les mots de passe ne correspondent pas.';
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const { email, password, username } = formData;
      const data = mode === MODES.SIGNIN
        ? await loginUser(email, password)
        : await registerUser(email, username.trim(), password);

      if (data?.token && data?.user) {
        login(data.user, data.token);
        navigate('/', { replace: true });
      } else {
        setError('Erreur: réponse du serveur invalide.');
      }
    } catch (err) {
      setError(err?.error || err?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const isSignup = mode === MODES.SIGNUP;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img
            src="https://files.catbox.moe/zjnv47.jpeg"
            alt="Manga Drop"
            className="auth-logo__img"
            loading="lazy"
          />
          <span className="auth-logo__text">Manga Drop</span>
        </div>

        <h1 className="auth-title">
          {isSignup ? 'Rejoins-nous' : 'Bon retour'}
        </h1>
        <p className="auth-subtitle">
          {isSignup
            ? 'Crée ton compte et découvre des milliers de mangas.'
            : 'Connecte-toi pour continuer à lire.'}
        </p>

        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === MODES.SIGNIN}
            className={`auth-tab ${mode === MODES.SIGNIN ? 'auth-tab--active' : ''}`}
            onClick={() => switchMode(MODES.SIGNIN)}
          >
            Connexion
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isSignup}
            className={`auth-tab ${isSignup ? 'auth-tab--active' : ''}`}
            onClick={() => switchMode(MODES.SIGNUP)}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {isSignup && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="username">Pseudo</label>
              <div className="auth-input-wrap">
                <User size={16} aria-hidden="true" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Ton pseudo"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                  className="auth-input"
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <div className="auth-input-wrap">
              <Mail size={16} aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ton@email.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={loading}
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Mot de passe</label>
            <div className="auth-input-wrap">
              <Lock size={16} aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                disabled={loading}
                className="auth-input"
              />
              <button
                type="button"
                className="auth-toggle-pw"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {isSignup && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="passwordConfirm">Confirmer le mot de passe</label>
              <div className="auth-input-wrap">
                <Lock size={16} aria-hidden="true" />
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="••••••••"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={loading}
                  className="auth-input"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <Loader2 size={18} className="auth-spinner" aria-label="Chargement" />
            ) : (
              <>
                <span>{isSignup ? 'Créer mon compte' : 'Se connecter'}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
          <button
            type="button"
            className="auth-switch__link"
            onClick={() => switchMode(isSignup ? MODES.SIGNIN : MODES.SIGNUP)}
          >
            {isSignup ? 'Se connecter' : "S'inscrire"}
          </button>
        </p>
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
          max-width: 420px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
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
          font-size: 18px;
          font-weight: 700;
          color: #2563EB;
        }
        .auth-title {
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 6px;
        }
        .auth-subtitle {
          font-size: 14px;
          color: #64748B;
          margin-bottom: 22px;
        }
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
          font-size: 14px;
          font-weight: 500;
          color: #64748B;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .auth-tab--active {
          background: #FFFFFF;
          color: #0F172A;
          font-weight: 600;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
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
        .auth-label {
          font-size: 13px;
          font-weight: 500;
          color: #0F172A;
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
          transition: border-color 0.2s, background 0.2s;
        }
        .auth-input-wrap:focus-within {
          border-color: #2563EB;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .auth-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 15px;
          color: #0F172A;
          outline: none;
          min-width: 0;
        }
        .auth-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .auth-input::placeholder {
          color: #CBD5E1;
        }
        .auth-toggle-pw {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .auth-toggle-pw:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .auth-error {
          font-size: 13px;
          color: #DC2626;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          padding: 10px 12px;
          margin: 0;
        }
        .auth-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 46px;
          background: #2563EB;
          color: white;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 6px;
        }
        .auth-submit:hover:not(:disabled) {
          background: #1D4ED8;
        }
        .auth-submit:active:not(:disabled) {
          transform: scale(0.98);
        }
        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-spinner {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .auth-switch {
          font-size: 13px;
          color: #64748B;
          text-align: center;
          margin-top: 18px;
        }
        .auth-switch__link {
          background: none;
          border: none;
          color: #2563EB;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
          padding: 0;
        }
        .auth-switch__link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}