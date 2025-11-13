import React from "react";
import { useTranslation } from "react-i18next";
import '../styles/Bienvenida.css'; // 1. Importar el nuevo CSS

function Bienvenida({ user, onLogout }) {
  const { t } = useTranslation();

  // 2. Extraer los atributos de forma segura
  // (El objeto 'attributes' lo cargamos en App.jsx)
  const name = user?.attributes?.name || "N/A";
  const email = user?.attributes?.email || user?.signInDetails?.loginId || "N/A";
  const phone = user?.attributes?.phone_number || "N/A";

  return (
    <div>
      <h2>{t('dashboard.welcomeTitle')}</h2>
      
      {/* 3. Mantenemos el mensaje original */}
      <p>{t('dashboard.authenticatedAs', { email: email })}</p>
      
      {/* 4. Añadimos la nueva tarjeta de información */}
      <div className="doctor-info-card">
        <h3>{t('dashboard.doctorDataTitle')}</h3>
        <p>
          <strong>{t('dashboard.doctorName')}</strong>
          <span>{name}</span>
        </p>
        <p>
          <strong>{t('dashboard.doctorEmail')}</strong>
          <span>{email}</span>
        </p>
        <p>
          <strong>{t('dashboard.doctorPhone')}</strong>
          <span>{phone}</span>
        </p>
      </div>
      
      <button
        onClick={onLogout}
        style={{ marginTop: "30px", padding: "10px 20px" }}
      >
        {t('dashboard.logoutButton')}
      </button>
    </div>
  );
}

export default Bienvenida;