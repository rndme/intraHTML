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


### How is intraHTML's vdom different than react's virtual dom?
intraHTML doesn't require keeping a virtual model synced, so you can use it with use web components, angular, jQuery/bootstrap widgets, and other dom-modifying utilities without breaking the update mechanism. It also doesn't dirty up the DOM with unique IDs, allowing for cleaner and shorter HTML snapshots. Lastly, it doesn't require any conventions or style or tools, it's just a function that updates the DOM with a string, wherever that string might come from.


### Is it fast?
intraHTML can re-render a template and re-sync the DOM at 60FPS on a modest ultrabook. You can just render a template 60 times a second and the user would never be the wiser, unless your content is that rapidly changing. Views comprised of hundreds of elements are typically DIFFed in less than a millisecond. For most applications, update times are well-within human expectations.





