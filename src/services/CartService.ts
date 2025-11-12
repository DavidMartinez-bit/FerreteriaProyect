import { Product, CartItem, DeliveryMethod, DeliveryInfo, Order } from '../models/Product.js';

/**
 * Servicio para manejo del carrito de compras
 * Lógica de negocio para el carrito y operaciones relacionadas
 */
export class CartService {
  private cartItems: CartItem[] = [];
  private deliveryInfo: DeliveryInfo = { method: DeliveryMethod.STORE_PICKUP };
  private readonly STORE_ADDRESS = "Calle Falsa 123, Comuna Local";
  private readonly STORE_HOURS = "de Lunes a Sábado de 9:00 a 18:00";

  /**
   * Obtiene todos los items del carrito
   * @returns CartItem[] Array de items en el carrito
   */
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  /**
   * Agrega un producto al carrito
   * @param product Producto a agregar
   * @param quantity Cantidad a agregar
   */
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.notifyCartChange();
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   * @param productId ID del producto
   * @param quantity Nueva cantidad
   */
  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.notifyCartChange();
      }
    }
  }

  /**
   * Remueve un producto del carrito
   * @param productId ID del producto a remover
   */
  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.notifyCartChange();
  }

  /**
   * Limpia todo el carrito
   */
  clearCart(): void {
    this.cartItems = [];
    this.notifyCartChange();
  }

  /**
   * Obtiene el total de items en el carrito
   * @returns number Cantidad total de items
   */
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Obtiene el total del carrito
   * @returns number Total en pesos
   */
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  }

  /**
   * Verifica si el carrito está vacío
   * @returns boolean True si está vacío
   */
  isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  /**
   * Obtiene la información de entrega actual
   * @returns DeliveryInfo Información de entrega
   */
  getDeliveryInfo(): DeliveryInfo {
    return { ...this.deliveryInfo };
  }

  /**
   * Actualiza el método de entrega
   * @param method Método de entrega
   * @param address Dirección (opcional)
   */
  setDeliveryMethod(method: DeliveryMethod, address?: string): void {
    this.deliveryInfo = { method, address };
  }

  /**
   * Obtiene la dirección de la tienda
   * @returns string Dirección de la tienda
   */
  getStoreInfo(): string {
    return `${this.STORE_ADDRESS}, ${this.STORE_HOURS}`;
  }

  /**
   * Verifica si el pedido es válido para realizar
   * @returns boolean True si es válido
   */
  isValidForCheckout(): boolean {
    if (this.isEmpty()) return false;
    
    if (this.deliveryInfo.method === DeliveryMethod.HOME_DELIVERY) {
      return !!this.deliveryInfo.address?.trim();
    }
    
    return true;
  }

  /**
   * Genera el pedido completo
   * @returns Order Pedido generado
   */
  generateOrder(): Order {
    if (!this.isValidForCheckout()) {
      throw new Error('El pedido no es válido para procesar');
    }

    return {
      items: [...this.cartItems],
      delivery: { ...this.deliveryInfo },
      total: this.getTotal()
    };
  }

  /**
   * Notifica cambios en el carrito (para actualizar UI)
   */
  private notifyCartChange(): void {
    // Disparar evento personalizado para notificar cambios
    const event = new CustomEvent('cartChanged', {
      detail: {
        items: this.getCartItems(),
        total: this.getTotal(),
        totalItems: this.getTotalItems()
      }
    });
    document.dispatchEvent(event);
  }
}



