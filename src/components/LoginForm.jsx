// components/LoginForm.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/LoginForm.css";

// 👇 CAMBIO 1: Importamos 'signIn' desde el nuevo paquete
import { signIn } from '@aws-amplify/auth'; 

export default function LoginForm({ onLoginSuccess }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // 👇 CAMBIO 2: Así se llama a signIn en v6
      const { isSignedIn, nextStep } = await signIn({
        username: email, // En Cognito, "username" es el email
        password: password,
      });

      // ¡Éxito! (Asumimos que el login es completo)
      // 'isSignedIn' te dirá si el login fue exitoso.
      if (isSignedIn) {
        onLoginSuccess(); // Avisamos a App.jsx
      } else {
        // Esto puede pasar si tienes Multi-Factor Authentication (MFA)
        console.log('El siguiente paso es:', nextStep);
        setError("Se requiere un paso adicional (MFA).");
      }

    } catch (err) {
      setIsLoading(false);
      console.error('Error al iniciar sesión:', err);
      // v6 manda errores más específicos. ej: err.name
      if (err.name === 'UserNotFoundException' || err.name === 'NotAuthorizedException') {
        setError('Correo o contraseña incorrectos.');
      } else {
        setError(err.message || 'Error de autenticación');
      }
    }
    // NOTA: En un login exitoso, isLoading se pondrá en false
    // cuando App.jsx cambie el componente
  };

  return (
    <div className="login-bg">
      <div className="lang-switch">
        <button onClick={() => handleLanguageChange('es')}>ES</button>
        <button onClick={() => handleLanguageChange('en')}>EN</button>
      </div>
      <div className="login-container">
        {/* ... (Todo tu SVG y HTML se mantiene igual) ... */}
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
        {/* ... (Tu link de 'forgot-password' se mantiene igual) ... */}
      </div>
    </div>
  );
}