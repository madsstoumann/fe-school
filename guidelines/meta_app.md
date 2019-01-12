#All the stuff you cannot see…
This document is a comprehensive list of all the hidden features you can provide in html, that can enrich the experience on various devices, as well as provide better information about the document for search-engines and crawlers.

##Icons
For favicon, shortcut-icon and app-specific icons, use [RealFaviconGenerator](http://realfavicongenerator.net/), a great tool that can create all the icons for all platforms based on an svg-file.

##Html
**Open Graph namespace**. See further OG-metadata further below.

	prefix="og: http://ogp.me/ns#"


**[Cache Manifest](http://en.wikipedia.org/wiki/Cache_manifest_in_HTML5)**. Which files will be cached in offline-viewing:

	manifest="cache.manifest"

##Meta
**Application Name**

	<meta name="application-name" content="Valtech Denmark">

**Author**

	<meta name="author" content="Mads Stoumann">

**Charset**. 
Normally: utf-8, iso-8859-1. Other sets [here](http://www.iana.org/assignments/character-sets/character-sets.xhtml).

	<meta charset="utf-8">

**Description**

	<meta name="description" content="A digital agency">

**Generator**. 

If a program generated the content.

	<meta name="generator" content="SoftwareName">

**Keywords**

	<meta name="keywords" content="HTML, CSS, JavaScript">

**Mobile Web App**. Use for Android Apps

	<meta name="mobile-web-app-capable" content="yes">

**Robots**. Allow/disallow various crawler-indexing types.

	<meta name="robots" content="index, follow">

	—Possible values:
	
	index
	noindex
	noimageindex
	none
	follow
	nofollow
	noarchive
	nocache
	nosnippet
	noodp
	noydir

##Link Rel

**Alternate**. Links to an alternate version of the document (i.e. print page, translated or mirror). Applies to: link, a, area.

	<link rel="alternate" type="application/atom+xml" title="RRS News" href="/blog/news/atom">

**Archives**. Links to an index-page with a list of records (blog-posts etc.). Applies to: link, a, area.

	<link rel="archives" title="">

**Author**. Links to a URI, representing the author of the document. Applies to: link, a, area.

	<link rel="author" title="">

**Canonical**. Indicates that there are multiple versions of the same document.

	<link rel="canonical" href="http://example.com/">
	<link rel="canonical" href="http://example.com/index.html">

**Help**. Links to a help document. Applies to: link, a, area.

	<link rel="help" href="/help/">

**Icon.** Imports an icon to represent the document.

	<link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="128x128 512x512 8192x8192 32768x32768">

**Imports**. Imports external HTML, used for templates, web components etc. Resources on other origins must be CORS-enabled.

	<link rel="import" href="templates/template.html">

**License**. Links to copyright information for the document. Applies to: link, a, area.

	<link rel="license" href="http://www.opensource.org/licenses/mit-license.php">

**Meta**. Gives the possibility to RSS Readers to find the Web site updates feed.

	<link rel="meta" type="application/rdf+xml" href="foaf.rdf">

**Next**. Indicates that the document is a part of a series, and that the next document in the series is the referenced document. Applies to: link, a, area.

	<link rel="next" href="http://www.example.com/article?story=abc&page=3">

**Prev**. Indicates that the document is a part of a series, and that the previous document in the series is the referenced document. Applies to: link, a, area.

	<link rel="prev" href="http://www.example.com/article?story=abc&page=1">

**Pingback**. Read <a href="http://hixie.ch/specs/pingback/pingback-1.0" target="_blank">more here</a>.

	<link rel="pingback" href="pingback server">

**Search**. Links to a search tool for the document. Applies to: link, a, area.

	<link rel="search" type="application/opensearchdescription+xml" title="Website" href="opensearch.xml">

**Sidebar**. Open URL in sidebar. Applies to: link, a, area.

	<link rel="sidebar" href="uri.html">

**Shortcut Icon**.

	<link rel="shortcut icon" sizes="196x196" href="icon196.png">

**Stylesheet**.
[Available media-types](http://www.w3schools.com/tags/att_link_media.asp):

	all
	aural
	braille
	handheld
	projection
	print
	screen
	tty
	tv

	<link rel="stylesheet" href="stylesheet.css" type="text/css" media="all">

**Tag**. The tag keyword indicates that the tag that the referenced document represents applies to the current document. Applies to: link, a, area.

	<link rel="tag" href="uri.html">

###Performance and caching

**dns-prefetch**

	<link rel="dns-prefetch" href="//hostname_to_resolve.com">

**subresource**

	<link rel="subresource" href="/js/myapp.js">

**prefetch**

	<link rel="prefetch" href="/images/big.jpeg">

**prerender**

	<link rel="prerender" href="//example.org/next_page.html">

Other link rels: [http://microformats.org/wiki/existing-rel-values](http://microformats.org/wiki/existing-rel-values)

#Vender-specific markup

##Apple

**viewport**

	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=0.25, maximum-scale=1, user-scalable=no">
	<meta name="viewport" content="minimal-ui">

**apple-mobile-web-app-capable**

	<meta name="apple-mobile-web-app-capable" content="yes">

**apple-mobile-web-app-status-bar-style**

	<meta name="apple-mobile-web-app-status-bar-style" content="black">

**apple-mobile-web-app-app-title**

	<meta name="apple-mobile-web-app-app-title" content="MyTitle">

**format-detection**

	<meta name="format-detection" content="telephone=no">

**apple-touch-startup-image**

	<link rel="apple-touch-startup-image" href="/startup.png">

**apple-touch-icon**

	<link rel="apple-touch-icon" href="touch-icon-iphone.png">
	<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
	<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
	<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">

###App-Store
**app-id:** (Required.) Your app's unique identifier.

**affiliate-data:** (Optional.) Your iTunes affiliate string.

**app-argument:** (Optional.) A URL that provides context to your native app.

*Example:*

	<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">


##AppLinks

**al:ios:url**

	<meta property="al:ios:url" content="applinks://docs" />

**al:ios:app_store_id**

	<meta property="al:ios:app_store_id" content="12345" />

**al:ios:app_name**

	<meta property="al:ios:app_name" content="App Links" />

**al:android:url**

	<meta property="al:android:url" content="applinks://docs" />

**al:android:app_name**

	<meta property="al:android:app_name" content="App Links" />

**al:android:package**

	<meta property="al:android:package" content="org.applinks" />

**al:web:url**

	<meta property="al:web:url" content="http://applinks.org/documentation" />

##Google Android

**alternate: android-app**

	<link rel="alternate" href="android-app://com.example.android/http/example.com/gizmos?1234" />

##Microsoft
**X-UA-Compatible**

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	—Possible values:
	IE=5
	IE=EmulateIE7
	IE=7
	IE=EmulateIE8
	IE=8
	IE=EmulateIE9
	IE=9
	IE=edge
	
**cleartype**

	<meta http-equiv="cleartype" content="on">

**Conditional comments**

	<!--[if expression]> HTML <![endif]-->
	
	—Possible values:
	IE : Internet Explorer
	IEMobile : Windows Phone
	WindowsEdition : IE8 on Win7
	lt : Less than operator
	lte : Less than or equal to
	gt : Greater than
	gte : Greater than or equal to
	! : NOT operator
	(): Subexpression operator
	&amp; : AND operator
	| : OR operator
	true : Evaluates to true
	false : Evaluates to false

**Microsoft Application Metadata. [Read more here](http://msdn.microsoft.com/en-us/library/ie/dn255024(v=vs.85).aspxapplication-name).**

	msapplication-allowDomainApiCalls
	msapplication-allowDomainMetaTags
	msapplication-badge
	msapplication-config
	msapplication-navbutton-color
	msapplication-notification
	msapplication-square150x150logo
	msapplication-square310x310logo
	msapplication-square70x70logo
	msapplication-wide310x150logo
	msapplication-starturl
	msapplication-task
	msapplication-task-separator
	msapplication-TileColor
	msapplication-TileImage
	msapplication-tooltip
	msapplication-window

###Windows Tiles

**msapplication-TileImage**

	<meta name="msapplication-TileImage" content="images\tileimage.jpg">

**msapplication-TileColor**

	<meta name="msapplication-TileColor" content="#FF3300">

**msapplication-badge**

	<meta name="msapplication-badge" content="frequency=30; polling-uri=http://example.com/id45453245/polling.xml">

**msapplication-notification**

	<meta name="msapplication-notification" content="frequency=60;polling-uri=http://contoso.com/livetile">

###Windows Store

**msApplication-ID**

	<meta name="msApplication-ID" content="app-name"/>

**msApplication-PackageFamilyName**

	<meta name="msApplication-PackageFamilyName" content="app-package"/>

**msApplication-Arguments**

	<meta name="msApplication-Arguments" content="optional-arguments"/>

##Open Graph. 
Read [more here](http://ogp.me).

**og:title**

	<meta property="og:title" content="The Rock" />

**og:type**

	<meta property="og:type" content="video.movie" />

**og:url**

	<meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />

**og:image**

	<meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />

**og:site_name**

	<meta property="og:site_name" content="IMDb" />

##Inline rel-examples:

	<a href="http://example.com/" rel="external nofollow">Link</a>
	<a href="a.html" rel="bookmark">Bookmark this</a>
	<a href="a.xml" rel="alternate" type="application/atom+xml">Recently Visited Planets</a>
	<a href="a.html" rel="noreferrer">Dont't refer this</a>