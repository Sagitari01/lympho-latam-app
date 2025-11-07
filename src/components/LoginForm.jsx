import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/LoginForm.css";

export default function LoginForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { t, i18n } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      e.target.reset();
    }, 3000);
  };

  // Cambio de idioma simple
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="login-bg">
      <div className="lang-switch">
        <button onClick={() => handleLanguageChange('es')}>ES</button>
        <button onClick={() => handleLanguageChange('en')}>EN</button>
      </div>
      <div className="login-container">
        <div className="logo-container">
          <div className="logo-placeholder">
            <svg width="30" height="30" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="3" />
              <path d="M30 15C21.716 15 15 21.716 15 30C15 38.284 21.716 45 30 45C38.284 45 45 38.284 45 30"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="30" cy="30" r="8" fill="currentColor" />
            </svg>
          </div>
        </div>
        <h1 className="form-title">{t('login.title')}</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" className="submit-button">{t('login.enter')}</button>
        </form>
        <div className="forgot-password">
          <a href="#" onClick={e => e.preventDefault()}>{t('login.forgot')}</a>
        </div>
        <div className="success-message" style={{ display: showSuccess ? "block" : "none" }}>
          {t('login.success')}
        </div>
      </div>
    </div>
  );
}
