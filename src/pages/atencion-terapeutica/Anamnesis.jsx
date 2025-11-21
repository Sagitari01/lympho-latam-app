import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Componente reutilizable para preguntas Sí/No
const RadioQuestion = ({ questionKey, name }) => {
  const { t } = useTranslation();
  return (
    <div className="radio-question">
      <p>{t(questionKey)}</p>
      <div className="radio-group">
        <label>
          <input type="radio" name={name} value="si" /> {t('atencionTerapeutica.anamnesis.si')}
        </label>
        <label>
          <input type="radio" name={name} value="no" /> {t('atencionTerapeutica.anamnesis.no')}
        </label>
      </div>
    </div>
  );
};

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

// Componente principal de Anamnesis
function Anamnesis() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    alergias: '',
    cirugias: '',
    familiares: '',
    otroDatos: '',
    otroTratamientos: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionTerapeutica.nav.anamnesis')}</h2>
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>

      <form className="anamnesis-form">
        {/* Sección de Antecedentes */}
        <div className="form-section">
          <div className="input-group">
            <label htmlFor="alergias">{t('atencionTerapeutica.anamnesis.alergias')}</label>
            <input type="text" id="alergias" name="alergias" value={formData.alergias} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="cirugias">{t('atencionTerapeutica.anamnesis.cirugias')}</label>
            <input type="text" id="cirugias" name="cirugias" value={formData.cirugias} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="familiares">{t('atencionTerapeutica.anamnesis.familiares')}</label>
            <input type="text" id="familiares" name="familiares" value={formData.familiares} onChange={handleChange} />
          </div>
        </div>

        {/* Sección Datos Generales */}
        <div className="form-section">
          <h3>{t('atencionTerapeutica.anamnesis.datosGenerales')}</h3>
          <div className="checkbox-grid">
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.hta" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.taco" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.cardiopatias" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.asma" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.coronarias" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.dmc" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.epoc" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.pvm" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.insuficienciaRenal" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.dm" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.trombosis" />
            <div /> {/* Placeholder para alinear */}
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.insuficienciaCardiaca" />
          </div>
          <div className="other-group">
            <label htmlFor="otroDatos">{t('atencionTerapeutica.anamnesis.otro')}</label>
            <textarea id="otroDatos" name="otroDatos" value={formData.otroDatos} onChange={handleChange} />
          </div>
        </div>

        {/* Sección Tratamientos Previos */}
        <div className="form-section">
          <h3>{t('atencionTerapeutica.anamnesis.tratamientosPrevios')}</h3>
          <div className="checkbox-grid">
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.drenaje" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.ejercicio" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.bombas" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.laser" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.prendas" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.otros" />
            <CheckboxItem labelKey="atencionTerapeutica.anamnesis.vendaje" />
          </div>
          <div className="input-group" style={{ marginTop: '15px' }}>
            <label htmlFor="otroTratamientos">{t('atencionTerapeutica.anamnesis.otros')}</label>
            <input type="text" id="otroTratamientos" name="otroTratamientos" value={formData.otroTratamientos} onChange={handleChange} />
          </div>
        </div>
        
        {/* Sección Preguntas Sí/No */}
        <div className="form-section">
          <RadioQuestion questionKey="atencionTerapeutica.anamnesis.preguntaManga" name="preguntaManga" />
          <RadioQuestion questionKey="atencionTerapeutica.anamnesis.preguntaCompresion" name="preguntaCompresion" />
          <RadioQuestion questionKey="atencionTerapeutica.anamnesis.preguntaEjercicio" name="preguntaEjercicio" />
          <RadioQuestion questionKey="atencionTerapeutica.anamnesis.preguntaProblema" name="preguntaProblema" />
          <RadioQuestion questionKey="atencionTerapeutica.anamnesis.preguntaGrupo" name="preguntaGrupo" />
        </div>

      </form>
    </div>
  );
}

export default Anamnesis;