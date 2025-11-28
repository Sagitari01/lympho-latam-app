import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function SignosVitales() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    tempTipo: 'T(30-45)',
    tempAxilar: '',
    tempRectal: '',
    psSistolica: '',
    psDiastolica: '',
    pulso: '',
    fr: '',
    sao2: '',
    eva: '',
    glasgow: '',
    hgt: '',
    peso: '',
    talla: '',
    imc: ''
  });

  // Cálculo automático del IMC
  useEffect(() => {
    const peso = parseFloat(formData.peso);
    const tallaCm = parseFloat(formData.talla);
    
    if (peso > 0 && tallaCm > 0) {
      const tallaM = tallaCm / 100;
      const imcCalc = peso / (tallaM * tallaM);
      setFormData(prev => ({ ...prev, imc: imcCalc.toFixed(2) }));
    } else if (formData.peso === '' || formData.talla === '') {
       setFormData(prev => ({ ...prev, imc: '' }));
    }
  }, [formData.peso, formData.talla]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionMedica.nav.signos')}</h2>
        <button className="save-button">{t('atencionMedica.btnSave')}</button>
      </div>

      <div className="vitals-wrapper">
        <div className="vitals-grid">
          
          {/* 1. Temperatura (Ocupa 3 columnas / Mitad) */}
          <div className="vital-box vital-box-large">
            <span className="vital-header">{t('atencionMedica.signosVitales.temperatura')}</span>
            <div className="temp-grid">
              <div className="temp-row">
                <span className="temp-label">{t('atencionMedica.signosVitales.tipo')}</span>
                <div className="vital-input-container">
                   <input type="text" name="tempTipo" value={formData.tempTipo} onChange={handleChange} disabled style={{backgroundColor: '#e9e9e9'}} />
                </div>
              </div>
              <div className="temp-row">
                <span className="temp-label">{t('atencionMedica.signosVitales.axilar')}</span>
                <div className="vital-input-container">
                  <input type="text" name="tempAxilar" value={formData.tempAxilar} onChange={handleChange} />
                </div>
              </div>
              <div className="temp-row">
                <span className="temp-label">{t('atencionMedica.signosVitales.rectal')}</span>
                <div className="vital-input-container">
                  <input type="text" name="tempRectal" value={formData.tempRectal} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Presión Arterial (Ocupa 3 columnas / Mitad) */}
          <div className="vital-box vital-box-large">
            <span className="vital-header">{t('atencionMedica.signosVitales.presionArterial')}</span>
            <div className="bp-grid">
              <div className="bp-col">
                <span className="bp-label">{t('atencionMedica.signosVitales.sistolica')}</span>
                <div className="vital-input-container">
                    <input type="text" name="psSistolica" value={formData.psSistolica} onChange={handleChange} />
                </div>
              </div>
              <div className="bp-col">
                <span className="bp-label">{t('atencionMedica.signosVitales.diastolica')}</span>
                <div className="vital-input-container">
                    <input type="text" name="psDiastolica" value={formData.psDiastolica} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

           {/* 3. Pulso (Ocupa 2 columnas / Tercio) */}
           <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.pulso')}</span>
            <div className="vital-input-container">
              <input type="text" name="pulso" value={formData.pulso} onChange={handleChange} />
            </div>
          </div>

           {/* 4. F.R. (Ocupa 2 columnas / Tercio) */}
           <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.fr')}</span>
            <div className="vital-input-container">
              <input type="text" name="fr" value={formData.fr} onChange={handleChange} />
            </div>
          </div>

           {/* 5. SaO2 (Ocupa 2 columnas / Tercio) */}
           <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.sao2')}</span>
            <div className="vital-input-container">
              <input type="text" name="sao2" value={formData.sao2} onChange={handleChange} />
            </div>
          </div>

           {/* 6. EVA (Ocupa 2 columnas / Tercio) */}
           <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.eva')}</span>
            <div className="vital-input-container">
              <input type="text" name="eva" value={formData.eva} onChange={handleChange} />
            </div>
          </div>

           {/* 7. Glasgow (Ocupa 2 columnas / Tercio) */}
           <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.glasgow')}</span>
            <div className="vital-input-container">
              <input type="text" name="glasgow" value={formData.glasgow} onChange={handleChange} />
            </div>
          </div>

           {/* 8. HGT (Ocupa 2 columnas / Tercio) */}
           <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.hgt')}</span>
            <div className="vital-input-container">
              <input type="text" name="hgt" value={formData.hgt} onChange={handleChange} />
            </div>
          </div>

          {/* 9. Peso (Ocupa 2 columnas / Tercio) */}
          <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.peso')}</span>
            <div className="vital-input-container">
              <input type="number" name="peso" value={formData.peso} onChange={handleChange} />
            </div>
          </div>

          {/* 10. Talla (Ocupa 2 columnas / Tercio) */}
          <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.talla')}</span>
            <div className="vital-input-container">
              <input type="number" name="talla" value={formData.talla} onChange={handleChange} />
            </div>
          </div>

          {/* 11. IMC (Ocupa 2 columnas / Tercio) */}
          <div className="vital-box vital-box-medium">
            <span className="vital-header">{t('atencionMedica.signosVitales.imc')}</span>
            <div className="vital-input-container">
              <input type="text" name="imc" value={formData.imc} readOnly style={{backgroundColor: '#e9e9e9'}} />
            </div>
          </div>

          {/* Botón Guardar (Ocupa todo el ancho al final) */}
          <div className="save-btn-container-vitals">
              <button className="save-btn-vitals">{t('atencionMedica.btnSave')}</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignosVitales;