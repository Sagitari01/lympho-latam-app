# lympho-latam-app

Aplicación frontend creada con React + Vite para gestión y visualización de datos en el contexto del proyecto Lympho-Latam.

---

## 📅 Bitácora de Progreso

### 07/11/2025

- Inicialización del repositorio y primer commit.
- Proyecto generado con Vite y plantilla React.
- Estructura básica de carpetas (`components`, `styles`, `locales`) y organización modular.
- Primer componente: formulario de login con estructura adaptada desde HTML original y separación CSS.

### 10/11/2025

- **Integración de Autenticación con AWS Cognito (Amplify v6).**
- Se implementó el flujo de autenticación directo.
- Configuración de rutas protegidas y manejo de sesión de usuario.

### 11/11/2025

- **Recuperación de Contraseña.**
- Implementación del flujo "Olvidé mi contraseña" con AWS Cognito.
- Mejoras de UX en los campos de contraseña (botón mostrar/ocultar).

### 13/11/2025

- **Implementación de "Listado de Pacientes".**
- Maquetación de tabla con filtros y ordenamiento.
- Lógica de "Alta/Readmisión" con alertas de confirmación.
- **Internacionalización:** Soporte completo para ES, EN y PT-BR.

### 25/11/2025

- **Módulos Clínicos y Atención Terapéutica.**
- Creación de Layouts anidados y lógica de usuario en cabecera.
- Implementación de **"Atención Terapéutica"**:
    - Navegación lateral y estructura de formularios.
    - Formularios de Anamnesis, Problemas y Objetivos.
    - Evaluación de Lipedema con escala de dolor interactiva.
    - **Examen Físico Segmentado:** Desarrollo del primer prototipo de mapa corporal interactivo (SVG) con selección múltiple.

### 28/11/2025

- **Desarrollo Completo de "Atención Médica":**
    - **Signos Vitales:** Formulario en grilla con **cálculo automático de IMC**.
    - **Examen Físico:** Implementación refinada del mapa corporal y **Modal de Evaluación Oncológica** con selector de cuestionarios dinámico (Ginecológico implementado).
    - **Procedimiento:** Interfaz visual de iconos para derivaciones y recetas.
    - **Anamnesis Médica:** Formulario específico de antecedentes mórbidos.

- **Consolidación Técnica:**
    - **Refactorización SVG:** Se estandarizó el componente de mapa corporal para ser reutilizable, ligero y estable (sin librerías externas conflictivas).
    - **Limpieza i18n:** Se depuraron los archivos de traducción (ES/EN/BR) eliminando claves innecesarias y completando todos los textos médicos.
    - **UI/UX:** Mejoras en la responsividad de las grillas y estilos de los modales.

### Próximos pasos

- **Conectar Backend:** Conectar los formularios (Ingreso, Signos Vitales, Examen Físico) a un backend (Lambda + API Gateway + DynamoDB).
- **Persistencia:** Guardar y recuperar los datos del mapa corporal.
- **Maquetar "Reportes":** Diseñar la última página principal del dashboard.
- **Despliegue:** Configuración de pipeline en AWS Amplify Hosting.

---

## 🚀 Instalación Rápida

- `git clone https://github.com/Sagitari01/lympho-latam-app.git`
- `cd lympho-latam-app`
- `npm install`
- `npm run dev`

---

## 🛠️ Comandos útiles

- `npm run dev`: servidor local de desarrollo (Vite)
- `npm run build`: genera build optimizado para producción
- `npm run lint`: linting código fuente

---

## 🌎 Internacionalización

- Cambia entre Español/Inglés/Portugués (BR) desde el menú superior derecho.
- Modifica los archivos en `/src/locales` para agregar más idiomas o ajustar textos médicos.