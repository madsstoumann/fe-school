#Javascript
##General conventions

###Validating, minifying and annotating JavaScript

- Use [JSHint](http://jshint.com/) for validating your code. Also available as a plugin for multiple text-editors, such as Notepad++ and Sublime Text.
- Use [Google Closure](http://closure-compiler.appspot.com/home) for minifying your JavaScript.
- Use [JSDoc](http://usejsdoc.org/) to annotate your JavaScript with tags, recognizable by Google Closure and others. Google Closure has [additional JSDoc-documentation](https://developers.google.com/closure/compiler/docs/js-for-compiler).
JSHint has built-in “use strict” when validating code. If JSHint isn’t used, use “use strict” either globally or per function.

###Why JSDoc?

- If all variables and arguments are annotated with JSDoc-syntax, type-safe validation and minification can be applied.
- If comments are in JSDoc-syntax as well, there are tools to extract all the JSDoc-syntax to create documentation automatically.
- And finally: With proper JSDoc-syntax it’s just so much easier for new developers to understand the code.

###Case

- Use camelCase for function- and variable-names.
- Use TitleCase for module-like Objects.
- Use UPPERCASE for consts and global variables.

###Brackets and semicolons

Although brackets and semicolons are optional in many scenarios, it’s advised always to use them — as most JavaScript compilers and minifiers require them.

- Apply semicolons after all statements.
- **Do not**, however, apply semicolons after curly brackets, except when defining a new object, like:

		var oPerson = {};

- Use curly brackets for all conditionals and loops, the only exception being very short conditionals, like:
 
		if (a) b = true;

###Indentation and readability

- Use tabs or spaces (either 2 or 4 spaces) for indentation. Not both. One or the other.
- Apply a line-break (as well as indentation) after opening curly brackets.

*Example:*

	if (a > 2) {
	  for (i = l; l--;) {
	    console.log(a[l]);
  	  }
	} 
	else {
  	  console.log("none");
	}

—Will be compiled in Google Closure to:

	if(2<a)for(i=l;l--;)console.log(a[l]);else console.log("none");

##Variables

- Variables should be declared at the **highest point of their scope** (i.e at the top of a function), not “as you go along”.
- **Do not** declare global variables, as this might interfere with —or break— other code.
- Always declare variables within an object-scope or a function.
- It’s not recommended to use *const* and *let* yet, as they’re only supported in a limited group of browsers.

Variables should be prefixed with a letter or short string indicating their type, so either prefix like this:

	a = Array
	b = Boolean
	d = Date
	e = Event
	f = Function (When used as parameter)
	i, j, k = Iterators
	n = Number
	o = Object
	r = RegExp
	s = String
	v = Variable**)
	y = Symbol

— Or this:

	arr = Array
	bln = Boolean
	dte = Date
	err = Error
	evt = Event
	fnc = Function
	num = Number*)
	obj = Object
	rxp = RegExp
	str = String
	sym = Symbol
	var = Variable

*) When using this format, subtypes like “dbl” (Double), “int” (Integer) or “flt” (Float) can also be used.
**) Variable data-type, for scenarios where the variable can be one of multiple types.

**Annotate variables in JSDoc-format:**

The format consists of a tag (const, constructur, type etc.), a value in curly brackets, the variable name itself (in optional, square brackets) — and a short, optional description.

*Example:*

	/** @type {Array} aNames -- An array of names.   */

###DOM elements

When referring to a DOM-element more than once, create a variable pointing to the DOM-element instead.

*Consider this:*

	var oParent = document.querySelectorAll(".myParentNode");
	for (i = 0; i < oParent.length; i++) { etc...

This loop will contact the DOM with each iteration (number of total elements).
A much more efficient way of doing the same loop would be:

	var oParent = document.querySelectorAll(".myParentNode"), nLength = oParent.length;

	for (i = nLength; i--;) { etc...

The length of the nodelist is stored in the variable nLength, thus avoiding contacting the DOM for each iteration.

If the order of the loop is irrelevant, a negative loop is approx. 30% faster.

###Functions

A function’s arguments should also be annotated in JSDoc-format.

*Example:*

	/**
	* xhrJSON --- Fires a XMLHttpRequest, the onreadystate-function parses JSON and runs a callback-function.
	* @param {string} sURI -- The URI of the request.
	* @param {Function} fCallBack -- An optional callback-function.
	* @param {Object} [oArgs] -- Callback-arguments.
	*/

To indicate that an argument is optional, wrap it’s name in square brackets:

	/**
	* xhrJSON --- Fires a XMLHttpRequest, the onreadystate-function parses JSON and runs an optional callback-function.
	* @param {string} sURI -- The URI of the request.
	* @param {Function} [fCallBack] -- An optional callback-function.
	* @param {?} [oArgs] Optional callback-arguments. Can either be the arguments-object or an array.
	*/

Note the {?} to indicate unknown or multiple types.

###Anonymous / Self-executing functions (IIFE)

There’s a slight overhead performance-wise when using unnamed, anonymous functions.

A normal function with parameters is always faster.

*Example from jsPerf:*

	var fn = function(j) { return j;}
     
	for (var i = 0; i < 10000; i++) {
	  var result = fn(i);
	}

—Executes significantly faster (more than 80%) than:

	for (var i = 0; i < 10000; i++) {
	  var result = (function() { return i; })();
	}
—It’s not only in loops. Anonymous/Self-executing functions benefit from regular, named functions with parameters, in all cases.

*Example from jsPerf:*
	
	try {
	  var v = test(-1);
	  test(v);
	} catch (e) {
	  console.log(e);
	}

—Executes significantly faster than:

	function
	try {
	  (function() {
	    var v = test(-1);
	    test(v);
	  })();
	} catch (e) {
	  (function() {
	    console.log(e);
	  })();
	}

##Coercion

Use strict coercion, where both value and type are compared, as in:

	a === b
	a !== b

Use loose coercion only if that’s specifically what you want to achieve:

	var a = 42;
	var b = "42";
	a === b; // false
	a == b; // true

##Events

- Add events with *addEventListener*.
- Remove events with *removeEventListener*.
- Create events with *new Event(evtname)*.
- Dispatch events with *dispatchEvent*:

	eTrigger = new Event("myEvent);
	document.body.dispatchEvent(eTrigger);

In some scenarios it makes sense to use the classic way of assigning events, like *onclick* and *onchange* — and dispatch them with *element.eventType()*.
The danger here is, that these events could be overwritten by precisely *addEventListener*. Handle with care.

###Debouncing

Debounce events when triggered repeatedly, by wrapping the event-function in a timeout:

	var myFunction = debounce(function() {
	    // Code here ...
	}, 250); 
 
	element.addEventListener("eventType", myFunction);

—Where debounce could be this or this.

##this, call and apply

*this* in JavaScript refers to the scope in which a function is executed. Hence *this* changes relatively to where it’s executed. When used correctly, *this* can save a lot of extra code by re-using functionality.

*Consider this code:*

	function testThis(num) {
	  console.log( "num: " + num );
      this.count++;
	}

—When executed like this, it will return undefined – but when it’s executed with an *object* (the “this”, which in this case requires the property “count”):

	var data = {
	  count: 5
	}
 
	for (i = 0; i < 10; i++) {
	  testThis.call(data, i);
	}

—*data.count* will be 15 as expected.

- Use *call* to run a function with a specific scope (this) with a single argument.
- Use *apply* to run a function with a specific scope (this) with an array of arguments.