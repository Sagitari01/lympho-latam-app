import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Componente reutilizable para Checkbox
const CheckboxItem = ({ labelKey }) => {
  const { t } = useTranslation();
  return (
    <div className="checkbox-group">
      <input type="checkbox" id={labelKey} />
      <label htmlFor={labelKey}>{t(labelKey)}</label>
    </div>
  );
};

function ExamenFisico() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  // --- 👇 NUEVO: Estado para el modal de calculadora ---
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionTerapeutica.nav.examenFisico')}</h2>
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>

      <div className="lipedema-container">
        
        <div className="exam-top-row">
          
          {/* Tabla de Hinchazón */}
          <div className="exam-table-container">
            <span className="exam-section-title">{t('atencionTerapeutica.examenFisico.hinchazon')}</span>
            <table className="exam-table">
              <thead>
                <tr>
                  <th>{t('atencionTerapeutica.examenFisico.area')}</th>
                  <th>{t('atencionTerapeutica.examenFisico.pitting')}</th>
                  <th>{t('atencionTerapeutica.examenFisico.textura')}</th>
                  <th>{t('atencionTerapeutica.examenFisico.escalaPitting')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><textarea></textarea></td>
                  <td><textarea></textarea></td>
                  <td>
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.suave" />
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.endurecido" />
                  </td>
                  <td className="pitting-scale-text">
                    {t('atencionTerapeutica.examenFisico.escala0')}<br/>
                    {t('atencionTerapeutica.examenFisico.escala1')}<br/>
                    {t('atencionTerapeutica.examenFisico.escala2')}<br/>
                    {t('atencionTerapeutica.examenFisico.escala3')}<br/>
                    {t('atencionTerapeutica.examenFisico.escala4')}<br/>
                    {t('atencionTerapeutica.examenFisico.escalaNA')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* --- 👇 CAMBIO: Icono Calculadora con evento onClick --- */}
          <div 
            className="calculator-container" 
            onClick={() => setShowCalculatorModal(true)}
          >
            <i className="fa-solid fa-calculator calculator-icon"></i>
          </div>
        </div>

        {/* Secciones de Checkboxes */}
        <div className="form-section">
          <span className="exam-section-title">{t('atencionTerapeutica.examenFisico.tipo')}</span>
          <div className="exam-grid-options">
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.primario" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.secundario" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.traumatico" />
          </div>

          <span className="exam-section-title">{t('atencionTerapeutica.examenFisico.ubicacion')}</span>
          <div className="exam-grid-options">
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.msd" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.mse" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.mid" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.mii" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.bilateral" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.genital" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.otro" />
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <div style={{flex: 1}}>
                <span className="exam-section-title">{t('atencionTerapeutica.examenFisico.gravedad')}</span>
                <div className="checkbox-list-vertical">
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.leve" />
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.moderado" />
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.severo" />
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.estadio1" />
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.estadio2" />
                    <CheckboxItem labelKey="atencionTerapeutica.examenFisico.estadio3" />
                </div>
            </div>
            
            <div className="oncology-btn-container">
                <button className="oncology-btn" onClick={() => setShowModal(true)}>
                    {t('atencionTerapeutica.examenFisico.evaluacionBtn')}
                </button>
            </div>
          </div>

          <span className="exam-section-title">{t('atencionTerapeutica.examenFisico.dificultades')}</span>
          <div className="exam-grid-options">
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.cuidado" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.movilidad" />
            <CheckboxItem labelKey="atencionTerapeutica.examenFisico.actividades" />
            <div className="inline-other" style={{width: 'auto'}}>
                <div className="checkbox-group" style={{marginBottom: 0}}>
                    <input type="checkbox" id="otroDiff" />
                    <label htmlFor="otroDiff">{t('atencionTerapeutica.examenFisico.otro')}:</label>
                </div>
                <input type="text" style={{border: 'none', borderBottom: '1px solid black', outline: 'none', width: '200px'}} />
            </div>
          </div>
        </div>

      </div>

      {/* Modal de Evaluación Oncológica */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{t('atencionTerapeutica.examenFisico.modalTitle')}</h3>
            <p>{t('atencionTerapeutica.examenFisico.modalText')}</p>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              {t('atencionTerapeutica.examenFisico.close')}
            </button>
          </div>
        </div>
      )}

      {/* --- 👇 NUEVO: Modal de Calculadora --- */}
      {showCalculatorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{t('atencionTerapeutica.examenFisico.calculatorModalTitle')}</h3>
            <p>{t('atencionTerapeutica.examenFisico.calculatorModalText')}</p>
            <button className="modal-close-btn" onClick={() => setShowCalculatorModal(false)}>
              {t('atencionTerapeutica.examenFisico.close')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ExamenFisico;