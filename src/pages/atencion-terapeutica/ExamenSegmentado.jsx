import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyFront, BodyBack } from '../../components/BodyMap';

function ExamenSegmentado() {
  const { t } = useTranslation();
  const [highlightedParts, setHighlightedParts] = useState([]);
  const [annotations, setAnnotations] = useState({});
  const [notes, setNotes] = useState("");

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
    if(highlightedParts.length > 0) {
      return t('atencionTerapeutica.nav.annotationPlaceholder', { part: getSelectedPartName(highlightedParts[0]) });
    }
    return '';
  }, [highlightedParts, currentAnnotation, t]);

  return (
    <div className="subpage-content">
      <div className="subpage-header">
        <h2>{t('atencionTerapeutica.nav.examenSegmentado')}</h2>
        <button className="save-button">{t('atencionTerapeutica.btnSave')}</button>
      </div>
      
      <div className="segmentado-container">
        <div className="body-map-container" style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: '50%' }}>
            <BodyFront highlightedParts={highlightedParts} onClick={handlePartClick} />
          </div>
          <div style={{ width: '50%' }}>
            <BodyBack highlightedParts={highlightedParts} onClick={handlePartClick} />
          </div>
        </div>

        <div className="annotation-container">
          <label htmlFor="annotation-text">{selectedPartNames}:</label>
          {highlightedParts.length > 0 ? (
            <textarea 
              id="annotation-text"
              value={notes}
              onChange={handleAnnotationChange}
              placeholder={placeholderText}
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