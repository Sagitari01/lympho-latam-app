import React from 'react';
import { useTranslation } from 'react-i18next';

function ListadoPacientes() {
  const { t } = useTranslation();
  return (
    <div className="container form-content" id="content-empty">
      <div className="empty-content-placeholder">
        <h1>{t('dashboard.pageUnderConstruction')}</h1>
        <p>{t('dashboard.contentPatientList')}</p>
      </div>
    </div>
  );
}

export default ListadoPacientes;