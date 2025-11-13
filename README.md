# lympho-latam-app

Aplicación frontend creada con React + Vite para gestión y visualización de datos en el contexto del proyecto Lympho-Latam.

---

## 📅 Bitácora de Progreso

### 07/11/2025

- Inicialización del repositorio y primer commit.
- Proyecto generado con Vite y plantilla React.
- Estructura básica de carpetas (`components`, `styles`, `locales`) y organización modular.
- Primer componente: formulario de login con estructura adaptada desde HTML original y separación CSS.
- Se logró centrar el login y aplicar color de fondo global correctamente.

### 07/11/2025 

- Configuración de internacionalización con react-i18next.
- Creación de estructura y archivos de idioma (`/src/locales/es.json`, `/src/locales/en.json`).
- Implementación de switch de idioma ES/EN en el frontend.
- Manual de instalación y pruebas de interface translanguaging.

### 10/11/2025

- **Integración de Autenticación con AWS Cognito (Amplify v6).**
- Se implementó un **flujo de autenticación directo** (sin redirección) usando AWS Amplify.
- Se instalaron y configuraron las dependencias de Amplify v6 (`aws-amplify`, `@aws-amplify/auth`).
- Se refactorizó `LoginForm.jsx` para usar `signIn` de Amplify, manejando estado de carga y errores.
- Se actualizó `App.jsx` para crear un **sistema de rutas protegidas**, usando `getCurrentUser`.
- Se implementó la función de `signOut` (Cerrar sesión).
- **Mejoras de UI/UX en el Login:**
    - Se reemplazó el logo temporal por el logo oficial (`LOGOBajadaNEGRO.png`).
    - Se ajustó el CSS del fondo para mejorar el contraste visual.
    - Se añadió el favicon del proyecto (`ICONONEGRO.png`) a la pestaña del navegador.
    - Se implementaron títulos de página dinámicos y se completaron traducciones (EN/ES).
    - Se cambió el idioma por defecto a inglés.

### 11/11/2025

- **Implementación de Flujo "Olvidé Contraseña".**
    - Se actualizó `LoginForm.jsx` para manejar tres estados de vista: `signIn`, `forgotPassword`, y `confirmPassword`.
    - Se integraron las funciones `resetPassword` y `confirmResetPassword` de AWS Amplify v6.
- **Mejora de Usabilidad (UX) en Campos de Contraseña.**
    - Se añadió un icono de "ojo" (toggle) para mostrar/ocultar la contraseña en los campos de inicio de sesión y nueva contraseña.
- **Refactorización a Layout de Dashboard.**
    - Se migró el HTML estático del dashboard a una arquitectura de componentes React con un layout persistente (`MainLayout.jsx`).
    - Se implementaron rutas anidadas (`/app/*`) con `react-router-dom` para las páginas del dashboard (Sesión, Ingreso, Listado, Reportes).
    - Se refactorizó el CSS a un archivo dedicado (`Dashboard.css`) y se tradujo toda la interfaz del dashboard (ES/EN).
    - Se actualizó el logo del header a la versión en blanco (`LOGOBajadaBLANCO.png`).

### 13/11/2025

- **Implementación de "Listado de Pacientes".**
    - Se maquetó la página `ListadoPacientes.jsx` con una tabla estilizada.
    - Se implementó funcionalidad de **filtros** en el frontend (búsqueda general y filtro por columna "Sexo").
    - Se implementó funcionalidad de **ordenamiento** (ascendente/descendente) en todas las columnas clickables.
- **Mejora de Interactividad en Tabla.**
    - Se implementó la lógica para cambiar el estado de "Alta" (`true`/`false`) de un paciente.
    - Se añadió una ventana de confirmación (`window.confirm`) para validar la acción de dar de alta/readmitir.
    - Los iconos de alta ahora cambian de color (rojo/verde) según el estado del paciente.
- **Internacionalización (i18n): Añadido Portugués.**
    - Se creó el archivo de traducción `pt.json` para toda la aplicación.
    - Se actualizó `i18n.js` para incluir el nuevo idioma.
    - Se añadieron los botones de cambio de idioma (ES/EN/PT) a `LoginForm.jsx` y `MainLayout.jsx`.

### Próximos pasos

- Conectar formulario de "Ingreso de Paciente" a un backend (Lambda + API Gateway).
- Conectar "Listado de Pacientes" al backend para obtener y filtrar datos reales.
- Maquetar las páginas de "Atención Médica" y "Atención Terapéutica" (actualmente links vacíos).
- Pruebas de despliegue en AWS (EC2 o Amplify Hosting).

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

- Cambia entre Español/Inglés/Portugués desde el menú superior derecho.
- Modifica los archivos en `/src/locales` para agregar más idiomas.

---

## 📝 Notas

- Proyecto vive en una máquina EC2 Ubuntu en AWS, configurable para despliegue cloud y trabajo en equipo.
- Bitácora y README se actualizan con cada avance importante del desarrollo.