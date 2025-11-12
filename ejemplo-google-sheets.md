# 📊 Ejemplo de Google Sheets para Ferretería El Tornillo

## Estructura de la Hoja de Cálculo

Crea una nueva hoja de Google Sheets con las siguientes columnas en la primera fila:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| id | nombre | descripcion | precio | stock | imagenURL | esDestacado |

## Datos de Ejemplo

Copia estos datos en tu hoja de cálculo:

```
id,nombre,descripcion,precio,stock,imagenURL,esDestacado
SKU-001,Martillo Carpintero 20oz,Mango de fibra de vidrio, cabeza de acero forjado,15990,50,https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400,TRUE
SKU-002,Sierra Circular 7 1/4",Sierra circular profesional con motor de 1800W,89990,25,https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400,TRUE
SKU-003,Caja 100 Tornillos drywall,Tornillos para drywall cabeza phillips 3.5x25mm,4500,200,https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400,FALSE
SKU-004,Taladro Percutor 13mm,Taladro percutor con batería de litio 18V,129990,15,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,TRUE
SKU-005,Destornillador Set 6 piezas,Set de destornilladores Phillips y planos,8990,80,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,FALSE
SKU-006,Clavos para Construcción 2kg,Clavos de acero galvanizado para construcción,12990,150,https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400,FALSE
SKU-007,Pintura Latex Interior 4L,Pintura látex blanco para interiores,45990,30,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,FALSE
SKU-008,Cinta Métrica 5m,Cinta métrica de acero con carcasa amarilla,5990,60,https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400,FALSE
SKU-009,Alambre Galvanizado 1mm,Alambre de acero galvanizado rollo 100m,8990,40,https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400,FALSE
SKU-010,Cemento Portland 25kg,Cemento Portland tipo I para construcción,8990,100,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,FALSE
SKU-011,Broca Conjunto 13 piezas,Set de brocas para metal, madera y hormigón,15990,35,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,FALSE
SKU-012,Pegamento PVC 250ml,Pegamento especial para tuberías PVC,4990,70,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,FALSE
SKU-013,Lijadora Orbital 125mm,Lijadora orbital con disco de 125mm,45990,20,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,FALSE
SKU-014,Martillo Demoledor 15kg,Martillo demoledor eléctrico 15kg,199990,5,https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400,TRUE
SKU-015,Destornillador Eléctrico 18V,Destornillador eléctrico con batería de litio,79990,12,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400,FALSE
```

## Instrucciones para Publicar

1. **Selecciona todas las celdas** con datos
2. Ve a **Archivo > Compartir > Publicar en la web**
3. Selecciona **"Valores separados por comas (.csv)"**
4. Haz clic en **"Publicar"**
5. **Copia la URL** generada

## Formato de la URL

La URL debería verse así:
```
https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/export?format=csv
```

## Notas Importantes

- **id**: Debe ser único para cada producto
- **precio**: Solo números (sin símbolos de moneda)
- **stock**: Solo números (0 = sin stock)
- **esDestacado**: TRUE para productos del carrusel, FALSE para otros
- **imagenURL**: Debe ser una URL válida de imagen

## Productos Destacados

Los productos con `esDestacado = TRUE` aparecerán en el carrusel principal de la página.

## Actualización de Productos

Para actualizar productos:
1. Modifica la hoja de Google Sheets
2. Los cambios se reflejarán automáticamente en el sitio web
3. El cache se actualiza cada 5 minutos

---

**¡Tu catálogo está listo para funcionar! 🎉**



