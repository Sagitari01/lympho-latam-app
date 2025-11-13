import React from 'react';
import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Dashboard.css';

function MainLayout({ user, onLogout }) {
  const { t, i18n } = useTranslation();

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

      <div className="lang-switch">
        <button onClick={() => handleLanguageChange('es')}><span className="fi fi-es"></span> ES</button>
        <button onClick={() => handleLanguageChange('en')}><span className="fi fi-gb"></span> EN</button>
        <button onClick={() => handleLanguageChange('br')}><span className="fi fi-br"></span> BR</button>
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