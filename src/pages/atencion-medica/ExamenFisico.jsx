import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyFront, BodyBack } from '../../components/BodyMap';

const CheckboxItem = ({ labelKey }) => {
  const { t } = useTranslation();
  return (
    <div className="checkbox-group">
      <input type="checkbox" id={labelKey} />
      <label htmlFor={labelKey}>{t(labelKey)}</label>
    </div>
  );
};

const OncologicalModalContent = ({ onClose }) => {
  const { t } = useTranslation();
  const [selectedEvaluation, setSelectedEvaluation] = useState('gine');

  const handleSelectChange = (e) => {
    setSelectedEvaluation(e.target.value);
  };

  const renderGine = () => (
    <div className="eval-form-container">
      <h3 className="eval-title-inner">{t('evaluacionOncologica.gine.titulo')}</h3>
      
      <div className="eval-grid-2col">
        <div>
          <h4 className="eval-section-title">{t('evaluacionOncologica.gine.abdominal')}</h4>
          <CheckboxItem labelKey="evaluacionOncologica.gine.pesadez" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.hinchazon" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.firmeza" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.hormigueo" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.ropa" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.hundimiento" />

          <h4 className="eval-section-title" style={{marginTop: '20px'}}>{t('evaluacionOncologica.gine.piernas')}</h4>
          <CheckboxItem labelKey="evaluacionOncologica.gine.pesadezP" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.hormigueoP" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.tension" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.dolor" />
        </div>

        <div>
          <h4 className="eval-section-title">{t('evaluacionOncologica.gine.genital')}</h4>
          <CheckboxItem labelKey="evaluacionOncologica.gine.intestinal" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.sexual" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.vaginal" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.plenitud" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.presion" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.sentada" />

          <h4 className="eval-section-title" style={{marginTop: '20px'}}>{t('evaluacionOncologica.gine.piel')}</h4>
          <CheckboxItem labelKey="evaluacionOncologica.gine.firmezaP" />
          <CheckboxItem labelKey="evaluacionOncologica.gine.erupcion" />
        </div>
      </div>

      <div className="eval-actions">
        <button className="save-button-modal" onClick={onClose}>{t('atencionMedica.btnSave')}</button>
      </div>
    </div>
  );

  return (
    <div className="modal-content-large">
      <div className="modal-header">
        <div className="modal-header-controls">
          <div className="type-label">
             {t('atencionMedica.examenFisico.tipo').replace(':','').toUpperCase()}
          </div>
          <select 
            className="eval-selector" 
            value={selectedEvaluation} 
            onChange={handleSelectChange}
          >
            <option value="" disabled>{t('evaluacionOncologica.seleccionar')}</option>
            <option value="gine">{t('evaluacionOncologica.opcionGine')}</option>
            <option value="prostata">{t('evaluacionOncologica.opcionProstata')}</option>
            <option value="cabeza">{t('evaluacionOncologica.opcionCabeza')}</option>
            <option value="mama">{t('evaluacionOncologica.opcionMama')}</option>
            <option value="hinchazon">{t('evaluacionOncologica.opcionHinchazon')}</option>
            <option value="terapia">{t('evaluacionOncologica.opcionTerapia')}</option>
          </select>
        </div>
        <button className="modal-close-icon" onClick={onClose}>&times;</button>
      </div>

      <div className="modal-body">
        {selectedEvaluation === 'gine' && renderGine()}
        {selectedEvaluation && selectedEvaluation !== 'gine' && (
          <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
            <p>{t('atencionMedica.examenFisico.modalText')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapper para el SVG
const BodySVG = ({ highlightedParts, onClick, isBackView = false }) => {
  return (
    <div style={isBackView ? { transform: 'scaleX(-1)' } : {}}>
      {isBackView ? (
        <BodyBack highlightedParts={highlightedParts} onClick={onClick} />
      ) : (
        <BodyFront highlightedParts={highlightedParts} onClick={onClick} />
      )}
    </div>
  );
};

function ExamenFisicoMedica() {
  const { t } = useTranslation();
  
  const [highlightedParts, setHighlightedParts] = useState([]);
  const [annotations, setAnnotations] = useState({});
  const [notes, setNotes] = useState(""); 
  const [showModal, setShowModal] = useState(false);

  const handlePartClick = (partId) => {
    if (highlightedParts.includes(partId)) {
      setHighlightedParts(prev => prev.filter(p => p !== partId));
    } else {
      setHighlightedParts(prev => [...prev, partId]);
    }
  };

  const handleAnnotationChange = (e) => {
    const text = e.target.value;
    setNotes(text);
    setAnnotations(prevAnnotations => {
      const newAnnotations = { ...prevAnnotations };
      highlightedParts.forEach(partId => {
        newAnnotations[partId] = text;
      });
      return newAnnotations;
    });
  };
  
  const currentAnnotation = useMemo(() => {
    if (highlightedParts.length === 0) return '';
    const firstNote = annotations[highlightedParts[0]] || '';
    const allHaveSameNote = highlightedParts.every(partId => (annotations[partId] || '') === firstNote);
    return allHaveSameNote ? firstNote : ''; 
  }, [highlightedParts, annotations]);

  useEffect(() => {
      setNotes(currentAnnotation);
  }, [currentAnnotation, highlightedParts]);

  const getSelectedPartName = (partId) => {
    if (!partId) return '...';
    // Si termina en _Posterior o _front, limpiamos el ID base
    const baseId = partId.replace('_Posterior', '').replace('_front', '');
    
    // Intentamos traducir
    const translationKey = `atencionTerapeutica.bodyParts.${baseId}`;
    const translated = t(translationKey);
    
    // Fallback si la traducción falla
    const finalName = translated !== translationKey ? translated : baseId;

    if (partId.includes('_Posterior')) {
        return `${finalName} (${t('atencionTerapeutica.bodyParts.posterior', 'Posterior')})`;
    }
    // IMPORTANTE: Para la parte frontal, devolvemos solo el nombre (sin "Anterior" en el texto del área) o con si prefieres
    return finalName; 
  };

  const selectedPartNames = useMemo(() => {
    if (highlightedParts.length === 0) {
      return t('atencionTerapeutica.nav.ningunaParte');
    }
    return highlightedParts.map(partId => getSelectedPartName(partId)).join(', ');
  }, [highlightedParts, t]);

  const placeholderText = useMemo(() => {
    if (highlightedParts.length === 0) return '';
    if (currentAnnotation) return '';
    if (highlightedParts.length > 1 && !currentAnnotation) {
      return t('atencionTerapeutica.nav.multipleValues');
    }
    if (highlightedParts.length > 0) {
        return t('atencionTerapeutica.nav.annotationPlaceholder', { part: getSelectedPartName(highlightedParts[0]) });
    }
    return '';
  }, [highlightedParts, currentAnnotation, t]);

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionMedica.nav.examen')}</h2>
        <button className="save-button">{t('atencionMedica.btnSave')}</button>
      </div>

      <div className="medical-exam-container">
        <div className="exam-top-panel">
          <div className="exam-body-col" style={{ display: 'flex', gap: '20px' }}>
            <div style={{ width: '48%' }}>
              <BodyFront highlightedParts={highlightedParts} onClick={handlePartClick} />
            </div>
            <div style={{ width: '48%' }}>
              <BodyBack highlightedParts={highlightedParts} onClick={handlePartClick} />
            </div>
          </div>

          <div className="exam-options-col">
             <div>
              <span className="exam-subtitle">{t('atencionMedica.examenFisico.tipo')}</span>
              <div className="options-row">
                <CheckboxItem labelKey="atencionMedica.examenFisico.linfedemaPrimario" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.linfedemaSecundario" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.edemaPost" />
              </div>
            </div>

            <div>
              <span className="exam-subtitle">{t('atencionMedica.examenFisico.ubicacion')}</span>
              <div className="options-row">
                <CheckboxItem labelKey="atencionMedica.examenFisico.msd" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.mse" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.mid" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.mii" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.bilateral" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.genital" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.otro" />
              </div>
            </div>

            <div>
              <span className="exam-subtitle">{t('atencionMedica.examenFisico.gravedad')}</span>
              <div className="options-row" style={{flexDirection: 'column', gap: '5px'}}>
                <CheckboxItem labelKey="atencionMedica.examenFisico.leve" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.moderado" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.severo" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.estadio1" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.estadio2" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.estadio3" />
              </div>
            </div>

            <div>
              <span className="exam-subtitle">{t('atencionMedica.examenFisico.dificultades')}</span>
              <div className="options-row">
                <CheckboxItem labelKey="atencionMedica.examenFisico.cuidado" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.movilidad" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.actividades" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.otro" />
              </div>
            </div>

            <div className="oncology-btn-wrapper">
              <button className="oncology-btn" onClick={() => setShowModal(true)}>
                {t('atencionMedica.examenFisico.evaluacionBtn')}
              </button>
            </div>
          </div>
        </div>

        <div className="exam-bottom-panel">
            <span className="exam-subtitle">{t('atencionMedica.examenFisico.textoLabel')}: {selectedPartNames}</span>
            <textarea 
                value={notes} 
                onChange={handleAnnotationChange}
                placeholder={placeholderText}
                disabled={highlightedParts.length === 0}
            />
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
           <OncologicalModalContent onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
}

export default ExamenFisicoMedica;