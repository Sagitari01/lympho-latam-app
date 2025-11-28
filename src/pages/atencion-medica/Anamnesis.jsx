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

function Anamnesis() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    alergias: '',
    cirugias: '',
    familiares: '',
    otroDatos: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionMedica.nav.anamnesis')}</h2>
        <button className="save-button">{t('atencionMedica.btnSave')}</button>
      </div>

      <form className="anamnesis-form">
        
        {/* Sección 1: Antecedentes (Inputs de texto) */}
        <div className="form-section">
          <div className="input-group">
            <label htmlFor="alergias">{t('atencionMedica.anamnesis.alergias')}</label>
            <input type="text" id="alergias" name="alergias" value={formData.alergias} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="cirugias">{t('atencionMedica.anamnesis.cirugias')}</label>
            <input type="text" id="cirugias" name="cirugias" value={formData.cirugias} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="familiares">{t('atencionMedica.anamnesis.familiares')}</label>
            <input type="text" id="familiares" name="familiares" value={formData.familiares} onChange={handleChange} />
          </div>
        </div>

        {/* Sección 2: Datos Generales (Checkboxes) */}
        <div className="form-section">
          <h3>{t('atencionMedica.anamnesis.datosGenerales')}</h3>
          <div className="checkbox-grid">
            {/* Columna Izquierda */}
            <div>
                <CheckboxItem labelKey="atencionMedica.anamnesis.hta" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.cardiopatias" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.coronarias" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.epoc" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.insuficienciaRenal" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.insuficienciaCardiaca" />
            </div>
            {/* Columna Derecha */}
            <div>
                <CheckboxItem labelKey="atencionMedica.anamnesis.taco" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.asma" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.dhc" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.pvvi" />
                <CheckboxItem labelKey="atencionMedica.anamnesis.dm" />
            </div>
          </div>
          
          {/* Campo "Otro" */}
          <div className="other-group">
            <label htmlFor="otroDatos">{t('atencionMedica.anamnesis.otro')}</label>
            <textarea id="otroDatos" name="otroDatos" value={formData.otroDatos} onChange={handleChange} />
          </div>
        </div>

      </form>
    </div>
  );
}

export default Anamnesis;