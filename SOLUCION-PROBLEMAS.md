# 🔧 Solución de Problemas - Productos No Aparecen

## ✅ Solución Rápida

### Opción 1: Usar Servidor Local (Recomendado)

1. **Abre una terminal en la carpeta del proyecto**

2. **Ejecuta el servidor:**
   ```bash
   npm run serve
   ```

3. **Abre tu navegador y visita:**
   ```
   http://localhost:8000
   ```

### Opción 2: Usar Python (Si tienes Python instalado)

1. **Abre una terminal en la carpeta del proyecto**

2. **Ejecuta:**
   ```bash
   python -m http.server 8000
   ```

3. **Abre tu navegador y visita:**
   ```
   http://localhost:8000
   ```

### Opción 3: Usar Live Server (VS Code)

1. **Instala la extensión "Live Server" en VS Code**

2. **Haz clic derecho en `index.html`**

3. **Selecciona "Open with Live Server"**

## ❌ ¿Por qué no funciona al abrir directamente?

Cuando abres `index.html` directamente desde el explorador de archivos (doble clic), el navegador usa el protocolo `file://` que **NO permite módulos ES6** por razones de seguridad (CORS).

Los módulos ES6 (`import/export`) solo funcionan con un servidor HTTP (`http://` o `https://`).

## 🔍 Verificar que Todo Funcione

1. **Abre la consola del navegador** (F12 → Console)

2. **Busca errores en rojo**

3. **Si ves errores de módulos**, asegúrate de usar un servidor local

4. **Si ves "Usando productos de ejemplo"**, significa que los productos mockup se están cargando correctamente

## 📋 Checklist

- [ ] El servidor local está corriendo
- [ ] Abriste `http://localhost:8000` (no `file://`)
- [ ] No hay errores en la consola (F12)
- [ ] Los archivos `dist/main.js` y `dist/styles.css` existen
- [ ] Ejecutaste `npm run build` después de hacer cambios

## 🐛 Errores Comunes

### Error: "Failed to load module"
**Solución:** Usa un servidor local (ver Opción 1 arriba)

### Error: "Cannot find module"
**Solución:** Ejecuta `npm run build` para compilar los archivos

### No aparecen productos
**Solución:** 
1. Abre la consola (F12)
2. Verifica si hay errores
3. Los productos de ejemplo deberían aparecer automáticamente si Google Sheets falla

## 💡 Prueba Rápida

Abre `test.html` en tu navegador para verificar que los estilos funcionan correctamente.

---

**¿Sigue sin funcionar?** Abre la consola del navegador (F12) y comparte los errores que aparecen.


