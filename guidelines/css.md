#CSS
#General conventions
##Validating, minifying and annotating CSS

- Use [CSSLint](csslint.net) for validating your CSS. Also available as a plugin for multiple text-editors, such as Sublime Text and Brackets. 
- The Visual Studio extension [CSSCop](visualstudiogallery.msdn.microsoft.com/a921b98e-9430-4be2-bf53-1169e12bdb50") brings CSS Lint support to Visual Studio.
- Use [CSS Minifier](cssminifier.com) for minifying your CSS, if not built-in to your editor.
- Use COMMENTS-syntax to document your CSS. For larger modules, use a description-syntax like this:

*Example:*

	/*
	DOCUMENT INFORMATION
	Document  : Name - Further description of stylesheet here
	Version   : 1.0.0
	Client    : Client / project-name
	Authors   : List of contributors
	Date edit : Last day of edit, with optional comments
	*/

##Indentation and readability
- Use tabs or spaces (either 2 or 4 spaces) for indentation. Not both. One or the other.
- Apply a line-break (as well as indentation, depending on nesting-level) after curly brackets, both opening and closing:
	
*Example:*
	 
	.myClass {
	  color: red;
	}

#Naming conventions
Site-level blocks should be names with tag-description, ie:

	form-search
	nav-breadcrumb

**For root-level elements:**

	header-root
	main-root
	footer-root

**Module-level and Pagetype-level blocks should be named accordingly:**

	product-detail
	product-filter
	product-search-result
	etc.

#Module-based approach — Avoiding too many levels
Too many nested levels affects performance, as browsers read CSS right-to-left.
A module-based approach will initially contain a lot of unused classes, but they will be *much appreciated* later.

**Take this html-snippet:**

	<section class="my-module">
	  <h1 class="my-module-header">
	    Header
	  </h1>
	  <aside class="my-module-aside">
	    <h2 class="my-module-aside-header">
	      Header 2
	    </h2>
	  </aside>
	</section>

In regular CSS, it's <em>a lot</em> of classes, but you only need to add those you're actually going to use.

The module-based approach is even easier, when using a preprocessor like Sass or Less:

	.my-module {
	  font: small sans-serif;
	  &-header {
	    font-size: large;
	  }
	  &-aside {
	    background-color: green;
	    &-header {
	      font-size: normal;
	    }
	  }
	}

—Which will output:

	.my-module { ... }
	.my-module-header { ... }
	.my-module-aside { ... }
	.my-module-aside-header { ... }

#Responsiveness
If coding for *evergreen browsers*, all element widths-, margins- and paddings should be defined in percentages, or some other relative unit (see below).
Only the root font-size should, along with breakpoints for mobile devices, be defined in pixels.

**Relative units**

- *em* - relative font-size. If element font-size is 16px, then 1 em is 16px, and .75em is 12px.
- *rem* - root em. Set html/body to a specific font-size, and root em will always refer to this.
- *vw* - viewport-width. 1 vw is 1% of the viewport width.
- *vh* - viewport-height. 1 vh is 1% of the viewport height.
- *vmin* - 1 vmin is 1vw or 1vh, whatever is smallest
- *vmax* - 1 vmax is 1vw or 1vh, whatever is largest

If element-widths are based on the viewport-width or a percentage, they will resize without the use for media-queries, and thus avoiding writing multiple CSS-rules for all viewport-widths.

All these units works in IE9+ - for IE8, just use a fallback font-size in either ems or pixels.

##Mobile first —min-width instead of max-width
Use a *Lowest common denominator*-approach, which in most cases will be mobile devices and older browsers.
Design for these devices first, and gradually step up using media-queries with min-width.

**Example:**

	$breakpoint-tablet: 768px;
	$breakpoint-desktop: 1024px;
	$breakpoint-large-desktop: 1280px;
	
	@media (min-width: $breakpoint-tablet) {
	...
	}

—Extend it with [this great technique](http://davidwalsh.name/write-media-queries-sass):

	@mixin tablet {
	  @media (min-width: $breakpoint-tablet) {
	    @content;
	  }
	}
	
	@mixin desktop {
	  @media (min-width: $breakpoint-desktop) {
	    @content;
	  }
	}

—and use it like here:

	p {
	  font-size: 1em;
	
	  @include tablet {
	    font-size: 1.3em;
	  }
	
	  @include desktop {
	    font-size: 1.6em;
	  }
	}

#Specificity
CSS-rules are weighed after the following matrix:
<table>
<tbody>
<tr>
<td>Inline-styles* <em>style="color:red;"</em></td>
<td>1,0,0,0</td>
</tr>
<tr>
<td>ID Selector <em>#myElement</em></td>
<td>0,1,0,0</td>
</tr>
<tr>
<td>Class Selector <em>.myClass</em></td>
<td>0,0,1,0</td>
</tr>
<tr>
<td>Element Selector <em>input</em></td>
<td>0,0,0,1</td>
</tr>
</tbody>
</table>
*) ALWAYS AVOID inline styles!

— so a CSS-rule like this:

	body > div > table thead tr th {
	  color: red;
	}

—Will have a weight of <em>0,0,0,6</em>, which is a lower specificity than a regular class-selector:

	.my-table-header {
	  color: red;
	}

—Which will have a weight of *0,0,1,0*.

##Specificity Hack
For these scenarios where *nothing works* (or requires too many changes), there's a specificity-hack. Just group the selector with itself, as many times it takes.
This appoach is, of course, not recommended — but might come in handy as a last resort:

	.my-class.my-class

  	/* Or even */
  	.my-class.my-class.my-class.my-class

##CSS Combing
The browser renders the page faster, if CSS-rules containing <em>block-level-formatting</em> are listed first - that is:

**display, position, width, height, margin** etc.

*Decorative rules*, such as **background, color** etc. should be listed last.

Apparently, listing all CSS-rules in the various declarations in the same order throughout the stylesheet should improve performance as well.
For this, a free tool like [csscomb.com](http://csscomb.com), can be used.