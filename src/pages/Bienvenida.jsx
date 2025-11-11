import React from "react";
import { useTranslation } from "react-i18next"; // 1. Importar hook

function Bienvenida({ user, onLogout }) {
  const { t } = useTranslation(); // 2. Usar el hook
  const email = user.signInDetails?.loginId || user.username;

  return (
    <div>
      {/* 3. Usar 't' para el título */}
      <h2>{t('dashboard.welcomeTitle')}</h2>
      
      {/* 4. Usar 't' con interpolación para el email */}
      <p>{t('dashboard.authenticatedAs', { email: email })}</p>
      
      <button
        onClick={onLogout}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        {/* 5. Usar 't' para el botón */}
        {t('dashboard.logoutButton')}
      </button>
    </div>
  );
}

export default Bienvenida;