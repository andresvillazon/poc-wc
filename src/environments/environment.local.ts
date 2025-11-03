export const environment = {
  production: false,
  NODE_ENV: 'local',

  // Configuración específica para producción
  defaultLocale: 'es-ES',
  pageSize: 25,
  pageSizes: [10, 25, 50, 100],

  // API
  apiUrl: 'http://localhost:5113',
  apiKey: 'NPVRLG6n4fzihNx9yWiIOg==.oNerG4DLxv0nKCu95/GmQbIQMeIL0NBNqD1x+rgMPRE=',

  // CDN - Reemplazar por la url de acceso del despliegue
  cdnUrl: 'http://localhost:8080/ms-front-asesoramiento-propuestas/'
};
