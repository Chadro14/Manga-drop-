// AuthPage.jsx - Version simplifiée et corrigée
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { registerUser, loginUser } from '../services/api';

export default function AuthPage() {
  const [mode, setMode] = useState('signin');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password, username, passwordConfirm } = formData;

    if (!email || !password) {
      setError('Email et mot de passe requis.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }

    if (mode === 'signup') {
      if (!username.trim()) {
        setError('Le pseudo est requis.');
        return;
      }
      if (password !== passwordConfirm) {
        setError('Les mots de passe ne correspondent pas.');
        return;
      }
    }

    setLoading(true);

    try {
      let data;
      if (mode === 'signin') {
        data = await loginUser(email, password);
      } else {
        data = await registerUser(email, username, password);
      }

      if (data.token && data.user) {
        login(data.user, data.token);
        navigate('/');
      } else {
        setError('Erreur: réponse du serveur invalide.');
      }
    } catch (err) {
      setError(err?.error || err?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="https://files.catbox.moe/zjnv47.jpeg" alt="Manga Drop" className="auth-logo__img" />
          <span className="auth-logo__text">Manga Drop</span>
        </div>

        <h1 className="auth-title">{mode === 'signin' ? 'Bon retour' : 'Rejoins-nous'}</h1>
        <p className="auth-subtitle">
          {mode === 'signin' ? 'Connecte-toi pour continuer à lire.' : 'Crée ton compte et découvre des milliers de mangas.'}
        </p>

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

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Pseudo</label>
              <div className="auth-input-wrap">
                <User size={16} />
                <input
                  name="username"
                  type="text"
                  placeholder="Ton pseudo"
                  value={formData.username}
                  onChange={handleChange}
                  className="auth-input"
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <div className="auth-input-wrap">
              <Mail size={16} />
              <input
                name="email"
                type="email"
                placeholder="ton@email.com"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <div className="auth-input-wrap">
              <Lock size={16} />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
              />
              <button
                type="button"
                className="auth-toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Confirmer le mot de passe</label>
              <div className="auth-input-wrap">
                <Lock size={16} />
                <input
                  name="passwordConfirm"
                  type="password"
                  placeholder="••••••••"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className="auth-input"
                />
              </div>
            </div>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <Loader2 size={18} className="auth-spinner" />
            ) : (
              <>
                <span>{mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'signin' ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
          <button
            className="auth-switch__link"
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
          >
            {mode === 'signin' ? "S'inscrire" : 'Se connecter'}
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
        }
        .auth-input::placeholder {
          color: #CBD5E1;
        }
        .auth-toggle-pw {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
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
        }
        .auth-submit:hover:not(:disabled) {
          background: #1D4ED8;
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