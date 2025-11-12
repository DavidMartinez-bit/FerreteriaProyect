import { Product } from '../models/Product.js';

/**
 * Servicio para obtener datos de Google Sheets
 * Capa de acceso a datos que maneja la comunicación con Google Sheets
 */
export class GoogleSheetsService {
  private readonly sheetsUrl: string;
  private readonly cache: Product[] | null = null;
  private readonly cacheExpiry: number = 5 * 60 * 1000; // 5 minutos
  private lastFetchTime: number = 0;

  constructor(sheetsUrl: string) {
    this.sheetsUrl = sheetsUrl;
  }

  /**
   * Obtiene productos de ejemplo (mockup) para pruebas
   * @returns Product[] Array de productos de ejemplo
   */
  private getMockProducts(): Product[] {
    return [
      {
        id: 'MOCK-001',
        nombre: 'Martillo Carpintero 20oz',
        descripcion: 'Martillo profesional con mango de fibra de vidrio y cabeza de acero forjado. Ideal para trabajos de carpintería y construcción.',
        precio: 15990,
        stock: 50,
        imagenURL: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        esDestacado: true
      },
      {
        id: 'MOCK-002',
        nombre: 'Sierra Circular 7 1/4"',
        descripcion: 'Sierra circular profesional con motor de 1800W. Perfecta para cortes precisos en madera, plástico y materiales ligeros.',
        precio: 89990,
        stock: 25,
        imagenURL: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400',
        esDestacado: true
      },
      {
        id: 'MOCK-003',
        nombre: 'Taladro Percutor 18V',
        descripcion: 'Taladro percutor inalámbrico con batería de litio 18V. Incluye 2 baterías, cargador y maletín de transporte.',
        precio: 129990,
        stock: 15,
        imagenURL: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
        esDestacado: true
      },
      {
        id: 'MOCK-004',
        nombre: 'Caja 100 Tornillos drywall',
        descripcion: 'Tornillos para drywall cabeza phillips 3.5x25mm. Acero galvanizado, resistencia a la corrosión.',
        precio: 4500,
        stock: 200,
        imagenURL: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
        esDestacado: false
      },
      {
        id: 'MOCK-005',
        nombre: 'Destornillador Set 6 piezas',
        descripcion: 'Set completo de destornilladores Phillips y planos. Mangos ergonómicos con acabado antideslizante.',
        precio: 8990,
        stock: 80,
        imagenURL: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
        esDestacado: false
      },
      {
        id: 'MOCK-006',
        nombre: 'Clavos Construcción 2kg',
        descripcion: 'Clavos de acero galvanizado para construcción. Caja de 2kg, varios tamaños incluidos.',
        precio: 12990,
        stock: 150,
        imagenURL: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
        esDestacado: false
      },
      {
        id: 'MOCK-007',
        nombre: 'Pintura Latex Interior 4L',
        descripcion: 'Pintura látex blanco para interiores. Alto poder cubriente, lavable y de secado rápido.',
        precio: 45990,
        stock: 30,
        imagenURL: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
        esDestacado: false
      },
      {
        id: 'MOCK-008',
        nombre: 'Cinta Métrica 5m',
        descripcion: 'Cinta métrica de acero con carcasa amarilla. Graduación clara y cinta resistente.',
        precio: 5990,
        stock: 60,
        imagenURL: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        esDestacado: false
      }
    ];
  }

  /**
   * Obtiene todos los productos desde Google Sheets
   * @returns Promise<Product[]> Array de productos
   */
  async getProducts(): Promise<Product[]> {
    // Verificar si el cache es válido
    const now = Date.now();
    if (this.cache && (now - this.lastFetchTime) < this.cacheExpiry) {
      console.log('Usando productos del cache');
      return this.cache;
    }

    console.log('Cargando productos desde Google Sheets:', this.sheetsUrl);
    
    try {
      const response = await fetch(this.sheetsUrl);
      
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
      }

      const csvText = await response.text();
      console.log('CSV recibido, longitud:', csvText.length, 'caracteres');
      console.log('Primeras 200 caracteres:', csvText.substring(0, 200));
      
      const products = this.parseCSV(csvText);
      
      // Si no hay productos o hay un error en el parseo, usar productos de ejemplo
      if (products.length === 0) {
        console.warn('No se encontraron productos en Google Sheets. Usando productos de ejemplo.');
        return this.getMockProducts();
      }
      
      console.log(`✅ ${products.length} productos cargados exitosamente desde Google Sheets`);
      this.lastFetchTime = now;
      return products;
    } catch (error) {
      console.error('❌ Error al obtener productos desde Google Sheets:', error);
      console.warn('Usando productos de ejemplo como fallback');
      // En caso de error, devolver productos de ejemplo
      return this.getMockProducts();
    }
  }

  /**
   * Obtiene productos destacados
   * @returns Promise<Product[]> Array de productos destacados
   */
  async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter(product => product.esDestacado && product.stock > 0);
  }

  /**
   * Obtiene productos disponibles (con stock)
   * @returns Promise<Product[]> Array de productos disponibles
   */
  async getAvailableProducts(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter(product => product.stock > 0);
  }

  /**
   * Busca un producto por ID
   * @param id ID del producto
   * @returns Promise<Product | null> Producto encontrado o null
   */
  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(product => product.id === id) || null;
  }

  /**
   * Parsea el CSV de Google Sheets a un array de productos
   * @param csvText Texto CSV
   * @returns Product[] Array de productos parseados
   */
  private parseCSV(csvText: string): Product[] {
    const lines = csvText.trim().split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length < 2) {
      console.warn('CSV tiene menos de 2 líneas (encabezado + datos)');
      return [];
    }
    
    const headers = this.parseCSVLine(lines[0]).map(header => header.trim().toLowerCase());
    console.log('Headers encontrados:', headers);
    
    const products: Product[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      
      if (values.length >= 6) { // Mínimo 6 columnas requeridas
        const idIndex = headers.indexOf('id');
        const nombreIndex = headers.indexOf('nombre');
        const descripcionIndex = headers.indexOf('descripcion');
        const precioIndex = headers.indexOf('precio');
        const stockIndex = headers.indexOf('stock');
        const imagenURLIndex = headers.indexOf('imagenurl');
        const esDestacadoIndex = headers.indexOf('esdestacado');
        
        const product: Product = {
          id: (idIndex >= 0 ? values[idIndex] : '').trim(),
          nombre: (nombreIndex >= 0 ? values[nombreIndex] : '').trim(),
          descripcion: (descripcionIndex >= 0 ? values[descripcionIndex] : '').trim(),
          precio: parseFloat((precioIndex >= 0 ? values[precioIndex] : '0').trim()) || 0,
          stock: parseInt((stockIndex >= 0 ? values[stockIndex] : '0').trim()) || 0,
          imagenURL: (imagenURLIndex >= 0 ? values[imagenURLIndex] : '').trim(),
          esDestacado: (esDestacadoIndex >= 0 ? values[esDestacadoIndex]?.toLowerCase().trim() : 'false') === 'true'
        };
        
        // Solo agregar si tiene al menos id y nombre
        if (product.id && product.nombre) {
          products.push(product);
          console.log(`Producto parseado: ${product.id} - ${product.nombre}`);
        } else {
          console.warn(`Producto omitido (falta id o nombre):`, values);
        }
      } else {
        console.warn(`Línea ${i + 1} tiene menos columnas de las esperadas:`, values);
      }
    }
    
    console.log(`Total productos parseados: ${products.length}`);
    return products;
  }

  /**
   * Parsea una línea CSV manejando comillas y comas dentro de valores
   * @param line Línea CSV
   * @returns string[] Array de valores
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = i < line.length - 1 ? line[i + 1] : '';
      
      if (char === '"') {
        // Si hay dos comillas seguidas, es una comilla escapada
        if (nextChar === '"' && inQuotes) {
          current += '"';
          i++; // Saltar la siguiente comilla
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Agregar el último campo
    result.push(current.trim());
    return result;
  }
}

