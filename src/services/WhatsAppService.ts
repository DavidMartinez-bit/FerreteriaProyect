import { Order, DeliveryMethod } from '../models/Product.js';

/**
 * Servicio para integración con WhatsApp
 * Maneja la generación y envío de mensajes de pedidos
 */
export class WhatsAppService {
  private readonly phoneNumber: string;
  private readonly storeName: string = "Ferretería El Tornillo";

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  /**
   * Genera un mensaje de pedido para WhatsApp
   * @param order Pedido a procesar
   * @returns string Mensaje formateado
   */
  generateOrderMessage(order: Order): string {
    const { items, delivery, total } = order;
    
    let message = `¡Hola ${this.storeName}! 🔩\n\n`;
    message += `Quisiera hacer el siguiente pedido:\n\n`;
    
    // Información de entrega
    message += `*Método de Entrega:* `;
    if (delivery.method === DeliveryMethod.HOME_DELIVERY) {
      message += `Despacho a Domicilio\n`;
      message += `*Dirección de Envío:* ${delivery.address}\n`;
    } else {
      message += `Retiro en Tienda\n`;
    }
    
    message += `\n*Productos:*\n`;
    
    // Lista de productos
    items.forEach(item => {
      const subtotal = item.product.precio * item.quantity;
      message += `- ${item.quantity} x ${item.product.nombre} ($${this.formatPrice(subtotal)})\n`;
    });
    
    // Total
    message += `\n*Total del Pedido:* $${this.formatPrice(total)}\n\n`;
    
    // Mensaje de cierre
    if (delivery.method === DeliveryMethod.HOME_DELIVERY) {
      message += `¡Quedo atento a la confirmación!`;
    } else {
      message += `Quedo atento a cualquier confirmación!`;
    }
    
    return message;
  }

  /**
   * Abre WhatsApp con el mensaje del pedido
   * @param order Pedido a enviar
   */
  sendOrder(order: Order): void {
    const message = this.generateOrderMessage(order);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    
    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Formatea un precio como moneda chilena
   * @param price Precio a formatear
   * @returns string Precio formateado
   */
  private formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  /**
   * Genera un mensaje de prueba para verificar la configuración
   * @returns string Mensaje de prueba
   */
  generateTestMessage(): string {
    return `¡Hola ${this.storeName}! 🔩\n\nEste es un mensaje de prueba para verificar que la integración con WhatsApp funciona correctamente.\n\n¡Gracias!`;
  }

  /**
   * Envía un mensaje de prueba
   */
  sendTestMessage(): void {
    const message = this.generateTestMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
}



