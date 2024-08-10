# hoverSlider
JS slideshow that works by moving cursor/finger over it. It should work without any flickering during load or rendering (in firefox as well)

If container has width or height set, it will apply the first image aspect ratio to it. The rest of images will try to fit into or to cover (customizable) the result box. If the container sizes aren't set, the first image size will be used. Sizes of images with `@2x`/`@3x` in the filename will be calculated respectfully.


## Usage
1. Include `hoverSlider.css` and `hoverSlider.js` in your HTML document
```html
<head>
  <!-- ... -->
  <link rel="stylesheet" href="hoverSlider.css">
  <script src="hoverSlider.js"></script>
</head>
<body>
  <!-- ... -->
```
  
2. Call `hoverSlider();` to apply slideshow to every _.hover_slider_ container with imgs inside. Alternatively, you can pass a custom selector as a parameter: `hoverSlider('.custom_slideshow_container')`
```html
  <!-- ... -->
  <script>
    hoverSlider();
  </script>
</body>
```

3. Optionally, you can use container attributes to change the appearance of the hoverSlider
```html
<div class="hover_slider"
  data-ind="dots" <!-- Indicator style: "dots" or "none", dashes by default  -->
  data-fit="cover" <!-- Object-fit for images: "cover", contain by default -->
  data-border="none" <!-- Set to "none" to remove the image outline -->
  data-touch-relative="true" <!-- Wherever the touch starts is the current slide -->
  data-touch-loop="true" <!-- Loop the slideshow for touchscreens -->
>
  <!-- img tags go here -->
</div>
```

## Note to self
When designing, only use image slideshows if the initially hidden images are not essential to the story you are telling.
