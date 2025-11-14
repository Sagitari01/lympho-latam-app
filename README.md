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
- **Internacionalización (i18n): Añadido Portugués de Brasil.**
    - Se creó el archivo de traducción `br.json` (Portugués de Brasil).
    - Se actualizó `i18n.js` para incluir el nuevo idioma (`br`).
    - Se añadió la biblioteca `flag-icons` para mostrar las banderas (`fi-es`, `fi-gb`, `fi-br`).
- **Implementación de "Atención Médica" (Layout Anidado).**
    - Se corrigió la carga de datos del usuario en `App.jsx` usando `fetchUserAttributes` para obtener `name`, `phone_number`, etc.
    - Se creó el layout anidado `AtencionMedicaLayout.jsx` con navegación vertical y sub-rutas.
    - El campo "Medico" ahora muestra el nombre del doctor logueado (`user.attributes.name`).
- **Actualización de "Sesión de Usuario".**
    - `Bienvenida.jsx` ahora muestra una tarjeta de perfil con los datos completos del doctor (Nombre, Correo, Teléfono).

### 14/11/2025

- **Implementación de "Atención Terapéutica".**
    - Se creó el segundo layout anidado (`AtencionTerapeuticaLayout.jsx`) para la ficha del kinesiólogo, reutilizando el patrón de diseño.
    - Se añadió la nueva navegación vertical (Motivo, Anamnesis, Examen Segmentado, etc.).
    - Se creó el CSS dedicado (`AtencionTerapeutica.css`).
    - Se añadieron todas las traducciones (ES/EN/BR) para la nueva sección.
    - Se actualizaron las rutas en `App.jsx` para incluir `/app/atencion-terapeutica/:pacienteId`.

### Próximos pasos

- **Conectar Backend:** Empezar a conectar los formularios (Ingreso de Paciente, Motivo de Consulta) a un backend (Lambda + API Gateway).
- **Base de Datos:** Definir la estructura en DynamoDB para guardar los pacientes.
- **Datos Reales:** Reemplazar los datos *dummy* de la lista de pacientes con una llamada real a la API.
- **Maquetar "Reportes":** Diseñar la última página principal del dashboard.
- **Despliegue:** Probar el despliegue del "build" en AWS.

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
- Modifica los archivos en `/src/locales` para agregar más idiomas.

---

## 📝 Notas

- Proyecto vive en una máquina EC2 Ubuntu en AWS, configurable para despliegue cloud y trabajo en equipo.
- Bitácora y README se actualizan con cada avance importante del desarrollo.