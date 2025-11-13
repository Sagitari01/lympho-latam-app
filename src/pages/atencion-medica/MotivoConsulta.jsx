import React from 'react';
import { useTranslation } from 'react-i18next';

function MotivoConsulta() {
  const { t } = useTranslation();

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionMedica.nav.motivo')}</h2>
        <button className="save-button">{t('atencionMedica.btnSave')}</button>
      </div>
      <textarea>
        {/* Aquí se cargará el texto guardado */}
      </textarea>
    </div>
  );
}

export default MotivoConsulta;