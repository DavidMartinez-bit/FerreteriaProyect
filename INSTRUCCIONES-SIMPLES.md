# 🚀 Instrucciones Simples - Ferretería El Tornillo

## ✅ El sitio ya está funcionando con datos de ejemplo

**¡Buenas noticias!** El sitio web ya está funcionando con productos de ejemplo. Puedes verlo abriendo el archivo `index.html` en tu navegador.

## 🔧 Para personalizar con tus datos:

### 1. Configurar Google Sheets (Opcional)
Si quieres usar tus propios productos:

1. Crea una hoja de Google Sheets con estas columnas:
   - `id` (ej: SKU-001)
   - `nombre` (ej: Martillo Carpintero)
   - `descripcion` (ej: Descripción del producto)
   - `precio` (ej: 15990)
   - `stock` (ej: 50)
   - `imagenURL` (ej: https://ejemplo.com/imagen.jpg)
   - `esDestacado` (ej: TRUE o FALSE)

2. Publica la hoja como CSV

3. Edita el archivo `dist/main.js` línea 7:
   ```javascript
   SHEETS_URL: 'TU_URL_DE_GOOGLE_SHEETS',
   ```

### 2. Configurar WhatsApp
Edita el archivo `dist/main.js` línea 8:
```javascript
WHATSAPP_NUMBER: '+56912345678', // Tu número de WhatsApp
```

### 3. Personalizar información de la tienda
Edita el archivo `dist/main.js` líneas 9-12:
```javascript
STORE_NAME: 'Tu Ferretería',
STORE_ADDRESS: 'Tu Dirección',
STORE_HOURS: 'Tus Horarios',
STORE_PHONE: '+56912345678',
```

## 🎯 Funcionalidades que ya funcionan:

- ✅ **Carrusel de productos destacados**
- ✅ **Galería de productos**
- ✅ **Carrito de compras**
- ✅ **Agregar/remover productos**
- ✅ **Ajustar cantidades**
- ✅ **Selección de método de entrega**
- ✅ **Pedidos por WhatsApp**
- ✅ **Diseño responsivo**

## 📱 Para probar:

1. Abre `index.html` en tu navegador
2. Agrega productos al carrito
3. Abre el carrito (ícono en el navbar)
4. Selecciona método de entrega
5. Completa la dirección si es necesario
6. Haz clic en "Realizar Pedido por WhatsApp"

## 🌐 Para publicar en internet:

### Opción 1: Netlify (Gratis)
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. Tu sitio estará disponible en una URL como `https://tu-proyecto.netlify.app`

### Opción 2: GitHub Pages (Gratis)
1. Sube tu código a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama main
4. Tu sitio estará en `https://tu-usuario.github.io/tu-repositorio`

### Opción 3: Servidor local
Si tienes Python instalado:
```bash
python -m http.server 8000
```
Luego abre `http://localhost:8000`

## 🆘 ¿Problemas?

1. **El sitio no se ve bien**: Asegúrate de que los archivos `dist/styles.css` y `dist/main.js` existan
2. **WhatsApp no abre**: Verifica que el número tenga el código de país (+56 para Chile)
3. **No aparecen productos**: El sitio usa productos de ejemplo, revisa la consola del navegador (F12)

## 📞 Soporte

- Revisa la consola del navegador (F12 > Console) para errores
- Verifica que todos los archivos estén en su lugar
- Consulta `README.md` para documentación completa

---

**¡Tu catálogo web está listo para usar! 🎉**



