import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Helper para obtener un título legible desde la ruta
function getTitleKey(pathname) {
  if (pathname.includes('signos-vitales')) return 'atencionTerapeutica.nav.signos';
  if (pathname.includes('examen-fisico')) return 'atencionTerapeutica.nav.examenFisico';
  // 'problemas-objetivos' ELIMINADO DE AQUÍ
  if (pathname.includes('evaluacion-lipedema')) return 'atencionTerapeutica.nav.evaluacionLipedema';
  if (pathname.includes('procedimiento')) return 'atencionTerapeutica.nav.procedimiento';
  if (pathname.includes('reporte')) return 'atencionTerapeutica.nav.reporte';
  if (pathname.includes('historial')) return 'atencionTerapeutica.nav.historial';
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
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>
      <div className="empty-content-placeholder" style={{padding: '20px'}}>
        <p>{t('dashboard.pageUnderConstruction')}</p>
      </div>
    </div>
  );
}

export default PlaceholderPage;