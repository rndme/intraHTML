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
var odiff=function(){function u(b,a,d,c,h,m,l){for(var e=c-m,g=h-l,k=Math.max(e,g),f=1;f<=k;f++){var n=a[c-f],v=d[h-f];if(f<=g&&f<=e&&b(n,v))return{a:c-f,b:h-f};for(var q=0;q<f;q++){var y=a[c-q],p=d[h-q];if(f<=g&&b(y,v))return{a:c-q,b:h-f};if(f<=e&&b(n,p))return{a:c-f,b:h-q}}}return{a:m-1,b:l-1}}function w(b,a){if(Array.isArray(b)){if(!Array.isArray(a))return!1;for(var d=b.length/10,c=Math.abs(b.length-a.length),h=0;h<b.length;h++)if(p(b[h],a[h])){if(2<=c&&c>d||c===b.length)return!1;c++}return!0}if("object"==typeof b){if("object"!=typeof a)return!1;if(b===a)return!0;var h=x(r(Object.keys(b)),r(Object.keys(a))),m=Object.keys(h).length,d=m/10,c=0,l;for(l in h)if(!p(b[l],a[l])){if(2<=c&&c>d||c+1===m)return!1;c++}return!0}return Number.isNaN(b)&&Number.isNaN(a)}function p(b,a){if(b===a)return!0;if(Array.isArray(b))return Array.isArray(a)&&b.length===a.length?!b.some(function(a,b,c){return!p(a,this[b])},a):!1;if("object"==typeof b){if("object"!=typeof a)return!1;var d=Object.keys(b),c=Object.keys(a);if(d.length!==c.length)return!1;for(c=0;c<d.length;c++){var h=d[c];if(!p(b[h],a[h]))return!1}return!0}return Number.isNaN(b)&&Number.isNaN(a)}function r(b){var a={};return b.forEach(function(a,b,h){this[a]=!0},a),a}function x(b,a){for(var d in a)b[d]=a[d];return b}var t=function(b,a,d,c){function h(a,b,c){a.push({type:"set",path:b,val:c})}function m(a,b,c,d){a.push({type:"rm",path:b,index:c,num:d})}function l(a,b,c,d){a.push({type:"add",path:b,index:c,vals:d})}if(!(b===a||Number.isNaN(b)&&Number.isNaN(a)))if(b instanceof Array&&a instanceof Array){for(var e=b.length-1,g=a.length-1;0<=e&&0<=g;)if(p(b[e],a[g]))e--,g--;else{for(var k=u(p,b,a,e,g,0,0),f=e;f>k.a&&g>k.b;)if(w(b[f],a[g]))t(b[f],a[g],d,c.concat([f])),f--,g--;else{var e=u(w,b,a,f,g,k.a+1,k.b+1),f=f-e.a,n=g-e.b;1===f&&1===n?h(d,c.concat(e.a+1),a[e.b+1]):1===f&&2===n?(l(d,c,e.a+2,a.slice(e.b+2,g+1)),h(d,c.concat(e.a+1),a[e.b+1])):2===f&&1===n?(m(d,c,e.a+2,1),h(d,c.concat(e.a+1),a[e.b+1])):2===f&&2===n?(h(d,c.concat(e.a+2),a[e.b+2]),h(d,c.concat(e.a+1),a[e.b+1])):(0<f&&m(d,c,e.a+1,f),0<n&&l(d,c,e.a+1,a.slice(e.b+1,g+1))),f=e.a,g=e.b}f>k.a?m(d,c,f,f-k.a):g>k.b&&l(d,c,f+1,a.slice(k.b+1,g+1)),e=k.a,g=k.b}0<=e?m(d,c,0,e+1):0<=g&&l(d,c,0,a.slice(0,g+1))}else if(b instanceof Object&&a instanceof Object)for(k in g=x(r(Object.keys(b)),r(Object.keys(a))),g)g=c.concat([k]),t(b[k],a[k],d,g);else h(d,c,a)};return function(b,a){var d=[];return t(b,a,d,[]),d}}();
  
  
  
  
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


				tag._ = [];
				bag.push.apply(tag._, scan(v));
				if(tag._.length === 0) delete tag._;
				bag.push(tag);

			} else { //if sub tags? no:			  
				bag.push(v.nodeValue);
			}
		} //);
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
	var last = [],
		out, rxKids = /^_$/;
	out = path.reduce(function _resolvePathReducer(o, k) {
		k = ("" + k).replace(rxKids, "childNodes");
		last.push(o);
		return o && o[k];
	}, base);
	return {
		node: out,
		parents: last
	};
}


function resolveAll(path, base) {
	var last = [],
		out;
	out = path.reduce(function _resolveAllReducer(o, k) {
		last.push(o);
		return o && o[k];
	}, base);
	return {
		node: out,
		parents: last
	};
}

var singleTags={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1};

function toHT(obj) {
	var attribs = "",
		str, own = toHT.hasOwnProperty,
		r = [];

	if(obj === undefined) return "";

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
	path = change.path.concat(change.index || change.key).filter(function(a) {
		return a != null;
	}),
		lastChange = ALLS[INDEX - 1] || "",
		key = path.filter(function(a) {
			return a != null;
		}).slice(-1)[0],
		elm = resolvePath(path, this.dest),
		parents = resolveAll(path, this.vdom),
		ochange = {
			type: change.type,
			index: INDEX,
			path: path,
			key: key,
			elm: elm.node || elm.parents.slice(-1)[0],
			elmParents: elm.parents.filter(Boolean),
			elmParent: elm.parents.filter(Boolean).slice(-1)[0],
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




	switch(change.type) {


	case "set":



		if(!ochange.isAttrib && (typeof change.val === "string" || Array.isArray(change.val))) {


			if(!ochange.elmParent.childNodes) ochange.elmParent = ochange.elmParent[ochange.key];
			if(!ochange.elm) ochange.elm = ochange.elmParent;
			if(ochange.elm.childNodes) {

				var content = document.createTextNode(change.val);
				ochange.elm.parentNode.insertBefore(content, ochange.elm);
				ochange.elm.parentNode.removeChild(ochange.elm);
				change.elm = content;
			} else {
				ochange.elm.textContent = change.val; //update element
				change.elm = ochange.elm;
			}
			ochange.parent[key] = change.val; //update velm
			break;
		}



		if(ochange.isAttrib) {
			if(key == "$" && String(path) == key) throw new TypeError("You cannot change the root element of an update-bound element: " + ochange.elm.outerHTML);
			if(key == "$") {
				// change tag name. yikes!
				var temp = document.createElement(change.val);

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
				if(!ochange.elm.setAttribute && ochange.elmParent.setAttribute) {
					ochange.elm = ochange.elmParent;
				}
				ochange.elm.setAttribute(key, change.val); //update element
				change.elm = ochange.elm;
			}
			ochange.parent[key] = change.val; //update velm
			break;
		}

		if(ochange.elm.length && change.val === change.sdgfdf ){
			// remove all the children
			[].slice.call(ochange.elm).forEach(function(a){
				a.parentNode.removeChild(a);				
			});
			delete ochange.parent[key]; //update velm
		}else{
			var temp = elementFromString(toHT(change.val), ochange.parent.$ ).firstChild;

			if(bug) console.log("element replacing", [ochange.elm.outerHTML || ochange.elm.textContent], " with ", [temp.outerHTML]);
			change.elm=temp;
			ochange.elm.parentNode.insertBefore(temp, ochange.elm);
			ochange.elm.parentNode.removeChild(ochange.elm);
			ochange.parent[key] = change.val; //update velm
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
			change.vals.forEach(function _valUpdater(val, i) {

				if(!ochange.elmParent.length) ochange.elmParent = ochange.elmParents.slice(-1)[0].childNodes;

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
						if(it !== content) {
							if(it.nodeType != 3) {
								it.appendChild(content);
							} else {
								it.parentNode.insertBefore(content, it);
								it.parentNode.insertBefore(it, content);
							}
						}
					}
					ochange.parent.splice(ochange.key + i + 0, 0, val);
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
		 toRemove = [].slice.call(ochange.elmParent, min + 1, max + 1);

		if(change.index === 0) { // it starts at zero, the odiff range goes positive instead of couring backwards from 0:
			for(var i = change.index, mx = i + change.num; i < mx; i++) {
				if(ochange.elmParent[change.index]) ochange.elmParent[change.index].remove();
				ochange.parent.splice(change.index, 1);
			}
			change.elm = ochange.elmParent;
		} else {
			
			if(change.index-change.num>-1){
				toRemove=[].slice.call(ochange.elmParent, change.index-change.num, change.index);
			}else{
				toRemove=[].slice.call(ochange.elmParent, change.index, change.index+change.num);
			}

			if(toRemove.length) change.elm = toRemove[0].parentNode;

			toRemove.map(function(a) {
				a.parentNode.removeChild(a);
			});
			ochange.parent.splice( (change.index-change.num )+1, change.num);			
		}
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
		//debug: true,
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
			state.changes = odiff(state.vdom, vdom);
			state.diffTime= performance.now() - st;
			st=performance.now();
			state.changes.forEach(applyChanges, state);
			state.applyTime= performance.now() - st;
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
     this.each(function(i,e){ intraHTML(e, strContent);});
   return this;
  };
  
  return intraHTML;
  
}));
