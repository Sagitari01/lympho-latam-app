import React from 'react';
import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Importar hook
import '../styles/Dashboard.css';

function MainLayout({ user, onLogout }) {
  const { t, i18n } = useTranslation(); // 2. Usar hook

  // 3. Añadir función para cambiar idioma
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="dashboard-layout">
      <div className="top-header">
        <div className="logo">
          <span className="logo-text">LYMPHO LATAM</span>
        </div>
      </div>

      {/* 4. Añadir selector de idioma (copiado de LoginForm) */}
      <div className="lang-switch">
        <button onClick={() => handleLanguageChange('es')}>ES</button>
        <button onClick={() => handleLanguageChange('en')}>EN</button>
        <button onClick={() => handleLanguageChange('pt')}>PT</button>
      </div>

      <nav className="main-nav">
        <ul>
          <li><NavLink to="/app/sesion" className="nav-link">{t('dashboard.navUserSession')}</NavLink></li>
          <li><NavLink to="/app/ingreso" className="nav-link">{t('dashboard.navPatientIntake')}</NavLink></li>
          <li><NavLink to="/app/listado" className="nav-link">{t('dashboard.navPatientList')}</NavLink></li>
          <li><NavLink to="/app/reportes" className="nav-link">{t('dashboard.navReports')}</NavLink></li>
        </ul>
      </nav>

      <Outlet context={{ user, onLogout }} />
    </div>
  );
}

export default MainLayout;