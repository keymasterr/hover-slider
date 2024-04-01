# hoverSlider
JS slideshow that works by moving cursor/finger over it. Should work without load/render blinking (even in firefox — it would be less complex otherwise >_<)


## Usage
1. Include `hoverSlider.css` and `hoverSlider.js` in your HTML document:

```html
<head>
  <!-- ... -->
  <link rel="stylesheet" href="hoverSlider.css">
  <script src="hoverSlider.js"></script>
</head>
<body>
  <!-- ... -->
```
  
2. Call `hoverSlider();` </body> to apply slideshow to every .hover_slider container with imgs inside. Or use custom selector as a parameter: `hoverSlider('.custom_slideshow_container')`.

3. (Optionally) Use container attributes to change hoverSlider appearance:
```
data-ind=["dots"|"none"|else: dashes]
data-fit=["cover"|else: contain]
data-border=["none"|else: outline]
```
