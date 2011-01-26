function $(v,o) { return((typeof(o)=='object'?o:document).getElementById(v)); }
function $S(o) { return((typeof(o)=='object'?o:$(o)).style); }
function agent(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }
function abPos(o) { var o=(typeof(o)=='object'?o:$(o)), z={X:0,Y:0}; while(o!=null) { z.X+=o.offsetLeft; z.Y+=o.offsetTop; o=o.offsetParent; }; return(z); }
function XY(e,v) { var o=agent('msie')?{'X':event.clientX+document.body.scrollLeft,'Y':event.clientY+document.body.scrollTop}:{'X':e.pageX,'Y':e.pageY}; return(v?o[v]:o); }

star={};

star.mouse=function(e,o) { if(star.stop || isNaN(star.stop)) { star.stop=0;

	document.onmousemove=function(e) { var n=star.num;
               //
		var p=abPos($('star'+n)), x=XY(e), oX=x.X-p.X, oY=x.Y-p.Y; star.num=o.id.substr(4);

		if(oX<1 || oX>170 || oY<0 || oY>19) { star.stop=1; star.revert(); }

		else {
 
			$S('starCur'+n).width=oX+'px';
			$S('starUser'+n).color='#111';
			$('starUser'+n).innerHTML=Math.round(oX/17);
		}
	};
} };

star.update=function(e,o) { var n=star.num, v=parseInt($('starUser'+n).innerHTML);

	n=o.id.substr(4); $('starCur'+n).title=v;

	//alert($('info'+n).innerHTML);

	//req=new XMLHttpRequest(); req.open('GET','/ratings/rate?skill='+$('info'+n).innerHTML+'&stars='+v,false); req.send(null);
        post_rating($('info'+n).innerHTML,v);
};

star.revert=function() { var n=star.num, v=parseInt($('starCur'+n).title);

	$S('starCur'+n).width=Math.round(v*170/10)+'px';
	$('starUser'+n).innerHTML=(v>0?v:'');
	$('starUser'+n).style.color='#888';

	document.onmousemove='';

};

star.num=0;

function post_rating(skill,stars)
{
 new Ajax.Updater({success:'rating',failure:'error'}, '/ratings/rate?skill='+skill+'&stars='+stars, {asynchronous:true, evalScripts:true,onComplete:function(request){OS.PageLoadComplete();}, parameters:'authenticity_token=' + encodeURIComponent('CUtXryTu3s++Z8fnSrQmBwrmgRs4r/pI6GIADe4FhNU=')}); return false;
}