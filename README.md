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
- Se descartó el flujo OIDC (con redirección) para implementar un **flujo de autenticación directo** (sin salir de la página) usando AWS Amplify.
- Se instalaron y configuraron las dependencias de Amplify v6 (`aws-amplify`, `@aws-amplify/auth`).
- Se refactorizó `LoginForm.jsx` para capturar credenciales y usar la función `signIn` de Amplify, incluyendo manejo de estado de carga y errores de Cognito.
- Se actualizó `App.jsx` para crear un **sistema de rutas protegidas**, usando `getCurrentUser` para verificar la sesión al cargar la app.
- Se implementó la función de `signOut` (Cerrar sesión) en el componente `Bienvenida.jsx`.
- **Mejoras de UI/UX en el Login:**
    - Se reemplazó el logo temporal por el logo oficial (`LOGOBajadaNEGRO.png`).
    - Se ajustó el CSS del fondo para mejorar el contraste visual.
    - Se añadió el favicon del proyecto (`ICONONEGRO.png`) a la pestaña del navegador.
    - Se implementaron títulos de página dinámicos que cambian con el idioma (`react-i18next`).
    - Se completaron las traducciones (EN/ES) para los mensajes de error y se cambió el idioma por defecto a inglés.

### Próximos pasos

- Maquetar dashboard inicial (mejorar la página de `Bienvenida.jsx`).
- Implementar flujo de "Olvidé mi contraseña" (Forgot Password) con Amplify.
- Pruebas de despliegue en AWS (S3, Amplify o EC2).
- Agregar tests automatizados y CI/CD básico.

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

- Cambia entre Español/Inglés desde el menú superior derecho.
- Modifica los archivos en `/src/locales` para agregar más idiomas.

---

## 📝 Notas

- Proyecto vive en una máquina EC2 Ubuntu en AWS, configurable para despliegue cloud y trabajo en equipo.
- Bitácora y README se actualizan con cada avance importante del desarrollo.