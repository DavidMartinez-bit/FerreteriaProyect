# 🔧 Guía de Configuración - Ferretería El Tornillo

Esta guía te ayudará a configurar tu catálogo web paso a paso.

## 📋 Lista de Verificación

- [ ] Crear Google Sheet con productos
- [ ] Publicar Google Sheet como CSV
- [ ] Configurar URLs en el código
- [ ] Instalar dependencias
- [ ] Compilar el proyecto
- [ ] Probar funcionalidades

## 📊 Configuración de Google Sheets

### Paso 1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nombra la hoja (ej: "Productos Ferretería")

### Paso 2: Configurar las Columnas

En la primera fila (A1:H1), agrega estos encabezados:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| id | nombre | descripcion | precio | stock | imagenURL | esDestacado |

### Paso 3: Agregar Productos de Ejemplo

```
id | nombre | descripcion | precio | stock | imagenURL | esDestacado
SKU-001 | Martillo Carpintero 20oz | Mango de fibra de vidrio, cabeza de acero forjado | 15990 | 50 | https://ejemplo.com/martillo.jpg | TRUE
SKU-002 | Sierra Circular 7 1/4" | Sierra circular profesional con motor de 1800W | 89990 | 25 | https://ejemplo.com/sierra.jpg | TRUE
SKU-003 | Caja 100 Tornillos drywall | Tornillos para drywall cabeza phillips 3.5x25mm | 4500 | 200 | https://ejemplo.com/tornillos.jpg | FALSE
```

### Paso 4: Publicar la Hoja

1. Ve a **Archivo > Compartir > Publicar en la web**
2. Selecciona la pestaña "Productos"
3. En "Formato", selecciona **"Valores separados por comas (.csv)"**
4. Haz clic en **"Publicar"**
5. **Copia la URL generada** (se verá así: `https://docs.google.com/spreadsheets/d/1ABC123.../export?format=csv`)

## ⚙️ Configuración del Código

### Paso 1: Actualizar URLs

Edita el archivo `src/main.ts` y cambia estas líneas:

```typescript
// Línea 25-26: Cambia TU_SHEET_ID por el ID de tu hoja
private readonly SHEETS_URL = 'https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv';

// Línea 27: Cambia por tu número de WhatsApp (con código de país)
private readonly WHATSAPP_NUMBER = '+56912345678';
```

### Paso 2: Personalizar Información de la Tienda

Edita `src/config/app-config.ts`:

```typescript
store: {
  name: 'Tu Ferretería',           // Nombre de tu ferretería
  address: 'Tu Dirección',         // Dirección real
  hours: 'Lunes a Sábado 9-18',   // Horarios de atención
  phone: '+56912345678'           // Tu número de teléfono
}
```

### Paso 3: Personalizar Colores (Opcional)

En `tailwind.config.js`, puedes cambiar los colores:

```javascript
themes: [
  {
    ferreteria: {
      "primary": "#dc2626",    // Color principal (rojo)
      "secondary": "#1f2937",  // Color secundario (gris oscuro)
      "accent": "#f59e0b",     // Color de acento (amarillo)
    }
  }
]
```

## 🚀 Instalación y Compilación

### Paso 1: Instalar Dependencias

```bash
npm install
```

### Paso 2: Compilar el Proyecto

```bash
npm run build
```

### Paso 3: Verificar Archivos Generados

Verifica que se hayan creado estos archivos en la carpeta `dist/`:
- `main.js` (JavaScript compilado)
- `styles.css` (CSS compilado)

## 🌐 Despliegue

### Opción 1: Servidor Local

```bash
# Usar Python (si está instalado)
python -m http.server 8000

# O usar Node.js
npx serve .
```

### Opción 2: Servicios de Hosting Gratuitos

#### Netlify
1. Arrastra la carpeta del proyecto a [Netlify](https://netlify.com)
2. Tu sitio estará disponible en una URL como `https://tu-proyecto.netlify.app`

#### Vercel
1. Conecta tu repositorio de GitHub a [Vercel](https://vercel.com)
2. El sitio se desplegará automáticamente

#### GitHub Pages
1. Sube tu código a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama main
4. Tu sitio estará en `https://tu-usuario.github.io/tu-repositorio`

## ✅ Verificación Final

### Checklist de Funcionalidades

- [ ] **Carga de productos**: Los productos aparecen correctamente
- [ ] **Carrusel**: Los productos destacados se muestran en el carrusel
- [ ] **Agregar al carrito**: Se pueden agregar productos al carrito
- [ ] **Carrito**: Se puede ver, modificar y eliminar productos del carrito
- [ ] **Método de entrega**: Se puede seleccionar entre retiro y despacho
- [ ] **Dirección**: El campo de dirección aparece solo para despacho
- [ ] **WhatsApp**: El botón de pedido abre WhatsApp con el mensaje correcto

### Pruebas Recomendadas

1. **Probar en móvil**: Abre el sitio en tu teléfono
2. **Probar carrito**: Agrega varios productos y modifica cantidades
3. **Probar pedido**: Completa un pedido de prueba por WhatsApp
4. **Probar imágenes**: Verifica que las imágenes se carguen correctamente

## 🐛 Solución de Problemas Comunes

### Error: "No se pudieron cargar los productos"

**Causas posibles:**
- URL de Google Sheets incorrecta
- Hoja no publicada como CSV
- Estructura de columnas incorrecta

**Solución:**
1. Verifica la URL en el navegador (debe mostrar datos CSV)
2. Revisa que las columnas tengan los nombres exactos
3. Asegúrate de que la hoja esté publicada

### Error: "WhatsApp no abre"

**Causas posibles:**
- Número de WhatsApp incorrecto
- Formato del número incorrecto

**Solución:**
- Usa formato internacional: `+56912345678` (Chile)
- Incluye el código de país sin espacios

### Problemas de compilación

**Causas posibles:**
- Node.js versión incorrecta
- Dependencias no instaladas

**Solución:**
```bash
# Verificar versión de Node.js
node --version  # Debe ser 18+

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 Soporte

Si tienes problemas:

1. **Revisa la consola del navegador** (F12 > Console)
2. **Verifica la configuración** siguiendo esta guía
3. **Prueba con datos de ejemplo** primero
4. **Consulta el README.md** para más detalles

---

**¡Tu catálogo web está listo! 🎉**



