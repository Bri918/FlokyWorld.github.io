# Floky World 🐾

Página web frontend dedicada a Floky, creada con **HTML, CSS y JavaScript vanilla**. No necesita backend ni instalación de dependencias.

## Cómo ejecutar
1. Descarga y descomprime la carpeta `floky-world`.
2. Abre `index.html` en tu navegador, o abre la carpeta en VS Code.
3. Recomendado: ejecuta `index.html` con la extensión **Live Server** para ver los cambios al guardarlos.

## Estructura
```text
floky-world/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── img/
│   └── (coloca aquí las fotos de Floky)
└── README.md
```

## Cómo poner las fotos reales de Floky
Las imágenes que aparecen como bloques de color son espacios reservados; no son fotografías reales de Floky. Cuando tengas sus fotos, guárdalas en `img/`, por ejemplo:
- `floky-principal.jpg`
- `floky-perfil.jpg`
- `floky-paseo.jpg`
- `floky-durmiendo.jpg`
- `floky-carita.jpg`
- `floky-tierno.jpg`
- `floky-traductor.jpg`

### Reemplazar el espacio de foto principal
En `index.html`, busca el comentario `Reemplaza img/floky-principal.jpg` y reemplaza el bloque `.hero-photo` por:
```html
<div class="hero-photo">
  <img src="img/floky-principal.jpg" alt="Floky, mi perro salchicha">
</div>
```
Repite el mismo patrón para los espacios de foto que quieras personalizar. Para que las fotos se recorten bien, añade al final de `css/styles.css`:
```css
.hero-photo img,
.profile-photo img,
.thought-image img,
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: inherit;
}
```
En la galería, reemplaza el contenido del botón de cada `.gallery-item` por una etiqueta `img`, manteniendo las clases `gallery-item` y `photo-placeholder` si deseas conservar el marco.

## Interacciones incluidas
- Menú adaptable para móvil.
- Tarjetas de personalidad con textos dinámicos.
- Traductor perruno según la situación seleccionada.
- Filtros de galería y lightbox.
- Diario de aventuras desplegable.
- Test de tres preguntas con puntuación.

## Tecnologías
- HTML5 semántico.
- CSS3: Grid, Flexbox, variables, media queries, animaciones.
- JavaScript: eventos, arrays/objetos, manipulación del DOM y estado del quiz.
- Google Fonts requiere conexión a internet; si no hay conexión, se usarán fuentes de respaldo.
