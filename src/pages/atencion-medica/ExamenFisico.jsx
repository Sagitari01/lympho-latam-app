import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// Componente reutilizable para Checkbox
const CheckboxItem = ({ labelKey }) => {
  const { t } = useTranslation();
  return (
    <div className="checkbox-group">
      <input type="checkbox" id={labelKey} />
      {/* Usamos t() para traducir la etiqueta */}
      <label htmlFor={labelKey}>{t(labelKey)}</label>
    </div>
  );
};

// --- COMPONENTE SVG DEL CUERPO (Versión Visual) ---
const BodySVG = ({ highlightedParts, onClick, isBackView = false }) => {
  
  const getClass = (baseId) => {
    const finalId = isBackView ? `${baseId}-back` : baseId;
    return `body-part ${highlightedParts.includes(finalId) ? 'selected' : ''}`;
  };

  const handleClick = (e) => {
    const baseId = e.currentTarget.id;
    const finalId = isBackView ? `${baseId}-back` : baseId;
    onClick(finalId);
  };

  const interactiveStyle = { fill: "#ffffff", stroke: "#000000", strokeWidth: "1", cursor: "pointer" };

  return (
    <svg
      className="body-map-svg"
      viewBox="0 0 200 450"
      xmlns="http://www.w3.org/2000/svg"
      style={isBackView ? { transform: 'scaleX(-1)' } : {}}
    >
      <title>Cuerpo Humano</title>
      {/* Cabeza */}
      <path id="head" className={getClass('head')} onClick={handleClick} d="M100,60 C80,60 70,80 70,100 C70,120 80,140 100,140 C120,140 130,120 130,100 C130,80 120,60 100,60z" />
      {/* Torso */}
      <path id="torso" className={getClass('torso')} onClick={handleClick} d="M80,142 L120,142 L125,250 L75,250 L80,142z" />
      {/* Brazos */}
      <path id="left-arm" className={getClass('left-arm')} onClick={handleClick} d="M74,145 L64,150 L50,280 L60,280 L74,145z" />
      <path id="right-arm" className={getClass('right-arm')} onClick={handleClick} d="M126,145 L136,150 L150,280 L140,280 L126,145z" />
      {/* Piernas */}
      <path id="left-leg" className={getClass('left-leg')} onClick={handleClick} d="M75,252 L95,252 L90,420 L70,420 L75,252z" />
      <path id="right-leg" className={getClass('right-leg')} onClick={handleClick} d="M105,252 L125,252 L130,420 L110,420 L105,252z" />
    </svg>
  );
};

// --- COMPONENTE MODAL ONCOLÓGICO ---
const OncologicalModalContent = ({ onClose }) => {
  const { t } = useTranslation();
  const [selectedEvaluation, setSelectedEvaluation] = useState('gine');

  const handleSelectChange = (e) => {
    setSelectedEvaluation(e.target.value);
  };

  // Renderiza el cuestionario de Cáncer Ginecológico
  const renderGine = () => (
    <div className="eval-form-container">
      <h3 className="eval-title-inner">{t('evaluacionOncologica.gine.titulo')}</h3>
      
      <div className="eval-grid-2col">
        {/* Columna 1 */}
        <div>
          <h4 className="eval-section-title">{t('evaluacionOncologica.gine.abdominal')}</h4>
          {/* Aquí usamos las llaves de traducción correctas */}
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

        {/* Columna 2 */}
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


function ExamenFisicoMedica() {
  const { t } = useTranslation();
  
  // --- Estados para la lógica de anotaciones (RECUPERADOS) ---
  const [highlightedParts, setHighlightedParts] = useState([]);
  const [annotations, setAnnotations] = useState({});
  const [notes, setNotes] = useState(""); // Nota temporal del textarea
  
  const [showModal, setShowModal] = useState(false);

  // --- Lógica de Clic (Igual que ExamenSegmentado) ---
  const handlePartClick = (partId) => {
    if (highlightedParts.includes(partId)) {
      setHighlightedParts(prev => prev.filter(p => p !== partId));
    } else {
      setHighlightedParts(prev => [...prev, partId]);
    }
  };

  // --- Lógica de Texto (Igual que ExamenSegmentado) ---
  const handleAnnotationChange = (e) => {
    const text = e.target.value;
    setNotes(text); // Actualiza el textarea visualmente

    // Guarda la nota para TODAS las partes seleccionadas
    setAnnotations(prevAnnotations => {
      const newAnnotations = { ...prevAnnotations };
      highlightedParts.forEach(partId => {
        newAnnotations[partId] = text;
      });
      return newAnnotations;
    });
  };
  
  // Visualización de Texto: Si hay selección, muestra la nota de la primera parte
  const currentAnnotation = useMemo(() => {
    if (highlightedParts.length === 0) return '';
    
    // Si todas tienen la misma nota, muéstrala. Si no, vacío (para evitar conflictos).
    const firstNote = annotations[highlightedParts[0]] || '';
    const allHaveSameNote = highlightedParts.every(partId => (annotations[partId] || '') === firstNote);
    
    return allHaveSameNote ? firstNote : ''; 
  }, [highlightedParts, annotations]);

  // Sincronizar el estado 'notes' con la selección
  React.useEffect(() => {
      setNotes(currentAnnotation);
  }, [currentAnnotation]);


  // Función para obtener nombre legible
  const getSelectedPartName = (partId) => {
    if (!partId) return '...';
    const baseId = partId.replace('-back', '');
    const name = t(`atencionTerapeutica.bodyParts.${baseId}`, baseId);
    return partId.includes('-back') ? `${name} (${t('atencionTerapeutica.bodyParts.posterior', 'Posterior')})` : name;
  };

  const selectedPartNames = useMemo(() => {
    if (highlightedParts.length === 0) {
      return t('atencionTerapeutica.nav.ningunaParte');
    }
    return highlightedParts.map(partId => getSelectedPartName(partId)).join(', ');
  }, [highlightedParts, t]);

  const placeholderText = useMemo(() => {
    if (highlightedParts.length === 0) return '';
    // Si hay varias partes con notas diferentes
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
        
        {/* Panel Superior */}
        <div className="exam-top-panel">
          
          {/* Columna Izquierda: Cuerpo */}
          <div className="exam-body-col">
            {/* Vista Frontal */}
            <BodySVG highlightedParts={highlightedParts} onClick={handlePartClick} isBackView={false} />
            {/* Vista Trasera */}
            <BodySVG highlightedParts={highlightedParts} onClick={handlePartClick} isBackView={true} />
          </div>

          {/* Columna Derecha: Opciones */}
          <div className="exam-options-col">
            {/* Tipo */}
            <div>
              <span className="exam-subtitle">{t('atencionMedica.examenFisico.tipo')}</span>
              <div className="options-row">
                <CheckboxItem labelKey="atencionMedica.examenFisico.linfedemaPrimario" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.linfedemaSecundario" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.edemaPost" />
              </div>
            </div>

            {/* Ubicación */}
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

            {/* Gravedad */}
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

            {/* Dificultades */}
            <div>
              <span className="exam-subtitle">{t('atencionMedica.examenFisico.dificultades')}</span>
              <div className="options-row">
                <CheckboxItem labelKey="atencionMedica.examenFisico.cuidado" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.movilidad" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.actividades" />
                <CheckboxItem labelKey="atencionMedica.examenFisico.otro" />
              </div>
            </div>

            {/* Botón Modal */}
            <div className="oncology-btn-wrapper">
              <button className="oncology-btn" onClick={() => setShowModal(true)}>
                {t('atencionMedica.examenFisico.evaluacionBtn')}
              </button>
            </div>

          </div>
        </div>

        {/* Panel Inferior: Texto */}
        <div className="exam-bottom-panel">
            <span className="exam-subtitle">
                {t('atencionMedica.examenFisico.textoLabel')}: {selectedPartNames}
            </span>
            
            {/* Si hay partes seleccionadas, se habilita el textarea */}
            {highlightedParts.length > 0 ? (
                <textarea 
                    value={notes} // Usa el estado local 'notes'
                    onChange={handleAnnotationChange}
                    placeholder={placeholderText}
                />
            ) : (
                <div style={{
                    width: '100%', 
                    height: '150px', 
                    border: '1px dashed #ccc', 
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontStyle: 'italic'
                }}>
                    {t('atencionTerapeutica.nav.seleccionarParte')}
                </div>
            )}
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
           <OncologicalModalContent onClose={() => setShowModal(false)} />
        </div>
      )}

    </div>
  );
}

export default ExamenFisicoMedica;