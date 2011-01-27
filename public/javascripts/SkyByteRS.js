/*  SkyByteRS.js, May 17 2007
 *  (c) 2007 Aleksandras Ilarionovas (Alex)
 *
 *  SkyByteRS.js is freely distributable under the terms of an MIT-style license.
 *  For details, see the SkyByte.net web site: http://www.skybyte.net/scripts/
 *
 *--------------------------------------------------------------------------*/
if(!Prototype)	 	{ throw("SkyByteRS.js requires Prototype.js library");	}
else if(!SkyByte)	{ throw("SkyByteRS.js requires SkyByte.js library");	}
else if(!SkyByteDD)	{ throw("SkyByteRS.js requires SkyByteDD.js library");	}

var SkyByteRS = { Version: '1.2.4' };

var Resizes = {
	resizes		: [],
	resize		: {},
	resizing	: null,
	frameactive	: false,
	register:function(obj){
		if(this.resizes.length === 0){

			this.L  = Element.add('div',{},{position:'absolute',top:'-50px',left:'-50px'},{c:'resizel', a:document.body});
			this.R  = Element.add('div',{},{position:'absolute',top:'-50px',left:'-50px'},{c:'resizer', a:document.body});
			this.T  = Element.add('div',{},{position:'absolute',top:'-50px',left:'-50px'},{c:'resizet', a:document.body});
			this.B  = Element.add('div',{},{position:'absolute',top:'-50px',left:'-50px'},{c:'resizeb', a:document.body});
			this.box= Element.add('div',{},{position:'absolute',top:'-50px',left:'-50px'},{c:'resizebox', a:document.body});

			this.TM = Element.add('div',{},{cursor:'s-resize' ,overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.TM);
			this.BM = Element.add('div',{},{cursor:'s-resize' ,overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.BM);
			this.LT = Element.add('div',{},{cursor:'se-resize',overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.LT);
			this.LM = Element.add('div',{},{cursor:'e-resize' ,overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.LM);
			this.LB = Element.add('div',{},{cursor:'ne-resize',overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.LB);
			this.RT = Element.add('div',{},{cursor:'sw-resize',overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.RT);
			this.RM = Element.add('div',{},{cursor:'e-resize' ,overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.RM);
			this.RB = Element.add('div',{},{cursor:'nw-resize',overflow:'hidden',position:'absolute',top:'-50px',left:'-50px'},{c:'resizeknob', a:document.body});	Drags.register(this.RB);

 			this.eventMouseDown	=this._mouseDown.bindAsEventListener(this);	//knob event
 			this.eventMouseOver	=this._mouseOver.bindAsEventListener(this);	//knob event
 			this.eventMouseOut	=this._mouseOut.bindAsEventListener(this);	//knob event
			this.eventClick		=this._observeClick.bindAsEventListener(this);	Event.observe(document, "mousedown", this.eventClick); //catch clicks outside element

 			Event.observe(this.TM, "mousedown", this.eventMouseDown);	Event.observe(this.TM, "mouseover", this.eventMouseOver);	Event.observe(this.TM, "mouseout",  this.eventMouseOut);
 			Event.observe(this.BM, "mousedown", this.eventMouseDown);	Event.observe(this.BM, "mouseover", this.eventMouseOver);	Event.observe(this.BM, "mouseout",  this.eventMouseOut);
 			Event.observe(this.LT, "mousedown", this.eventMouseDown);	Event.observe(this.LT, "mouseover", this.eventMouseOver);	Event.observe(this.LT, "mouseout",  this.eventMouseOut);
 			Event.observe(this.LM, "mousedown", this.eventMouseDown);	Event.observe(this.LM, "mouseover", this.eventMouseOver);	Event.observe(this.LM, "mouseout",  this.eventMouseOut);
 			Event.observe(this.LB, "mousedown", this.eventMouseDown);	Event.observe(this.LB, "mouseover", this.eventMouseOver);	Event.observe(this.LB, "mouseout",  this.eventMouseOut);
 			Event.observe(this.RT, "mousedown", this.eventMouseDown);	Event.observe(this.RT, "mouseover", this.eventMouseOver);	Event.observe(this.RT, "mouseout",  this.eventMouseOut);
 			Event.observe(this.RM, "mousedown", this.eventMouseDown);	Event.observe(this.RM, "mouseover", this.eventMouseOver);	Event.observe(this.RM, "mouseout",  this.eventMouseOut);
 			Event.observe(this.RB, "mousedown", this.eventMouseDown);	Event.observe(this.RB, "mouseover", this.eventMouseOver);	Event.observe(this.RB, "mouseout",  this.eventMouseOut);
		}

		this.resizes.push(obj);
	},
	unregister: function(el){
		this.hide_frame();
		this.resizes = this.resizes.reject(function(d) { return d.element==el; });
	},
	destroy: function(){ var i,o;
		if(this.resizes.length > 0){
			$A(this.resizes).each( function(o){
				if(o.destroy){ o.destroy(); }
			});
		}
		if(this.resizes.length === 0 && this.TM){
			this.resize={};
			Element.rem(this.T); Element.rem(this.B); Element.rem(this.L); Element.rem(this.R);
			Drags.unregister(this.TM); Element.rem(this.TM);
			Drags.unregister(this.TB); Element.rem(this.BM);
			Drags.unregister(this.LT); Element.rem(this.LT);
			Drags.unregister(this.LM); Element.rem(this.LM);
			Drags.unregister(this.LB); Element.rem(this.LB);
			Drags.unregister(this.RT); Element.rem(this.RT);
			Drags.unregister(this.RM); Element.rem(this.RM);
			Drags.unregister(this.RB); Element.rem(this.RB);
			Event.stopObserving(this, "mousedown", this.eventMouseDown);
			Event.stopObserving(this, "mouseover", this.eventMouseOver);
			Event.stopObserving(this, "mouseout",  this.eventMouseOut);
			Event.stopObserving(document, "mousedown", this.eventClick);
		}
		this.hide_frame();
	},
	is_resize: function(el){
		return this.resizes.detect(function(d) { return d.element==el; });
	},
	activate  : function(el){
		var r=Resizes.is_resize(el); if(!r){ return; } 
		Resizes.resize=r; this.element=el; 
		this.show_frame(Element.xywh(this.element));
	},
	deactivate: function(){
		this.hide_frame();
	},
	show_frame: function(c){  var opt=this.resize.options; if(this.resizes.length==0){ return; }
		this.frameactive=true;
		if(opt.indicator==true){
			this.box.innerHTML=c.w+'x'+c.h; var bb=Element.wh(this.box); 
			Element.putAt(this.box,{x:c.x+(c.w/2)-(bb.w/2), y:c.y+(c.h/2)-(bb.h/2)}); 
		}
		Element.showAt(this.L,{x:c.x, y:c.y, w:1, h:c.h});
		Element.showAt(this.R,{x:(c.x+c.w), y:c.y, w:1, h:c.h});
		Element.showAt(this.T,{x:c.x, y:c.y, w:c.w, h:1});
		Element.showAt(this.B,{x:c.x, y:(c.y+c.h), w:c.w, h:1});

		Element.putAt(this.TM, {x: c.x+((c.w/2)-4), y: (c.y-2) });
		Element.putAt(this.BM, {x: c.x+((c.w/2)-4), y: c.y+(c.h-4) });
		Element.putAt(this.LT, {x: (c.x-3), y: (c.y-2) });
		Element.putAt(this.LM, {x: (c.x-3), y: c.y+((c.h/2)-3) });
		Element.putAt(this.LB, {x: (c.x-3), y: c.y+(c.h-4) });
		Element.putAt(this.RT, {x: c.x+(c.w-4), y: (c.y-2) });
		Element.putAt(this.RM, {x: c.x+(c.w-4), y: c.y+((c.h/2)-3) });
		Element.putAt(this.RB, {x: c.x+(c.w-4), y: c.y+(c.h-4) });
	},
	hide_frame: function(){
		if(this.frameactive){
			this.show_frame({x:-50,y:-50,w:10,h:10}); this.frameactive=false;
		}
	},
	border:function(el){  
		var cl =Element.add('div',{},{background:'red',border:'0',margin:0,padding:0,visibility:'hidden'},{clone:el, a:el.parentNode});
		var cwh=Element.wh(cl); var ewh=Element.wh(el); Element.rem(cl);
		return {w:(ewh.w-cwh.w), h:(ewh.h-cwh.h)};
	},
	minmax: function(src){ var i,o,xy;
		var minW=0; var minH=0; var maxW=0; var maxH=0;
		//1. find parent outer dimensions 760px;
		var div0 = Element.add('div',{},{},{a:src.parentNode});	var parXY=Element.wh(div0);	Element.rem(div0);

		//2. find owner inner dimensions 300px;
		var div1 = Element.add('div',{},{position:'absolute',top:'0px',left:'0px'},{a:document.body});
		var div2 = Element.add('div',{},{width:'auto',height:'auto',float:'left'},{clone:src, txt:'', a:div1});

		//3. find owner margins
		var outXY=Element.xywh(div1); var innXY=Element.xywh(div2);	Element.rem(div1);
		var ml=innXY.x; var mt=innXY.y; var mr=outXY.w-(innXY.x+innXY.w); var mb=outXY.h-(innXY.y+innXY.h);

		//4. find owner inner dimensions 300px;
		var ownXY=Element.xywh(src);  //target element dimensions
		var els=src.getElementsByTagName('*');
		for (i=0, len=els.length; i<len; ++i){ o=els[i];
			xy=Element.xywh(o); mW=xy.x+xy.w; mH=xy.y+xy.h; if(mW>minW){minW=mW;} if(mH>minH){minH=mH;}
		}

		var a={};
		a.minW=minW-ownXY.x; if(a.minW<0){a.minW=0;}
		a.minH=minH-ownXY.y; if(a.minH<0){a.minH=0;}
		a.maxW=(parXY.w-mr-ml); a.maxH=(parXY.h-mt-mb); //= maxW(760) - margin left - margin right = 740
		a.w=ownXY.w; a.h=ownXY.h;
		//IE bug: element "margin:0 auto;" will return huge margins, [ ...300...] [element] [...300...]
		if(a.maxW<=0 || a.maxW<ownXY.w){ a.maxW=parXY.w; } //=parXY.w 
		if(a.maxH<=0 || a.maxH<ownXY.h){ a.maxH=0; } //=parXY.h  
		return a;
	},
	_mouseMove:function(e){ var rA; if(!this.init){ return; }
		var opt= this.resize.options;
		var m0 = this.init.mouse;
		var mm = this.init.wh;
		var mb = this.init.border;
		var mx = this.init.minmax;
		var pr = opt.proportional;
		var dX=(m0.x-Mouse.x); var dY=(m0.y-Mouse.y); if(mm.h>0){ rA=(mm.w/mm.h); }else{ rA=1; } 
		var newX=(mm.w-dX); var newY=(mm.h-dY);
		switch(this.init.knob){
			case this.RM: newX=(mm.w-dX);									newY=mm.h;			break;
			case this.LM: newX=(mm.w+dX);									newY=mm.h;			break;
			case this.TM: newX=mm.w;										newY=(mm.h+dY);		break;
			case this.BM: newX=mm.w;										newY=(mm.h-dY);		break;
			case this.RT: if(pr){ newX=Math.round((mm.w-(dX*rA)));			newY=(mm.h-dX);	}	break;
			case this.LT: if(pr){ dX=-dX; newX=Math.round((mm.w-(dX*rA)));	newY=(mm.h-dX);	}	break;
			case this.RB: if(pr){ newX=Math.round((mm.w-(dX*rA)));			newY=(mm.h-dX);	}	break;
			case this.LB: if(pr){ dX=-dX; newX=Math.round((mm.w-(dX*rA)));	newY=(mm.h-dX);	}	break;
		}
		if(opt.horizontal)	{ newY=mm.h; }
		if(opt.vertical)	{ newX=mm.w; }
		
		//control inner and outer dimensions
		if(mx.minW){ if(newX<=mx.minW){ newX=mx.minW; } }
		if(mx.minH){ if(newY<=mx.minH){ newY=mx.minH; } }
		if(mx.maxW){ if(newX>=mx.maxW){ newX=mx.maxW; } }
		if(mx.maxH){ if(newY>=mx.maxH){ newY=mx.maxH; } }
		
		newX=newX-mb.w; if(newX<0){newX=0;}
		newY=newY-mb.h; if(newY<0){newY=0;}
			
		this.element.style.width =newX+'px';
		this.element.style.height=newY+'px';
		var p=Element.xywh(this.element);
		this.show_frame(p);
		if(typeof opt.mouseMove==='function'){  opt.mouseMove(this.element); }
		return p;
	},
	_mouseDown:function(e){
		var src=Event.element(e); Event.stop(e);
		if(src.className!='resizeknob'){ return; }
		switch(src){
			case this.TM: Drags.activate(this); break;
			case this.BM: Drags.activate(this); break;
			case this.LT: Drags.activate(this); break;
			case this.LM: Drags.activate(this); break;
			case this.LB: Drags.activate(this); break;
			case this.RT: Drags.activate(this); break;
			case this.RM: Drags.activate(this); break;
			case this.RB: Drags.activate(this); break;
		}
		var mx=this.minmax(this.element); var opt=this.resize.options;
		if(opt.min.w){ mx.minW=opt.min.w; }
		if(opt.min.h){ mx.minH=opt.min.h; }
		if(opt.max.w){ mx.maxW=opt.max.w; }
		if(opt.max.h){ mx.maxH=opt.max.h; }
		this.init = {
			knob	: src,
			mouse	:{ x:Mouse.x, y:Mouse.y },
			wh		:{ w:mx.w, h:mx.h },
			border	: this.border(this.element),
			minmax	: mx
		};
		if(typeof opt.startResize==='function'){ opt.startResize(this.element); }
	},
	_observeClick:function(e){ var el,click;
		if(!this.frameactive){ return; }
		var src=Event.element(e);
		var r=Resizes.is_resize(this.element);
		if(r){
			click=r.options.click;
			if(click==true){
				if(src!=this.element){	this.deactivate(); }
			}else if(click==false){
				//do not destroy selection
			}else{
				el=$(click); if(el==src){ this.deactivate(); }
			}
		}
	},
	_mouseUp:function(e){ var opt= this.resize.options;
		if(typeof opt.endResize==='function'){ opt.endResize(this.element); }	
		this.init=false; Browser.cursor('default');
	},
	_mouseOver:function(e){
		var src=Event.element(e); if(src.className==='resizeknob'){ src.style.background='black'; }
	},
	_mouseOut:function(e){
		var src=Event.element(e); if(src.className==='resizeknob'){ src.style.background='white'; }
	}

};

//----------------------------------------------------------------------------

var Resize = Class.create();
Resize.prototype = {
	initialize: function(el){
		this.element = $(el);
		this.options = Object.extend({
			event		: 'mousedown',
			startResize	: null,
			mouseMove	: null,
			endResize	: null,
			indicator	: true,
			click		: true,
			proportional: true,
			horizontal	: false,
			vertical	: false,
			min			: {w:0,h:0},
			max			: {w:0,h:0}
		}, arguments[1] || {});
		//check for min, max here once, because we may want to pass initial element dimensions, before resizing it
	    if(typeof this.options.min==='function'){
	        this.options.min=this.options.min(this); if(!this.options.min){ this.options.min={w:0,h:0}; }
		}
		if(typeof this.options.max==='function'){
	        this.options.max=this.options.max(this); if(!this.options.max){ this.options.max={w:0,h:0}; }
		}
		this.eventActivate=this.activate.bindAsEventListener(this);	Event.observe(this.element, this.options.event, this.eventActivate);
		Resizes.register(this);
	},
	activate:function(e){
		var el=Event.element(e);
		Resizes.activate(el);
	},
	destroy: function(){
		Event.stopObserving(this.element, this.options.event, this.eventActivate);
		Resizes.unregister(this.element);
	}
};

//----------------------------------------------------------------------------

