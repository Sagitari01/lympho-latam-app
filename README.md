lympho-latam-app
Aplicación frontend creada con React + Vite para gestión y visualización de datos en el contexto del proyecto Lympho-Latam.

📅 Bitácora de Progreso
07/11/2025
Inicialización del repositorio y primer commit.

Proyecto generado con Vite y plantilla React.

Estructura básica de carpetas (components, styles, locales) y organización modular.

Primer componente: formulario de login con estructura adaptada desde HTML original y separación CSS.

Se logró centrar el login y aplicar color de fondo global correctamente.

07/11/2025 (mañana)
Configuración de internacionalización con react-i18next.

Creación de estructura y archivos de idioma (/src/locales/es.json, /src/locales/en.json).

Implementación de switch de idioma ES/EN en el frontend.

Manual de instalación y pruebas de interface translanguaging.

Próximos pasos
Integrar validación real de login (backend/API).

Maquetar dashboard inicial y flujo de navegación protegido.

Pruebas de despliegue en AWS (S3, Amplify o EC2).

Agregar tests automatizados y CI/CD básico.

🚀 Instalación Rápida
bash
git clone https://github.com/Sagitari01/lympho-latam-app.git
cd lympho-latam-app
npm install
npm run dev
🛠️ Comandos útiles
npm run dev: servidor local de desarrollo (Vite)

npm run build: genera build optimizado para producción

npm run lint: linting código fuente

🌎 Internacionalización
Cambia entre Español/Inglés desde el menú superior derecho.

Modifica los archivos en /src/locales para agregar más idiomas.

📝 Notas
Proyecto vive en una máquina EC2 Ubuntu en AWS, configurable para despliegue cloud y trabajo en equipo.

Bitácora y README se actualizan con cada avance importante del desarrollo.