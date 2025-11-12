/**
 * Archivo de configuración de ejemplo
 * Copia este archivo como config.js y modifica los valores según tu configuración
 */

// Configuración de Google Sheets
export const SHEETS_CONFIG = {
  // URL de tu Google Sheet (reemplaza TU_SHEET_ID con el ID real)
  url: 'https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv',
  
  // Tiempo de cache en milisegundos (5 minutos)
  cacheExpiry: 5 * 60 * 1000
};

// Configuración de WhatsApp
export const WHATSAPP_CONFIG = {
  // Número de WhatsApp con código de país (reemplaza con tu número)
  phoneNumber: '+56912345678'
};

// Configuración de la tienda
export const STORE_CONFIG = {
  name: 'Ferretería El Tornillo',
  address: 'Calle Falsa 123, Comuna Local',
  hours: 'Lunes a Sábado de 9:00 a 18:00',
  phone: '+56912345678',
  email: 'contacto@ferreteriaeltornillo.com'
};

// Configuración de la UI
export const UI_CONFIG = {
  itemsPerPage: 12,
  carouselAutoplay: true,
  carouselInterval: 5000, // 5 segundos
  showPrices: true,
  showStock: true,
  enableSearch: true
};

// Configuración de colores (tema personalizado)
export const THEME_CONFIG = {
  primary: '#dc2626',      // Rojo principal
  secondary: '#1f2937',    // Gris oscuro
  accent: '#f59e0b',       // Amarillo
  neutral: '#374151',      // Gris neutro
  info: '#3b82f6',         // Azul
  success: '#10b981',      // Verde
  warning: '#f59e0b',      // Amarillo
  error: '#ef4444'         // Rojo error
};

// Configuración de mensajes
export const MESSAGES_CONFIG = {
  storeName: 'Ferretería El Tornillo',
  welcomeMessage: '¡Bienvenido a nuestra ferretería!',
  emptyCartMessage: 'Tu carrito está vacío',
  addToCartSuccess: 'Producto agregado al carrito',
  checkoutSuccess: '¡Pedido enviado por WhatsApp!',
  loadingMessage: 'Cargando productos...',
  errorMessage: 'Error al cargar los productos'
};

// Configuración de entrega
export const DELIVERY_CONFIG = {
  storePickup: {
    enabled: true,
    address: 'Calle Falsa 123, Comuna Local',
    hours: 'Lunes a Sábado de 9:00 a 18:00'
  },
  homeDelivery: {
    enabled: true,
    minOrder: 0, // Monto mínimo para despacho gratuito
    deliveryFee: 0, // Costo de despacho (0 = gratis)
    areas: ['Comuna Local', 'Comuna Vecina'] // Áreas de despacho
  }
};

// Configuración de analytics (opcional)
export const ANALYTICS_CONFIG = {
  googleAnalytics: {
    enabled: false,
    trackingId: 'GA_TRACKING_ID'
  },
  facebookPixel: {
    enabled: false,
    pixelId: 'FACEBOOK_PIXEL_ID'
  }
};

// Configuración de SEO
export const SEO_CONFIG = {
  title: 'Ferretería El Tornillo - Catálogo Online',
  description: 'Catálogo online de Ferretería El Tornillo. Encuentra todo lo que necesitas para tu hogar y trabajo.',
  keywords: 'ferretería, herramientas, materiales, construcción, hogar',
  ogImage: 'https://tu-dominio.com/og-image.jpg'
};



