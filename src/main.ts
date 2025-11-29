import { GoogleSheetsService } from './data/GoogleSheetsService.js';
import { CartService } from './services/CartService.js';
import { WhatsAppService } from './services/WhatsAppService.js';
import { ProductCard } from './components/ProductCard.js';
import { Carousel } from './components/Carousel.js';
import { CartDrawer } from './components/CartDrawer.js';
import { Product, DeliveryMethod } from './models/Product.js';

/**
 * Aplicación principal de Ferretería El Tornillo
 * Coordina todos los componentes y servicios
 */
class FerreteriaApp {
  private sheetsService: GoogleSheetsService;
  private cartService: CartService;
  private whatsappService: WhatsAppService;
  private productCard: ProductCard | null = null;
  private carousel: Carousel | null = null;
  private cartDrawer: CartDrawer | null = null;
  private currentCategory: string = 'all';
  private currentSearch: string = '';
  private allProducts: Product[] = [];

  // URLs de configuración - CAMBIAR ESTOS VALORES
  private readonly SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTXFUlE5gDLelVwB1v_NM5vhg6LYtqNc2cwdmfs4HbB3hQ9dLMQZCitNw1Nw_hxccWhC4tyuJR5WaD/pub?output=csv';
  private readonly WHATSAPP_NUMBER = '+56997154698'; // Cambiar por el número real

  constructor() {
    this.sheetsService = new GoogleSheetsService(this.SHEETS_URL);
    this.cartService = new CartService();
    this.whatsappService = new WhatsAppService(this.WHATSAPP_NUMBER);
    this.cartDrawer = new CartDrawer(this.cartService);
  }

  /**
   * Inicializa la aplicación
   */
  async init(): Promise<void> {
    try {
      this.showLoading();
      await this.loadProducts();
      this.setupEventListeners();
      this.setupTheme();
      this.hideLoading();
    } catch (error) {
      console.error('Error inicializando la aplicación:', error);
      // Intentar cargar productos de ejemplo como fallback
      try {
        await this.loadProducts();
        this.setupEventListeners();
        this.hideLoading();
        this.showToast('Usando productos de ejemplo para pruebas', 'success');
      } catch (fallbackError) {
        this.showError('Error al cargar los productos. Por favor, verifica la configuración.');
        console.error('Error en fallback:', fallbackError);
      }
    }
  }

  /**
   * Carga los productos desde Google Sheets
   */
  private async loadProducts(): Promise<void> {
    const products = await this.sheetsService.getProducts();
    this.allProducts = products;
    const featuredProducts = products.filter(p => p.esDestacado && p.stock > 0);
    const availableProducts = products.filter(p => p.stock > 0);

    // Renderizar filtros
    this.renderCategoryFilters(availableProducts);

    // Renderizar carrusel de productos destacados
    this.carousel = new Carousel(featuredProducts);
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
      carouselContainer.innerHTML = this.carousel.render();
    }

    // Renderizar drawer del carrito
    const cartDrawerContainer = document.getElementById('cart-drawer-container');
    if (cartDrawerContainer && this.cartDrawer) {
      cartDrawerContainer.innerHTML = this.cartDrawer.render();
    }

    // Renderizar galería de productos
    this.renderProductGallery(availableProducts);
  }

  /**
   * Renderiza la galería de productos
   * @param products Productos a renderizar
   */
  private renderProductGallery(products: Product[]): void {
    const galleryContainer = document.getElementById('product-gallery');
    if (!galleryContainer) return;

    if (products.length === 0) {
      galleryContainer.innerHTML = `
        <div class="col-span-full text-center py-12">
          <div class="text-6xl mb-4">🔧</div>
          <h3 class="text-xl font-bold text-gray-600">No hay productos disponibles</h3>
          <p class="text-gray-500 mt-2">Vuelve más tarde para ver nuestros productos</p>
        </div>
      `;
      return;
    }

    galleryContainer.innerHTML = products.map(product => {
      this.productCard = new ProductCard(product, (p) => this.addToCart(p));
      return this.productCard.render();
    }).join('');
  }

  /**
   * Agrega un producto al carrito
   * @param product Producto a agregar
   */
  private addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.updateCartBadge();
    this.showToast(`${product.nombre} agregado al carrito`);
  }

  /**
   * Actualiza el badge del carrito en el navbar
   */
  private updateCartBadge(): void {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const totalItems = this.cartService.getTotalItems();
      badge.textContent = totalItems.toString();
      badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
  }

  /**
   * Configura los event listeners
   */
  private setupEventListeners(): void {
    // Escuchar cambios en el carrito
    document.addEventListener('cartChanged', () => {
      this.updateCartBadge();
      if (this.cartDrawer) {
        this.cartDrawer.updateCartContent();
      }
    });

    // Configurar handlers globales
    window.productCardHandler = {
      addToCart: (productId: string) => {
        this.sheetsService.getProductById(productId).then(product => {
          if (product) {
            this.addToCart(product);
          }
        });
      }
    };

    window.cartDrawerHandler = {
      updateQuantity: (productId: string, quantity: number) => {
        this.cartService.updateQuantity(productId, quantity);
      },
      removeItem: (productId: string) => {
        this.cartService.removeFromCart(productId);
      },
      setDeliveryMethod: (method: DeliveryMethod) => {
        this.cartService.setDeliveryMethod(method);
        this.updateDeliverySection();
      },
      setAddress: (address: string) => {
        const deliveryInfo = this.cartService.getDeliveryInfo();
        this.cartService.setDeliveryMethod(deliveryInfo.method, address);
      },
      proceedToCheckout: () => {
        try {
          const order = this.cartService.generateOrder();
          this.whatsappService.sendOrder(order);
          this.cartService.clearCart();
          this.updateCartBadge();
          this.showToast('¡Pedido enviado por WhatsApp!');
        } catch (error) {
          this.showToast('Por favor, completa todos los campos requeridos', 'error');
        }
      }
    };

    window.filterHandler = {
      setCategory: (category: string) => {
        this.currentCategory = category;
        this.filterProducts();
      }
    };

    // Search listener
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.currentSearch = target.value.toLowerCase().trim();
        this.filterProducts();
      });
    }
  }

  /**
   * Actualiza la sección de entrega en el carrito
   */
  private updateDeliverySection(): void {
    const addressSection = document.getElementById('address-section');
    const deliveryInfo = this.cartService.getDeliveryInfo();

    if (addressSection) {
      addressSection.classList.toggle('hidden', deliveryInfo.method === DeliveryMethod.STORE_PICKUP);
    }
  }

  /**
   * Muestra el estado de carga
   */
  private showLoading(): void {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'block';
    }
  }

  /**
   * Oculta el estado de carga
   */
  private hideLoading(): void {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }

  /**
   * Muestra un mensaje de error
   * @param message Mensaje de error
   */
  private showError(message: string): void {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  /**
   * Muestra un toast de notificación
   * @param message Mensaje a mostrar
   * @param type Tipo de toast
   */
  private showToast(message: string, type: 'success' | 'error' = 'success'): void {
    const toast = document.createElement('div');
    toast.className = `toast toast-top toast-end`;
    toast.innerHTML = `
      <div class="alert ${type === 'success' ? 'alert-success' : 'alert-error'}">
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }

  /**
   * Configura el tema (claro/oscuro)
   */
  private setupTheme(): void {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const html = document.documentElement;

    // Cargar tema guardado o preferido
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const setTheme = (isDark: boolean) => {
      const theme = isDark ? 'dark' : 'ferreteria';
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      if (isDark) {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
      } else {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
      }
    };

    // Inicializar
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme(true);
    } else {
      setTheme(false);
    }

    // Event listener
    themeToggle?.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      setTheme(currentTheme !== 'dark');
    });
  }

  /**
   * Renderiza los filtros de categoría
   */
  private renderCategoryFilters(products: Product[]): void {
    const filterContainer = document.getElementById('category-filters');
    if (!filterContainer) return;

    // Extraer categorías únicas
    const categories = ['Todos', ...new Set(products.map(p => p.categoria).filter(Boolean))];

    filterContainer.innerHTML = categories.map(category => {
      const isActive = (category === 'Todos' && this.currentCategory === 'all') || category === this.currentCategory;
      const activeClass = isActive ? 'btn-primary' : 'btn-ghost';
      return `
        <button 
          class="btn ${activeClass} btn-sm capitalize"
          onclick="window.filterHandler.setCategory('${category}')"
        >
          ${category}
        </button>
      `;
    }).join('');
  }

  /**
   * Filtra y renderiza los productos
   */
  private filterProducts(): void {
    // Filtrar productos
    let filtered = this.allProducts.filter(p => p.stock > 0);

    // Filtro por categoría
    if (this.currentCategory !== 'Todos' && this.currentCategory !== 'all') {
      filtered = filtered.filter(p => p.categoria === this.currentCategory);
    }

    // Filtro por búsqueda
    if (this.currentSearch) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(this.currentSearch) ||
        p.descripcion.toLowerCase().includes(this.currentSearch)
      );
    }

    // Actualizar botones visualmente
    this.renderCategoryFilters(this.allProducts.filter(p => p.stock > 0));

    this.renderProductGallery(filtered);
  }
}

// Interfaces globales para los handlers
declare global {
  interface Window {
    productCardHandler: {
      addToCart: (productId: string) => void;
    };
    cartDrawerHandler: {
      updateQuantity: (productId: string, quantity: number) => void;
      removeItem: (productId: string) => void;
      setDeliveryMethod: (method: DeliveryMethod) => void;
      setAddress: (address: string) => void;
      proceedToCheckout: () => void;
    };
    filterHandler: {
      setCategory: (category: string) => void;
    };
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const app = new FerreteriaApp();
  app.init();
});
