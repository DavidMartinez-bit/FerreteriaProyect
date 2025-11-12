// Configuración de Ferretería El Tornillo
// Modifica estos valores según tu configuración

const CONFIG = {
  // URL de tu Google Sheet (reemplaza TU_SHEET_ID con el ID real)
  SHEETS_URL: 'https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv',
  
  // Número de WhatsApp con código de país (reemplaza con tu número)
  WHATSAPP_NUMBER: '+56912345678',
  
  // Información de la tienda
  STORE_NAME: 'Ferretería El Tornillo',
  STORE_ADDRESS: 'Calle Falsa 123, Comuna Local',
  STORE_HOURS: 'Lunes a Sábado de 9:00 a 18:00',
  STORE_PHONE: '+56912345678',
  
  // Configuración de la aplicación
  CACHE_EXPIRY: 5 * 60 * 1000, // 5 minutos en milisegundos
  ITEMS_PER_PAGE: 12,
  CAROUSEL_AUTOPLAY: true,
  CAROUSEL_INTERVAL: 5000 // 5 segundos
};

// Para usar esta configuración, incluye este archivo antes del main.js en tu HTML:
// <script src="config.js"></script>
// <script src="dist/main.js"></script>



