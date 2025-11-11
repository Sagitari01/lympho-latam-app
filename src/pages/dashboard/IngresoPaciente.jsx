import React from 'react';
import { useTranslation } from 'react-i18next';

function IngresoPaciente() {
  const { t } = useTranslation();

  // Convertimos el HTML a JSX (class -> className, for -> htmlFor, etc.)
  return (
    <div className="container form-content" id="content-ingreso">
      <div className="form-header">
        <div className="header-icon">
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <h1>{t('dashboard.intakeTitle')}</h1>
      </div>

      <form>
        <div className="search-bar">
          <input type="text" className="search-input" placeholder={t('dashboard.searchPlaceholder')} />
          <select className="run-select" defaultValue="">
            <option value="" disabled>{t('dashboard.runSelect')}</option>
            <option value="1">Opción 1</option>
            <option value="2">Opción 2</option>
          </select>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre">{t('dashboard.labelName')}</label>
            <input type="text" id="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="paterno">{t('dashboard.labelLastName')}</label>
            <input type="text" id="paterno" />
          </div>
          <div className="form-group">
            <label htmlFor="materno">{t('dashboard.labelMothersLastName')}</label>
            <input type="text" id="materno" />
          </div>
          <div className="form-group">
            <label htmlFor="social">{t('dashboard.labelSocialName')}</label>
            <input type="text" id="social" />
          </div>

          <div className="form-group">
            <label htmlFor="sexo">{t('dashboard.labelSex')}</label>
            <select id="sexo" defaultValue="">
              <option value="" disabled>{t('dashboard.selectPlaceholder')}</option>
              <option>Masculino</option>
              <option>Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="genero">{t('dashboard.labelGender')}</label>
            <select id="genero" defaultValue="">
              <option value="" disabled>{t('dashboard.selectPlaceholder')}</option>
              <option>Hombre</option>
              <option>Mujer</option>
              <option>No binario</option>
              <option>Prefiero no decir</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nacimiento">{t('dashboard.labelDOB')}</label>
            <input type="text" id="nacimiento" placeholder={t('dashboard.dobPlaceholder')} />
          </div>
          <div className="form-group">
            <label htmlFor="edad">{t('dashboard.labelAge')}</label>
            <input type="number" id="edad" />
          </div>

          <div className="form-group">
            <label htmlFor="ocupacion">{t('dashboard.labelOccupation')}</label>
            <select id="ocupacion" defaultValue="">
              <option value="" disabled>{t('dashboard.selectPlaceholder')}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="domicilio">{t('dashboard.labelAddress')}</label>
            <input type="text" id="domicilio" />
          </div>
          <div className="form-group">
            <label htmlFor="pais">{t('dashboard.labelCountry')}</label>
            <select id="pais" defaultValue="">
              <option value="" disabled>{t('dashboard.selectPlaceholder')}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="region">{t('dashboard.labelState')}</label>
            <select id="region" defaultValue="">
              <option value="" disabled>{t('dashboard.selectPlaceholder')}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="nacionalidad">{t('dashboard.labelNationality')}</label>
            <input type="text" id="nacionalidad" />
          </div>
          <div className="form-group">
            <label htmlFor="religion">{t('dashboard.labelReligion')}</label>
            <input type="text" id="religion" />
          </div>
          <div className="form-group">
            <label htmlFor="etnia">{t('dashboard.labelEthnicity')}</label>
            <input type="text" id="etnia" />
          </div>
          <div className="form-group">
            <label htmlFor="salud">{t('dashboard.labelHealthSystem')}</label>
            <select id="salud" defaultValue="">
              <option value="" disabled>{t('dashboard.selectPlaceholder')}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="medico">{t('dashboard.labelAssignedDoctor')}</label>
            <select id="medico" defaultValue="">
              <option value="" disabled>{t('dashboard.selectPlaceholder')}</option>
            </select>
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">{t('dashboard.btnSave')}</button>
        </div>
      </form>
    </div>
  );
}

export default IngresoPaciente;