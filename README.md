# intraHTML
## like div.innerHTML, but doesn't suck

### Usage
`intraHTML(element, strNewInnerHTMLContent);`

### Replace the old and busted:
` main.innerHTML=myContent; ` <br />
` main.html(myContent); `

### With the fresh and shiny:
` intraHTML(main, myContent); ` <br />
` $(main).intraHTML(myContent); `

## Why use it?
It combines the user-friendliness of data-binding with the flexibility of html string generation.

Setting div.innerHTML with new content normal destroys form values, selections, scroll positions, and A.T. cursors. Sadly, generating HTML these days is incredibly fast and convenient, with everything from templates like Mustache/Handlbars/Jade, to PHP and it's cornucopia of frameworks. If one could simply generate new HTML and show it, apps would be easy to develop. With intraHTML, you can basically update your entire view all the time without the nasty side-effects. This lets any and all template systems seamlessly keep a view updated. 


### How does it work?

1. Turns existing dom branch into a JS-object virtual DOM
2. Turn the new HTML content into a virtual DOM
3. DIFF the existing and new vdom to generate a change list
4. apply the list of changes to the live DOM to update the view

If you have html that defines 1000 table rows and you change 1 row, only 1 row on the screen will be adjusted, preserving text inputs and selections on the 999 unchanged rows.


### How is intraHTML different than react, vue, deku, angular, and others?
intraHTML is less dogmatic; it's just a function that updates the DOM with a string, wherever that string might come from. There is no API, no special way of building components, no list of banned libraries or practices, no build process required, and no browser blacklist; even IE8 works with just a generic ES5 polyfill. In short, there's not much to intraHTML, which means less to get in your way, less to learn, and less to worry about.


### Is it fast?
intraHTML can easily re-render a template and re-sync the DOM at 60FPS on a modest ultrabook. DOM updates are applied at about the same rate as react. Views comprised of hundreds of elements are typically DIFFed in less than a millisecond. While a heavy-investment setup like React will likely scale better to huge interfaces (10,000+ elements), for most real-world applications, intraHTML's updates occur well-within human expectations.





