import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// 1. Quitamos los datos de aquí fuera.

function ListadoPacientes() {
  const { t } = useTranslation();

  // --- 2. Los datos de prueba AHORA SON UN ESTADO ---
  // Esto nos permite modificarlos (dar de alta/baja)
  const [patientsList, setPatientsList] = useState([
    {
      id: 1,
      fechaIngreso: "10/10/2025",
      idPaciente: "12345678-9",
      edad: 30,
      sexo: "F",
      nombre: "PRUEBA 1 FEMENINO",
      alta: false 
    },
    {
      id: 2,
      fechaIngreso: "08/10/2025",
      idPaciente: "98765432-1",
      edad: 52,
      sexo: "M",
      nombre: "PRUEBA 2 MASCULINO",
      alta: true 
    },
    {
      id: 3,
      fechaIngreso: "05/10/2025",
      idPaciente: "11111111-K",
      edad: 41,
      sexo: "F",
      nombre: "PRUEBA 3 FEMENINO",
      alta: false 
    },
  ]);

  // --- Estados para los Filtros ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sexFilter, setSexFilter] = useState("");

  // --- Estado para Ordenamiento ---
  const [sortConfig, setSortConfig] = useState({ key: 'fechaIngreso', direction: 'descending' });

  // --- Lógica de Filtrado y Ordenamiento ---
  const filteredAndSortedPatients = useMemo(() => {
    
    // 3. Ahora filtramos desde 'patientsList' (el estado)
    let filtered = patientsList.filter(patient => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        patient.nombre.toLowerCase().includes(query) ||
        patient.idPaciente.toLowerCase().includes(query);
      if (!matchesSearch) return false;

      const matchesSex = !sexFilter || patient.sexo === sexFilter;
      if (!matchesSex) return false;

      return true;
    });

    // 2. Ordenamiento
    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
    
  }, [patientsList, searchQuery, sexFilter, sortConfig]); // 4. 'patientsList' es ahora una dependencia


  // --- Función para cambiar el orden ---
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // --- Función para renderizar el icono de orden ---
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="sort-icon"></span>;
    }
    return (
      <span className="sort-icon">
        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
      </span>
    );
  };

  // --- 5. NUEVA FUNCIÓN: Toggle de Alta ---
  const handleToggleAlta = (patientId, currentStatus) => {
    // Determina el mensaje de confirmación basado en el estado actual
    const messageKey = currentStatus 
      ? 'dashboard.confirmReAdmit' // Mensaje si ya está dado de alta (verde)
      : 'dashboard.confirmDischarge'; // Mensaje si no está dado de alta (rojo)
    
    // Muestra la ventana emergente
    if (window.confirm(t(messageKey))) {
      // Si el usuario acepta, actualiza el estado
      setPatientsList(currentList => 
        currentList.map(patient => 
          patient.id === patientId 
            ? { ...patient, alta: !patient.alta } // Invierte el estado 'alta'
            : patient
        )
      );
    }
  };


  return (
    <div className="container form-content" id="content-listado">
      
      <div className="form-header">
        <div className="header-icon">
          <i className="fa-solid fa-users"></i>
        </div>
        <h1>{t('dashboard.listTitle')}</h1>
      </div>

      <div className="table-filter-bar">
        <input 
          type="text"
          className="table-search-input"
          placeholder={t('dashboard.searchPlaceholderList')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="patient-table-container">
        <table className="patient-table">
          <thead>
            <tr>
              <th className="sortable-header" onClick={() => requestSort('fechaIngreso')}>
                {t('dashboard.thDate')} {getSortIcon('fechaIngreso')}
              </th>
              <th className="sortable-header" onClick={() => requestSort('idPaciente')}>
                {t('dashboard.thID')} {getSortIcon('idPaciente')}
              </th>
              <th className="sortable-header" onClick={() => requestSort('edad')}>
                {t('dashboard.thAge')} {getSortIcon('edad')}
              </th>
              <th>
                <span className="sortable-header" onClick={() => requestSort('sexo')}>
                  {t('dashboard.thSex')} {getSortIcon('sexo')}
                </span>
                <select 
                  className="column-filter"
                  value={sexFilter}
                  onChange={(e) => setSexFilter(e.target.value)}
                  onClick={(e) => e.stopPropagation()} 
                >
                  <option value="">{t('dashboard.filterAll')}</option>
                  <option value="M">{t('dashboard.filterMale')}</option>
                  <option value="F">{t('dashboard.filterFemale')}</option>
                </select>
              </th>
              <th className="sortable-header" onClick={() => requestSort('nombre')}>
                {t('dashboard.thName')} {getSortIcon('nombre')}
              </th>
              <th>{t('dashboard.thMedical')}</th>
              <th>{t('dashboard.thTherapy')}</th>
              <th className="sortable-header" onClick={() => requestSort('alta')}>
                {t('dashboard.thDischarge')} {getSortIcon('alta')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPatients.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.fechaIngreso}</td>
                <td>{paciente.idPaciente}</td>
                <td>{paciente.edad}</td>
                <td>
                  {paciente.sexo === 'F' ? (
                    <i className="fa-solid fa-venus sex-icon-female"></i>
                  ) : (
                    <i className="fa-solid fa-mars sex-icon-male"></i>
                  )}
                </td>
                <td>{paciente.nombre}</td>
                <td>
                  <Link 
                    to={`/app/atencion-medica/${paciente.id}`} 
                    className="icon-button icon-medical"
                    title={t('dashboard.thMedical')}
                  >
                    <i className="fa-solid fa-briefcase-medical"></i>
                  </Link>
                </td>
                <td>
                  <Link 
                    to={`/app/atencion-terapeutica/${paciente.id}`} 
                    className="icon-button icon-therapy"
                    title={t('dashboard.thTherapy')}
                  >
                    <i className="fa-solid fa-person-dots-from-line"></i>
                  </Link>
                </td>
                <td>
                  {/* --- 6. CAMBIO: De <Link> a <button> --- */}
                  {/* Esto ya no es un link, es un botón de acción */}
                  <button 
                    onClick={() => handleToggleAlta(paciente.id, paciente.alta)}
                    className={`icon-button ${
                      paciente.alta 
                        ? 'icon-discharge-complete' // Estado "Dado de Alta" (Verde)
                        : 'icon-discharge-active'   // Estado "Activo" (Rojo)
                    }`}
                    title={paciente.alta ? t('dashboard.titleReAdmit') : t('dashboard.titleDischarge')}
                  >
                    {/* Cambiamos el icono según el estado */}
                    {paciente.alta ? (
                      <i className="fa-solid fa-check-circle"></i>
                    ) : (
                      <i className="fa-solid fa-minus-circle"></i>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListadoPacientes;