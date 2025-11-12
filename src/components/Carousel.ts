import { Product } from '../models/Product.js';

/**
 * Componente para el carrusel de productos destacados
 * Renderiza un carrusel usando daisyUI con productos destacados
 */
export class Carousel {
  private products: Product[];
  private currentIndex: number = 0;

  constructor(products: Product[]) {
    this.products = products;
  }

  /**
   * Renderiza el carrusel
   * @returns string HTML del carrusel
   */
  render(): string {
    if (this.products.length === 0) {
      return `
        <div class="hero bg-gradient-to-r from-primary to-secondary text-white rounded-box mb-8">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">🔩</h1>
              <p class="py-6 text-xl">Ferretería El Tornillo</p>
              <p class="text-lg opacity-80">Todo lo que necesitas para tu hogar y trabajo</p>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="carousel w-full mb-8">
        ${this.products.map((product, index) => this.renderSlide(product, index)).join('')}
      </div>
      <div class="flex justify-center w-full py-2 gap-2">
        ${this.products.map((_, index) => this.renderIndicator(index)).join('')}
      </div>
    `;
  }

  /**
   * Renderiza una diapositiva del carrusel
   * @param product Producto a mostrar
   * @param index Índice de la diapositiva
   * @returns string HTML de la diapositiva
   */
  private renderSlide(product: Product, index: number): string {
    return `
      <div id="slide${index + 1}" class="carousel-item relative w-full">
        <div class="hero bg-gradient-to-r from-primary to-secondary text-white rounded-box w-full">
          <div class="hero-content flex-col lg:flex-row-reverse">
            <img 
              src="${product.imagenURL}" 
              alt="${product.nombre}"
              class="max-w-sm rounded-lg shadow-2xl"
              onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LXNpemU9IjE4Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPHN2Zz4='"
            />
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">${product.nombre}</h1>
              <p class="py-6 text-xl">${product.descripcion}</p>
              <div class="flex items-center gap-4 mb-4">
                <span class="text-3xl font-bold">$${this.formatPrice(product.precio)}</span>
                <span class="badge badge-lg badge-accent">Stock: ${product.stock}</span>
              </div>
              <button 
                class="btn btn-accent btn-lg"
                onclick="window.productCardHandler.addToCart('${product.id}')"
                ${product.stock === 0 ? 'disabled' : ''}
              >
                ${product.stock === 0 ? 'Sin Stock' : 'Ver Producto'}
              </button>
            </div>
          </div>
        </div>
        ${index > 0 ? `<a href="#slide${index}" class="btn btn-circle absolute left-5 top-1/2 transform -translate-y-1/2">❮</a>` : ''}
        ${index < this.products.length - 1 ? `<a href="#slide${index + 2}" class="btn btn-circle absolute right-5 top-1/2 transform -translate-y-1/2">❯</a>` : ''}
      </div>
    `;
  }

  /**
   * Renderiza los indicadores del carrusel
   * @param index Índice del indicador
   * @returns string HTML del indicador
   */
  private renderIndicator(index: number): string {
    return `
      <a href="#slide${index + 1}" class="btn btn-xs ${index === 0 ? 'btn-active' : ''}">
        ${index + 1}
      </a>
    `;
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



