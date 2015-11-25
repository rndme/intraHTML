// intraHTML: a better innerHTML (partial/non-destructive updates) for faster and simpler view rendering. (c)2015:dandavis, [CCBY4/MIT]  1.0.0 updated 15/11/12 
// usage: intraHTML(element, strNewInnerHTMLContent);
// includes a slightly modified copy of the odiff JS library by Billy Tetrud, under a modified MIT license per "Free to use for any purpose" from https://github.com/Tixit/odiff/blob/master/odiff.js

(function defineIntraHTML (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    module.exports=factory(); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory()); // AMD
  } else {
     global.intraHTML = factory(global); // script, jq plugin, wsh, asp
  }
}(this, function intraHTMLFactory (pub) {


//   2015-10-22 :: https://github.com/Tixit/odiff - sped up some (typeof vs instanceof), handle sparse arrays better
if(!Number.isNaN) Number.isNaN = function(value) { return typeof value === "number" && isNaN(value);};
if (!Array.isArray) Array.isArray = function(arg) { return Object.prototype.toString.call(arg) === '[object Array]';};
var odiff=function(z,A){function u(b,a,c,d,g,l,m){for(var e=d-l,h=g-m,k=Math.max(e,h),f=1;f<=k;f++){var n=a[d-f],v=c[g-f];if(f<=h&&f<=e&&b(n,v))return{a:d-f,b:g-f};for(var q=0;q<f;q++){var B=a[d-q],p=c[g-q];if(f<=h&&b(B,v))return{a:d-q,b:g-f};if(f<=e&&b(n,p))return{a:d-f,b:g-q}}}return{a:l-1,b:m-1}}function w(b,a){if(b===a)return!0;if(Array.isArray(b)){if(!Array.isArray(a))return!1;for(var c=b.length/15,d=Math.abs(b.length-a.length),g=0,l=b.length;g<l;g++)if(p(b[g],a[g])){if(2<=d&&d>c||d===b.length)return!1;d++}return!0}if("object"==typeof b){if("object"!=typeof a)return!1;var g=x(r(Object.keys(b)),r(Object.keys(a))),l=Object.keys(g).length,c=l/15,d=0,m;for(m in g)if(!p(b[m],a[m])){if(2<=d&&d>c||d+1===l)return!1;d++}return!0}return Number.isNaN(b)&&Number.isNaN(a)}function p(b,a){if(b===a)return!0;if(Array.isArray(b)){if(Array.isArray(a)&&b.length===a.length&&b[0]===a[0]&&String(b)===String(a)){for(var c=0,d=b.length;c<d;c++)if(!p(b[c],a[c]))return!1;return!0}return!1}if("object"==typeof b){if("object"!=typeof a)return!1;var g=Object.keys(b),c=Object.keys(a);if(g.length!==c.length||String(g)!==String(c))return!1;c=0;for(d=g.length;c<d;c++)if(!p(b[g[c]],a[g[c]]))return!1;return!0}return Number.isNaN(b)&&Number.isNaN(a)}function r(b){var a=0,c=b.length,d={};for(a;a<c;a++)d[b[a]]=!0;return d}function x(b,a){for(var c in a)b[c]=a[c];return b}var t=function(b,a,c,d){function g(a,b,c){a.push({type:"set",path:b,val:c})}function l(a,b,c,d,e){a.push({type:"rm",path:b,index:c,num:d,mode:e})}function m(a,b,c,d){a.push({type:"add",path:b,index:c,vals:d})}if(!(b===a||Number.isNaN(b)&&Number.isNaN(a)))if(Array.isArray(b)&&Array.isArray(a)){for(var e=b.length-1,h=a.length-1;0<=e&&0<=h;)if(p(b[e],a[h]))e--,h--;else{for(var k=u(p,b,a,e,h,0,0),f=e;f>k.a&&h>k.b;)if(w(b[f],a[h]))t(b[f],a[h],c,d.concat([f])),f--,h--;else{var e=u(w,b,a,f,h,k.a+1,k.b+1),f=f-e.a,n=h-e.b;1===f&&1===n?g(c,d.concat(e.a+1),a[e.b+1]):1===f&&2===n?(m(c,d,e.a+2,a.slice(e.b+2,h+1)),g(c,d.concat(e.a+1),a[e.b+1])):2===f&&1===n?(l(c,d,e.a+2,1,"I"),g(c,d.concat(e.a+1),a[e.b+1])):2===f&&2===n?(g(c,d.concat(e.a+2),a[e.b+2]),g(c,d.concat(e.a+1),a[e.b+1])):(0<f&&l(c,d,e.a+1,f,"X"),0<n&&m(c,d,e.a+1,a.slice(e.b+1,h+1))),f=e.a,h=e.b}f>k.a?l(c,d,f,f-k.a,"Z"):h>k.b&&m(c,d,f+1,a.slice(k.b+1,h+1)),e=k.a,h=k.b}0<=e?l(c,d,0,e+1):0<=h&&m(c,d,0,a.slice(0,h+1))}else if("object"==typeof b&&"object"==typeof a)for(h in k=x(r(Object.keys(b)),r(Object.keys(a))),k)t(b[h],a[h],c,d.concat([h]));else g(c,d,a)},y=[];return t(z,A,y,[]),y};
// given a string of html, returns a document fragment of that content:
fragmentFromString.temp = document.createElement('template');

function fragmentFromString(strHTML) {
	var temp = fragmentFromString.temp;
	temp.innerHTML = strHTML;
	return temp.content;
}



var elementFromString = function elementFromString(strHTML, containerTagName) {
	var temp = document.createElement(containerTagName || "div");
	temp.innerHTML = strHTML;
	return temp;
};


if("content" in document.createElement("template")) elementFromString = fragmentFromString;


//need to pull from master, rewire these two in, plus the for-loop on apply changes
function forEach(r,f,v){ 
	"use strict";
	if(arguments.length<2) return;
	var m=r.length, i=0;
	for (; i<m; i++) f(r[i],i,r);
}

function filter(r, f) { 
	"use strict";
	var m=r.length, o=[], i=0;		
	for(; i<m; i++) if(f(r[i],i,r)) o.push(r[i]);
	return o;
}


// given an html element or html string, returns a vdom of that markpup:
function fromHTML(source, containerTagName) {

	function scan(ob) {
		var bag = [],
			i = 0,
			v, tag, mx = ob.childNodes.length;

		for(i; i < mx; i++) {

			v = ob.childNodes[i];

			if(v.tagName) { // recurse sub-tags if any

				tag = {
					$: v.tagName.toLowerCase()
				};

				for(var i2 = 0, va = v.attributes, attr, mx2 = va.length; i2 < mx2; i2++) {
					attr = va[i2];
					tag[attr.name] = attr.value;
				}

				tag._=scan(v);
				bag.push(tag);

			} else { //if sub tags? no:			  
				bag.push(v.nodeValue);
			}
		} 
		return bag;
	} // end scan()



	if(typeof source === "string") {
		return scan(elementFromString(source, containerTagName))[0];
	} else {
		return scan({
			tagName: containerTagName||"div",
			attributes: [],
			childNodes: [source]
		})[0];
	}

} //end fromHTML



function resolvePath(path, base) { 
	var last = [], i=0, mx =path.length, out=base, u, k;
        for(i; i<mx; i++){
		k = path[i];
		if(k==="_") k="childNodes";
		last.push(out);
		out = out[k];
		if(out===u) break ;
	};
	return {
		node: out,
		parents: last
	};
}


function resolveAll(path, base) {
	var last = [], i=0, mx =path.length, out=base, u;
        for(i; i<mx; i++){
		last.push(out);
		out = out[path[i]];
		if(out===u) break ;
	};
	return {
		node: out,
		parents: last
	};
}

var singleTags={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1};

function toHT(obj) {
	var attribs = "",
		str,r = [], own = r.hasOwnProperty;
		

	if(obj === str) return "";

	// build attribs from values and functions:
	for(var a in obj) {
		if(!own.call(obj, a) || a === "$" || a === "_") continue;
		str = " " + a;
		if(obj[a] !== "") str += "=" + JSON.stringify(obj[a]);
		attribs += str;
	}

	if(singleTags[obj.$]) return "<" + obj.$ + attribs + " />";

	var und = obj._ || [];
	if(und && !Array.isArray(und)) und = [und];

	r.length = 0;

	for(var i2 = 0, o, mx2 = und.length; i2 < mx2; i2++) {
		o = und[i2] || "";
		r[i2] = typeof o === "object" ? toHT(o) : ("" + o);
	}

	return "<" + obj.$ + attribs + ">" + r.join("") + "</" + obj.$ + ">";
}


//given a change array, applies the changes to the element that's rendering the vdom:  
function applyChanges(change, INDEX, ALLS) {

	var startTime = performance.now(),
	bug = this.debug,
	path = filter(change.path.concat(change.index || change.key), function _pathFilterer(a, b, c) {
		return a != b.xsdgdfg;
	}),
	slice=path.slice,
		lastChange = ALLS[INDEX - 1] || "",
		key = filter(path, function _keyFilterer(a, b, c) {
			return a != b.xsdgdfg;
		}).slice(-1)[0],
		elm = resolvePath(path, this.dest),
		parents = resolveAll(path, this.vdom),
		elmPar=filter(elm.parents, Boolean),
		ochange = {
			type: change.type,
			index: INDEX,
			path: path,
			key: key,
			elm: elm.node || elm.parents.slice(-1)[0],
			elmParents: elmPar,
			elmParent: elmPar.slice(-1)[0],
			dest: this.dest,
			parents: parents,
			parent: parents.parents.slice(-1)[0],
			velm: parents.node,
			vdom: this.vdom,
			isElm: typeof parents.node !== "string", 
			isAttrib: !(key - 0.1) && key != "_" && key != "$",
			change: change
		};

	if(typeof ochange.elm == "function") ochange.elm = ochange.elmParent;
	if(bug) console.info("CHANGE: " + INDEX, ochange);

	switch(change.type) {


	case "set":

		if(!ochange.isAttrib && (typeof change.val === "string" || Array.isArray(change.val))) {

			var cp=ochange.elm;
			if(!ochange.elmParent.childNodes) ochange.elmParent = ochange.elmParent[ochange.key];
			if(!ochange.elm) ochange.elm = ochange.elmParent;
		
			var vals=change.val, val;
			if(!Array.isArray(vals)) vals=[vals];
			
			for(var valIndex=0, maxIndex=vals.length;valIndex<maxIndex;valIndex++){
				val=vals[valIndex];
				
				if(typeof val==="string"){ //add text nodes:
					if(ochange.elm  instanceof NodeList) ochange.elm = filter(ochange.elmParents, function _setStrParFinder(a,b,c){return a.textContent !== a.fsdhjklghdklg; }).pop();
					
					if(ochange.elm.childNodes) {
						if(bug) console.log("set: non attrib, string, elm: ", ochange.key,  [val], ochange.elm.outerHTML );
						var content = document.createTextNode(val);
						
						if(ochange.key==="_"){
							ochange.elm.textContent = val;
						}else{
							if(ochange.key==="$"){
									
								var temp = document.createElement(change.val);
								
								if(bug) console.warn("changing tag name!", change);
								ochange.elm.parentNode.insertBefore(temp, ochange.elm);

								var attrs = ochange.elm.attributes;
								for(var i = 0, mx = attrs.length; i < mx; i++) {
									var a = attrs[i];
									temp.setAttribute(a.name, a.value);
								}
								var kids = ochange.elm.childNodes;
								for(var i = 0, mx = kids.length; i < mx; i++) temp.appendChild(kids[0]);
								ochange.elm.parentNode.removeChild(ochange.elm);
							}else{
								ochange.elm.parentNode.insertBefore(content, ochange.elm);
								ochange.elm.parentNode.removeChild(ochange.elm);
							}
						}
						
						change.elm = content;
					} else {
						if(bug) console.log("set: non attrib, string, not elm", val );
						ochange.elm.textContent = val; //update element
						change.elm = ochange.elm;
					}			
				
				}else{ //add elms:
				
					var content = typeof val === "string" ? document.createTextNode(val) : elementFromString(toHT(val), ochange.elmParent[0] && ochange.elmParent[0].parentNode.tagName).firstChild;
					if(!ochange.elm.parentNode) ochange.elm=ochange.elmParent;
						var old=ochange.elm.childNodes[+key+valIndex];						
						if(old){
							if(bug) console.log("set: non attrib, not string, has old", val );
							ochange.elm.insertBefore(content, old);
							ochange.elm.removeChild(ochange.elm);
						}else{
							if(bug) console.log("set: non attrib, not string, no old, appending", [val, content, content.outerHTML||content.textContent] );
							ochange.elm.appendChild(content);
						}
				}
				
				
				
				if(key=="_"){
					key=0;
					if(!ochange.parent.length) ochange.parent=(ochange.parent._||(ochange.parent._=[]));
				}
				
				if(bug) console.info("attempting key change", +key+valIndex, !!(1.1-key),  key, valIndex, val,  ochange.parent[+key+valIndex], [ochange.parent] );
				

			} ;
			
			break;
		}



		if(ochange.isAttrib) {
			if(key == "$" && String(path) == key) throw new TypeError("You cannot change the root element of an update-bound element: " + ochange.elm.outerHTML);
			if(key == "$") {
				var temp = document.createElement(change.val);
				if(bug) console.warn("changing tag name!", change);
				
				ochange.elm.parentNode.insertBefore(temp, ochange.elm);

				var attrs = ochange.elm.attributes;
				for(var i = 0, mx = attrs.length; i < mx; i++) {
					var a = attrs[i];
					temp.setAttribute(a.name, a.value);
				}
				var kids = ochange.elm.childNodes;
				for(var i = 0, mx = kids.length; i < mx; i++) temp.appendChild(kids[0]);
				change.elm = temp;
				ochange.elm.parentNode.removeChild(ochange.elm);


			} else {
								
				if(!ochange.elm.setAttribute && ochange.elm.parentNode && ochange.elm.parentNode.setAttribute) {
					ochange.elm = ochange.elm.parentNode;
				}		
				
				var cc;
				if(!ochange.elm.setAttribute && (cc=filter(ochange.elmParents, function _setParFinderCC(a,b,c){return a.setAttribute}).slice(-1)[0]).setAttribute) {
					ochange.elm = cc;
				}		
				
				if(change.val===change.dgfjkdfl34534fd){
					ochange.elm.removeAttribute(key); //update element
				}else{
					ochange.elm.setAttribute(key, change.val); //update element
				}
				
				change.elm = ochange.elm;
			}
			
						
			break;
		}

		
		
		
		if(ochange.elm.length && change.val === change.sdgfdf ){
			for(var i6=0, mx6=ochange.elm.length;i6<mx6;i6++) ochange.elm[0].parentNode.removeChild(ochange.elm[0]);				
		}else{
			
			if(ochange.elm instanceof NodeList) ochange.elm= filter(ochange.elmParents,function _setParFinder(a,b,c){return a.textContent !== a.fsdhjklghdklg; }).pop();
			
			var temp = elementFromString(toHT(change.val), ochange.parent.$ ).firstChild;

			if(bug) console.log("element replacing", [ochange.elm.outerHTML || ochange.elm.textContent], " with ", [temp.outerHTML]);
			change.elm=temp;
			ochange.elm.parentNode.insertBefore(temp, ochange.elm);
			ochange.elm.parentNode.removeChild(ochange.elm);
		}
		break;


	case "add":
		if(!ochange.isAttrib) {
				if(ochange.key == "_") {
					ochange.elm = ochange.elm[change.index];
					ochange.key = change.index;
					ochange.parent = ochange.parent._;
					ochange.elmParent = ochange.elmParent.childNodes;
				}
			forEach(change.vals, function _valUpdater(val, i, arrWhole) {

				if(!ochange.elmParent.length) ochange.elmParent = ochange.elmParents.slice(-1)[0].childNodes;
				if(!ochange.elmParent) ochange.elmParent = ochange.elmParents.slice(-2)[0].childNodes;

				var content = typeof val === "string" ? document.createTextNode(val) : elementFromString(toHT(val), ochange.elmParent[0] && ochange.elmParent[0].parentNode.tagName).firstChild,
					ext = ochange.elmParent[ochange.key + i];

				change.elm = content;

				if(ext) {
					ext.parentNode.insertBefore(content, ext);
					ochange.parent.splice(ochange.key + i, 0, val);
				} else {
					if(ochange.elmParent[ochange.key + i]) {
						ochange.elmParent[ochange.key + i] = content;
					} else {
						var it = ochange.elmParents.slice(-1)[0];
						if(it[0]) it = it[it.length-1];
						if(ochange.elm && ochange.elm.length>=ochange.key) it=ochange.elm[0].parentNode;
						
						if(it instanceof NodeList) it= filter(ochange.elmParents,function _addParFinder(a,b,c){return a.textContent !== a.fsdhjklghdklg; }).pop();
						
						if(it !== content) {
							if(it.nodeType != 3) {
								it.appendChild(content);
							} else {
								it.parentNode.insertBefore(content, it);
								it.parentNode.insertBefore(it, content);
							}
						}
					}
				}
			});

		}
		
		break;

	case "rm":


		if(ochange.elmParent.childNodes) ochange.elmParent = ochange.elmParent.childNodes;
		if(ochange.elmParent.length === 0) ochange.elmParent = ochange.elmParents.slice(-3)[0];
		if(ochange.elmParent.childNodes) ochange.elmParent = ochange.elmParent.childNodes;
		if(ochange.parent._) ochange.parent = ochange.parent._;

		// list out what to remove:
		var min = change.index - change.num,
			max = change.index,
		 toRemove = slice.call(ochange.elmParent, min + 1, max + 1);

		if(change.index === 0) { // it starts at zero, the odiff range goes positive instead of couring backwards from 0:
			
			if(bug) console.log("removing many from zero",  slice.call(ochange.parent), ochange.elmParent,"|||", ochange.parent[0], change.index, change.num );
			
			for(var i = change.index, mx = i + change.num; i < mx; i++) {
				ochange.elmParent[change.index].remove();
			}
			change.elm = ochange.elmParent;
		} else {
			

			
			if(change.index-change.num>-1){
				
				if(change.num===1){
					
					toRemove=[ochange.elmParent[change.index]];
					
					if(bug) console.log("removing one", ochange.elmParent,  toRemove[0].outerHTML , change.index, slice.call(ochange.elmParent).map(function _removeOneConsoleMapper(a){
						return a.outerHTML || a.nodeValue;						
					}) , ochange.parent );
					
				}else{
					
					if(change.index+change.num < ochange.elmParent.length+1  ){ 
						
						var ind= change.index;
						if( ind>1 && change.mode==="Z") ind = ind - (change.num-1);						
						
						if(bug) console.log("removing many up",  change.mode, ochange.elmParent, ind, ind+change.num);
						toRemove =slice.call(ochange.elmParent, ind, ind+change.num);
						
					}else{ //count backwards:
						if(bug) console.log("removing many down",  slice.call(ochange.elmParent), change.index-change.num, change.index );
						toRemove =slice.call(ochange.elmParent, (change.index-change.num )+1, (change.index)+1)
					}
				}				
			}else{
				if(bug) console.log("removing many negative",  ochange.elmParent, change.index, change.index+change.num);
				toRemove=slice.call(ochange.elmParent, change.index, change.index+change.num);
			}

			if(toRemove.length) change.elm = toRemove[0].parentNode;

			if(bug) console.log("removing:", toRemove, change, ochange.parent.slice( (change.index-change.num )+1, (change.index)+1)) 
			forEach(toRemove, function _toRemover(a,b,c) {
				a.parentNode.removeChild(a);
			});
		}
		break;
	}
	change.runtime = performance.now() - startTime;

} //end applyChanges() 





function getRenderer(dest, vdom, hint) {

	var it = performance.now();
	if(typeof dest === "string") dest = document.querySelector(dest);
	
	var tag = dest.tagName.toLowerCase(),
		str = dest.outerHTML,
		head = str.slice(0, str.indexOf(">")) + ">",
		inner=str.slice(head.length, str.lastIndexOf("<")-1);
		
	if(hint && hint.trim()===inner.trim()) return {update: Boolean};
	if(!inner) inner = dest.innerHTML = " ";
	if(!vdom) vdom = str;
	
	
	
	if(vdom instanceof Element || typeof vdom === "string" ) vdom = fromHTML(vdom, tag);

	var st=performance.now();

	var state = {
		dest: dest,
		vdom: vdom,
		debug: intraHTML.debug, 
		initTime: st-it,
		update: function(vdom) {

			var st=performance.now();
			if(typeof vdom === "string") {
				var newHT = head + vdom + "</" + tag + ">";
				vdom = fromHTML(newHT, tag);
			}
			state.parseTime= (performance.now() - st);			
			state.vdom2 = vdom;
			st=performance.now();
			state.changes = odiff(state.vdom, vdom) ; 
			state.diffTime= performance.now() - st;
			st=performance.now();
			//state.changes.forEach(applyChanges, state);
			forEach(state.changes, applyChanges.bind(state));
			state.applyTime= performance.now() - st;
			state.vdom = vdom;
			return state;
		}
	};
	getRenderer.last=state;
	return state;
}


  
  
  function intraHTML(elm, content){
	 return intraHTML._last=getRenderer(elm, elm, content),  intraHTML._last.update(content);
  } 
  
  intraHTML.odiff=odiff;
  intraHTML.updater=getRenderer;
  intraHTML.applyChanges = applyChanges;
  intraHTML.toHTML = toHT;
  intraHTML.fromHTML = fromHTML;
  intraHTML.elementFromString=elementFromString;
  
  intraHTML.getRenderer = getRenderer;
 // jQuery plugin:
  if(pub.jQuery) pub.jQuery.fn.intraHTML=function(strContent){
     this.each(function jqiht(i,e){ intraHTML(e, strContent);});
   return this;
  };
  
  return intraHTML;
  
}));
 
