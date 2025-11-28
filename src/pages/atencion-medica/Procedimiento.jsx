import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Procedimiento() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleIconClick = () => {
    setShowModal(true);
  };

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionMedica.nav.procedimiento')}</h2>
        <button className="save-button">{t('atencionMedica.btnSave')}</button>
      </div>

      <div className="procedure-container">
        
        {/* 1. Recetas */}
        <div className="procedure-card" onClick={handleIconClick}>
          <i className="fa-solid fa-file-prescription procedure-icon" style={{color: '#f39c12'}}></i>
          <span className="procedure-title">{t('atencionMedica.procedimiento.recetas')}</span>
        </div>

        {/* 2. Laboratorio */}
        <div className="procedure-card" onClick={handleIconClick}>
          <i className="fa-solid fa-flask procedure-icon" style={{color: '#3498db'}}></i>
          <span className="procedure-title">{t('atencionMedica.procedimiento.laboratorio')}</span>
        </div>

        {/* 3. Radiología */}
        <div className="procedure-card" onClick={handleIconClick}>
          <i className="fa-solid fa-x-ray procedure-icon" style={{color: '#7f8c8d'}}></i>
          <span className="procedure-title">{t('atencionMedica.procedimiento.radiologia')}</span>
        </div>

        {/* 4. Quirúrgica */}
        <div className="procedure-card" onClick={handleIconClick}>
          <i className="fa-solid fa-user-doctor procedure-icon" style={{color: '#e74c3c'}}></i>
          <span className="procedure-title">{t('atencionMedica.procedimiento.quirurgica')}</span>
        </div>

        {/* 5. Derivación */}
        <div className="procedure-card" onClick={handleIconClick}>
          <i className="fa-solid fa-share-nodes procedure-icon" style={{color: '#9b59b6'}}></i>
          <span className="procedure-title">{t('atencionMedica.procedimiento.derivacion')}</span>
        </div>

      </div>

      {/* Modal de "En Construcción" */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{t('atencionMedica.procedimiento.modalTitle')}</h3>
            <p>{t('atencionMedica.procedimiento.modalText')}</p>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              {t('atencionMedica.examenFisico.close')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Procedimiento;