import { Product } from '../models/Product.js';

/**
 * Componente para mostrar una tarjeta de producto
 * Renderiza la información del producto con opciones para agregar al carrito
 */
export class ProductCard {
  private product: Product;
  private onAddToCart: (product: Product) => void;

  constructor(product: Product, onAddToCart: (product: Product) => void) {
    this.product = product;
    this.onAddToCart = onAddToCart;
  }

  /**
   * Renderiza la tarjeta del producto
   * @returns string HTML de la tarjeta
   */
  render(): string {
    return `
      <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <figure class="px-4 pt-4">
          <img 
            src="${this.product.imagenURL}" 
            alt="${this.product.nombre}"
            class="rounded-xl h-48 w-full object-cover"
            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwTDEwMCAxMDBMMTAwIDEwMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE0Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPHN2Zz4='"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-lg font-bold text-gray-800 line-clamp-2">
            ${this.product.nombre}
          </h2>
          <p class="text-gray-600 text-sm line-clamp-2">
            ${this.product.descripcion}
          </p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-2xl font-bold text-primary">
              $${this.formatPrice(this.product.precio)}
            </span>
            <span class="badge badge-outline ${this.getStockBadgeClass()}">
              Stock: ${this.product.stock}
            </span>
          </div>
          <div class="card-actions justify-end mt-4">
            <button 
              class="btn btn-primary btn-sm w-full"
              onclick="window.productCardHandler.addToCart('${this.product.id}')"
              ${this.product.stock === 0 ? 'disabled' : ''}
            >
              ${this.product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Obtiene la clase CSS para el badge de stock
   * @returns string Clase CSS
   */
  private getStockBadgeClass(): string {
    if (this.product.stock === 0) {
      return 'badge-error';
    } else if (this.product.stock < 10) {
      return 'badge-warning';
    } else {
      return 'badge-success';
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



