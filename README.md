# intraHTML
## makes HTML as easy to update as it is to create

### Usage

`intraHTML(element, strNewInnerHTMLContent);` <br />

#### Install
donwload, `npm install intrahtml`,  or `bower install intrahtml`

#### Replace the old and busted:
` main.innerHTML=myContent; ` <br />
` main.html(myContent); `

#### With the fresh and shiny:
` intraHTML(main, myContent); ` <br />
` $(main).intraHTML(myContent); `

## Why use it?
It combines the user-friendliness of data-binding with the flexibility of html string generation.

Setting div.innerHTML with new content destroys form values, selections, scroll positions, and mode. Conversely, generating HTML these days is incredibly fast and convenient with everything from templates like Mustache/Handlbars/Jade, to PHP and it's cornucopia of frameworks. 

If one could simply generate new HTML and show it, apps would be easy to develop. Now, it's easy to do just that. With intraHTML, you can update your entire view without the nasty side-effects. Any and all template systems can seamlessly keep a view updated. 


### How does it work?

1. Turns existing dom branch into a JS-object virtual DOM
2. Turn the new HTML content into a virtual DOM
3. DIFF the existing and new vdom to generate a change list
4. apply the list of changes to the live DOM to update the view

The [infoview demo](http://danml.com/intrahtml/demos/infoview/) makes the parts and workings clear.


If you have html that defines 1000 table rows and you change 1 row, only 1 row on the screen will be adjusted, preserving text inputs and selections on the 999 unchanged rows.


### How is intraHTML different than react, vue, deku, angular, and others?
intraHTML is less dogmatic; it's just a function that updates the DOM with a string, wherever that string might come from. There is no API, no special way of building components, no list of banned libraries or practices, no build process required, and no browser blacklist; even IE8 works with just a generic ES5 polyfill. In short, there's not much to intraHTML, which means less to get in your way, less to learn, and less to worry about.


### Is it fast?
intraHTML can easily re-render a template and re-sync the DOM at 60FPS on a modest ultrabook. DOM updates are applied at about the same rate as react. Views comprised of hundreds of elements are typically DIFFed in less than a millisecond. While a heavy-investment setup like React will likely scale better to huge interfaces (10,000+ elements), for most real-world applications, intraHTML's updates occur well-within human expectations.

The [perf demo](http://danml.com/intrahtml/demos/perf/) lets you tests dynamic lists of various sizes.


### Got any demos?

* The [Github Cards Demo](http://danml.com/intrahtml/demos/githubcards/) was modeled after a react demo, but uses a lot less code.
* The [Todo Demo](http://danml.com/intrahtml/demos/todo/) is a todoMVC-ish demo that uses intraHTML for the model display
* The [Minimal Investment Demo](http://danml.com/intrahtml/demos/minimal/) uses a half-dozen lines to sync view + bundle updates


### Advantages
* simple way to accomplish "data binding" (smooth partial updates) with an existing vanilla JS project
* tiny compared to other packages and frameworks - less to learn, break, and deliver to users
* allows showing html from a server without scrolling/deselecting/etc - php games?
* scanning the live DOM before DIFFing allows other tools/plugins that modify the DOM, unlike Angular and React
* clean HTML input and output, no "almost HTML", no invalid attributes, no messy unique IDs
* provides a change-log that can be used to save changes, merge batches of changes, undo changes, etc... 

### Disadvantages
 * very few features compared to view-centric frameworks
 * scanning the live DOM before DIFFing potentially costs CPU compared to virtual-view memorizing frameworks
 * the DIFF algo may not be the fastest or result in the most compact set of mutations possible
 * clean HTML input requires extra HTML parsing compared to pre-parsed virtual DOMs
 * reliance on window.document methods restricts operation to web browsers (no node, workers, etc)
