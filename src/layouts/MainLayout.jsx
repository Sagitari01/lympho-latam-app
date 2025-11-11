import React, { useEffect } from 'react';
import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Dashboard.css'; // Importamos el CSS

function MainLayout({ user, onLogout }) {
  const { t } = useTranslation();

  return (
    <div className="dashboard-layout">
      <div className="top-header">
        <div className="logo">
          <span className="logo-text">LYMPHO LATAM</span>
        </div>
        {/* Aquí podrías añadir el botón de logout */}
      </div>

      <nav className="main-nav">
        <ul>
          {/* Usamos NavLink en lugar de <a>
            'to' es la ruta que definiremos en App.jsx
            React Router añadirá la clase 'active' automáticamente
          */}
          <li><NavLink to="/app/sesion" className="nav-link">{t('dashboard.navUserSession')}</NavLink></li>
          <li><NavLink to="/app/ingreso" className="nav-link">{t('dashboard.navPatientIntake')}</NavLink></li>
          <li><NavLink to="/app/listado" className="nav-link">{t('dashboard.navPatientList')}</NavLink></li>
          <li><NavLink to="/app/reportes" className="nav-link">{t('dashboard.navReports')}</NavLink></li>
        </ul>
      </nav>

      {/* <Outlet /> es el marcador de React Router donde
        se renderizará la página activa (Ingreso, Listado, etc.)
        Usamos 'context' para pasar las props 'user' y 'onLogout'
        a la página de "Sesión de Usuario".
      */}
      <Outlet context={{ user, onLogout }} />
    </div>
  );
}

export default MainLayout;