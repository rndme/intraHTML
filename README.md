# intraHTML
## makes HTML as easy to live-update as create

#### fast incremental view updates using virtual-DOM DIFFs and live DOM patching


### Usage

`intraHTML(element, strNewInnerHTMLContent);` <br />

#### Install
[donwload](https://raw.githubusercontent.com/rndme/intraHTML/master/intrahtml.min.js), `npm install intrahtml`,  or `bower install intrahtml`

#### Replace the old and busted:
` main.innerHTML=myContent; ` <br />
` $("#main").html(myContent); `

#### With the fresh and shiny:
` intraHTML(main, myContent); ` <br />
` $("#main").intraHTML(myContent); `


### Demos
* The [Info View Demo](http://danml.com/intrahtml/demos/infoview/) reveals the inner-workings of intraHTML
* The [Performance Demo](http://danml.com/intrahtml/demos/perf/) compares Vanilla, intraHTML, and React
* The [Github Cards Demo](http://danml.com/intrahtml/demos/githubcards/) uses fetch()+gitHub API+intraHTML
* The [Todo Demo](http://danml.com/intrahtml/demos/todo/) shows simple MVVC view updating using ES6
* The [Minimal Investment Demo](http://danml.com/intrahtml/demos/minimal/) is the simplest demo of live dom updating
* The [Components Demo](http://danml.com/intrahtml/demos/components/)creates encapsulated web-ready components


### Useful Helper Methods
#### intraHTML exposes a few "static methods"  
`updater(elmDest, objVDOM)`	returns a function that accepts HTML to update the view with.<br />
`elementFromString(strHTML)`	browser-based parser turns elements into vdom objects <br />
`fromHTML(source, containerTagName)`	quickly parses an html string or DOM element into a vdom object <br />
`parseHTML(strHTML)`	string-based parser  turns HTML strings into vdom objects<br />
`toHTML(objVDOM)`		turns a vdom object into an HTML string<br />
`odiff(a,b)`	internal differ used on VDOMs by intraHTML, for testing and general use, ex: dirty checking<br />

  
### Options (defaults)
`blnTiming` 	(false)	enable to gather performance information about parsing, diffing, and applying dom updates<br />
`blnDebug`  	(false)	enable to dump detailed info to the console for debugging <br />
`blnParser`	(true)	disable (10x slower) for compat w/ HTML namespaces, funky attribs, or invalid nesting.


### How does it work?

For a div with 1 sub-tag: `<div id="d"><br></div>` suppose we call `intraHTML(d,"<hr />");` : 

1. Turns existing DOM branch into a JS-object virtual DOM  ` <br> -> {$:"br"} `
2. Turns the new HTML content into a virtual DOM  ` "<hr />" -> {$:"hr"} `
3. DIFFs old and new virtual DOM to make a change list  ` [{type: "set", path: ["$"], val: "hr"}] `
4. Applies list of changes to the live DOM to update the view ` <div id="d"><hr></div> `

The [infoview demo](http://danml.com/intrahtml/demos/infoview/) makes the parts and workings clear.



## Why use it?
It combines the user-friendliness of data-binding with the flexibility of html string generation.

Setting div.innerHTML with new content destroys form values, selections, scroll positions, and mode. Conversely, generating HTML these days is incredibly fast and convenient with everything from templates like Mustache/Handlbars/Jade, to PHP and it's cornucopia of frameworks. 

If one could simply generate new HTML and show it, apps would be easy to develop. Now, it's easy to do just that. With intraHTML, you can update your entire view without the nasty side-effects. Any and all template systems can seamlessly keep a view updated. 



### How is intraHTML different?
intraHTML is far simpler; it's just a function that updates the DOM with a string, wherever that string might come from, even a server! Feed output into intraHTML and enjoy user-friendly live view updates without any dom-pointing CSS selectors or data binding; it really is magical.

The [perf demo](http://danml.com/intrahtml/demos/perf/) lets you compare many approaches, including react and vanilla.



### Advantages
* simple way to accomplish "data binding" (smooth partial updates) with an existing vanilla JS project
* simplest virtual-dom-based view updater available
* tiny - less to learn, break, and deliver to users
* scanning the live DOM before DIFFing allows other tools/plugins that modify the DOM, unlike Angular and React
* clean HTML input and output: no camelCase, invalid attributes, or unique IDs thoughout the markup


### Disadvantages
 * few features compared to frameworks
 * scanning the live DOM before DIFFing potentially costs CPU compared to virtual-view memorizing frameworks
 * the DIFF algo may not be the fastest or result in the most compact set of mutations possible

