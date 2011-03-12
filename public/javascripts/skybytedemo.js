function resize_all(){
	Resizes.destroy();
	var els=$('center').getElementsByTagName('*');
	$A(els).each( function(one){ new Resize(one); });
}
function resize_kill(){
	Resizes.destroy();
}
function resize_init(){
	Resizes.destroy();
	new Resize('res1', { 
		min: function(o){ 	var wh=Element.wh(o.element); return {w: wh.w, h: wh.h};  },
		max: function(o){ 	return {w:600,h:400};  }
	});
	new Resize('res2',{proportional:false});
}

//--------------------------------------------
function drags_all(){
	Drags.destroy(); Drops.destroy();
	var els=$('center').getElementsByTagName('*');
	$A(els).each( function(one){ new Drag(one,{self:true}); });
}
function drags_kill(){
	Drags.destroy(); Drops.destroy();
}
function drags_init(){
       // alert('hello');
	Drags.destroy(); Drops.destroy();
	//--------------------------------------------------------
	
	new Drag('webcam',{ caption: 'moving #6', self:true });
        if(document.getElementById('notepad') != undefined)
            {
                new Drag('notepad',{ caption: 'moving #6', self:true });
            }
        if(document.getElementById('sketchpadd') != undefined)
            {
               new Drag('sketchpadd',{ caption: 'moving #6', self:true });
            }
        
	
	//--------------------------------------------------------
	
}

//--------------------------------------------
var Object1 = {
	_mouseMove: function(e){ var oXY1=$('Object1XY'); oXY1.innerHTML='XY1: '+Mouse.x+' x '+Mouse.y+', Element:'+Event.element(Mouse.event).tagName;	}
}

var Object2 = {
	_mouseMove: function(e){ var oXY2=$('Object2XY'); oXY2.innerHTML='XY2: '+Mouse.x+' x '+Mouse.y+', Element:'+Event.element(Mouse.event).tagName; Mouse.x+=10; Mouse.x+=10; Element.putAt(oXY2,Mouse); }
}

