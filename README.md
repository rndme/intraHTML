# intraHTML
a version of div.innerHTML that preserves view/user state while updating

## Usage: 
`intraHTML(element, strNewInnerHTMLContent);`

Combines the user-friendliness of data-binding with the flexibility of html string generation.

Setting div.innerHTML with new content normal destroys form values, selections, scroll positions, and AT cursors. With intraHTML, you can use a just-as-simple command without the nasty side-effects. This lets any and all template systems, like mustache, handlebars, php (via ajax) smoothly and seamlessly keep a view updated. 

### Replace the old and busted:
` main.innerHTML=myContent; `

### With the fresh and shiny:
` intraHTML(main, myContent); `



### How does it work?
It turns DOMs and HTML content into lightweight representations of the elements as plain JS objects, DIFFs the old and new objects to generate a change list, then applies that change-list to live dom. If you have html that defines 1000 table rows and you change one row, only one row on the screen will be adjusted, preserving text inputs and selections on the unchanged areas.


### How is intraHTML different than react, vue, deku, angular, and others?
intraHTML is less dogmatic; it's just a function that updates the DOM with a string, wherever that string might come from. There is no API, no special way of building components, no list of banned libraries or practices, no build process required, and no browser blacklist; even IE8 works with just a generic ES5 polyfill. In short, there's not much to intraHTML, which means less to get in your way, less to learn, and less to worry about.


### Is it fast?
intraHTML can easily re-render a template and re-sync the DOM at 60FPS on a modest ultrabook. DOM updates are applied at about the same rate as react. Views comprised of hundreds of elements are typically DIFFed in less than a millisecond. While a heavy-investment setup like React will likely scale better to huge interfaces (10,000+ elements), for most real-world applications, intraHTML's updates occur well-within human expectations.





