/*  SkyByte.js v1.0-beta, May 17 2007
 *  (c) 2007 Aleksandras Ilarionovas (Alex)
 *
 *  SkyByte.js is freely distributable under the terms of an MIT-style license.
 *  For details, see the SkyByte.net web site: http://www.skybyte.net/scripts/
 *
 *--------------------------------------------------------------------------*/

if(!Prototype){ throw("SkyByte.js requires Prototype.js library"); }
var SkyByte = { Version: '1.2' };

//--------------------------------------------------------------------------
var Browser = {
	cursor:function(cur){ document.body.style.cursor=cur; },
	name  :function(){ var v=navigator.appVersion;
		if(v.match(/\bMSIE\b/)){
			return 'IE';
		}else if(v.match(/Gecko/) && !v.match(/Konqueror|Safari|KHTML/)){
			return 'Geco';
		}else{
			return false;
		}
	}
};
function debug(o){  s=''; for (var n in o){ s+=n+':'+o[n]+'\n'; } alert(s); }

//--------------------------------------------------------------------------
// Syntax: Mouse.start(object: optional) where object._mouseMove(e) = callback function or empty parameter
//         Mouse.stop(object: optional)
// Return: Mouse.x, Mouse.y = current mouse coordinates
var Mouse = {
	callbacks:[], x:0, y:0, event: null,
	start:function(obj){ //start callback or just start observing mouse coordinates
		obj=obj || 'global';
		if(this.callbacks.length===0){
			this.eventMouseMove = this._mouseMove.bindAsEventListener(this);	Event.observe(document, "mousemove", this.eventMouseMove);
		}
		var found = this.callbacks.detect(function(d) { return d==obj; });
		if(!found){ this.callbacks.push(obj); }
	},
	stop:function(obj){ //stop callback or stop observing all
		obj=obj || 'global';
		this.callbacks = this.callbacks.reject(function(d) { return d==obj; });
		if(this.callbacks.length===0){
			Event.stopObserving(document, "mousemove", this.eventMouseMove);
		}
	},
	_mouseMove: function(e){
		var o,i; this.x=Event.pointerX(e); this.y=Event.pointerY(e); this.event=e;
		if(Mouse.callbacks){
			for (i=0, len=Mouse.callbacks.length; i<len; ++i){ o=Mouse.callbacks[i];
				if(typeof o==='object'){ o._mouseMove(e);}
			}
		}
	}
};
//--------------------------------------------------------------------------
Object.extend(Element, {
	add:function(el,attr,style,opt){ var d;
		for (var n in opt)	{ val=opt[n];	if(n==='clone'){ d=val.cloneNode(true); }	}
		if(!d){ d=document.createElement(el);	}
		for (n in attr)	{ d.setAttribute(n,attr[n]); 		}
		for (n in style){ d.style[n.camelize()] = style[n];	}
		for (n in opt)	{ val=opt[n];
			switch(n){
				case 'a':	if(typeof val==='string'){val=$(val);} d=val.appendChild(d);	break;
				case 'c':	d.className=val;	break;
				case 'id':	d.id=val;			break;
				case 'txt': //IE6 bug: The innerHTML property of the TABLE, TFOOT, THEAD, and TR elements are read-only.
				if(d.tagName==="TABLE" || d.tagName==="TFOOT" || d.tagName==="THEAD" || d.tagName==="TR"){
				}else if(d.tagName!='IMG'){ d.innerHTML=val; }
				break;
			}
		} return d;
	},
	rem:function(el){ if(el.parentNode){ d=el.parentNode.removeChild(el); return d; } return false; },
	putAt :function(target,c){
		if(target){
			target.style.left= c.x +'px';
			target.style.top = c.y +'px';
		}
	},
	showAt:function(target,c){
		if(target){
			target.style.left	= c.x +'px';
			target.style.top	= c.y +'px';
			target.style.width	= c.w +'px';
			target.style.height	= c.h +'px';
		}
	},
	xywh:function(el){
		var d = Element.getDimensions(el);
		var c = Position.cumulativeOffset(el);
		return {x:c[0], y:c[1], w:d.width, h:d.height};
	},
	wh:function(el){
		var d = Element.getDimensions(el);
		return {w:d.width, h:d.height};
	}
});

