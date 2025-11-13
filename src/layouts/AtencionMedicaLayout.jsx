import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/AtencionMedica.css';

// Datos de prueba (en un futuro, esto será una llamada a la API con el ID)
const dummyPatientsData = {
  1: {
    nombre: "Prueba 1 Femenino",
    edad: "30 años, 11 meses, 5 días",
    sexo: "Femenino",
    nacionalidad: "Mexicana",
    direccion: "Jalisco 13",
    pais: "Mexico",
    estado: "Jalisco"
  },
  2: {
    nombre: "Prueba 2 Masculino",
    edad: "52 años, 1 mes, 2 días",
    sexo: "Masculino",
    nacionalidad: "Argentina",
    direccion: "Buenos Aires 123",
    pais: "Argentina",
    estado: "Buenos Aires"
  },
  3: {
    nombre: "Prueba 3 Femenino",
    edad: "41 años, 3 meses, 10 días",
    sexo: "Femenino",
    nacionalidad: "Chilena",
    direccion: "Santiago 456",
    pais: "Chile",
    estado: "Metropolitana"
  },
};
// Fin de datos de prueba

function AtencionMedicaLayout() {
  const { t } = useTranslation();
  const { pacienteId } = useParams();
  const [patient, setPatient] = useState(null);
  
  const { user } = useOutletContext();

  // --- 👇 CAMBIO AQUÍ ---
  // Este useEffect se ejecutará cada vez que el componente se cargue
  useEffect(() => {
    // Imprime todos los datos del usuario (doctor) en la consola
    console.log('Datos Completos del Usuario (Doctor):', user);
  }, [user]); // Se ejecuta si el objeto 'user' cambia

  // Determinamos el nombre del doctor
  const doctorName = user?.attributes?.name || user?.signInDetails?.loginId || "N/A";

  useEffect(() => {
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
      <div className="medical-subheader">
        <label>{t('atencionMedica.doctorLabel')}</label>
        <span className="medico-name">{doctorName}</span>
      </div>

      <div className="container form-content medical-layout-container">
        
        <aside className="medical-nav">
          <ul className="medical-nav-list">
            <li><NavLink to="motivo-consulta" className="nav-link">{t('atencionMedica.nav.motivo')}</NavLink></li>
            <li><NavLink to="anamnesis" className="nav-link">{t('atencionMedica.nav.anamnesis')}</NavLink></li>
            <li><NavLink to="signos-vitales" className="nav-link">{t('atencionMedica.nav.signos')}</NavLink></li>
            <li><NavLink to="examen-fisico" className="nav-link">{t('atencionMedica.nav.examen')}</NavLink></li>
            <li><NavLink to="diagnostico" className="nav-link">{t('atencionMedica.nav.diagnostico')}</NavLink></li>
            <li><NavLink to="evolucion" className="nav-link">{t('atencionMedica.nav.evolucion')}</NavLink></li>
            <li><NavLink to="procedimiento" className="nav-link">{t('atencionMedica.nav.procedimiento')}</NavLink></li>
          </ul>
        </aside>

        <main className="medical-content">
          
          <div className="patient-info-box">
            <p><strong>{t('atencionMedica.patientInfo.name')}:</strong> {patient.nombre}</p>
            <p><strong>{t('atencionMedica.patientInfo.age')}:</strong> {patient.edad}</p>
            <p><strong>{t('atencionMedica.patientInfo.sex')}:</strong> {patient.sexo}</p>
            <p><strong>{t('atencionMedica.patientInfo.nationality')}:</strong> {patient.nacionalidad}</p>
            <p><strong>{t('atencionMedica.patientInfo.address')}:</strong> {patient.direccion}</p>
            <p><strong>{t('atencionMedica.patientInfo.country')}:</strong> {patient.pais}</p>
            <p><strong>{t('atencionMedica.patientInfo.state')}:</strong> {patient.estado}</p>
          </div>

          <Outlet />
          
        </main>
      </div>
    </>
  );
}

export default AtencionMedicaLayout;