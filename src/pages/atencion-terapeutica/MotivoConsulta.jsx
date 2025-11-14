import React from 'react';
import { useTranslation } from 'react-i18next';

// Este componente reutiliza los estilos .subpage-content, .subpage-header, etc.
// definidos en AtencionMedica.css. ¡No necesitamos duplicar CSS!

function MotivoConsulta() {
  const { t } = useTranslation();

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionTerapeutica.nav.motivo')}</h2>
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>
      <textarea>
        {/* Aquí se cargará el texto guardado */}
      </textarea>
    </div>
  );
}

export default MotivoConsulta;