import { CartItem, DeliveryMethod } from '../models/Product.js';
import { CartService } from '../services/CartService.js';

/**
 * Componente para el drawer del carrito
 * Maneja la visualización y manipulación del carrito de compras
 */
export class CartDrawer {
  private cartService: CartService;

  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  /**
   * Renderiza el drawer del carrito
   * @returns string HTML del drawer
   */
  render(): string {
    return `
      <div class="drawer drawer-end">
        <input id="cart-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Contenido principal -->
        </div>
        <div class="drawer-side">
          <label for="cart-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          <div class="min-h-full w-80 bg-base-200 p-4">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-primary">🛒 Carrito</h2>
              <label for="cart-drawer" class="btn btn-sm btn-circle btn-ghost">
                ✕
              </label>
            </div>
            
            <div id="cart-content">
              ${this.renderCartContent()}
            </div>
            
            <div class="divider"></div>
            
            <div id="cart-checkout">
              ${this.renderCheckoutSection()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza el contenido del carrito
   * @returns string HTML del contenido
   */
  private renderCartContent(): string {
    const items = this.cartService.getCartItems();
    
    if (items.length === 0) {
      return `
        <div class="text-center py-8">
          <div class="text-6xl mb-4">🛒</div>
          <p class="text-gray-500">Tu carrito está vacío</p>
          <p class="text-sm text-gray-400 mt-2">Agrega algunos productos para comenzar</p>
        </div>
      `;
    }

    return `
      <div class="space-y-4 max-h-96 overflow-y-auto">
        ${items.map(item => this.renderCartItem(item)).join('')}
      </div>
      <div class="mt-6 p-4 bg-base-100 rounded-lg">
        <div class="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span class="text-primary">$${this.formatPrice(this.cartService.getTotal())}</span>
        </div>
        <div class="text-sm text-gray-500 mt-1">
          ${this.cartService.getTotalItems()} producto(s)
        </div>
      </div>
    `;
  }

  /**
   * Renderiza un item del carrito
   * @param item Item del carrito
   * @returns string HTML del item
   */
  private renderCartItem(item: CartItem): string {
    return `
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4">
          <div class="flex gap-3">
            <div class="avatar">
              <div class="w-16 h-16 rounded-lg">
                <img 
                  src="${item.product.imagenURL}" 
                  alt="${item.product.nombre}"
                  class="object-cover"
                  onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LXNpemU9IjEwIj5JbWFnZW48L3RleHQ+Cjwvc3ZnPg=='"
                />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-sm line-clamp-2">${item.product.nombre}</h3>
              <p class="text-primary font-bold">$${this.formatPrice(item.product.precio)}</p>
              <div class="flex items-center gap-2 mt-2">
                <button 
                  class="btn btn-xs btn-circle btn-outline"
                  onclick="window.cartDrawerHandler.updateQuantity('${item.product.id}', ${item.quantity - 1})"
                >
                  -
                </button>
                <span class="text-sm font-medium">${item.quantity}</span>
                <button 
                  class="btn btn-xs btn-circle btn-outline"
                  onclick="window.cartDrawerHandler.updateQuantity('${item.product.id}', ${item.quantity + 1})"
                >
                  +
                </button>
                <button 
                  class="btn btn-xs btn-ghost text-error ml-auto"
                  onclick="window.cartDrawerHandler.removeItem('${item.product.id}')"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza la sección de checkout
   * @returns string HTML de la sección de checkout
   */
  private renderCheckoutSection(): string {
    const deliveryInfo = this.cartService.getDeliveryInfo();
    
    return `
      <div class="space-y-4">
        <h3 class="text-lg font-bold">Método de Entrega</h3>
        
        <div class="space-y-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="delivery-method" 
              class="radio radio-primary" 
              value="${DeliveryMethod.STORE_PICKUP}"
              ${deliveryInfo.method === DeliveryMethod.STORE_PICKUP ? 'checked' : ''}
              onchange="window.cartDrawerHandler.setDeliveryMethod('${DeliveryMethod.STORE_PICKUP}')"
            />
            <div>
              <div class="font-medium">Retiro en Tienda</div>
              <div class="text-sm text-gray-500">${this.cartService.getStoreInfo()}</div>
            </div>
          </label>
          
          <label class="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="delivery-method" 
              class="radio radio-primary" 
              value="${DeliveryMethod.HOME_DELIVERY}"
              ${deliveryInfo.method === DeliveryMethod.HOME_DELIVERY ? 'checked' : ''}
              onchange="window.cartDrawerHandler.setDeliveryMethod('${DeliveryMethod.HOME_DELIVERY}')"
            />
            <div>
              <div class="font-medium">Despacho a Domicilio</div>
              <div class="text-sm text-gray-500">Envío a tu dirección</div>
            </div>
          </label>
        </div>
        
        <div id="address-section" class="${deliveryInfo.method === DeliveryMethod.HOME_DELIVERY ? '' : 'hidden'}">
          <label class="form-control">
            <div class="label">
              <span class="label-text font-medium">Dirección de Envío</span>
            </div>
            <textarea 
              class="textarea textarea-bordered textarea-sm" 
              placeholder="Ingresa tu dirección completa..."
              id="delivery-address"
              onchange="window.cartDrawerHandler.setAddress(this.value)"
            >${deliveryInfo.address || ''}</textarea>
          </label>
        </div>
        
        <button 
          class="btn btn-primary btn-block mt-6"
          onclick="window.cartDrawerHandler.proceedToCheckout()"
          ${!this.cartService.isValidForCheckout() ? 'disabled' : ''}
        >
          Realizar Pedido por WhatsApp
        </button>
      </div>
    `;
  }

  /**
   * Actualiza el contenido del carrito
   */
  updateCartContent(): void {
    const cartContent = document.getElementById('cart-content');
    const checkoutSection = document.getElementById('cart-checkout');
    
    if (cartContent) {
      cartContent.innerHTML = this.renderCartContent();
    }
    
    if (checkoutSection) {
      checkoutSection.innerHTML = this.renderCheckoutSection();
    }
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
}



