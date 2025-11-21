import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Componente reutilizable para Checkbox (sin cambios)
const CheckboxItem = ({ labelKey }) => {
  const { t } = useTranslation();
  return (
    <div className="checkbox-group">
      <input type="checkbox" id={labelKey} />
      <label htmlFor={labelKey}>{t(labelKey)}</label>
    </div>
  );
};

function EvaluacionLipedema() {
  const { t } = useTranslation();
  const [otroPlan, setOtroPlan] = useState("");
  
  // --- 👇 NUEVO: Estado para la escala de dolor ---
  const [painLevel, setPainLevel] = useState(null);

  // Función para manejar el clic en la escala de dolor
  const handlePainLevelChange = (num) => {
    // Si se hace clic en el mismo número, se desmarca (opcional)
    // Si es diferente, se actualiza al nuevo número
    if (painLevel === num) {
      setPainLevel(null);
    } else {
      setPainLevel(num);
    }
  };

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionTerapeutica.evaluacionLipedema.titulo')}</h2>
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>

      <div className="lipedema-container">
        
        {/* Fila Superior: Presencia y Ubicación */}
        <div className="top-checkboxes">
          <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.presencia" />
          <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.superiores" />
          <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.inferiores" />
        </div>

        {/* Escala de Dolor */}
        <div className="pain-scale-container">
          <span className="pain-scale-title">{t('atencionTerapeutica.evaluacionLipedema.dolor')}</span>
          <div className="pain-scale-grid">
            {/* Genera checkboxes del 1 al 10 con selección única */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <div key={num} className="pain-item">
                {num} 
                <input 
                  type="checkbox" 
                  checked={painLevel === num}
                  onChange={() => handlePainLevelChange(num)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
            <span className="pain-note">{t('atencionTerapeutica.evaluacionLipedema.dolorNota')}</span>
          </div>
        </div>

        {/* Objetivos del Tratamiento */}
        <div className="form-section">
          <h3 className="form-subtitle">{t('atencionTerapeutica.evaluacionLipedema.objetivosTitulo')}</h3>
          <div className="checkbox-list-vertical">
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.obj1" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.obj2" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.obj3" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.obj4" />
          </div>
        </div>

        {/* Plan de Tratamiento */}
        <div className="form-section">
          <h3 className="form-subtitle">{t('atencionTerapeutica.evaluacionLipedema.planTitulo')}</h3>
          <div className="checkbox-list-vertical">
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.plan1" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.plan2" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.plan3" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.plan4" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.plan5" />
            <CheckboxItem labelKey="atencionTerapeutica.evaluacionLipedema.plan6" />
            
            <div className="inline-other">
              <div className="checkbox-group" style={{marginBottom: 0}}>
                <input type="checkbox" id="otroPlan" />
                <label htmlFor="otroPlan">{t('atencionTerapeutica.evaluacionLipedema.otro')}</label>
              </div>
              <input 
                type="text" 
                value={otroPlan} 
                onChange={(e) => setOtroPlan(e.target.value)} 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EvaluacionLipedema;