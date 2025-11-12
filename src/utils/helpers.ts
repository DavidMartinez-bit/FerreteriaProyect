/**
 * Utilidades y funciones auxiliares
 * Funciones de apoyo para la aplicación
 */

/**
 * Formatea un precio como moneda chilena
 * @param price Precio a formatear
 * @returns string Precio formateado
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Formatea un precio como número sin símbolo de moneda
 * @param price Precio a formatear
 * @returns string Precio formateado
 */
export function formatPriceNumber(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Valida si una URL es válida
 * @param url URL a validar
 * @returns boolean True si es válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Genera un ID único
 * @returns string ID único
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Debounce function para optimizar llamadas frecuentes
 * @param func Función a ejecutar
 * @param wait Tiempo de espera en ms
 * @returns Función debounced
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Trunca un texto a un número específico de caracteres
 * @param text Texto a truncar
 * @param maxLength Longitud máxima
 * @returns string Texto truncado
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Verifica si el dispositivo es móvil
 * @returns boolean True si es móvil
 */
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

/**
 * Copia texto al portapapeles
 * @param text Texto a copiar
 * @returns Promise<boolean> True si se copió exitosamente
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * Obtiene el nombre del mes en español
 * @param monthIndex Índice del mes (0-11)
 * @returns string Nombre del mes
 */
export function getMonthName(monthIndex: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthIndex] || '';
}

/**
 * Obtiene la fecha actual formateada en español
 * @returns string Fecha formateada
 */
export function getCurrentDateFormatted(): string {
  const now = new Date();
  const day = now.getDate();
  const month = getMonthName(now.getMonth());
  const year = now.getFullYear();
  return `${day} de ${month} de ${year}`;
}

/**
 * Valida un número de teléfono chileno
 * @param phone Número de teléfono
 * @returns boolean True si es válido
 */
export function isValidChileanPhone(phone: string): boolean {
  // Remover espacios y caracteres especiales
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Verificar si empieza con +56 o 56
  if (cleanPhone.startsWith('+56')) {
    // Formato: +56912345678 (11 dígitos después del +56)
    return /^\+56\d{9}$/.test(cleanPhone);
  } else if (cleanPhone.startsWith('56')) {
    // Formato: 56912345678 (9 dígitos después del 56)
    return /^56\d{9}$/.test(cleanPhone);
  } else if (cleanPhone.startsWith('9')) {
    // Formato: 912345678 (9 dígitos)
    return /^9\d{8}$/.test(cleanPhone);
  }
  
  return false;
}

/**
 * Normaliza un número de teléfono chileno al formato internacional
 * @param phone Número de teléfono
 * @returns string Número normalizado
 */
export function normalizeChileanPhone(phone: string): string {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (cleanPhone.startsWith('+56')) {
    return cleanPhone;
  } else if (cleanPhone.startsWith('56')) {
    return '+' + cleanPhone;
  } else if (cleanPhone.startsWith('9')) {
    return '+56' + cleanPhone;
  }
  
  return phone; // Retornar original si no se puede normalizar
}

/**
 * Obtiene el stock status basado en la cantidad
 * @param stock Cantidad de stock
 * @returns object Status del stock
 */
export function getStockStatus(stock: number): {
  status: 'out' | 'low' | 'medium' | 'high';
  label: string;
  color: string;
} {
  if (stock === 0) {
    return { status: 'out', label: 'Sin Stock', color: 'badge-error' };
  } else if (stock < 10) {
    return { status: 'low', label: 'Stock Bajo', color: 'badge-warning' };
  } else if (stock < 50) {
    return { status: 'medium', label: 'Stock Medio', color: 'badge-info' };
  } else {
    return { status: 'high', label: 'Stock Alto', color: 'badge-success' };
  }
}



