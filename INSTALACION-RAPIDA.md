# 🚀 Instalación Rápida - Ferretería El Tornillo

## ⚡ Configuración en 5 Pasos

### 1️⃣ Instalar Dependencias
```bash
npm install
```

### 2️⃣ Configurar Google Sheets
1. Crea una hoja con estas columnas: `id`, `nombre`, `descripcion`, `precio`, `stock`, `imagenURL`, `esDestacado`
2. Publícala como CSV
3. Copia la URL

### 3️⃣ Configurar el Código
Edita `src/main.ts` líneas 25-27:
```typescript
private readonly SHEETS_URL = 'TU_URL_DE_GOOGLE_SHEETS';
private readonly WHATSAPP_NUMBER = '+56912345678';
```

### 4️⃣ Compilar
```bash
npm run build
```

### 5️⃣ Abrir
Abre `index.html` en tu navegador o sube la carpeta `dist/` a tu servidor.

## 🎯 ¡Listo!

Tu catálogo web está funcionando. Los clientes pueden:
- ✅ Ver productos destacados en carrusel
- ✅ Navegar por la galería de productos
- ✅ Agregar productos al carrito
- ✅ Elegir método de entrega
- ✅ Realizar pedidos por WhatsApp

## 📚 Documentación Completa
- `README.md` - Documentación completa
- `CONFIGURACION.md` - Guía paso a paso
- `ejemplo-productos.csv` - Ejemplo de datos

## 🆘 ¿Problemas?
1. Verifica la URL de Google Sheets
2. Revisa la consola del navegador (F12)
3. Consulta `CONFIGURACION.md` para más detalles

---
**¡Disfruta tu nuevo catálogo web! 🔩✨**



