# 🔩 Ferretería El Tornillo - Catálogo Web

Un catálogo web moderno y responsivo para ferreterías, construido con TypeScript, Tailwind CSS y daisyUI. Permite a los clientes navegar productos, agregar items al carrito y realizar pedidos por WhatsApp.

## ✨ Características

- **📱 Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **🛒 Carrito de Compras**: Gestión completa de productos y cantidades
- **📊 Integración con Google Sheets**: Los productos se cargan automáticamente desde una hoja de cálculo
- **💬 Pedidos por WhatsApp**: Generación automática de mensajes de pedido
- **🎨 UI Profesional**: Diseño moderno con daisyUI y Tailwind CSS
- **⚡ Arquitectura en Capas**: Código organizado y mantenible
- **🔄 Cache Inteligente**: Optimización de rendimiento con cache de productos

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Google Sheets

#### Crear la Hoja de Cálculo

1. Crea una nueva hoja de Google Sheets
2. Agrega las siguientes columnas en la primera fila:

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| id | Identificador único del producto | SKU-001 |
| nombre | Nombre del producto | Martillo Carpintero 20oz |
| descripcion | Descripción del producto | Mango de fibra de vidrio, cabeza de acero forjado |
| precio | Precio del producto (número) | 15990 |
| stock | Cantidad disponible (número) | 50 |
| imagenURL | URL de la imagen del producto | https://ejemplo.com/imagen.jpg |
| esDestacado | Si aparece en el carrusel (TRUE/FALSE) | TRUE |

#### Publicar la Hoja

1. Ve a **Archivo > Compartir > Publicar en la web**
2. Selecciona **Formato: Valores separados por comas (.csv)**
3. Copia la URL generada

### 3. Configurar la Aplicación

Edita el archivo `src/main.ts` y actualiza estas variables:

```typescript
// URL de tu Google Sheet
private readonly SHEETS_URL = 'https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv';

// Número de WhatsApp (con código de país)
private readonly WHATSAPP_NUMBER = '+56912345678';
```

### 4. Compilar y Construir

```bash
# Compilar TypeScript y construir CSS
npm run build

# Para desarrollo (modo watch)
npm run dev
```

### 5. Desplegar

Los archivos compilados se generan en la carpeta `dist/`. Puedes:

- Subir la carpeta completa a cualquier servidor web
- Usar servicios como Netlify, Vercel o GitHub Pages
- Servir desde un servidor local

## 📁 Estructura del Proyecto

```
ferreteria-el-tornillo/
├── src/
│   ├── components/          # Componentes UI
│   │   ├── Carousel.ts      # Carrusel de productos destacados
│   │   ├── CartDrawer.ts    # Drawer del carrito
│   │   └── ProductCard.ts   # Tarjeta de producto
│   ├── data/                # Capa de acceso a datos
│   │   └── GoogleSheetsService.ts
│   ├── models/              # Modelos de datos
│   │   └── Product.ts
│   ├── services/            # Lógica de negocio
│   │   ├── CartService.ts   # Gestión del carrito
│   │   └── WhatsAppService.ts # Integración WhatsApp
│   ├── config/              # Configuración
│   │   └── app-config.ts
│   ├── styles/              # Estilos CSS
│   │   └── styles.css
│   └── main.ts              # Aplicación principal
├── dist/                    # Archivos compilados
├── index.html              # Página principal
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas:

### 1. Capa de Datos (`data/`)
- **GoogleSheetsService**: Maneja la comunicación con Google Sheets
- Parseo de CSV y cache de productos

### 2. Capa de Modelos (`models/`)
- **Product**: Define la estructura de datos de productos
- **CartItem**: Modelo para items del carrito
- **Order**: Modelo para pedidos completos

### 3. Capa de Servicios (`services/`)
- **CartService**: Lógica de negocio del carrito
- **WhatsAppService**: Generación y envío de mensajes

### 4. Capa de Presentación (`components/`)
- **ProductCard**: Renderizado de tarjetas de producto
- **Carousel**: Carrusel de productos destacados
- **CartDrawer**: Interfaz del carrito de compras

### 5. Capa de Aplicación (`main.ts`)
- Coordinación de todos los componentes
- Manejo de eventos y estado global

## 🎨 Personalización

### Colores y Tema

Edita `tailwind.config.js` para personalizar los colores:

```javascript
themes: [
  {
    ferreteria: {
      "primary": "#dc2626",    // Color principal
      "secondary": "#1f2937",  // Color secundario
      "accent": "#f59e0b",     // Color de acento
      // ... más colores
    }
  }
]
```

### Información de la Tienda

Actualiza la información en `src/config/app-config.ts`:

```typescript
store: {
  name: 'Tu Ferretería',
  address: 'Tu Dirección',
  hours: 'Tus Horarios',
  phone: '+56912345678'
}
```

## 📱 Funcionalidades

### Carrusel de Productos Destacados
- Muestra automáticamente productos con `esDestacado = TRUE`
- Navegación con indicadores
- Diseño responsivo

### Galería de Productos
- Grid responsivo de productos
- Filtrado automático por stock
- Tarjetas con información completa

### Carrito de Compras
- Agregar/remover productos
- Ajustar cantidades
- Cálculo automático de totales

### Proceso de Pedido
- Selección de método de entrega
- Validación de campos requeridos
- Generación automática de mensaje WhatsApp

## 🔧 Scripts Disponibles

```bash
# Construcción completa
npm run build

# Desarrollo TypeScript (modo watch)
npm run dev

# Construcción CSS (modo watch)
npm run build-css
```

## 🐛 Solución de Problemas

### Error: "No se pudieron cargar los productos"
- Verifica que la URL de Google Sheets sea correcta
- Asegúrate de que la hoja esté publicada como CSV
- Revisa la estructura de columnas

### Error: "WhatsApp no abre"
- Verifica que el número tenga el código de país (+56 para Chile)
- Asegúrate de que el formato sea correcto (+56912345678)

### Problemas de compilación
- Verifica que Node.js sea versión 18+
- Ejecuta `npm install` para reinstalar dependencias
- Revisa los logs de error en la consola

## 📄 Licencia

MIT License - Puedes usar este proyecto libremente para tu ferretería.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

- Abre un issue en GitHub
- Revisa la documentación
- Verifica la configuración de Google Sheets

---

**¡Disfruta tu nuevo catálogo web! 🔩✨**



