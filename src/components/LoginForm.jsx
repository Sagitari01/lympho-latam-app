// components/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/LoginForm.css";

import { signIn, resetPassword, confirmResetPassword } from '@aws-amplify/auth'; 

export default function LoginForm({ onLoginSuccess }) {
  const { t, i18n } = useTranslation();
  
  // --- Estados de Formulario ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // --- Estados para Flujo de Reseteo ---
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // --- Estados de UI ---
  const [viewMode, setViewMode] = useState('signIn'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // --- Estados para visibilidad de contraseña ---
  const [isSignInPasswordVisible, setIsSignInPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  useEffect(() => {
    let titleKey = 'app.titleLogin';
    if (viewMode === 'forgotPassword') titleKey = 'login.forgotTitle';
    if (viewMode === 'confirmPassword') titleKey = 'login.confirmTitle';
    document.title = t(titleKey);
  }, [viewMode, i18n.language, t]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  // --- Manejador de Inicio de Sesión (Existente) ---
  const handleSubmitSignIn = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { isSignedIn } = await signIn({ username: email, password: password });
      if (isSignedIn) {
        onLoginSuccess();
      }
    } catch (err) {
      setIsLoading(false);
      if (err.name === 'UserNotFoundException' || err.name === 'NotAuthorizedException') {
        setError(t('login.errorInvalidCredentials'));
      } else {
        setError(err.message || t('login.errorAuthGeneric'));
      }
    }
  };
  const handleSubmitForgotPassword = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await resetPassword({ username: email });
      setIsLoading(false);
      setSuccessMessage(t('login.successCodeSent'));
      setViewMode('confirmPassword');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };
  const handleSubmitConfirmReset = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
setError(null);
    setSuccessMessage(null);

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: confirmationCode,
        newPassword: newPassword,
      });
      setIsLoading(false);
      setSuccessMessage(t('login.successPasswordChanged'));
      setViewMode('signIn');
      setEmail('');
      setPassword('');
      setConfirmationCode('');
      setNewPassword('');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };
  const goToForgotPassword = () => {
    setViewMode('forgotPassword');
    setError(null);
    setSuccessMessage(null);
    setPassword('');
  };
  const goToSignIn = () => {
    setViewMode('signIn');
    setError(null);
    setSuccessMessage(null);
    setPassword('');
    setConfirmationCode('');
    setNewPassword('');
  };


  // --- Renderizado del Formulario ---
  
  const renderSignInForm = () => (
    <>
      <h1 className="form-title">{t('login.title')}</h1>
      <form onSubmit={handleSubmitSignIn}>
        <div className="form-group">
          <label htmlFor="email">{t('login.email')}</label>
          <input
            type="email" id="email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{t('login.password')}</label>
          <div className="password-input-container">
            <input
              type={isSignInPasswordVisible ? 'text' : 'password'}
              id="password" required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i 
              className={`password-toggle-icon fa-solid ${isSignInPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setIsSignInPasswordVisible(!isSignInPasswordVisible)}
            />
          </div>
        </div>
        
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? t('login.loading') : t('login.enter')}
        </button>
      </form>
      <div className="forgot-password">
        <a href="#" onClick={(e) => { e.preventDefault(); goToForgotPassword(); }}>
          {t('login.forgot')}
        </a>
      </div>
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
      <h1 className="form-title">{t('login.forgotTitle')}</h1>
      <p style={{textAlign: 'center', marginBottom: '15px'}}>{t('login.forgotSubtitle')}</p>
      <form onSubmit={handleSubmitForgotPassword}>
        <div className="form-group">
          <label htmlFor="email">{t('login.email')}</label>
          <input
            type="email" id="email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? t('login.loading') : t('login.sendCodeButton')}
        </button>
      </form>
      <div className="forgot-password">
        <a href="#" onClick={(e) => { e.preventDefault(); goToSignIn(); }}>
          {t('login.backToSignIn')}
        </a>
      </div>
    </>
  );

  const renderConfirmResetForm = () => (
    <>
      <h1 className="form-title">{t('login.confirmTitle')}</h1>
      <p style={{textAlign: 'center', marginBottom: '15px'}}>{t('login.confirmSubtitle')}</p>
      <form onSubmit={handleSubmitConfirmReset}>
        <div className="form-group">
          <label htmlFor="code">{t('login.codeLabel')}</label>
          <input
            type="text" id="code" required
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="newPassword">{t('login.newPasswordLabel')}</label>
          <div className="password-input-container">
            <input
              type={isNewPasswordVisible ? 'text' : 'password'}
              id="newPassword" required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <i 
              className={`password-toggle-icon fa-solid ${isNewPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
            />
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? t('login.loading') : t('login.confirmButton')}
        </button>
      </form>
      <div className="forgot-password">
        <a href="#" onClick={(e) => { e.preventDefault(); goToSignIn(); }}>
          {t('login.backToSignIn')}
        </a>
      </div>
    </>
  );
  
  // --- Renderizado Principal ---

  return (
    <div className="login-bg">
      <div className="lang-switch">
        <button onClick={() => handleLanguageChange('es')}><span className="fi fi-es"></span> ES</button>
        <button onClick={() => handleLanguageChange('en')}><span className="fi fi-gb"></span> EN</button>
        {/* --- 👇 CAMBIO: Llama a 'br' --- */}
        <button onClick={() => handleLanguageChange('br')}><span className="fi fi-br"></span> BR</button>
      </div>
      
      <div className="login-container">
        <div className="logo-container">
          <img 
            src="/images/LOGOBajadaNEGRO.png" 
            alt="Lympho Latam Logo" 
            className="login-logo" 
          />
        </div>

        {/* --- Mensajes Globales de Error/Éxito --- */}
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="form-error" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* --- Renderizado Condicional de la Vista --- */}
        {viewMode === 'signIn' && renderSignInForm()}
        {viewMode === 'forgotPassword' && renderForgotPasswordForm()}
        {viewMode === 'confirmPassword' && renderConfirmResetForm()}

      </div>
    </div>
  );
}