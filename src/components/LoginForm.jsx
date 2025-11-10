// components/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/LoginForm.css";
import { signIn } from '@aws-amplify/auth';

export default function LoginForm({ onLoginSuccess }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = t('app.titleLogin');
  }, [i18n.language, t]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
      });

      if (isSignedIn) {
        onLoginSuccess();
      } else {
        console.log('El siguiente paso es:', nextStep);
        setError("Se requiere un paso adicional (MFA).");
      }

    } catch (err) {
      setIsLoading(false);
      console.error('Error al iniciar sesión:', err);
      if (err.name === 'UserNotFoundException' || err.name === 'NotAuthorizedException') {
        setError(t('login.errorInvalidCredentials') || 'Correo o contraseña incorrectos.');
      } else {
        setError(err.message || t('login.errorAuthGeneric') || 'Error de autenticación');
      }
    }
  };

  return (
    <div className="login-bg">
      <div className="lang-switch">
        <button onClick={() => handleLanguageChange('es')}>ES</button>
        <button onClick={() => handleLanguageChange('en')}>EN</button>
      </div>
      <div className="login-container">
        <div className="logo-container">
          <img
            src="/images/LOGOBajadaNEGRO.png"
            alt="Lympho Latam Logo"
            className="login-logo"
          />
        </div>
        <h1 className="form-title">{t('login.title')}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="form-error" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? t('login.loading') : t('login.enter')}
          </button>
        </form>
        <div className="forgot-password">
          <a href="#" onClick={e => e.preventDefault()}>{t('login.forgot')}</a>
        </div>
      </div>
    </div>
  );
}