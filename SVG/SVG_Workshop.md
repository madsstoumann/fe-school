# SVG workshop

## SVG Syntax
- XML
- Case sensitive
- Need a namespace, setAttributeNS
- Can contain script, don't eval uploads*
- X & Y
- viewBox

*) Test
```html
<svg xmlns="http://www.w3.org/2000/svg"><g onload="javascript:alert(1)"></g></svg>
```

## Elements of SVG 
(hardcoding, paper/ruler)
- Circle
- Ellipse
- Line
- Path
- Polygon
- Polyline
- Rect

### Text
- text
- tspan

## Types of SVG
- External .svg-file
- `<symbol>` and `<use>`
- svg4everybody polyfill
- Inline svg
- Using `<img>`
- Using `<object>`
- Background-image, `base64`or `utf8`

## CSS & SVG
- SVG-attributes are style-properties
- CSS Custom props, theming
- `fill` and `currentColor`

## Animating SVG
- SMIL works ... for now
- stroke-dashoffset
- Calculate path-length with JS
- Greensock

## Optimizing SVG
- SVGOMG
- Manually cleaning up Sketch and Adobe Illustrator exports

## Caching inline SVG

## SVG Ressources
- https://svgontheweb.com
- https://css-tricks.com/a-complete-guide-to-svg-fallbacks/
- https://html5sec.org/#svg
- https://www.filamentgroup.com/lab/inlining-cache.html
- https://codepen.io/tigt/post/optimizing-svgs-in-data-uris

### Encoding

< %3C
> %3E
# %23
( %28
) %29