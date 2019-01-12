#HTML

#General conventions

##Validating, minifying and annotating HTML

- Use [W3C's Validator](http://validator.w3.org) for validating your HTML. Many text-editors have built-in HTML-validation. 
- For *Chrome*, there's an excellent plugin: [Validity](https://chrome.google.com/webstore/detail/validity/bbicmjjbohdfglopkidebfccilipgeif).
- Use [Minifier](http://www.willpeavy.com/minifier/) for minifying your HTML, if not built-in to your editor.
- Use &lt;!- - COMMENTS HERE - -&gt;-syntax to document your HTML.

##Indentation and readability

- Use tabs or spaces (either 2 or 4 spaces) for indentation. Not both. One or the other.

#Semantics
Use the right tags for the right content. So, for the infamous *Holy Grail Lay-out* &mdash;instead of *&lt;div&gt;*-soup (a term used for multiple div-elements within other div-elements), use a semantic structure like this:

	<header></header>
	<nav></nav>
	<main>
	  <aside></aside>
	  <section></section>
	</main>
	<footer></footer>

In the ideal world, this would be enough. But screen-readers still prefer WAI-ARIA-syntax, so you might want to add additional attributes:

	<header role="heading"></header>

To further enrich the markup, various schemas can be used (see *SEO and Schemas* below):

	<nav itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
	  <a itemprop="url" href="/mypath"><span itemprop="name">My Link</span></a>
	</nav>

##Unclear semantics
Some of HTML5's new tags are &mdash;to say the least&mdash; not very clear.

- The **menu**-tag is for context (right-click) menus.
- The **address**-tag is NOT for postal addresses, but for URIs.
- The **content**-tag is a placeholder tag for (replaced) content in *Web Components*.

#Tools and documentation

[W3 HTML5](http://www.w3.org/TR/html5/)
The official documentation. Still work-in-progress.

[HTML5 Doctor](http://html5doctor.com/)
Excellent site with all about HTML5.

[HTML5dom.com](http://HTML5dom.com)
This is a JavaScript-object/tool, made by a dude called Mads Stoumann. Use it to quickly get a comprehensive list of valid attributes for a given HTML5-tag, as well as a list of it's allowed WAI-ARIA roles and states.

#SEO and schemas
> To provide better search-results and search-robot indexing, enrich the markup with structured data (previously known as microdata). 

Search engines including Bing, Google, Yahoo! and Yandex rely on this markup to improve the display of search results, making it easier for people to find the right Web pages.

A comprehensive list is available at [schema.org](http://schema.org).

##Below are a list of examples for some of the more common patterns.

###Page. Schema: WebPage

	<body itemscope itemtype="http://schema.org/WebPage">

	-Possible values:

	AboutPage
	CheckoutPage
	CollectionPage
	ContactPage
	ItemPage
	MedicalWebPage
	ProfilePage
	QAPage
	SearchResultsPage

###Search form. Schema: SearchAction

	<div itemscope itemtype="http://schema.org/WebSite">
	  <meta itemprop="url" content="https://test.stoumann.dk/"/>
	  <form itemprop="potentialAction" itemscope itemtype="http://schema.org/SearchAction">
	    <meta itemprop="target" content="https://test.stoumann.dk?q={search_term}"/>
	    <input itemprop="query-input" type="text" name="search_term" required/>
	    <button type="submit">Search products</button>
	  </form>
	</div>


###Navigation. Schema: SiteNavigationElement

	<nav itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
	  <a itemprop="url" href="/products/"><span itemprop="name">Products</span></a>
	</nav>

###BreadCrumb. Requires *WebPage*-schema (see above)

	<nav itemprop="breadcrumb">
	  <a href="/" itemprop="url">Home</a> &gt;
	  <a href="comics/index.html">Comics</a> &gt;
	  <a href="comics/marvel/index.html">Marvel</a> &gt;
	  <a href="comics/marvel/captainamerica/index.html">Captain America</a>
	</nav>

###Article. Schema: Article

	<article itemscope itemtype="http://schema.org/Article"> 
	  <h1 itemprop="headline">Captain America &mdash; The Story</h1>
	  <h2 itemprop="description">The original superhero</h2> 
	  <em>By <span itemprop="author">Stan Lee</span></em>
	  <span><meta itemprop="datePublished" content="2014-10-06"/>October 6, 2014</span> 
	  <div itemprop="associatedMedia">
	    <figure itemscope itemtype="http://schema.org/ImageObject"> 
	      <img itemprop="contentURL" src="425.jpg"/> 
	      <figcaption itemprop="caption">The original superhero</figcaption>
	    </figure>   
	  </div> 
	  <div itemprop="articleBody"> 
	    <p>
	      Article text&hellip;
	    </p>
	  </div>
	</article>

###FAQ. Schema: Question

	<details itemscope itemtype="http://schema.org/Question">
	  <summary itemprop="name">Who is Captain America?</summary>
	  <div itemprop="suggestedAnswer acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
	    <div itemprop="text">Captain America is a fictional superhero, created by American cartoonists Joe Simon and Jack Kirby.</span>
	  </div> 
	</details>

###Video. Schema: VideoObject

	<section itemprop="video" itemscope itemtype="http://schema.org/VideoObject">
	  <meta itemprop="duration" content="T01M47S" />
	  <meta itemprop="thumbnailURL" content="http://i.vimeocdn.com/video/469369048_200x150.jpg" />
	  <meta itemprop="embedURL" content="https://vimeo.com/103721959" />
	  <meta itemprop="copyrightHolder" content="Marvel Comics" />
	  <meta itemprop="isFamilyFriendly" content="true" />
	  <h3 itemprop="name">Captain America: The Winter Soldier</h3>
	  <div itemprop="description">The official trailer for the new Captain America sequel.</div>
	</section>

###Social media-profiles. Schema: Organization &gt; sameAs

	<meta itemprop="sameAs" content="https://twitter.com/company" />
	<meta itemprop="sameAs" content="https://www.facebook.com/sompany" />


###Product. Multiple schemas:

- Product
- ImageObject
- AggregateRating
- Offer
- Review
- Rating

*Example:*

	<article itemscope itemtype="http://schema.org/Product">
	  <h1 itemprop="name">Captain America #425</h1>
	  <span itemprop="itemCondition" content="NewCondition">New</span>
	   
	  <figure itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
	    <img src="425.jpg" itemprop="contentUrl" alt="Captain America #425" />
	    <meta itemprop="thumbnail" content="425.jpg" />
	    <figcaption>
	      <span itemprop="name">Captain America #425</span>
	      <span itemprop="copyrightHolder">Marvel Comics</span>
	      <span itemprop="copyrightYear">1994</span>
	      <meta itemprop="representativeOfPage" content="true">
	    </figcaption>
	  </figure>
	   
	  <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
	   Rated <span itemprop="ratingValue">3</span>/5
	   based on <span itemprop="reviewCount">11</span> customer reviews
	  </div>
	 
	  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
	    <span itemprop="price">$1.99</span>
	    <link itemprop="availability" href="http://schema.org/InStock" />In stock
	  </div>
	     
	  <strong>Product description:</strong>
	  <span itemprop="description">
	    Description here&hellip;
	  </span>
	 
	  <h2>Customer reviews:</h2>
	  <div itemprop="review" itemscope itemtype="http://schema.org/Review">
	    <span itemprop="name">It all starts here!</span> -
	    by <span itemprop="author">Avid reader</span>,
	    <meta itemprop="datePublished" content="2014-10-01">October 1, 2014
	    <div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
	      <span itemprop="ratingValue">5</span>
	    </div>
	    <span itemprop="description">
	      What a great issue&hellip;
	    </span>
	  </div>
	</article>

###Organization. Multiple schemas:

- Organization
- LocalBusiness
- GeoCoordinates
- PostalAddress

*Example:*

	<footer itemscope itemtype="http://schema.org/Organization">
	  <div>
	    <img itemprop="logo" src="img/logo.svg" />
	    <strong itemprop="name">Fantask A/S</strong><br />
	    <span itemprop="description">&mdash; The world's oldest comic book store!</span>
	    E-mail: <a itemprop="email" href="mailto:fantask@fantask.dk">fantask@fantask.dk</a>
	  </div>
	  <div itemscope itemtype="http://schema.org/LocalBusiness">
	    <a itemprop="name" href="http://maps.google.com/maps?q=Sankt+Peders+Str&aelig;de+18+K&oslash;benhavn">Comics &amp; Books</a><br />
	    <meta itemprop="branchOf" content="Fantask A/S" />
	    <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
	      <span itemprop="streetAddress">Sankt Peders Str&aelig;de 18</span><br />
	      <span itemprop="postalCode">DK-1453</span> <span itemprop="addressLocality">K&oslash;benhavn K.</span><br />
	      Tel: <a itemprop="telephone" href="tel:+4533118538">(+45) 33 11 85 38</a><br />
	    </span>
	 
	    <span itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
	      <meta itemprop="latitude" content="55.67912" />
	      <meta itemprop="longitude" content="12.56853" />
	    </span>

	    <strong>Opening hours</strong><br />
	    <meta itemprop="openingHours" content="Mo-Th 11:00-18:00">Monday-thursday 11-18<br />
	    <meta itemprop="openingHours" content="Fr-Fr 11:00-18:30">Friday 11-18.30<br />
	    <meta itemprop="openingHours" content="Sa-Sa 11:00-15:00">Saturday 11-15
	  </div>
	</footer>

##Using JSON-LD

> JSON-LD, or JavaScript Object Notation for Linked Data, is a method of transporting Linked Data using JSON

For those cases where it's not possible to alter the markup, add a JSON-LD block in a script tag on the page.
Comprehensive list of examples available at both [schema.org](http:// schema.org) and [json-ld.org](http://json-ld.org).

##Testing structured markup
Both Google and Bing provide tools for testing structured markup.
[Use Googles](http://www.google.com/webmasters/tools/richsnippets).
None of the tools currently support JSON-LD.
