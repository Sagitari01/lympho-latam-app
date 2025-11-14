import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/AtencionTerapeutica.css'; // Importamos el nuevo CSS

// Datos de prueba (en un futuro, esto será una llamada a la API con el ID)
const dummyPatientsData = {
  1: {
    nombre: "Prueba 1 Femenino",
    edad: "30 años, 11 meses, 5 días",
    sexo: "Femenino",
    nacionalidad: "Mexicana",
    direccion: "Jalisco 13",
    pais: "Mexico",
    estado: "Jalisco",
    diagnostico: "Q82.0-Linfidema Cingenito" // Nuevo campo
  },
  2: {
    nombre: "Prueba 2 Masculino",
    edad: "52 años, 1 mes, 2 días",
    sexo: "Masculino",
    nacionalidad: "Argentina",
    direccion: "Buenos Aires 123",
    pais: "Argentina",
    estado: "Buenos Aires",
    diagnostico: "N/A"
  },
  3: {
    nombre: "Prueba 3 Femenino",
    edad: "41 años, 3 meses, 10 días",
    sexo: "Femenino",
    nacionalidad: "Chilena",
    direccion: "Santiago 456",
    pais: "Chile",
    estado: "Metropolitana",
    diagnostico: "Q82.0-Linfidema Cingenito"
  },
};
// Fin de datos de prueba

function AtencionTerapeuticaLayout() {
  const { t } = useTranslation();
  const { pacienteId } = useParams();
  const [patient, setPatient] = useState(null);
  
  // Obtenemos el 'user' (doctor/terapeuta)
  const { user } = useOutletContext();
  const terapeutaName = user?.attributes?.name || user?.signInDetails?.loginId || "N/A";

  useEffect(() => {
    // Simulación de carga de datos del paciente
    const data = dummyPatientsData[pacienteId];
    if (data) {
      setPatient(data);
    }
  }, [pacienteId]);

  if (!patient) {
    return (
      <div className="container form-content">
        <h1>{t('dashboard.loading')}</h1>
      </div>
    );
  }

  return (
    <>
      {/* 1. Sub-Header */}
      <div className="terapeutica-subheader">
        <label>{t('atencionTerapeutica.terapeutaLabel')}</label>
        <span className="terapeuta-name">{terapeutaName}</span>
      </div>

      {/* 2. Contenedor del Layout (2 columnas) */}
      <div className="container form-content terapeutica-layout-container">
        
        {/* 2a. Navegación Vertical */}
        <aside className="terapeutica-nav">
          <ul className="terapeutica-nav-list">
            <li><NavLink to="motivo-consulta" className="nav-link">{t('atencionTerapeutica.nav.motivo')}</NavLink></li>
            <li><NavLink to="anamnesis" className="nav-link">{t('atencionTerapeutica.nav.anamnesis')}</NavLink></li>
            <li><NavLink to="signos-vitales" className="nav-link">{t('atencionTerapeutica.nav.signos')}</NavLink></li>
            <li><NavLink to="examen-fisico" className="nav-link">{t('atencionTerapeutica.nav.examenFisico')}</NavLink></li>
            <li><NavLink to="examen-segmentado" className="nav-link">{t('atencionTerapeutica.nav.examenSegmentado')}</NavLink></li>
            <li><NavLink to="problemas-objetivos" className="nav-link">{t('atencionTerapeutica.nav.problemas')}</NavLink></li>
            <li><NavLink to="evaluacion" className="nav-link">{t('atencionTerapeutica.nav.evaluacion')}</NavLink></li>
            <li><NavLink to="procedimiento" className="nav-link">{t('atencionTerapeutica.nav.procedimiento')}</NavLink></li>
            <li><NavLink to="reporte" className="nav-link">{t('atencionTerapeutica.nav.reporte')}</NavLink></li>
            <li><NavLink to="historial" className="nav-link">{t('atencionTerapeutica.nav.historial')}</NavLink></li>
          </ul>
        </aside>

        {/* 2b. Contenido de la Sub-Página */}
        <main className="terapeutica-content">
          
          {/* Info del Paciente */}
          <div className="patient-info-box">
            <p><strong>{t('atencionTerapeutica.patientInfo.name')}:</strong> {patient.nombre}</p>
            <p><strong>{t('atencionTerapeutica.patientInfo.age')}:</strong> {patient.edad}</p>
            <p><strong>{t('atencionTerapeutica.patientInfo.sex')}:</strong> {patient.sexo}</p>
            <p><strong>{t('atencionTerapeutica.patientInfo.nationality')}:</strong> {patient.nacionalidad}</p>
            <p><strong>{t('atencionTerapeutica.patientInfo.address')}:</strong> {patient.direccion}</p>
            <p><strong>{t('atencionTerapeutica.patientInfo.country')}:</strong> {patient.pais}</p>
            <p><strong>{t('atencionTerapeutica.patientInfo.state')}:</strong> {patient.estado}</p>
            <p className="info-diag"><strong>{t('atencionTerapeutica.patientInfo.diagnostico')}:</strong> {patient.diagnostico}</p>
          </div>

          {/* Marcador para las sub-páginas (Motivo, Anamnesis, etc.) */}
          <Outlet />
          
        </main>
      </div>
    </>
  );
}

export default AtencionTerapeuticaLayout;