import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CheckboxItem = ({ labelKey }) => {
  const { t } = useTranslation();
  return (
    <div className="checkbox-group">
      <input type="checkbox" id={labelKey} />
      <label htmlFor={labelKey}>{t(labelKey)}</label>
    </div>
  );
};

function ProblemasObjetivos() {
  const { t } = useTranslation();
  const [otroTexto, setOtroTexto] = useState("");

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionTerapeutica.nav.problemas')}</h2>
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>

      <div className="problems-container">
        
        {/* Sección 1: Problemas Detectados */}
        <div className="full-width-section">
          <div className="section-title-bar">
            {t('atencionTerapeutica.problemasObjetivos.tituloProblemas')}
          </div>
          <div className="problems-checkbox-list">
            <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.p1" />
            <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.p2" />
            <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.p3" />
            <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.p4" />
            <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.p5" />
            <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.p6" />
            
            <div className="inline-other">
              <div className="checkbox-group" style={{marginBottom: 0}}>
                <input type="checkbox" id="otroProblema" />
                <label htmlFor="otroProblema">{t('atencionTerapeutica.problemasObjetivos.otro')}</label>
              </div>
              <input 
                type="text" 
                value={otroTexto} 
                onChange={(e) => setOtroTexto(e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Contenedor de dos columnas para Objetivos */}
        <div className="two-columns-section">
          
          {/* Sección 2: Corto Plazo */}
          <div>
            <div className="section-title-bar">
              {t('atencionTerapeutica.problemasObjetivos.tituloCortoPlazo')}
            </div>
            <div className="problems-checkbox-list">
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.c1" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.c2" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.c3" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.c4" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.c5" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.c6" />
            </div>
          </div>

          {/* Sección 3: Largo Plazo */}
          <div>
            <div className="section-title-bar">
              {t('atencionTerapeutica.problemasObjetivos.tituloLargoPlazo')}
            </div>
            <div className="problems-checkbox-list">
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.l1" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.l2" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.l3" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.l4" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.l5" />
              <CheckboxItem labelKey="atencionTerapeutica.problemasObjetivos.l6" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProblemasObjetivos;