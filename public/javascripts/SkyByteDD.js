/*  SkyByteDD.js v1.0-beta, May 17 2007
 *  (c) 2007 Aleksandras Ilarionovas (Alex)
 *
 *  SkyByteDD.js is freely distributable under the terms of an MIT-style license.
 *  For details, see the SkyByte.net web site: http://www.skybyte.net/scripts/
 *
 *--------------------------------------------------------------------------*/

if(!Prototype)	 { throw("SkyByteDD.js requires Prototype.js library");	}
else if(!SkyByte){ throw("SkyByteDD.js requires SkyByte.js library");	}

var SkyByteDD = { Version: '1.2' };

var Drags = {
	drag    : null,
	drags   : [],
	hide    : { x:-100, y:-100, w:0, h:0 },
	register: function(obj) {
		if(this.drags.length === 0){
			Mouse.start(this);
			this.eventMouseUp	=this._mouseUp.bindAsEventListener(this);	Event.observe(document,"mouseup",this.eventMouseUp);
			if(Browser.name()==='IE'){
				this.eventMouseOver	=this._mouseOver.bindAsEventListener(this);
				this.eventMouseOut 	=this._mouseOut.bindAsEventListener(this);
			}
			this.div=Element.add('div',{},{},{a:document.body, c:'dragmove'});
			document.body.onselectstart = function () { return false; };	//disable selection in IE
		}
		this.drags.push(obj);
	},
	unregister: function(el){
		this.drags = this.drags.reject(function(d) { return d.element==el; });
	},
	is_drag: function(el){
		return this.drags.detect(function(d) { return d.element==el; });
	},
	destroy: function(){ var i,o,len;
		if(this.drags.length > 0){
			this.drag=null; //could be that elements activated with Drags.activate(el) function
			$A(this.drags).each( function(o){ //so they don't have destroy function from the start
				if(o.destroy){ o.destroy(); }
			});
		}
		if(this.drags.length === 0 && this.div){
			Element.rem(this.div); Mouse.stop(this);
			Event.stopObserving(document, "mouseup", this.eventMouseUp);
		}
	},
	activate: function(drag){
		this.drag = drag; this.drag.IE=false; this.drag.winSize=this._wSize();
		if(this.drag.element.tagName==='IMG' && Browser.name()==='IE'){
			//IE6 fix: when dragging images, loosing mouseover/mouseout event, so we fire those events on entire document
			this.drag.IE=true;
			Event.observe(document, "mouseover", this.eventMouseOver);
			Event.observe(document, "mouseout",  this.eventMouseOut);
		}
	},
	deactivate: function() {
		if(this.drag.IE){
			Event.stopObserving(document, "mouseover", this.eventMouseOver);
			Event.stopObserving(document, "mouseout",  this.eventMouseOut);
		}
		this.drag = null;
	},
	//--------------------IE only----------------------
	//IE6 ugly walkaround: manually detect if drop zone is over mouse and fire event
	_mouseOver: function(e){
		var d=Drops.is_drop(Event.element(e));
		if(d){
			Drops.drop=d;
			Drops.show_frame();
		}
	},
	//IE6 ugly walkaround
	_mouseOut: function(e){
		if(Drops && Drops.lastActive && typeof Drops.lastActive.options.mouseOut==='function'){
			Drops.lastActive.options.mouseOut(Drops.lastActive.element);
			Drops.lastActive=null;
		}
		Drops.hide_frame();
		Drops.drop=null;
	},
	_wSize: function(w){ w=w || window; var T, L, W, H, d;
		if(w.document){ d=w.document;
			if (d.documentElement && d.documentElement.scrollTop) { T=d.documentElement.scrollTop; L=d.documentElement.scrollLeft; }
			else if(d.body){ T=d.body.scrollTop; L=d.body.scrollLeft; }
			if (w.innerWidth) { W=w.innerWidth; H=w.innerHeight; }
			else if (d.documentElement && d.documentElement.clientWidth) { W=d.documentElement.clientWidth; H=d.documentElement.clientHeight; }
			else { W=body.offsetWidth; H=body.offsetHeight; }
		}
		var wx=(L+W); var wy=(T+H);
		return { t: T, l: L, w: W, h: H, wx:wx, wy:wy};
	},
	//--------------------ALL Other--------------------
	_mouseMove: function(e){ if(!this.drag){ return; }
		var p = this.drag._mouseMove(e);//Call MouseMove and return new element position
		Event.stop(e);
		
		if(!p){ return; } //scroll the window if drag object returns coordinates
		var bottom =p.y + p.h;
		//TO DO: Scroll window when dragging
		//var winSize=this.drag.winSize;
		//$('right').innerHTML = Mouse.y +': wy:'+winSize.wy + ', drag:'+bottom;
		//if(bottom > winSize.wy){ window.scrollTo(0, bottom-winSize.wy+10); }
	},
	_mouseUp: function(e){   if(!this.drag){ return; }
		this.drag._mouseUp(e);  //Call MouseUp
		this.drag = null;
		Event.stop(e);
	}
};

//----------------------------------------------------------------------------

var Drag = Class.create();
Drag.prototype = {
	initialize: function(el) {
		this.element = $(el);
		this.options = Object.extend({
			self	 : false,
			classname: 'drag',
			caption  : '',		//moving...
			affect   : false 	//set different rules for all drop zones
		}, arguments[1] || {});
		if(this.options.self){
			this.options.self=this.element.parentNode; Element.makePositioned(this.options.self);
		}
		this.eventMouseDown=this._mouseDown.bindAsEventListener(this);	Event.observe(this.element, "mousedown", this.eventMouseDown);
		Drags.register(this);
	},
	destroy: function(){
		Event.stopObserving(this.element, "mousedown", this.eventMouseDown);
		Drags.unregister(this.element);
	},
	currentDelta: function() { return([
	  parseInt(Element.getStyle(this.options.self,'left') || '0'),
	  parseInt(Element.getStyle(this.options.self,'top') || '0')]);
	},
	_mouseDown:function(e){ var el,pointer,pos;
		if(this.options.self){
			el=this.options.self;
			pointer = [Mouse.x, Mouse.y];
			pos     = Position.cumulativeOffset(el);
			this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]); });
		}

		//Browser.cursor('default');
		Drops.affect=this.options.affect; //tell Drops that this element needs different rules
		Drags.activate(this);
		Event.stop(e);
	},
	_mouseUp:function(e){
		var ok;
		//.........call drop function when mouse released
		Element.putAt(Drags.div,Drags.hide);
		if(this.element && Drops.drop && (this.element!=Drops.drop.element)){
			if(Drops.drop.options.accept===this.element.tagName){ ok=true; }
			if(Drops.drop.options.accept===''){ ok=true; }
			if(Drops.affect){ ok=true; }
			if(ok){
				if(typeof Drops.drop.options.mouseUp==='function'){
					Drops.drop.options.mouseUp(Drops.drop.element,this.element);
				}
			}
		}
		//.........
		Drops.affect=false; //tell Drops to return to normal state
		Drags.deactivate();
		Drops.hide_frame();
		//Event.stop(e); //already stopped
	},
	_mouseMove:function(e){
		var ok,d,pos,point,p,style,el,div,caption;
		if(this.options.self){ el=this.options.self;
			pos = Position.cumulativeOffset(el);
			d = this.currentDelta();
			pos[0] -= d[0]; pos[1] -= d[1];
			point=[]; point.push(Mouse.x); point.push(Mouse.y);
			p=[0,1].map(function(i){ return (point[i]-pos[i]-this.offset[i]) }.bind(this));
			style = el.style;
			style.left = p[0] + "px";
			style.top  = p[1] + "px";
			return Element.xywh(el); //return element new position, so we can scroll the window
		}else{
			//.........set default drag style and caption
			div=Drags.div;	div.className='dragmove'; caption=this.options.caption;
			if(this.element && Drops.drop && (this.element!=Drops.drop.element)){
				if(Drops.drop.options.accept && Drops.drop.options.accept===this.element.tagName){ ok=true; }
				if(Drops.drop.options.accept===''){ ok=true; }
				if(Drops.affect){ ok=true; }
				if(ok){ cap=Drops.drop.options.caption;
					if(cap){ caption=cap; } //take message from Drop Area?
					div.className=this.options.classname;
					if(typeof Drops.drop.options.mouseOver==='function'){
						Drops.lastActive=Drops.drop;
						Drops.drop.options.mouseOver(Drops.drop.element,this.element);
					}
				}
			}
			//.........place div at cursor
			div.innerHTML=caption; Mouse.x+=15; Mouse.y+=10; Element.putAt(div,Mouse);
			return Element.xywh(div); //return element new position, so we can scroll the window
			//.........
		}
		//Event.stop(e); //already stopped
	}

};

//----------------------------------------------------------------------------

var Drops = {
	lastActive	: null,
	frameactive	: null,
	drop		: null,
	affect		: null,
	drops		: [],
	hide		: {	x:-10, y:-10, w:0, h:0	},
	register: function(obj) {
		if(this.drops.length === 0){
			this.L = Element.add('div',{},{},{a:document.body, c:'drop'});
			this.R = Element.add('div',{},{},{a:document.body, c:'drop'});
			this.T = Element.add('div',{},{},{a:document.body, c:'drop'});
			this.B = Element.add('div',{},{},{a:document.body, c:'drop'});
		}
		this.drops.push(obj);
	},
	unregister: function(el){
		this.hide_frame(); //hide frame if mouse over zone
		this.drops = this.drops.reject(function(d) { return d.element==el; });
	},
	destroy: function(){ var i,o,len;
		if(this.drops.length > 0){
			Element.rem(this.L); Element.rem(this.R); Element.rem(this.T); Element.rem(this.B);
			$A(this.drops).each( function(o){
				if(o.destroy){ o.destroy(); } //so they don't have destroy function from the start
			});
			this.drop=null;
			this.hide_frame(); //hide frame if mouse over zone
		}
	},
	is_drop: function(el){
		return this.drops.detect(function(d) { return d.element==el; });
	},
	show_frame: function(){
		this.frameactive=true;
		var pointer=Element.xywh(this.drop.element);
		this.L.className=this.drop.options.classname;
		this.R.className=this.drop.options.classname;
		this.T.className=this.drop.options.classname;
		this.B.className=this.drop.options.classname;
		Element.showAt(this.L,{x:pointer.x, y:pointer.y, w:1, h:pointer.h});
		Element.showAt(this.R,{x:(pointer.x+pointer.w), y:pointer.y, w:1, h:pointer.h});
		Element.showAt(this.T,{x:pointer.x, y:pointer.y, w:pointer.w, h:1});
		Element.showAt(this.B,{x:pointer.x, y:(pointer.y+pointer.h), w:pointer.w, h:1});
	},
	hide_frame: function(){
		if(this.drops.length>0 && this.frameactive){
			this.frameactive=false;
			Element.showAt(this.L,this.hide);
			Element.showAt(this.R,this.hide);
			Element.showAt(this.T,this.hide);
			Element.showAt(this.B,this.hide);
		}
	}
};

//----------------------------------------------------------------------------

var Drop = Class.create();
Drop.prototype = {
	initialize: function(el){
		this.element = $(el);
		this.options = Object.extend({
			caption		: '',		//drop here
			classname	: 'drop',
			accept		: this.element.tagName,
			mouseUp		: null,
			mouseOver	: null,
			mouseOut	: null
		}, arguments[1] || {});
		this.eventMouseOver=this._mouseOver.bindAsEventListener(this);	Event.observe(this.element, "mouseover", this.eventMouseOver);
		this.eventMouseOut =this._mouseOut.bindAsEventListener(this);	Event.observe(this.element, "mouseout",  this.eventMouseOut);
		Drops.register(this);
	},
	destroy: function(){
		Event.stopObserving(this.element, "mouseover", this.eventMouseOver);
		Event.stopObserving(this.element, "mouseout", this.eventMouseOut);
		Drops.unregister(this.element);
	},
	_mouseOver:function(e){
		var d=Drops.is_drop(Event.element(e));
		if(!d){ d=Drops.is_drop(this.element); }
		if(d){
			Drops.drop=d;
			Drops.show_frame();
		}
		Event.stop(e);
	},
	_mouseOut:function(e){
		if(Drops.lastActive && typeof Drops.lastActive.options.mouseOut==='function'){
			Drops.lastActive.options.mouseOut(Drops.lastActive.element);
			Drops.lastActive=null;
		}
		Drops.drop=null;
		Drops.hide_frame();
		Event.stop(e);
	}
};

//----------------------------------------------------------------------------
