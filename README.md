# lympho-latam-app

Aplicación frontend creada con React + Vite para gestión y visualización de datos en el contexto del proyecto Lympho-Latam.

---

## 📅 Bitácora de Progreso

### 07/11/2025
- Inicialización del repositorio y primer commit.
- Estructura básica y Login.

### 10/11/2025
- **Autenticación:** Integración con AWS Cognito (Amplify v6).
- Rutas protegidas y manejo de sesión.

### 11/11/2025
- **Recuperación de Contraseña:** Flujo completo de "Olvidé mi contraseña".

### 13/11/2025
- **Listado de Pacientes:** Tabla con filtros, ordenamiento y lógica de alta/readmisión.
- **Internacionalización:** Soporte base para ES, EN y PT-BR.

### 25/11/2025
- **Módulo de Atención Terapéutica:**
    - Creación de Layouts y navegación lateral.
    - Formularios: Anamnesis, Problemas y Objetivos, Evaluación de Lipedema.
    - **Examen Físico Segmentado:** Desarrollo del mapa corporal interactivo con selección múltiple.

### 28/11/2025
- **Desarrollo Completo de "Atención Médica":**
    - **Signos Vitales:** Grilla de datos con cálculo automático de IMC.
    - **Examen Físico:** Implementación del componente `BodyMap` unificado (Frente/Dorso). Modal de Evaluación Oncológica con cuestionarios dinámicos y traducciones completas.
    - **Procedimiento:** Menú de navegación visual con iconos.
    - **Anamnesis Médica:** Formulario específico de antecedentes.

- **Consolidación Técnica:**
    - **Refactorización:** Creación de `BodyMap.jsx` reutilizable para evitar duplicidad de código SVG.
    - **Corrección de Errores:** Solución a bugs de traducción (i18n) en selectores y etiquetas dinámicas.
    - **UI/UX:** Estandarización de estilos en formularios y modales.

### Próximos pasos
- **Conectar Backend:** Integración de formularios con Lambda/DynamoDB.
- **Persistencia:** Guardado real de las zonas seleccionadas y notas clínicas.
- **Maquetar "Reportes":** Diseño de la vista de estadísticas.
- **Despliegue:** Configuración en AWS Amplify Hosting.

---

## 🚀 Instalación Rápida

- `git clone https://github.com/Sagitari01/lympho-latam-app.git`
- `cd lympho-latam-app`
- `npm install`
- `npm run dev`