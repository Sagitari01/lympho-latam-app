import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// No se importa ninguna librería de "body"

// --- SVG del Cuerpo (Frontal) ---
const BodyFront = ({ highlightedParts, onClick }) => (
  <svg
    className="body-map-svg"
    viewBox="0 0 200 450"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Cuerpo Frontal</title>
    {/* Cabeza */}
    <path
      id="head"
      className={`body-part ${highlightedParts.includes('head') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M100,60 C80,60 70,80 70,100 C70,120 80,140 100,140 C120,140 130,120 130,100 C130,80 120,60 100,60z"
    />
    {/* Torso */}
    <path
      id="torso"
      className={`body-part ${highlightedParts.includes('torso') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M80,142 L120,142 L125,250 L75,250 L80,142z"
    />
    {/* Brazo Izquierdo */}
    <path
      id="left-arm"
      className={`body-part ${highlightedParts.includes('left-arm') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M74,145 L64,150 L50,280 L60,280 L74,145z"
    />
    {/* Brazo Derecho */}
    <path
      id="right-arm"
      className={`body-part ${highlightedParts.includes('right-arm') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M126,145 L136,150 L150,280 L140,280 L126,145z"
    />
    {/* Pierna Izquierda */}
    <path
      id="left-leg"
      className={`body-part ${highlightedParts.includes('left-leg') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M75,252 L95,252 L90,420 L70,420 L75,252z"
    />
    {/* Pierna Derecha */}
    <path
      id="right-leg"
      className={`body-part ${highlightedParts.includes('right-leg') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M105,252 L125,252 L130,420 L110,420 L105,252z"
    />
  </svg>
);

// --- SVG del Cuerpo (Trasero) ---
const BodyBack = ({ highlightedParts, onClick }) => (
  <svg
    className="body-map-svg"
    viewBox="0 0 200 450"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Cuerpo Trasero</title>
    {/* Cabeza */}
    <path
      id="head-back"
      className={`body-part ${highlightedParts.includes('head-back') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M100,60 C80,60 70,80 70,100 C70,120 80,140 100,140 C120,140 130,120 130,100 C130,80 120,60 100,60z"
    />
    {/* Espalda */}
    <path
      id="back"
      className={`body-part ${highlightedParts.includes('back') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M80,142 L120,142 L125,250 L75,250 L80,142z"
    />
    {/* Brazo Izquierdo (Vista Trasera) */}
    <path
      id="left-arm-back"
      className={`body-part ${highlightedParts.includes('left-arm-back') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M74,145 L64,150 L50,280 L60,280 L74,145z"
    />
    {/* Brazo Derecho (Vista Trasera) */}
    <path
      id="right-arm-back"
      className={`body-part ${highlightedParts.includes('right-arm-back') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M126,145 L136,150 L150,280 L140,280 L126,145z"
    />
    {/* Pierna Izquierda (Vista Trasera) */}
    <path
      id="left-leg-back"
      className={`body-part ${highlightedParts.includes('left-leg-back') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M75,252 L95,252 L90,420 L70,420 L75,252z"
    />
    {/* Pierna Derecha (Vista Trasera) */}
    <path
      id="right-leg-back"
      className={`body-part ${highlightedParts.includes('right-leg-back') ? 'selected' : ''}`}
      onClick={(e) => onClick(e.currentTarget.id)}
      d="M105,252 L125,252 L130,420 L110,420 L105,252z"
    />
  </svg>
);


// --- Componente Principal ---

function ExamenSegmentado() {
  const { t } = useTranslation();

  // --- ESTADOS ---
  const [highlightedParts, setHighlightedParts] = useState([]); // Array de todas las partes verdes
  const [activeAnnotationPart, setActiveAnnotationPart] = useState(null); // La última parte clickeada
  const [annotations, setAnnotations] = useState({
    'right-arm-back': 'Anotación de prueba para el brazo derecho.',
  });

  // --- 👇 LÓGICA DE CLIC ACTUALIZADA ---
  const handlePartClick = (partId) => {
    let newHighlightedParts;
    let newActivePart;

    if (highlightedParts.includes(partId)) {
      // --- DESELECCIONANDO ---
      newHighlightedParts = highlightedParts.filter(p => p !== partId);
      // Si la parte que deseleccionamos era la activa,
      // ponemos como activa la última de la lista (o null si la lista está vacía)
      if (activeAnnotationPart === partId) {
        newActivePart = newHighlightedParts.length > 0 ? newHighlightedParts[newHighlightedParts.length - 1] : null;
      } else {
        newActivePart = activeAnnotationPart; // La parte activa sigue siendo otra
      }

    } else {
      // --- SELECCIONANDO ---
      newHighlightedParts = [...highlightedParts, partId];
      newActivePart = partId; // La parte nueva es la activa
    }
    
    setHighlightedParts(newHighlightedParts);
    setActiveAnnotationPart(newActivePart);
  };

  const handleAnnotationChange = (e) => {
    const text = e.target.value;
    setAnnotations(prevAnnotations => ({
      ...prevAnnotations,
      [activeAnnotationPart]: text, // Guarda la anotación para la parte activa
    }));
  };
  
  // La anotación que se muestra se basa en la 'activeAnnotationPart'
  const currentAnnotation = annotations[activeAnnotationPart] || '';
  
  const getSelectedPartName = (partId) => {
    if (!partId) return '...';
    return t(`atencionTerapeutica.bodyParts.${partId}`, partId.replace('-', ' ').toUpperCase());
  };

  // --- 👇 LÓGICA DE RENDERIZADO ACTUALIZADA ---
  // Genera el string para el label, ej: "CABEZA, TORSO"
  const selectedPartNames = highlightedParts.length > 0 
    ? highlightedParts.map(partId => getSelectedPartName(partId)).join(', ')
    : t('atencionTerapeutica.nav.ningunaParte'); // Nueva llave JSON

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionTerapeutica.nav.examenSegmentado')}</h2>
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>
      
      <div className="segmentado-container">
        
        <div className="body-map-container">
          {/* Pasa el array de partes resaltadas */}
          <BodyFront highlightedParts={highlightedParts} onClick={handlePartClick} />
          <BodyBack highlightedParts={highlightedParts} onClick={handlePartClick} />
        </div>

        {/* Columna 2: El cuadro de anotación */}
        <div className="annotation-container">
          
          {/* 1. El Label ahora muestra TODAS las partes seleccionadas */}
          <label htmlFor="annotation-text">
            {selectedPartNames}:
          </label>

          {/* 2. El Textarea solo aparece si hay una PARTE ACTIVA para editar */}
          {activeAnnotationPart ? (
            <textarea 
              id="annotation-text"
              value={currentAnnotation}
              onChange={handleAnnotationChange}
              placeholder={t('atencionTerapeutica.nav.annotationPlaceholder', { part: getSelectedPartName(activeAnnotationPart) })}
            />
          ) : (
            <p className="annotation-placeholder">
              {t('atencionTerapeutica.nav.seleccionarParte')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamenSegmentado;