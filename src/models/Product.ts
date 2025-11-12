/**
 * Modelo de datos para Producto
 * Representa la estructura de un producto en el catálogo
 */
export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenURL: string;
  esDestacado: boolean;
}

/**
 * Tipo para el carrito de compras
 * Representa un producto en el carrito con su cantidad
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Enumeración para métodos de entrega
 */
export enum DeliveryMethod {
  HOME_DELIVERY = 'despacho_domicilio',
  STORE_PICKUP = 'retiro_tienda'
}

/**
 * Modelo para información de entrega
 */
export interface DeliveryInfo {
  method: DeliveryMethod;
  address?: string;
}

/**
 * Modelo para pedido completo
 */
export interface Order {
  items: CartItem[];
  delivery: DeliveryInfo;
  total: number;
}



