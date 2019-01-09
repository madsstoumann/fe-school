# CSSOM workshop

## Inline styles

## Classes

## CSS Custom Props

### Fetch all colors from screeb
### Update x and y, set to CSS props, follow cursor

//FYI, there is no more color-mod() function, and color() is for specific colors from color profiles. There is no color modifying options like it was a couple of years before. So, this is no go.

```js
let colorSet = new Set();
const props = ["background-color", "color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color"];

document.querySelectorAll('*').forEach(elm => {
	props.forEach(prop => {
 		colorSet.add(window.getComputedStyle(elm, null).getPropertyValue(prop));
  	}); 
});

for (let color of colorSet) {
	const brightness = getBrightness(color);
	console.log(`%c${color}`,`background-color:${color};padding:.25rem;color:${brightness > 127 ? 'black' : 'white'};`);
}

function getBrightness(color) {
	const [R,G,B] = [...color.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',')];	
	return (0.2126*B + 0.7152*G + 0.0722*B);	
}
```
