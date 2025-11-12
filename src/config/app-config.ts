/**
 * Configuración de la aplicación
 * Centraliza todas las configuraciones necesarias
 */

export interface AppConfig {
  sheets: {
    url: string;
    cacheExpiry: number;
  };
  whatsapp: {
    phoneNumber: string;
  };
  store: {
    name: string;
    address: string;
    hours: string;
    phone: string;
  };
  ui: {
    itemsPerPage: number;
    carouselAutoplay: boolean;
    carouselInterval: number;
  };
}

/**
 * Configuración por defecto de la aplicación
 * IMPORTANTE: Cambiar estos valores según tu configuración
 */
export const defaultConfig: AppConfig = {
  sheets: {
    // URL de tu Google Sheet (cambiar por la tuya)
    url: 'https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv',
    // Tiempo de cache en milisegundos (5 minutos)
    cacheExpiry: 5 * 60 * 1000
  },
  whatsapp: {
    // Número de WhatsApp (cambiar por el tuyo)
    phoneNumber: '+56912345678'
  },
  store: {
    name: 'Ferretería El Tornillo',
    address: 'Calle Falsa 123, Comuna Local',
    hours: 'Lunes a Sábado de 9:00 a 18:00',
    phone: '+56912345678'
  },
  ui: {
    itemsPerPage: 12,
    carouselAutoplay: true,
    carouselInterval: 5000 // 5 segundos
  }
};

/**
 * Función para obtener la configuración
 * Permite sobrescribir valores por defecto
 * @param overrides Configuración personalizada
 * @returns AppConfig Configuración final
 */
export function getConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    ...defaultConfig,
    ...overrides,
    sheets: {
      ...defaultConfig.sheets,
      ...overrides.sheets
    },
    whatsapp: {
      ...defaultConfig.whatsapp,
      ...overrides.whatsapp
    },
    store: {
      ...defaultConfig.store,
      ...overrides.store
    },
    ui: {
      ...defaultConfig.ui,
      ...overrides.ui
    }
  };
}



