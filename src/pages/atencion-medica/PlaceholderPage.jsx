import React from 'react';
// 👇 CAMBIO AQUÍ: Se corrigió la importación
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Helper para obtener un título legible desde la ruta
function getTitleKey(pathname) {
  if (pathname.includes('anamnesis')) return 'atencionMedica.nav.anamnesis';
  if (pathname.includes('signos-vitales')) return 'atencionMedica.nav.signos';
  if (pathname.includes('examen-fisico')) return 'atencionMedica.nav.examen';
  if (pathname.includes('diagnostico')) return 'atencionMedica.nav.diagnostico';
  if (pathname.includes('evolucion')) return 'atencionMedica.nav.evolucion';
  if (pathname.includes('procedimiento')) return 'atencionMedica.nav.procedimiento';
  return 'dashboard.pageUnderConstruction';
}

function PlaceholderPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const titleKey = getTitleKey(location.pathname);

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t(titleKey)}</h2>
        <button className="save-button">{t('atencionMedica.btnSave')}</button>
      </div>
      <div className="empty-content-placeholder" style={{padding: '20px'}}>
        <p>{t('dashboard.pageUnderConstruction')}</p>
      </div>
    </div>
  );
}

export default PlaceholderPage;