// FROM: /javascripts/stars.js?1288225651
function $(v,o) { return((typeof(o)=='object'?o:document).getElementById(v)); }
function $S(o) { return((typeof(o)=='object'?o:$(o)).style); }
function agent(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }
function abPos(o) { var o=(typeof(o)=='object'?o:$(o)), z={X:0,Y:0}; while(o!=null) { z.X+=o.offsetLeft; z.Y+=o.offsetTop; o=o.offsetParent; }; return(z); }
function XY(e,v) { var o=agent('msie')?{'X':event.clientX+document.body.scrollLeft,'Y':event.clientY+document.body.scrollTop}:{'X':e.pageX,'Y':e.pageY}; return(v?o[v]:o); }

star={};

star.mouse=function(e,o) { if(star.stop || isNaN(star.stop)) { star.stop=0;

	document.onmousemove=function(e) { var n=star.num;

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


// FROM: /javascripts/curvycorners.js?1288225651
function browserdetect(){var A=navigator.userAgent.toLowerCase();this.isIE=A.indexOf("msie")>-1;this.ieVer=this.isIE?/msie\s(\d\.\d)/.exec(A)[1]:0;this.isMoz=A.indexOf("firefox")!=-1;this.isSafari=A.indexOf("safari")!=-1;this.quirksMode=this.isIE&&(!document.compatMode||document.compatMode.indexOf("BackCompat")>-1);this.isOp="opera" in window;this.isWebKit=A.indexOf("webkit")!=-1;if(this.isIE){this.get_style=function(D,F){if(!(F in D.currentStyle)){return""}var C=/^([\d.]+)(\w*)/.exec(D.currentStyle[F]);if(!C){return D.currentStyle[F]}if(C[1]==0){return"0"}if(C[2]&&C[2]!=="px"){var B=D.style.left;var E=D.runtimeStyle.left;D.runtimeStyle.left=D.currentStyle.left;D.style.left=C[1]+C[2];C[0]=D.style.pixelLeft;D.style.left=B;D.runtimeStyle.left=E}return C[0]}}else{this.get_style=function(B,C){C=C.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();return document.defaultView.getComputedStyle(B,"").getPropertyValue(C)}}}var curvyBrowser=new browserdetect;if(curvyBrowser.isIE){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}}function curvyCnrSpec(A){this.selectorText=A;this.tlR=this.trR=this.blR=this.brR=0;this.tlu=this.tru=this.blu=this.bru="";this.antiAlias=true}curvyCnrSpec.prototype.setcorner=function(B,C,A,D){if(!B){this.tlR=this.trR=this.blR=this.brR=parseInt(A);this.tlu=this.tru=this.blu=this.bru=D}else{propname=B.charAt(0)+C.charAt(0);this[propname+"R"]=parseInt(A);this[propname+"u"]=D}};curvyCnrSpec.prototype.get=function(D){if(/^(t|b)(l|r)(R|u)$/.test(D)){return this[D]}if(/^(t|b)(l|r)Ru$/.test(D)){var C=D.charAt(0)+D.charAt(1);return this[C+"R"]+this[C+"u"]}if(/^(t|b)Ru?$/.test(D)){var B=D.charAt(0);B+=this[B+"lR"]>this[B+"rR"]?"l":"r";var A=this[B+"R"];if(D.length===3&&D.charAt(2)==="u"){A+=this[B="u"]}return A}throw new Error("Don't recognize property "+D)};curvyCnrSpec.prototype.radiusdiff=function(A){if(A!=="t"&&A!=="b"){throw new Error("Param must be 't' or 'b'")}return Math.abs(this[A+"lR"]-this[A+"rR"])};curvyCnrSpec.prototype.setfrom=function(A){this.tlu=this.tru=this.blu=this.bru="px";if("tl" in A){this.tlR=A.tl.radius}if("tr" in A){this.trR=A.tr.radius}if("bl" in A){this.blR=A.bl.radius}if("br" in A){this.brR=A.br.radius}if("antiAlias" in A){this.antiAlias=A.antiAlias}};curvyCnrSpec.prototype.cloneOn=function(G){var E=["tl","tr","bl","br"];var H=0;var C,A;for(C in E){if(!isNaN(C)){A=this[E[C]+"u"];if(A!==""&&A!=="px"){H=new curvyCnrSpec;break}}}if(!H){H=this}else{var B,D,F=curvyBrowser.get_style(G,"left");for(C in E){if(!isNaN(C)){B=E[C];A=this[B+"u"];D=this[B+"R"];if(A!=="px"){var F=G.style.left;G.style.left=D+A;D=G.style.pixelLeft;G.style.left=F}H[B+"R"]=D;H[B+"u"]="px"}}G.style.left=F}return H};curvyCnrSpec.prototype.radiusSum=function(A){if(A!=="t"&&A!=="b"){throw new Error("Param must be 't' or 'b'")}return this[A+"lR"]+this[A+"rR"]};curvyCnrSpec.prototype.radiusCount=function(A){var B=0;if(this[A+"lR"]){++B}if(this[A+"rR"]){++B}return B};curvyCnrSpec.prototype.cornerNames=function(){var A=[];if(this.tlR){A.push("tl")}if(this.trR){A.push("tr")}if(this.blR){A.push("bl")}if(this.brR){A.push("br")}return A};function operasheet(C){var A=document.styleSheets.item(C).ownerNode.text;A=A.replace(/\/\*(\n|\r|.)*?\*\//g,"");var D=new RegExp("^s*([\\w.#][-\\w.#, ]+)[\\n\\s]*\\{([^}]+border-((top|bottom)-(left|right)-)?radius[^}]*)\\}","mg");var G;this.rules=[];while((G=D.exec(A))!==null){var F=new RegExp("(..)border-((top|bottom)-(left|right)-)?radius:\\s*([\\d.]+)(in|em|px|ex|pt)","g");var E,B=new curvyCnrSpec(G[1]);while((E=F.exec(G[2]))!==null){if(E[1]!=="z-"){B.setcorner(E[3],E[4],E[5],E[6])}}this.rules.push(B)}}operasheet.contains_border_radius=function(A){return/border-((top|bottom)-(left|right)-)?radius/.test(document.styleSheets.item(A).ownerNode.text)};function curvyCorners(){var G,D,E,B,J;if(typeof arguments[0]!=="object"){throw curvyCorners.newError("First parameter of curvyCorners() must be an object.")}if(arguments[0] instanceof curvyCnrSpec){B=arguments[0];if(!B.selectorText&&typeof arguments[1]==="string"){B.selectorText=arguments[1]}}else{if(typeof arguments[1]!=="object"&&typeof arguments[1]!=="string"){throw curvyCorners.newError("Second parameter of curvyCorners() must be an object or a class name.")}D=arguments[1];if(typeof D!=="string"){D=""}if(D!==""&&D.charAt(0)!=="."&&"autoPad" in arguments[0]){D="."+D}B=new curvyCnrSpec(D);B.setfrom(arguments[0])}if(B.selectorText){J=0;var I=B.selectorText.replace(/\s+$/,"").split(/,\s*/);E=new Array;function A(M){var L=M.split("#");return(L.length===2?"#":"")+L.pop()}for(G=0;G<I.length;++G){var K=A(I[G]);var H=K.split(" ");switch(K.charAt(0)){case"#":D=H.length===1?K:H[0];D=document.getElementById(D.substr(1));if(D===null){curvyCorners.alert("No object with ID "+K+" exists yet.\nCall curvyCorners(settings, obj) when it is created.")}else{if(H.length===1){E.push(D)}else{E=E.concat(curvyCorners.getElementsByClass(H[1],D))}}break;default:if(H.length===1){E=E.concat(curvyCorners.getElementsByClass(K))}else{var C=curvyCorners.getElementsByClass(H[0]);for(D=0;D<C.length;++D){E=E.concat(curvyCorners.getElementsByClass(H[1],C))}}}}}else{J=1;E=arguments}for(G=J,D=E.length;G<D;++G){if(E[G]&&(!("IEborderRadius" in E[G].style)||E[G].style.IEborderRadius!="set")){if(E[G].className&&E[G].className.indexOf("curvyRedraw")!==-1){if(typeof curvyCorners.redrawList==="undefined"){curvyCorners.redrawList=new Array}curvyCorners.redrawList.push({node:E[G],spec:B,copy:E[G].cloneNode(false)})}E[G].style.IEborderRadius="set";var F=new curvyObject(B,E[G]);F.applyCorners()}}}curvyCorners.prototype.applyCornersToAll=function(){curvyCorners.alert("This function is now redundant. Just call curvyCorners(). See documentation.")};curvyCorners.redraw=function(){if(!curvyBrowser.isOp&&!curvyBrowser.isIE){return}if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.redraw() has nothing to redraw.")}var E=curvyCorners.bock_redraw;curvyCorners.block_redraw=true;for(var A in curvyCorners.redrawList){if(isNaN(A)){continue}var D=curvyCorners.redrawList[A];if(!D.node.clientWidth){continue}var B=D.copy.cloneNode(false);for(var C=D.node.firstChild;C!=null;C=C.nextSibling){if(C.className==="autoPadDiv"){break}}if(!C){curvyCorners.alert("Couldn't find autoPad DIV");break}D.node.parentNode.replaceChild(B,D.node);while(C.firstChild){B.appendChild(C.removeChild(C.firstChild))}D=new curvyObject(D.spec,D.node=B);D.applyCorners()}curvyCorners.block_redraw=E};curvyCorners.adjust=function(obj,prop,newval){if(curvyBrowser.isOp||curvyBrowser.isIE){if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.adjust() has nothing to adjust.")}var i,j=curvyCorners.redrawList.length;for(i=0;i<j;++i){if(curvyCorners.redrawList[i].node===obj){break}}if(i===j){throw curvyCorners.newError("Object not redrawable")}obj=curvyCorners.redrawList[i].copy}if(prop.indexOf(".")===-1){obj[prop]=newval}else{eval("obj."+prop+"='"+newval+"'")}};curvyCorners.handleWinResize=function(){if(!curvyCorners.block_redraw){curvyCorners.redraw()}};curvyCorners.setWinResize=function(A){curvyCorners.block_redraw=!A};curvyCorners.newError=function(A){return new Error("curvyCorners Error:\n"+A)};curvyCorners.alert=function(A){if(typeof curvyCornersVerbose==="undefined"||curvyCornersVerbose){alert(A)}};function curvyObject(){var U;this.box=arguments[1];this.settings=arguments[0];this.topContainer=this.bottomContainer=this.shell=U=null;var K=this.box.clientWidth;if(!K&&curvyBrowser.isIE){this.box.style.zoom=1;K=this.box.clientWidth}if(!K){if(!this.box.parentNode){throw this.newError("box has no parent!")}for(U=this.box;;U=U.parentNode){if(!U||U.tagName==="BODY"){this.applyCorners=function(){};curvyCorners.alert(this.errmsg("zero-width box with no accountable parent","warning"));return}if(U.style.display==="none"){break}}U.style.display="block";K=this.box.clientWidth}if(arguments[0] instanceof curvyCnrSpec){this.spec=arguments[0].cloneOn(this.box)}else{this.spec=new curvyCnrSpec("");this.spec.setfrom(this.settings)}var b=curvyBrowser.get_style(this.box,"borderTopWidth");var J=curvyBrowser.get_style(this.box,"borderBottomWidth");var D=curvyBrowser.get_style(this.box,"borderLeftWidth");var B=curvyBrowser.get_style(this.box,"borderRightWidth");var I=curvyBrowser.get_style(this.box,"borderTopColor");var G=curvyBrowser.get_style(this.box,"borderBottomColor");var A=curvyBrowser.get_style(this.box,"borderLeftColor");var E=curvyBrowser.get_style(this.box,"backgroundColor");var C=curvyBrowser.get_style(this.box,"backgroundImage");var Y=curvyBrowser.get_style(this.box,"backgroundRepeat");if(this.box.currentStyle&&this.box.currentStyle.backgroundPositionX){var R=curvyBrowser.get_style(this.box,"backgroundPositionX");var P=curvyBrowser.get_style(this.box,"backgroundPositionY")}else{var R=curvyBrowser.get_style(this.box,"backgroundPosition");R=R.split(" ");var P=R[1];R=R[0]}var O=curvyBrowser.get_style(this.box,"position");var Z=curvyBrowser.get_style(this.box,"paddingTop");var c=curvyBrowser.get_style(this.box,"paddingBottom");var Q=curvyBrowser.get_style(this.box,"paddingLeft");var a=curvyBrowser.get_style(this.box,"paddingRight");var S=curvyBrowser.get_style(this.box,"border");filter=curvyBrowser.ieVer>7?curvyBrowser.get_style(this.box,"filter"):null;var H=this.spec.get("tR");var M=this.spec.get("bR");var W=function(f){if(typeof f==="number"){return f}if(typeof f!=="string"){throw new Error("unexpected styleToNPx type "+typeof f)}var d=/^[-\d.]([a-z]+)$/.exec(f);if(d&&d[1]!="px"){throw new Error("Unexpected unit "+d[1])}if(isNaN(f=parseInt(f))){f=0}return f};var T=function(d){return d<=0?"0":d+"px"};try{this.borderWidth=W(b);this.borderWidthB=W(J);this.borderWidthL=W(D);this.borderWidthR=W(B);this.boxColour=curvyObject.format_colour(E);this.topPadding=W(Z);this.bottomPadding=W(c);this.leftPadding=W(Q);this.rightPadding=W(a);this.boxWidth=K;this.boxHeight=this.box.clientHeight;this.borderColour=curvyObject.format_colour(I);this.borderColourB=curvyObject.format_colour(G);this.borderColourL=curvyObject.format_colour(A);this.borderString=this.borderWidth+"px solid "+this.borderColour;this.borderStringB=this.borderWidthB+"px solid "+this.borderColourB;this.backgroundImage=((C!="none")?C:"");this.backgroundRepeat=Y}catch(X){throw this.newError("getMessage" in X?X.getMessage():X.message)}var F=this.boxHeight;var V=K;if(curvyBrowser.isOp){R=W(R);P=W(P);if(R){var N=V+this.borderWidthL+this.borderWidthR;if(R>N){R=N}R=(N/R*100)+"%"}if(P){var N=F+this.borderWidth+this.borderWidthB;if(P>N){P=N}P=(N/P*100)+"%"}}if(curvyBrowser.quirksMode){}else{this.boxWidth-=this.leftPadding+this.rightPadding;this.boxHeight-=this.topPadding+this.bottomPadding}this.contentContainer=document.createElement("div");if(filter){this.contentContainer.style.filter=filter}while(this.box.firstChild){this.contentContainer.appendChild(this.box.removeChild(this.box.firstChild))}if(O!="absolute"){this.box.style.position="relative"}this.box.style.padding="0";this.box.style.border=this.box.style.backgroundImage="none";this.box.style.backgroundColor="transparent";this.box.style.width=(V+this.borderWidthL+this.borderWidthR)+"px";this.box.style.height=(F+this.borderWidth+this.borderWidthB)+"px";var L=document.createElement("div");L.style.position="absolute";if(filter){L.style.filter=filter}if(curvyBrowser.quirksMode){L.style.width=(V+this.borderWidthL+this.borderWidthR)+"px"}else{L.style.width=V+"px"}L.style.height=T(F+this.borderWidth+this.borderWidthB-H-M);L.style.padding="0";L.style.top=H+"px";L.style.left="0";if(this.borderWidthL){L.style.borderLeft=this.borderWidthL+"px solid "+this.borderColourL}if(this.borderWidth&&!H){L.style.borderTop=this.borderWidth+"px solid "+this.borderColour}if(this.borderWidthR){L.style.borderRight=this.borderWidthR+"px solid "+this.borderColourL}if(this.borderWidthB&&!M){L.style.borderBottom=this.borderWidthB+"px solid "+this.borderColourB}L.style.backgroundColor=E;L.style.backgroundImage=this.backgroundImage;L.style.backgroundRepeat=this.backgroundRepeat;this.shell=this.box.appendChild(L);K=curvyBrowser.get_style(this.shell,"width");if(K===""||K==="auto"||K.indexOf("%")!==-1){throw this.newError("Shell width is "+K)}this.boxWidth=(K!=""&&K!="auto"&&K.indexOf("%")==-1)?parseInt(K):this.shell.clientWidth;this.applyCorners=function(){if(this.backgroundObject){var w=function(AO,i,t){if(AO===0){return 0}var k;if(AO==="right"||AO==="bottom"){return t-i}if(AO==="center"){return(t-i)/2}if(AO.indexOf("%")>0){return(t-i)*100/parseInt(AO)}return W(AO)};this.backgroundPosX=w(R,this.backgroundObject.width,V);this.backgroundPosY=w(P,this.backgroundObject.height,F)}else{if(this.backgroundImage){this.backgroundPosX=W(R);this.backgroundPosY=W(P)}}if(H){v=document.createElement("div");v.style.width=this.boxWidth+"px";v.style.fontSize="1px";v.style.overflow="hidden";v.style.position="absolute";v.style.paddingLeft=this.borderWidth+"px";v.style.paddingRight=this.borderWidth+"px";v.style.height=H+"px";v.style.top=-H+"px";v.style.left=-this.borderWidthL+"px";this.topContainer=this.shell.appendChild(v)}if(M){var v=document.createElement("div");v.style.width=this.boxWidth+"px";v.style.fontSize="1px";v.style.overflow="hidden";v.style.position="absolute";v.style.paddingLeft=this.borderWidthB+"px";v.style.paddingRight=this.borderWidthB+"px";v.style.height=M+"px";v.style.bottom=-M+"px";v.style.left=-this.borderWidthL+"px";this.bottomContainer=this.shell.appendChild(v)}var AG=this.spec.cornerNames();for(var AK in AG){if(!isNaN(AK)){var AC=AG[AK];var AD=this.spec[AC+"R"];var AE,AH,j,AF;if(AC=="tr"||AC=="tl"){AE=this.borderWidth;AH=this.borderColour;AF=this.borderWidth}else{AE=this.borderWidthB;AH=this.borderColourB;AF=this.borderWidthB}j=AD-AF;var u=document.createElement("div");u.style.height=this.spec.get(AC+"Ru");u.style.width=this.spec.get(AC+"Ru");u.style.position="absolute";u.style.fontSize="1px";u.style.overflow="hidden";var r,q,p;var n=filter?parseInt(/alpha\(opacity.(\d+)\)/.exec(filter)[1]):100;for(r=0;r<AD;++r){var m=(r+1>=j)?-1:Math.floor(Math.sqrt(Math.pow(j,2)-Math.pow(r+1,2)))-1;if(j!=AD){var h=(r>=j)?-1:Math.ceil(Math.sqrt(Math.pow(j,2)-Math.pow(r,2)));var f=(r+1>=AD)?-1:Math.floor(Math.sqrt(Math.pow(AD,2)-Math.pow((r+1),2)))-1}var d=(r>=AD)?-1:Math.ceil(Math.sqrt(Math.pow(AD,2)-Math.pow(r,2)));if(m>-1){this.drawPixel(r,0,this.boxColour,n,(m+1),u,true,AD)}if(j!=AD){if(this.spec.antiAlias){for(q=m+1;q<h;++q){if(this.backgroundImage!=""){var g=curvyObject.pixelFraction(r,q,j)*100;this.drawPixel(r,q,AH,n,1,u,g>=30,AD)}else{if(this.boxColour!=="transparent"){var AB=curvyObject.BlendColour(this.boxColour,AH,curvyObject.pixelFraction(r,q,j));this.drawPixel(r,q,AB,n,1,u,false,AD)}else{this.drawPixel(r,q,AH,n>>1,1,u,false,AD)}}}if(f>=h){if(h==-1){h=0}this.drawPixel(r,h,AH,n,(f-h+1),u,false,0)}p=AH;q=f}else{if(f>m){this.drawPixel(r,(m+1),AH,n,(f-m),u,false,0)}}}else{p=this.boxColour;q=m}if(this.spec.antiAlias){while(++q<d){this.drawPixel(r,q,p,(curvyObject.pixelFraction(r,q,AD)*n),1,u,AF<=0,AD)}}}for(var y=0,AJ=u.childNodes.length;y<AJ;++y){var s=u.childNodes[y];var AI=parseInt(s.style.top);var AM=parseInt(s.style.left);var AN=parseInt(s.style.height);if(AC=="tl"||AC=="bl"){s.style.left=(AD-AM-1)+"px"}if(AC=="tr"||AC=="tl"){s.style.top=(AD-AN-AI)+"px"}s.style.backgroundRepeat=this.backgroundRepeat;if(this.backgroundImage){switch(AC){case"tr":s.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL+AD-V-AM)+"px "+(this.backgroundPosY+AN+AI+this.borderWidth-AD)+"px";break;case"tl":s.style.backgroundPosition=(this.backgroundPosX-AD+AM+this.borderWidthL)+"px "+(this.backgroundPosY-AD+AN+AI+this.borderWidth)+"px";break;case"bl":s.style.backgroundPosition=(this.backgroundPosX-AD+AM+1+this.borderWidthL)+"px "+(this.backgroundPosY-F-this.borderWidth+(curvyBrowser.quirksMode?AI:-AI)+AD)+"px";break;case"br":if(curvyBrowser.quirksMode){s.style.backgroundPosition=(this.backgroundPosX+this.borderWidthL-V+AD-AM)+"px "+(this.backgroundPosY-F-this.borderWidth+AI+AD)+"px"}else{s.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL-V+AD-AM)+"px "+(this.backgroundPosY-F-this.borderWidth+AD-AI)+"px"}}}}switch(AC){case"tl":u.style.top=u.style.left="0";this.topContainer.appendChild(u);break;case"tr":u.style.top=u.style.right="0";this.topContainer.appendChild(u);break;case"bl":u.style.bottom=u.style.left="0";this.bottomContainer.appendChild(u);break;case"br":u.style.bottom=u.style.right="0";this.bottomContainer.appendChild(u)}}}var x={t:this.spec.radiusdiff("t"),b:this.spec.radiusdiff("b")};for(z in x){if(typeof z==="function"){continue}if(!this.spec.get(z+"R")){continue}if(x[z]){if(this.backgroundImage&&this.spec.radiusSum(z)!==x[z]){curvyCorners.alert(this.errmsg("Not supported: unequal non-zero top/bottom radii with background image"))}var AL=(this.spec[z+"lR"]<this.spec[z+"rR"])?z+"l":z+"r";var l=document.createElement("div");l.style.height=x[z]+"px";l.style.width=this.spec.get(AL+"Ru");l.style.position="absolute";l.style.fontSize="1px";l.style.overflow="hidden";l.style.backgroundColor=this.boxColour;switch(AL){case"tl":l.style.bottom=l.style.left="0";l.style.borderLeft=this.borderString;this.topContainer.appendChild(l);break;case"tr":l.style.bottom=l.style.right="0";l.style.borderRight=this.borderString;this.topContainer.appendChild(l);break;case"bl":l.style.top=l.style.left="0";l.style.borderLeft=this.borderStringB;this.bottomContainer.appendChild(l);break;case"br":l.style.top=l.style.right="0";l.style.borderRight=this.borderStringB;this.bottomContainer.appendChild(l)}}var o=document.createElement("div");if(filter){o.style.filter=filter}o.style.position="relative";o.style.fontSize="1px";o.style.overflow="hidden";o.style.width=this.fillerWidth(z);o.style.backgroundColor=this.boxColour;o.style.backgroundImage=this.backgroundImage;o.style.backgroundRepeat=this.backgroundRepeat;switch(z){case"t":if(this.topContainer){if(curvyBrowser.quirksMode){o.style.height=100+H+"px"}else{o.style.height=100+H-this.borderWidth+"px"}o.style.marginLeft=this.spec.tlR?(this.spec.tlR-this.borderWidthL)+"px":"0";o.style.borderTop=this.borderString;if(this.backgroundImage){var AA=this.spec.tlR?(this.backgroundPosX-(H-this.borderWidthL))+"px ":"0 ";o.style.backgroundPosition=AA+this.backgroundPosY+"px";this.shell.style.backgroundPosition=this.backgroundPosX+"px "+(this.backgroundPosY-H+this.borderWidthL)+"px"}this.topContainer.appendChild(o)}break;case"b":if(this.bottomContainer){if(curvyBrowser.quirksMode){o.style.height=M+"px"}else{o.style.height=M-this.borderWidthB+"px"}o.style.marginLeft=this.spec.blR?(this.spec.blR-this.borderWidthL)+"px":"0";o.style.borderBottom=this.borderStringB;if(this.backgroundImage){var AA=this.spec.blR?(this.backgroundPosX+this.borderWidthL-M)+"px ":this.backgroundPosX+"px ";o.style.backgroundPosition=AA+(this.backgroundPosY-F-this.borderWidth+M)+"px"}this.bottomContainer.appendChild(o)}}}this.contentContainer.style.position="absolute";this.contentContainer.className="autoPadDiv";this.contentContainer.style.left=this.borderWidthL+"px";this.contentContainer.style.paddingTop=this.topPadding+"px";this.contentContainer.style.top=this.borderWidth+"px";this.contentContainer.style.paddingLeft=this.leftPadding+"px";this.contentContainer.style.paddingRight=this.rightPadding+"px";z=V;if(!curvyBrowser.quirksMode){z-=this.leftPadding+this.rightPadding}this.contentContainer.style.width=z+"px";this.contentContainer.style.textAlign=curvyBrowser.get_style(this.box,"textAlign");this.box.style.textAlign="left";this.box.appendChild(this.contentContainer);if(U){U.style.display="none"}};if(this.backgroundImage){R=this.backgroundCheck(R);P=this.backgroundCheck(P);if(this.backgroundObject){this.backgroundObject.holdingElement=this;this.dispatch=this.applyCorners;this.applyCorners=function(){if(this.backgroundObject.complete){this.dispatch()}else{this.backgroundObject.onload=new Function("curvyObject.dispatch(this.holdingElement);")}}}}}curvyObject.prototype.backgroundCheck=function(B){if(B==="top"||B==="left"||parseInt(B)===0){return 0}if(!(/^[-\d.]+px$/.test(B))&&!this.backgroundObject){this.backgroundObject=new Image;var A=function(D){var C=/url\("?([^'"]+)"?\)/.exec(D);return(C?C[1]:D)};this.backgroundObject.src=A(this.backgroundImage)}return B};curvyObject.dispatch=function(A){if("dispatch" in A){A.dispatch()}else{throw A.newError("No dispatch function")}};curvyObject.prototype.drawPixel=function(J,G,A,F,H,I,C,E){var B=document.createElement("div");B.style.height=H+"px";B.style.width="1px";B.style.position="absolute";B.style.fontSize="1px";B.style.overflow="hidden";var D=this.spec.get("tR");B.style.backgroundColor=A;if(C&&this.backgroundImage!=""){B.style.backgroundImage=this.backgroundImage;B.style.backgroundPosition="-"+(this.boxWidth-(E-J)+this.borderWidth)+"px -"+((this.boxHeight+D+G)-this.borderWidth)+"px"}if(F!=100){curvyObject.setOpacity(B,F)}B.style.top=G+"px";B.style.left=J+"px";I.appendChild(B)};curvyObject.prototype.fillerWidth=function(A){var B=curvyBrowser.quirksMode?0:this.spec.radiusCount(A)*this.borderWidthL;return(this.boxWidth-this.spec.radiusSum(A)+B)+"px"};curvyObject.prototype.errmsg=function(C,D){var B="\ntag: "+this.box.tagName;if(this.box.id){B+="\nid: "+this.box.id}if(this.box.className){B+="\nclass: "+this.box.className}var A;if((A=this.box.parentNode)===null){B+="\n(box has no parent)"}else{B+="\nParent tag: "+A.tagName;if(A.id){B+="\nParent ID: "+A.id}if(A.className){B+="\nParent class: "+A.className}}if(D===undefined){D="warning"}return"curvyObject "+D+":\n"+C+B};curvyObject.prototype.newError=function(A){return new Error(this.errmsg(A,"exception"))};curvyObject.IntToHex=function(B){var A=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];return A[B>>>4]+""+A[B&15]};curvyObject.BlendColour=function(L,J,G){if(L==="transparent"||J==="transparent"){throw this.newError("Cannot blend with transparent")}if(L.charAt(0)!=="#"){L=curvyObject.format_colour(L)}if(J.charAt(0)!=="#"){J=curvyObject.format_colour(J)}var D=parseInt(L.substr(1,2),16);var K=parseInt(L.substr(3,2),16);var F=parseInt(L.substr(5,2),16);var C=parseInt(J.substr(1,2),16);var I=parseInt(J.substr(3,2),16);var E=parseInt(J.substr(5,2),16);if(G>1||G<0){G=1}var H=Math.round((D*G)+(C*(1-G)));if(H>255){H=255}if(H<0){H=0}var B=Math.round((K*G)+(I*(1-G)));if(B>255){B=255}if(B<0){B=0}var A=Math.round((F*G)+(E*(1-G)));if(A>255){A=255}if(A<0){A=0}return"#"+curvyObject.IntToHex(H)+curvyObject.IntToHex(B)+curvyObject.IntToHex(A)};curvyObject.pixelFraction=function(H,G,A){var J;var E=A*A;var B=new Array(2);var F=new Array(2);var I=0;var C="";var D=Math.sqrt(E-Math.pow(H,2));if(D>=G&&D<(G+1)){C="Left";B[I]=0;F[I]=D-G;++I}D=Math.sqrt(E-Math.pow(G+1,2));if(D>=H&&D<(H+1)){C+="Top";B[I]=D-H;F[I]=1;++I}D=Math.sqrt(E-Math.pow(H+1,2));if(D>=G&&D<(G+1)){C+="Right";B[I]=1;F[I]=D-G;++I}D=Math.sqrt(E-Math.pow(G,2));if(D>=H&&D<(H+1)){C+="Bottom";B[I]=D-H;F[I]=0}switch(C){case"LeftRight":J=Math.min(F[0],F[1])+((Math.max(F[0],F[1])-Math.min(F[0],F[1]))/2);break;case"TopRight":J=1-(((1-B[0])*(1-F[1]))/2);break;case"TopBottom":J=Math.min(B[0],B[1])+((Math.max(B[0],B[1])-Math.min(B[0],B[1]))/2);break;case"LeftBottom":J=F[0]*B[1]/2;break;default:J=1}return J};curvyObject.rgb2Array=function(A){var B=A.substring(4,A.indexOf(")"));return B.split(", ")};curvyObject.rgb2Hex=function(B){try{var C=curvyObject.rgb2Array(B);var G=parseInt(C[0]);var E=parseInt(C[1]);var A=parseInt(C[2]);var D="#"+curvyObject.IntToHex(G)+curvyObject.IntToHex(E)+curvyObject.IntToHex(A)}catch(F){var H="getMessage" in F?F.getMessage():F.message;throw new Error("Error ("+H+") converting RGB value to Hex in rgb2Hex")}return D};curvyObject.setOpacity=function(F,C){C=(C==100)?99.999:C;if(curvyBrowser.isSafari&&F.tagName!="IFRAME"){var B=curvyObject.rgb2Array(F.style.backgroundColor);var E=parseInt(B[0]);var D=parseInt(B[1]);var A=parseInt(B[2]);F.style.backgroundColor="rgba("+E+", "+D+", "+A+", "+C/100+")"}else{if(typeof F.style.opacity!=="undefined"){F.style.opacity=C/100}else{if(typeof F.style.MozOpacity!=="undefined"){F.style.MozOpacity=C/100}else{if(typeof F.style.filter!="undefined"){F.style.filter="alpha(opacity="+C+")"}else{if(typeof F.style.KHTMLOpacity!="undefined"){F.style.KHTMLOpacity=C/100}}}}}};function addEvent(D,C,B,A){if(D.addEventListener){D.addEventListener(C,B,A);return true}if(D.attachEvent){return D.attachEvent("on"+C,B)}D["on"+C]=B;return false}curvyObject.getComputedColour=function(E){var F=document.createElement("DIV");F.style.backgroundColor=E;document.body.appendChild(F);if(window.getComputedStyle){var D=document.defaultView.getComputedStyle(F,null).getPropertyValue("background-color");F.parentNode.removeChild(F);if(D.substr(0,3)==="rgb"){D=curvyObject.rgb2Hex(D)}return D}else{var A=document.body.createTextRange();A.moveToElementText(F);A.execCommand("ForeColor",false,E);var B=A.queryCommandValue("ForeColor");var C="rgb("+(B&255)+", "+((B&65280)>>8)+", "+((B&16711680)>>16)+")";F.parentNode.removeChild(F);A=null;return curvyObject.rgb2Hex(C)}};curvyObject.format_colour=function(A){if(A!=""&&A!="transparent"){if(A.substr(0,3)==="rgb"){A=curvyObject.rgb2Hex(A)}else{if(A.charAt(0)!=="#"){A=curvyObject.getComputedColour(A)}else{if(A.length===4){A="#"+A.charAt(1)+A.charAt(1)+A.charAt(2)+A.charAt(2)+A.charAt(3)+A.charAt(3)}}}}return A};curvyCorners.getElementsByClass=function(H,F){var E=new Array;if(F===undefined){F=document}H=H.split(".");var A="*";if(H.length===1){A=H[0];H=false}else{if(H[0]){A=H[0]}H=H[1]}var D,C,B;if(A.charAt(0)==="#"){C=document.getElementById(A.substr(1));if(C){E.push(C)}}else{C=F.getElementsByTagName(A);B=C.length;if(H){var G=new RegExp("(^|\\s)"+H+"(\\s|$)");for(D=0;D<B;++D){if(G.test(C[D].className)){E.push(C[D])}}}else{for(D=0;D<B;++D){E.push(C[D])}}}return E};if(curvyBrowser.isMoz||curvyBrowser.isWebKit){var curvyCornersNoAutoScan=true}else{curvyCorners.scanStyles=function(){function B(F){var G=/^[\d.]+(\w+)$/.exec(F);return G[1]}var E,D,C;if(curvyBrowser.isIE){function A(L){var J=L.style;if(curvyBrowser.ieVer>6){var H=J["-webkit-border-radius"]||0;var K=J["-webkit-border-top-right-radius"]||0;var F=J["-webkit-border-top-left-radius"]||0;var G=J["-webkit-border-bottom-right-radius"]||0;var M=J["-webkit-border-bottom-left-radius"]||0}else{var H=J["webkit-border-radius"]||0;var K=J["webkit-border-top-right-radius"]||0;var F=J["webkit-border-top-left-radius"]||0;var G=J["webkit-border-bottom-right-radius"]||0;var M=J["webkit-border-bottom-left-radius"]||0}if(H||F||K||G||M){var I=new curvyCnrSpec(L.selectorText);if(H){I.setcorner(null,null,parseInt(H),B(H))}else{if(K){I.setcorner("t","r",parseInt(K),B(K))}if(F){I.setcorner("t","l",parseInt(F),B(F))}if(M){I.setcorner("b","l",parseInt(M),B(M))}if(G){I.setcorner("b","r",parseInt(G),B(G))}}curvyCorners(I)}}for(E=0;E<document.styleSheets.length;++E){if(document.styleSheets[E].imports){for(D=0;D<document.styleSheets[E].imports.length;++D){for(C=0;C<document.styleSheets[E].imports[D].rules.length;++C){A(document.styleSheets[E].imports[D].rules[C])}}}for(D=0;D<document.styleSheets[E].rules.length;++D){A(document.styleSheets[E].rules[D])}}}else{if(curvyBrowser.isOp){for(E=0;E<document.styleSheets.length;++E){if(operasheet.contains_border_radius(E)){C=new operasheet(E);for(D in C.rules){if(!isNaN(D)){curvyCorners(C.rules[D])}}}}}else{curvyCorners.alert("Scanstyles does nothing in Webkit/Firefox")}}};curvyCorners.init=function(){if(arguments.callee.done){return}arguments.callee.done=true;if(curvyBrowser.isWebKit&&curvyCorners.init.timer){clearInterval(curvyCorners.init.timer);curvyCorners.init.timer=null}curvyCorners.scanStyles()}}if(typeof curvyCornersNoAutoScan==="undefined"||curvyCornersNoAutoScan===false){if(curvyBrowser.isOp){document.addEventListener("DOMContentLoaded",curvyCorners.init,false)}else{addEvent(window,"load",curvyCorners.init,false)}};


// FROM: /javascripts/mootools.js?1288225651
//MooTools, My Object Oriented Javascript Tools. Copyright (c) 2006-2007 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

var MooTools={version:'1.11'};function $defined(obj){return(obj!=undefined);};function $type(obj){if(!$defined(obj))return false;if(obj.htmlElement)return'element';var type=typeof obj;if(type=='object'&&obj.nodeName){switch(obj.nodeType){case 1:return'element';case 3:return(/\S/).test(obj.nodeValue)?'textnode':'whitespace';}}
if(type=='object'||type=='function'){switch(obj.constructor){case Array:return'array';case RegExp:return'regexp';case Class:return'class';}
if(typeof obj.length=='number'){if(obj.item)return'collection';if(obj.callee)return'arguments';}}
return type;};function $merge(){var mix={};for(var i=0;i<arguments.length;i++){for(var property in arguments[i]){var ap=arguments[i][property];var mp=mix[property];if(mp&&$type(ap)=='object'&&$type(mp)=='object')mix[property]=$merge(mp,ap);else mix[property]=ap;}}
return mix;};var $extend=function(){var args=arguments;if(!args[1])args=[this,args[0]];for(var property in args[1])args[0][property]=args[1][property];return args[0];};var $native=function(){for(var i=0,l=arguments.length;i<l;i++){arguments[i].extend=function(props){for(var prop in props){if(!this.prototype[prop])this.prototype[prop]=props[prop];if(!this[prop])this[prop]=$native.generic(prop);}};}};$native.generic=function(prop){return function(bind){return this.prototype[prop].apply(bind,Array.prototype.slice.call(arguments,1));};};$native(Function,Array,String,Number);function $chk(obj){return!!(obj||obj===0);};function $pick(obj,picked){return $defined(obj)?obj:picked;};function $random(min,max){return Math.floor(Math.random()*(max-min+1)+min);};function $time(){return new Date().getTime();};function $clear(timer){clearTimeout(timer);clearInterval(timer);return null;};var Abstract=function(obj){obj=obj||{};obj.extend=$extend;return obj;};var Window=new Abstract(window);var Document=new Abstract(document);document.head=document.getElementsByTagName('head')[0];window.xpath=!!(document.evaluate);if(window.ActiveXObject)window.ie=window[window.XMLHttpRequest?'ie7':'ie6']=true;else if(document.childNodes&&!document.all&&!navigator.taintEnabled)window.webkit=window[window.xpath?'webkit420':'webkit419']=true;else if(document.getBoxObjectFor!=null)window.gecko=true;window.khtml=window.webkit;Object.extend=$extend;if(typeof HTMLElement=='undefined'){var HTMLElement=function(){};if(window.webkit)document.createElement("iframe");HTMLElement.prototype=(window.webkit)?window["[[DOMElement.prototype]]"]:{};}
HTMLElement.prototype.htmlElement=function(){};if(window.ie6)try{document.execCommand("BackgroundImageCache",false,true);}catch(e){};var Class=function(properties){var klass=function(){return(arguments[0]!==null&&this.initialize&&$type(this.initialize)=='function')?this.initialize.apply(this,arguments):this;};$extend(klass,this);klass.prototype=properties;klass.constructor=Class;return klass;};Class.empty=function(){};Class.prototype={extend:function(properties){var proto=new this(null);for(var property in properties){var pp=proto[property];proto[property]=Class.Merge(pp,properties[property]);}
return new Class(proto);},implement:function(){for(var i=0,l=arguments.length;i<l;i++)$extend(this.prototype,arguments[i]);}};Class.Merge=function(previous,current){if(previous&&previous!=current){var type=$type(current);if(type!=$type(previous))return current;switch(type){case'function':var merged=function(){this.parent=arguments.callee.parent;return current.apply(this,arguments);};merged.parent=previous;return merged;case'object':return $merge(previous,current);}}
return current;};var Chain=new Class({chain:function(fn){this.chains=this.chains||[];this.chains.push(fn);return this;},callChain:function(){if(this.chains&&this.chains.length)this.chains.shift().delay(10,this);},clearChain:function(){this.chains=[];}});var Events=new Class({addEvent:function(type,fn){if(fn!=Class.empty){this.$events=this.$events||{};this.$events[type]=this.$events[type]||[];this.$events[type].include(fn);}
return this;},fireEvent:function(type,args,delay){if(this.$events&&this.$events[type]){this.$events[type].each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);}
return this;},removeEvent:function(type,fn){if(this.$events&&this.$events[type])this.$events[type].remove(fn);return this;}});var Options=new Class({setOptions:function(){this.options=$merge.apply(null,[this.options].extend(arguments));if(this.addEvent){for(var option in this.options){if($type(this.options[option]=='function')&&(/^on[A-Z]/).test(option))this.addEvent(option,this.options[option]);}}
return this;}});Array.extend({forEach:function(fn,bind){for(var i=0,j=this.length;i<j;i++)fn.call(bind,this[i],i,this);},filter:function(fn,bind){var results=[];for(var i=0,j=this.length;i<j;i++){if(fn.call(bind,this[i],i,this))results.push(this[i]);}
return results;},map:function(fn,bind){var results=[];for(var i=0,j=this.length;i<j;i++)results[i]=fn.call(bind,this[i],i,this);return results;},every:function(fn,bind){for(var i=0,j=this.length;i<j;i++){if(!fn.call(bind,this[i],i,this))return false;}
return true;},some:function(fn,bind){for(var i=0,j=this.length;i<j;i++){if(fn.call(bind,this[i],i,this))return true;}
return false;},indexOf:function(item,from){var len=this.length;for(var i=(from<0)?Math.max(0,len+from):from||0;i<len;i++){if(this[i]===item)return i;}
return-1;},copy:function(start,length){start=start||0;if(start<0)start=this.length+start;length=length||(this.length-start);var newArray=[];for(var i=0;i<length;i++)newArray[i]=this[start++];return newArray;},remove:function(item){var i=0;var len=this.length;while(i<len){if(this[i]===item){this.splice(i,1);len--;}else{i++;}}
return this;},contains:function(item,from){return this.indexOf(item,from)!=-1;},associate:function(keys){var obj={},length=Math.min(this.length,keys.length);for(var i=0;i<length;i++)obj[keys[i]]=this[i];return obj;},extend:function(array){for(var i=0,j=array.length;i<j;i++)this.push(array[i]);return this;},merge:function(array){for(var i=0,l=array.length;i<l;i++)this.include(array[i]);return this;},include:function(item){if(!this.contains(item))this.push(item);return this;},getRandom:function(){return this[$random(0,this.length-1)]||null;},getLast:function(){return this[this.length-1]||null;}});Array.prototype.each=Array.prototype.forEach;Array.each=Array.forEach;function $A(array){return Array.copy(array);};function $each(iterable,fn,bind){if(iterable&&typeof iterable.length=='number'&&$type(iterable)!='object'){Array.forEach(iterable,fn,bind);}else{for(var name in iterable)fn.call(bind||iterable,iterable[name],name);}};Array.prototype.test=Array.prototype.contains;String.extend({test:function(regex,params){return(($type(regex)=='string')?new RegExp(regex,params):regex).test(this);},toInt:function(){return parseInt(this,10);},toFloat:function(){return parseFloat(this);},camelCase:function(){return this.replace(/-\D/g,function(match){return match.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/\w[A-Z]/g,function(match){return(match.charAt(0)+'-'+match.charAt(1).toLowerCase());});},capitalize:function(){return this.replace(/\b[a-z]/g,function(match){return match.toUpperCase();});},trim:function(){return this.replace(/^\s+|\s+$/g,'');},clean:function(){return this.replace(/\s{2,}/g,' ').trim();},rgbToHex:function(array){var rgb=this.match(/\d{1,3}/g);return(rgb)?rgb.rgbToHex(array):false;},hexToRgb:function(array){var hex=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return(hex)?hex.slice(1).hexToRgb(array):false;},contains:function(string,s){return(s)?(s+this+s).indexOf(s+string+s)>-1:this.indexOf(string)>-1;},escapeRegExp:function(){return this.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');}});Array.extend({rgbToHex:function(array){if(this.length<3)return false;if(this.length==4&&this[3]==0&&!array)return'transparent';var hex=[];for(var i=0;i<3;i++){var bit=(this[i]-0).toString(16);hex.push((bit.length==1)?'0'+bit:bit);}
return array?hex:'#'+hex.join('');},hexToRgb:function(array){if(this.length!=3)return false;var rgb=[];for(var i=0;i<3;i++){rgb.push(parseInt((this[i].length==1)?this[i]+this[i]:this[i],16));}
return array?rgb:'rgb('+rgb.join(',')+')';}});Function.extend({create:function(options){var fn=this;options=$merge({'bind':fn,'event':false,'arguments':null,'delay':false,'periodical':false,'attempt':false},options);if($chk(options.arguments)&&$type(options.arguments)!='array')options.arguments=[options.arguments];return function(event){var args;if(options.event){event=event||window.event;args=[(options.event===true)?event:new options.event(event)];if(options.arguments)args.extend(options.arguments);}
else args=options.arguments||arguments;var returns=function(){return fn.apply($pick(options.bind,fn),args);};if(options.delay)return setTimeout(returns,options.delay);if(options.periodical)return setInterval(returns,options.periodical);if(options.attempt)try{return returns();}catch(err){return false;};return returns();};},pass:function(args,bind){return this.create({'arguments':args,'bind':bind});},attempt:function(args,bind){return this.create({'arguments':args,'bind':bind,'attempt':true})();},bind:function(bind,args){return this.create({'bind':bind,'arguments':args});},bindAsEventListener:function(bind,args){return this.create({'bind':bind,'event':true,'arguments':args});},delay:function(delay,bind,args){return this.create({'delay':delay,'bind':bind,'arguments':args})();},periodical:function(interval,bind,args){return this.create({'periodical':interval,'bind':bind,'arguments':args})();}});Number.extend({toInt:function(){return parseInt(this);},toFloat:function(){return parseFloat(this);},limit:function(min,max){return Math.min(max,Math.max(min,this));},round:function(precision){precision=Math.pow(10,precision||0);return Math.round(this*precision)/precision;},times:function(fn){for(var i=0;i<this;i++)fn(i);}});var Element=new Class({initialize:function(el,props){if($type(el)=='string'){if(window.ie&&props&&(props.name||props.type)){var name=(props.name)?' name="'+props.name+'"':'';var type=(props.type)?' type="'+props.type+'"':'';delete props.name;delete props.type;el='<'+el+name+type+'>';}
el=document.createElement(el);}
el=$(el);return(!props||!el)?el:el.set(props);}});var Elements=new Class({initialize:function(elements){return(elements)?$extend(elements,this):this;}});Elements.extend=function(props){for(var prop in props){this.prototype[prop]=props[prop];this[prop]=$native.generic(prop);}};function $(el){if(!el)return null;if(el.htmlElement)return Garbage.collect(el);if([window,document].contains(el))return el;var type=$type(el);if(type=='string'){el=document.getElementById(el);type=(el)?'element':false;}
if(type!='element')return null;if(el.htmlElement)return Garbage.collect(el);if(['object','embed'].contains(el.tagName.toLowerCase()))return el;$extend(el,Element.prototype);el.htmlElement=function(){};return Garbage.collect(el);};document.getElementsBySelector=document.getElementsByTagName;function $$(){var elements=[];for(var i=0,j=arguments.length;i<j;i++){var selector=arguments[i];switch($type(selector)){case'element':elements.push(selector);case'boolean':break;case false:break;case'string':selector=document.getElementsBySelector(selector,true);default:elements.extend(selector);}}
return $$.unique(elements);};$$.unique=function(array){var elements=[];for(var i=0,l=array.length;i<l;i++){if(array[i].$included)continue;var element=$(array[i]);if(element&&!element.$included){element.$included=true;elements.push(element);}}
for(var n=0,d=elements.length;n<d;n++)elements[n].$included=null;return new Elements(elements);};Elements.Multi=function(property){return function(){var args=arguments;var items=[];var elements=true;for(var i=0,j=this.length,returns;i<j;i++){returns=this[i][property].apply(this[i],args);if($type(returns)!='element')elements=false;items.push(returns);};return(elements)?$$.unique(items):items;};};Element.extend=function(properties){for(var property in properties){HTMLElement.prototype[property]=properties[property];Element.prototype[property]=properties[property];Element[property]=$native.generic(property);var elementsProperty=(Array.prototype[property])?property+'Elements':property;Elements.prototype[elementsProperty]=Elements.Multi(property);}};Element.extend({set:function(props){for(var prop in props){var val=props[prop];switch(prop){case'styles':this.setStyles(val);break;case'events':if(this.addEvents)this.addEvents(val);break;case'properties':this.setProperties(val);break;default:this.setProperty(prop,val);}}
return this;},inject:function(el,where){el=$(el);switch(where){case'before':el.parentNode.insertBefore(this,el);break;case'after':var next=el.getNext();if(!next)el.parentNode.appendChild(this);else el.parentNode.insertBefore(this,next);break;case'top':var first=el.firstChild;if(first){el.insertBefore(this,first);break;}
default:el.appendChild(this);}
return this;},injectBefore:function(el){return this.inject(el,'before');},injectAfter:function(el){return this.inject(el,'after');},injectInside:function(el){return this.inject(el,'bottom');},injectTop:function(el){return this.inject(el,'top');},adopt:function(){var elements=[];$each(arguments,function(argument){elements=elements.concat(argument);});$$(elements).inject(this);return this;},remove:function(){return this.parentNode.removeChild(this);},clone:function(contents){var el=$(this.cloneNode(contents!==false));if(!el.$events)return el;el.$events={};for(var type in this.$events)el.$events[type]={'keys':$A(this.$events[type].keys),'values':$A(this.$events[type].values)};return el.removeEvents();},replaceWith:function(el){el=$(el);this.parentNode.replaceChild(el,this);return el;},appendText:function(text){this.appendChild(document.createTextNode(text));return this;},hasClass:function(className){return this.className.contains(className,' ');},addClass:function(className){if(!this.hasClass(className))this.className=(this.className+' '+className).clean();return this;},removeClass:function(className){this.className=this.className.replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)'),'$1').clean();return this;},toggleClass:function(className){return this.hasClass(className)?this.removeClass(className):this.addClass(className);},setStyle:function(property,value){switch(property){case'opacity':return this.setOpacity(parseFloat(value));case'float':property=(window.ie)?'styleFloat':'cssFloat';}
property=property.camelCase();switch($type(value)){case'number':if(!['zIndex','zoom'].contains(property))value+='px';break;case'array':value='rgb('+value.join(',')+')';}
this.style[property]=value;return this;},setStyles:function(source){switch($type(source)){case'object':Element.setMany(this,'setStyle',source);break;case'string':this.style.cssText=source;}
return this;},setOpacity:function(opacity){if(opacity==0){if(this.style.visibility!="hidden")this.style.visibility="hidden";}else{if(this.style.visibility!="visible")this.style.visibility="visible";}
if(!this.currentStyle||!this.currentStyle.hasLayout)this.style.zoom=1;if(window.ie)this.style.filter=(opacity==1)?'':"alpha(opacity="+opacity*100+")";this.style.opacity=this.$tmp.opacity=opacity;return this;},getStyle:function(property){property=property.camelCase();var result=this.style[property];if(!$chk(result)){if(property=='opacity')return this.$tmp.opacity;result=[];for(var style in Element.Styles){if(property==style){Element.Styles[style].each(function(s){var style=this.getStyle(s);result.push(parseInt(style)?style:'0px');},this);if(property=='border'){var every=result.every(function(bit){return(bit==result[0]);});return(every)?result[0]:false;}
return result.join(' ');}}
if(property.contains('border')){if(Element.Styles.border.contains(property)){return['Width','Style','Color'].map(function(p){return this.getStyle(property+p);},this).join(' ');}else if(Element.borderShort.contains(property)){return['Top','Right','Bottom','Left'].map(function(p){return this.getStyle('border'+p+property.replace('border',''));},this).join(' ');}}
if(document.defaultView)result=document.defaultView.getComputedStyle(this,null).getPropertyValue(property.hyphenate());else if(this.currentStyle)result=this.currentStyle[property];}
if(window.ie)result=Element.fixStyle(property,result,this);if(result&&property.test(/color/i)&&result.contains('rgb')){return result.split('rgb').splice(1,4).map(function(color){return color.rgbToHex();}).join(' ');}
return result;},getStyles:function(){return Element.getMany(this,'getStyle',arguments);},walk:function(brother,start){brother+='Sibling';var el=(start)?this[start]:this[brother];while(el&&$type(el)!='element')el=el[brother];return $(el);},getPrevious:function(){return this.walk('previous');},getNext:function(){return this.walk('next');},getFirst:function(){return this.walk('next','firstChild');},getLast:function(){return this.walk('previous','lastChild');},getParent:function(){return $(this.parentNode);},getChildren:function(){return $$(this.childNodes);},hasChild:function(el){return!!$A(this.getElementsByTagName('*')).contains(el);},getProperty:function(property){var index=Element.Properties[property];if(index)return this[index];var flag=Element.PropertiesIFlag[property]||0;if(!window.ie||flag)return this.getAttribute(property,flag);var node=this.attributes[property];return(node)?node.nodeValue:null;},removeProperty:function(property){var index=Element.Properties[property];if(index)this[index]='';else this.removeAttribute(property);return this;},getProperties:function(){return Element.getMany(this,'getProperty',arguments);},setProperty:function(property,value){var index=Element.Properties[property];if(index)this[index]=value;else this.setAttribute(property,value);return this;},setProperties:function(source){return Element.setMany(this,'setProperty',source);},setHTML:function(){this.innerHTML=$A(arguments).join('');return this;},setText:function(text){var tag=this.getTag();if(['style','script'].contains(tag)){if(window.ie){if(tag=='style')this.styleSheet.cssText=text;else if(tag=='script')this.setProperty('text',text);return this;}else{this.removeChild(this.firstChild);return this.appendText(text);}}
this[$defined(this.innerText)?'innerText':'textContent']=text;return this;},getText:function(){var tag=this.getTag();if(['style','script'].contains(tag)){if(window.ie){if(tag=='style')return this.styleSheet.cssText;else if(tag=='script')return this.getProperty('text');}else{return this.innerHTML;}}
return($pick(this.innerText,this.textContent));},getTag:function(){return this.tagName.toLowerCase();},empty:function(){Garbage.trash(this.getElementsByTagName('*'));return this.setHTML('');}});Element.fixStyle=function(property,result,element){if($chk(parseInt(result)))return result;if(['height','width'].contains(property)){var values=(property=='width')?['left','right']:['top','bottom'];var size=0;values.each(function(value){size+=element.getStyle('border-'+value+'-width').toInt()+element.getStyle('padding-'+value).toInt();});return element['offset'+property.capitalize()]-size+'px';}else if(property.test(/border(.+)Width|margin|padding/)){return'0px';}
return result;};Element.Styles={'border':[],'padding':[],'margin':[]};['Top','Right','Bottom','Left'].each(function(direction){for(var style in Element.Styles)Element.Styles[style].push(style+direction);});Element.borderShort=['borderWidth','borderStyle','borderColor'];Element.getMany=function(el,method,keys){var result={};$each(keys,function(key){result[key]=el[method](key);});return result;};Element.setMany=function(el,method,pairs){for(var key in pairs)el[method](key,pairs[key]);return el;};Element.Properties=new Abstract({'class':'className','for':'htmlFor','colspan':'colSpan','rowspan':'rowSpan','accesskey':'accessKey','tabindex':'tabIndex','maxlength':'maxLength','readonly':'readOnly','frameborder':'frameBorder','value':'value','disabled':'disabled','checked':'checked','multiple':'multiple','selected':'selected'});Element.PropertiesIFlag={'href':2,'src':2};Element.Methods={Listeners:{addListener:function(type,fn){if(this.addEventListener)this.addEventListener(type,fn,false);else this.attachEvent('on'+type,fn);return this;},removeListener:function(type,fn){if(this.removeEventListener)this.removeEventListener(type,fn,false);else this.detachEvent('on'+type,fn);return this;}}};window.extend(Element.Methods.Listeners);document.extend(Element.Methods.Listeners);Element.extend(Element.Methods.Listeners);var Garbage={elements:[],collect:function(el){if(!el.$tmp){Garbage.elements.push(el);el.$tmp={'opacity':1};}
return el;},trash:function(elements){for(var i=0,j=elements.length,el;i<j;i++){if(!(el=elements[i])||!el.$tmp)continue;if(el.$events)el.fireEvent('trash').removeEvents();for(var p in el.$tmp)el.$tmp[p]=null;for(var d in Element.prototype)el[d]=null;Garbage.elements[Garbage.elements.indexOf(el)]=null;el.htmlElement=el.$tmp=el=null;}
Garbage.elements.remove(null);},empty:function(){Garbage.collect(window);Garbage.collect(document);Garbage.trash(Garbage.elements);}};window.addListener('beforeunload',function(){window.addListener('unload',Garbage.empty);if(window.ie)window.addListener('unload',CollectGarbage);});var Event=new Class({initialize:function(event){if(event&&event.$extended)return event;this.$extended=true;event=event||window.event;this.event=event;this.type=event.type;this.target=event.target||event.srcElement;if(this.target.nodeType==3)this.target=this.target.parentNode;this.shift=event.shiftKey;this.control=event.ctrlKey;this.alt=event.altKey;this.meta=event.metaKey;if(['DOMMouseScroll','mousewheel'].contains(this.type)){this.wheel=(event.wheelDelta)?event.wheelDelta/120:-(event.detail||0)/3;}else if(this.type.contains('key')){this.code=event.which||event.keyCode;for(var name in Event.keys){if(Event.keys[name]==this.code){this.key=name;break;}}
if(this.type=='keydown'){var fKey=this.code-111;if(fKey>0&&fKey<13)this.key='f'+fKey;}
this.key=this.key||String.fromCharCode(this.code).toLowerCase();}else if(this.type.test(/(click|mouse|menu)/)){this.page={'x':event.pageX||event.clientX+document.documentElement.scrollLeft,'y':event.pageY||event.clientY+document.documentElement.scrollTop};this.client={'x':event.pageX?event.pageX-window.pageXOffset:event.clientX,'y':event.pageY?event.pageY-window.pageYOffset:event.clientY};this.rightClick=(event.which==3)||(event.button==2);switch(this.type){case'mouseover':this.relatedTarget=event.relatedTarget||event.fromElement;break;case'mouseout':this.relatedTarget=event.relatedTarget||event.toElement;}
this.fixRelatedTarget();}
return this;},stop:function(){return this.stopPropagation().preventDefault();},stopPropagation:function(){if(this.event.stopPropagation)this.event.stopPropagation();else this.event.cancelBubble=true;return this;},preventDefault:function(){if(this.event.preventDefault)this.event.preventDefault();else this.event.returnValue=false;return this;}});Event.fix={relatedTarget:function(){if(this.relatedTarget&&this.relatedTarget.nodeType==3)this.relatedTarget=this.relatedTarget.parentNode;},relatedTargetGecko:function(){try{Event.fix.relatedTarget.call(this);}catch(e){this.relatedTarget=this.target;}}};Event.prototype.fixRelatedTarget=(window.gecko)?Event.fix.relatedTargetGecko:Event.fix.relatedTarget;Event.keys=new Abstract({'enter':13,'up':38,'down':40,'left':37,'right':39,'esc':27,'space':32,'backspace':8,'tab':9,'delete':46});Element.Methods.Events={addEvent:function(type,fn){this.$events=this.$events||{};this.$events[type]=this.$events[type]||{'keys':[],'values':[]};if(this.$events[type].keys.contains(fn))return this;this.$events[type].keys.push(fn);var realType=type;var custom=Element.Events[type];if(custom){if(custom.add)custom.add.call(this,fn);if(custom.map)fn=custom.map;if(custom.type)realType=custom.type;}
if(!this.addEventListener)fn=fn.create({'bind':this,'event':true});this.$events[type].values.push(fn);return(Element.NativeEvents.contains(realType))?this.addListener(realType,fn):this;},removeEvent:function(type,fn){if(!this.$events||!this.$events[type])return this;var pos=this.$events[type].keys.indexOf(fn);if(pos==-1)return this;var key=this.$events[type].keys.splice(pos,1)[0];var value=this.$events[type].values.splice(pos,1)[0];var custom=Element.Events[type];if(custom){if(custom.remove)custom.remove.call(this,fn);if(custom.type)type=custom.type;}
return(Element.NativeEvents.contains(type))?this.removeListener(type,value):this;},addEvents:function(source){return Element.setMany(this,'addEvent',source);},removeEvents:function(type){if(!this.$events)return this;if(!type){for(var evType in this.$events)this.removeEvents(evType);this.$events=null;}else if(this.$events[type]){this.$events[type].keys.each(function(fn){this.removeEvent(type,fn);},this);this.$events[type]=null;}
return this;},fireEvent:function(type,args,delay){if(this.$events&&this.$events[type]){this.$events[type].keys.each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);}
return this;},cloneEvents:function(from,type){if(!from.$events)return this;if(!type){for(var evType in from.$events)this.cloneEvents(from,evType);}else if(from.$events[type]){from.$events[type].keys.each(function(fn){this.addEvent(type,fn);},this);}
return this;}};window.extend(Element.Methods.Events);document.extend(Element.Methods.Events);Element.extend(Element.Methods.Events);Element.Events=new Abstract({'mouseenter':{type:'mouseover',map:function(event){event=new Event(event);if(event.relatedTarget!=this&&!this.hasChild(event.relatedTarget))this.fireEvent('mouseenter',event);}},'mouseleave':{type:'mouseout',map:function(event){event=new Event(event);if(event.relatedTarget!=this&&!this.hasChild(event.relatedTarget))this.fireEvent('mouseleave',event);}},'mousewheel':{type:(window.gecko)?'DOMMouseScroll':'mousewheel'}});Element.NativeEvents=['click','dblclick','mouseup','mousedown','mousewheel','DOMMouseScroll','mouseover','mouseout','mousemove','keydown','keypress','keyup','load','unload','beforeunload','resize','move','focus','blur','change','submit','reset','select','error','abort','contextmenu','scroll'];Function.extend({bindWithEvent:function(bind,args){return this.create({'bind':bind,'arguments':args,'event':Event});}});Elements.extend({filterByTag:function(tag){return new Elements(this.filter(function(el){return(Element.getTag(el)==tag);}));},filterByClass:function(className,nocash){var elements=this.filter(function(el){return(el.className&&el.className.contains(className,' '));});return(nocash)?elements:new Elements(elements);},filterById:function(id,nocash){var elements=this.filter(function(el){return(el.id==id);});return(nocash)?elements:new Elements(elements);},filterByAttribute:function(name,operator,value,nocash){var elements=this.filter(function(el){var current=Element.getProperty(el,name);if(!current)return false;if(!operator)return true;switch(operator){case'=':return(current==value);case'*=':return(current.contains(value));case'^=':return(current.substr(0,value.length)==value);case'$=':return(current.substr(current.length-value.length)==value);case'!=':return(current!=value);case'~=':return current.contains(value,' ');}
return false;});return(nocash)?elements:new Elements(elements);}});function $E(selector,filter){return($(filter)||document).getElement(selector);};function $ES(selector,filter){return($(filter)||document).getElementsBySelector(selector);};$$.shared={'regexp':/^(\w*|\*)(?:#([\w-]+)|\.([\w-]+))?(?:\[(\w+)(?:([!*^$]?=)["']?([^"'\]]*)["']?)?])?$/,'xpath':{getParam:function(items,context,param,i){var temp=[context.namespaceURI?'xhtml:':'',param[1]];if(param[2])temp.push('[@id="',param[2],'"]');if(param[3])temp.push('[contains(concat(" ", @class, " "), " ',param[3],' ")]');if(param[4]){if(param[5]&&param[6]){switch(param[5]){case'*=':temp.push('[contains(@',param[4],', "',param[6],'")]');break;case'^=':temp.push('[starts-with(@',param[4],', "',param[6],'")]');break;case'$=':temp.push('[substring(@',param[4],', string-length(@',param[4],') - ',param[6].length,' + 1) = "',param[6],'"]');break;case'=':temp.push('[@',param[4],'="',param[6],'"]');break;case'!=':temp.push('[@',param[4],'!="',param[6],'"]');}}else{temp.push('[@',param[4],']');}}
items.push(temp.join(''));return items;},getItems:function(items,context,nocash){var elements=[];var xpath=document.evaluate('.//'+items.join('//'),context,$$.shared.resolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(var i=0,j=xpath.snapshotLength;i<j;i++)elements.push(xpath.snapshotItem(i));return(nocash)?elements:new Elements(elements.map($));}},'normal':{getParam:function(items,context,param,i){if(i==0){if(param[2]){var el=context.getElementById(param[2]);if(!el||((param[1]!='*')&&(Element.getTag(el)!=param[1])))return false;items=[el];}else{items=$A(context.getElementsByTagName(param[1]));}}else{items=$$.shared.getElementsByTagName(items,param[1]);if(param[2])items=Elements.filterById(items,param[2],true);}
if(param[3])items=Elements.filterByClass(items,param[3],true);if(param[4])items=Elements.filterByAttribute(items,param[4],param[5],param[6],true);return items;},getItems:function(items,context,nocash){return(nocash)?items:$$.unique(items);}},resolver:function(prefix){return(prefix=='xhtml')?'http://www.w3.org/1999/xhtml':false;},getElementsByTagName:function(context,tagName){var found=[];for(var i=0,j=context.length;i<j;i++)found.extend(context[i].getElementsByTagName(tagName));return found;}};$$.shared.method=(window.xpath)?'xpath':'normal';Element.Methods.Dom={getElements:function(selector,nocash){var items=[];selector=selector.trim().split(' ');for(var i=0,j=selector.length;i<j;i++){var sel=selector[i];var param=sel.match($$.shared.regexp);if(!param)break;param[1]=param[1]||'*';var temp=$$.shared[$$.shared.method].getParam(items,this,param,i);if(!temp)break;items=temp;}
return $$.shared[$$.shared.method].getItems(items,this,nocash);},getElement:function(selector){return $(this.getElements(selector,true)[0]||false);},getElementsBySelector:function(selector,nocash){var elements=[];selector=selector.split(',');for(var i=0,j=selector.length;i<j;i++)elements=elements.concat(this.getElements(selector[i],true));return(nocash)?elements:$$.unique(elements);}};Element.extend({getElementById:function(id){var el=document.getElementById(id);if(!el)return false;for(var parent=el.parentNode;parent!=this;parent=parent.parentNode){if(!parent)return false;}
return el;},getElementsByClassName:function(className){return this.getElements('.'+className);}});document.extend(Element.Methods.Dom);Element.extend(Element.Methods.Dom);Element.extend({getValue:function(){switch(this.getTag()){case'select':var values=[];$each(this.options,function(option){if(option.selected)values.push($pick(option.value,option.text));});return(this.multiple)?values:values[0];case'input':if(!(this.checked&&['checkbox','radio'].contains(this.type))&&!['hidden','text','password'].contains(this.type))break;case'textarea':return this.value;}
return false;},getFormElements:function(){return $$(this.getElementsByTagName('input'),this.getElementsByTagName('select'),this.getElementsByTagName('textarea'));},toQueryString:function(){var queryString=[];this.getFormElements().each(function(el){var name=el.name;var value=el.getValue();if(value===false||!name||el.disabled)return;var qs=function(val){queryString.push(name+'='+encodeURIComponent(val));};if($type(value)=='array')value.each(qs);else qs(value);});return queryString.join('&');}});Element.extend({scrollTo:function(x,y){this.scrollLeft=x;this.scrollTop=y;},getSize:function(){return{'scroll':{'x':this.scrollLeft,'y':this.scrollTop},'size':{'x':this.offsetWidth,'y':this.offsetHeight},'scrollSize':{'x':this.scrollWidth,'y':this.scrollHeight}};},getPosition:function(overflown){overflown=overflown||[];var el=this,left=0,top=0;do{left+=el.offsetLeft||0;top+=el.offsetTop||0;el=el.offsetParent;}while(el);overflown.each(function(element){left-=element.scrollLeft||0;top-=element.scrollTop||0;});return{'x':left,'y':top};},getTop:function(overflown){return this.getPosition(overflown).y;},getLeft:function(overflown){return this.getPosition(overflown).x;},getCoordinates:function(overflown){var position=this.getPosition(overflown);var obj={'width':this.offsetWidth,'height':this.offsetHeight,'left':position.x,'top':position.y};obj.right=obj.left+obj.width;obj.bottom=obj.top+obj.height;return obj;}});Element.Events.domready={add:function(fn){if(window.loaded){fn.call(this);return;}
var domReady=function(){if(window.loaded)return;window.loaded=true;window.timer=$clear(window.timer);this.fireEvent('domready');}.bind(this);if(document.readyState&&window.webkit){window.timer=function(){if(['loaded','complete'].contains(document.readyState))domReady();}.periodical(50);}else if(document.readyState&&window.ie){if(!$('ie_ready')){var src=(window.location.protocol=='https:')?'://0':'javascript:void(0)';document.write('<script id="ie_ready" defer src="'+src+'"><\/script>');$('ie_ready').onreadystatechange=function(){if(this.readyState=='complete')domReady();};}}else{window.addListener("load",domReady);document.addListener("DOMContentLoaded",domReady);}}};window.onDomReady=function(fn){return this.addEvent('domready',fn);};window.extend({getWidth:function(){if(this.webkit419)return this.innerWidth;if(this.opera)return document.body.clientWidth;return document.documentElement.clientWidth;},getHeight:function(){if(this.webkit419)return this.innerHeight;if(this.opera)return document.body.clientHeight;return document.documentElement.clientHeight;},getScrollWidth:function(){if(this.ie)return Math.max(document.documentElement.offsetWidth,document.documentElement.scrollWidth);if(this.webkit)return document.body.scrollWidth;return document.documentElement.scrollWidth;},getScrollHeight:function(){if(this.ie)return Math.max(document.documentElement.offsetHeight,document.documentElement.scrollHeight);if(this.webkit)return document.body.scrollHeight;return document.documentElement.scrollHeight;},getScrollLeft:function(){return this.pageXOffset||document.documentElement.scrollLeft;},getScrollTop:function(){return this.pageYOffset||document.documentElement.scrollTop;},getSize:function(){return{'size':{'x':this.getWidth(),'y':this.getHeight()},'scrollSize':{'x':this.getScrollWidth(),'y':this.getScrollHeight()},'scroll':{'x':this.getScrollLeft(),'y':this.getScrollTop()}};},getPosition:function(){return{'x':0,'y':0};}});var Fx={};Fx.Base=new Class({options:{onStart:Class.empty,onComplete:Class.empty,onCancel:Class.empty,transition:function(p){return-(Math.cos(Math.PI*p)-1)/2;},duration:500,unit:'px',wait:true,fps:50},initialize:function(options){this.element=this.element||null;this.setOptions(options);if(this.options.initialize)this.options.initialize.call(this);},step:function(){var time=$time();if(time<this.time+this.options.duration){this.delta=this.options.transition((time-this.time)/this.options.duration);this.setNow();this.increase();}else{this.stop(true);this.set(this.to);this.fireEvent('onComplete',this.element,10);this.callChain();}},set:function(to){this.now=to;this.increase();return this;},setNow:function(){this.now=this.compute(this.from,this.to);},compute:function(from,to){return(to-from)*this.delta+from;},start:function(from,to){if(!this.options.wait)this.stop();else if(this.timer)return this;this.from=from;this.to=to;this.change=this.to-this.from;this.time=$time();this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);this.fireEvent('onStart',this.element);return this;},stop:function(end){if(!this.timer)return this;this.timer=$clear(this.timer);if(!end)this.fireEvent('onCancel',this.element);return this;},custom:function(from,to){return this.start(from,to);},clearTimer:function(end){return this.stop(end);}});Fx.Base.implement(new Chain,new Events,new Options);Fx.CSS={select:function(property,to){if(property.test(/color/i))return this.Color;var type=$type(to);if((type=='array')||(type=='string'&&to.contains(' ')))return this.Multi;return this.Single;},parse:function(el,property,fromTo){if(!fromTo.push)fromTo=[fromTo];var from=fromTo[0],to=fromTo[1];if(!$chk(to)){to=from;from=el.getStyle(property);}
var css=this.select(property,to);return{'from':css.parse(from),'to':css.parse(to),'css':css};}};Fx.CSS.Single={parse:function(value){return parseFloat(value);},getNow:function(from,to,fx){return fx.compute(from,to);},getValue:function(value,unit,property){if(unit=='px'&&property!='opacity')value=Math.round(value);return value+unit;}};Fx.CSS.Multi={parse:function(value){return value.push?value:value.split(' ').map(function(v){return parseFloat(v);});},getNow:function(from,to,fx){var now=[];for(var i=0;i<from.length;i++)now[i]=fx.compute(from[i],to[i]);return now;},getValue:function(value,unit,property){if(unit=='px'&&property!='opacity')value=value.map(Math.round);return value.join(unit+' ')+unit;}};Fx.CSS.Color={parse:function(value){return value.push?value:value.hexToRgb(true);},getNow:function(from,to,fx){var now=[];for(var i=0;i<from.length;i++)now[i]=Math.round(fx.compute(from[i],to[i]));return now;},getValue:function(value){return'rgb('+value.join(',')+')';}};Fx.Style=Fx.Base.extend({initialize:function(el,property,options){this.element=$(el);this.property=property;this.parent(options);},hide:function(){return this.set(0);},setNow:function(){this.now=this.css.getNow(this.from,this.to,this);},set:function(to){this.css=Fx.CSS.select(this.property,to);return this.parent(this.css.parse(to));},start:function(from,to){if(this.timer&&this.options.wait)return this;var parsed=Fx.CSS.parse(this.element,this.property,[from,to]);this.css=parsed.css;return this.parent(parsed.from,parsed.to);},increase:function(){this.element.setStyle(this.property,this.css.getValue(this.now,this.options.unit,this.property));}});Element.extend({effect:function(property,options){return new Fx.Style(this,property,options);}});var Drag={};Drag.Base=new Class({options:{handle:false,unit:'px',onStart:Class.empty,onBeforeStart:Class.empty,onComplete:Class.empty,onSnap:Class.empty,onDrag:Class.empty,limit:false,modifiers:{x:'left',y:'top'},grid:false,snap:6},initialize:function(el,options){this.setOptions(options);this.element=$(el);this.handle=$(this.options.handle)||this.element;this.mouse={'now':{},'pos':{}};this.value={'start':{},'now':{}};this.bound={'start':this.start.bindWithEvent(this),'check':this.check.bindWithEvent(this),'drag':this.drag.bindWithEvent(this),'stop':this.stop.bind(this)};this.attach();if(this.options.initialize)this.options.initialize.call(this);},attach:function(){this.handle.addEvent('mousedown',this.bound.start);return this;},detach:function(){this.handle.removeEvent('mousedown',this.bound.start);return this;},start:function(event){this.fireEvent('onBeforeStart',this.element);this.mouse.start=event.page;var limit=this.options.limit;this.limit={'x':[],'y':[]};for(var z in this.options.modifiers){if(!this.options.modifiers[z])continue;this.value.now[z]=this.element.getStyle(this.options.modifiers[z]).toInt();this.mouse.pos[z]=event.page[z]-this.value.now[z];if(limit&&limit[z]){for(var i=0;i<2;i++){if($chk(limit[z][i]))this.limit[z][i]=($type(limit[z][i])=='function')?limit[z][i]():limit[z][i];}}}
if($type(this.options.grid)=='number')this.options.grid={'x':this.options.grid,'y':this.options.grid};document.addListener('mousemove',this.bound.check);document.addListener('mouseup',this.bound.stop);this.fireEvent('onStart',this.element);event.stop();},check:function(event){var distance=Math.round(Math.sqrt(Math.pow(event.page.x-this.mouse.start.x,2)+Math.pow(event.page.y-this.mouse.start.y,2)));if(distance>this.options.snap){document.removeListener('mousemove',this.bound.check);document.addListener('mousemove',this.bound.drag);this.drag(event);this.fireEvent('onSnap',this.element);}
event.stop();},drag:function(event){this.out=false;this.mouse.now=event.page;for(var z in this.options.modifiers){if(!this.options.modifiers[z])continue;this.value.now[z]=this.mouse.now[z]-this.mouse.pos[z];if(this.limit[z]){if($chk(this.limit[z][1])&&(this.value.now[z]>this.limit[z][1])){this.value.now[z]=this.limit[z][1];this.out=true;}else if($chk(this.limit[z][0])&&(this.value.now[z]<this.limit[z][0])){this.value.now[z]=this.limit[z][0];this.out=true;}}
if(this.options.grid[z])this.value.now[z]-=(this.value.now[z]%this.options.grid[z]);this.element.setStyle(this.options.modifiers[z],this.value.now[z]+this.options.unit);}
this.fireEvent('onDrag',this.element);event.stop();},stop:function(){document.removeListener('mousemove',this.bound.check);document.removeListener('mousemove',this.bound.drag);document.removeListener('mouseup',this.bound.stop);this.fireEvent('onComplete',this.element);}});Drag.Base.implement(new Events,new Options);Element.extend({makeResizable:function(options){return new Drag.Base(this,$merge({modifiers:{x:'width',y:'height'}},options));}});Drag.Move=Drag.Base.extend({options:{droppables:[],container:false,overflown:[]},initialize:function(el,options){this.setOptions(options);this.element=$(el);this.droppables=$$(this.options.droppables);this.container=$(this.options.container);this.position={'element':this.element.getStyle('position'),'container':false};if(this.container)this.position.container=this.container.getStyle('position');if(!['relative','absolute','fixed'].contains(this.position.element))this.position.element='absolute';var top=this.element.getStyle('top').toInt();var left=this.element.getStyle('left').toInt();if(this.position.element=='absolute'&&!['relative','absolute','fixed'].contains(this.position.container)){top=$chk(top)?top:this.element.getTop(this.options.overflown);left=$chk(left)?left:this.element.getLeft(this.options.overflown);}else{top=$chk(top)?top:0;left=$chk(left)?left:0;}
this.element.setStyles({'top':top,'left':left,'position':this.position.element});this.parent(this.element);},start:function(event){this.overed=null;if(this.container){var cont=this.container.getCoordinates();var el=this.element.getCoordinates();if(this.position.element=='absolute'&&!['relative','absolute','fixed'].contains(this.position.container)){this.options.limit={'x':[cont.left,cont.right-el.width],'y':[cont.top,cont.bottom-el.height]};}else{this.options.limit={'y':[0,cont.height-el.height],'x':[0,cont.width-el.width]};}}
this.parent(event);},drag:function(event){this.parent(event);var overed=this.out?false:this.droppables.filter(this.checkAgainst,this).getLast();if(this.overed!=overed){if(this.overed)this.overed.fireEvent('leave',[this.element,this]);this.overed=overed?overed.fireEvent('over',[this.element,this]):null;}
return this;},checkAgainst:function(el){el=el.getCoordinates(this.options.overflown);var now=this.mouse.now;return(now.x>el.left&&now.x<el.right&&now.y<el.bottom&&now.y>el.top);},stop:function(){if(this.overed&&!this.out)this.overed.fireEvent('drop',[this.element,this]);else this.element.fireEvent('emptydrop',this);this.parent();return this;}});Element.extend({makeDraggable:function(options){return new Drag.Move(this,options);}});


// FROM: /javascripts/calendar.js?1288225651
// Calendar: a Javascript class for Mootools that adds accessible and unobtrusive date pickers to your form elements <http://electricprism.com/aeron/calendar>
// Calendar RC4, Copyright (c) 2007 Aeron Glemann <http://electricprism.com/aeron>, MIT Style License.

var Calendar=new Class({options:{blocked:[],classes:[],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],direction:0,draggable:false,months:["January","February","March","April","May","June","July","August","September","October","November","December"],navigation:1,offset:0,onHideStart:Class.empty,onHideComplete:Class.empty,onShowStart:Class.empty,onShowComplete:Class.empty,pad:1,tweak:{x:0,y:0}},initialize:function(F,B){if(!F){return false}this.setOptions(B);var D=["calendar","prev","next","month","year","today","invalid","valid","inactive","active","hover","hilite"];var A=D.map(function(J,I){if(this.options.classes[I]){if(this.options.classes[I].length){J=this.options.classes[I]}}return J},this);this.classes=A.associate(D);this.calendar=new Element("div",{styles:{left:"-1000px",opacity:0,position:"absolute",top:"-1000px",zIndex:1000}}).addClass(this.classes.calendar).injectInside(document.body);if(window.ie6){this.iframe=new Element("iframe",{styles:{left:"-1000px",position:"absolute",top:"-1000px",zIndex:999}}).injectInside(document.body);this.iframe.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"}this.fx=this.calendar.effect("opacity",{onStart:function(){if(this.calendar.getStyle("opacity")==0){if(window.ie6){this.iframe.setStyle("display","block")}this.calendar.setStyle("display","block");this.fireEvent("onShowStart",this.element)}else{this.fireEvent("onHideStart",this.element)}}.bind(this),onComplete:function(){if(this.calendar.getStyle("opacity")==0){this.calendar.setStyle("display","none");if(window.ie6){this.iframe.setStyle("display","none")}this.fireEvent("onHideComplete",this.element)}else{this.fireEvent("onShowComplete",this.element)}}.bind(this)});if(window.Drag&&this.options.draggable){this.drag=new Drag.Move(this.calendar,{onDrag:function(){if(window.ie6){this.iframe.setStyles({left:this.calendar.style.left,top:this.calendar.style.top})}}.bind(this)})}this.calendars=[];var H=0;var G=new Date();G.setDate(G.getDate()+this.options.direction.toInt());for(var C in F){var E={button:new Element("button",{type:"button"}),el:$(C),els:[],id:H++,month:G.getMonth(),visible:false,year:G.getFullYear()};if(!this.element(C,F[C],E)){continue}E.el.addClass(this.classes.calendar);E.button.addClass(this.classes.calendar).addEvent("click",function(I){this.toggle(I)}.pass(E,this)).injectAfter(E.el);E.val=this.read(E);$extend(E,this.bounds(E));$extend(E,this.values(E));this.rebuild(E);this.calendars.push(E)}},blocked:function(C){var A=[];var D=new Date(C.year,C.month,1).getDay();var B=new Date(C.year,C.month+1,0).getDate();this.options.blocked.each(function(I){var G=I.split(" ");for(var J=0;J<=3;J++){if(!G[J]){G[J]=(J==3)?"":"*"}G[J]=G[J].contains(",")?G[J].split(","):new Array(G[J]);var K=G[J].length-1;for(var H=K;H>=0;H--){if(G[J][H].contains("-")){var L=G[J][H].split("-");for(var F=L[0];F<=L[1];F++){if(!G[J].contains(F)){G[J].push(F+"")}}G[J].splice(H,1)}}}if(G[2].contains(C.year+"")||G[2].contains("*")){if(G[1].contains(C.month+1+"")||G[1].contains("*")){G[0].each(function(M){if(M>0){A.push(M.toInt())}});if(G[3]){for(var J=0;J<B;J++){var E=(J+D)%7;if(G[3].contains(E+"")){A.push(J+1)}}}}}},this);return A},bounds:function(C){var D=new Date(1000,0,1);var A=new Date(2999,11,31);var B=new Date().getDate()+this.options.direction.toInt();if(this.options.direction>0){D=new Date();D.setDate(B+this.options.pad*C.id)}if(this.options.direction<0){A=new Date();A.setDate(B-this.options.pad*(this.calendars.length-C.id-1))}C.els.each(function(F){if(F.getTag()=="select"){if(F.format.test("(y|Y)")){var E=[];F.getChildren().each(function(J){var I=this.unformat(J.value,F.format);if(!E.contains(I[0])){E.push(I[0])}},this);E.sort(this.sort);if(E[0]>D.getFullYear()){d=new Date(E[0],D.getMonth()+1,0);if(D.getDate()>d.getDate()){D.setDate(d.getDate())}D.setYear(E[0])}if(E.getLast()<A.getFullYear()){d=new Date(E.getLast(),A.getMonth()+1,0);if(A.getDate()>d.getDate()){A.setDate(d.getDate())}A.setYear(E.getLast())}}if(F.format.test("(F|m|M|n)")){var G=[];var H=[];F.getChildren().each(function(J){var I=this.unformat(J.value,F.format);if($type(I[0])!="number"||I[0]==E[0]){if(!G.contains(I[1])){G.push(I[1])}}if($type(I[0])!="number"||I[0]==E.getLast()){if(!H.contains(I[1])){H.push(I[1])}}},this);G.sort(this.sort);H.sort(this.sort);if(G[0]>D.getMonth()){d=new Date(D.getFullYear(),G[0]+1,0);if(D.getDate()>d.getDate()){D.setDate(d.getDate())}D.setMonth(G[0])}if(H.getLast()<A.getMonth()){d=new Date(D.getFullYear(),H.getLast()+1,0);if(A.getDate()>d.getDate()){A.setDate(d.getDate())}A.setMonth(H.getLast())}}}},this);return{start:D,end:A}},caption:function(G){var A={prev:{month:true,year:true},next:{month:true,year:true}};if(G.year==G.start.getFullYear()){A.prev.year=false;if(G.month==G.start.getMonth()&&this.options.navigation==1){A.prev.month=false}}if(G.year==G.end.getFullYear()){A.next.year=false;if(G.month==G.end.getMonth()&&this.options.navigation==1){A.next.month=false}}if($type(G.months)=="array"){if(G.months.length==1&&this.options.navigation==2){A.prev.month=A.next.month=false}}var B=new Element("caption");var E=new Element("a").addClass(this.classes.prev).appendText("\x3c");var D=new Element("a").addClass(this.classes.next).appendText("\x3e");if(this.options.navigation==2){var F=new Element("span").addClass(this.classes.month).injectInside(B);if(A.prev.month){E.clone().addEvent("click",function(H){this.navigate(H,"m",-1)}.pass(G,this)).injectInside(F)}F.adopt(new Element("span").appendText(this.options.months[G.month]));if(A.next.month){D.clone().addEvent("click",function(H){this.navigate(H,"m",1)}.pass(G,this)).injectInside(F)}var C=new Element("span").addClass(this.classes.year).injectInside(B);if(A.prev.year){E.clone().addEvent("click",function(H){this.navigate(H,"y",-1)}.pass(G,this)).injectInside(C)}C.adopt(new Element("span").appendText(G.year));if(A.next.year){D.clone().addEvent("click",function(H){this.navigate(H,"y",1)}.pass(G,this)).injectInside(C)}}else{if(A.prev.month&&this.options.navigation){E.clone().addEvent("click",function(H){this.navigate(H,"m",-1)}.pass(G,this)).injectInside(B)}B.adopt(new Element("span").addClass(this.classes.month).appendText(this.options.months[G.month]));B.adopt(new Element("span").addClass(this.classes.year).appendText(G.year));if(A.next.month&&this.options.navigation){D.clone().addEvent("click",function(H){this.navigate(H,"m",1)}.pass(G,this)).injectInside(B)}}return B},changed:function(A){A.val=this.read(A);$extend(A,this.values(A));this.rebuild(A);if(!A.val){return }if(A.val.getDate()<A.days[0]){A.val.setDate(A.days[0])}if(A.val.getDate()>A.days.getLast()){A.val.setDate(A.days.getLast())}A.els.each(function(B){B.value=this.format(A.val,B.format)},this);this.check(A);this.calendars.each(function(B){if(B.visible){this.display(B)}},this)},check:function(A){this.calendars.each(function(D,B){if(D.val){var E=false;if(B<A.id){var C=new Date(Date.parse(A.val));C.setDate(C.getDate()-(this.options.pad*(A.id-B)));if(C<D.val){E=true}}if(B>A.id){var C=new Date(Date.parse(A.val));C.setDate(C.getDate()+(this.options.pad*(B-A.id)));if(C>D.val){E=true}}if(E){if(D.start>C){C=D.start}if(D.end<C){C=D.end}D.month=C.getMonth();D.year=C.getFullYear();$extend(D,this.values(D));D.val=D.days.contains(C.getDate())?C:null;this.write(D);if(D.visible){this.display(D)}}}else{D.month=A.month;D.year=A.year}},this)},clicked:function(C,A,B){B.val=(this.value(B)==A)?null:new Date(B.year,B.month,A);this.write(B);if(!B.val){B.val=this.read(B)}if(B.val){this.check(B);this.toggle(B)}else{C.addClass(this.classes.valid);C.removeClass(this.classes.active)}},display:function(J){this.calendar.empty();this.calendar.className=this.classes.calendar+" "+this.options.months[J.month].toLowerCase();var K=new Element("div").injectInside(this.calendar);var R=new Element("table").injectInside(K).adopt(this.caption(J));var Q=new Element("thead").injectInside(R);var B=new Element("tr").injectInside(Q);for(var P=0;P<=6;P++){var E=this.options.days[(P+this.options.offset)%7];B.adopt(new Element("th",{title:E}).appendText(E.substr(0,1)))}var A=new Element("tbody").injectInside(R);var B=new Element("tr").injectInside(A);var T=new Date(J.year,J.month,1);var D=((T.getDay()-this.options.offset)+7)%7;var I=new Date(J.year,J.month+1,0).getDate();var L=new Date(J.year,J.month,0).getDate();var F=this.value(J);var N=J.days;var M=[];var G=[];this.calendars.each(function(X,W){if(X!=J&&X.val){if(J.year==X.val.getFullYear()&&J.month==X.val.getMonth()){M.push(X.val.getDate())}if(J.val){for(var V=1;V<=I;V++){T.setDate(V);if((W<J.id&&T>X.val&&T<J.val)||(W>J.id&&T>J.val&&T<X.val)){if(!G.contains(V)){G.push(V)}}}}}},this);var T=new Date();var S=new Date(T.getFullYear(),T.getMonth(),T.getDate()).getTime();for(var P=1;P<43;P++){if((P-1)%7==0){B=new Element("tr").injectInside(A)}var H=new Element("td").injectInside(B);var O=P-D;var U=new Date(J.year,J.month,O);var C="";if(O===F){C=this.classes.active}else{if(M.contains(O)){C=this.classes.inactive}else{if(N.contains(O)){C=this.classes.valid}else{if(O>=1&&O<=I){C=this.classes.invalid}}}}if(U.getTime()==S){C=C+" "+this.classes.today}if(G.contains(O)){C=C+" "+this.classes.hilite}H.addClass(C);if(N.contains(O)){H.setProperty("title",this.format(U,"D M jS Y"));H.addEvents({click:function(X,V,W){this.clicked(X,V,W)}.pass([H,O,J],this),mouseover:function(W,V){W.addClass(V)}.pass([H,this.classes.hover]),mouseout:function(W,V){W.removeClass(V)}.pass([H,this.classes.hover])})}if(O<1){O=L+O}else{if(O>I){O=O-I}}H.appendText(O)}},element:function(B,C,D){if($type(C)=="object"){for(var A in C){if(!this.element(A,C[A],D)){return false}}return true}B=$(B);if(!B){return false}B.format=C;if(B.getTag()=="select"){B.addEvent("change",function(E){this.changed(E)}.pass(D,this))}else{B.readOnly=true;B.addEvent("focus",function(E){this.toggle(E)}.pass(D,this))}D.els.push(B);return true},format:function(C,K){var I="";if(C){var E=C.getDate();var L=C.getDay();var D=this.options.days[L];var B=C.getMonth()+1;var H=this.options.months[B-1];var J=C.getFullYear()+"";for(var F=0,G=K.length;F<G;F++){var A=K.charAt(F);switch(A){case"y":J=J.substr(2);case"Y":I+=J;break;case"m":if(B<10){B="0"+B}case"n":I+=B;break;case"M":H=H.substr(0,3);case"F":I+=H;break;case"d":if(E<10){E="0"+E}case"j":I+=E;break;case"D":D=D.substr(0,3);case"l":I+=D;break;case"N":L+=1;case"w":I+=L;break;case"S":if(E%10==1&&E!="11"){I+="st"}else{if(E%10==2&&E!="12"){I+="nd"}else{if(E%10==3&&E!="13"){I+="rd"}else{I+="th"}}}break;default:I+=A}}}return I},navigate:function(C,B,D){switch(B){case"m":if($type(C.months)=="array"){var A=C.months.indexOf(C.month)+D;if(A<0||A==C.months.length){if(this.options.navigation==1){this.navigate(C,"y",D)}A=(A<0)?C.months.length-1:0}C.month=C.months[A]}else{var A=C.month+D;if(A<0||A==12){if(this.options.navigation==1){this.navigate(C,"y",D)}A=(A<0)?11:0}C.month=A}break;case"y":if($type(C.years)=="array"){var A=C.years.indexOf(C.year)+D;C.year=C.years[A]}else{C.year+=D}break}$extend(C,this.values(C));if($type(C.months)=="array"){var A=C.months.indexOf(C.month);if(A<0){C.month=C.months[0]}}this.display(C)},read:function(C){var A=[null,null,null];C.els.each(function(F){var E=this.unformat(F.value,F.format);E.each(function(H,G){if($type(H)=="number"){A[G]=H}})},this);if($type(A[0])=="number"){C.year=A[0]}if($type(A[1])=="number"){C.month=A[1]}var D=null;if(A.every(function(E){return $type(E)=="number"})){var B=new Date(A[0],A[1]+1,0).getDate();if(A[2]>B){A[2]=B}D=new Date(A[0],A[1],A[2])}return(C.val==D)?null:D},rebuild:function(A){A.els.each(function(B){if(B.getTag()=="select"&&B.format.test("^(d|j)$")){var C=this.value(A);if(!C){C=B.value.toInt()}B.empty();A.days.each(function(D){var E=new Element("option",{selected:(C==D),value:((B.format=="d"&&D<10)?"0"+D:D)}).appendText(D).injectInside(B)},this)}},this)},sort:function(B,A){return B-A},toggle:function(C){document.removeEvent("mousedown",this.fn);if(C.visible){C.visible=false;C.button.removeClass(this.classes.active);this.fx.start(1,0)}else{this.fn=function(I,H){var I=new Event(I);var G=I.target;var F=false;while(G!=document.body&&G.nodeType==1){if(G==this.calendar){F=true}this.calendars.each(function(J){if(J.button==G||J.els.contains(G)){F=true}});if(F){I.stop();return false}else{G=G.parentNode}}this.toggle(H)}.create({"arguments":C,bind:this,event:true});document.addEvent("mousedown",this.fn);this.calendars.each(function(F){if(F==C){F.visible=true;F.button.addClass(this.classes.active)}else{F.visible=false;F.button.removeClass(this.classes.active)}},this);var B=window.getSize().scrollSize;var E=C.button.getCoordinates();var A=E.right+this.options.tweak.x;var D=E.top+this.options.tweak.y;if(!this.calendar.coord){this.calendar.coord=this.calendar.getCoordinates()}if(A+this.calendar.coord.width>B.x){A-=(A+this.calendar.coord.width-B.x)}if(D+this.calendar.coord.height>B.y){D-=(D+this.calendar.coord.height-B.y)}this.calendar.setStyles({left:A+"px",top:D+"px"});if(window.ie6){this.iframe.setStyles({height:this.calendar.coord.height+"px",left:A+"px",top:D+"px",width:this.calendar.coord.width+"px"})}this.display(C);this.fx.start(0,1)}},unformat:function(B,G){G=G.escapeRegExp();var I={d:"([0-9]{2})",j:"([0-9]{1,2})",D:"("+this.options.days.map(function(J){return J.substr(0,3)}).join("|")+")",l:"("+this.options.days.join("|")+")",S:"(st|nd|rd|th)",F:"("+this.options.months.join("|")+")",m:"([0-9]{2})",M:"("+this.options.months.map(function(J){return J.substr(0,3)}).join("|")+")",n:"([0-9]{1,2})",Y:"([0-9]{4})",y:"([0-9]{2})"};var E=[];var F="";for(var C=0;C<G.length;C++){var H=G.charAt(C);if(I[H]){E.push(H);F+=I[H]}else{F+=H}}var D=B.match("^"+F+"$");var A=new Array(3);if(D){D=D.slice(1);E.each(function(K,J){J=D[J];switch(K){case"y":J="19"+J;case"Y":A[0]=J.toInt();break;case"F":J=J.substr(0,3);case"M":J=this.options.months.map(function(L){return L.substr(0,3)}).indexOf(J)+1;case"m":case"n":A[1]=J.toInt()-1;break;case"d":case"j":A[2]=J.toInt();break}},this)}return A},value:function(B){var A=null;if(B.val){if(B.year==B.val.getFullYear()&&B.month==B.val.getMonth()){A=B.val.getDate()}}return A},values:function(F){var D,A,H;F.els.each(function(I){if(I.getTag()=="select"){if(I.format.test("(y|Y)")){D=[];I.getChildren().each(function(K){var J=this.unformat(K.value,I.format);if(!D.contains(J[0])){D.push(J[0])}},this);D.sort(this.sort)}if(I.format.test("(F|m|M|n)")){A=[];I.getChildren().each(function(K){var J=this.unformat(K.value,I.format);if($type(J[0])!="number"||J[0]==F.year){if(!A.contains(J[1])){A.push(J[1])}}},this);A.sort(this.sort)}if(I.format.test("(d|j)")&&!I.format.test("^(d|j)$")){H=[];I.getChildren().each(function(K){var J=this.unformat(K.value,I.format);if(J[0]==F.year&&J[1]==F.month){if(!H.contains(J[2])){H.push(J[2])}}},this)}}},this);var G=1;var E=new Date(F.year,F.month+1,0).getDate();if(F.year==F.start.getFullYear()){if(A==null&&this.options.navigation==2){A=[];for(var C=0;C<12;C++){if(C>=F.start.getMonth()){A.push(C)}}}if(F.month==F.start.getMonth()){G=F.start.getDate()}}if(F.year==F.end.getFullYear()){if(A==null&&this.options.navigation==2){A=[];for(var C=0;C<12;C++){if(C<=F.end.getMonth()){A.push(C)}}}if(F.month==F.end.getMonth()){E=F.end.getDate()}}var B=this.blocked(F);if($type(H)=="array"){H=H.filter(function(I){if(I>=G&&I<=E&&!B.contains(I)){return I}})}else{H=[];for(var C=G;C<=E;C++){if(!B.contains(C)){H.push(C)}}}H.sort(this.sort);return{days:H,months:A,years:D}},write:function(A){this.rebuild(A);A.els.each(function(B){B.value=this.format(A.val,B.format)},this)}});Calendar.implement(new Events,new Options);



// FROM: /javascripts/common.js?1288225651
/**
 * COMMON DHTML FUNCTIONS
 * These are handy functions I use all the time.
 *
 * By Seth Banks (webmaster at subimage dot com)
 * http://www.subimage.com/
 *
 * Up to date code can be found at http://www.subimage.com/dhtml/
 *
 * This code is free for you to use anywhere, just keep this comment block.
 */

/**
 * X-browser event handler attachment and detachment
 * TH: Switched first true to false per http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
 *
 * @argument obj - the object to attach event to
 * @argument evType - name of the event - DONT ADD "on", pass only "mouseover", etc
 * @argument fn - function to call
 */
function addEvent(obj, evType, fn){
 if (obj.addEventListener){
    obj.addEventListener(evType, fn, false);
    return true;
 } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
 } else {
    return false;
 }
}
function removeEvent(obj, evType, fn, useCapture){
  if (obj.removeEventListener){
    obj.removeEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.detachEvent){
    var r = obj.detachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
}

/**
 * Code below taken from - http://www.evolt.org/article/document_body_doctype_switching_and_more/17/30655/
 *
 * Modified 4/22/04 to work with Opera/Moz (by webmaster at subimage dot com)
 *
 * Gets the full width/height because it's different for most browsers.
 */
function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight; 

	return window.undefined; 
}
function getViewportWidth() {
	var offset = 17;
	var width = null;
	if (window.innerWidth!=window.undefined) return window.innerWidth; 
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
	if (document.body) return document.body.clientWidth; 
}

/**
 * Gets the real scroll top
 */
function getScrollTop() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollTop;
	}
}
function getScrollLeft() {
	if (self.pageXOffset) // all except Explorer
	{
		return self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollLeft;
	}
}



// FROM: /javascripts/prototype.js?1288225651
/*  Prototype JavaScript framework, version 1.6.1
 *  (c) 2005-2009 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.6.1',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile.*Safari/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,
    SelectorsAPI: !!document.querySelector,
    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div');
      var form = document.createElement('form');
      var isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },
  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;


var Abstract = { };


var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {
  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0; i < properties.length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype;
    var properties = Object.keys(source);

    if (!Object.keys({ toString: true }).length) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames().first() == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  var _toString = Object.prototype.toString;

  function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(object) {
    var type = typeof object;
    switch (type) {
      case 'undefined':
      case 'function':
      case 'unknown': return;
      case 'boolean': return object.toString();
    }

    if (object === null) return 'null';
    if (object.toJSON) return object.toJSON();
    if (isElement(object)) return;

    var results = [];
    for (var property in object) {
      var value = toJSON(object[property]);
      if (!isUndefined(value))
        results.push(property.toJSON() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    var results = [];
    for (var property in object)
      results.push(property);
    return results;
  }

  function values(object) {
    var results = [];
    for (var property in object)
      results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({ }, object);
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) == "[object Array]";
  }


  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return typeof object === "function";
  }

  function isString(object) {
    return _toString.call(object) == "[object String]";
  }

  function isNumber(object) {
    return _toString.call(object) == "[object Number]";
  }

  function isUndefined(object) {
    return typeof object === "undefined";
  }

  extend(Object, {
    extend:        extend,
    inspect:       inspect,
    toJSON:        toJSON,
    toQueryString: toQueryString,
    toHTML:        toHTML,
    keys:          keys,
    values:        values,
    clone:         clone,
    isElement:     isElement,
    isArray:       isArray,
    isHash:        isHash,
    isFunction:    isFunction,
    isString:      isString,
    isNumber:      isNumber,
    isUndefined:   isUndefined
  });
})();
Object.extend(Function.prototype, (function() {
  var slice = Array.prototype.slice;

  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }

  function bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    var __method = this, args = slice.call(arguments, 1);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(context, a);
    }
  }

  function bindAsEventListener(context) {
    var __method = this, args = slice.call(arguments, 1);
    return function(event) {
      var a = update([event || window.event], args);
      return __method.apply(context, a);
    }
  }

  function curry() {
    if (!arguments.length) return this;
    var __method = this, args = slice.call(arguments, 0);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(this, a);
    }
  }

  function delay(timeout) {
    var __method = this, args = slice.call(arguments, 1);
    timeout = timeout * 1000
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  }

  function defer() {
    var args = update([0.01], arguments);
    return this.delay.apply(this, args);
  }

  function wrap(wrapper) {
    var __method = this;
    return function() {
      var a = update([__method.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }

  function methodize() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      var a = update([this], arguments);
      return __method.apply(null, a);
    };
  }

  return {
    argumentNames:       argumentNames,
    bind:                bind,
    bindAsEventListener: bindAsEventListener,
    curry:               curry,
    delay:               delay,
    defer:               defer,
    wrap:                wrap,
    methodize:           methodize
  }
})());


Date.prototype.toJSON = function() {
  return '"' + this.getUTCFullYear() + '-' +
    (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
    this.getUTCDate().toPaddedString(2) + 'T' +
    this.getUTCHours().toPaddedString(2) + ':' +
    this.getUTCMinutes().toPaddedString(2) + ':' +
    this.getUTCSeconds().toPaddedString(2) + 'Z"';
};


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch(e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, (function() {

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) return replacement;
    var template = new Template(replacement);
    return function(match) { return template.evaluate(match) };
  }

  function gsub(pattern, replacement) {
    var result = '', source = this, match;
    replacement = prepareReplacement(replacement);

    if (Object.isString(pattern))
      pattern = RegExp.escape(pattern);

    if (!(pattern.length || pattern.source)) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  }

  function strip() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script) });
  }

  function escapeHTML() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift());
        var value = pair.length > 1 ? pair.join('=') : pair[0];
        if (value != undefined) value = decodeURIComponent(value);

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  }

  function toArray() {
    return this.split('');
  }

  function succ() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  }

  function times(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  }

  function camelize() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }

  function underscore() {
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }

  function dasherize() {
    return this.replace(/_/g, '-');
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character];
      }
      return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }

  function toJSON() {
    return this.inspect(true);
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }

  function isJSON() {
    var str = this;
    if (str.blank()) return false;
    str = this.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
    return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON();
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1;
  }

  function startsWith(pattern) {
    return this.indexOf(pattern) === 0;
  }

  function endsWith(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
  }

  function empty() {
    return this == '';
  }

  function blank() {
    return /^\s*$/.test(this);
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }

  return {
    gsub:           gsub,
    sub:            sub,
    scan:           scan,
    truncate:       truncate,
    strip:          String.prototype.trim ? String.prototype.trim : strip,
    stripTags:      stripTags,
    stripScripts:   stripScripts,
    extractScripts: extractScripts,
    evalScripts:    evalScripts,
    escapeHTML:     escapeHTML,
    unescapeHTML:   unescapeHTML,
    toQueryParams:  toQueryParams,
    parseQuery:     toQueryParams,
    toArray:        toArray,
    succ:           succ,
    times:          times,
    camelize:       camelize,
    capitalize:     capitalize,
    underscore:     underscore,
    dasherize:      dasherize,
    inspect:        inspect,
    toJSON:         toJSON,
    unfilterJSON:   unfilterJSON,
    isJSON:         isJSON,
    evalJSON:       evalJSON,
    include:        include,
    startsWith:     startsWith,
    endsWith:       endsWith,
    empty:          empty,
    blank:          blank,
    interpolate:    interpolate
  };
})());

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return (match[1] + '');

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3];
      var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
  function each(iterator, context) {
    var index = 0;
    try {
      this._each(function(value) {
        iterator.call(context, value, index++);
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    var index = -number, slices = [], array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index);
      if (!result) throw $break;
    });
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index))
        throw $break;
    });
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function detect(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  }

  function findAll(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(RegExp.escape(filter));

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf))
      if (this.indexOf(object) != -1) return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  }

  function invoke(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value >= result)
        result = value;
    });
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value < result)
        result = value;
    });
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator.call(context, value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  }

  function pluck(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function(value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }









  return {
    each:       each,
    eachSlice:  eachSlice,
    all:        all,
    every:      all,
    any:        any,
    some:       any,
    collect:    collect,
    map:        collect,
    detect:     detect,
    findAll:    findAll,
    select:     findAll,
    filter:     findAll,
    grep:       grep,
    include:    include,
    member:     include,
    inGroupsOf: inGroupsOf,
    inject:     inject,
    invoke:     invoke,
    max:        max,
    min:        min,
    partition:  partition,
    pluck:      pluck,
    reject:     reject,
    sortBy:     sortBy,
    toArray:    toArray,
    entries:    toArray,
    zip:        zip,
    size:       size,
    inspect:    inspect,
    find:       detect
  };
})();
function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}

function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
  var arrayProto = Array.prototype,
      slice = arrayProto.slice,
      _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

  function each(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(function(value) {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], function(array, value) {
      if (Object.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    var values = slice.call(arguments, 0);
    return this.select(function(value) {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  }

  function uniq(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(function(item) {
      return array.detect(function(value) { return item === value });
    });
  }


  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }

  function toJSON() {
    var results = [];
    this.each(function(object) {
      var value = Object.toJSON(object);
      if (!Object.isUndefined(value)) results.push(value);
    });
    return '[' + results.join(', ') + ']';
  }

  function indexOf(item, i) {
    i || (i = 0);
    var length = this.length;
    if (i < 0) i = length + i;
    for (; i < length; i++)
      if (this[i] === item) return i;
    return -1;
  }

  function lastIndexOf(item, i) {
    i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
    var n = this.slice(0, i).reverse().indexOf(item);
    return (n < 0) ? n : i - n - 1;
  }

  function concat() {
    var array = slice.call(this, 0), item;
    for (var i = 0, length = arguments.length; i < length; i++) {
      item = arguments[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++)
          array.push(item[j]);
      } else {
        array.push(item);
      }
    }
    return array;
  }

  Object.extend(arrayProto, Enumerable);

  if (!arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each:     _each,
    clear:     clear,
    first:     first,
    last:      last,
    compact:   compact,
    flatten:   flatten,
    without:   without,
    reverse:   reverse,
    uniq:      uniq,
    intersect: intersect,
    clone:     clone,
    toArray:   clone,
    size:      size,
    inspect:   inspect,
    toJSON:    toJSON
  });

  var CONCAT_ARGUMENTS_BUGGY = (function() {
    return [].concat(arguments)[0][0] !== 1;
  })(1,2)

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
  function initialize(object) {
    this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
  }

  function _each(iterator) {
    for (var key in this._object) {
      var value = this._object[key], pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  }

  function set(key, value) {
    return this._object[key] = value;
  }

  function get(key) {
    if (this._object[key] !== Object.prototype[key])
      return this._object[key];
  }

  function unset(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  }

  function toObject() {
    return Object.clone(this._object);
  }

  function keys() {
    return this.pluck('key');
  }

  function values() {
    return this.pluck('value');
  }

  function index(value) {
    var match = this.detect(function(pair) {
      return pair.value === value;
    });
    return match && match.key;
  }

  function merge(object) {
    return this.clone().update(object);
  }

  function update(object) {
    return new Hash(object).inject(this, function(result, pair) {
      result.set(pair.key, pair.value);
      return result;
    });
  }

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;
    return key + '=' + encodeURIComponent(String.interpret(value));
  }

  function toQueryString() {
    return this.inject([], function(results, pair) {
      var key = encodeURIComponent(pair.key), values = pair.value;

      if (values && typeof values == 'object') {
        if (Object.isArray(values))
          return results.concat(values.map(toQueryPair.curry(key)));
      } else results.push(toQueryPair(key, values));
      return results;
    }).join('&');
  }

  function inspect() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }

  function toJSON() {
    return Object.toJSON(this.toObject());
  }

  function clone() {
    return new Hash(this);
  }

  return {
    initialize:             initialize,
    _each:                  _each,
    set:                    set,
    get:                    get,
    unset:                  unset,
    toObject:               toObject,
    toTemplateReplacements: toObject,
    keys:                   keys,
    values:                 values,
    index:                  index,
    merge:                  merge,
    update:                 update,
    toQueryString:          toQueryString,
    inspect:                inspect,
    toJSON:                 toJSON,
    clone:                  clone
  };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function toColorPart() {
    return this.toPaddedString(2, 16);
  }

  function succ() {
    return this + 1;
  }

  function times(iterator, context) {
    $R(0, this, true).each(iterator, context);
    return this;
  }

  function toPaddedString(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  }

  function toJSON() {
    return isFinite(this) ? this.toString() : 'null';
  }

  function abs() {
    return Math.abs(this);
  }

  function round() {
    return Math.round(this);
  }

  function ceil() {
    return Math.ceil(this);
  }

  function floor() {
    return Math.floor(this);
  }

  return {
    toColorPart:    toColorPart,
    succ:           succ,
    times:          times,
    toPaddedString: toPaddedString,
    toJSON:         toJSON,
    abs:            abs,
    round:          round,
    ceil:           ceil,
    floor:          floor
  };
})());

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
  function initialize(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  }

  function _each(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  }

  function include(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }

  return {
    initialize: initialize,
    _each:      _each,
    include:    include
  };
})());



var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isString(this.options.parameters))
      this.options.parameters = this.options.parameters.toQueryParams();
    else if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.clone(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params['_method'] = this.method;
      this.method = 'post';
    }

    this.parameters = params;

    if (params = Object.toQueryString(params)) {
      if (this.method == 'get')
        this.url += (this.url.include('?') ? '&' : '?') + params;
      else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))
        params += '&_=';
    }

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300);
  },

  getStatus: function() {
    try {
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if(readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;
    json = decodeURIComponent(escape(json));
    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});



function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(Element.extend(query.snapshotItem(i)));
    return results;
  };
}

/*--------------------------------------------------------------------------*/

if (!window.Node) var Node = { };

if (!Node.ELEMENT_NODE) {
  Object.extend(Node, {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  });
}


(function(global) {

  var SETATTRIBUTE_IGNORES_NAME = (function(){
    var elForm = document.createElement("form");
    var elInput = document.createElement("input");
    var root = document.documentElement;
    elInput.setAttribute("name", "test");
    elForm.appendChild(elInput);
    root.appendChild(elForm);
    var isBuggy = elForm.elements
      ? (typeof elForm.elements.test == "undefined")
      : null;
    root.removeChild(elForm);
    elForm = elInput = null;
    return isBuggy;
  })();

  var element = global.Element;
  global.Element = function(tagName, attributes) {
    attributes = attributes || { };
    tagName = tagName.toLowerCase();
    var cache = Element.cache;
    if (SETATTRIBUTE_IGNORES_NAME && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }
    if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));
    return Element.writeAttribute(cache[tagName].cloneNode(false), attributes);
  };
  Object.extend(global.Element, element || { });
  if (element) global.Element.prototype = element.prototype;
})(this);

Element.cache = { };
Element.idCounter = 1;

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },


  hide: function(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  },

  show: function(element) {
    element = $(element);
    element.style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: (function(){

    var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
      var el = document.createElement("select"),
          isBuggy = true;
      el.innerHTML = "<option value=\"test\">test</option>";
      if (el.options && el.options[0]) {
        isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
      }
      el = null;
      return isBuggy;
    })();

    var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
      try {
        var el = document.createElement("table");
        if (el && el.tBodies) {
          el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
          var isBuggy = typeof el.tBodies[0] == "undefined";
          el = null;
          return isBuggy;
        }
      } catch (e) {
        return true;
      }
    })();

    var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
      var s = document.createElement("script"),
          isBuggy = false;
      try {
        s.appendChild(document.createTextNode(""));
        isBuggy = !s.firstChild ||
          s.firstChild && s.firstChild.nodeType !== 3;
      } catch (e) {
        isBuggy = true;
      }
      s = null;
      return isBuggy;
    })();

    function update(element, content) {
      element = $(element);

      if (content && content.toElement)
        content = content.toElement();

      if (Object.isElement(content))
        return element.update().insert(content);

      content = Object.toHTML(content);

      var tagName = element.tagName.toUpperCase();

      if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
        element.text = content;
        return element;
      }

      if (SELECT_ELEMENT_INNERHTML_BUGGY || TABLE_ELEMENT_INNERHTML_BUGGY) {
        if (tagName in Element._insertionTranslations.tags) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          Element._getContentFromAnonymousElement(tagName, content.stripScripts())
            .each(function(node) {
              element.appendChild(node)
            });
        }
        else {
          element.innerHTML = content.stripScripts();
        }
      }
      else {
        element.innerHTML = content.stripScripts();
      }

      content.evalScripts.bind(content).defer();
      return element;
    }

    return update;
  })(),

  replace: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }
    element.parentNode.replaceChild(content, element);
    return element;
  },

  insert: function(element, insertions) {
    element = $(element);

    if (Object.isString(insertions) || Object.isNumber(insertions) ||
        Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))
          insertions = {bottom:insertions};

    var content, insert, tagName, childNodes;

    for (var position in insertions) {
      content  = insertions[position];
      position = position.toLowerCase();
      insert = Element._insertionTranslations[position];

      if (content && content.toElement) content = content.toElement();
      if (Object.isElement(content)) {
        insert(element, content);
        continue;
      }

      content = Object.toHTML(content);

      tagName = ((position == 'before' || position == 'after')
        ? element.parentNode : element).tagName.toUpperCase();

      childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());

      if (position == 'top' || position == 'after') childNodes.reverse();
      childNodes.each(insert.curry(element));

      content.evalScripts.bind(content).defer();
    }

    return element;
  },

  wrap: function(element, wrapper, attributes) {
    element = $(element);
    if (Object.isElement(wrapper))
      $(wrapper).writeAttribute(attributes || { });
    else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);
    else wrapper = new Element('div', wrapper);
    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(), attribute = pair.last();
      var value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property) {
    element = $(element);
    var elements = [];
    while (element = element[property])
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
    return elements;
  },

  ancestors: function(element) {
    return Element.recursivelyCollect(element, 'parentNode');
  },

  descendants: function(element) {
    return Element.select(element, "*");
  },

  firstDescendant: function(element) {
    element = $(element).firstChild;
    while (element && element.nodeType != 1) element = element.nextSibling;
    return $(element);
  },

  immediateDescendants: function(element) {
    if (!(element = $(element).firstChild)) return [];
    while (element && element.nodeType != 1) element = element.nextSibling;
    if (element) return [element].concat($(element).nextSiblings());
    return [];
  },

  previousSiblings: function(element) {
    return Element.recursivelyCollect(element, 'previousSibling');
  },

  nextSiblings: function(element) {
    return Element.recursivelyCollect(element, 'nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return Element.previousSiblings(element).reverse()
      .concat(Element.nextSiblings(element));
  },

  match: function(element, selector) {
    if (Object.isString(selector))
      selector = new Selector(selector);
    return selector.match($(element));
  },

  up: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(element.parentNode);
    var ancestors = Element.ancestors(element);
    return Object.isNumber(expression) ? ancestors[expression] :
      Selector.findElement(ancestors, expression, index);
  },

  down: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return Element.firstDescendant(element);
    return Object.isNumber(expression) ? Element.descendants(element)[expression] :
      Element.select(element, expression)[index || 0];
  },

  previous: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.previousElementSibling(element));
    var previousSiblings = Element.previousSiblings(element);
    return Object.isNumber(expression) ? previousSiblings[expression] :
      Selector.findElement(previousSiblings, expression, index);
  },

  next: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.nextElementSibling(element));
    var nextSiblings = Element.nextSiblings(element);
    return Object.isNumber(expression) ? nextSiblings[expression] :
      Selector.findElement(nextSiblings, expression, index);
  },


  select: function(element) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Selector.findChildElements(element, args);
  },

  adjacent: function(element) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Selector.findChildElements(element.parentNode, args).without(element);
  },

  identify: function(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;
    do { id = 'anonymous_element_' + Element.idCounter++ } while ($(id));
    Element.writeAttribute(element, 'id', id);
    return id;
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (Prototype.Browser.IE) {
      var t = Element._attributeTranslations.read;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name]) name = t.names[name];
      if (name.include(':')) {
        return (!element.attributes || !element.attributes[name]) ? null :
         element.attributes[name].value;
      }
    }
    return element.getAttribute(name);
  },

  writeAttribute: function(element, name, value) {
    element = $(element);
    var attributes = { }, t = Element._attributeTranslations.write;

    if (typeof name == 'object') attributes = name;
    else attributes[name] = Object.isUndefined(value) ? true : value;

    for (var attr in attributes) {
      name = t.names[attr] || attr;
      value = attributes[attr];
      if (t.values[attr]) name = t.values[attr](element, value);
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }
    return element;
  },

  getHeight: function(element) {
    return Element.getDimensions(element).height;
  },

  getWidth: function(element) {
    return Element.getDimensions(element).width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    if (!Element.hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    element.className = element.className.replace(
      new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').strip();
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element[Element.hasClassName(element, className) ?
      'removeClassName' : 'addClassName'](element, className);
  },

  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.blank();
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);

    if (element.compareDocumentPosition)
      return (element.compareDocumentPosition(ancestor) & 8) === 8;

    if (ancestor.contains)
      return ancestor.contains(element) && ancestor !== element;

    while (element = element.parentNode)
      if (element == ancestor) return true;

    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = Element.cumulativeOffset(element);
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    style = style == 'float' ? 'cssFloat' : style.camelize();
    var value = element.style[style];
    if (!value || value == 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  },

  getOpacity: function(element) {
    return $(element).getStyle('opacity');
  },

  setStyle: function(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;
    if (Object.isString(styles)) {
      element.style.cssText += ';' + styles;
      return styles.include('opacity') ?
        element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
    }
    for (var property in styles)
      if (property == 'opacity') element.setOpacity(styles[property]);
      else
        elementStyle[(property == 'float' || property == 'cssFloat') ?
          (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :
            property] = styles[property];

    return element;
  },

  setOpacity: function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;
    return element;
  },

  getDimensions: function(element) {
    element = $(element);
    var display = Element.getStyle(element, 'display');
    if (display != 'none' && display != null) // Safari bug
      return {width: element.offsetWidth, height: element.offsetHeight};

    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;
    els.visibility = 'hidden';
    if (originalPosition != 'fixed') // Switching fixed to absolute causes issues in Safari
      els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      if (Prototype.Browser.Opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = Element.getStyle(element, 'overflow') || 'auto';
    if (element._overflow !== 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element.tagName.toUpperCase() == 'BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  absolutize: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') == 'absolute') return element;

    var offsets = Element.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';
    element.style.height = height + 'px';
    return element;
  },

  relativize: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') == 'relative') return element;

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
    return element;
  },

  cumulativeScrollOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  getOffsetParent: function(element) {
    if (element.offsetParent) return $(element.offsetParent);
    if (element == document.body) return $(element);

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return $(element);

    return $(document.body);
  },

  viewportOffset: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      if (element.offsetParent == document.body &&
        Element.getStyle(element, 'position') == 'absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (!Prototype.Browser.Opera || (element.tagName && (element.tagName.toUpperCase() == 'BODY'))) {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);

    return Element._returnOffset(valueL, valueT);
  },

  clonePosition: function(element, source) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || { });

    source = $(source);
    var p = Element.viewportOffset(source);

    element = $(element);
    var delta = [0, 0];
    var parent = null;
    if (Element.getStyle(element, 'position') == 'absolute') {
      parent = Element.getOffsetParent(element);
      delta = Element.viewportOffset(parent);
    }

    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if (options.setWidth)  element.style.width = source.offsetWidth + 'px';
    if (options.setHeight) element.style.height = source.offsetHeight + 'px';
    return element;
  }
};

Object.extend(Element.Methods, {
  getElementsBySelector: Element.Methods.select,

  childElements: Element.Methods.immediateDescendants
});

Element._attributeTranslations = {
  write: {
    names: {
      className: 'class',
      htmlFor:   'for'
    },
    values: { }
  }
};

if (Prototype.Browser.Opera) {
  Element.Methods.getStyle = Element.Methods.getStyle.wrap(
    function(proceed, element, style) {
      switch (style) {
        case 'left': case 'top': case 'right': case 'bottom':
          if (proceed(element, 'position') === 'static') return null;
        case 'height': case 'width':
          if (!Element.visible(element)) return null;

          var dim = parseInt(proceed(element, style), 10);

          if (dim !== element['offset' + style.capitalize()])
            return dim + 'px';

          var properties;
          if (style === 'height') {
            properties = ['border-top-width', 'padding-top',
             'padding-bottom', 'border-bottom-width'];
          }
          else {
            properties = ['border-left-width', 'padding-left',
             'padding-right', 'border-right-width'];
          }
          return properties.inject(dim, function(memo, property) {
            var val = proceed(element, property);
            return val === null ? memo : memo - parseInt(val, 10);
          }) + 'px';
        default: return proceed(element, style);
      }
    }
  );

  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(
    function(proceed, element, attribute) {
      if (attribute === 'title') return element.title;
      return proceed(element, attribute);
    }
  );
}

else if (Prototype.Browser.IE) {
  Element.Methods.getOffsetParent = Element.Methods.getOffsetParent.wrap(
    function(proceed, element) {
      element = $(element);
      try { element.offsetParent }
      catch(e) { return $(document.body) }
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);
      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    }
  );

  $w('positionedOffset viewportOffset').each(function(method) {
    Element.Methods[method] = Element.Methods[method].wrap(
      function(proceed, element) {
        element = $(element);
        try { element.offsetParent }
        catch(e) { return Element._returnOffset(0,0) }
        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);
        var offsetParent = element.getOffsetParent();
        if (offsetParent && offsetParent.getStyle('position') === 'fixed')
          offsetParent.setStyle({ zoom: 1 });
        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );
  });

  Element.Methods.cumulativeOffset = Element.Methods.cumulativeOffset.wrap(
    function(proceed, element) {
      try { element.offsetParent }
      catch(e) { return Element._returnOffset(0,0) }
      return proceed(element);
    }
  );

  Element.Methods.getStyle = function(element, style) {
    element = $(element);
    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
    var value = element.style[style];
    if (!value && element.currentStyle) value = element.currentStyle[style];

    if (style == 'opacity') {
      if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if (value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }

    if (value == 'auto') {
      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
        return element['offset' + style.capitalize()] + 'px';
      return null;
    }
    return value;
  };

  Element.Methods.setOpacity = function(element, value) {
    function stripAlpha(filter){
      return filter.replace(/alpha\([^\)]*\)/gi,'');
    }
    element = $(element);
    var currentStyle = element.currentStyle;
    if ((currentStyle && !currentStyle.hasLayout) ||
      (!currentStyle && element.style.zoom == 'normal'))
        element.style.zoom = 1;

    var filter = element.getStyle('filter'), style = element.style;
    if (value == 1 || value === '') {
      (filter = stripAlpha(filter)) ?
        style.filter = filter : style.removeAttribute('filter');
      return element;
    } else if (value < 0.00001) value = 0;
    style.filter = stripAlpha(filter) +
      'alpha(opacity=' + (value * 100) + ')';
    return element;
  };

  Element._attributeTranslations = (function(){

    var classProp = 'className';
    var forProp = 'for';

    var el = document.createElement('div');

    el.setAttribute(classProp, 'x');

    if (el.className !== 'x') {
      el.setAttribute('class', 'x');
      if (el.className === 'x') {
        classProp = 'class';
      }
    }
    el = null;

    el = document.createElement('label');
    el.setAttribute(forProp, 'x');
    if (el.htmlFor !== 'x') {
      el.setAttribute('htmlFor', 'x');
      if (el.htmlFor === 'x') {
        forProp = 'htmlFor';
      }
    }
    el = null;

    return {
      read: {
        names: {
          'class':      classProp,
          'className':  classProp,
          'for':        forProp,
          'htmlFor':    forProp
        },
        values: {
          _getAttr: function(element, attribute) {
            return element.getAttribute(attribute);
          },
          _getAttr2: function(element, attribute) {
            return element.getAttribute(attribute, 2);
          },
          _getAttrNode: function(element, attribute) {
            var node = element.getAttributeNode(attribute);
            return node ? node.value : "";
          },
          _getEv: (function(){

            var el = document.createElement('div');
            el.onclick = Prototype.emptyFunction;
            var value = el.getAttribute('onclick');
            var f;

            if (String(value).indexOf('{') > -1) {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                attribute = attribute.toString();
                attribute = attribute.split('{')[1];
                attribute = attribute.split('}')[0];
                return attribute.strip();
              };
            }
            else if (value === '') {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                return attribute.strip();
              };
            }
            el = null;
            return f;
          })(),
          _flag: function(element, attribute) {
            return $(element).hasAttribute(attribute) ? attribute : null;
          },
          style: function(element) {
            return element.style.cssText.toLowerCase();
          },
          title: function(element) {
            return element.title;
          }
        }
      }
    }
  })();

  Element._attributeTranslations.write = {
    names: Object.extend({
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    }, Element._attributeTranslations.read.names),
    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  Element._attributeTranslations.has = {};

  $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +
      'encType maxLength readOnly longDesc frameBorder').each(function(attr) {
    Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;
    Element._attributeTranslations.has[attr.toLowerCase()] = attr;
  });

  (function(v) {
    Object.extend(v, {
      href:        v._getAttr2,
      src:         v._getAttr2,
      type:        v._getAttr,
      action:      v._getAttrNode,
      disabled:    v._flag,
      checked:     v._flag,
      readonly:    v._flag,
      multiple:    v._flag,
      onload:      v._getEv,
      onunload:    v._getEv,
      onclick:     v._getEv,
      ondblclick:  v._getEv,
      onmousedown: v._getEv,
      onmouseup:   v._getEv,
      onmouseover: v._getEv,
      onmousemove: v._getEv,
      onmouseout:  v._getEv,
      onfocus:     v._getEv,
      onblur:      v._getEv,
      onkeypress:  v._getEv,
      onkeydown:   v._getEv,
      onkeyup:     v._getEv,
      onsubmit:    v._getEv,
      onreset:     v._getEv,
      onselect:    v._getEv,
      onchange:    v._getEv
    });
  })(Element._attributeTranslations.read.values);

  if (Prototype.BrowserFeatures.ElementExtensions) {
    (function() {
      function _descendants(element) {
        var nodes = element.getElementsByTagName('*'), results = [];
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName !== "!") // Filter out comment nodes.
            results.push(node);
        return results;
      }

      Element.Methods.down = function(element, expression, index) {
        element = $(element);
        if (arguments.length == 1) return element.firstDescendant();
        return Object.isNumber(expression) ? _descendants(element)[expression] :
          Element.select(element, expression)[index || 0];
      }
    })();
  }

}

else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1) ? 0.999999 :
      (value === '') ? '' : (value < 0.00001) ? 0 : value;
    return element;
  };
}

else if (Prototype.Browser.WebKit) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;

    if (value == 1)
      if(element.tagName.toUpperCase() == 'IMG' && element.width) {
        element.width++; element.width--;
      } else try {
        var n = document.createTextNode(' ');
        element.appendChild(n);
        element.removeChild(n);
      } catch (e) { }

    return element;
  };

  Element.Methods.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return Element._returnOffset(valueL, valueT);
  };
}

if ('outerHTML' in document.documentElement) {
  Element.Methods.replace = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (Element._insertionTranslations.tags[tagName]) {
      var nextSibling = element.next();
      var fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
      parent.removeChild(element);
      if (nextSibling)
        fragments.each(function(node) { parent.insertBefore(node, nextSibling) });
      else
        fragments.each(function(node) { parent.appendChild(node) });
    }
    else element.outerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

Element._returnOffset = function(l, t) {
  var result = [l, t];
  result.left = l;
  result.top = t;
  return result;
};

Element._getContentFromAnonymousElement = function(tagName, html) {
  var div = new Element('div'), t = Element._insertionTranslations.tags[tagName];
  if (t) {
    div.innerHTML = t[0] + html + t[1];
    t[2].times(function() { div = div.firstChild });
  } else div.innerHTML = html;
  return $A(div.childNodes);
};

Element._insertionTranslations = {
  before: function(element, node) {
    element.parentNode.insertBefore(node, element);
  },
  top: function(element, node) {
    element.insertBefore(node, element.firstChild);
  },
  bottom: function(element, node) {
    element.appendChild(node);
  },
  after: function(element, node) {
    element.parentNode.insertBefore(node, element.nextSibling);
  },
  tags: {
    TABLE:  ['<table>',                '</table>',                   1],
    TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
    TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
    TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
    SELECT: ['<select>',               '</select>',                  1]
  }
};

(function() {
  var tags = Element._insertionTranslations.tags;
  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH:    tags.TD
  });
})();

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    attribute = Element._attributeTranslations.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }
};

Element.Methods.ByTag = { };

Object.extend(Element, Element.Methods);

(function(div) {

  if (!Prototype.BrowserFeatures.ElementExtensions && div['__proto__']) {
    window.HTMLElement = { };
    window.HTMLElement.prototype = div['__proto__'];
    Prototype.BrowserFeatures.ElementExtensions = true;
  }

  div = null;

})(document.createElement('div'))

Element.extend = (function() {

  function checkDeficiency(tagName) {
    if (typeof window.Element != 'undefined') {
      var proto = window.Element.prototype;
      if (proto) {
        var id = '_' + (Math.random()+'').slice(2);
        var el = document.createElement(tagName);
        proto[id] = 'x';
        var isBuggy = (el[id] !== 'x');
        delete proto[id];
        el = null;
        return isBuggy;
      }
    }
    return false;
  }

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY = checkDeficiency('object');

  if (Prototype.BrowserFeatures.SpecificElementExtensions) {
    if (HTMLOBJECTELEMENT_PROTOTYPE_BUGGY) {
      return function(element) {
        if (element && typeof element._extendedByPrototype == 'undefined') {
          var t = element.tagName;
          if (t && (/^(?:object|applet|embed)$/i.test(t))) {
            extendElementWith(element, Element.Methods);
            extendElementWith(element, Element.Methods.Simulated);
            extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
          }
        }
        return element;
      }
    }
    return Prototype.K;
  }

  var Methods = { }, ByTag = Element.Methods.ByTag;

  var extend = Object.extend(function(element) {
    if (!element || typeof element._extendedByPrototype != 'undefined' ||
        element.nodeType != 1 || element == window) return element;

    var methods = Object.clone(Methods),
        tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);

    element._extendedByPrototype = Prototype.emptyFunction;
    return element;

  }, {
    refresh: function() {
      if (!Prototype.BrowserFeatures.ElementExtensions) {
        Object.extend(Methods, Element.Methods);
        Object.extend(Methods, Element.Methods.Simulated);
      }
    }
  });

  extend.refresh();
  return extend;
})();

Element.hasAttribute = function(element, attribute) {
  if (element.hasAttribute) return element.hasAttribute(attribute);
  return Element.Methods.Simulated.hasAttribute(element, attribute);
};

Element.addMethods = function(methods) {
  var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;

  if (!methods) {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods)
    });
  }

  if (arguments.length == 2) {
    var tagName = methods;
    methods = arguments[1];
  }

  if (!tagName) Object.extend(Element.Methods, methods || { });
  else {
    if (Object.isArray(tagName)) tagName.each(extend);
    else extend(tagName);
  }

  function extend(tagName) {
    tagName = tagName.toUpperCase();
    if (!Element.Methods.ByTag[tagName])
      Element.Methods.ByTag[tagName] = { };
    Object.extend(Element.Methods.ByTag[tagName], methods);
  }

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    var element = document.createElement(tagName);
    var proto = element['__proto__'] || element.constructor.prototype;
    element = null;
    return proto;
  }

  var elementPrototype = window.HTMLElement ? HTMLElement.prototype :
   Element.prototype;

  if (F.ElementExtensions) {
    copy(Element.Methods, elementPrototype);
    copy(Element.Methods.Simulated, elementPrototype, true);
  }

  if (F.SpecificElementExtensions) {
    for (var tag in Element.Methods.ByTag) {
      var klass = findDOMClass(tag);
      if (Object.isUndefined(klass)) continue;
      copy(T[tag], klass.prototype);
    }
  }

  Object.extend(Element, Element.Methods);
  delete Element.ByTag;

  if (Element.extend.refresh) Element.extend.refresh();
  Element.cache = { };
};


document.viewport = {

  getDimensions: function() {
    return { width: this.getWidth(), height: this.getHeight() };
  },

  getScrollOffsets: function() {
    return Element._returnOffset(
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop);
  }
};

(function(viewport) {
  var B = Prototype.Browser, doc = document, element, property = {};

  function getRootElement() {
    if (B.WebKit && !doc.evaluate)
      return document;

    if (B.Opera && window.parseFloat(window.opera.version()) < 9.5)
      return document.body;

    return document.documentElement;
  }

  function define(D) {
    if (!element) element = getRootElement();

    property[D] = 'client' + D;

    viewport['get' + D] = function() { return element[property[D]] };
    return viewport['get' + D]();
  }

  viewport.getWidth  = define.curry('Width');

  viewport.getHeight = define.curry('Height');
})(document.viewport);


Element.Storage = {
  UID: 1
};

Element.addMethods({
  getStorage: function(element) {
    if (!(element = $(element))) return;

    var uid;
    if (element === window) {
      uid = 0;
    } else {
      if (typeof element._prototypeUID === "undefined")
        element._prototypeUID = [Element.Storage.UID++];
      uid = element._prototypeUID[0];
    }

    if (!Element.Storage[uid])
      Element.Storage[uid] = $H();

    return Element.Storage[uid];
  },

  store: function(element, key, value) {
    if (!(element = $(element))) return;

    if (arguments.length === 2) {
      Element.getStorage(element).update(key);
    } else {
      Element.getStorage(element).set(key, value);
    }

    return element;
  },

  retrieve: function(element, key, defaultValue) {
    if (!(element = $(element))) return;
    var hash = Element.getStorage(element), value = hash.get(key);

    if (Object.isUndefined(value)) {
      hash.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  },

  clone: function(element, deep) {
    if (!(element = $(element))) return;
    var clone = element.cloneNode(deep);
    clone._prototypeUID = void 0;
    if (deep) {
      var descendants = Element.select(clone, '*'),
          i = descendants.length;
      while (i--) {
        descendants[i]._prototypeUID = void 0;
      }
    }
    return Element.extend(clone);
  }
});
/* Portions of the Selector class are derived from Jack Slocum's DomQuery,
 * part of YUI-Ext version 0.40, distributed under the terms of an MIT-style
 * license.  Please see http://www.yui-ext.com/ for more information. */

var Selector = Class.create({
  initialize: function(expression) {
    this.expression = expression.strip();

    if (this.shouldUseSelectorsAPI()) {
      this.mode = 'selectorsAPI';
    } else if (this.shouldUseXPath()) {
      this.mode = 'xpath';
      this.compileXPathMatcher();
    } else {
      this.mode = "normal";
      this.compileMatcher();
    }

  },

  shouldUseXPath: (function() {

    var IS_DESCENDANT_SELECTOR_BUGGY = (function(){
      var isBuggy = false;
      if (document.evaluate && window.XPathResult) {
        var el = document.createElement('div');
        el.innerHTML = '<ul><li></li></ul><div><ul><li></li></ul></div>';

        var xpath = ".//*[local-name()='ul' or local-name()='UL']" +
          "//*[local-name()='li' or local-name()='LI']";

        var result = document.evaluate(xpath, el, null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        isBuggy = (result.snapshotLength !== 2);
        el = null;
      }
      return isBuggy;
    })();

    return function() {
      if (!Prototype.BrowserFeatures.XPath) return false;

      var e = this.expression;

      if (Prototype.Browser.WebKit &&
       (e.include("-of-type") || e.include(":empty")))
        return false;

      if ((/(\[[\w-]*?:|:checked)/).test(e))
        return false;

      if (IS_DESCENDANT_SELECTOR_BUGGY) return false;

      return true;
    }

  })(),

  shouldUseSelectorsAPI: function() {
    if (!Prototype.BrowserFeatures.SelectorsAPI) return false;

    if (Selector.CASE_INSENSITIVE_CLASS_NAMES) return false;

    if (!Selector._div) Selector._div = new Element('div');

    try {
      Selector._div.querySelector(this.expression);
    } catch(e) {
      return false;
    }

    return true;
  },

  compileMatcher: function() {
    var e = this.expression, ps = Selector.patterns, h = Selector.handlers,
        c = Selector.criteria, le, p, m, len = ps.length, name;

    if (Selector._cache[e]) {
      this.matcher = Selector._cache[e];
      return;
    }

    this.matcher = ["this.matcher = function(root) {",
                    "var r = root, h = Selector.handlers, c = false, n;"];

    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        p = ps[i].re;
        name = ps[i].name;
        if (m = e.match(p)) {
          this.matcher.push(Object.isFunction(c[name]) ? c[name](m) :
            new Template(c[name]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.matcher.push("return h.unique(n);\n}");
    eval(this.matcher.join('\n'));
    Selector._cache[this.expression] = this.matcher;
  },

  compileXPathMatcher: function() {
    var e = this.expression, ps = Selector.patterns,
        x = Selector.xpath, le, m, len = ps.length, name;

    if (Selector._cache[e]) {
      this.xpath = Selector._cache[e]; return;
    }

    this.matcher = ['.//*'];
    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        name = ps[i].name;
        if (m = e.match(ps[i].re)) {
          this.matcher.push(Object.isFunction(x[name]) ? x[name](m) :
            new Template(x[name]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.xpath = this.matcher.join('');
    Selector._cache[this.expression] = this.xpath;
  },

  findElements: function(root) {
    root = root || document;
    var e = this.expression, results;

    switch (this.mode) {
      case 'selectorsAPI':
        if (root !== document) {
          var oldId = root.id, id = $(root).identify();
          id = id.replace(/([\.:])/g, "\\$1");
          e = "#" + id + " " + e;
        }

        results = $A(root.querySelectorAll(e)).map(Element.extend);
        root.id = oldId;

        return results;
      case 'xpath':
        return document._getElementsByXPath(this.xpath, root);
      default:
       return this.matcher(root);
    }
  },

  match: function(element) {
    this.tokens = [];

    var e = this.expression, ps = Selector.patterns, as = Selector.assertions;
    var le, p, m, len = ps.length, name;

    while (e && le !== e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        p = ps[i].re;
        name = ps[i].name;
        if (m = e.match(p)) {
          if (as[name]) {
            this.tokens.push([name, Object.clone(m)]);
            e = e.replace(m[0], '');
          } else {
            return this.findElements(document).include(element);
          }
        }
      }
    }

    var match = true, name, matches;
    for (var i = 0, token; token = this.tokens[i]; i++) {
      name = token[0], matches = token[1];
      if (!Selector.assertions[name](element, matches)) {
        match = false; break;
      }
    }

    return match;
  },

  toString: function() {
    return this.expression;
  },

  inspect: function() {
    return "#<Selector:" + this.expression.inspect() + ">";
  }
});

if (Prototype.BrowserFeatures.SelectorsAPI &&
 document.compatMode === 'BackCompat') {
  Selector.CASE_INSENSITIVE_CLASS_NAMES = (function(){
    var div = document.createElement('div'),
     span = document.createElement('span');

    div.id = "prototype_test_id";
    span.className = 'Test';
    div.appendChild(span);
    var isIgnored = (div.querySelector('#prototype_test_id .test') !== null);
    div = span = null;
    return isIgnored;
  })();
}

Object.extend(Selector, {
  _cache: { },

  xpath: {
    descendant:   "//*",
    child:        "/*",
    adjacent:     "/following-sibling::*[1]",
    laterSibling: '/following-sibling::*',
    tagName:      function(m) {
      if (m[1] == '*') return '';
      return "[local-name()='" + m[1].toLowerCase() +
             "' or local-name()='" + m[1].toUpperCase() + "']";
    },
    className:    "[contains(concat(' ', @class, ' '), ' #{1} ')]",
    id:           "[@id='#{1}']",
    attrPresence: function(m) {
      m[1] = m[1].toLowerCase();
      return new Template("[@#{1}]").evaluate(m);
    },
    attr: function(m) {
      m[1] = m[1].toLowerCase();
      m[3] = m[5] || m[6];
      return new Template(Selector.xpath.operators[m[2]]).evaluate(m);
    },
    pseudo: function(m) {
      var h = Selector.xpath.pseudos[m[1]];
      if (!h) return '';
      if (Object.isFunction(h)) return h(m);
      return new Template(Selector.xpath.pseudos[m[1]]).evaluate(m);
    },
    operators: {
      '=':  "[@#{1}='#{3}']",
      '!=': "[@#{1}!='#{3}']",
      '^=': "[starts-with(@#{1}, '#{3}')]",
      '$=': "[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']",
      '*=': "[contains(@#{1}, '#{3}')]",
      '~=': "[contains(concat(' ', @#{1}, ' '), ' #{3} ')]",
      '|=': "[contains(concat('-', @#{1}, '-'), '-#{3}-')]"
    },
    pseudos: {
      'first-child': '[not(preceding-sibling::*)]',
      'last-child':  '[not(following-sibling::*)]',
      'only-child':  '[not(preceding-sibling::* or following-sibling::*)]',
      'empty':       "[count(*) = 0 and (count(text()) = 0)]",
      'checked':     "[@checked]",
      'disabled':    "[(@disabled) and (@type!='hidden')]",
      'enabled':     "[not(@disabled) and (@type!='hidden')]",
      'not': function(m) {
        var e = m[6], p = Selector.patterns,
            x = Selector.xpath, le, v, len = p.length, name;

        var exclusion = [];
        while (e && le != e && (/\S/).test(e)) {
          le = e;
          for (var i = 0; i<len; i++) {
            name = p[i].name
            if (m = e.match(p[i].re)) {
              v = Object.isFunction(x[name]) ? x[name](m) : new Template(x[name]).evaluate(m);
              exclusion.push("(" + v.substring(1, v.length - 1) + ")");
              e = e.replace(m[0], '');
              break;
            }
          }
        }
        return "[not(" + exclusion.join(" and ") + ")]";
      },
      'nth-child':      function(m) {
        return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ", m);
      },
      'nth-last-child': function(m) {
        return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ", m);
      },
      'nth-of-type':    function(m) {
        return Selector.xpath.pseudos.nth("position() ", m);
      },
      'nth-last-of-type': function(m) {
        return Selector.xpath.pseudos.nth("(last() + 1 - position()) ", m);
      },
      'first-of-type':  function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-of-type'](m);
      },
      'last-of-type':   function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-last-of-type'](m);
      },
      'only-of-type':   function(m) {
        var p = Selector.xpath.pseudos; return p['first-of-type'](m) + p['last-of-type'](m);
      },
      nth: function(fragment, m) {
        var mm, formula = m[6], predicate;
        if (formula == 'even') formula = '2n+0';
        if (formula == 'odd')  formula = '2n+1';
        if (mm = formula.match(/^(\d+)$/)) // digit only
          return '[' + fragment + "= " + mm[1] + ']';
        if (mm = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
          if (mm[1] == "-") mm[1] = -1;
          var a = mm[1] ? Number(mm[1]) : 1;
          var b = mm[2] ? Number(mm[2]) : 0;
          predicate = "[((#{fragment} - #{b}) mod #{a} = 0) and " +
          "((#{fragment} - #{b}) div #{a} >= 0)]";
          return new Template(predicate).evaluate({
            fragment: fragment, a: a, b: b });
        }
      }
    }
  },

  criteria: {
    tagName:      'n = h.tagName(n, r, "#{1}", c);      c = false;',
    className:    'n = h.className(n, r, "#{1}", c);    c = false;',
    id:           'n = h.id(n, r, "#{1}", c);           c = false;',
    attrPresence: 'n = h.attrPresence(n, r, "#{1}", c); c = false;',
    attr: function(m) {
      m[3] = (m[5] || m[6]);
      return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(m);
    },
    pseudo: function(m) {
      if (m[6]) m[6] = m[6].replace(/"/g, '\\"');
      return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(m);
    },
    descendant:   'c = "descendant";',
    child:        'c = "child";',
    adjacent:     'c = "adjacent";',
    laterSibling: 'c = "laterSibling";'
  },

  patterns: [
    { name: 'laterSibling', re: /^\s*~\s*/ },
    { name: 'child',        re: /^\s*>\s*/ },
    { name: 'adjacent',     re: /^\s*\+\s*/ },
    { name: 'descendant',   re: /^\s/ },

    { name: 'tagName',      re: /^\s*(\*|[\w\-]+)(\b|$)?/ },
    { name: 'id',           re: /^#([\w\-\*]+)(\b|$)/ },
    { name: 'className',    re: /^\.([\w\-\*]+)(\b|$)/ },
    { name: 'pseudo',       re: /^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/ },
    { name: 'attrPresence', re: /^\[((?:[\w-]+:)?[\w-]+)\]/ },
    { name: 'attr',         re: /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/ }
  ],

  assertions: {
    tagName: function(element, matches) {
      return matches[1].toUpperCase() == element.tagName.toUpperCase();
    },

    className: function(element, matches) {
      return Element.hasClassName(element, matches[1]);
    },

    id: function(element, matches) {
      return element.id === matches[1];
    },

    attrPresence: function(element, matches) {
      return Element.hasAttribute(element, matches[1]);
    },

    attr: function(element, matches) {
      var nodeValue = Element.readAttribute(element, matches[1]);
      return nodeValue && Selector.operators[matches[2]](nodeValue, matches[5] || matches[6]);
    }
  },

  handlers: {
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        a.push(node);
      return a;
    },

    mark: function(nodes) {
      var _true = Prototype.emptyFunction;
      for (var i = 0, node; node = nodes[i]; i++)
        node._countedByPrototype = _true;
      return nodes;
    },

    unmark: (function(){

      var PROPERTIES_ATTRIBUTES_MAP = (function(){
        var el = document.createElement('div'),
            isBuggy = false,
            propName = '_countedByPrototype',
            value = 'x'
        el[propName] = value;
        isBuggy = (el.getAttribute(propName) === value);
        el = null;
        return isBuggy;
      })();

      return PROPERTIES_ATTRIBUTES_MAP ?
        function(nodes) {
          for (var i = 0, node; node = nodes[i]; i++)
            node.removeAttribute('_countedByPrototype');
          return nodes;
        } :
        function(nodes) {
          for (var i = 0, node; node = nodes[i]; i++)
            node._countedByPrototype = void 0;
          return nodes;
        }
    })(),

    index: function(parentNode, reverse, ofType) {
      parentNode._countedByPrototype = Prototype.emptyFunction;
      if (reverse) {
        for (var nodes = parentNode.childNodes, i = nodes.length - 1, j = 1; i >= 0; i--) {
          var node = nodes[i];
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
        }
      } else {
        for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++)
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
      }
    },

    unique: function(nodes) {
      if (nodes.length == 0) return nodes;
      var results = [], n;
      for (var i = 0, l = nodes.length; i < l; i++)
        if (typeof (n = nodes[i])._countedByPrototype == 'undefined') {
          n._countedByPrototype = Prototype.emptyFunction;
          results.push(Element.extend(n));
        }
      return Selector.handlers.unmark(results);
    },

    descendant: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, node.getElementsByTagName('*'));
      return results;
    },

    child: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        for (var j = 0, child; child = node.childNodes[j]; j++)
          if (child.nodeType == 1 && child.tagName != '!') results.push(child);
      }
      return results;
    },

    adjacent: function(nodes) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        var next = this.nextElementSibling(node);
        if (next) results.push(next);
      }
      return results;
    },

    laterSibling: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, Element.nextSiblings(node));
      return results;
    },

    nextElementSibling: function(node) {
      while (node = node.nextSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    previousElementSibling: function(node) {
      while (node = node.previousSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    tagName: function(nodes, root, tagName, combinator) {
      var uTagName = tagName.toUpperCase();
      var results = [], h = Selector.handlers;
      if (nodes) {
        if (combinator) {
          if (combinator == "descendant") {
            for (var i = 0, node; node = nodes[i]; i++)
              h.concat(results, node.getElementsByTagName(tagName));
            return results;
          } else nodes = this[combinator](nodes);
          if (tagName == "*") return nodes;
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName.toUpperCase() === uTagName) results.push(node);
        return results;
      } else return root.getElementsByTagName(tagName);
    },

    id: function(nodes, root, id, combinator) {
      var targetNode = $(id), h = Selector.handlers;

      if (root == document) {
        if (!targetNode) return [];
        if (!nodes) return [targetNode];
      } else {
        if (!root.sourceIndex || root.sourceIndex < 1) {
          var nodes = root.getElementsByTagName('*');
          for (var j = 0, node; node = nodes[j]; j++) {
            if (node.id === id) return [node];
          }
        }
      }

      if (nodes) {
        if (combinator) {
          if (combinator == 'child') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (targetNode.parentNode == node) return [targetNode];
          } else if (combinator == 'descendant') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Element.descendantOf(targetNode, node)) return [targetNode];
          } else if (combinator == 'adjacent') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Selector.handlers.previousElementSibling(targetNode) == node)
                return [targetNode];
          } else nodes = h[combinator](nodes);
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node == targetNode) return [targetNode];
        return [];
      }
      return (targetNode && Element.descendantOf(targetNode, root)) ? [targetNode] : [];
    },

    className: function(nodes, root, className, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      return Selector.handlers.byClassName(nodes, root, className);
    },

    byClassName: function(nodes, root, className) {
      if (!nodes) nodes = Selector.handlers.descendant([root]);
      var needle = ' ' + className + ' ';
      for (var i = 0, results = [], node, nodeClassName; node = nodes[i]; i++) {
        nodeClassName = node.className;
        if (nodeClassName.length == 0) continue;
        if (nodeClassName == className || (' ' + nodeClassName + ' ').include(needle))
          results.push(node);
      }
      return results;
    },

    attrPresence: function(nodes, root, attr, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var results = [];
      for (var i = 0, node; node = nodes[i]; i++)
        if (Element.hasAttribute(node, attr)) results.push(node);
      return results;
    },

    attr: function(nodes, root, attr, value, operator, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var handler = Selector.operators[operator], results = [];
      for (var i = 0, node; node = nodes[i]; i++) {
        var nodeValue = Element.readAttribute(node, attr);
        if (nodeValue === null) continue;
        if (handler(nodeValue, value)) results.push(node);
      }
      return results;
    },

    pseudo: function(nodes, name, value, root, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      if (!nodes) nodes = root.getElementsByTagName("*");
      return Selector.pseudos[name](nodes, value, root);
    }
  },

  pseudos: {
    'first-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.previousElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'last-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.nextElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'only-child': function(nodes, value, root) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!h.previousElementSibling(node) && !h.nextElementSibling(node))
          results.push(node);
      return results;
    },
    'nth-child':        function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root);
    },
    'nth-last-child':   function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true);
    },
    'nth-of-type':      function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, false, true);
    },
    'nth-last-of-type': function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true, true);
    },
    'first-of-type':    function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, false, true);
    },
    'last-of-type':     function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, true, true);
    },
    'only-of-type':     function(nodes, formula, root) {
      var p = Selector.pseudos;
      return p['last-of-type'](p['first-of-type'](nodes, formula, root), formula, root);
    },

    getIndices: function(a, b, total) {
      if (a == 0) return b > 0 ? [b] : [];
      return $R(1, total).inject([], function(memo, i) {
        if (0 == (i - b) % a && (i - b) / a >= 0) memo.push(i);
        return memo;
      });
    },

    nth: function(nodes, formula, root, reverse, ofType) {
      if (nodes.length == 0) return [];
      if (formula == 'even') formula = '2n+0';
      if (formula == 'odd')  formula = '2n+1';
      var h = Selector.handlers, results = [], indexed = [], m;
      h.mark(nodes);
      for (var i = 0, node; node = nodes[i]; i++) {
        if (!node.parentNode._countedByPrototype) {
          h.index(node.parentNode, reverse, ofType);
          indexed.push(node.parentNode);
        }
      }
      if (formula.match(/^\d+$/)) { // just a number
        formula = Number(formula);
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.nodeIndex == formula) results.push(node);
      } else if (m = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
        if (m[1] == "-") m[1] = -1;
        var a = m[1] ? Number(m[1]) : 1;
        var b = m[2] ? Number(m[2]) : 0;
        var indices = Selector.pseudos.getIndices(a, b, nodes.length);
        for (var i = 0, node, l = indices.length; node = nodes[i]; i++) {
          for (var j = 0; j < l; j++)
            if (node.nodeIndex == indices[j]) results.push(node);
        }
      }
      h.unmark(nodes);
      h.unmark(indexed);
      return results;
    },

    'empty': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (node.tagName == '!' || node.firstChild) continue;
        results.push(node);
      }
      return results;
    },

    'not': function(nodes, selector, root) {
      var h = Selector.handlers, selectorType, m;
      var exclusions = new Selector(selector).findElements(root);
      h.mark(exclusions);
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node._countedByPrototype) results.push(node);
      h.unmark(exclusions);
      return results;
    },

    'enabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node.disabled && (!node.type || node.type !== 'hidden'))
          results.push(node);
      return results;
    },

    'disabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.disabled) results.push(node);
      return results;
    },

    'checked': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.checked) results.push(node);
      return results;
    }
  },

  operators: {
    '=':  function(nv, v) { return nv == v; },
    '!=': function(nv, v) { return nv != v; },
    '^=': function(nv, v) { return nv == v || nv && nv.startsWith(v); },
    '$=': function(nv, v) { return nv == v || nv && nv.endsWith(v); },
    '*=': function(nv, v) { return nv == v || nv && nv.include(v); },
    '~=': function(nv, v) { return (' ' + nv + ' ').include(' ' + v + ' '); },
    '|=': function(nv, v) { return ('-' + (nv || "").toUpperCase() +
     '-').include('-' + (v || "").toUpperCase() + '-'); }
  },

  split: function(expression) {
    var expressions = [];
    expression.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, function(m) {
      expressions.push(m[1].strip());
    });
    return expressions;
  },

  matchElements: function(elements, expression) {
    var matches = $$(expression), h = Selector.handlers;
    h.mark(matches);
    for (var i = 0, results = [], element; element = elements[i]; i++)
      if (element._countedByPrototype) results.push(element);
    h.unmark(matches);
    return results;
  },

  findElement: function(elements, expression, index) {
    if (Object.isNumber(expression)) {
      index = expression; expression = false;
    }
    return Selector.matchElements(elements, expression || '*')[index || 0];
  },

  findChildElements: function(element, expressions) {
    expressions = Selector.split(expressions.join(','));
    var results = [], h = Selector.handlers;
    for (var i = 0, l = expressions.length, selector; i < l; i++) {
      selector = new Selector(expressions[i].strip());
      h.concat(results, selector.findElements(element));
    }
    return (l > 1) ? h.unique(results) : results;
  }
});

if (Prototype.Browser.IE) {
  Object.extend(Selector.handlers, {
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        if (node.tagName !== "!") a.push(node);
      return a;
    }
  });
}

function $$() {
  return Selector.findChildElements(document, $A(arguments));
}

var Form = {
  reset: function(form) {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit;

    var data = elements.inject({ }, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          if (key in result) {
            if (!Object.isArray(result[key])) result[key] = [result[key]];
            result[key].push(value);
          }
          else result[key] = value;
        }
      }
      return result;
    });

    return options.hash ? data : Object.toQueryString(data);
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },

  getElements: function(form) {
    var elements = $(form).getElementsByTagName('*'),
        element,
        arr = [ ],
        serializers = Form.Element.Serializers;
    for (var i = 0; element = elements[i]; i++) {
      arr.push(element);
    }
    return arr.inject([], function(elements, child) {
      if (serializers[child.tagName.toLowerCase()])
        elements.push(Element.extend(child));
      return elements;
    })
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    form.findFirstElement().activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {

  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !(/^(?:button|reset|submit)$/i.test(element.type))))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = {
  input: function(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element, value);
      default:
        return Form.Element.Serializers.textarea(element, value);
    }
  },

  inputSelector: function(element, value) {
    if (Object.isUndefined(value)) return element.checked ? element.value : null;
    else element.checked = !!value;
  },

  textarea: function(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  },

  select: function(element, value) {
    if (Object.isUndefined(value))
      return this[element.type == 'select-one' ?
        'selectOne' : 'selectMany'](element);
    else {
      var opt, currentValue, single = !Object.isArray(value);
      for (var i = 0, length = element.length; i < length; i++) {
        opt = element.options[i];
        currentValue = this.optionValue(opt);
        if (single) {
          if (currentValue == value) {
            opt.selected = true;
            return;
          }
        }
        else opt.selected = value.include(currentValue);
      }
    }
  },

  selectOne: function(element) {
    var index = element.selectedIndex;
    return index >= 0 ? this.optionValue(element.options[index]) : null;
  },

  selectMany: function(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(this.optionValue(opt));
    }
    return values;
  },

  optionValue: function(opt) {
    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
  }
};

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
(function() {

  var Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45,

    cache: {}
  };

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
    && 'onmouseleave' in docEl;

  var _isButton;
  if (Prototype.Browser.IE) {
    var buttonMap = { 0: 1, 1: 4, 2: 2 };
    _isButton = function(event, code) {
      return event.button === buttonMap[code];
    };
  } else if (Prototype.Browser.WebKit) {
    _isButton = function(event, code) {
      switch (code) {
        case 0: return event.which == 1 && !event.metaKey;
        case 1: return event.which == 1 && event.metaKey;
        default: return false;
      }
    };
  } else {
    _isButton = function(event, code) {
      return event.which ? (event.which === code + 1) : (event.button === code);
    };
  }

  function isLeftClick(event)   { return _isButton(event, 0) }

  function isMiddleClick(event) { return _isButton(event, 1) }

  function isRightClick(event)  { return _isButton(event, 2) }

  function element(event) {
    event = Event.extend(event);

    var node = event.target, type = event.type,
     currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (type === 'load' || type === 'error' ||
        (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
          && currentTarget.type === 'radio'))
            node = currentTarget;
    }

    if (node.nodeType == Node.TEXT_NODE)
      node = node.parentNode;

    return Element.extend(node);
  }

  function findElement(event, expression) {
    var element = Event.element(event);
    if (!expression) return element;
    var elements = [element].concat(element.ancestors());
    return Selector.findElement(elements, expression, 0);
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }

  Event.Methods = {
    isLeftClick: isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick: isRightClick,

    element: element,
    findElement: findElement,

    pointer: pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };


  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (Prototype.Browser.IE) {
    function _relatedTarget(event) {
      var element;
      switch (event.type) {
        case 'mouseover': element = event.fromElement; break;
        case 'mouseout':  element = event.toElement;   break;
        default: return null;
      }
      return Element.extend(element);
    }

    Object.extend(methods, {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return '[object Event]' }
    });

    Event.extend = function(event, element) {
      if (!event) return false;
      if (event._extendedByPrototype) return event;

      event._extendedByPrototype = Prototype.emptyFunction;
      var pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });

      return Object.extend(event, methods);
    };
  } else {
    Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
    Event.extend = Prototype.K;
  }

  function _createResponder(element, eventName, handler) {
    var registry = Element.retrieve(element, 'prototype_event_registry');

    if (Object.isUndefined(registry)) {
      CACHE.push(element);
      registry = Element.retrieve(element, 'prototype_event_registry', $H());
    }

    var respondersForEvent = registry.get(eventName);
    if (Object.isUndefined(respondersForEvent)) {
      respondersForEvent = [];
      registry.set(eventName, respondersForEvent);
    }

    if (respondersForEvent.pluck('handler').include(handler)) return false;

    var responder;
    if (eventName.include(":")) {
      responder = function(event) {
        if (Object.isUndefined(event.eventName))
          return false;

        if (event.eventName !== eventName)
          return false;

        Event.extend(event, element);
        handler.call(element, event);
      };
    } else {
      if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
       (eventName === "mouseenter" || eventName === "mouseleave")) {
        if (eventName === "mouseenter" || eventName === "mouseleave") {
          responder = function(event) {
            Event.extend(event, element);

            var parent = event.relatedTarget;
            while (parent && parent !== element) {
              try { parent = parent.parentNode; }
              catch(e) { parent = element; }
            }

            if (parent === element) return;

            handler.call(element, event);
          };
        }
      } else {
        responder = function(event) {
          Event.extend(event, element);
          handler.call(element, event);
        };
      }
    }

    responder.handler = handler;
    respondersForEvent.push(responder);
    return responder;
  }

  function _destroyCache() {
    for (var i = 0, length = CACHE.length; i < length; i++) {
      Event.stopObserving(CACHE[i]);
      CACHE[i] = null;
    }
  }

  var CACHE = [];

  if (Prototype.Browser.IE)
    window.attachEvent('onunload', _destroyCache);

  if (Prototype.Browser.WebKit)
    window.addEventListener('unload', Prototype.emptyFunction, false);


  var _getDOMEventName = Prototype.K;

  if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED) {
    _getDOMEventName = function(eventName) {
      var translations = { mouseenter: "mouseover", mouseleave: "mouseout" };
      return eventName in translations ? translations[eventName] : eventName;
    };
  }

  function observe(element, eventName, handler) {
    element = $(element);

    var responder = _createResponder(element, eventName, handler);

    if (!responder) return element;

    if (eventName.include(':')) {
      if (element.addEventListener)
        element.addEventListener("dataavailable", responder, false);
      else {
        element.attachEvent("ondataavailable", responder);
        element.attachEvent("onfilterchange", responder);
      }
    } else {
      var actualEventName = _getDOMEventName(eventName);

      if (element.addEventListener)
        element.addEventListener(actualEventName, responder, false);
      else
        element.attachEvent("on" + actualEventName, responder);
    }

    return element;
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);

    var registry = Element.retrieve(element, 'prototype_event_registry');

    if (Object.isUndefined(registry)) return element;

    if (eventName && !handler) {
      var responders = registry.get(eventName);

      if (Object.isUndefined(responders)) return element;

      responders.each( function(r) {
        Element.stopObserving(element, eventName, r.handler);
      });
      return element;
    } else if (!eventName) {
      registry.each( function(pair) {
        var eventName = pair.key, responders = pair.value;

        responders.each( function(r) {
          Element.stopObserving(element, eventName, r.handler);
        });
      });
      return element;
    }

    var responders = registry.get(eventName);

    if (!responders) return;

    var responder = responders.find( function(r) { return r.handler === handler; });
    if (!responder) return element;

    var actualEventName = _getDOMEventName(eventName);

    if (eventName.include(':')) {
      if (element.removeEventListener)
        element.removeEventListener("dataavailable", responder, false);
      else {
        element.detachEvent("ondataavailable", responder);
        element.detachEvent("onfilterchange",  responder);
      }
    } else {
      if (element.removeEventListener)
        element.removeEventListener(actualEventName, responder, false);
      else
        element.detachEvent('on' + actualEventName, responder);
    }

    registry.set(eventName, responders.without(responder));

    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = $(element);

    if (Object.isUndefined(bubble))
      bubble = true;

    if (element == document && document.createEvent && !element.dispatchEvent)
      element = document.documentElement;

    var event;
    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('dataavailable', true, true);
    } else {
      event = document.createEventObject();
      event.eventType = bubble ? 'ondataavailable' : 'onfilterchange';
    }

    event.eventName = eventName;
    event.memo = memo || { };

    if (document.createEvent)
      element.dispatchEvent(event);
    else
      element.fireEvent(event.eventType, event);

    return Event.extend(event);
  }


  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire:          fire,
    observe:       observe,
    stopObserving: stopObserving
  });

  Element.addMethods({
    fire:          fire,

    observe:       observe,

    stopObserving: stopObserving
  });

  Object.extend(document, {
    fire:          fire.methodize(),

    observe:       observe.methodize(),

    stopObserving: stopObserving.methodize(),

    loaded:        false
  });

  if (window.Event) Object.extend(window.Event, Event);
  else window.Event = Event;
})();

(function() {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  var timer;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (timer) window.clearTimeout(timer);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.stopObserving('readystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try { document.documentElement.doScroll('left'); }
    catch(e) {
      timer = pollDoScroll.defer();
      return;
    }
    fireContentLoadedEvent();
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
  } else {
    document.observe('readystatechange', checkReadyState);
    if (window == top)
      timer = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})();

Element.addMethods();

/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
  includeScrollOffsets: false,

  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
  
  
  
};



Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/


// FROM: /javascripts/effects.js?1288225651
// Copyright (c) 2005-2009 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// Contributors:
//  Justin Palmer (http://encytemedia.com/)
//  Mark Pilgrim (http://diveintomark.org/)
//  Martin Bialasinki
//
// script.aculo.us is freely distributable under the terms of an MIT-style license.
// For details, see the script.aculo.us web site: http://script.aculo.us/

// converts rgb() and #xxx to #xxxxxx format,
// returns self (or first argument) if not convertable
String.prototype.parseColor = function() {
  var color = '#';
  if (this.slice(0,4) == 'rgb(') {
    var cols = this.slice(4,this.length-1).split(',');
    var i=0; do { color += parseInt(cols[i]).toColorPart() } while (++i<3);
  } else {
    if (this.slice(0,1) == '#') {
      if (this.length==4) for(var i=1;i<4;i++) color += (this.charAt(i) + this.charAt(i)).toLowerCase();
      if (this.length==7) color = this.toLowerCase();
    }
  }
  return (color.length==7 ? color : (arguments[0] || this));
};

/*--------------------------------------------------------------------------*/

Element.collectTextNodes = function(element) {
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue :
      (node.hasChildNodes() ? Element.collectTextNodes(node) : ''));
  }).flatten().join('');
};

Element.collectTextNodesIgnoreClass = function(element, className) {
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue :
      ((node.hasChildNodes() && !Element.hasClassName(node,className)) ?
        Element.collectTextNodesIgnoreClass(node, className) : ''));
  }).flatten().join('');
};

Element.setContentZoom = function(element, percent) {
  element = $(element);
  element.setStyle({fontSize: (percent/100) + 'em'});
  if (Prototype.Browser.WebKit) window.scrollBy(0,0);
  return element;
};

Element.getInlineOpacity = function(element){
  return $(element).style.opacity || '';
};

Element.forceRerendering = function(element) {
  try {
    element = $(element);
    var n = document.createTextNode(' ');
    element.appendChild(n);
    element.removeChild(n);
  } catch(e) { }
};

/*--------------------------------------------------------------------------*/

var Effect = {
  _elementDoesNotExistError: {
    name: 'ElementDoesNotExistError',
    message: 'The specified DOM element does not exist, but is required for this effect to operate'
  },
  Transitions: {
    linear: Prototype.K,
    sinoidal: function(pos) {
      return (-Math.cos(pos*Math.PI)/2) + .5;
    },
    reverse: function(pos) {
      return 1-pos;
    },
    flicker: function(pos) {
      var pos = ((-Math.cos(pos*Math.PI)/4) + .75) + Math.random()/4;
      return pos > 1 ? 1 : pos;
    },
    wobble: function(pos) {
      return (-Math.cos(pos*Math.PI*(9*pos))/2) + .5;
    },
    pulse: function(pos, pulses) {
      return (-Math.cos((pos*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
    },
    spring: function(pos) {
      return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
    },
    none: function(pos) {
      return 0;
    },
    full: function(pos) {
      return 1;
    }
  },
  DefaultOptions: {
    duration:   1.0,   // seconds
    fps:        100,   // 100= assume 66fps max.
    sync:       false, // true for combining
    from:       0.0,
    to:         1.0,
    delay:      0.0,
    queue:      'parallel'
  },
  tagifyText: function(element) {
    var tagifyStyle = 'position:relative';
    if (Prototype.Browser.IE) tagifyStyle += ';zoom:1';

    element = $(element);
    $A(element.childNodes).each( function(child) {
      if (child.nodeType==3) {
        child.nodeValue.toArray().each( function(character) {
          element.insertBefore(
            new Element('span', {style: tagifyStyle}).update(
              character == ' ' ? String.fromCharCode(160) : character),
              child);
        });
        Element.remove(child);
      }
    });
  },
  multiple: function(element, effect) {
    var elements;
    if (((typeof element == 'object') ||
        Object.isFunction(element)) &&
       (element.length))
      elements = element;
    else
      elements = $(element).childNodes;

    var options = Object.extend({
      speed: 0.1,
      delay: 0.0
    }, arguments[2] || { });
    var masterDelay = options.delay;

    $A(elements).each( function(element, index) {
      new effect(element, Object.extend(options, { delay: index * options.speed + masterDelay }));
    });
  },
  PAIRS: {
    'slide':  ['SlideDown','SlideUp'],
    'blind':  ['BlindDown','BlindUp'],
    'appear': ['Appear','Fade']
  },
  toggle: function(element, effect, options) {
    element = $(element);
    effect  = (effect || 'appear').toLowerCase();
    
    return Effect[ Effect.PAIRS[ effect ][ element.visible() ? 1 : 0 ] ](element, Object.extend({
      queue: { position:'end', scope:(element.id || 'global'), limit: 1 }
    }, options || {}));
  }
};

Effect.DefaultOptions.transition = Effect.Transitions.sinoidal;

/* ------------- core effects ------------- */

Effect.ScopedQueue = Class.create(Enumerable, {
  initialize: function() {
    this.effects  = [];
    this.interval = null;
  },
  _each: function(iterator) {
    this.effects._each(iterator);
  },
  add: function(effect) {
    var timestamp = new Date().getTime();

    var position = Object.isString(effect.options.queue) ?
      effect.options.queue : effect.options.queue.position;

    switch(position) {
      case 'front':
        // move unstarted effects after this effect
        this.effects.findAll(function(e){ return e.state=='idle' }).each( function(e) {
            e.startOn  += effect.finishOn;
            e.finishOn += effect.finishOn;
          });
        break;
      case 'with-last':
        timestamp = this.effects.pluck('startOn').max() || timestamp;
        break;
      case 'end':
        // start effect after last queued effect has finished
        timestamp = this.effects.pluck('finishOn').max() || timestamp;
        break;
    }

    effect.startOn  += timestamp;
    effect.finishOn += timestamp;

    if (!effect.options.queue.limit || (this.effects.length < effect.options.queue.limit))
      this.effects.push(effect);

    if (!this.interval)
      this.interval = setInterval(this.loop.bind(this), 15);
  },
  remove: function(effect) {
    this.effects = this.effects.reject(function(e) { return e==effect });
    if (this.effects.length == 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  loop: function() {
    var timePos = new Date().getTime();
    for(var i=0, len=this.effects.length;i<len;i++)
      this.effects[i] && this.effects[i].loop(timePos);
  }
});

Effect.Queues = {
  instances: $H(),
  get: function(queueName) {
    if (!Object.isString(queueName)) return queueName;

    return this.instances.get(queueName) ||
      this.instances.set(queueName, new Effect.ScopedQueue());
  }
};
Effect.Queue = Effect.Queues.get('global');

Effect.Base = Class.create({
  position: null,
  start: function(options) {
    if (options && options.transition === false) options.transition = Effect.Transitions.linear;
    this.options      = Object.extend(Object.extend({ },Effect.DefaultOptions), options || { });
    this.currentFrame = 0;
    this.state        = 'idle';
    this.startOn      = this.options.delay*1000;
    this.finishOn     = this.startOn+(this.options.duration*1000);
    this.fromToDelta  = this.options.to-this.options.from;
    this.totalTime    = this.finishOn-this.startOn;
    this.totalFrames  = this.options.fps*this.options.duration;

    this.render = (function() {
      function dispatch(effect, eventName) {
        if (effect.options[eventName + 'Internal'])
          effect.options[eventName + 'Internal'](effect);
        if (effect.options[eventName])
          effect.options[eventName](effect);
      }

      return function(pos) {
        if (this.state === "idle") {
          this.state = "running";
          dispatch(this, 'beforeSetup');
          if (this.setup) this.setup();
          dispatch(this, 'afterSetup');
        }
        if (this.state === "running") {
          pos = (this.options.transition(pos) * this.fromToDelta) + this.options.from;
          this.position = pos;
          dispatch(this, 'beforeUpdate');
          if (this.update) this.update(pos);
          dispatch(this, 'afterUpdate');
        }
      };
    })();

    this.event('beforeStart');
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ?
        'global' : this.options.queue.scope).add(this);
  },
  loop: function(timePos) {
    if (timePos >= this.startOn) {
      if (timePos >= this.finishOn) {
        this.render(1.0);
        this.cancel();
        this.event('beforeFinish');
        if (this.finish) this.finish();
        this.event('afterFinish');
        return;
      }
      var pos   = (timePos - this.startOn) / this.totalTime,
          frame = (pos * this.totalFrames).round();
      if (frame > this.currentFrame) {
        this.render(pos);
        this.currentFrame = frame;
      }
    }
  },
  cancel: function() {
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ?
        'global' : this.options.queue.scope).remove(this);
    this.state = 'finished';
  },
  event: function(eventName) {
    if (this.options[eventName + 'Internal']) this.options[eventName + 'Internal'](this);
    if (this.options[eventName]) this.options[eventName](this);
  },
  inspect: function() {
    var data = $H();
    for(property in this)
      if (!Object.isFunction(this[property])) data.set(property, this[property]);
    return '#<Effect:' + data.inspect() + ',options:' + $H(this.options).inspect() + '>';
  }
});

Effect.Parallel = Class.create(Effect.Base, {
  initialize: function(effects) {
    this.effects = effects || [];
    this.start(arguments[1]);
  },
  update: function(position) {
    this.effects.invoke('render', position);
  },
  finish: function(position) {
    this.effects.each( function(effect) {
      effect.render(1.0);
      effect.cancel();
      effect.event('beforeFinish');
      if (effect.finish) effect.finish(position);
      effect.event('afterFinish');
    });
  }
});

Effect.Tween = Class.create(Effect.Base, {
  initialize: function(object, from, to) {
    object = Object.isString(object) ? $(object) : object;
    var args = $A(arguments), method = args.last(),
      options = args.length == 5 ? args[3] : null;
    this.method = Object.isFunction(method) ? method.bind(object) :
      Object.isFunction(object[method]) ? object[method].bind(object) :
      function(value) { object[method] = value };
    this.start(Object.extend({ from: from, to: to }, options || { }));
  },
  update: function(position) {
    this.method(position);
  }
});

Effect.Event = Class.create(Effect.Base, {
  initialize: function() {
    this.start(Object.extend({ duration: 0 }, arguments[0] || { }));
  },
  update: Prototype.emptyFunction
});

Effect.Opacity = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    // make this work on IE on elements without 'layout'
    if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
      this.element.setStyle({zoom: 1});
    var options = Object.extend({
      from: this.element.getOpacity() || 0.0,
      to:   1.0
    }, arguments[1] || { });
    this.start(options);
  },
  update: function(position) {
    this.element.setOpacity(position);
  }
});

Effect.Move = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'relative'
    }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    this.element.makePositioned();
    this.originalLeft = parseFloat(this.element.getStyle('left') || '0');
    this.originalTop  = parseFloat(this.element.getStyle('top')  || '0');
    if (this.options.mode == 'absolute') {
      this.options.x = this.options.x - this.originalLeft;
      this.options.y = this.options.y - this.originalTop;
    }
  },
  update: function(position) {
    this.element.setStyle({
      left: (this.options.x  * position + this.originalLeft).round() + 'px',
      top:  (this.options.y  * position + this.originalTop).round()  + 'px'
    });
  }
});

// for backwards compatibility
Effect.MoveBy = function(element, toTop, toLeft) {
  return new Effect.Move(element,
    Object.extend({ x: toLeft, y: toTop }, arguments[3] || { }));
};

Effect.Scale = Class.create(Effect.Base, {
  initialize: function(element, percent) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      scaleX: true,
      scaleY: true,
      scaleContent: true,
      scaleFromCenter: false,
      scaleMode: 'box',        // 'box' or 'contents' or { } with provided values
      scaleFrom: 100.0,
      scaleTo:   percent
    }, arguments[2] || { });
    this.start(options);
  },
  setup: function() {
    this.restoreAfterFinish = this.options.restoreAfterFinish || false;
    this.elementPositioning = this.element.getStyle('position');

    this.originalStyle = { };
    ['top','left','width','height','fontSize'].each( function(k) {
      this.originalStyle[k] = this.element.style[k];
    }.bind(this));

    this.originalTop  = this.element.offsetTop;
    this.originalLeft = this.element.offsetLeft;

    var fontSize = this.element.getStyle('font-size') || '100%';
    ['em','px','%','pt'].each( function(fontSizeType) {
      if (fontSize.indexOf(fontSizeType)>0) {
        this.fontSize     = parseFloat(fontSize);
        this.fontSizeType = fontSizeType;
      }
    }.bind(this));

    this.factor = (this.options.scaleTo - this.options.scaleFrom)/100;

    this.dims = null;
    if (this.options.scaleMode=='box')
      this.dims = [this.element.offsetHeight, this.element.offsetWidth];
    if (/^content/.test(this.options.scaleMode))
      this.dims = [this.element.scrollHeight, this.element.scrollWidth];
    if (!this.dims)
      this.dims = [this.options.scaleMode.originalHeight,
                   this.options.scaleMode.originalWidth];
  },
  update: function(position) {
    var currentScale = (this.options.scaleFrom/100.0) + (this.factor * position);
    if (this.options.scaleContent && this.fontSize)
      this.element.setStyle({fontSize: this.fontSize * currentScale + this.fontSizeType });
    this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
  },
  finish: function(position) {
    if (this.restoreAfterFinish) this.element.setStyle(this.originalStyle);
  },
  setDimensions: function(height, width) {
    var d = { };
    if (this.options.scaleX) d.width = width.round() + 'px';
    if (this.options.scaleY) d.height = height.round() + 'px';
    if (this.options.scaleFromCenter) {
      var topd  = (height - this.dims[0])/2;
      var leftd = (width  - this.dims[1])/2;
      if (this.elementPositioning == 'absolute') {
        if (this.options.scaleY) d.top = this.originalTop-topd + 'px';
        if (this.options.scaleX) d.left = this.originalLeft-leftd + 'px';
      } else {
        if (this.options.scaleY) d.top = -topd + 'px';
        if (this.options.scaleX) d.left = -leftd + 'px';
      }
    }
    this.element.setStyle(d);
  }
});

Effect.Highlight = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({ startcolor: '#ffff99' }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    // Prevent executing on elements not in the layout flow
    if (this.element.getStyle('display')=='none') { this.cancel(); return; }
    // Disable background image during the effect
    this.oldStyle = { };
    if (!this.options.keepBackgroundImage) {
      this.oldStyle.backgroundImage = this.element.getStyle('background-image');
      this.element.setStyle({backgroundImage: 'none'});
    }
    if (!this.options.endcolor)
      this.options.endcolor = this.element.getStyle('background-color').parseColor('#ffffff');
    if (!this.options.restorecolor)
      this.options.restorecolor = this.element.getStyle('background-color');
    // init color calculations
    this._base  = $R(0,2).map(function(i){ return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16) }.bind(this));
    this._delta = $R(0,2).map(function(i){ return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i] }.bind(this));
  },
  update: function(position) {
    this.element.setStyle({backgroundColor: $R(0,2).inject('#',function(m,v,i){
      return m+((this._base[i]+(this._delta[i]*position)).round().toColorPart()); }.bind(this)) });
  },
  finish: function() {
    this.element.setStyle(Object.extend(this.oldStyle, {
      backgroundColor: this.options.restorecolor
    }));
  }
});

Effect.ScrollTo = function(element) {
  var options = arguments[1] || { },
  scrollOffsets = document.viewport.getScrollOffsets(),
  elementOffsets = $(element).cumulativeOffset();

  if (options.offset) elementOffsets[1] += options.offset;

  return new Effect.Tween(null,
    scrollOffsets.top,
    elementOffsets[1],
    options,
    function(p){ scrollTo(scrollOffsets.left, p.round()); }
  );
};

/* ------------- combination effects ------------- */

Effect.Fade = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  var options = Object.extend({
    from: element.getOpacity() || 1.0,
    to:   0.0,
    afterFinishInternal: function(effect) {
      if (effect.options.to!=0) return;
      effect.element.hide().setStyle({opacity: oldOpacity});
    }
  }, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Appear = function(element) {
  element = $(element);
  var options = Object.extend({
  from: (element.getStyle('display') == 'none' ? 0.0 : element.getOpacity() || 0.0),
  to:   1.0,
  // force Safari to render floated elements properly
  afterFinishInternal: function(effect) {
    effect.element.forceRerendering();
  },
  beforeSetup: function(effect) {
    effect.element.setOpacity(effect.options.from).show();
  }}, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Puff = function(element) {
  element = $(element);
  var oldStyle = {
    opacity: element.getInlineOpacity(),
    position: element.getStyle('position'),
    top:  element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height
  };
  return new Effect.Parallel(
   [ new Effect.Scale(element, 200,
      { sync: true, scaleFromCenter: true, scaleContent: true, restoreAfterFinish: true }),
     new Effect.Opacity(element, { sync: true, to: 0.0 } ) ],
     Object.extend({ duration: 1.0,
      beforeSetupInternal: function(effect) {
        Position.absolutize(effect.effects[0].element);
      },
      afterFinishInternal: function(effect) {
         effect.effects[0].element.hide().setStyle(oldStyle); }
     }, arguments[1] || { })
   );
};

Effect.BlindUp = function(element) {
  element = $(element);
  element.makeClipping();
  return new Effect.Scale(element, 0,
    Object.extend({ scaleContent: false,
      scaleX: false,
      restoreAfterFinish: true,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping();
      }
    }, arguments[1] || { })
  );
};

Effect.BlindDown = function(element) {
  element = $(element);
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({
    scaleContent: false,
    scaleX: false,
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makeClipping().setStyle({height: '0px'}).show();
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping();
    }
  }, arguments[1] || { }));
};

Effect.SwitchOff = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  return new Effect.Appear(element, Object.extend({
    duration: 0.4,
    from: 0,
    transition: Effect.Transitions.flicker,
    afterFinishInternal: function(effect) {
      new Effect.Scale(effect.element, 1, {
        duration: 0.3, scaleFromCenter: true,
        scaleX: false, scaleContent: false, restoreAfterFinish: true,
        beforeSetup: function(effect) {
          effect.element.makePositioned().makeClipping();
        },
        afterFinishInternal: function(effect) {
          effect.element.hide().undoClipping().undoPositioned().setStyle({opacity: oldOpacity});
        }
      });
    }
  }, arguments[1] || { }));
};

Effect.DropOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: 100, sync: true }),
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned();
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);
        }
      }, arguments[1] || { }));
};

Effect.Shake = function(element) {
  element = $(element);
  var options = Object.extend({
    distance: 20,
    duration: 0.5
  }, arguments[1] || {});
  var distance = parseFloat(options.distance);
  var split = parseFloat(options.duration) / 10.0;
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left') };
    return new Effect.Move(element,
      { x:  distance, y: 0, duration: split, afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance, y: 0, duration: split, afterFinishInternal: function(effect) {
        effect.element.undoPositioned().setStyle(oldStyle);
  }}); }}); }}); }}); }}); }});
};

Effect.SlideDown = function(element) {
  element = $(element).cleanWhitespace();
  // SlideDown need to have the content of the element wrapped in a container element with fixed height!
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({
    scaleContent: false,
    scaleX: false,
    scaleFrom: window.opera ? 0 : 1,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().setStyle({height: '0px'}).show();
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom}); }
    }, arguments[1] || { })
  );
};

Effect.SlideUp = function(element) {
  element = $(element).cleanWhitespace();
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, window.opera ? 0 : 1,
   Object.extend({ scaleContent: false,
    scaleX: false,
    scaleMode: 'box',
    scaleFrom: 100,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().show();
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom});
    }
   }, arguments[1] || { })
  );
};

// Bug in opera makes the TD containing this element expand for a instance after finish
Effect.Squish = function(element) {
  return new Effect.Scale(element, window.opera ? 1 : 0, {
    restoreAfterFinish: true,
    beforeSetup: function(effect) {
      effect.element.makeClipping();
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping();
    }
  });
};

Effect.Grow = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.full
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var initialMoveX, initialMoveY;
  var moveX, moveY;

  switch (options.direction) {
    case 'top-left':
      initialMoveX = initialMoveY = moveX = moveY = 0;
      break;
    case 'top-right':
      initialMoveX = dims.width;
      initialMoveY = moveY = 0;
      moveX = -dims.width;
      break;
    case 'bottom-left':
      initialMoveX = moveX = 0;
      initialMoveY = dims.height;
      moveY = -dims.height;
      break;
    case 'bottom-right':
      initialMoveX = dims.width;
      initialMoveY = dims.height;
      moveX = -dims.width;
      moveY = -dims.height;
      break;
    case 'center':
      initialMoveX = dims.width / 2;
      initialMoveY = dims.height / 2;
      moveX = -dims.width / 2;
      moveY = -dims.height / 2;
      break;
  }

  return new Effect.Move(element, {
    x: initialMoveX,
    y: initialMoveY,
    duration: 0.01,
    beforeSetup: function(effect) {
      effect.element.hide().makeClipping().makePositioned();
    },
    afterFinishInternal: function(effect) {
      new Effect.Parallel(
        [ new Effect.Opacity(effect.element, { sync: true, to: 1.0, from: 0.0, transition: options.opacityTransition }),
          new Effect.Move(effect.element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition }),
          new Effect.Scale(effect.element, 100, {
            scaleMode: { originalHeight: dims.height, originalWidth: dims.width },
            sync: true, scaleFrom: window.opera ? 1 : 0, transition: options.scaleTransition, restoreAfterFinish: true})
        ], Object.extend({
             beforeSetup: function(effect) {
               effect.effects[0].element.setStyle({height: '0px'}).show();
             },
             afterFinishInternal: function(effect) {
               effect.effects[0].element.undoClipping().undoPositioned().setStyle(oldStyle);
             }
           }, options)
      );
    }
  });
};

Effect.Shrink = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.none
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var moveX, moveY;

  switch (options.direction) {
    case 'top-left':
      moveX = moveY = 0;
      break;
    case 'top-right':
      moveX = dims.width;
      moveY = 0;
      break;
    case 'bottom-left':
      moveX = 0;
      moveY = dims.height;
      break;
    case 'bottom-right':
      moveX = dims.width;
      moveY = dims.height;
      break;
    case 'center':
      moveX = dims.width / 2;
      moveY = dims.height / 2;
      break;
  }

  return new Effect.Parallel(
    [ new Effect.Opacity(element, { sync: true, to: 0.0, from: 1.0, transition: options.opacityTransition }),
      new Effect.Scale(element, window.opera ? 1 : 0, { sync: true, transition: options.scaleTransition, restoreAfterFinish: true}),
      new Effect.Move(element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition })
    ], Object.extend({
         beforeStartInternal: function(effect) {
           effect.effects[0].element.makePositioned().makeClipping();
         },
         afterFinishInternal: function(effect) {
           effect.effects[0].element.hide().undoClipping().undoPositioned().setStyle(oldStyle); }
       }, options)
  );
};

Effect.Pulsate = function(element) {
  element = $(element);
  var options    = arguments[1] || { },
    oldOpacity = element.getInlineOpacity(),
    transition = options.transition || Effect.Transitions.linear,
    reverser   = function(pos){
      return 1 - transition((-Math.cos((pos*(options.pulses||5)*2)*Math.PI)/2) + .5);
    };

  return new Effect.Opacity(element,
    Object.extend(Object.extend({  duration: 2.0, from: 0,
      afterFinishInternal: function(effect) { effect.element.setStyle({opacity: oldOpacity}); }
    }, options), {transition: reverser}));
};

Effect.Fold = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height };
  element.makeClipping();
  return new Effect.Scale(element, 5, Object.extend({
    scaleContent: false,
    scaleX: false,
    afterFinishInternal: function(effect) {
    new Effect.Scale(element, 1, {
      scaleContent: false,
      scaleY: false,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping().setStyle(oldStyle);
      } });
  }}, arguments[1] || { }));
};

Effect.Morph = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      style: { }
    }, arguments[1] || { });

    if (!Object.isString(options.style)) this.style = $H(options.style);
    else {
      if (options.style.include(':'))
        this.style = options.style.parseStyle();
      else {
        this.element.addClassName(options.style);
        this.style = $H(this.element.getStyles());
        this.element.removeClassName(options.style);
        var css = this.element.getStyles();
        this.style = this.style.reject(function(style) {
          return style.value == css[style.key];
        });
        options.afterFinishInternal = function(effect) {
          effect.element.addClassName(effect.options.style);
          effect.transforms.each(function(transform) {
            effect.element.style[transform.style] = '';
          });
        };
      }
    }
    this.start(options);
  },

  setup: function(){
    function parseColor(color){
      if (!color || ['rgba(0, 0, 0, 0)','transparent'].include(color)) color = '#ffffff';
      color = color.parseColor();
      return $R(0,2).map(function(i){
        return parseInt( color.slice(i*2+1,i*2+3), 16 );
      });
    }
    this.transforms = this.style.map(function(pair){
      var property = pair[0], value = pair[1], unit = null;

      if (value.parseColor('#zzzzzz') != '#zzzzzz') {
        value = value.parseColor();
        unit  = 'color';
      } else if (property == 'opacity') {
        value = parseFloat(value);
        if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
          this.element.setStyle({zoom: 1});
      } else if (Element.CSS_LENGTH.test(value)) {
          var components = value.match(/^([\+\-]?[0-9\.]+)(.*)$/);
          value = parseFloat(components[1]);
          unit = (components.length == 3) ? components[2] : null;
      }

      var originalValue = this.element.getStyle(property);
      return {
        style: property.camelize(),
        originalValue: unit=='color' ? parseColor(originalValue) : parseFloat(originalValue || 0),
        targetValue: unit=='color' ? parseColor(value) : value,
        unit: unit
      };
    }.bind(this)).reject(function(transform){
      return (
        (transform.originalValue == transform.targetValue) ||
        (
          transform.unit != 'color' &&
          (isNaN(transform.originalValue) || isNaN(transform.targetValue))
        )
      );
    });
  },
  update: function(position) {
    var style = { }, transform, i = this.transforms.length;
    while(i--)
      style[(transform = this.transforms[i]).style] =
        transform.unit=='color' ? '#'+
          (Math.round(transform.originalValue[0]+
            (transform.targetValue[0]-transform.originalValue[0])*position)).toColorPart() +
          (Math.round(transform.originalValue[1]+
            (transform.targetValue[1]-transform.originalValue[1])*position)).toColorPart() +
          (Math.round(transform.originalValue[2]+
            (transform.targetValue[2]-transform.originalValue[2])*position)).toColorPart() :
        (transform.originalValue +
          (transform.targetValue - transform.originalValue) * position).toFixed(3) +
            (transform.unit === null ? '' : transform.unit);
    this.element.setStyle(style, true);
  }
});

Effect.Transform = Class.create({
  initialize: function(tracks){
    this.tracks  = [];
    this.options = arguments[1] || { };
    this.addTracks(tracks);
  },
  addTracks: function(tracks){
    tracks.each(function(track){
      track = $H(track);
      var data = track.values().first();
      this.tracks.push($H({
        ids:     track.keys().first(),
        effect:  Effect.Morph,
        options: { style: data }
      }));
    }.bind(this));
    return this;
  },
  play: function(){
    return new Effect.Parallel(
      this.tracks.map(function(track){
        var ids = track.get('ids'), effect = track.get('effect'), options = track.get('options');
        var elements = [$(ids) || $$(ids)].flatten();
        return elements.map(function(e){ return new effect(e, Object.extend({ sync:true }, options)) });
      }).flatten(),
      this.options
    );
  }
});

Element.CSS_PROPERTIES = $w(
  'backgroundColor backgroundPosition borderBottomColor borderBottomStyle ' +
  'borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth ' +
  'borderRightColor borderRightStyle borderRightWidth borderSpacing ' +
  'borderTopColor borderTopStyle borderTopWidth bottom clip color ' +
  'fontSize fontWeight height left letterSpacing lineHeight ' +
  'marginBottom marginLeft marginRight marginTop markerOffset maxHeight '+
  'maxWidth minHeight minWidth opacity outlineColor outlineOffset ' +
  'outlineWidth paddingBottom paddingLeft paddingRight paddingTop ' +
  'right textIndent top width wordSpacing zIndex');

Element.CSS_LENGTH = /^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;

String.__parseStyleElement = document.createElement('div');
String.prototype.parseStyle = function(){
  var style, styleRules = $H();
  if (Prototype.Browser.WebKit)
    style = new Element('div',{style:this}).style;
  else {
    String.__parseStyleElement.innerHTML = '<div style="' + this + '"></div>';
    style = String.__parseStyleElement.childNodes[0].style;
  }

  Element.CSS_PROPERTIES.each(function(property){
    if (style[property]) styleRules.set(property, style[property]);
  });

  if (Prototype.Browser.IE && this.include('opacity'))
    styleRules.set('opacity', this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]);

  return styleRules;
};

if (document.defaultView && document.defaultView.getComputedStyle) {
  Element.getStyles = function(element) {
    var css = document.defaultView.getComputedStyle($(element), null);
    return Element.CSS_PROPERTIES.inject({ }, function(styles, property) {
      styles[property] = css[property];
      return styles;
    });
  };
} else {
  Element.getStyles = function(element) {
    element = $(element);
    var css = element.currentStyle, styles;
    styles = Element.CSS_PROPERTIES.inject({ }, function(results, property) {
      results[property] = css[property];
      return results;
    });
    if (!styles.opacity) styles.opacity = element.getOpacity();
    return styles;
  };
}

Effect.Methods = {
  morph: function(element, style) {
    element = $(element);
    new Effect.Morph(element, Object.extend({ style: style }, arguments[2] || { }));
    return element;
  },
  visualEffect: function(element, effect, options) {
    element = $(element);
    var s = effect.dasherize().camelize(), klass = s.charAt(0).toUpperCase() + s.substring(1);
    new Effect[klass](element, options);
    return element;
  },
  highlight: function(element, options) {
    element = $(element);
    new Effect.Highlight(element, options);
    return element;
  }
};

$w('fade appear grow shrink fold blindUp blindDown slideUp slideDown '+
  'pulsate shake puff squish switchOff dropOut').each(
  function(effect) {
    Effect.Methods[effect] = function(element, options){
      element = $(element);
      Effect[effect.charAt(0).toUpperCase() + effect.substring(1)](element, options);
      return element;
    };
  }
);

$w('getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles').each(
  function(f) { Effect.Methods[f] = Element[f]; }
);

Element.addMethods(Effect.Methods);


// FROM: /javascripts/flexcroll.js?1288225651
﻿/*
This license text has to stay intact at all times:
fleXcroll Public License Version
Cross Browser Custom Scroll Bar Script by Hesido.
Public version - Free for non-commercial uses.

This script cannot be used in any commercially built
web sites, or in sites that relates to commercial
activities. This script is not for re-distribution.
For licensing options:
Contact Emrah BASKAYA @ www.hesido.com

Derivative works are only allowed for personal uses,
and they cannot be redistributed.

FleXcroll Public Key Code: 20050907122003339
MD5 hash for this license: 9ada3be4d7496200ab2665160807745d

End of license text---
*/
//fleXcroll v2.0.0
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('B F={2W:[],4F:8(){5(Y.1t){Y.5U(\'<11 57="5C/6p">.1R-5G-4T {3B: 2m !6a;}</11>\')};M.V(16,\'5m\',M.5E)},3O:8(g){B h=Y,J=16,23=6F;5(!h.1t||!h.4M)C;5(33(g)==\'3I\')g=Y.1t(g);5(g==Z||23.3b.2B(\'62\')!=-1||((23.3b.2B(\'6U\')!=-1||23.3b.2B(\'7d\')!=-1)&&!(33(5e)!="6x"&&5e.74))||23.7k==\'6h\'||(23.79.2B(\'7o\')!=-1&&23.3b.2B(\'70\')!=-1)){5(g!=Z)2b(g,\'1R-7g\',\'1R-5G-4T\');5(16.50)16.50(g);C};5(g.14){g.14.1G();C};5(F.5u(g))C;5(!g.1M||g.1M==\'\'){B k="6M",c=1;1B(Y.1t(k+c)!=Z){c++};g.1M=k+c}g.4I=2q 5q();g.14=2q 5q();B l=g.1M,4=g.4I,I=g.14;4.27={5Y:[\'-1s\',0],6Y:[0,\'-1s\'],6t:[\'1s\',0],7s:[0,\'1s\'],7f:[0,\'-1p\'],6e:[0,\'1p\'],7u:[0,\'-4W\'],77:[0,\'+4W\']};4.3R=["-2s","2s"];4.41=["-2s","2s"];4.1V=[[A,A],[A,A]];B m=T(\'6I\',E),H=T(\'7m\',E),G=T(\'66\',E),1l=T(\'72\',E);B o=T(\'7q\',E),1x=T(\'6B\',E),37=A;1l.D.1K=\'4P 5i 7i\';1l.2e();g.11.3B=\'2m\';1x.D.6l="7b";1x.D.1Z="53";1x.D.13="53";1x.D.1O="3h";1x.D.21="-6Q";1x.2e();B p=g.15,5y=g.1q;2u(g,1l,\'1g\',[\'1K-1b-13\',\'1K-25-13\',\'1K-1e-13\',\'1K-2g-13\']);B q=g.15,5k=g.1q,3D=5y-5k,43=p-q;B s=(g.2c)?g.2c:0,59=(g.2i)?g.2i:0;B t=Y.2Y.1f,3Q=/#([^#.]*)$/;B u=[\'5W\',\'6r\',\'6S\'];4.O=[];4.29=[];4.6c=4.U=[];4.6H=4.1I=[];4.1Q=[A,A];4.2D=A;4.2G=A;4.17=[];4.1T=[0,0];4.1v=[];4.3K=[];4.19=[];4.2o=[A,A];4.2x=[0,0];1B(g.4N){m.1a(g.4N)};m.1a(o);g.1a(H);g.1a(1l);B w=P(g,\'1O\');5(w!=\'3h\'&&w!=\'5g\'){g.11.1O=w="35"};5(w==\'5g\')g.11.1O="3h";B x=P(g,\'5C-64\');g.11.5s=\'1b\';H.D.13="52";H.D.1Z="52";H.D.1e="1g";H.D.1b="1g";2u(g,1l,"1g",[\'N-1b\',\'N-1e\',\'N-25\',\'N-2g\']);B y=g.1q,5w=g.15,48;48=H.15;H.D.6j="6O 5i 6z";5(H.15>48)37=E;H.D.6W="1g";2u(1l,g,A,[\'N-1b\',\'N-1e\',\'N-25\',\'N-2g\']);1N(H);1N(g);4.19[0]=H.1D-g.1D;4.19[2]=H.1F-g.1F;g.11.5o=P(g,"N-2g");g.11.5A=P(g,"N-25");1N(H);1N(g);4.19[1]=H.1D-g.1D;4.19[3]=H.1F-g.1F;g.11.5o=P(1l,"N-1e");g.11.5A=P(1l,"N-1b");B z=4.19[2]+4.19[3],3G=4.19[0]+4.19[1];g.11.1O=w;H.11.5s=x;2u(g,H,A,[\'N-1b\',\'N-25\',\'N-1e\',\'N-2g\']);G.D.13=g.1q+\'K\';G.D.1Z=g.15+\'K\';H.D.13=y+\'K\';H.D.1Z=5w+\'K\';G.D.1O=\'3h\';G.D.1e=\'1g\';G.D.1b=\'1g\';4.31=G.D.21;H.1a(m);g.1a(G);G.1a(1x);m.D.1O=\'35\';H.D.1O=\'35\';m.D.1e="0";m.D.13="46%";H.D.3B=\'2m\';H.D.1b="-"+4.19[2]+"K";H.D.1e="-"+4.19[0]+"K";4.4h=1x.15;4.3l=8(){B a=m.60,3p=6v=0;1n(B i=0;i<a.2y;i++){5(a[i].1q){3p=R.1X(a[i].1q,3p)}};4.U[0]=((4.17[1]&&!4.1v[1])||4.29[1])?g.1q-4.1T[0]:g.1q;4.1I[0]=3p+z;C 4.1I[0]};4.3f=8(){4.U[1]=((4.17[0]&&!4.1v[0])||4.29[0])?g.15-4.1T[1]:g.15;4.1I[1]=m.15+3G-2;C 4.1I[1]};4.4K=8(){m.D.2K=\'3T\';m.D.2K=\'6g\'};4.4d=8(){H.D.13=(37)?(4.U[0]-z-3D)+\'K\':4.U[0]+\'K\'};4.4l=8(){H.D.1Z=(37)?(4.U[1]-3G-43)+\'K\':4.U[1]+\'K\'};4.2O=8(){4.3l();4.3f();G.2U=2q 4j();B a=G.2U;2O(a,\'6K\',1);a.2S=[1j(P(a.7,\'N-1e\')),1j(P(a.7,\'N-2g\'))];a.7.D.N=\'1g\';a.7.Q=0;a.7.39=E;a.7.2w=1;m.4R=a.7;3M(a,0);4.1T[0]=(4.2o[1])?0:a.1k.1q;4.4d();G.3n=2q 4j();B b=G.3n;2O(b,\'68\',0);b.2S=[1j(P(b.7,\'N-1b\')),1j(P(b.7,\'N-25\'))];b.7.D.N=\'1g\';b.7.Q=0;b.7.39=A;b.7.2w=0;m.6D=b.7;5(J.55)b.7.D.1O=\'35\';3M(b,0);4.1T[1]=(4.2o[0])?0:b.1k.15;4.4l();G.D.1Z=g.15+\'K\';b.2I=T(\'6n\');G.1a(b.2I);b.2I.4a=8(){b.7.3j=E;4.1L=b.7;b.7.3t=E;b.7.2z=A;G.2U.7.2z=A;F.V(h,\'3Y\',1P);F.V(h,\'2M\',3r);F.V(h,\'3v\',2Q);C A}};4.1L=Z;4.2O();M.4f(o,G);5(!M.1z(g,\'4Y\',2A)||!M.1z(g,\'5c\',2A)){g.5V=2A};M.1z(g,\'4Y\',2A);M.1z(g,\'5c\',2A);M.1z(m,\'4G\',3C);M.1z(G,\'4G\',3C);g.6b(\'6G\',\'0\');M.V(g,\'6q\',8(e){5(g.2X)C;5(!e){B e=J.1m};B a=e.58;4.5D=a;I.24();5(4.27[\'1S\'+a]&&!16.55){I.1h(4.27[\'1S\'+a][0],4.27[\'1S\'+a][1],E);5(e.1u)e.1u();C A}});M.V(g,\'63\',8(e){5(g.2X)C;5(!e){B e=J.1m};B a=e.58;5(4.27[\'1S\'+a]){I.1h(4.27[\'1S\'+a][0],4.27[\'1S\'+a][1],E);5(e.1u)e.1u();C A}});M.V(g,\'6y\',8(){4.5D=A});M.V(h,\'3v\',2C);M.V(g,\'4U\',3P);8 3P(e){5(!e)e=J.1m;B a=(e.18)?e.18:(e.1C)?e.1C:A;5(!a||(a.1r&&a.1r.X(3c("\\\\6i\\\\b"))))C;4.5n=e.2f;4.5J=e.2l;34();1N(g);2C();F.V(h,\'2M\',3J);4.2J=[g.1F+10,g.1F+4.U[0]-10,g.1D+10,g.1D+4.U[1]-10]};8 3J(e){5(!e)e=J.1m;B a=e.2f,4i=e.2l,4x=a+4.4B,42=4i+4.4z;4.4D=(4x<4.2J[0]||4x>4.2J[1])?1:0;4.4E=(42<4.2J[2]||42>4.2J[3])?1:0;4.4s=a-4.5n;4.4C=4i-4.5J;4.3q=(4.4s>40)?1:(4.4s<-40)?-1:0;4.3i=(4.4C>40)?1:(4.4C<-40)?-1:0;5((4.3q!=0||4.3i!=0)&&!4.2j)4.2j=J.2R(8(){5(4.3q==0&&4.3i==0){J.2n(4.2j);4.2j=A;C};34();5(4.4D==1||4.4E==1)I.1h((4.3q*4.4D)+"s",(4.3i*4.4E)+"s",E)},45)};8 2C(){F.1H(h,\'2M\',3J);5(4.2j)J.2n(4.2j);4.2j=A;5(4.3V)J.51(4.3V);5(4.4b)J.2n(4.4b)};8 3x(a){5(4.2G){16.2n(4.2G);4.2G=A}5(!a)G.D.21=4.31};8 34(){4.4B=(J.5v)?J.5v:(h.2t&&h.2t.2i)?h.2t.2i:0;4.4z=(J.5f)?J.5f:(h.2t&&h.2t.2c)?h.2t.2c:0};I.4o=8(){1n(B j=0,3F;3F=u[j];j++){B a=g.30(3F);1n(B i=0,2r;2r=a[i];i++){5(!2r.4J){F.V(2r,\'5Z\',8(){g.2X=E});F.V(2r,\'6J\',6R=8(){g.2X=A});2r.4J=E}}}};g.6u=I.1G=8(a){5(G.W[1]()===0||G.W[0]()===0)C;m.D.N=\'4P\';B b=4.17[0],5b=4.17[1],47=G.2U,2F=G.3n,3e,3u,2T=[];G.D.13=g.1q-3D+\'K\';G.D.1Z=g.15-43+\'K\';2T[0]=4.U[0];2T[1]=4.U[1];4.17[0]=4.3l()>4.U[0];4.17[1]=4.3f()>4.U[1];B c=(b!=4.17[0]||5b!=4.17[1]||2T[0]!=4.U[0]||2T[1]!=4.U[1])?E:A;47.1k.3S(4.17[1]);2F.1k.3S(4.17[0]);3e=(4.17[1]||4.29[1]);3u=(4.17[0]||4.29[0]);4.3l();4.3f();4.4l();4.4d();5(!4.17[0]||!4.17[1]||4.1v[0]||4.1v[1])2F.2I.2e();1i 2F.2I.38();5(3e)3y(47,(3u&&!4.1v[0])?4.1T[1]:0);1i m.D.1e="0";5(3u)3y(2F,(3e&&!4.1v[1])?4.1T[0]:0);1i m.D.1b="0";5(c&&!a)I.1G(E);m.D.N=\'1g\';4.1Q[0]=4.1Q[1]=A};g.6f=I.1h=8(a,b,c,d){B e;5((a||a===0)&&4.O[0]){a=4u(a,0);e=G.3n.7;e.1c=(c)?R.28(R.1X(e.1J,e.1c-a),0):-a;e.3m()}5((b||b===0)&&4.O[1]){b=4u(b,1);e=G.2U.7;e.1c=(c)?R.28(R.1X(e.1J,e.1c-b),0):-b;e.3m()}5(!c)4.1Q[0]=4.1Q[1]=A;5(g.3z&&!d)g.3z();C 4.1V};I.4m=8(a,b){C I.1h(a,b,E)};I.3A=8(a){5(a==Z||!4X(a))C;B b=4Q(a);I.1h(b[0]+4.19[2],b[1]+4.19[0],A);I.1h(0,0,E)};2u(1l,g,\'1g\',[\'1K-1b-13\',\'1K-25-13\',\'1K-1e-13\',\'1K-2g-13\']);M.4f(1l,G);g.2c=0;g.2i=0;I.4o();M.2W[M.2W.2y]=g;2b(g,\'67\',A);I.1G();I.1h(59,s,E);5(t.X(3Q)){I.3A(h.1t(t.X(3Q)[1]))};4.7c=J.2R(8(){B n=1x.15;5(n!=4.4h){I.1G();4.4h=n}},6V);8 4u(v,i){B a=v.7j();v=6C(a);C 1j((a.X(/p$/))?v*4.U[i]*0.9:(a.X(/s$/))?v*4.U[i]*0.1:v)};8 P(a,b){C F.P(a,b)};8 2u(a,b,c,d){B e=2q 4j();1n(B i=0;i<d.2y;i++){e[i]=F.4e(d[i]);b.11[e[i]]=P(a,d[i],e[i]);5(c)a.11[e[i]]=c}};8 T(b,c,d,e){B f=(d)?d:h.4M(\'4q\');5(!d){f.1M=l+\'1S\'+b;f.1r=(c)?b:b+\' 73\'};f.W=[8(){C f.1q},8(){C f.15}];f.2N=(e)?[1P,1P]:[8(a){f.D.13=a},8(a){f.D.1Z=a}];f.5j=[8(){C P(f,"1b")},8(){C P(f,"1e")}];f.1y=(e)?[1P,1P]:[8(a){f.D.1b=a},8(a){f.D.1e=a}];f.2e=8(){f.D.2V="2m"};f.38=8(a){f.D.2V=(a)?P(a,\'2V\'):"6m"};f.D=f.11;C f};8 2O(a,b,c){B d=Y.1t(l+\'-1R-\'+b);B e=(d!=Z)?E:A;5(e){a.1k=T(A,A,d,E);4.2o[c]=E;a.2v=T(b+\'54\');a.1W=T(b+\'5z\');a.7=T(A,A,F.3X(d,\'4q\',\'1R-6N\')[0]);a.20=T(b+\'5r\');a.1E=T(b+\'5H\')}1i{a.1k=T(b+\'6Z\');a.2v=T(b+\'54\');a.1W=T(b+\'5z\');a.7=T(b+\'78\');a.20=T(b+\'5r\');a.1E=T(b+\'5H\');G.1a(a.1k);a.1k.1a(a.7);a.1k.1a(a.2v);a.1k.1a(a.1W);a.7.1a(a.20);a.7.1a(a.1E)}};8 3M(b,c){B d=b.1k,7=b.7,i=7.2w;7.1c=0;7.2E=b.2S[0];7.2Z=d;7.H=H;7.4H=m;7.1w=0;3y(b,c,E);7.3E=8(a){5(!a)7.Q=1j((7.1c*7.26)/7.1J);7.Q=(R.28(R.1X(7.Q,0),7.26));7.1y[i](7.Q+7.2E+"K");5(!7.1w)7.1w=7.1c-1j((7.Q/7.3d)*7.1J);7.1w=(7.Q==0)?0:(7.Q==7.26)?0:(!7.1w)?0:7.1w;5(a){7.1c=1j((7.Q/7.3d)*7.1J);m.1y[i](7.1c+7.1w+"K");4.1V[i]=[-7.1c-7.1w,-7.1J]}};7.3m=8(){7.Q=1j((7.1c*7.3d)/7.1J);7.Q=(R.28(R.1X(7.Q,0),7.26));m.1y[i](7.1c+"K");4.1V[i]=[-7.1c,-7.1J];7.1w=A;7.3E(A)};4.2L=P(7,\'z-5a\');7.D.21=(4.2L=="5X"||4.2L=="0"||4.2L==\'6X\')?2:4.2L;H.D.21=P(7,\'z-5a\');7.4a=8(){7.3t=E;4.1L=7;7.3j=A;7.2z=A;F.V(h,\'3Y\',1P);F.V(h,\'2M\',3r);F.V(h,\'3v\',2Q);C A};7.6s=2C;d.4a=d.7A=8(e){5(!e){B e=J.1m};5(e.18&&(e.18==b.20||e.18==b.1E||e.18==b.7))C;5(e.1C&&(e.1C==b.20||e.1C==b.1E||e.1C==b.7))C;B a,2k=[];34();I.24();1N(7);a=(7.39)?e.2l+4.4z-7.1D:e.2f+4.4B-7.1F;2k[7.2w]=(a<0)?4.41[0]:4.41[1];2k[1-7.2w]=0;I.1h(2k[0],2k[1],E);5(e.57!="7p"){2C();4.3V=J.4V(8(){4.4b=J.2R(8(){I.1h(2k[0],2k[1],E)},5M)},6d)};C A};d.3S=8(r){5(r){d.38(g);4.1v[i]=(P(d,"2V")=="2m"||4.2o[i])?E:A;5(!4.1v[i])7.38(g);1i 5(!4.2o[i])7.2e();4.O[i]=E;2b(d,"","5F")}1i{d.2e();7.2e();4.29[i]=(P(d,"2V")!="2m")?E:A;4.O[i]=A;7.Q=0;m.1y[i](\'1g\');4.1V[i]=[A,A];2b(d,"5F","")};H.1y[1-i]((4.3K[i]&&(r||4.29[i])&&!4.1v[i])?4.1T[1-i]-4.19[i*2]+"K":"-"+4.19[i*2]+"K")};d.7e=1P};8 3y(a,b,c){B d=a.1k,7=a.7,2v=a.2v,20=a.20,1W=a.1W,1E=a.1E,i=7.2w;d.2N[i](G.W[i]()-b+\'K\');d.1y[1-i](G.W[1-i]()-d.W[1-i]()+\'K\');4.3K[i]=(1j(d.5j[1-i]())===0)?E:A;a.4k=a.2S[0]+a.2S[1];a.44=1j((d.W[i]()-a.4k)*0.75);7.5p=R.28(R.1X(R.28(1j(4.U[i]/4.1I[i]*d.W[i]()),a.44),45),a.44);7.2N[i](7.5p+\'K\');7.26=d.W[i]()-7.W[i]()-a.4k;7.Q=R.28(R.1X(0,7.Q),7.26);7.1y[i](7.Q+7.2E+\'K\');7.1J=H.W[i]()-4.1I[i];7.3d=7.26;2v.2N[i](d.W[i]()-1W.W[i]()+\'K\');20.2N[i](7.W[i]()-1E.W[i]()+\'K\');1E.1y[i](7.W[i]()-1E.W[i]()+\'K\');1W.1y[i](d.W[i]()-1W.W[i]()+\'K\');5(!c)7.3m();4.4K()};I.24=8(){H.2c=0;H.2i=0;g.2c=0;g.2i=0};M.V(J,\'5m\',8(){5(g.14)I.1G()});M.V(J,\'7E\',8(){5(g.4t)J.51(g.4t);g.4t=J.4V(8(){5(g.14)I.1G()},5M)});8 1P(){C A};8 3r(e){5(!e){B e=J.1m};B a=4.1L,L,4y,7w,65;5(a==Z)C;5(!F.4O&&!e.76)2Q();4y=(a.3j)?2:1;1n(B i=0;i<4y;i++){L=(i==1)?a.4H.4R:a;5(a.3t){5(!L.2z){I.24();1N(L);1N(L.2Z);L.5x=e.2l-L.1D;L.5S=e.2f-L.1F;L.5O=L.Q;L.2z=E};L.Q=(L.39)?e.2l-L.5x-L.2Z.1D-L.2E:e.2f-L.5S-L.2Z.1F-L.2E;5(a.3j)L.Q=L.Q+(L.Q-L.5O);L.3E(E);5(g.3z)g.3z()}1i L.2z=A}};8 2Q(){5(4.1L!=Z){4.1L.3t=A;4.1L.1c+=4.1L.1w}4.1L=Z;F.1H(h,\'3Y\',1P);F.1H(h,\'2M\',3r);F.1H(h,\'3v\',2Q)};8 3C(e){5(!e)e=J.1m;5(M==G)G.D.21=4.31;5(e.2d.2y!=1||(!4.O[0]&&!4.O[1]))C A;B a=\'\',6A=(e.18&&(e.18.1f||(e.18.7t==3&&e.18.1d.1f)))?E:A;4.2x=[e.2d[0].2f,e.2d[0].2l];3x();F.1z(g,\'5h\',3L);F.1z(g,\'5K\',4c);4.5Q=(e.18&&e.18.1M&&e.18.1M.X(/1S[6k]7y[7C]e?/))?E:A;C A};8 3L(e){5(!e)e=J.1m;5(e.2d.2y!=1)C A;F.1H(g,\'4U\',3P);B a=[e.2d[0].2f,e.2d[0].2l];4.2D=E;4.12=[4.2x[0]-a[0],4.2x[1]-a[1]];5(4.5Q){4.12[0]*=-(4.1I[0]/4.U[0]);4.12[1]*=-(4.1I[1]/4.U[1])};I.4m(4.12[0],4.12[1]);4.2x[0]=a[0];4.2x[1]=a[1];1n(B i=0;i<2;i++){5(4.12[i]!==0&&4.O[i]&&(4.12[1-i]==0||!4.O[1-i])){5((4.12[i]>0&&4.1V[i][1]==4.1V[i][0])||(4.12[i]<0&&4.1V[i][0]==0))4.2D=A};5(!4.O[i]&&4.12[1-i]!==0&&R.3W(4.12[i]/4.12[1-i])>1.1)4.2D=A};5(4.2D){e.1u();G.D.21=\'7l\'}1i{G.D.21=4.31}};8 4c(e){5(!e)e=J.1m;e.1u();5(e.2d.2y>0)C A;F.1H(g,\'5h\',3L);F.1H(g,\'5K\',4c);5((4.O[0]&&R.3W(4.12[0])>6)||(4.O[1]&&R.3W(4.12[1])>6)){B a=0;3x(E);4.2G=16.2R(8(){I.4m(4p(4.12[0],0,10,a,0.3),4p(4.12[1],0,10,a,0.3));a++;5(a>10)3x()},46)}};8 2A(e){5(!e)e=J.1m;5(!M.14)C;B a=M,36,4A,1U=A,1A=0,22;I.24();4w=(e.18)?e.18:(e.1C)?e.1C:M;5(4w.1M&&4w.1M.X(/6P/))1U=E;5(e.4L)1A=-e.4L;5(e.5R)1A=e.5R;1A=(1A<0)?-1:+1;22=(1A<0)?0:1;4.1Q[1-22]=A;5((4.1Q[22]&&!1U)||(!4.O[0]&&!4.O[1]))C;5(4.O[1]&&!1U)1Y=I.1h(A,4.3R[22],E);36=!4.O[1]||1U||(4.O[1]&&((1Y[1][0]==1Y[1][1]&&1A>0)||(1Y[1][0]==0&&1A<0)));5(4.O[0]&&(!4.O[1]||1U))1Y=I.1h(4.3R[22],A,E);4A=!4.O[0]||(4.O[0]&&4.O[1]&&36&&!1U)||(4.O[0]&&((1Y[0][0]==1Y[0][1]&&1A>0)||(1Y[0][0]==0&&1A<0)));5(36&&4A&&!1U)4.1Q[22]=E;1i 4.1Q[22]=A;5(e.1u)e.1u();C A};8 4X(a){1B(a.1d){a=a.1d;5(a==g)C E}C A};8 1N(a){B b=a,2a=2h=0;5(b.32){1B(b){2a+=b.5I;2h+=b.5d;b=b.32}}1i 5(b.x){2a+=b.x;2h+=b.y};a.1F=2a;a.1D=2h};8 4Q(a){B b=a;2a=2h=0;1B(!b.15&&b.1d&&b!=m&&P(b,\'2K\')=="61"){b=b.1d};5(b.32){1B(b!=m){2a+=b.5I;2h+=b.5d;b=b.32}};C[2a,2h]};8 2b(a,b,c){F.2b(a,b,c)};8 4p(a,b,c,d,e){c=R.1X(c,1);B f=b-a,3o=a+(R.71(((1/c)*d),e)*f);C(3o>0)?R.6w(3o):R.7r(3o)}},5E:8(){5(F.3w)16.2n(F.3w);F.3H();F.3U();5(16.4Z)16.4Z()},2b:8(a,b,c){5(!a.1r)a.1r=\'\';B d=a.1r;5(b&&!d.X(3c("(^|\\\\s)"+b+"($|\\\\s)")))d=d.4n(/(\\S$)/,\'$1 \')+b;5(c)d=d.4n(3c("((^|\\\\s)+"+c+")+($|\\\\s)","g"),\'$2\').4n(/\\s$/,\'\');a.1r=d},3H:8(){B d=/#([^#.]*)$/,2H=/(.*)#.*$/,5N=/(^|\\s)1R-7h-6L-7B($|\\s)/,7x,49,i,1o,5t=Y.30("a"),2p=Y.2Y.1f;5(2p.X(2H))2p=2p.X(2H)[1];1n(i=0;1o=5t[i];i++){49=(1o.1r)?1o.1r:\'\';5(1o.1f&&!1o.3g&&1o.1f.X(d)&&((1o.1f.X(2H)&&2p===1o.1f.X(2H)[1])||49.X(5N))){1o.3g=E;F.V(1o,\'69\',8(e){5(!e)e=16.1m;B a=(e.1C)?e.1C:M;1B(!a.3g&&a.1d){a=a.1d};5(!a.3g)C;B b=Y.1t(a.1f.X(d)[1]),3a=A;5(b==Z)b=(b=Y.7D(a.1f.X(d)[1])[0])?b:Z;5(b!=Z){B c=b;1B(c.1d){c=c.1d;5(c.14){c.14.3A(b);3a=c}};5(3a){5(e.1u)e.1u();Y.2Y.1f=2p+"#"+a.1f.X(d)[1];3a.14.24();C A}}})}}},3U:8(a){F.7a=E;B b=F.3X(Y.30("7J")[0],"4q",(a)?a:\'1R\');1n(B i=0,3s;3s=b[i];i++)5(!3s.14)F.3O(3s)},7H:8(a,b){5(33(a)==\'3I\')a=Y.1t(a);5(a==Z)C A;B c=a;1B(c.1d){c=c.1d;5(c.14){5(b){Y.2Y.1f="#"+b};c.14.3A(a);c.14.24();C E}};C A},1G:8(a,b){1n(B i=0,3k;3k=F.2W[i];i++){3k.14.1G();5(b)3k.14.4o()};5(a)F.3H()},4e:8(a){B a=a.6E(\'-\'),3N=a[0],i;1n(i=1;4g=a[i];i++){3N+=4g.7v(0).7G()+4g.7I(1)};C 3N},3X:8(a,b,c){5(33(a)==\'3I\')a=Y.1t(a);5(a==Z)C A;B d=2q 3c("(^|\\\\s)"+c+"($|\\\\s)"),7K,3Z=[],4v=0;B e=a.30(b);1n(B i=0,2P;2P=e[i];i++){5(2P.1r&&2P.1r.X(d)){3Z[4v]=2P;4v++}}C 3Z},5u:8(a){5(a==Z)C E;B b;1B(a.1d){b=F.P(a,\'2K\');5(b==\'3T\')C E;a=a.1d};C A},P:8(a,b){5(16.4S)C 16.4S(a,Z).6o(b);5(a.5l)C a.5l[F.4e(b)];C A},3w:16.2R(8(){B a=Y.1t(\'1R-7n\');5(a!=Z){F.3U();16.2n(F.3w)}},46),4f:8(a,b){a.1d.7F(a);a.11.2K="3T";b.1a(a)},V:8(a,b,c){5(!F.1z(a,b,c)&&a.56){a.56(\'5L\'+b,c)}},1z:8(a,b,c){5(a.4r){a.4r(b,c,A);F.4O=E;16.4r("6T",8(){F.1H(a,b,c)},A);C E}1i C A},1H:8(a,b,c){5(!F.5B(a,b,c)&&a.5P)a.5P(\'5L\'+b,c)},5B:8(a,b,c){5(a.5T){a.5T(b,c,A);C E}1i C A}};8 7z(a){F.3O(a)};F.4F();',62,481,'||||sC|if||sBr|function||||||||||||||||||||||||||||false|var|return|sY|true|fleXenv|tDv|mDv|sfU|wD|px|movBr|this|padding|scroller|getStyle|curPos|Math||createDiv|cntRSize|addTrggr|getSize|match|document|null||style|moveDelta|width|fleXcroll|offsetHeight|window|reqS|target|paddings|appendChild|left|trgtScrll|parentNode|top|href|0px|setScrollPos|else|parseInt|sDv|pDv|event|for|anchoR||offsetWidth|className||getElementById|preventDefault|forcedHide|targetSkew|fDv|setPos|addChckTrggr|delta|while|srcElement|yPos|sSBr|xPos|updateScrollBars|remTrggr|cntSize|mxScroll|border|goScroll|id|findPos|position|retFalse|edge|flexcroll|_|barSpace|hoverH|scrollPosition|sSDv|max|scrollState|height|sFBr|zIndex|iNDx|nV|mDPosFix|right|maxPos|keyAct|min|forcedBar|curleft|classChange|scrollTop|targetTouches|fHide|clientX|bottom|curtop|scrollLeft|tSelectFunc|mV|clientY|hidden|clearInterval|externaL|urlBase|new|formItem||documentElement|copyStyles|sFDv|indx|touchPos|length|moved|mWheelProc|indexOf|intClear|touchPrevent|minPos|hBr|touchFlick|urlExt|jBox|mTBox|display|barZ|mousemove|setSize|createScrollBars|pusher|mMouseUp|setInterval|barPadding|cPSize|vrt|visibility|fleXlist|focusProtect|location|ofstParent|getElementsByTagName|tDivZ|offsetParent|typeof|pageScrolled|relative|vEdge|stdMode|fShow|vertical|eScroll|userAgent|RegExp|sRange|vUpReq|getContentHeight|fleXanchor|absolute|sYdir|scrollBoth|fleXdiv|getContentWidth|realScrollPos|hrz|stepp|maxCWidth|sXdir|mMoveBar|tgDiv|clicked|hUpReq|mouseup|catchFastInit|flickClear|updateScroll|onfleXcroll|scrollToElement|overflow|handleTouch|brdWidthLoss|doBarPos|inputName|padHeightComp|prepAnchors|string|tSelectMouse|forcedPos|handleTouchMove|prepareScroll|reT|fleXcrollMain|handleTextSelect|uReg|wheelAct|setVisibility|none|initByClass|barClickRetard|abs|getByClassName|selectstart|retArray||baseAct|mdY|brdHeightLoss|baseProp||100|vBr|mHeight|claSS|onmousedown|barClickScroll|handleTouchEnd|setWidth|camelConv|putAway|parT|zTHeight|mY|Array|padLoss|setHeight|scrollContent|replace|formUpdate|easeInOut|div|addEventListener|xAw|refreshTimeout|calcCScrollVal|key|hElem|mdX|maxx|yScrld|hEdge|xScrld|yAw|mOnXEdge|mOnYEdge|fleXcrollInit|touchstart|scrlTrgt|fleXdata|fleXprocess|fixIEDispBug|wheelDelta|createElement|firstChild|w3events|1px|findRCpos|vBar|getComputedStyle|default|mousedown|setTimeout|100p|isddvChild|mousewheel|onfleXcrollRun|onfleXcrollFail|clearTimeout|100px|1em|basebeg|opera|attachEvent|type|keyCode|oScrollX|index|reqV|DOMMouseScroll|offsetTop|HTMLElement|pageYOffset|fixed|touchmove|solid|getPos|intlWidth|currentStyle|load|inMposX|paddingTop|aSize|Object|barbeg|textAlign|anchorList|checkHidden|pageXOffset|postHeight|pointerOffsetY|brdWidth|baseend|paddingLeft|remChckTrggr|text|pkeY|globalInit|flexinactive|hide|barend|offsetLeft|inMposY|touchend|on|80|regExer|inCurPos|detachEvent|touchBar|detail|pointerOffsetX|removeEventListener|write|onmousewheel|textarea|auto|_37|focus|childNodes|inline|OmniWeb|keypress|align|yScroll|scrollwrapper|flexcrollactive|hscroller|click|important|setAttribute|containerSize|425|_34|contentScroll|block|KDE|bscrollgeneric|borderBottom|vh|fontSize|visible|scrollerjogbox|getPropertyValue|css|keydown|input|onmouseover|_39|scrollUpdate|compPad|floor|undefined|keyup|black|touchLink|zoomdetectdiv|parseFloat|hBar|split|navigator|tabIndex|contentSize|contentwrapper|blur|vscroller|page|flex__|scrollbar|2px|_hscroller|999|onblur|select|unload|AppleWebKit|2500|borderBottomWidth|normal|_38|base|MSIE|pow|copyholder|scrollgeneric|prototype||button|_35|bar|platform|initialized|12px|sizeChangeDetect|Safari|onmouseclick|_33|failed|in|blue|toString|vendor|9999|mcontentwrapper|init|Mac|dblclick|domfixdiv|ceil|_40|nodeType|_36|charAt|xScroll|matcH|scrollerba|CSBfleXcroll|ondblclick|link|rs|getElementsByName|resize|removeChild|toUpperCase|scrollTo|substr|body|clsnm'.split('|'),0,{}))



// FROM: /javascripts/code_highlighter.js?1288225651
/* Unobtrustive Code Highlighter By Dan Webb 11/2005
   Version: 0.4
	
	Usage:
		Add a script tag for this script and any stylesets you need to use
		to the page in question, add correct class names to CODE elements, 
		define CSS styles for elements. That's it! 
	
	Known to work on:
		IE 5.5+ PC
		Firefox/Mozilla PC/Mac
		Opera 7.23 + PC
		Safari 2
		
	Known to degrade gracefully on:
		IE5.0 PC
	
	Note: IE5.0 fails due to the use of lookahead in some stylesets.  To avoid script errors
	in older browsers use expressions that use lookahead in string format when defining stylesets.
	
	This script is inspired by star-light by entirely cunning Dean Edwards
	http://dean.edwards.name/star-light/.  
*/

// replace callback support for safari.
if ("a".replace(/a/, function() {return "b"}) != "b") (function(){
  var default_replace = String.prototype.replace;
  String.prototype.replace = function(search,replace){
	// replace is not function
	if(typeof replace != "function"){
		return default_replace.apply(this,arguments)
	}
	var str = "" + this;
	var callback = replace;
	// search string is not RegExp
	if(!(search instanceof RegExp)){
		var idx = str.indexOf(search);
		return (
			idx == -1 ? str :
			default_replace.apply(str,[search,callback(search, idx, str)])
		)
	}
	var reg = search;
	var result = [];
	var lastidx = reg.lastIndex;
	var re;
	while((re = reg.exec(str)) != null){
		var idx  = re.index;
		var args = re.concat(idx, str);
		result.push(
			str.slice(lastidx,idx),
			callback.apply(null,args).toString()
		);
		if(!reg.global){
			lastidx += RegExp.lastMatch.length;
			break
		}else{
			lastidx = reg.lastIndex;
		}
	}
	result.push(str.slice(lastidx));
	return result.join("")
  }
})();

var CodeHighlighter = { styleSets : new Array };

CodeHighlighter.addStyle = function(name, rules) {
	// using push test to disallow older browsers from adding styleSets
	if ([].push) this.styleSets.push({
		name : name, 
		rules : rules,
		ignoreCase : arguments[2] || false
	})
	
	function setEvent() {
		// set highlighter to run on load (use LowPro if present)
		if (typeof Event != 'undefined' && typeof Event.onReady == 'function') 
		  return Event.onReady(CodeHighlighter.init.bind(CodeHighlighter));
		
		var old = window.onload;
		
		if (typeof window.onload != 'function') {
			window.onload = function() { CodeHighlighter.init() };
		} else {
			window.onload = function() {
				old();
				CodeHighlighter.init();
			}
		}
	}
	
	// only set the event when the first style is added
	if (this.styleSets.length==1) setEvent();
}

CodeHighlighter.init = function() {
	if (!document.getElementsByTagName) return; 
	if ("a".replace(/a/, function() {return "b"}) != "b") return; // throw out Safari versions that don't support replace function
	// throw out older browsers
	
	var codeEls = document.getElementsByTagName("CODE");
	// collect array of all pre elements
	codeEls.filter = function(f) {
		var a =  new Array;
		for (var i = 0; i < this.length; i++) if (f(this[i])) a[a.length] = this[i];
		return a;
	} 
	
	var rules = new Array;
	rules.toString = function() {
		// joins regexes into one big parallel regex
		var exps = new Array;
		for (var i = 0; i < this.length; i++) exps.push(this[i].exp);
		return exps.join("|");
	}
	
	function addRule(className, rule) {
		// add a replace rule
		var exp = (typeof rule.exp != "string")?String(rule.exp).substr(1, String(rule.exp).length-2):rule.exp;
		// converts regex rules to strings and chops of the slashes
		rules.push({
			className : className,
			exp : "(" + exp + ")",
			length : (exp.match(/(^|[^\\])\([^?]/g) || "").length + 1, // number of subexps in rule
			replacement : rule.replacement || null 
		});
	}
	
	function parse(text, ignoreCase) {
		// main text parsing and replacement
		return text.replace(new RegExp(rules, (ignoreCase)?"gi":"g"), function() {
			var i = 0, j = 1, rule;
			while (rule = rules[i++]) {
				if (arguments[j]) {
					// if no custom replacement defined do the simple replacement
					if (!rule.replacement) return "<span class=\"" + rule.className + "\">" + arguments[0] + "</span>";
					else {
						// replace $0 with the className then do normal replaces
						var str = rule.replacement.replace("$0", rule.className);
						for (var k = 1; k <= rule.length - 1; k++) str = str.replace("$" + k, arguments[j + k]);
						return str;
					}
				} else j+= rule.length;
			}
		});
	}
	
	function highlightCode(styleSet) {
		// clear rules array
		var parsed;
		rules.length = 0;
		
		// get stylable elements by filtering out all code elements without the correct className	
		var stylableEls = codeEls.filter(function(item) {return (item.className.indexOf(styleSet.name)>=0)});
		
		// add style rules to parser
		for (var className in styleSet.rules) addRule(className, styleSet.rules[className]);
		
			
		// replace for all elements
		for (var i = 0; i < stylableEls.length; i++) {
			// EVIL hack to fix IE whitespace badness if it's inside a <pre>
			if (/MSIE/.test(navigator.appVersion) && stylableEls[i].parentNode.nodeName == 'PRE') {
				stylableEls[i] = stylableEls[i].parentNode;
				
				parsed = stylableEls[i].innerHTML.replace(/(<code[^>]*>)([^<]*)<\/code>/i, function() {
					return arguments[1] + parse(arguments[2], styleSet.ignoreCase) + "</code>"
				});
				parsed = parsed.replace(/\n( *)/g, function() { 
					var spaces = "";
					for (var i = 0; i < arguments[1].length; i++) spaces+= "&nbsp;";
					return "\n" + spaces;  
				});
				parsed = parsed.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
				parsed = parsed.replace(/\n(<\/\w+>)?/g, "<br />$1").replace(/<br \/>[\n\r\s]*<br \/>/g, "<p><br></p>");
				
			} else parsed = parse(stylableEls[i].innerHTML, styleSet.ignoreCase);
			
			stylableEls[i].innerHTML = parsed;
		}
	}
	
	// run highlighter on all stylesets
	for (var i=0; i < this.styleSets.length; i++) {
		highlightCode(this.styleSets[i]);
	}
}


// FROM: /javascripts/dragdrop.js?1288225651
// Copyright (c) 2005-2009 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//
// script.aculo.us is freely distributable under the terms of an MIT-style license.
// For details, see the script.aculo.us web site: http://script.aculo.us/

if(Object.isUndefined(Effect))
  throw("dragdrop.js requires including script.aculo.us' effects.js library");

var Droppables = {
  drops: [],

  remove: function(element) {
    this.drops = this.drops.reject(function(d) { return d.element==$(element) });
  },

  add: function(element) {
    element = $(element);
    var options = Object.extend({
      greedy:     true,
      hoverclass: null,
      tree:       false
    }, arguments[1] || { });

    // cache containers
    if(options.containment) {
      options._containers = [];
      var containment = options.containment;
      if(Object.isArray(containment)) {
        containment.each( function(c) { options._containers.push($(c)) });
      } else {
        options._containers.push($(containment));
      }
    }

    if(options.accept) options.accept = [options.accept].flatten();

    Element.makePositioned(element); // fix IE
    options.element = element;

    this.drops.push(options);
  },

  findDeepestChild: function(drops) {
    deepest = drops[0];

    for (i = 1; i < drops.length; ++i)
      if (Element.isParent(drops[i].element, deepest.element))
        deepest = drops[i];

    return deepest;
  },

  isContained: function(element, drop) {
    var containmentNode;
    if(drop.tree) {
      containmentNode = element.treeNode;
    } else {
      containmentNode = element.parentNode;
    }
    return drop._containers.detect(function(c) { return containmentNode == c });
  },

  isAffected: function(point, element, drop) {
    return (
      (drop.element!=element) &&
      ((!drop._containers) ||
        this.isContained(element, drop)) &&
      ((!drop.accept) ||
        (Element.classNames(element).detect(
          function(v) { return drop.accept.include(v) } ) )) &&
      Position.within(drop.element, point[0], point[1]) );
  },

  deactivate: function(drop) {
    if(drop.hoverclass)
      Element.removeClassName(drop.element, drop.hoverclass);
    this.last_active = null;
  },

  activate: function(drop) {
    if(drop.hoverclass)
      Element.addClassName(drop.element, drop.hoverclass);
    this.last_active = drop;
  },

  show: function(point, element) {
    if(!this.drops.length) return;
    var drop, affected = [];

    this.drops.each( function(drop) {
      if(Droppables.isAffected(point, element, drop))
        affected.push(drop);
    });

    if(affected.length>0)
      drop = Droppables.findDeepestChild(affected);

    if(this.last_active && this.last_active != drop) this.deactivate(this.last_active);
    if (drop) {
      Position.within(drop.element, point[0], point[1]);
      if(drop.onHover)
        drop.onHover(element, drop.element, Position.overlap(drop.overlap, drop.element));

      if (drop != this.last_active) Droppables.activate(drop);
    }
  },

  fire: function(event, element) {
    if(!this.last_active) return;
    Position.prepare();

    if (this.isAffected([Event.pointerX(event), Event.pointerY(event)], element, this.last_active))
      if (this.last_active.onDrop) {
        this.last_active.onDrop(element, this.last_active.element, event);
        return true;
      }
  },

  reset: function() {
    if(this.last_active)
      this.deactivate(this.last_active);
  }
};

var Draggables = {
  drags: [],
  observers: [],

  register: function(draggable) {
    if(this.drags.length == 0) {
      this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
      this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
      this.eventKeypress  = this.keyPress.bindAsEventListener(this);

      Event.observe(document, "mouseup", this.eventMouseUp);
      Event.observe(document, "mousemove", this.eventMouseMove);
      Event.observe(document, "keypress", this.eventKeypress);
    }
    this.drags.push(draggable);
  },

  unregister: function(draggable) {
    this.drags = this.drags.reject(function(d) { return d==draggable });
    if(this.drags.length == 0) {
      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);
    }
  },

  activate: function(draggable) {
    if(draggable.options.delay) {
      this._timeout = setTimeout(function() {
        Draggables._timeout = null;
        window.focus();
        Draggables.activeDraggable = draggable;
      }.bind(this), draggable.options.delay);
    } else {
      window.focus(); // allows keypress events if window isn't currently focused, fails for Safari
      this.activeDraggable = draggable;
    }
  },

  deactivate: function() {
    this.activeDraggable = null;
  },

  updateDrag: function(event) {
    if(!this.activeDraggable) return;
    var pointer = [Event.pointerX(event), Event.pointerY(event)];
    // Mozilla-based browsers fire successive mousemove events with
    // the same coordinates, prevent needless redrawing (moz bug?)
    if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) return;
    this._lastPointer = pointer;

    this.activeDraggable.updateDrag(event, pointer);
  },

  endDrag: function(event) {
    if(this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    if(!this.activeDraggable) return;
    this._lastPointer = null;
    this.activeDraggable.endDrag(event);
    this.activeDraggable = null;
  },

  keyPress: function(event) {
    if(this.activeDraggable)
      this.activeDraggable.keyPress(event);
  },

  addObserver: function(observer) {
    this.observers.push(observer);
    this._cacheObserverCallbacks();
  },

  removeObserver: function(element) {  // element instead of observer fixes mem leaks
    this.observers = this.observers.reject( function(o) { return o.element==element });
    this._cacheObserverCallbacks();
  },

  notify: function(eventName, draggable, event) {  // 'onStart', 'onEnd', 'onDrag'
    if(this[eventName+'Count'] > 0)
      this.observers.each( function(o) {
        if(o[eventName]) o[eventName](eventName, draggable, event);
      });
    if(draggable.options[eventName]) draggable.options[eventName](draggable, event);
  },

  _cacheObserverCallbacks: function() {
    ['onStart','onEnd','onDrag'].each( function(eventName) {
      Draggables[eventName+'Count'] = Draggables.observers.select(
        function(o) { return o[eventName]; }
      ).length;
    });
  }
};

/*--------------------------------------------------------------------------*/

var Draggable = Class.create({
  initialize: function(element) {
    var defaults = {
      handle: false,
      reverteffect: function(element, top_offset, left_offset) {
        var dur = Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;
        new Effect.Move(element, { x: -left_offset, y: -top_offset, duration: dur,
          queue: {scope:'_draggable', position:'end'}
        });
      },
      endeffect: function(element) {
        var toOpacity = Object.isNumber(element._opacity) ? element._opacity : 1.0;
        new Effect.Opacity(element, {duration:0.2, from:0.7, to:toOpacity,
          queue: {scope:'_draggable', position:'end'},
          afterFinish: function(){
            Draggable._dragging[element] = false
          }
        });
      },
      zindex: 1000,
      revert: false,
      quiet: false,
      scroll: false,
      scrollSensitivity: 20,
      scrollSpeed: 15,
      snap: false,  // false, or xy or [x,y] or function(x,y){ return [x,y] }
      delay: 0
    };

    if(!arguments[1] || Object.isUndefined(arguments[1].endeffect))
      Object.extend(defaults, {
        starteffect: function(element) {
          element._opacity = Element.getOpacity(element);
          Draggable._dragging[element] = true;
          new Effect.Opacity(element, {duration:0.2, from:element._opacity, to:0.7});
        }
      });

    var options = Object.extend(defaults, arguments[1] || { });

    this.element = $(element);

    if(options.handle && Object.isString(options.handle))
      this.handle = this.element.down('.'+options.handle, 0);

    if(!this.handle) this.handle = $(options.handle);
    if(!this.handle) this.handle = this.element;

    if(options.scroll && !options.scroll.scrollTo && !options.scroll.outerHTML) {
      options.scroll = $(options.scroll);
      this._isScrollChild = Element.childOf(this.element, options.scroll);
    }

    Element.makePositioned(this.element); // fix IE

    this.options  = options;
    this.dragging = false;

    this.eventMouseDown = this.initDrag.bindAsEventListener(this);
    Event.observe(this.handle, "mousedown", this.eventMouseDown);

    Draggables.register(this);
  },

  destroy: function() {
    Event.stopObserving(this.handle, "mousedown", this.eventMouseDown);
    Draggables.unregister(this);
  },

  currentDelta: function() {
    return([
      parseInt(Element.getStyle(this.element,'left') || '0'),
      parseInt(Element.getStyle(this.element,'top') || '0')]);
  },

  initDrag: function(event) {
    if(!Object.isUndefined(Draggable._dragging[this.element]) &&
      Draggable._dragging[this.element]) return;
    if(Event.isLeftClick(event)) {
      // abort on form elements, fixes a Firefox issue
      var src = Event.element(event);
      if((tag_name = src.tagName.toUpperCase()) && (
        tag_name=='INPUT' ||
        tag_name=='SELECT' ||
        tag_name=='OPTION' ||
        tag_name=='BUTTON' ||
        tag_name=='TEXTAREA')) return;

      var pointer = [Event.pointerX(event), Event.pointerY(event)];
      var pos     = this.element.cumulativeOffset();
      this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]) });

      Draggables.activate(this);
      Event.stop(event);
    }
  },

  startDrag: function(event) {
    this.dragging = true;
    if(!this.delta)
      this.delta = this.currentDelta();

    if(this.options.zindex) {
      this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
      this.element.style.zIndex = this.options.zindex;
    }

    if(this.options.ghosting) {
      this._clone = this.element.cloneNode(true);
      this._originallyAbsolute = (this.element.getStyle('position') == 'absolute');
      if (!this._originallyAbsolute)
        Position.absolutize(this.element);
      this.element.parentNode.insertBefore(this._clone, this.element);
    }

    if(this.options.scroll) {
      if (this.options.scroll == window) {
        var where = this._getWindowScroll(this.options.scroll);
        this.originalScrollLeft = where.left;
        this.originalScrollTop = where.top;
      } else {
        this.originalScrollLeft = this.options.scroll.scrollLeft;
        this.originalScrollTop = this.options.scroll.scrollTop;
      }
    }

    Draggables.notify('onStart', this, event);

    if(this.options.starteffect) this.options.starteffect(this.element);
  },

  updateDrag: function(event, pointer) {
    if(!this.dragging) this.startDrag(event);

    if(!this.options.quiet){
      Position.prepare();
      Droppables.show(pointer, this.element);
    }

    Draggables.notify('onDrag', this, event);

    this.draw(pointer);
    if(this.options.change) this.options.change(this);

    if(this.options.scroll) {
      this.stopScrolling();

      var p;
      if (this.options.scroll == window) {
        with(this._getWindowScroll(this.options.scroll)) { p = [ left, top, left+width, top+height ]; }
      } else {
        p = Position.page(this.options.scroll);
        p[0] += this.options.scroll.scrollLeft + Position.deltaX;
        p[1] += this.options.scroll.scrollTop + Position.deltaY;
        p.push(p[0]+this.options.scroll.offsetWidth);
        p.push(p[1]+this.options.scroll.offsetHeight);
      }
      var speed = [0,0];
      if(pointer[0] < (p[0]+this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[0]+this.options.scrollSensitivity);
      if(pointer[1] < (p[1]+this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[1]+this.options.scrollSensitivity);
      if(pointer[0] > (p[2]-this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[2]-this.options.scrollSensitivity);
      if(pointer[1] > (p[3]-this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[3]-this.options.scrollSensitivity);
      this.startScrolling(speed);
    }

    // fix AppleWebKit rendering
    if(Prototype.Browser.WebKit) window.scrollBy(0,0);

    Event.stop(event);
  },

  finishDrag: function(event, success) {
    this.dragging = false;

    if(this.options.quiet){
      Position.prepare();
      var pointer = [Event.pointerX(event), Event.pointerY(event)];
      Droppables.show(pointer, this.element);
    }

    if(this.options.ghosting) {
      if (!this._originallyAbsolute)
        Position.relativize(this.element);
      delete this._originallyAbsolute;
      Element.remove(this._clone);
      this._clone = null;
    }

    var dropped = false;
    if(success) {
      dropped = Droppables.fire(event, this.element);
      if (!dropped) dropped = false;
    }
    if(dropped && this.options.onDropped) this.options.onDropped(this.element);
    Draggables.notify('onEnd', this, event);

    var revert = this.options.revert;
    if(revert && Object.isFunction(revert)) revert = revert(this.element);

    var d = this.currentDelta();
    if(revert && this.options.reverteffect) {
      if (dropped == 0 || revert != 'failure')
        this.options.reverteffect(this.element,
          d[1]-this.delta[1], d[0]-this.delta[0]);
    } else {
      this.delta = d;
    }

    if(this.options.zindex)
      this.element.style.zIndex = this.originalZ;

    if(this.options.endeffect)
      this.options.endeffect(this.element);

    Draggables.deactivate(this);
    Droppables.reset();
  },

  keyPress: function(event) {
    if(event.keyCode!=Event.KEY_ESC) return;
    this.finishDrag(event, false);
    Event.stop(event);
  },

  endDrag: function(event) {
    if(!this.dragging) return;
    this.stopScrolling();
    this.finishDrag(event, true);
    Event.stop(event);
  },

  draw: function(point) {
    var pos = this.element.cumulativeOffset();
    if(this.options.ghosting) {
      var r   = Position.realOffset(this.element);
      pos[0] += r[0] - Position.deltaX; pos[1] += r[1] - Position.deltaY;
    }

    var d = this.currentDelta();
    pos[0] -= d[0]; pos[1] -= d[1];

    if(this.options.scroll && (this.options.scroll != window && this._isScrollChild)) {
      pos[0] -= this.options.scroll.scrollLeft-this.originalScrollLeft;
      pos[1] -= this.options.scroll.scrollTop-this.originalScrollTop;
    }

    var p = [0,1].map(function(i){
      return (point[i]-pos[i]-this.offset[i])
    }.bind(this));

    if(this.options.snap) {
      if(Object.isFunction(this.options.snap)) {
        p = this.options.snap(p[0],p[1],this);
      } else {
      if(Object.isArray(this.options.snap)) {
        p = p.map( function(v, i) {
          return (v/this.options.snap[i]).round()*this.options.snap[i] }.bind(this));
      } else {
        p = p.map( function(v) {
          return (v/this.options.snap).round()*this.options.snap }.bind(this));
      }
    }}

    var style = this.element.style;
    if((!this.options.constraint) || (this.options.constraint=='horizontal'))
      style.left = p[0] + "px";
    if((!this.options.constraint) || (this.options.constraint=='vertical'))
      style.top  = p[1] + "px";

    if(style.visibility=="hidden") style.visibility = ""; // fix gecko rendering
  },

  stopScrolling: function() {
    if(this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
      Draggables._lastScrollPointer = null;
    }
  },

  startScrolling: function(speed) {
    if(!(speed[0] || speed[1])) return;
    this.scrollSpeed = [speed[0]*this.options.scrollSpeed,speed[1]*this.options.scrollSpeed];
    this.lastScrolled = new Date();
    this.scrollInterval = setInterval(this.scroll.bind(this), 10);
  },

  scroll: function() {
    var current = new Date();
    var delta = current - this.lastScrolled;
    this.lastScrolled = current;
    if(this.options.scroll == window) {
      with (this._getWindowScroll(this.options.scroll)) {
        if (this.scrollSpeed[0] || this.scrollSpeed[1]) {
          var d = delta / 1000;
          this.options.scroll.scrollTo( left + d*this.scrollSpeed[0], top + d*this.scrollSpeed[1] );
        }
      }
    } else {
      this.options.scroll.scrollLeft += this.scrollSpeed[0] * delta / 1000;
      this.options.scroll.scrollTop  += this.scrollSpeed[1] * delta / 1000;
    }

    Position.prepare();
    Droppables.show(Draggables._lastPointer, this.element);
    Draggables.notify('onDrag', this);
    if (this._isScrollChild) {
      Draggables._lastScrollPointer = Draggables._lastScrollPointer || $A(Draggables._lastPointer);
      Draggables._lastScrollPointer[0] += this.scrollSpeed[0] * delta / 1000;
      Draggables._lastScrollPointer[1] += this.scrollSpeed[1] * delta / 1000;
      if (Draggables._lastScrollPointer[0] < 0)
        Draggables._lastScrollPointer[0] = 0;
      if (Draggables._lastScrollPointer[1] < 0)
        Draggables._lastScrollPointer[1] = 0;
      this.draw(Draggables._lastScrollPointer);
    }

    if(this.options.change) this.options.change(this);
  },

  _getWindowScroll: function(w) {
    var T, L, W, H;
    with (w.document) {
      if (w.document.documentElement && documentElement.scrollTop) {
        T = documentElement.scrollTop;
        L = documentElement.scrollLeft;
      } else if (w.document.body) {
        T = body.scrollTop;
        L = body.scrollLeft;
      }
      if (w.innerWidth) {
        W = w.innerWidth;
        H = w.innerHeight;
      } else if (w.document.documentElement && documentElement.clientWidth) {
        W = documentElement.clientWidth;
        H = documentElement.clientHeight;
      } else {
        W = body.offsetWidth;
        H = body.offsetHeight;
      }
    }
    return { top: T, left: L, width: W, height: H };
  }
});

Draggable._dragging = { };

/*--------------------------------------------------------------------------*/

var SortableObserver = Class.create({
  initialize: function(element, observer) {
    this.element   = $(element);
    this.observer  = observer;
    this.lastValue = Sortable.serialize(this.element);
  },

  onStart: function() {
    this.lastValue = Sortable.serialize(this.element);
  },

  onEnd: function() {
    Sortable.unmark();
    if(this.lastValue != Sortable.serialize(this.element))
      this.observer(this.element)
  }
});

var Sortable = {
  SERIALIZE_RULE: /^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,

  sortables: { },

  _findRootElement: function(element) {
    while (element.tagName.toUpperCase() != "BODY") {
      if(element.id && Sortable.sortables[element.id]) return element;
      element = element.parentNode;
    }
  },

  options: function(element) {
    element = Sortable._findRootElement($(element));
    if(!element) return;
    return Sortable.sortables[element.id];
  },

  destroy: function(element){
    element = $(element);
    var s = Sortable.sortables[element.id];

    if(s) {
      Draggables.removeObserver(s.element);
      s.droppables.each(function(d){ Droppables.remove(d) });
      s.draggables.invoke('destroy');

      delete Sortable.sortables[s.element.id];
    }
  },

  create: function(element) {
    element = $(element);
    var options = Object.extend({
      element:     element,
      tag:         'li',       // assumes li children, override with tag: 'tagname'
      dropOnEmpty: false,
      tree:        false,
      treeTag:     'ul',
      overlap:     'vertical', // one of 'vertical', 'horizontal'
      constraint:  'vertical', // one of 'vertical', 'horizontal', false
      containment: element,    // also takes array of elements (or id's); or false
      handle:      false,      // or a CSS class
      only:        false,
      delay:       0,
      hoverclass:  null,
      ghosting:    false,
      quiet:       false,
      scroll:      false,
      scrollSensitivity: 20,
      scrollSpeed: 15,
      format:      this.SERIALIZE_RULE,

      // these take arrays of elements or ids and can be
      // used for better initialization performance
      elements:    false,
      handles:     false,

      onChange:    Prototype.emptyFunction,
      onUpdate:    Prototype.emptyFunction
    }, arguments[1] || { });

    // clear any old sortable with same element
    this.destroy(element);

    // build options for the draggables
    var options_for_draggable = {
      revert:      true,
      quiet:       options.quiet,
      scroll:      options.scroll,
      scrollSpeed: options.scrollSpeed,
      scrollSensitivity: options.scrollSensitivity,
      delay:       options.delay,
      ghosting:    options.ghosting,
      constraint:  options.constraint,
      handle:      options.handle };

    if(options.starteffect)
      options_for_draggable.starteffect = options.starteffect;

    if(options.reverteffect)
      options_for_draggable.reverteffect = options.reverteffect;
    else
      if(options.ghosting) options_for_draggable.reverteffect = function(element) {
        element.style.top  = 0;
        element.style.left = 0;
      };

    if(options.endeffect)
      options_for_draggable.endeffect = options.endeffect;

    if(options.zindex)
      options_for_draggable.zindex = options.zindex;

    // build options for the droppables
    var options_for_droppable = {
      overlap:     options.overlap,
      containment: options.containment,
      tree:        options.tree,
      hoverclass:  options.hoverclass,
      onHover:     Sortable.onHover
    };

    var options_for_tree = {
      onHover:      Sortable.onEmptyHover,
      overlap:      options.overlap,
      containment:  options.containment,
      hoverclass:   options.hoverclass
    };

    // fix for gecko engine
    Element.cleanWhitespace(element);

    options.draggables = [];
    options.droppables = [];

    // drop on empty handling
    if(options.dropOnEmpty || options.tree) {
      Droppables.add(element, options_for_tree);
      options.droppables.push(element);
    }

    (options.elements || this.findElements(element, options) || []).each( function(e,i) {
      var handle = options.handles ? $(options.handles[i]) :
        (options.handle ? $(e).select('.' + options.handle)[0] : e);
      options.draggables.push(
        new Draggable(e, Object.extend(options_for_draggable, { handle: handle })));
      Droppables.add(e, options_for_droppable);
      if(options.tree) e.treeNode = element;
      options.droppables.push(e);
    });

    if(options.tree) {
      (Sortable.findTreeElements(element, options) || []).each( function(e) {
        Droppables.add(e, options_for_tree);
        e.treeNode = element;
        options.droppables.push(e);
      });
    }

    // keep reference
    this.sortables[element.identify()] = options;

    // for onupdate
    Draggables.addObserver(new SortableObserver(element, options.onUpdate));

  },

  // return all suitable-for-sortable elements in a guaranteed order
  findElements: function(element, options) {
    return Element.findChildren(
      element, options.only, options.tree ? true : false, options.tag);
  },

  findTreeElements: function(element, options) {
    return Element.findChildren(
      element, options.only, options.tree ? true : false, options.treeTag);
  },

  onHover: function(element, dropon, overlap) {
    if(Element.isParent(dropon, element)) return;

    if(overlap > .33 && overlap < .66 && Sortable.options(dropon).tree) {
      return;
    } else if(overlap>0.5) {
      Sortable.mark(dropon, 'before');
      if(dropon.previousSibling != element) {
        var oldParentNode = element.parentNode;
        element.style.visibility = "hidden"; // fix gecko rendering
        dropon.parentNode.insertBefore(element, dropon);
        if(dropon.parentNode!=oldParentNode)
          Sortable.options(oldParentNode).onChange(element);
        Sortable.options(dropon.parentNode).onChange(element);
      }
    } else {
      Sortable.mark(dropon, 'after');
      var nextElement = dropon.nextSibling || null;
      if(nextElement != element) {
        var oldParentNode = element.parentNode;
        element.style.visibility = "hidden"; // fix gecko rendering
        dropon.parentNode.insertBefore(element, nextElement);
        if(dropon.parentNode!=oldParentNode)
          Sortable.options(oldParentNode).onChange(element);
        Sortable.options(dropon.parentNode).onChange(element);
      }
    }
  },

  onEmptyHover: function(element, dropon, overlap) {
    var oldParentNode = element.parentNode;
    var droponOptions = Sortable.options(dropon);

    if(!Element.isParent(dropon, element)) {
      var index;

      var children = Sortable.findElements(dropon, {tag: droponOptions.tag, only: droponOptions.only});
      var child = null;

      if(children) {
        var offset = Element.offsetSize(dropon, droponOptions.overlap) * (1.0 - overlap);

        for (index = 0; index < children.length; index += 1) {
          if (offset - Element.offsetSize (children[index], droponOptions.overlap) >= 0) {
            offset -= Element.offsetSize (children[index], droponOptions.overlap);
          } else if (offset - (Element.offsetSize (children[index], droponOptions.overlap) / 2) >= 0) {
            child = index + 1 < children.length ? children[index + 1] : null;
            break;
          } else {
            child = children[index];
            break;
          }
        }
      }

      dropon.insertBefore(element, child);

      Sortable.options(oldParentNode).onChange(element);
      droponOptions.onChange(element);
    }
  },

  unmark: function() {
    if(Sortable._marker) Sortable._marker.hide();
  },

  mark: function(dropon, position) {
    // mark on ghosting only
    var sortable = Sortable.options(dropon.parentNode);
    if(sortable && !sortable.ghosting) return;

    if(!Sortable._marker) {
      Sortable._marker =
        ($('dropmarker') || Element.extend(document.createElement('DIV'))).
          hide().addClassName('dropmarker').setStyle({position:'absolute'});
      document.getElementsByTagName("body").item(0).appendChild(Sortable._marker);
    }
    var offsets = dropon.cumulativeOffset();
    Sortable._marker.setStyle({left: offsets[0]+'px', top: offsets[1] + 'px'});

    if(position=='after')
      if(sortable.overlap == 'horizontal')
        Sortable._marker.setStyle({left: (offsets[0]+dropon.clientWidth) + 'px'});
      else
        Sortable._marker.setStyle({top: (offsets[1]+dropon.clientHeight) + 'px'});

    Sortable._marker.show();
  },

  _tree: function(element, options, parent) {
    var children = Sortable.findElements(element, options) || [];

    for (var i = 0; i < children.length; ++i) {
      var match = children[i].id.match(options.format);

      if (!match) continue;

      var child = {
        id: encodeURIComponent(match ? match[1] : null),
        element: element,
        parent: parent,
        children: [],
        position: parent.children.length,
        container: $(children[i]).down(options.treeTag)
      };

      /* Get the element containing the children and recurse over it */
      if (child.container)
        this._tree(child.container, options, child);

      parent.children.push (child);
    }

    return parent;
  },

  tree: function(element) {
    element = $(element);
    var sortableOptions = this.options(element);
    var options = Object.extend({
      tag: sortableOptions.tag,
      treeTag: sortableOptions.treeTag,
      only: sortableOptions.only,
      name: element.id,
      format: sortableOptions.format
    }, arguments[1] || { });

    var root = {
      id: null,
      parent: null,
      children: [],
      container: element,
      position: 0
    };

    return Sortable._tree(element, options, root);
  },

  /* Construct a [i] index for a particular node */
  _constructIndex: function(node) {
    var index = '';
    do {
      if (node.id) index = '[' + node.position + ']' + index;
    } while ((node = node.parent) != null);
    return index;
  },

  sequence: function(element) {
    element = $(element);
    var options = Object.extend(this.options(element), arguments[1] || { });

    return $(this.findElements(element, options) || []).map( function(item) {
      return item.id.match(options.format) ? item.id.match(options.format)[1] : '';
    });
  },

  setSequence: function(element, new_sequence) {
    element = $(element);
    var options = Object.extend(this.options(element), arguments[2] || { });

    var nodeMap = { };
    this.findElements(element, options).each( function(n) {
        if (n.id.match(options.format))
            nodeMap[n.id.match(options.format)[1]] = [n, n.parentNode];
        n.parentNode.removeChild(n);
    });

    new_sequence.each(function(ident) {
      var n = nodeMap[ident];
      if (n) {
        n[1].appendChild(n[0]);
        delete nodeMap[ident];
      }
    });
  },

  serialize: function(element) {
    element = $(element);
    var options = Object.extend(Sortable.options(element), arguments[1] || { });
    var name = encodeURIComponent(
      (arguments[1] && arguments[1].name) ? arguments[1].name : element.id);

    if (options.tree) {
      return Sortable.tree(element, arguments[1]).children.map( function (item) {
        return [name + Sortable._constructIndex(item) + "[id]=" +
                encodeURIComponent(item.id)].concat(item.children.map(arguments.callee));
      }).flatten().join('&');
    } else {
      return Sortable.sequence(element, arguments[1]).map( function(item) {
        return name + "[]=" + encodeURIComponent(item);
      }).join('&');
    }
  }
};

// Returns true if child is contained within element
Element.isParent = function(child, element) {
  if (!child.parentNode || child == element) return false;
  if (child.parentNode == element) return true;
  return Element.isParent(child.parentNode, element);
};

Element.findChildren = function(element, only, recursive, tagName) {
  if(!element.hasChildNodes()) return null;
  tagName = tagName.toUpperCase();
  if(only) only = [only].flatten();
  var elements = [];
  $A(element.childNodes).each( function(e) {
    if(e.tagName && e.tagName.toUpperCase()==tagName &&
      (!only || (Element.classNames(e).detect(function(v) { return only.include(v) }))))
        elements.push(e);
    if(recursive) {
      var grandchildren = Element.findChildren(e, only, recursive, tagName);
      if(grandchildren) elements.push(grandchildren);
    }
  });

  return (elements.length>0 ? elements.flatten() : []);
};

Element.offsetSize = function (element, type) {
  return element['offset' + ((type=='vertical' || type=='height') ? 'Height' : 'Width')];
};


// FROM: /javascripts/lightbox.js?1288225651
/**
* Lightbox
*
* This libary is used to create a lightbox in a web application.  This library
* requires the Prototype 1.6 library and Script.aculo.us core, effects, and dragdrop
* libraries.  To use, add a div containing the content to be displayed anywhere on 
* the page.  To create the lightbox, add the following code:
*
*	var test;
*	
*	Event.observe(window, 'load', function () {
*		test = new Lightbox('idOfMyDiv');
*	});
*	
*	Event.observe('lightboxLink', 'click', function () {
*		test.open();
*	});
*
*	Event.observe('closeLink', 'click', function () {
*		test.close();
*	});
*     
*/

var Lightbox = Class.create({
	open : function () {
		this._centerWindow(this.container);
		this._fade('open', this.container);
	},
	
	close : function () {
		this._fade('close', this.container);
	},
	
	_fade : function fadeBg(userAction,whichDiv){
		if(userAction=='close'){
			new Effect.Opacity('bg_fade',
					   {duration:.5,
					    from:0.5,
					    to:0,
					    afterFinish:this._makeInvisible,
					    afterUpdate:this._hideLayer(whichDiv)});
		}else{
			new Effect.Opacity('bg_fade',
					   {duration:.5,
					    from:0,
					    to:0.5,
					    beforeUpdate:this._makeVisible,
					    afterFinish:this._showLayer(whichDiv)});
		}
	},
	
	_makeVisible : function makeVisible(){
		$("bg_fade").style.visibility="visible";
	},

	_makeInvisible : function makeInvisible(){
		$("bg_fade").style.visibility="hidden";
	},

	_showLayer : function showLayer(userAction){
		$(userAction).style.display="block";
	},
	
	_hideLayer : function hideLayer(userAction){
		$(userAction).style.display="none";
	},
	
	_centerWindow : function centerWindow(element) {
		var windowHeight = parseFloat($(element).getHeight())/2; 
		var windowWidth = parseFloat($(element).getWidth())/2;

		if(typeof window.innerHeight != 'undefined') {
			$(element).style.top = Math.round(document.body.offsetTop + ((window.innerHeight - $(element).getHeight()))/2)+'px';
			$(element).style.left = Math.round(document.body.offsetLeft + ((window.innerWidth - $(element).getWidth()))/2)+'px';
		} else {
			$(element).style.top = Math.round(document.body.offsetTop + ((document.documentElement.offsetHeight - $(element).getHeight()))/2)+'px';
			$(element).style.left = Math.round(document.body.offsetLeft + ((document.documentElement.offsetWidth - $(element).getWidth()))/2)+'px';
		}
	},
	
	initialize : function(containerDiv) {
		this.container = containerDiv;
		if($('bg_fade') == null) {
			var screen = new Element('div', {'id': 'bg_fade'});
			document.body.appendChild(screen);
		}
		new Draggable(this.container);
		this._hideLayer(this.container);
	}
});




// FROM: /javascripts/javascript.js?1288225651
CodeHighlighter.addStyle("javascript",{
	comment : {
		exp  : /(\/\/[^\n]*\n?)|(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)/
	},
	brackets : {
		exp  : /\(|\)/
	},
	string : {
		exp  : /'[^']*'|"[^"]*"/
	},
	keywords : {
		exp  : /\b(arguments|break|case|continue|default|delete|do|else|false|for|function|if|in|instanceof|new|null|return|switch|this|true|typeof|var|void|while|with)\b/
	},
	global : {
		exp  : /\b(toString|valueOf|window|element|prototype|constructor|document|escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|NaN|isNaN|Infinity)\b/
	},
       erb : {
               exp : /&lt;%=(.+)%&gt;/
       }
});


// FROM: /javascripts/html.js?1288225651
CodeHighlighter.addStyle("html", {
	comment : {
		exp: /&lt;!\s*(--([^-]|[\r\n]|-[^-])*--\s*)&gt;/
	},
	tag : {
		exp: /(&lt;\/?)([a-zA-Z]+\s?)/, 
		replacement: "$1<span class=\"$0\">$2</span>"
	},
	string : {
		exp  : /'[^']*'|"[^"]*"/
	},
	attribute : {
		exp: /\b([a-zA-Z-:]+)(=)/, 
		replacement: "<span class=\"$0\">$1</span>$2"
	},
	doctype : {
		exp: /&lt;!DOCTYPE([^&]|&[^g]|&g[^t])*&gt;/
	}
});


// FROM: /javascripts/window.js?1288225651
// Copyright (c) 2006 Sébastien Gruhier (http://xilinus.com, http://itseb.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// VERSION 1.3

var Window = Class.create();

Window.keepMultiModalWindow = false;
Window.hasEffectLib = (typeof Effect != 'undefined');
Window.resizeEffectDuration = 0.4;

Window.prototype = {
  // Constructor
  // Available parameters : className, blurClassName, title, minWidth, minHeight, maxWidth, maxHeight, width, height, top, left, bottom, right, resizable, zIndex, opacity, recenterAuto, wiredDrag
  //                        hideEffect, showEffect, showEffectOptions, hideEffectOptions, effectOptions, url, draggable, closable, minimizable, maximizable, parent, onload
  //                        add all callbacks (if you do not use an observer)
  //                        onDestroy onStartResize onStartMove onResize onMove onEndResize onEndMove onFocus onBlur onBeforeShow onShow onHide onMinimize onMaximize onClose
  
  initialize: function() {
    var id;
    var optionIndex = 0;
    // For backward compatibility like win= new Window("id", {...}) instead of win = new Window({id: "id", ...})
    if (arguments.length > 0) {
      if (typeof arguments[0] == "string" ) {
        id = arguments[0];
        optionIndex = 1;
      }
      else
        id = arguments[0] ? arguments[0].id : null;
    }
    
    // Generate unique ID if not specified
    if (!id)
      id = "window_" + new Date().getTime();
      
    if ($(id))
      alert("Window " + id + " is already registered in the DOM! Make sure you use setDestroyOnClose() or destroyOnClose: true in the constructor");

    this.options = Object.extend({
      className:         "dialog",
      blurClassName:     null,
      minWidth:          100, 
      minHeight:         20,
      resizable:         true,
      closable:          true,
      minimizable:       true,
      maximizable:       true,
      draggable:         true,
      userData:          null,
      showEffect:        (Window.hasEffectLib ? Effect.Appear : Element.show),
      hideEffect:        (Window.hasEffectLib ? Effect.Fade : Element.hide),
      showEffectOptions: {},
      hideEffectOptions: {},
      effectOptions:     null,
      parent:            document.body,
      title:             "&nbsp;",
      url:               null,
      onload:            Prototype.emptyFunction,
      width:             200,
      height:            300,
      opacity:           1,
      recenterAuto:      true,
      wiredDrag:         false,
      closeCallback:     null,
      destroyOnClose:    false,
      gridX:             1, 
      gridY:             1      
    }, arguments[optionIndex] || {});
    if (this.options.blurClassName)
      this.options.focusClassName = this.options.className;
      
    if (typeof this.options.top == "undefined" &&  typeof this.options.bottom ==  "undefined") 
      this.options.top = this._round(Math.random()*500, this.options.gridY);
    if (typeof this.options.left == "undefined" &&  typeof this.options.right ==  "undefined") 
      this.options.left = this._round(Math.random()*500, this.options.gridX);

    if (this.options.effectOptions) {
      Object.extend(this.options.hideEffectOptions, this.options.effectOptions);
      Object.extend(this.options.showEffectOptions, this.options.effectOptions);
      if (this.options.showEffect == Element.Appear)
        this.options.showEffectOptions.to = this.options.opacity;
    }
    if (Window.hasEffectLib) {
      if (this.options.showEffect == Effect.Appear)
        this.options.showEffectOptions.to = this.options.opacity;
    
      if (this.options.hideEffect == Effect.Fade)
        this.options.hideEffectOptions.from = this.options.opacity;
    }
    if (this.options.hideEffect == Element.hide)
      this.options.hideEffect = function(){ Element.hide(this.element); if (this.options.destroyOnClose) this.destroy(); }.bind(this)
    
    if (this.options.parent != document.body)  
      this.options.parent = $(this.options.parent);
      
    this.element = this._createWindow(id);       
    this.element.win = this;
    
    // Bind event listener
    this.eventMouseDown = this._initDrag.bindAsEventListener(this);
    this.eventMouseUp   = this._endDrag.bindAsEventListener(this);
    this.eventMouseMove = this._updateDrag.bindAsEventListener(this);
    this.eventOnLoad    = this._getWindowBorderSize.bindAsEventListener(this);
    this.eventMouseDownContent = this.toFront.bindAsEventListener(this);
    this.eventResize = this._recenter.bindAsEventListener(this);
 
    this.topbar = $(this.element.id + "_top");
    this.bottombar = $(this.element.id + "_bottom");
    this.content = $(this.element.id + "_content");
    
    Event.observe(this.topbar, "mousedown", this.eventMouseDown);
    Event.observe(this.bottombar, "mousedown", this.eventMouseDown);
    Event.observe(this.content, "mousedown", this.eventMouseDownContent);
    Event.observe(window, "load", this.eventOnLoad);
    Event.observe(window, "resize", this.eventResize);
    Event.observe(window, "scroll", this.eventResize);
    Event.observe(this.options.parent, "scroll", this.eventResize);
    
    if (this.options.draggable)  {
      var that = this;
      [this.topbar, this.topbar.up().previous(), this.topbar.up().next()].each(function(element) {
        element.observe("mousedown", that.eventMouseDown);
        element.addClassName("top_draggable");
      });
      [this.bottombar.up(), this.bottombar.up().previous(), this.bottombar.up().next()].each(function(element) {
        element.observe("mousedown", that.eventMouseDown);
        element.addClassName("bottom_draggable");
      });
      
    }    
    
    if (this.options.resizable) {
      this.sizer = $(this.element.id + "_sizer");
      Event.observe(this.sizer, "mousedown", this.eventMouseDown);
    }  
    
    this.useLeft = null;
    this.useTop = null;
    if (typeof this.options.left != "undefined") {
      this.element.setStyle({left: parseFloat(this.options.left) + 'px'});
      this.useLeft = true;
    }
    else {
      this.element.setStyle({right: parseFloat(this.options.right) + 'px'});
      this.useLeft = false;
    }
    
    if (typeof this.options.top != "undefined") {
      this.element.setStyle({top: parseFloat(this.options.top) + 'px'});
      this.useTop = true;
    }
    else {
      this.element.setStyle({bottom: parseFloat(this.options.bottom) + 'px'});      
      this.useTop = false;
    }
      
    this.storedLocation = null;
    
    this.setOpacity(this.options.opacity);
    if (this.options.zIndex)
      this.setZIndex(this.options.zIndex)

    if (this.options.destroyOnClose)
      this.setDestroyOnClose(true);

    this._getWindowBorderSize();
    this.width = this.options.width;
    this.height = this.options.height;
    this.visible = false;
    
    this.constraint = false;
    this.constraintPad = {top: 0, left:0, bottom:0, right:0};
    
    if (this.width && this.height)
      this.setSize(this.options.width, this.options.height);
    this.setTitle(this.options.title)
    Windows.register(this);      
  },
  
  // Destructor
  destroy: function() {
    this._notify("onDestroy");
    Event.stopObserving(this.topbar, "mousedown", this.eventMouseDown);
    Event.stopObserving(this.bottombar, "mousedown", this.eventMouseDown);
    Event.stopObserving(this.content, "mousedown", this.eventMouseDownContent);
    
    Event.stopObserving(window, "load", this.eventOnLoad);
    Event.stopObserving(window, "resize", this.eventResize);
    Event.stopObserving(window, "scroll", this.eventResize);
    
    Event.stopObserving(this.content, "load", this.options.onload);

    if (this._oldParent) {
      var content = this.getContent();
      var originalContent = null;
      for(var i = 0; i < content.childNodes.length; i++) {
        originalContent = content.childNodes[i];
        if (originalContent.nodeType == 1) 
          break;
        originalContent = null;
      }
      if (originalContent)
        this._oldParent.appendChild(originalContent);
      this._oldParent = null;
    }

    if (this.sizer)
        Event.stopObserving(this.sizer, "mousedown", this.eventMouseDown);

    if (this.options.url) 
      this.content.src = null

     if(this.iefix) 
      Element.remove(this.iefix);

    Element.remove(this.element);
    Windows.unregister(this);      
  },
    
  // Sets close callback, if it sets, it should return true to be able to close the window.
  setCloseCallback: function(callback) {
    this.options.closeCallback = callback;
  },
  
  // Gets window content
  getContent: function () {
    return this.content;
  },
  
  // Sets the content with an element id
  setContent: function(id, autoresize, autoposition) {
    var element = $(id);
    if (null == element) throw "Unable to find element '" + id + "' in DOM";
    this._oldParent = element.parentNode;

    var d = null;
    var p = null;

    if (autoresize) 
      d = Element.getDimensions(element);
    if (autoposition) 
      p = Position.cumulativeOffset(element);

    var content = this.getContent();
    // Clear HTML (and even iframe)
    this.setHTMLContent("");
    content = this.getContent();
    
    content.appendChild(element);
    element.show();
    if (autoresize) 
      this.setSize(d.width, d.height);
    if (autoposition) 
      this.setLocation(p[1] - this.heightN, p[0] - this.widthW);    
  },
  
  setHTMLContent: function(html) {
    // It was an url (iframe), recreate a div content instead of iframe content
    if (this.options.url) {
      this.content.src = null;
      this.options.url = null;
      
  	  var content ="<div id=\"" + this.getId() + "_content\" class=\"" + this.options.className + "_content\"> </div>";
      $(this.getId() +"_table_content").innerHTML = content;
      
      this.content = $(this.element.id + "_content");
    }
      
    this.getContent().innerHTML = html;
  },
  
  setAjaxContent: function(url, options, showCentered, showModal) {
    this.showFunction = showCentered ? "showCenter" : "show";
    this.showModal = showModal || false;
  
    options = options || {};

    // Clear HTML (and even iframe)
    this.setHTMLContent("");
 
    this.onComplete = options.onComplete;
    if (! this._onCompleteHandler)
      this._onCompleteHandler = this._setAjaxContent.bind(this);
    options.onComplete = this._onCompleteHandler;

    new Ajax.Request(url, options);    
    options.onComplete = this.onComplete;
  },
  
  _setAjaxContent: function(originalRequest) {
    Element.update(this.getContent(), originalRequest.responseText);
    if (this.onComplete)
      this.onComplete(originalRequest);
    this.onComplete = null;
    this[this.showFunction](this.showModal)
  },
  
  setURL: function(url) {
    // Not an url content, change div to iframe
    if (this.options.url) 
      this.content.src = null;
    this.options.url = url;
    var content= "<iframe frameborder='0' name='" + this.getId() + "_content'  id='" + this.getId() + "_content' src='" + url + "' width='" + this.width + "' height='" + this.height + "'> </iframe>";
    $(this.getId() +"_table_content").innerHTML = content;
    
    this.content = $(this.element.id + "_content");
  },

  getURL: function() {
  	return this.options.url ? this.options.url : null;
  },

  refresh: function() {
    if (this.options.url)
	    $(this.element.getAttribute('id') + '_content').src = this.options.url;
  },
  
  // Stores position/size in a cookie, by default named with window id
  setCookie: function(name, expires, path, domain, secure) {
    name = name || this.element.id;
    this.cookie = [name, expires, path, domain, secure];
    
    // Get cookie
    var value = WindowUtilities.getCookie(name)
    // If exists
    if (value) {
      var values = value.split(',');
      var x = values[0].split(':');
      var y = values[1].split(':');

      var w = parseFloat(values[2]), h = parseFloat(values[3]);
      var mini = values[4];
      var maxi = values[5];

      this.setSize(w, h);
      if (mini == "true")
        this.doMinimize = true; // Minimize will be done at onload window event
      else if (maxi == "true")
        this.doMaximize = true; // Maximize will be done at onload window event

      this.useLeft = x[0] == "l";
      this.useTop = y[0] == "t";

      this.element.setStyle(this.useLeft ? {left: x[1]} : {right: x[1]});
      this.element.setStyle(this.useTop ? {top: y[1]} : {bottom: y[1]});
    }
  },
  
  // Gets window ID
  getId: function() {
    return this.element.id;
  },
  
  // Detroys itself when closing 
  setDestroyOnClose: function() {
    this.options.destroyOnClose = true;
  },
  
  setConstraint: function(bool, padding) {
    this.constraint = bool;
    this.constraintPad = Object.extend(this.constraintPad, padding || {});
    // Reset location to apply constraint
    if (this.useTop && this.useLeft)
      this.setLocation(parseFloat(this.element.style.top), parseFloat(this.element.style.left));
  },
  
  // initDrag event

  _initDrag: function(event) {
    // No resize on minimized window
    if (Event.element(event) == this.sizer && this.isMinimized())
      return;

    // No move on maximzed window
    if (Event.element(event) != this.sizer && this.isMaximized())
      return;
      
    if (Prototype.Browser.IE && this.heightN == 0)
      this._getWindowBorderSize();
    
    // Get pointer X,Y
    this.pointer = [this._round(Event.pointerX(event), this.options.gridX), this._round(Event.pointerY(event), this.options.gridY)];
    if (this.options.wiredDrag) 
      this.currentDrag = this._createWiredElement();
    else
      this.currentDrag = this.element;
      
    // Resize
    if (Event.element(event) == this.sizer) {
      this.doResize = true;
      this.widthOrg = this.width;
      this.heightOrg = this.height;
      this.bottomOrg = parseFloat(this.element.getStyle('bottom'));
      this.rightOrg = parseFloat(this.element.getStyle('right'));
      this._notify("onStartResize");
    }
    else {
      this.doResize = false;

      // Check if click on close button, 
      var closeButton = $(this.getId() + '_close');
      if (closeButton && Position.within(closeButton, this.pointer[0], this.pointer[1])) {
        this.currentDrag = null;
        return;
      }

      this.toFront();

      if (! this.options.draggable) 
        return;
      this._notify("onStartMove");
    }    
    // Register global event to capture mouseUp and mouseMove
    Event.observe(document, "mouseup", this.eventMouseUp, false);
    Event.observe(document, "mousemove", this.eventMouseMove, false);
    
    // Add an invisible div to keep catching mouse event over iframes
    WindowUtilities.disableScreen('__invisible__', '__invisible__', this.overlayOpacity);

    // Stop selection while dragging
    document.body.ondrag = function () { return false; };
    document.body.onselectstart = function () { return false; };
    
    this.currentDrag.show();
    Event.stop(event);
  },
  
  _round: function(val, round) {
    return round == 1 ? val  : val = Math.floor(val / round) * round;
  },

  // updateDrag event
  _updateDrag: function(event) {
    var pointer =  [this._round(Event.pointerX(event), this.options.gridX), this._round(Event.pointerY(event), this.options.gridY)];  
    var dx = pointer[0] - this.pointer[0];
    var dy = pointer[1] - this.pointer[1];
    
    // Resize case, update width/height
    if (this.doResize) {
      var w = this.widthOrg + dx;
      var h = this.heightOrg + dy;
      
      dx = this.width - this.widthOrg
      dy = this.height - this.heightOrg
      
      // Check if it's a right position, update it to keep upper-left corner at the same position
      if (this.useLeft) 
        w = this._updateWidthConstraint(w)
      else 
        this.currentDrag.setStyle({right: (this.rightOrg -dx) + 'px'});
      // Check if it's a bottom position, update it to keep upper-left corner at the same position
      if (this.useTop) 
        h = this._updateHeightConstraint(h)
      else
        this.currentDrag.setStyle({bottom: (this.bottomOrg -dy) + 'px'});
        
      this.setSize(w , h);
      this._notify("onResize");
    }
    // Move case, update top/left
    else {
      this.pointer = pointer;
      
      if (this.useLeft) {
        var left =  parseFloat(this.currentDrag.getStyle('left')) + dx;
        var newLeft = this._updateLeftConstraint(left);
        // Keep mouse pointer correct
        this.pointer[0] += newLeft-left;
        this.currentDrag.setStyle({left: newLeft + 'px'});
      }
      else 
        this.currentDrag.setStyle({right: parseFloat(this.currentDrag.getStyle('right')) - dx + 'px'});
      
      if (this.useTop) {
        var top =  parseFloat(this.currentDrag.getStyle('top')) + dy;
        var newTop = this._updateTopConstraint(top);
        // Keep mouse pointer correct
        this.pointer[1] += newTop - top;
        this.currentDrag.setStyle({top: newTop + 'px'});
      }
      else 
        this.currentDrag.setStyle({bottom: parseFloat(this.currentDrag.getStyle('bottom')) - dy + 'px'});

      this._notify("onMove");
    }
    if (this.iefix) 
      this._fixIEOverlapping(); 
      
    this._removeStoreLocation();
    Event.stop(event);
  },

   // endDrag callback
   _endDrag: function(event) {
    // Remove temporary div over iframes
     WindowUtilities.enableScreen('__invisible__');
    
    if (this.doResize)
      this._notify("onEndResize");
    else
      this._notify("onEndMove");
    
    // Release event observing
    Event.stopObserving(document, "mouseup", this.eventMouseUp,false);
    Event.stopObserving(document, "mousemove", this.eventMouseMove, false);

    Event.stop(event);
    
    this._hideWiredElement();

    // Store new location/size if need be
    this._saveCookie()
      
    // Restore selection
    document.body.ondrag = null;
    document.body.onselectstart = null;
  },

  _updateLeftConstraint: function(left) {
    if (this.constraint && this.useLeft && this.useTop) {
      var width = this.options.parent == document.body ? WindowUtilities.getPageSize().windowWidth : this.options.parent.getDimensions().width;

      if (left < this.constraintPad.left)
        left = this.constraintPad.left;
      if (left + this.width + this.widthE + this.widthW > width - this.constraintPad.right) 
        left = width - this.constraintPad.right - this.width - this.widthE - this.widthW;
    }
    return left;
  },
  
  _updateTopConstraint: function(top) {
    if (this.constraint && this.useLeft && this.useTop) {        
      var height = this.options.parent == document.body ? WindowUtilities.getPageSize().windowHeight : this.options.parent.getDimensions().height;
      
      var h = this.height + this.heightN + this.heightS;

      if (top < this.constraintPad.top)
        top = this.constraintPad.top;
      if (top + h > height - this.constraintPad.bottom) 
        top = height - this.constraintPad.bottom - h;
    }
    return top;
  },
  
  _updateWidthConstraint: function(w) {
    if (this.constraint && this.useLeft && this.useTop) {
      var width = this.options.parent == document.body ? WindowUtilities.getPageSize().windowWidth : this.options.parent.getDimensions().width;
      var left =  parseFloat(this.element.getStyle("left"));

      if (left + w + this.widthE + this.widthW > width - this.constraintPad.right) 
        w = width - this.constraintPad.right - left - this.widthE - this.widthW;
    }
    return w;
  },
  
  _updateHeightConstraint: function(h) {
    if (this.constraint && this.useLeft && this.useTop) {
      var height = this.options.parent == document.body ? WindowUtilities.getPageSize().windowHeight : this.options.parent.getDimensions().height;
      var top =  parseFloat(this.element.getStyle("top"));

      if (top + h + this.heightN + this.heightS > height - this.constraintPad.bottom) 
        h = height - this.constraintPad.bottom - top - this.heightN - this.heightS;
    }
    return h;
  },
  
  
  // Creates HTML window code
  _createWindow: function(id) {
    var className = this.options.className;
    var win = document.createElement("div");
    win.setAttribute('id', id);
    win.className = "dialog";

    var content;
    if (this.options.url)
      content= "<iframe frameborder=\"0\" name=\"" + id + "_content\"  id=\"" + id + "_content\" src=\"" + this.options.url + "\"> </iframe>";
    else
      content ="<div id=\"" + id + "_content\" class=\"" +className + "_content\"> </div>";

    var closeDiv = this.options.closable ? "<div class='"+ className +"_close' id='"+ id +"_close' onclick='Windows.close(\""+ id +"\", event)'> </div>" : "";
    var minDiv = this.options.minimizable ? "<div class='"+ className + "_minimize' id='"+ id +"_minimize' onclick='Windows.minimize(\""+ id +"\", event)'> </div>" : "";
    var maxDiv = this.options.maximizable ? "<div class='"+ className + "_maximize' id='"+ id +"_maximize' onclick='Windows.maximize(\""+ id +"\", event)'> </div>" : "";
    var seAttributes = this.options.resizable ? "class='" + className + "_sizer' id='" + id + "_sizer'" : "class='"  + className + "_se'";
    var blank = "../themes/default/blank.gif";
    
    win.innerHTML = closeDiv + minDiv + maxDiv + "\
      <table id='"+ id +"_row1' class=\"top table_window\">\
        <tr>\
          <td class='"+ className +"_nw'></td>\
          <td class='"+ className +"_n'><div id='"+ id +"_top' class='"+ className +"_title title_window'>"+ this.options.title +"</div></td>\
          <td class='"+ className +"_ne'></td>\
        </tr>\
      </table>\
      <table id='"+ id +"_row2' class=\"mid table_window\">\
        <tr>\
          <td class='"+ className +"_w'></td>\
            <td id='"+ id +"_table_content' class='"+ className +"_content' valign='top'>" + content + "</td>\
          <td class='"+ className +"_e'></td>\
        </tr>\
      </table>\
        <table id='"+ id +"_row3' class=\"bot table_window\">\
        <tr>\
          <td class='"+ className +"_sw'></td>\
            <td class='"+ className +"_s'><div id='"+ id +"_bottom' class='status_bar'><span style='float:left; width:1px; height:1px'></span></div></td>\
            <td " + seAttributes + "></td>\
        </tr>\
      </table>\
    ";
    Element.hide(win);
    this.options.parent.insertBefore(win, this.options.parent.firstChild);
    Event.observe($(id + "_content"), "load", this.options.onload);
    return win;
  },
  
  
  changeClassName: function(newClassName) {    
    var className = this.options.className;
    var id = this.getId();
    $A(["_close", "_minimize", "_maximize", "_sizer", "_content"]).each(function(value) { this._toggleClassName($(id + value), className + value, newClassName + value) }.bind(this));
    this._toggleClassName($(id + "_top"), className + "_title", newClassName + "_title");
    $$("#" + id + " td").each(function(td) {td.className = td.className.sub(className,newClassName); });
    this.options.className = newClassName;
  },
  
  _toggleClassName: function(element, oldClassName, newClassName) { 
    if (element) {
      element.removeClassName(oldClassName);
      element.addClassName(newClassName);
    }
  },
  
  // Sets window location
  setLocation: function(top, left) {
    top = this._updateTopConstraint(top);
    left = this._updateLeftConstraint(left);

    var e = this.currentDrag || this.element;
    e.setStyle({top: top + 'px'});
    e.setStyle({left: left + 'px'});

    this.useLeft = true;
    this.useTop = true;
  },
    
  getLocation: function() {
    var location = {};
    if (this.useTop)
      location = Object.extend(location, {top: this.element.getStyle("top")});
    else
      location = Object.extend(location, {bottom: this.element.getStyle("bottom")});
    if (this.useLeft)
      location = Object.extend(location, {left: this.element.getStyle("left")});
    else
      location = Object.extend(location, {right: this.element.getStyle("right")});
    
    return location;
  },
  
  // Gets window size
  getSize: function() {
    return {width: this.width, height: this.height};
  },
    
  // Sets window size
  setSize: function(width, height, useEffect) {    
    width = parseFloat(width);
    height = parseFloat(height);
    
    // Check min and max size
    if (!this.minimized && width < this.options.minWidth)
      width = this.options.minWidth;

    if (!this.minimized && height < this.options.minHeight)
      height = this.options.minHeight;
      
    if (this.options. maxHeight && height > this.options. maxHeight)
      height = this.options. maxHeight;

    if (this.options. maxWidth && width > this.options. maxWidth)
      width = this.options. maxWidth;

    
    if (this.useTop && this.useLeft && Window.hasEffectLib && Effect.ResizeWindow && useEffect) {
      new Effect.ResizeWindow(this, null, null, width, height, {duration: Window.resizeEffectDuration});
    } else {
      this.width = width;
      this.height = height;
      var e = this.currentDrag ? this.currentDrag : this.element;

      e.setStyle({width: width + this.widthW + this.widthE + "px"})
      e.setStyle({height: height  + this.heightN + this.heightS + "px"})

      // Update content size
      if (!this.currentDrag || this.currentDrag == this.element) {
        var content = $(this.element.id + '_content');
        content.setStyle({height: height  + 'px'});
        content.setStyle({width: width  + 'px'});
        content.setStyle({'text-align': 'left'});
      }
    }
  },
  
  updateHeight: function() {
    this.setSize(this.width, this.content.scrollHeight, true);
  },
  
  updateWidth: function() {
    this.setSize(this.content.scrollWidth, this.height, true);
  },
  
  // Brings window to front
  toFront: function() {
    if (this.element.style.zIndex < Windows.maxZIndex)  
      this.setZIndex(Windows.maxZIndex + 1);
    if (this.iefix) 
      this._fixIEOverlapping(); 
  },
   
  getBounds: function(insideOnly) {
    if (! this.width || !this.height || !this.visible)  
      this.computeBounds();
    var w = this.width;
    var h = this.height;

    if (!insideOnly) {
      w += this.widthW + this.widthE;
      h += this.heightN + this.heightS;
    }
    var bounds = Object.extend(this.getLocation(), {width: w + "px", height: h + "px"});
    return bounds;
  },
      
  computeBounds: function() {
     if (! this.width || !this.height) {
      var size = WindowUtilities._computeSize(this.content.innerHTML, this.content.id, this.width, this.height, 0, this.options.className)
      if (this.height)
        this.width = size + 5
      else
        this.height = size + 5
    }

    this.setSize(this.width, this.height);
    if (this.centered)
      this._center(this.centerTop, this.centerLeft);    
  },
  
  // Displays window modal state or not
  show: function(modal) {
    this.visible = true;
    if (modal) {
      // Hack for Safari !!
      if (typeof this.overlayOpacity == "undefined") {
        var that = this;
        setTimeout(function() {that.show(modal)}, 10);
        return;
      }
      Windows.addModalWindow(this);
      
      this.modal = true;      
      this.setZIndex(Windows.maxZIndex + 1);
      Windows.unsetOverflow(this);
    }
    else    
      if (!this.element.style.zIndex) 
        this.setZIndex(Windows.maxZIndex + 1);        
      
    // To restore overflow if need be
    if (this.oldStyle)
      this.getContent().setStyle({overflow: this.oldStyle});
      
    this.computeBounds();
    
    this._notify("onBeforeShow");   
    if (this.options.showEffect != Element.show && this.options.showEffectOptions)
      this.options.showEffect(this.element, this.options.showEffectOptions);  
    else
      this.options.showEffect(this.element);  
      
    this._checkIEOverlapping();
    WindowUtilities.focusedWindow = this
    this._notify("onShow");   
  },
  
  // Displays window modal state or not at the center of the page
  showCenter: function(modal, top, left) {
    this.centered = true;
    this.centerTop = top;
    this.centerLeft = left;

    this.show(modal);
  },
  
  isVisible: function() {
    return this.visible;
  },
  
  _center: function(top, left) {    
    var windowScroll = WindowUtilities.getWindowScroll(this.options.parent);    
    var pageSize = WindowUtilities.getPageSize(this.options.parent);    
    if (typeof top == "undefined")
      top = (pageSize.windowHeight - (this.height + this.heightN + this.heightS))/2;
    top += windowScroll.top
    
    if (typeof left == "undefined")
      left = (pageSize.windowWidth - (this.width + this.widthW + this.widthE))/2;
    left += windowScroll.left      
    this.setLocation(top, left);
    this.toFront();
  },
  
  _recenter: function(event) {     
    if (this.centered) {
      var pageSize = WindowUtilities.getPageSize(this.options.parent);
      var windowScroll = WindowUtilities.getWindowScroll(this.options.parent);    

      // Check for this stupid IE that sends dumb events
      if (this.pageSize && this.pageSize.windowWidth == pageSize.windowWidth && this.pageSize.windowHeight == pageSize.windowHeight && 
          this.windowScroll.left == windowScroll.left && this.windowScroll.top == windowScroll.top) 
        return;
      this.pageSize = pageSize;
      this.windowScroll = windowScroll;
      // set height of Overlay to take up whole page and show
      if ($('overlay_modal')) 
        $('overlay_modal').setStyle({height: (pageSize.pageHeight + 'px')});
      
      if (this.options.recenterAuto)
        this._center(this.centerTop, this.centerLeft);    
    }
  },
  
  // Hides window
  hide: function() {
    this.visible = false;
    if (this.modal) {
      Windows.removeModalWindow(this);
      Windows.resetOverflow();
    }
    // To avoid bug on scrolling bar
    this.oldStyle = this.getContent().getStyle('overflow') || "auto"
    this.getContent().setStyle({overflow: "hidden"});

    this.options.hideEffect(this.element, this.options.hideEffectOptions);  

     if(this.iefix) 
      this.iefix.hide();

    if (!this.doNotNotifyHide)
      this._notify("onHide");
  },

  close: function() {
    // Asks closeCallback if exists
    if (this.visible) {
      if (this.options.closeCallback && ! this.options.closeCallback(this)) 
        return;

      if (this.options.destroyOnClose) {
        var destroyFunc = this.destroy.bind(this);
        if (this.options.hideEffectOptions.afterFinish) {
          var func = this.options.hideEffectOptions.afterFinish;
          this.options.hideEffectOptions.afterFinish = function() {func();destroyFunc() }
        }
        else 
          this.options.hideEffectOptions.afterFinish = function() {destroyFunc() }
      }
      Windows.updateFocusedWindow();
      
      this.doNotNotifyHide = true;
      this.hide();
      this.doNotNotifyHide = false;
      this._notify("onClose");
    }
  },
  
  minimize: function() {
    if (this.resizing)
      return;
    
    var r2 = $(this.getId() + "_row2");
    
    if (!this.minimized) {
      this.minimized = true;

      var dh = r2.getDimensions().height;
      this.r2Height = dh;
      var h  = this.element.getHeight() - dh;

      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow) {
        new Effect.ResizeWindow(this, null, null, null, this.height -dh, {duration: Window.resizeEffectDuration});
      } else  {
        this.height -= dh;
        this.element.setStyle({height: h + "px"});
        r2.hide();
      }

      if (! this.useTop) {
        var bottom = parseFloat(this.element.getStyle('bottom'));
        this.element.setStyle({bottom: (bottom + dh) + 'px'});
      }
    } 
    else {      
      this.minimized = false;
      
      var dh = this.r2Height;
      this.r2Height = null;
      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow) {
        new Effect.ResizeWindow(this, null, null, null, this.height + dh, {duration: Window.resizeEffectDuration});
      }
      else {
        var h  = this.element.getHeight() + dh;
        this.height += dh;
        this.element.setStyle({height: h + "px"})
        r2.show();
      }
      if (! this.useTop) {
        var bottom = parseFloat(this.element.getStyle('bottom'));
        this.element.setStyle({bottom: (bottom - dh) + 'px'});
      }
      this.toFront();
    }
    this._notify("onMinimize");
    
    // Store new location/size if need be
    this._saveCookie()
  },
  
  maximize: function() {
    if (this.isMinimized() || this.resizing)
      return;
  
    if (Prototype.Browser.IE && this.heightN == 0)
      this._getWindowBorderSize();
      
    if (this.storedLocation != null) {
      this._restoreLocation();
      if(this.iefix) 
        this.iefix.hide();
    }
    else {
      this._storeLocation();
      Windows.unsetOverflow(this);
      
      var windowScroll = WindowUtilities.getWindowScroll(this.options.parent);
      var pageSize = WindowUtilities.getPageSize(this.options.parent);    
      var left = windowScroll.left;
      var top = windowScroll.top;
      
      if (this.options.parent != document.body) {
        windowScroll =  {top:0, left:0, bottom:0, right:0};
        var dim = this.options.parent.getDimensions();
        pageSize.windowWidth = dim.width;
        pageSize.windowHeight = dim.height;
        top = 0; 
        left = 0;
      }
      
      if (this.constraint) {
        pageSize.windowWidth -= Math.max(0, this.constraintPad.left) + Math.max(0, this.constraintPad.right);
        pageSize.windowHeight -= Math.max(0, this.constraintPad.top) + Math.max(0, this.constraintPad.bottom);
        left +=  Math.max(0, this.constraintPad.left);
        top +=  Math.max(0, this.constraintPad.top);
      }
      
      var width = pageSize.windowWidth - this.widthW - this.widthE;
      var height= pageSize.windowHeight - this.heightN - this.heightS;

      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow) {
        new Effect.ResizeWindow(this, top, left, width, height, {duration: Window.resizeEffectDuration});
      }
      else {
        this.setSize(width, height);
        this.element.setStyle(this.useLeft ? {left: left} : {right: left});
        this.element.setStyle(this.useTop ? {top: top} : {bottom: top});
      }
        
      this.toFront();
      if (this.iefix) 
        this._fixIEOverlapping(); 
    }
    this._notify("onMaximize");

    // Store new location/size if need be
    this._saveCookie()
  },
  
  isMinimized: function() {
    return this.minimized;
  },
  
  isMaximized: function() {
    return (this.storedLocation != null);
  },
  
  setOpacity: function(opacity) {
    if (Element.setOpacity)
      Element.setOpacity(this.element, opacity);
  },
  
  setZIndex: function(zindex) {
    this.element.setStyle({zIndex: zindex});
    Windows.updateZindex(zindex, this);
  },

  setTitle: function(newTitle) {
    if (!newTitle || newTitle == "") 
      newTitle = "&nbsp;";
      
    Element.update(this.element.id + '_top', newTitle);
  },
   
  getTitle: function() {
    return $(this.element.id + '_top').innerHTML;
  },
  
  setStatusBar: function(element) {
    var statusBar = $(this.getId() + "_bottom");

    if (typeof(element) == "object") {
      if (this.bottombar.firstChild)
        this.bottombar.replaceChild(element, this.bottombar.firstChild);
      else
        this.bottombar.appendChild(element);
    }
    else
      this.bottombar.innerHTML = element;
  },

  _checkIEOverlapping: function() {
    if(!this.iefix && (navigator.appVersion.indexOf('MSIE')>0) && (navigator.userAgent.indexOf('Opera')<0) && (this.element.getStyle('position')=='absolute')) {
        new Insertion.After(this.element.id, '<iframe id="' + this.element.id + '_iefix" '+ 'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' + 'src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
        this.iefix = $(this.element.id+'_iefix');
    }
    if(this.iefix) 
      setTimeout(this._fixIEOverlapping.bind(this), 50);
  },

  _fixIEOverlapping: function() {
      Position.clone(this.element, this.iefix);
      this.iefix.style.zIndex = this.element.style.zIndex - 1;
      this.iefix.show();
  },
  
  _getWindowBorderSize: function(event) {
    // Hack to get real window border size!!
    var div = this._createHiddenDiv(this.options.className + "_n")
    this.heightN = Element.getDimensions(div).height;    
    div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.options.className + "_s")
    this.heightS = Element.getDimensions(div).height;    
    div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.options.className + "_e")
    this.widthE = Element.getDimensions(div).width;    
    div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.options.className + "_w")
    this.widthW = Element.getDimensions(div).width;
    div.parentNode.removeChild(div);
    
    var div = document.createElement("div");
    div.className = "overlay_" + this.options.className ;
    document.body.appendChild(div);
    //alert("no timeout:\nopacity: " + div.getStyle("opacity") + "\nwidth: " + document.defaultView.getComputedStyle(div, null).width);
    var that = this;
    
    // Workaround for Safari!!
    setTimeout(function() {that.overlayOpacity = ($(div).getStyle("opacity")); div.parentNode.removeChild(div);}, 10);
    
    // Workaround for IE!!
    if (Prototype.Browser.IE) {
      this.heightS = $(this.getId() +"_row3").getDimensions().height;
      this.heightN = $(this.getId() +"_row1").getDimensions().height;
    }

    // Safari size fix
    if (Prototype.Browser.WebKit && Prototype.Browser.WebKitVersion < 420)
      this.setSize(this.width, this.height);
    if (this.doMaximize)
      this.maximize();
    if (this.doMinimize)
      this.minimize();
  },
 
  _createHiddenDiv: function(className) {
    var objBody = document.body;
    var win = document.createElement("div");
    win.setAttribute('id', this.element.id+ "_tmp");
    win.className = className;
    win.style.display = 'none';
    win.innerHTML = '';
    objBody.insertBefore(win, objBody.firstChild);
    return win;
  },
  
  _storeLocation: function() {
    if (this.storedLocation == null) {
      this.storedLocation = {useTop: this.useTop, useLeft: this.useLeft, 
                             top: this.element.getStyle('top'), bottom: this.element.getStyle('bottom'),
                             left: this.element.getStyle('left'), right: this.element.getStyle('right'),
                             width: this.width, height: this.height };
    }
  },
  
  _restoreLocation: function() {
    if (this.storedLocation != null) {
      this.useLeft = this.storedLocation.useLeft;
      this.useTop = this.storedLocation.useTop;
      
      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow)
        new Effect.ResizeWindow(this, this.storedLocation.top, this.storedLocation.left, this.storedLocation.width, this.storedLocation.height, {duration: Window.resizeEffectDuration});
      else {
        this.element.setStyle(this.useLeft ? {left: this.storedLocation.left} : {right: this.storedLocation.right});
        this.element.setStyle(this.useTop ? {top: this.storedLocation.top} : {bottom: this.storedLocation.bottom});
        this.setSize(this.storedLocation.width, this.storedLocation.height);
      }
      
      Windows.resetOverflow();
      this._removeStoreLocation();
    }
  },
  
  _removeStoreLocation: function() {
    this.storedLocation = null;
  },
  
  _saveCookie: function() {
    if (this.cookie) {
      var value = "";
      if (this.useLeft)
        value += "l:" +  (this.storedLocation ? this.storedLocation.left : this.element.getStyle('left'))
      else
        value += "r:" + (this.storedLocation ? this.storedLocation.right : this.element.getStyle('right'))
      if (this.useTop)
        value += ",t:" + (this.storedLocation ? this.storedLocation.top : this.element.getStyle('top'))
      else
        value += ",b:" + (this.storedLocation ? this.storedLocation.bottom :this.element.getStyle('bottom'))
        
      value += "," + (this.storedLocation ? this.storedLocation.width : this.width);
      value += "," + (this.storedLocation ? this.storedLocation.height : this.height);
      value += "," + this.isMinimized();
      value += "," + this.isMaximized();
      WindowUtilities.setCookie(value, this.cookie)
    }
  },
  
  _createWiredElement: function() {
    if (! this.wiredElement) {
      if (Prototype.Browser.IE)
        this._getWindowBorderSize();
      var div = document.createElement("div");
      div.className = "wired_frame " + this.options.className + "_wired_frame";
      
      div.style.position = 'absolute';
      this.options.parent.insertBefore(div, this.options.parent.firstChild);
      this.wiredElement = $(div);
    }
    if (this.useLeft) 
      this.wiredElement.setStyle({left: this.element.getStyle('left')});
    else 
      this.wiredElement.setStyle({right: this.element.getStyle('right')});
      
    if (this.useTop) 
      this.wiredElement.setStyle({top: this.element.getStyle('top')});
    else 
      this.wiredElement.setStyle({bottom: this.element.getStyle('bottom')});

    var dim = this.element.getDimensions();
    this.wiredElement.setStyle({width: dim.width + "px", height: dim.height +"px"});

    this.wiredElement.setStyle({zIndex: Windows.maxZIndex+30});
    return this.wiredElement;
  },
  
  _hideWiredElement: function() {
    if (! this.wiredElement || ! this.currentDrag)
      return;
    if (this.currentDrag == this.element) 
      this.currentDrag = null;
    else {
      if (this.useLeft) 
        this.element.setStyle({left: this.currentDrag.getStyle('left')});
      else 
        this.element.setStyle({right: this.currentDrag.getStyle('right')});

      if (this.useTop) 
        this.element.setStyle({top: this.currentDrag.getStyle('top')});
      else 
        this.element.setStyle({bottom: this.currentDrag.getStyle('bottom')});

      this.currentDrag.hide();
      this.currentDrag = null;
      if (this.doResize)
        this.setSize(this.width, this.height);
    } 
  },
  
  _notify: function(eventName) {
    if (this.options[eventName])
      this.options[eventName](this);
    else
      Windows.notify(eventName, this);
  }
};

// Windows containers, register all page windows
var Windows = {
  windows: [],
  modalWindows: [],
  observers: [],
  focusedWindow: null,
  maxZIndex: 0,
  overlayShowEffectOptions: {duration: 0.5},
  overlayHideEffectOptions: {duration: 0.5},

  addObserver: function(observer) {
    this.removeObserver(observer);
    this.observers.push(observer);
  },
  
  removeObserver: function(observer) {  
    this.observers = this.observers.reject( function(o) { return o==observer });
  },
  
  // onDestroy onStartResize onStartMove onResize onMove onEndResize onEndMove onFocus onBlur onBeforeShow onShow onHide onMinimize onMaximize onClose
  notify: function(eventName, win) {  
    this.observers.each( function(o) {if(o[eventName]) o[eventName](eventName, win);});
  },

  // Gets window from its id
  getWindow: function(id) {
    return this.windows.detect(function(d) { return d.getId() ==id });
  },

  // Gets the last focused window
  getFocusedWindow: function() {
    return this.focusedWindow;
  },

  updateFocusedWindow: function() {
    this.focusedWindow = this.windows.length >=2 ? this.windows[this.windows.length-2] : null;    
  },
  
  // Registers a new window (called by Windows constructor)
  register: function(win) {
    this.windows.push(win);
  },
    
  // Add a modal window in the stack
  addModalWindow: function(win) {
    // Disable screen if first modal window
    if (this.modalWindows.length == 0) {
      WindowUtilities.disableScreen(win.options.className, 'overlay_modal', win.overlayOpacity, win.getId(), win.options.parent);
    }
    else {
      // Move overlay over all windows
      if (Window.keepMultiModalWindow) {
        $('overlay_modal').style.zIndex = Windows.maxZIndex + 1;
        Windows.maxZIndex += 1;
        WindowUtilities._hideSelect(this.modalWindows.last().getId());
      }
      // Hide current modal window
      else
        this.modalWindows.last().element.hide();
      // Fucking IE select issue
      WindowUtilities._showSelect(win.getId());
    }      
    this.modalWindows.push(win);    
  },
  
  removeModalWindow: function(win) {
    this.modalWindows.pop();
    
    // No more modal windows
    if (this.modalWindows.length == 0)
      WindowUtilities.enableScreen();     
    else {
      if (Window.keepMultiModalWindow) {
        this.modalWindows.last().toFront();
        WindowUtilities._showSelect(this.modalWindows.last().getId());        
      }
      else
        this.modalWindows.last().element.show();
    }
  },
  
  // Registers a new window (called by Windows constructor)
  register: function(win) {
    this.windows.push(win);
  },
  
  // Unregisters a window (called by Windows destructor)
  unregister: function(win) {
    this.windows = this.windows.reject(function(d) { return d==win });
  }, 
  
  // Closes all windows
  closeAll: function() {  
    this.windows.each( function(w) {Windows.close(w.getId())} );
  },
  
  closeAllModalWindows: function() {
    WindowUtilities.enableScreen();     
    this.modalWindows.each( function(win) {if (win) win.close()});    
  },

  // Minimizes a window with its id
  minimize: function(id, event) {
    var win = this.getWindow(id)
    if (win && win.visible)
      win.minimize();
    Event.stop(event);
  },
  
  // Maximizes a window with its id
  maximize: function(id, event) {
    var win = this.getWindow(id)
    if (win && win.visible)
      win.maximize();
    Event.stop(event);
  },

  // Closes a window with its id
  close: function(id, event) {
    var win = this.getWindow(id);
    if (win) 
      win.close();
    if (event)
      Event.stop(event);
  },
  
  blur: function(id) {
    var win = this.getWindow(id);  
    if (!win)
      return;
    if (win.options.blurClassName)
      win.changeClassName(win.options.blurClassName);
    if (this.focusedWindow == win)  
      this.focusedWindow = null;
    win._notify("onBlur");  
  },
  
  focus: function(id) {
    var win = this.getWindow(id);  
    if (!win)
      return;       
    if (this.focusedWindow)
      this.blur(this.focusedWindow.getId())

    if (win.options.focusClassName)
      win.changeClassName(win.options.focusClassName);  
    this.focusedWindow = win;
    win._notify("onFocus");
  },
  
  unsetOverflow: function(except) {    
    this.windows.each(function(d) { d.oldOverflow = d.getContent().getStyle("overflow") || "auto" ; d.getContent().setStyle({overflow: "hidden"}) });
    if (except && except.oldOverflow)
      except.getContent().setStyle({overflow: except.oldOverflow});
  },

  resetOverflow: function() {
    this.windows.each(function(d) { if (d.oldOverflow) d.getContent().setStyle({overflow: d.oldOverflow}) });
  },

  updateZindex: function(zindex, win) { 
    if (zindex > this.maxZIndex) {   
      this.maxZIndex = zindex;    
      if (this.focusedWindow) 
        this.blur(this.focusedWindow.getId())
    }
    this.focusedWindow = win;
    if (this.focusedWindow) 
      this.focus(this.focusedWindow.getId())
  }
};

var Dialog = {
  dialogId: null,
  onCompleteFunc: null,
  callFunc: null, 
  parameters: null, 
    
  confirm: function(content, parameters) {
    // Get Ajax return before
    if (content && typeof content != "string") {
      Dialog._runAjaxRequest(content, parameters, Dialog.confirm);
      return 
    }
    content = content || "";
    
    parameters = parameters || {};
    var okLabel = parameters.okLabel ? parameters.okLabel : "Ok";
    var cancelLabel = parameters.cancelLabel ? parameters.cancelLabel : "Cancel";

    // Backward compatibility
    parameters = Object.extend(parameters, parameters.windowParameters || {});
    parameters.windowParameters = parameters.windowParameters || {};

    parameters.className = parameters.className || "alert";

    var okButtonClass = "class ='" + (parameters.buttonClass ? parameters.buttonClass + " " : "") + " ok_button'" 
    var cancelButtonClass = "class ='" + (parameters.buttonClass ? parameters.buttonClass + " " : "") + " cancel_button'" 
    var content = content ;
    return this._openDialog(content, parameters)
  },
  
  alert: function(content, parameters) {
    // Get Ajax return before
    if (content && typeof content != "string") {
      Dialog._runAjaxRequest(content, parameters, Dialog.alert);
      return 
    }
    content = content || "";
    
    parameters = parameters || {};
    var okLabel = parameters.okLabel ? parameters.okLabel : "Ok";

    // Backward compatibility    
    parameters = Object.extend(parameters, parameters.windowParameters || {});
    parameters.windowParameters = parameters.windowParameters || {};
    
    parameters.className = parameters.className || "alert";
    
    var okButtonClass = "class ='" + (parameters.buttonClass ? parameters.buttonClass + " " : "") + " ok_button'" 
    var content = "\
      <div class='" + parameters.className + "_message'>" + content  + "</div>\
        <div class='" + parameters.className + "_buttons'>\
          <input type='button' value='" + okLabel + "' onclick='Dialog.okCallback()' " + okButtonClass + "/>\
        </div>";                  
    return this._openDialog(content, parameters)
  },
  
  info: function(content, parameters) {   
    // Get Ajax return before
    if (content && typeof content != "string") {
      Dialog._runAjaxRequest(content, parameters, Dialog.info);
      return 
    }
    content = content || "";
     
    // Backward compatibility
    parameters = parameters || {};
    parameters = Object.extend(parameters, parameters.windowParameters || {});
    parameters.windowParameters = parameters.windowParameters || {};
    
    parameters.className = parameters.className || "alert";
    
    var content = "<div id='modal_dialog_message' class='" + parameters.className + "_message'>" + content  + "</div>";
    if (parameters.showProgress)
      content += "<div id='modal_dialog_progress' class='" + parameters.className + "_progress'>  </div>";

    parameters.ok = null;
    parameters.cancel = null;
    
    return this._openDialog(content, parameters)
  },
  
  setInfoMessage: function(message) {
    $('modal_dialog_message').update(message);
  },
  
  closeInfo: function() {
    Windows.close(this.dialogId);
  },
  
  _openDialog: function(content, parameters) {
    var className = parameters.className;
    
    if (! parameters.height && ! parameters.width) {
      parameters.width = WindowUtilities.getPageSize(parameters.options.parent || document.body).pageWidth / 2;
    }
    if (parameters.id)
      this.dialogId = parameters.id;
    else { 
      var t = new Date();
      this.dialogId = 'modal_dialog_' + t.getTime();
      parameters.id = this.dialogId;
    }

    // compute height or width if need be
    if (! parameters.height || ! parameters.width) {
      var size = WindowUtilities._computeSize(content, this.dialogId, parameters.width, parameters.height, 5, className)
      if (parameters.height)
        parameters.width = size + 5
      else
        parameters.height = size + 5
    }
    parameters.effectOptions = parameters.effectOptions ;
    parameters.resizable   = parameters.resizable || false;
    parameters.minimizable = parameters.minimizable || false;
    parameters.maximizable = parameters.maximizable ||  false;
    parameters.draggable   = parameters.draggable || false;
    parameters.closable    = parameters.closable || false;
    
    var win = new Window(parameters);
    win.getContent().innerHTML = content;
    
    win.showCenter(true, parameters.top, parameters.left);  
    win.setDestroyOnClose();
    
    win.cancelCallback = parameters.onCancel || parameters.cancel; 
    win.okCallback = parameters.onOk || parameters.ok;
    
    return win;    
  },
  
  _getAjaxContent: function(originalRequest)  {
      Dialog.callFunc(originalRequest.responseText, Dialog.parameters)
  },
  
  _runAjaxRequest: function(message, parameters, callFunc) {
    if (message.options == null)
      message.options = {}  
    Dialog.onCompleteFunc = message.options.onComplete;
    Dialog.parameters = parameters;
    Dialog.callFunc = callFunc;
    
    message.options.onComplete = Dialog._getAjaxContent;
    new Ajax.Request(message.url, message.options);
  },
  
  okCallback: function() {
    var win = Windows.focusedWindow;
    if (!win.okCallback || win.okCallback(win)) {
      // Remove onclick on button
      $$("#" + win.getId()+" input").each(function(element) {element.onclick=null;})
      win.close();
    }
  },

  cancelCallback: function() {
    var win = Windows.focusedWindow;
    // Remove onclick on button
    $$("#" + win.getId()+" input").each(function(element) {element.onclick=null})
    win.close();
    if (win.cancelCallback)
      win.cancelCallback(win);
  }
}
/*
  Based on Lightbox JS: Fullsize Image Overlays 
  by Lokesh Dhakar - http://www.huddletogether.com

  For more information on this script, visit:
  http://huddletogether.com/projects/lightbox/

  Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
  (basically, do anything you want, just leave my name and link)
*/

if (Prototype.Browser.WebKit) {
  var array = navigator.userAgent.match(new RegExp(/AppleWebKit\/([\d\.\+]*)/));
  Prototype.Browser.WebKitVersion = parseFloat(array[1]);
}

var WindowUtilities = {  
  // From dragdrop.js
  getWindowScroll: function(parent) {
    var T, L, W, H;
    parent = parent || document.body;              
    if (parent != document.body) {
      T = parent.scrollTop;
      L = parent.scrollLeft;
      W = parent.scrollWidth;
      H = parent.scrollHeight;
    } 
    else {
      var w = window;
      with (w.document) {
        if (w.document.documentElement && documentElement.scrollTop) {
          T = documentElement.scrollTop;
          L = documentElement.scrollLeft;
        } else if (w.document.body) {
          T = body.scrollTop;
          L = body.scrollLeft;
        }
        if (w.innerWidth) {
          W = w.innerWidth;
          H = w.innerHeight;
        } else if (w.document.documentElement && documentElement.clientWidth) {
          W = documentElement.clientWidth;
          H = documentElement.clientHeight;
        } else {
          W = body.offsetWidth;
          H = body.offsetHeight
        }
      }
    }
    return { top: T, left: L, width: W, height: H };
  }, 
  //
  // getPageSize()
  // Returns array with page width, height and window width, height
  // Core code from - quirksmode.org
  // Edit for Firefox by pHaez
  //
  getPageSize: function(parent){
    parent = parent || document.body;              
    var windowWidth, windowHeight;
    var pageHeight, pageWidth;
    if (parent != document.body) {
      windowWidth = parent.getWidth();
      windowHeight = parent.getHeight();                                
      pageWidth = parent.scrollWidth;
      pageHeight = parent.scrollHeight;                                
    } 
    else {
      var xScroll, yScroll;

      if (window.innerHeight && window.scrollMaxY) {  
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
      } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
      } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
      }


      if (self.innerHeight) {  // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
      } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
      } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
      }  

      // for small pages with total height less then height of the viewport
      if(yScroll < windowHeight){
        pageHeight = windowHeight;
      } else { 
        pageHeight = yScroll;
      }

      // for small pages with total width less then width of the viewport
      if(xScroll < windowWidth){  
        pageWidth = windowWidth;
      } else {
        pageWidth = xScroll;
      }
    }             
    return {pageWidth: pageWidth ,pageHeight: pageHeight , windowWidth: windowWidth, windowHeight: windowHeight};
  },

  disableScreen: function(className, overlayId, overlayOpacity, contentId, parent) {
    WindowUtilities.initLightbox(overlayId, className, function() {this._disableScreen(className, overlayId, overlayOpacity, contentId)}.bind(this), parent || document.body);
  },

  _disableScreen: function(className, overlayId, overlayOpacity, contentId) {
    // prep objects
    var objOverlay = $(overlayId);

    var pageSize = WindowUtilities.getPageSize(objOverlay.parentNode);

    // Hide select boxes as they will 'peek' through the image in IE, store old value
    if (contentId && Prototype.Browser.IE) {
      WindowUtilities._hideSelect();
      WindowUtilities._showSelect(contentId);
    }  
  
    // set height of Overlay to take up whole page and show
    objOverlay.style.height = (pageSize.pageHeight + 'px');
    objOverlay.style.display = 'none'; 
    if (overlayId == "overlay_modal" && Window.hasEffectLib && Windows.overlayShowEffectOptions) {
      objOverlay.overlayOpacity = overlayOpacity;
      new Effect.Appear(objOverlay, Object.extend({from: 0, to: overlayOpacity}, Windows.overlayShowEffectOptions));
    }
    else
      objOverlay.style.display = "block";
  },
  
  enableScreen: function(id) {
    id = id || 'overlay_modal';
    var objOverlay =  $(id);
    if (objOverlay) {
      // hide lightbox and overlay
      if (id == "overlay_modal" && Window.hasEffectLib && Windows.overlayHideEffectOptions)
        new Effect.Fade(objOverlay, Object.extend({from: objOverlay.overlayOpacity, to:0}, Windows.overlayHideEffectOptions));
      else {
        objOverlay.style.display = 'none';
        objOverlay.parentNode.removeChild(objOverlay);
      }
      
      // make select boxes visible using old value
      if (id != "__invisible__") 
        WindowUtilities._showSelect();
    }
  },

  _hideSelect: function(id) {
    if (Prototype.Browser.IE) {
      id = id ==  null ? "" : "#" + id + " ";
      $$(id + 'select').each(function(element) {
        if (! WindowUtilities.isDefined(element.oldVisibility)) {
          element.oldVisibility = element.style.visibility ? element.style.visibility : "visible";
          element.style.visibility = "hidden";
        }
      });
    }
  },
  
  _showSelect: function(id) {
    if (Prototype.Browser.IE) {
      id = id ==  null ? "" : "#" + id + " ";
      $$(id + 'select').each(function(element) {
        if (WindowUtilities.isDefined(element.oldVisibility)) {
          // Why?? Ask IE
          try {
            element.style.visibility = element.oldVisibility;
          } catch(e) {
            element.style.visibility = "visible";
          }
          element.oldVisibility = null;
        }
        else {
          if (element.style.visibility)
            element.style.visibility = "visible";
        }
      });
    }
  },

  isDefined: function(object) {
    return typeof(object) != "undefined" && object != null;
  },
  
  // initLightbox()
  // Function runs on window load, going through link tags looking for rel="lightbox".
  // These links receive onclick events that enable the lightbox display for their targets.
  // The function also inserts html markup at the top of the page which will be used as a
  // container for the overlay pattern and the inline image.
  initLightbox: function(id, className, doneHandler, parent) {
    // Already done, just update zIndex
    if ($(id)) {
      Element.setStyle(id, {zIndex: Windows.maxZIndex + 1});
      Windows.maxZIndex++;
      doneHandler();
    }
    // create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
    else {
      var objOverlay = document.createElement("div");
      objOverlay.setAttribute('id', id);
      objOverlay.className = "overlay_" + className
      objOverlay.style.display = 'none';
      objOverlay.style.position = 'absolute';
      objOverlay.style.top = '0';
      objOverlay.style.left = '0';
      objOverlay.style.zIndex = Windows.maxZIndex + 1;
      Windows.maxZIndex++;
      objOverlay.style.width = '100%';
      parent.insertBefore(objOverlay, parent.firstChild);
      if (Prototype.Browser.WebKit && id == "overlay_modal") {
        setTimeout(function() {doneHandler()}, 10);
      }
      else
        doneHandler();
    }    
  },
  
  setCookie: function(value, parameters) {
    document.cookie= parameters[0] + "=" + escape(value) +
      ((parameters[1]) ? "; expires=" + parameters[1].toGMTString() : "") +
      ((parameters[2]) ? "; path=" + parameters[2] : "") +
      ((parameters[3]) ? "; domain=" + parameters[3] : "") +
      ((parameters[4]) ? "; secure" : "");
  },

  getCookie: function(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
  },
    
  _computeSize: function(content, id, width, height, margin, className) {
    var objBody = document.body;
    var tmpObj = document.createElement("div");
    tmpObj.setAttribute('id', id);
    tmpObj.className = className + "_content";

    if (height)
      tmpObj.style.height = height + "px"
    else
      tmpObj.style.width = width + "px"
  
    tmpObj.style.position = 'absolute';
    tmpObj.style.top = '0';
    tmpObj.style.left = '0';
    tmpObj.style.display = 'none';

    tmpObj.innerHTML = content;
    objBody.insertBefore(tmpObj, objBody.firstChild);

    var size;
    if (height)
      size = $(tmpObj).getDimensions().width + margin;
    else
      size = $(tmpObj).getDimensions().height + margin;
    objBody.removeChild(tmpObj);
    return size;
  }  
}




// FROM: /javascripts/window_effects.js?1288225651
Effect.ResizeWindow = Class.create();
Object.extend(Object.extend(Effect.ResizeWindow.prototype, Effect.Base.prototype), {
  initialize: function(win, top, left, width, height) {
    this.window = win;
    this.window.resizing = true;
    
    var size = win.getSize();
    this.initWidth    = parseFloat(size.width);
    this.initHeight   = parseFloat(size.height);

    var location = win.getLocation();
    this.initTop    = parseFloat(location.top);
    this.initLeft   = parseFloat(location.left);

    this.width    = width != null  ? parseFloat(width)  : this.initWidth;
    this.height   = height != null ? parseFloat(height) : this.initHeight;
    this.top      = top != null    ? parseFloat(top)    : this.initTop;
    this.left     = left != null   ? parseFloat(left)   : this.initLeft;

    this.dx     = this.left   - this.initLeft;
    this.dy     = this.top    - this.initTop;
    this.dw     = this.width  - this.initWidth;
    this.dh     = this.height - this.initHeight;
    
    this.r2      = $(this.window.getId() + "_row2");
    this.content = $(this.window.getId() + "_content");
        
    this.contentOverflow = this.content.getStyle("overflow") || "auto";
    this.content.setStyle({overflow: "hidden"});
    
    // Wired mode
    if (this.window.options.wiredDrag) {
      this.window.currentDrag = win._createWiredElement();
      this.window.currentDrag.show();
      this.window.element.hide();
    }

    this.start(arguments[5]);
  },
  
  update: function(position) {
    var width  = Math.floor(this.initWidth  + this.dw * position);
    var height = Math.floor(this.initHeight + this.dh * position);
    var top    = Math.floor(this.initTop    + this.dy * position);
    var left   = Math.floor(this.initLeft   + this.dx * position);

    if (window.ie) {
      if (Math.floor(height) == 0)  
        this.r2.hide();
      else if (Math.floor(height) >1)  
        this.r2.show();
    }      
    this.r2.setStyle({height: height});
    this.window.setSize(width, height);
    this.window.setLocation(top, left);
  },
  
  finish: function(position) {
    // Wired mode
    if (this.window.options.wiredDrag) {
      this.window._hideWiredElement();
      this.window.element.show();
    }

    this.window.setSize(this.width, this.height);
    this.window.setLocation(this.top, this.left);
    this.r2.setStyle({height: null});
    
    this.content.setStyle({overflow: this.contentOverflow});
      
    this.window.resizing = false;
  }
});

Effect.ModalSlideDown = function(element) {
  var windowScroll = WindowUtilities.getWindowScroll();    
  var height = element.getStyle("height");  
  element.setStyle({top: - (parseFloat(height) - windowScroll.top) + "px"});
  
  element.show();
  return new Effect.Move(element, Object.extend({ x: 0, y: parseFloat(height) }, arguments[1] || {}));
};


Effect.ModalSlideUp = function(element) {
  var height = element.getStyle("height");
  return new Effect.Move(element, Object.extend({ x: 0, y: -parseFloat(height) }, arguments[1] || {}));
};

PopupEffect = Class.create();
PopupEffect.prototype = {    
  initialize: function(htmlElement) {
    this.html = $(htmlElement);      
    this.options = Object.extend({className: "popup_effect", duration: 0.4}, arguments[1] || {});
    
  },
  show: function(element, options) { 
    var position = Position.cumulativeOffset(this.html);      
    var size = this.html.getDimensions();
    var bounds = element.win.getBounds();
    this.window =  element.win;      
    // Create a div
    if (!this.div) {
      this.div = document.createElement("div");
      this.div.className = this.options.className;
      this.div.style.height = size.height + "px";
      this.div.style.width  = size.width  + "px";
      this.div.style.top    = position[1] + "px";
      this.div.style.left   = position[0] + "px";   
      this.div.style.position = "absolute"
      document.body.appendChild(this.div);
    }                                                   
    if (this.options.fromOpacity)
      this.div.setStyle({opacity: this.options.fromOpacity})
    this.div.show();          
    var style = "top:" + bounds.top + ";left:" +bounds.left + ";width:" + bounds.width +";height:" + bounds.height;
    if (this.options.toOpacity)
      style += ";opacity:" + this.options.toOpacity;
    
    new Effect.Morph(this.div ,{style: style, duration: this.options.duration, afterFinish: this._showWindow.bind(this)});    
  },

  hide: function(element, options) {     
    var position = Position.cumulativeOffset(this.html);      
    var size = this.html.getDimensions();    
    this.window.visible = true; 
    var bounds = this.window.getBounds();
    this.window.visible = false; 

    this.window.element.hide();

    this.div.style.height = bounds.height;
    this.div.style.width  = bounds.width;
    this.div.style.top    = bounds.top;
    this.div.style.left   = bounds.left;
    
    if (this.options.toOpacity)
      this.div.setStyle({opacity: this.options.toOpacity})

    this.div.show();                                 
    var style = "top:" + position[1] + "px;left:" + position[0] + "px;width:" + size.width +"px;height:" + size.height + "px";

    if (this.options.fromOpacity)
      style += ";opacity:" + this.options.fromOpacity;
    new Effect.Morph(this.div ,{style: style, duration: this.options.duration, afterFinish: this._hideDiv.bind(this)});    
  },
  
  _showWindow: function() {
    this.div.hide();
    this.window.element.show(); 
  },
  
  _hideDiv: function() {
    this.div.hide();
  }
}




// FROM: /javascripts/clientscript/os.js?1288225651
//Defines an Operating System level controller for the Web OS
//Author: Brian R Miedlar (c) 2006-2007 (miedlar.com)

var OS = Class.create();
OS.PageLoading = true;
OS.PageLoadComplete = function() {
    OS.PageLoading = false;
    
    $A(OS.BehaviourQueue).each(function(selectors)
    { OS.ApplyBehaviour(selectors); });
   
    
}; 
Event.observe(document, 'dom:loaded', function() {
OS.PageLoadComplete();
});
OS.BehaviourQueue = [];
OS.RegisterBehaviour = function(selectors) {
    if(!OS.PageLoading) { OS.ApplyBehaviour(selectors); return; }
    OS.BehaviourQueue.push(selectors);    
}
OS.ApplyBehaviour = function(selectors) {
    $H(selectors).each(function(item) {
        
        var sKey = item.key;
        var iDelay = 0;
        var iToken = sKey.indexOf("!D");
        if (iToken > 0) {
            iDelay = parseFloat(sKey.substring(iToken + 2)) || 0;
            sKey = sKey.substring(0, iToken);
            iDelay = parseInt(iDelay);
        }
        $$(sKey).each(function(element) {
            if (!iDelay) { item.value(element); return; }
            item.value.delay(iDelay, element);
        });
    });
};





// FROM: /javascripts/clientscript/model/carousel.js?1288225651
//Builds a carousel model
//License: This file is entirely BSD licensed.
//Author: Brian R Miedlar (c) 2004-2009 miedlar.com
//Dependencies: prototype.js

Element.display = function(element, show) {
    Element[(show) ? 'show': 'hide'](element);
}

var CarouselItem = Class.create();
CarouselItem.prototype = {
    initialize: function() {
        this.key = null;		
        this.value = null;
        this.element = null;
    }
};
var Carousel = Class.create();
Carousel.prototype = {
    initialize: function(key, carouselElement, itemWidth, itemHeight, observer, options) {
        this.loaded = false;
        this.key = key;
        this.observer = observer;
        this.carouselElement = $(carouselElement);
    
        this.itemsElement = this.carouselElement.down('.items');
        
        this.items = [];
        this.activeItem = null;
        this.activeIndex = 0;
        this.navScrollIndex = 0;
        this.itemHeight = itemHeight;
        this.itemWidth = itemWidth;
        if (!options) options = {};
        this.options = Object.extend({
            duration: 1.0,
            direction: 'horizontal',
            moveOpacity: .6,
            setSize: 4,
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        }, options);
        this.backElement = this.carouselElement.down('.navButton.previous');
        this.forwardElement = this.carouselElement.down('.navButton.next');
        if (this.backElement) Event.observe(this.backElement, 'click', this.scrollBack.bind(this));
        if (this.forwardElement) Event.observe(this.forwardElement, 'click', this.scrollForward.bind(this));
    },
    load: function() {
        var eList = this.itemsElement;
        this.items.clear();
        eList.select('.question_container_default').each(function(item) {
            item.carouselKey = null;
            var sKey = '';
            try {
                sKey = item.down('.key').innerHTML;
            } catch (e) {
                alert('Warning: Carousel Items require a child with classname [key]');
                return;
            }

            var oCarouselItem = new CarouselItem();
            if (this.options.itemParser) oCarouselItem.value = this.options.itemParser(item);
            oCarouselItem.index = this.items.length;
            oCarouselItem.key = sKey;
            oCarouselItem.element = item;
            this.items.push(oCarouselItem);

            //Store default selection
            if (item.hasClassName('selected')) {
                this.activeItem = oCarouselItem;
                this.activeIndex = this.items.size() - 1;
            }

            if (this.options.setItemEvents) this.options.setItemEvents(this, item, oCarouselItem, this.observer);
        } .bind(this));

        //Post processing
        this.loaded = true;
        this.afterLoad();
    },
    destroy: function() {
        this.loaded = false;
        var eList = this.itemsElement;
        this.items.clear();
        if (this.options.unsetItemEvents) {
            eList.select('.question_container_default').each(function(item, ix) {
                this.options.unsetItemEvents(this, item, this.items[ix], this.observer);
            } .bind(this));
        }
    },
    afterLoad: function() {
        if (this.items.length == 0) {
           // alert('Warning: No Carousel Items Exist');
            return;
        }

        //Change the following line to moveToIndex if you do 
        //not want the load animation on default selected items
        this.moveToIndex(this.activeIndex);
        //this.scrollToIndex(this.activeIndex);

        if (this.activeItem) this.activate(this.activeItem);
        if (this.observer.fireActiveCarouselLoaded) this.observer.fireActiveCarouselLoaded(this);
    },
    scrollForward: function() {
        //setsize-1 at a time scrolling
        if(this.activeIndex < this.items.length -4)
            {
                var iIndex = 0;
                if (this.navScrollIndex > this.items.length - (this.options.setSize )) {
                    //return;
                    if (!this.options.allowAutoLoopOnSet) return;
                }
                else {

                    iIndex = this.navScrollIndex + (this.options.setSize - 1);
                }
                //alert(this.activeIndex);
                this.scrollToIndex(iIndex);
             }
        
        
        
       // alert(iIndex);
    },
    scrollBack: function() {
        var iIndex = this.navScrollIndex - (this.options.setSize - 1);
      //  alert(iIndex);
        if (iIndex < 0) {
            if (!this.options.allowAutoLoopOnSet) {
                iIndex = 0;
            } else {
                iIndex = this.items.length - this.options.setSize;
                if (this.navScrollIndex > 0 || iIndex < 0) iIndex = 0;
            }
        }
        this.scrollToIndex(iIndex);
    },
    getLeft: function(index) {
        return index * (-this.itemWidth);
    },
    getTop: function(index) {
        return index * (-this.itemHeight);
    },
    activate: function(carouselItem) {
        if (this.activeItem) this.observer.fireDeactiveCarouselItem(this, this.activeItem.element, this.activeItem);
        if (carouselItem == null) return;
        this.activeItem = carouselItem;
        if (this.observer.fireActiveCarouselItem) this.observer.fireActiveCarouselItem(this, carouselItem.element, carouselItem);
    },
    reactivate: function() {
        if (!this.activeItem) return;
        this.activate(this.activeItem);
    },
    next: function() {
        if (this.activeItem == null) { this.activate(this.items[0]); return; }
        var iIndex = this.activeItem.index + 1;
        if (iIndex >= this.items.length) {
            
            iIndex = 0;
            if (!this.options.allowAutoLoopOnIndividual) iIndex = this.items.length - 1;
        }
        this.activate(this.items[iIndex]);
        this.activeIndex = iIndex;
        if (iIndex == 0) { this.scrollToIndex(0); return; }
        if (iIndex - this.options.setSize >= this.navScrollIndex - 1) this.scrollForward();
        
    },
    previous: function() {
        if (this.activeItem == null) { this.activate(this.items[0]); return; }
        var iIndex = this.activeItem.index - 1;
        if (iIndex < 0) {
            if (this.options.allowAutoLoopOnIndividual) {
                iIndex = this.items.length - 1;
            } else {
                iIndex = 0;
            }
        }
        this.activate(this.items[iIndex]);
        this.activeIndex = iIndex;
        if (iIndex == 0) { this.scrollToIndex(0); return; }
        if (iIndex == this.items.length - 1) {
            var iNavIndex = this.items.length - this.options.setSize;
            if (iNavIndex < 0) iNavIndex = 0;
            this.scrollToIndex(iNavIndex); return;
        }
        if (iIndex < this.navScrollIndex + 1) this.scrollBack();
    },
    scrollToIndex: function(index, duration) {
        if (index < 0) index = this.activeIndex;
        duration = duration || this.options.duration; //allow for override
        if (this.options.direction == 'vertical') {
            var iPreviousTop = this.getTop(this.navScrollIndex);
            var iTop = this.getTop(index);
            var iCurrentTop = parseInt(Element.getStyle(this.itemsElement, 'top')) || 0;
            var offset = iPreviousTop - iCurrentTop;
            var move = iTop - iPreviousTop;
            if (move > 0) {
                move = move + offset;
            } else {
                move = move - offset;
            }
            Element.setOpacity(this.itemsElement, this.options.moveOpacity);
            var ef = new Effect.Move(this.itemsElement, {
                'duration': duration,
                'y': move,
                'afterFinish': function() {
                    Element.setStyle(this.itemsElement, { 'top': iTop + 'px' });
                    Element.setOpacity(this.itemsElement, 1.0);
                } .bind(this)
            });
            ef = null;
        } else {
            var iPreviousLeft = this.getLeft(this.navScrollIndex);
            var iLeft = this.getLeft(index);
            var iCurrentLeft = parseInt(Element.getStyle(this.itemsElement, 'left')) || 0;
            var offset = iPreviousLeft - iCurrentLeft;
            var move = iLeft - iCurrentLeft;
            if (move > 0) {
                move = move + offset;
            } else {
                move = move - offset;
            }
            Element.setOpacity(this.itemsElement, this.options.moveOpacity);
            var ef = new Effect.Move(this.itemsElement, {
                'duration': duration,
                'x': move,
                'afterFinish': function() {
                    Element.setStyle(this.itemsElement, { 'left': iLeft + 'px' });
                    Element.setOpacity(this.itemsElement, 1.0);
                } .bind(this)
            });
            ef = null;
        }
        this.navScrollIndex = index;
       // Element.display(this.forwardElement, this.navScrollIndex <= this.items.length - (this.options.setSize + 1) || this.options.allowAutoLoopOnSet);
      //  Element.display(this.backElement, (parseInt(this.navScrollIndex) || 0) != 0 || this.options.allowAutoLoopOnSet);
        if (this.observer.fireCarouselAtIndex) this.observer.fireCarouselAtIndex(this, index);
    },
    moveToIndex: function(index) {
        /*if (this.options.direction == 'vertical') {
            var iTop = this.getTop(index);
            Element.setStyle(this.itemsElement, { 'top': iTop + 'px' });
            Element.setOpacity(this.itemsElement, 1.0);
        } else {
            var iLeft = this.getLeft(index);
            Element.setStyle(this.itemsElement, { 'left': iLeft + 'px' });
            Element.setOpacity(this.itemsElement, 1.0);
        }

        this.navScrollIndex = index;
        Element.display(this.forwardElement, this.navScrollIndex <= this.items.length - (this.options.setSize + 1) || this.options.allowAutoLoopOnSet);
        Element.display(this.backElement, (parseInt(this.navScrollIndex) || 0) != 0 || this.options.allowAutoLoopOnSet);
    */
    }
};





// FROM: /javascripts/clientscript/behavior/application.js?1288225651
﻿//Applies behaviour rules to the classes
//Author: Brian R Miedlar (c) 2006-2009

var AppBehavior = Class.create();
AppBehavior.Load = function() {
    
    OS.RegisterBehaviour(AppBehavior.CarouselRules);
}
AppBehavior.CarouselRules = {

    '#Carousel': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 69, AppBehavior, {
            setSize: 4,
            duration: .5,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	 '#Carousel3': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 50, 54, AppBehavior, {
            setSize: 2,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	 '#Crete_interview_Carousel': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 50, 110, AppBehavior, {
            setSize: 4,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
               
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	'#Interview_List_Carousel': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 60, 82, AppBehavior, {
            setSize: 5,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                //var sKey = item.down('.key').innerHTML;
              //  var sCaption = item.down('.caption').innerHTML;
              //  var sEmail = item.down('.email').innerHTML;
              //  return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	
	 '#Carousel5': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 74, AppBehavior, {
            setSize: 4,
            duration: .5,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	
	 '#dashboard_list': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 73, AppBehavior, {
           setSize: 4,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation

            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: false
        });
        AppBehavior.ProfileCarousel.load();
    },
    '#pre_interview': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 79, AppBehavior, {
            setSize: 4,
            duration: .4,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
    '#dashboard_ints': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 79, AppBehavior, {
            setSize: 4,
            duration: .4,
            direction: 'vertical',
           
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	
	 '#dashboard_interviews': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 69, AppBehavior, {
            setSize: 4,
            duration: .4,
            direction: 'vertical',
            
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },   
    '#Carousel2': function(element) {
        //Pictures
        AppBehavior.PictureCarousel = new Carousel('PictureCarousel', element, 90, 70, AppBehavior, {
            setSize: 5,
            duration: .5,
            direction: 'horizontal',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sPictureHtml = item.down('.picture').innerHTML;
                return { name: sCaption, pictureHtml: sPictureHtml };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
            },
            allowAutoLoopOnSet: true,
            allowAutoLoopOnIndividual: false
        });
        AppBehavior.PictureCarousel.load();
    },
    '#Cmd_NextItem': function(element) {
        Event.observe(element, 'click', function() {
            AppBehavior.ProfileCarousel.next();
        });
    },
    '#Cmd_PreviousItem': function(element) {
        Event.observe(element, 'click', function() {
            AppBehavior.ProfileCarousel.previous();
        });
    }
}

//EVENT OBSERVATION
AppBehavior.fireActiveCarouselLoaded = function(carousel) {
}
AppBehavior.fireActiveCarouselItem = function(carousel, element, item) {
    element.addClassName('selected');

   
}
AppBehavior.fireDeactiveCarouselItem = function(carousel, element, item) {
    element.removeClassName('selected');

    
}

AppBehavior.Load();
	


// FROM: /javascripts/scriptaculous.js?1288225651
// Copyright (c) 2005-2009 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// For details, see the script.aculo.us web site: http://script.aculo.us/

var Scriptaculous = {
  Version: '1.8.3',
  require: function(libraryName) {
    try{
      // inserting via DOM fails in Safari 2.0, so brute force approach
      document.write('<script type="text/javascript" src="'+libraryName+'"><\/script>');
    } catch(e) {
      // for xhtml+xml served content, fall back to DOM methods
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = libraryName;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },
  REQUIRED_PROTOTYPE: '1.6.0.3',
  load: function() {
    function convertVersionString(versionString) {
      var v = versionString.replace(/_.*|\./g, '');
      v = parseInt(v + '0'.times(4-v.length));
      return versionString.indexOf('_') > -1 ? v-1 : v;
    }

    if((typeof Prototype=='undefined') ||
       (typeof Element == 'undefined') ||
       (typeof Element.Methods=='undefined') ||
       (convertVersionString(Prototype.Version) <
        convertVersionString(Scriptaculous.REQUIRED_PROTOTYPE)))
       throw("script.aculo.us requires the Prototype JavaScript framework >= " +
        Scriptaculous.REQUIRED_PROTOTYPE);

    var js = /scriptaculous\.js(\?.*)?$/;
    $$('script[src]').findAll(function(s) {
      return s.src.match(js);
    }).each(function(s) {
      var path = s.src.replace(js, ''),
      includes = s.src.match(/\?.*load=([a-z,]*)/);
      (includes ? includes[1] : 'builder,effects,dragdrop,controls,slider,sound').split(',').each(
       function(include) { Scriptaculous.require(path+include+'.js') });
    });
  }
};

Scriptaculous.load();


// FROM: /javascripts/subModal.js?1288225651
/**
 * SUBMODAL v1.6
 * Used for displaying DHTML only popups instead of using buggy modal windows.
 *
 * By Subimage LLC
 * http://www.subimage.com
 *
 * Contributions by:
 * 	Eric Angel - tab index code
 * 	Scott - hiding/showing selects for IE users
 *	Todd Huss - inserting modal dynamically and anchor classes
 *
 * Up to date code can be found at http://submodal.googlecode.com
 */

// Popup code
var gPopupMask = null;
var gPopupContainer = null;
var gPopFrame = null;
var gReturnFunc;
var gPopupIsShown = false;
var gDefaultPage = null;
var gHideSelects = false;
var gReturnVal = null;

var gTabIndexes = new Array();
// Pre-defined list of tags we want to disable/enable tabbing into
var gTabbableTags = new Array("A","BUTTON","TEXTAREA","INPUT","IFRAME");	

// If using Mozilla or Firefox, use Tab-key trap.
if (!document.all) {
	document.onkeypress = keyDownHandler;
}

/**
 * Initializes popup code on load.	
 */
function initPopUp() {
	// Add the HTML to the body
        //alert(gDefaultPage);
	theBody = document.getElementsByTagName('BODY')[0];
	popmask = document.createElement('div');
	popmask.id = 'popupMask';
	popcont = document.createElement('div');
	popcont.id = 'popupContainer';
	popcont.innerHTML = '' +
		'<div id="popupInner">' +
			'<div id="popupTitleBar">' +
				'<div id="popupTitle"></div>' +
				'<div id="popupControls" style="padding:5px;">' +
					'<img src="../images/close.gif" onclick="hidePopWin(false);" id="popCloseBox" />' +
				'</div>' +
			'</div>' +
			'<iframe src="'+ gDefaultPage +'" style="width:100%;height:500px;background-color:transparent;" scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe>' +
		'</div>';
	theBody.appendChild(popmask);
	theBody.appendChild(popcont);
	
	gPopupMask = document.getElementById("popupMask");
	gPopupContainer = document.getElementById("popupContainer");
	gPopFrame = document.getElementById("popupFrame");	
	
	// check to see if this is IE version 6 or lower. hide select boxes if so
	// maybe they'll fix this in version 7?
	var brsVersion = parseInt(window.navigator.appVersion.charAt(0), 10);
	if (brsVersion <= 6 && window.navigator.userAgent.indexOf("MSIE") > -1) {
		gHideSelects = true;
	}
	
	// Add onclick handlers to 'a' elements of class submodal or submodal-width-height
	var elms = document.getElementsByTagName('a');
	for (i = 0; i < elms.length; i++) {
		if (elms[i].className.indexOf("submodal") == 0) { 
			// var onclick = 'function (){showPopWin(\''+elms[i].href+'\','+width+', '+height+', null);return false;};';
			// elms[i].onclick = eval(onclick);
			elms[i].onclick = function(){
				// default width and height
				var width = 400;
				var height = 200;
				// Parse out optional width and height from className
				params = this.className.split('-');
				if (params.length == 3) {
					width = parseInt(params[1]);
					height = parseInt(params[2]);
				}
				showPopWin(this.href,width,height,null); return false;
			}
		}
	}
}
//addEvent(window, "load", initPopUp);

 /**
	* @argument width - int in pixels
	* @argument height - int in pixels
	* @argument url - url to display
	* @argument returnFunc - function to call when returning true from the window.
	* @argument showCloseBox - show the close box - default true
	*/
function showPopWin(url, width, height, returnFunc, showCloseBox) {
	// show or hide the window close widget
        //alert(url);
        gDefaultPage = url;

        initPopUp();
	if (showCloseBox == null || showCloseBox == true) {
		document.getElementById("popCloseBox").style.display = "block";
	} else {
		document.getElementById("popCloseBox").style.display = "none";
	}
	gPopupIsShown = true;
	disableTabIndexes();
	gPopupMask.style.display = "block";
	gPopupContainer.style.display = "block";
	// calculate where to place the window on screen
	centerPopWin(width, height);
	
	var titleBarHeight = parseInt(document.getElementById("popupTitleBar").offsetHeight, 10);


	gPopupContainer.style.width = width + "px";
	gPopupContainer.style.height = (height+titleBarHeight) + "px";
	setMaskSize();

	// need to set the width of the iframe to the title bar width because of the dropshadow
	// some oddness was occuring and causing the frame to poke outside the border in IE6
	gPopFrame.style.width = parseInt(document.getElementById("popupTitleBar").offsetWidth, 10) + "px";
	gPopFrame.style.height = (height) + "px";
	
	// set the url
	//gPopFrame.src = url;
	
	gReturnFunc = returnFunc;
	// for IE
	if (gHideSelects == true) {
		hideSelectBoxes();
	}
	
	window.setTimeout("setPopTitle();", 600);
}

//
var gi = 0;
function centerPopWin(width, height) {
    
	if (gPopupIsShown == true) {
		if (width == null || isNaN(width)) {
			width = gPopupContainer.offsetWidth;
		}
		if (height == null) {
			height = gPopupContainer.offsetHeight;
		}
		
		//var theBody = document.documentElement;
		var theBody = document.getElementsByTagName("BODY")[0];
		//theBody.style.overflow = "hidden";
		var scTop = parseInt(getScrollTop(),10);
		var scLeft = parseInt(theBody.scrollLeft,10);
	
		setMaskSize();
		
		//window.status = gPopupMask.style.top + " " + gPopupMask.style.left + " " + gi++;
		
		var titleBarHeight = parseInt(document.getElementById("popupTitleBar").offsetHeight, 10);
		
		var fullHeight = getViewportHeight();
		var fullWidth = getViewportWidth();
		
		gPopupContainer.style.top = (scTop + ((fullHeight - (height+titleBarHeight)) / 2)) + "px";
		gPopupContainer.style.left =  (scLeft + ((fullWidth - width) / 2)) + "px";
		//alert(fullWidth + " " + width + " " + gPopupContainer.style.left);
	}
}
addEvent(window, "resize", centerPopWin);
addEvent(window, "scroll", centerPopWin);
window.onscroll = centerPopWin;


/**
 * Sets the size of the popup mask.
 *
 */
function setMaskSize() {
	var theBody = document.getElementsByTagName("BODY")[0];
			
	var fullHeight = getViewportHeight();
	var fullWidth = getViewportWidth();
	
	// Determine what's bigger, scrollHeight or fullHeight / width
	if (fullHeight > theBody.scrollHeight) {
		popHeight = fullHeight;
	} else {
		popHeight = theBody.scrollHeight;
	}
	
	if (fullWidth > theBody.scrollWidth) {
		popWidth = fullWidth;
	} else {
		popWidth = theBody.scrollWidth;
	}
	
	gPopupMask.style.height = popHeight + "px";
	gPopupMask.style.width = popWidth + "px";
}

/**
 * @argument callReturnFunc - bool - determines if we call the return function specified
 * @argument returnVal - anything - return value 
 */
function hidePopWin(callReturnFunc) {
    
	gPopupIsShown = false;
	var theBody = document.getElementsByTagName("BODY")[0];
	theBody.style.overflow = "";
	restoreTabIndexes();
	if (gPopupMask == null) {
		return;
	}
	gPopupMask.style.display = "none";
	gPopupContainer.style.display = "none";
	if (callReturnFunc == true && gReturnFunc != null) {
		// Set the return code to run in a timeout.
		// Was having issues using with an Ajax.Request();
		gReturnVal = window.frames["popupFrame"].returnVal;
		window.setTimeout('gReturnFunc(gReturnVal);', 1);
	}
	gPopFrame.src = gDefaultPage;
	// display all select boxes
	if (gHideSelects == true) {
		displaySelectBoxes();
	}
        gDefaultPage = null;
}

/**
 * Sets the popup title based on the title of the html document it contains.
 * Uses a timeout to keep checking until the title is valid.
 */
function setPopTitle() {
	return;
	if (window.frames["popupFrame"].document.title == null) {
		window.setTimeout("setPopTitle();", 10);
	} else {
		document.getElementById("popupTitle").innerHTML = window.frames["popupFrame"].document.title;
	}
}

// Tab key trap. iff popup is shown and key was [TAB], suppress it.
// @argument e - event - keyboard event that caused this function to be called.
function keyDownHandler(e) {
    if (gPopupIsShown && e.keyCode == 9)  return false;
}

// For IE.  Go through predefined tags and disable tabbing into them.
function disableTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				gTabIndexes[i] = tagElements[k].tabIndex;
				tagElements[k].tabIndex="-1";
				i++;
			}
		}
	}
}

// For IE. Restore tab-indexes.
function restoreTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				tagElements[k].tabIndex = gTabIndexes[i];
				tagElements[k].tabEnabled = true;
				i++;
			}
		}
	}
}


/**
 * Hides all drop down form select boxes on the screen so they do not appear above the mask layer.
 * IE has a problem with wanted select form tags to always be the topmost z-index or layer
 *
 * Thanks for the code Scott!
 */
function hideSelectBoxes() {
  var x = document.getElementsByTagName("SELECT");

  for (i=0;x && i < x.length; i++) {
    x[i].style.visibility = "hidden";
  }
}

/**
 * Makes all drop down form select boxes on the screen visible so they do not 
 * reappear after the dialog is closed.
 * 
 * IE has a problem with wanting select form tags to always be the 
 * topmost z-index or layer.
 */
function displaySelectBoxes() {
  var x = document.getElementsByTagName("SELECT");

  for (i=0;x && i < x.length; i++){
    x[i].style.visibility = "visible";
  }
}


// FROM: /javascripts/tabber.js?1288225651
/*==================================================
  $Id: tabber.js,v 1.9 2006/04/27 20:51:51 pat Exp $
  tabber.js by Patrick Fitzgerald pat@barelyfitz.com

  Documentation can be found at the following URL:
  http://www.barelyfitz.com/projects/tabber/

  License (http://www.opensource.org/licenses/mit-license.php)

  Copyright (c) 2006 Patrick Fitzgerald

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ==================================================*/

function tabberObj(argsObj)
{
  var arg; /* name of an argument to override */

  /* Element for the main tabber div. If you supply this in argsObj,
     then the init() method will be called.
  */
  this.div = null;

  /* Class of the main tabber div */
  this.classMain = "tabber";

  /* Rename classMain to classMainLive after tabifying
     (so a different style can be applied)
  */
  this.classMainLive = "tabberlive";

  /* Class of each DIV that contains a tab */
  this.classTab = "tabbertab";

  /* Class to indicate which tab should be active on startup */
  this.classTabDefault = "tabbertabdefault";

  /* Class for the navigation UL */
  this.classNav = "tabbernav";

  /* When a tab is to be hidden, instead of setting display='none', we
     set the class of the div to classTabHide. In your screen
     stylesheet you should set classTabHide to display:none.  In your
     print stylesheet you should set display:block to ensure that all
     the information is printed.
  */
  this.classTabHide = "tabbertabhide";

  /* Class to set the navigation LI when the tab is active, so you can
     use a different style on the active tab.
  */
  this.classNavActive = "tabberactive";

  /* Elements that might contain the title for the tab, only used if a
     title is not specified in the TITLE attribute of DIV classTab.
  */
  this.titleElements = ['h2','h3','h4','h5','h6'];

  /* Should we strip out the HTML from the innerHTML of the title elements?
     This should usually be true.
  */
  this.titleElementsStripHTML = true;

  /* If the user specified the tab names using a TITLE attribute on
     the DIV, then the browser will display a tooltip whenever the
     mouse is over the DIV. To prevent this tooltip, we can remove the
     TITLE attribute after getting the tab name.
  */
  this.removeTitle = true;

  /* If you want to add an id to each link set this to true */
  this.addLinkId = false;

  /* If addIds==true, then you can set a format for the ids.
     <tabberid> will be replaced with the id of the main tabber div.
     <tabnumberzero> will be replaced with the tab number
       (tab numbers starting at zero)
     <tabnumberone> will be replaced with the tab number
       (tab numbers starting at one)
     <tabtitle> will be replaced by the tab title
       (with all non-alphanumeric characters removed)
   */
  this.linkIdFormat = '<tabberid>nav<tabnumberone>';

  /* You can override the defaults listed above by passing in an object:
     var mytab = new tabber({property:value,property:value});
  */
  for (arg in argsObj) { this[arg] = argsObj[arg]; }

  /* Create regular expressions for the class names; Note: if you
     change the class names after a new object is created you must
     also change these regular expressions.
  */
  this.REclassMain = new RegExp('\\b' + this.classMain + '\\b', 'gi');
  this.REclassMainLive = new RegExp('\\b' + this.classMainLive + '\\b', 'gi');
  this.REclassTab = new RegExp('\\b' + this.classTab + '\\b', 'gi');
  this.REclassTabDefault = new RegExp('\\b' + this.classTabDefault + '\\b', 'gi');
  this.REclassTabHide = new RegExp('\\b' + this.classTabHide + '\\b', 'gi');

  /* Array of objects holding info about each tab */
  this.tabs = new Array();

  /* If the main tabber div was specified, call init() now */
  if (this.div) {

    this.init(this.div);

    /* We don't need the main div anymore, and to prevent a memory leak
       in IE, we must remove the circular reference between the div
       and the tabber object. */
    this.div = null;
  }
}


/*--------------------------------------------------
  Methods for tabberObj
  --------------------------------------------------*/


tabberObj.prototype.init = function(e)
{
  /* Set up the tabber interface.

     e = element (the main containing div)

     Example:
     init(document.getElementById('mytabberdiv'))
   */

  var
  childNodes, /* child nodes of the tabber div */
  i, i2, /* loop indices */
  t, /* object to store info about a single tab */
  defaultTab=0, /* which tab to select by default */
  DOM_ul, /* tabbernav list */
  DOM_li, /* tabbernav list item */
  DOM_a, /* tabbernav link */
  aId, /* A unique id for DOM_a */
  headingElement; /* searching for text to use in the tab */

  /* Verify that the browser supports DOM scripting */
  if (!document.getElementsByTagName) { return false; }

  /* If the main DIV has an ID then save it. */
  if (e.id) {
    this.id = e.id;
  }

  /* Clear the tabs array (but it should normally be empty) */
  this.tabs.length = 0;

  /* Loop through an array of all the child nodes within our tabber element. */
  childNodes = e.childNodes;
  for(i=0; i < childNodes.length; i++) {

    /* Find the nodes where class="tabbertab" */
    if(childNodes[i].className &&
       childNodes[i].className.match(this.REclassTab)) {
      
      /* Create a new object to save info about this tab */
      t = new Object();
      
      /* Save a pointer to the div for this tab */
      t.div = childNodes[i];
      
      /* Add the new object to the array of tabs */
      this.tabs[this.tabs.length] = t;

      /* If the class name contains classTabDefault,
	 then select this tab by default.
      */
      if (childNodes[i].className.match(this.REclassTabDefault)) {
	defaultTab = this.tabs.length-1;
      }
    }
  }

  /* Create a new UL list to hold the tab headings */
  DOM_ul = document.createElement("ul");
  DOM_ul.className = this.classNav;
  
  /* Loop through each tab we found */
  for (i=0; i < this.tabs.length; i++) {

    t = this.tabs[i];

    /* Get the label to use for this tab:
       From the title attribute on the DIV,
       Or from one of the this.titleElements[] elements,
       Or use an automatically generated number.
     */
    t.headingText = t.div.title;

    /* Remove the title attribute to prevent a tooltip from appearing */
    if (this.removeTitle) { t.div.title = ''; }

    if (!t.headingText) {

      /* Title was not defined in the title of the DIV,
	 So try to get the title from an element within the DIV.
	 Go through the list of elements in this.titleElements
	 (typically heading elements ['h2','h3','h4'])
      */
      for (i2=0; i2<this.titleElements.length; i2++) {
	headingElement = t.div.getElementsByTagName(this.titleElements[i2])[0];
	if (headingElement) {
	  t.headingText = headingElement.innerHTML;
	  if (this.titleElementsStripHTML) {
	    t.headingText.replace(/<br>/gi," ");
	    t.headingText = t.headingText.replace(/<[^>]+>/g,"");
	  }
	  break;
	}
      }
    }

    if (!t.headingText) {
      /* Title was not found (or is blank) so automatically generate a
         number for the tab.
      */
      t.headingText = i + 1;
    }

    /* Create a list element for the tab */
    DOM_li = document.createElement("li");

    /* Save a reference to this list item so we can later change it to
       the "active" class */
    t.li = DOM_li;

    /* Create a link to activate the tab */
    DOM_a = document.createElement("a");
    DOM_a.appendChild(document.createTextNode(t.headingText));
    DOM_a.href = "javascript:void(null);";
    DOM_a.title = t.headingText;
    DOM_a.onclick = this.navClick;

    /* Add some properties to the link so we can identify which tab
       was clicked. Later the navClick method will need this.
    */
    DOM_a.tabber = this;
    DOM_a.tabberIndex = i;

    /* Do we need to add an id to DOM_a? */
    if (this.addLinkId && this.linkIdFormat) {

      /* Determine the id name */
      aId = this.linkIdFormat;
      aId = aId.replace(/<tabberid>/gi, this.id);
      aId = aId.replace(/<tabnumberzero>/gi, i);
      aId = aId.replace(/<tabnumberone>/gi, i+1);
      aId = aId.replace(/<tabtitle>/gi, t.headingText.replace(/[^a-zA-Z0-9\-]/gi, ''));

      DOM_a.id = aId;
    }

    /* Add the link to the list element */
    DOM_li.appendChild(DOM_a);

    /* Add the list element to the list */
    DOM_ul.appendChild(DOM_li);
  }

  /* Add the UL list to the beginning of the tabber div */
  e.insertBefore(DOM_ul, e.firstChild);

  /* Make the tabber div "live" so different CSS can be applied */
  e.className = e.className.replace(this.REclassMain, this.classMainLive);

  /* Activate the default tab, and do not call the onclick handler */
  this.tabShow(defaultTab);

  /* If the user specified an onLoad function, call it now. */
  if (typeof this.onLoad == 'function') {
    this.onLoad({tabber:this});
  }

  return this;
};


tabberObj.prototype.navClick = function(event)
{
  /* This method should only be called by the onClick event of an <A>
     element, in which case we will determine which tab was clicked by
     examining a property that we previously attached to the <A>
     element.

     Since this was triggered from an onClick event, the variable
     "this" refers to the <A> element that triggered the onClick
     event (and not to the tabberObj).

     When tabberObj was initialized, we added some extra properties
     to the <A> element, for the purpose of retrieving them now. Get
     the tabberObj object, plus the tab number that was clicked.
  */

  
  var
  rVal, /* Return value from the user onclick function */
  a, /* element that triggered the onclick event */
  self, /* the tabber object */
  tabberIndex, /* index of the tab that triggered the event */
  onClickArgs; /* args to send the onclick function */

  a = this;
  if (!a.tabber) { return false; }

  self = a.tabber;
  tabberIndex = a.tabberIndex;

  /* Remove focus from the link because it looks ugly.
     I don't know if this is a good idea...
  */
  a.blur();

  /* If the user specified an onClick function, call it now.
     If the function returns false then do not continue.
  */
  if (typeof self.onClick == 'function') {

    onClickArgs = {'tabber':self, 'index':tabberIndex, 'event':event};

    /* IE uses a different way to access the event object */
    if (!event) { onClickArgs.event = window.event; }

    rVal = self.onClick(onClickArgs);
    if (rVal === false) { return false; }
  }

  self.tabShow(tabberIndex);

  return false;
};


tabberObj.prototype.tabHideAll = function()
{
  var i; /* counter */

  /* Hide all tabs and make all navigation links inactive */
  for (i = 0; i < this.tabs.length; i++) {
    this.tabHide(i);
  }
};


tabberObj.prototype.tabHide = function(tabberIndex)
{
  var div;

  if (!this.tabs[tabberIndex]) { return false; }

  /* Hide a single tab and make its navigation link inactive */
  div = this.tabs[tabberIndex].div;

  /* Hide the tab contents by adding classTabHide to the div */
  if (!div.className.match(this.REclassTabHide)) {
    div.className += ' ' + this.classTabHide;
  }
  this.navClearActive(tabberIndex);

  return this;
};


tabberObj.prototype.tabShow = function(tabberIndex)
{
  /* Show the tabberIndex tab and hide all the other tabs */

  var div;

  if (!this.tabs[tabberIndex]) { return false; }

  /* Hide all the tabs first */
  this.tabHideAll();

  /* Get the div that holds this tab */
  div = this.tabs[tabberIndex].div;

  /* Remove classTabHide from the div */
  div.className = div.className.replace(this.REclassTabHide, '');

  /* Mark this tab navigation link as "active" */
  this.navSetActive(tabberIndex);

  /* If the user specified an onTabDisplay function, call it now. */
  if (typeof this.onTabDisplay == 'function') {
    this.onTabDisplay({'tabber':this, 'index':tabberIndex});
    
  }

  return this;
};

tabberObj.prototype.navSetActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that only one nav item can be active at a time.
  */

  /* Set classNavActive for the navigation list item */
  this.tabs[tabberIndex].li.className = this.classNavActive;
  fleXenv.fleXcrollMain('ui');
  fleXenv.fleXcrollMain('uix');
  clear_questions();

  return this;
};


tabberObj.prototype.navClearActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that one nav should always be active.
  */

  /* Remove classNavActive from the navigation list item */
  this.tabs[tabberIndex].li.className = '';

  return this;
};


/*==================================================*/


function tabberAutomatic(tabberArgs)
{
  /* This function finds all DIV elements in the document where
     class=tabber.classMain, then converts them to use the tabber
     interface.

     tabberArgs = an object to send to "new tabber()"
  */
  var
    tempObj, /* Temporary tabber object */
    divs, /* Array of all divs on the page */
    i; /* Loop index */

  if (!tabberArgs) { tabberArgs = {}; }

  /* Create a tabber object so we can get the value of classMain */
  tempObj = new tabberObj(tabberArgs);

  /* Find all DIV elements in the document that have class=tabber */

  /* First get an array of all DIV elements and loop through them */
  divs = document.getElementsByTagName("div");
  for (i=0; i < divs.length; i++) {
    
    /* Is this DIV the correct class? */
    if (divs[i].className &&
	divs[i].className.match(tempObj.REclassMain)) {
      
      /* Now tabify the DIV */
      tabberArgs.div = divs[i];
      divs[i].tabber = new tabberObj(tabberArgs);
    }
  }
  
  return this;
}


/*==================================================*/


function tabberAutomaticOnLoad(tabberArgs)
{
  /* This function adds tabberAutomatic to the window.onload event,
     so it will run after the document has finished loading.
  */
  var oldOnLoad;

  if (!tabberArgs) { tabberArgs = {}; }

  /* Taken from: http://simon.incutio.com/archive/2004/05/26/addLoadEvent */

  oldOnLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = function() {
      tabberAutomatic(tabberArgs);
    };
  } else {
    window.onload = function() {
      oldOnLoad();
      tabberAutomatic(tabberArgs);
    };
  }
}


/*==================================================*/


/* Run tabberAutomaticOnload() unless the "manualStartup" option was specified */

if (typeof tabberOptions == 'undefined') {

    tabberAutomaticOnLoad();

} else {

  if (!tabberOptions['manualStartup']) {
    tabberAutomaticOnLoad(tabberOptions);
  }

}



// FROM: /javascripts/jwplayer.js?1288225651
jwplayer=function(a){return jwplayer.constructor(a)};jwplayer.constructor=function(a){};$jw=jwplayer;jwplayer.utils=function(){};jwplayer.utils.typeOf=function(b){var a=typeof b;if(a==="object"){if(b){if(b instanceof Array){a="array"}}else{a="null"}}return a};jwplayer.utils.extend=function(){var a=jwplayer.utils.extend["arguments"];if(a.length>1){for(var b=1;b<a.length;b++){for(element in a[b]){a[0][element]=a[b][element]}}return a[0]}return null};jwplayer.utils.extension=function(a){return a.substr(a.lastIndexOf(".")+1,a.length).toLowerCase()};jwplayer.utils.html=function(a,b){a.innerHTML=b};jwplayer.utils.append=function(a,b){a.appendChild(b)};jwplayer.utils.wrap=function(a,b){a.parentNode.replaceChild(b,a);b.appendChild(a)};jwplayer.utils.ajax=function(d,c,a){var b;if(window.XMLHttpRequest){b=new XMLHttpRequest()}else{b=new ActiveXObject("Microsoft.XMLHTTP")}b.onreadystatechange=function(){if(b.readyState===4){if(b.status===200){if(c){c(b)}}else{if(a){a(d)}}}};b.open("GET",d,true);b.send(null);return b};jwplayer.utils.load=function(b,c,a){b.onreadystatechange=function(){if(b.readyState===4){if(b.status===200){if(c){c()}}else{if(a){a()}}}}};jwplayer.utils.find=function(b,a){return b.getElementsByTagName(a)};jwplayer.utils.append=function(a,b){a.appendChild(b)};jwplayer.utils.isIE=function(){return(!+"\v1")};jwplayer.utils.isIOS=function(){var a=navigator.userAgent.toLowerCase();return(a.match(/iP(hone|ad)/i)!==null)};jwplayer.utils.hasHTML5=function(b){var a=document.createElement("video");if(!!a.canPlayType){if(b){var d={};if(b.playlist&&b.playlist.length){d.file=b.playlist[0].file;d.levels=b.playlist[0].levels}else{d.file=b.file;d.levels=b.levels}if(d.file){return jwplayer.utils.vidCanPlay(a,d.file)}else{if(d.levels&&d.levels.length){for(var c=0;c<d.levels.length;c++){if(d.levels[c].file&&jwplayer.utils.vidCanPlay(a,d.levels[c].file)){return true}}}}}else{return true}}return false};jwplayer.utils.vidCanPlay=function(b,a){var c=jwplayer.utils.strings.extension(a);if(jwplayer.utils.extensionmap[c]!==undefined){sourceType=jwplayer.utils.extensionmap[c]}else{sourceType="video/"+c+";"}return b.canPlayType(sourceType)};jwplayer.utils.hasFlash=function(){return(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]!="undefined")||(typeof window.ActiveXObject!="undefined")};(function(e){e.utils.mediaparser=function(){};var g={element:{width:"width",height:"height",id:"id","class":"className",name:"name"},media:{src:"file",preload:"preload",autoplay:"autostart",loop:"repeat",controls:"controls"},source:{src:"file",type:"type",media:"media","data-jw-width":"width","data-jw-bitrate":"bitrate"},video:{poster:"image"}};var f={};e.utils.mediaparser.parseMedia=function(i){return d(i)};function c(j,i){if(i===undefined){i=g[j]}else{e.utils.extend(i,g[j])}return i}function d(m,i){if(f[m.tagName.toLowerCase()]&&(i===undefined)){return f[m.tagName.toLowerCase()](m)}else{i=c("element",i);var n={};for(var j in i){if(j!="length"){var l=m.getAttribute(j);if(!(l===""||l===undefined||l===null)){n[i[j]]=m.getAttribute(j)}}}var k=m.style["#background-color"];if(k&&!(k=="transparent"||k=="rgba(0, 0, 0, 0)")){n.screencolor=k}return n}}function h(o,k){k=c("media",k);var m=[];if(e.utils.isIE()){var l=o.nextSibling;if(l!==undefined){while(l.tagName.toLowerCase()=="source"){m.push(a(l));l=l.nextSibling}}}else{var j=e.utils.selectors("source",o);for(var n in j){if(!isNaN(n)){m.push(a(j[n]))}}}var p=d(o,k);if(p.file!==undefined){m[0]={file:p.file}}p.levels=m;return p}function a(k,j){j=c("source",j);var i=d(k,j);i.width=i.width?i.width:0;i.bitrate=i.bitrate?i.bitrate:0;return i}function b(k,j){j=c("video",j);var i=h(k,j);return i}e.utils.mediaparser.replaceMediaElement=function(i,k){if(e.utils.isIE()){var l=false;var n=[];var m=i.nextSibling;while(m&&!l){n.push(m);if(m.nodeType==1&&m.tagName.toLowerCase()==("/")+i.tagName.toLowerCase()){l=true}m=m.nextSibling}if(l){while(n.length>0){var j=n.pop();j.parentNode.removeChild(j)}}i.outerHTML=k}};f.media=h;f.audio=h;f.source=a;f.video=b})(jwplayer);jwplayer.utils.selectors=function(a,c){if(c===undefined){c=document}a=jwplayer.utils.strings.trim(a);var b=a.charAt(0);if(b=="#"){return c.getElementById(a.substr(1))}else{if(b=="."){if(c.getElementsByClassName){return c.getElementsByClassName(a.substr(1))}else{return jwplayer.utils.selectors.getElementsByTagAndClass("*",a.substr(1))}}else{if(a.indexOf(".")>0){selectors=a.split(".");return jwplayer.utils.selectors.getElementsByTagAndClass(selectors[0],selectors[1])}else{return c.getElementsByTagName(a)}}}return null};jwplayer.utils.selectors.getElementsByTagAndClass=function(d,g,f){elements=[];if(f===undefined){f=document}var e=f.getElementsByTagName(d);for(var c=0;c<e.length;c++){if(e[c].className!==undefined){var b=e[c].className.split(" ");for(var a=0;a<b.length;a++){if(b[a]==g){elements.push(e[c])}}}}return elements};jwplayer.utils.strings=function(){};jwplayer.utils.strings.trim=function(a){return a.replace(/^\s*/,"").replace(/\s*$/,"")};jwplayer.utils.strings.extension=function(a){return a.substr(a.lastIndexOf(".")+1,a.length).toLowerCase()};(function(a){a.utils.extensionmap={"3gp":"video/3gpp","3gpp":"video/3gpp","3g2":"video/3gpp2","3gpp2":"video/3gpp2",flv:"video/x-flv",f4a:"audio/mp4",f4b:"audio/mp4",f4p:"video/mp4",f4v:"video/mp4",mov:"video/quicktime",m4a:"audio/mp4",m4b:"audio/mp4",m4p:"audio/mp4",m4v:"video/mp4",mkv:"video/x-matroska",mp4:"video/mp4",sdp:"application/sdp",vp6:"video/x-vp6",aac:"audio/aac",mp3:"audio/mp3",ogg:"audio/ogg",ogv:"video/ogg",webm:"video/webm"}})(jwplayer);(function(b){var a=[];b.constructor=function(c){return b.api.selectPlayer(c)};b.api=function(){};b.api.events={API_READY:"jwplayerAPIReady",JWPLAYER_READY:"jwplayerReady",JWPLAYER_FULLSCREEN:"jwplayerFullscreen",JWPLAYER_RESIZE:"jwplayerResize",JWPLAYER_ERROR:"jwplayerError",JWPLAYER_MEDIA_BUFFER:"jwplayerMediaBuffer",JWPLAYER_MEDIA_BUFFER_FULL:"jwplayerMediaBufferFull",JWPLAYER_MEDIA_ERROR:"jwplayerMediaError",JWPLAYER_MEDIA_LOADED:"jwplayerMediaLoaded",JWPLAYER_MEDIA_COMPLETE:"jwplayerMediaComplete",JWPLAYER_MEDIA_TIME:"jwplayerMediaTime",JWPLAYER_MEDIA_VOLUME:"jwplayerMediaVolume",JWPLAYER_MEDIA_META:"jwplayerMediaMeta",JWPLAYER_MEDIA_MUTE:"jwplayerMediaMute",JWPLAYER_PLAYER_STATE:"jwplayerPlayerState",JWPLAYER_PLAYLIST_LOADED:"jwplayerPlaylistLoaded",JWPLAYER_PLAYLIST_ITEM:"jwplayerPlaylistItem"};b.api.events.state={BUFFERING:"BUFFERING",IDLE:"IDLE",PAUSED:"PAUSED",PLAYING:"PLAYING"};b.api.PlayerAPI=function(d){this.container=d;this.id=d.id;var j={};var o={};var c=[];var g=undefined;var i=false;var h=[];var m=d.outerHTML;var n={};var k=0;this.setPlayer=function(p){g=p};this.stateListener=function(p,q){if(!o[p]){o[p]=[];this.eventListener(b.api.events.JWPLAYER_PLAYER_STATE,f(p))}o[p].push(q);return this};function f(p){return function(r){var q=r.newstate,t=r.oldstate;if(q==p){var s=o[q];if(s){for(var u in s){if(typeof s[u]=="function"){s[u].call(this,{oldstate:t,newstate:q})}}}}}}this.addInternalListener=function(p,q){p.jwAddEventListener(q,'function(dat) { jwplayer("'+this.id+'").dispatchEvent("'+q+'", dat); }')};this.eventListener=function(p,q){if(!j[p]){j[p]=[];if(g&&i){this.addInternalListener(g,p)}}j[p].push(q);return this};this.dispatchEvent=function(r){if(j[r]){var q=e(r,arguments[1]);for(var p in j[r]){if(typeof j[r][p]=="function"){j[r][p].call(this,q)}}}};function e(q,p){var r=b.utils.extend({},p);if(q==b.api.events.JWPLAYER_FULLSCREEN){r.fullscreen=r.message;delete r.message}else{if(q==b.api.events.JWPLAYER_PLAYLIST_ITEM){if(r.item&&r.index===undefined){r.index=r.item;delete r.item}}else{if(typeof r.data=="object"){r=b.utils.extend(r,r.data);delete r.data}}}return r}this.callInternal=function(q,p){if(i){if(typeof g!="undefined"&&typeof g[q]=="function"){if(p!==undefined){return(g[q])(p)}else{return(g[q])()}}return null}else{h.push({method:q,parameters:p})}};this.playerReady=function(r){i=true;if(!g){this.setPlayer(document.getElementById(r.id))}this.container=document.getElementById(this.id);for(var p in j){this.addInternalListener(g,p)}this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM,function(s){if(s.index!==undefined){k=s.index}else{if(s.item!==undefined){k=s.item}}n={}});this.eventListener(b.api.events.JWPLAYER_MEDIA_META,function(s){b.utils.extend(n,s.metadata)});this.dispatchEvent(b.api.events.API_READY);while(h.length>0){var q=h.shift();this.callInternal(q.method,q.parameters)}};this.getItemMeta=function(){return n};this.getCurrentItem=function(){return k};this.destroy=function(){j={};h=[];if(this.container.outerHTML!=m){b.api.destroyPlayer(this.id,m)}};function l(r,t,s){var p=[];if(!t){t=0}if(!s){s=r.length-1}for(var q=t;q<=s;q++){p.push(r[q])}return p}};b.api.PlayerAPI.prototype={container:undefined,options:undefined,id:undefined,getBuffer:function(){return this.callInternal("jwGetBuffer")},getDuration:function(){return this.callInternal("jwGetDuration")},getFullscreen:function(){return this.callInternal("jwGetFullscreen")},getHeight:function(){return this.callInternal("jwGetHeight")},getLockState:function(){return this.callInternal("jwGetLockState")},getMeta:function(){return this.getItemMeta()},getMute:function(){return this.callInternal("jwGetMute")},getPlaylist:function(){var d=this.callInternal("jwGetPlaylist");for(var c=0;c<d.length;c++){if(d[c].index===undefined){d[c].index=c}}return d},getPlaylistItem:function(c){if(c==undefined){c=this.getCurrentItem()}return this.getPlaylist()[c]},getPosition:function(){return this.callInternal("jwGetPosition")},getState:function(){return this.callInternal("jwGetState")},getVolume:function(){return this.callInternal("jwGetVolume")},getWidth:function(){return this.callInternal("jwGetWidth")},setFullscreen:function(c){if(c===undefined){this.callInternal("jwSetFullscreen",true)}else{this.callInternal("jwSetFullscreen",c)}return this},setMute:function(c){if(c===undefined){this.callInternal("jwSetMute",true)}else{this.callInternal("jwSetMute",c)}return this},lock:function(){return this},unlock:function(){return this},load:function(c){this.callInternal("jwLoad",c);return this},playlistItem:function(c){this.callInternal("jwPlaylistItem",c);return this},playlistPrev:function(){this.callInternal("jwPlaylistPrev");return this},playlistNext:function(){this.callInternal("jwPlaylistNext");return this},resize:function(d,c){this.container.width=d;this.container.height=c;return this},play:function(c){if(typeof c==="undefined"){var c=this.getState();if(c==b.api.events.state.PLAYING||c==b.api.events.state.BUFFERING){this.callInternal("jwPause")}else{this.callInternal("jwPlay")}}else{this.callInternal("jwPlay",c)}return this},pause:function(){var c=this.getState();switch(c){case b.api.events.state.PLAYING:case b.api.events.state.BUFFERING:this.callInternal("jwPause");break;case b.api.events.state.PAUSED:this.callInternal("jwPlay");break}return this},stop:function(){this.callInternal("jwStop");return this},seek:function(c){this.callInternal("jwSeek",c);return this},setVolume:function(c){this.callInternal("jwSetVolume",c);return this},onBufferChange:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER,c)},onBufferFull:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL,c)},onError:function(c){return this.eventListener(b.api.events.JWPLAYER_ERROR,c)},onFullscreen:function(c){return this.eventListener(b.api.events.JWPLAYER_FULLSCREEN,c)},onMeta:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_META,c)},onMute:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_MUTE,c)},onPlaylist:function(c){return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,c)},onPlaylistItem:function(c){return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM,c)},onReady:function(c){return this.eventListener(b.api.events.API_READY,c)},onResize:function(c){return this.eventListener(b.api.events.JWPLAYER_RESIZE,c)},onComplete:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE,c)},onTime:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_TIME,c)},onVolume:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_VOLUME,c)},onBuffer:function(c){return this.stateListener(b.api.events.state.BUFFERING,c)},onPause:function(c){return this.stateListener(b.api.events.state.PAUSED,c)},onPlay:function(c){return this.stateListener(b.api.events.state.PLAYING,c)},onIdle:function(c){return this.stateListener(b.api.events.state.IDLE,c)},setup:function(c){return this},remove:function(){this.destroy()},initializePlugin:function(c,d){return this}};b.api.selectPlayer=function(d){var c;if(d==undefined){d=0}if(d.nodeType){c=d}else{if(typeof d=="string"){c=document.getElementById(d)}}if(c){var e=b.api.playerById(c.id);if(e){return e}else{return b.api.addPlayer(new b.api.PlayerAPI(c))}}else{if(typeof d=="number"){return b.getPlayers()[d]}}return null};b.api.playerById=function(d){for(var c in a){if(a[c].id==d){return a[c]}}return null};b.api.addPlayer=function(d){for(var c in a){if(a[c]==d){return d}}a.push(d);return d};b.api.destroyPlayer=function(f,d){var e=-1;for(var h in a){if(a[h].id==f){e=h;continue}}if(e>=0){var c=document.getElementById(a[e].id);if(c){if(d){c.outerHTML=d}else{var g=document.createElement("div");g.setAttribute("id",c.id);c.parentNode.replaceChild(g,c)}}a.splice(e,1)}return null};b.getPlayers=function(){return a.slice(0)}})(jwplayer);var _userPlayerReady=(typeof playerReady=="function")?playerReady:undefined;playerReady=function(b){var a=jwplayer.api.playerById(b.id);if(a){a.playerReady(b)}if(_userPlayerReady){_userPlayerReady.call(this,b)}};(function(a){a.embed=function(){};a.embed.Embedder=function(c){this.constructor(c)};a.embed.defaults={width:400,height:300,players:[{type:"flash",src:"player.swf"},{type:"html5"}],components:{controlbar:{position:"over"}}};a.embed.Embedder.prototype={config:undefined,api:undefined,events:{},players:undefined,constructor:function(d){this.api=d;var c=a.utils.mediaparser.parseMedia(this.api.container);this.config=this.parseConfig(a.utils.extend({},a.embed.defaults,c,this.api.config))},embedPlayer:function(){var c=this.players[0];if(c&&c.type){switch(c.type){case"flash":if(a.utils.hasFlash()){if(this.config.file&&!this.config.provider){switch(a.utils.extension(this.config.file).toLowerCase()){case"webm":case"ogv":case"ogg":this.config.provider="video";break}}if(this.config.levels||this.config.playlist){this.api.onReady(this.loadAfterReady(this.config))}this.config.id=this.api.id;var e=a.embed.embedFlash(document.getElementById(this.api.id),c,this.config);this.api.container=e;this.api.setPlayer(e)}else{this.players.splice(0,1);return this.embedPlayer()}break;case"html5":if(a.utils.hasHTML5(this.config)){var d=a.embed.embedHTML5(document.getElementById(this.api.id),c,this.config);this.api.container=document.getElementById(this.api.id);this.api.setPlayer(d)}else{this.players.splice(0,1);return this.embedPlayer()}break}}else{this.api.container.innerHTML="<p>No suitable players found</p>"}this.setupEvents();return this.api},setupEvents:function(){for(evt in this.events){if(typeof this.api[evt]=="function"){(this.api[evt]).call(this.api,this.events[evt])}}},loadAfterReady:function(c){return function(e){if(c.playlist){this.load(c.playlist)}else{if(c.levels){var d=this.getPlaylistItem(0);if(!d){d={file:c.levels[0].file,provider:(c.provider?c.provider:"video")}}if(!d.image){d.image=c.image}d.levels=c.levels;this.load(d)}}}},parseConfig:function(c){var d=a.utils.extend({},c);if(d.events){this.events=d.events;delete d.events}if(d.players){this.players=d.players;delete d.players}if(d.plugins){if(typeof d.plugins=="object"){d=a.utils.extend(d,a.embed.parsePlugins(d.plugins))}}if(d.playlist&&typeof d.playlist==="string"&&!d["playlist.position"]){d["playlist.position"]=d.playlist;delete d.playlist}if(d.controlbar&&typeof d.controlbar==="string"&&!d["controlbar.position"]){d["controlbar.position"]=d.controlbar;delete d.controlbar}return d}};a.embed.embedFlash=function(e,i,d){var j=a.utils.extend({},d);var g=j.width;delete j.width;var c=j.height;delete j.height;delete j.levels;delete j.playlist;a.embed.parseConfigBlock(j,"components");a.embed.parseConfigBlock(j,"providers");if(a.utils.isIE()){var f='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+g+'" height="'+c+'" id="'+e.id+'" name="'+e.id+'">';f+='<param name="movie" value="'+i.src+'">';f+='<param name="allowfullscreen" value="true">';f+='<param name="allowscriptaccess" value="always">';f+='<param name="wmode" value="opaque">';f+='<param name="flashvars" value="'+a.embed.jsonToFlashvars(j)+'">';f+="</object>";if(e.tagName.toLowerCase()=="video"){a.utils.mediaparser.replaceMediaElement(e,f)}else{e.outerHTML=f}return document.getElementById(e.id)}else{var h=document.createElement("object");h.setAttribute("type","application/x-shockwave-flash");h.setAttribute("data",i.src);h.setAttribute("width",g);h.setAttribute("height",c);h.setAttribute("id",e.id);h.setAttribute("name",e.id);a.embed.appendAttribute(h,"allowfullscreen","true");a.embed.appendAttribute(h,"allowscriptaccess","always");a.embed.appendAttribute(h,"wmode","opaque");a.embed.appendAttribute(h,"flashvars",a.embed.jsonToFlashvars(j));e.parentNode.replaceChild(h,e);return h}};a.embed.embedHTML5=function(d,f,e){if(a.html5){d.innerHTML="";var c=a.utils.extend({screencolor:"0x000000"},e);a.embed.parseConfigBlock(c,"components");if(c.levels&&!c.sources){c.sources=e.levels}if(c.skin&&c.skin.toLowerCase().indexOf(".zip")>0){c.skin=c.skin.replace(/\.zip/i,".xml")}return new (a.html5(d)).setup(c)}else{return null}};a.embed.appendAttribute=function(d,c,e){var f=document.createElement("param");f.setAttribute("name",c);f.setAttribute("value",e);d.appendChild(f)};a.embed.jsonToFlashvars=function(d){var c="";for(key in d){c+=key+"="+escape(d[key])+"&"}return c.substring(0,c.length-1)};a.embed.parsePlugins=function(e){if(!e){return{}}var g={},f=[];for(plugin in e){var d=plugin.indexOf("-")>0?plugin.substring(0,plugin.indexOf("-")):plugin;var c=e[plugin];f.push(plugin);for(param in c){g[d+"."+param]=c[param]}}g.plugins=f.join(",");return g};a.embed.parseConfigBlock=function(f,e){if(f[e]){var h=f[e];for(var d in h){var c=h[d];if(typeof c=="string"){if(!f[d]){f[d]=c}}else{for(var g in c){if(!f[d+"."+g]){f[d+"."+g]=c[g]}}}}delete f[e]}};a.api.PlayerAPI.prototype.setup=function(d,e){if(d&&d.flashplayer&&!d.players){d.players=[{type:"flash",src:d.flashplayer},{type:"html5"}];delete d.flashplayer}if(e&&!d.players){if(typeof e=="string"){d.players=[{type:"flash",src:e}]}else{if(e instanceof Array){d.players=e}else{if(typeof e=="object"&&e.type){d.players=[e]}}}}var c=this.id;this.remove();var f=a(c);f.config=d;return(new a.embed.Embedder(f)).embedPlayer()};function b(){if(!document.body){return setTimeout(b,15)}var c=a.utils.selectors.getElementsByTagAndClass("video","jwplayer");for(var d=0;d<c.length;d++){var e=c[d];a(e.id).setup({players:[{type:"flash",src:"/jwplayer/player.swf"},{type:"html5"}]})}}b()})(jwplayer);(function(a){a.html5=function(b){var c=b;this.setup=function(d){a.utils.extend(this,new a.html5.api(c,d));return this};return this};a.html5.version="5.3"})(jwplayer);(function(b){b.html5.utils=function(){};b.html5.utils.extension=function(d){return d.substr(d.lastIndexOf(".")+1,d.length).toLowerCase()};b.html5.utils.getAbsolutePath=function(j){if(j===undefined){return undefined}if(a(j)){return j}var k=document.location.href.substring(0,document.location.href.indexOf("://")+3);var h=document.location.href.substring(k.length,document.location.href.indexOf("/",k.length+1));var e;if(j.indexOf("/")===0){e=j.split("/")}else{var f=document.location.href.split("?")[0];f=f.substring(k.length+h.length+1,f.lastIndexOf("/"));e=f.split("/").concat(j.split("/"))}var d=[];for(var g=0;g<e.length;g++){if(!e[g]||e[g]===undefined||e[g]=="."){continue}else{if(e[g]==".."){d.pop()}else{d.push(e[g])}}}return k+h+"/"+d.join("/")};function a(e){if(e===null){return}var f=e.indexOf("://");var d=e.indexOf("?");return(f>0&&(d<0||(d>f)))}b.html5.utils.mapEmpty=function(d){for(var e in d){return false}return true};b.html5.utils.mapLength=function(e){var d=0;for(var f in e){d++}return d};b.html5.utils.log=function(e,d){if(typeof console!="undefined"&&typeof console.log!="undefined"){if(d){console.log(e,d)}else{console.log(e)}}};b.html5.utils.css=function(e,h,d){if(e!==undefined){for(var f in h){try{if(typeof h[f]==="undefined"){continue}else{if(typeof h[f]=="number"&&!(f=="zIndex"||f=="opacity")){if(isNaN(h[f])){continue}if(f.match(/color/i)){h[f]="#"+c(h[f].toString(16),6)}else{h[f]=h[f]+"px"}}}e.style[f]=h[f]}catch(g){}}}};function c(d,e){while(d.length<e){d="0"+d}return d}b.html5.utils.isYouTube=function(d){return d.indexOf("youtube.com")>-1};b.html5.utils.getYouTubeId=function(d){d.indexOf("youtube.com">0)}})(jwplayer);(function(b){var c=b.html5.utils.css;b.html5.view=function(p,n,e){var s=p;var k=n;var v=e;var u;var f;var z;var q;var A;var m;function x(){u=document.createElement("div");u.id=k.id;u.className=k.className;k.id=u.id+"_video";c(u,{position:"relative",height:v.height,width:v.width,padding:0,backgroundColor:C(),zIndex:0});function C(){if(s.skin.getComponentSettings("display")&&s.skin.getComponentSettings("display").backgroundcolor){return s.skin.getComponentSettings("display").backgroundcolor}return parseInt("000000",16)}c(k,{position:"absolute",width:v.width,height:v.height,top:0,left:0,zIndex:1,margin:"auto",display:"block"});b.utils.wrap(k,u);q=document.createElement("div");q.id=u.id+"_displayarea";u.appendChild(q)}function i(){for(var C in v.plugins.order){var D=v.plugins.order[C];if(v.plugins.object[D].getDisplayElement!==undefined){v.plugins.object[D].height=B(v.plugins.object[D].getDisplayElement().style.height);v.plugins.object[D].width=B(v.plugins.object[D].getDisplayElement().style.width);v.plugins.config[D].currentPosition=v.plugins.config[D].position}}t()}function t(D){if(v.getMedia()!==undefined){for(var C in v.plugins.order){var E=v.plugins.order[C];if(v.plugins.object[E].getDisplayElement!==undefined){if(v.config.chromeless||v.getMedia().hasChrome()){v.plugins.config[E].currentPosition=b.html5.view.positions.NONE}else{v.plugins.config[E].currentPosition=v.plugins.config[E].position}}}}h(v.width,v.height)}function B(C){if(typeof C=="number"){return C}if(C===""){return 0}return parseInt(C.replace("px",""),10)}function o(){m=setInterval(function(){if(u.width&&u.height&&(v.width!==B(u.width)||v.height!==B(u.height))){h(B(u.width),B(u.height))}else{var C=u.getBoundingClientRect();if(v.width!==C.width||v.height!==C.height){h(C.width,C.height)}delete C}},100)}this.setup=function(C){k=C;x();i();s.jwAddEventListener(b.api.events.JWPLAYER_MEDIA_LOADED,t);o();var D;if(window.onresize!==null){D=window.onresize}window.onresize=function(E){if(D!==undefined){try{D(E)}catch(F){}}if(s.jwGetFullscreen()){v.width=window.innerWidth;v.height=window.innerHeight}h(v.width,v.height)}};function g(C){switch(C.keyCode){case 27:if(s.jwGetFullscreen()){s.jwSetFullscreen(false)}break;case 32:if(s.jwGetState()!=b.api.events.state.IDLE&&s.jwGetState()!=b.api.events.state.PAUSED){s.jwPause()}else{s.jwPlay()}break}}function h(F,C){if(u.style.display=="none"){return}var E=[].concat(v.plugins.order);E.reverse();A=E.length+2;if(!v.fullscreen){v.width=F;v.height=C;f=F;z=C;c(q,{top:0,bottom:0,left:0,right:0,width:F,height:C});c(u,{height:z,width:f});var D=l(r,E);if(D.length>0){A+=D.length;l(j,D,true)}w()}else{l(y,E,true)}}function l(H,E,F){var D=[];for(var C in E){var I=E[C];if(v.plugins.object[I].getDisplayElement!==undefined){if(v.plugins.config[I].currentPosition.toUpperCase()!==b.html5.view.positions.NONE){var G=H(I,A--);if(!G){D.push(I)}else{v.plugins.object[I].resize(G.width,G.height);if(F){delete G.width;delete G.height}c(v.plugins.object[I].getDisplayElement(),G)}}else{c(v.plugins.object[I].getDisplayElement(),{display:"none"})}}}return D}function r(D,E){if(v.plugins.object[D].getDisplayElement!==undefined){if(a(v.plugins.config[D].position)){if(v.plugins.object[D].getDisplayElement().parentNode===null){u.appendChild(v.plugins.object[D].getDisplayElement())}var C=d(D);C.zIndex=E;return C}}return false}function j(C,D){if(v.plugins.object[C].getDisplayElement().parentNode===null){q.appendChild(v.plugins.object[C].getDisplayElement())}return{position:"absolute",width:(v.width-B(q.style.left)-B(q.style.right)),height:(v.height-B(q.style.top)-B(q.style.bottom)),zIndex:D}}function y(C,D){return{position:"fixed",width:v.width,height:v.height,zIndex:D}}function w(){q.style.position="absolute";var C={position:"absolute",width:B(q.style.width),height:B(q.style.height),top:B(q.style.top),left:B(q.style.left)};c(v.getMedia().getDisplayElement(),C)}function d(D){var E={position:"absolute",margin:0,padding:0,top:null};var C=v.plugins.config[D].currentPosition.toLowerCase();switch(C.toUpperCase()){case b.html5.view.positions.TOP:E.top=B(q.style.top);E.left=B(q.style.left);E.width=f-B(q.style.left)-B(q.style.right);E.height=v.plugins.object[D].height;q.style[C]=B(q.style[C])+v.plugins.object[D].height+"px";q.style.height=B(q.style.height)-E.height+"px";break;case b.html5.view.positions.RIGHT:E.top=B(q.style.top);E.right=B(q.style.right);E.width=E.width=v.plugins.object[D].width;E.height=z-B(q.style.top)-B(q.style.bottom);q.style[C]=B(q.style[C])+v.plugins.object[D].width+"px";q.style.width=B(q.style.width)-E.width+"px";break;case b.html5.view.positions.BOTTOM:E.bottom=B(q.style.bottom);E.left=B(q.style.left);E.width=f-B(q.style.left)-B(q.style.right);E.height=v.plugins.object[D].height;q.style[C]=B(q.style[C])+v.plugins.object[D].height+"px";q.style.height=B(q.style.height)-E.height+"px";break;case b.html5.view.positions.LEFT:E.top=B(q.style.top);E.left=B(q.style.left);E.width=v.plugins.object[D].width;E.height=z-B(q.style.top)-B(q.style.bottom);q.style[C]=B(q.style[C])+v.plugins.object[D].width+"px";q.style.width=B(q.style.width)-E.width+"px";break;default:break}return E}this.resize=h;this.fullscreen=function(D){if(navigator.vendor.indexOf("Apple")===0){if(v.getMedia().getDisplayElement().webkitSupportsFullscreen){if(D){v.fullscreen=false;v.getMedia().getDisplayElement().webkitEnterFullscreen()}else{v.getMedia().getDisplayElement().webkitExitFullscreen()}}else{v.fullscreen=false}}else{if(D){document.onkeydown=g;clearInterval(m);v.width=window.innerWidth;v.height=window.innerHeight;var C={position:"fixed",width:"100%",height:"100%",top:0,left:0,zIndex:2147483000};c(u,C);C.zIndex=1;c(v.getMedia().getDisplayElement(),C);C.zIndex=2;c(q,C)}else{document.onkeydown="";o();v.width=f;v.height=z;c(u,{position:"relative",height:v.height,width:v.width,zIndex:0})}h(v.width,v.height)}}};function a(d){return([b.html5.view.positions.TOP,b.html5.view.positions.RIGHT,b.html5.view.positions.BOTTOM,b.html5.view.positions.LEFT].indexOf(d.toUpperCase())>-1)}b.html5.view.positions={TOP:"TOP",RIGHT:"RIGHT",BOTTOM:"BOTTOM",LEFT:"LEFT",OVER:"OVER",NONE:"NONE"}})(jwplayer);(function(a){var b={backgroundcolor:"",margin:10,font:"Arial,sans-serif",fontsize:10,fontcolor:parseInt("000000",16),fontstyle:"normal",fontweight:"bold",buttoncolor:parseInt("ffffff",16),position:a.html5.view.positions.BOTTOM,idlehide:false,layout:{left:{position:"left",elements:[{name:"play",type:"button"},{name:"divider",type:"divider"},{name:"prev",type:"button"},{name:"divider",type:"divider"},{name:"next",type:"button"},{name:"divider",type:"divider"},{name:"elapsed",type:"text"}]},center:{position:"center",elements:[{name:"time",type:"slider"}]},right:{position:"right",elements:[{name:"duration",type:"text"},{name:"blank",type:"button"},{name:"divider",type:"divider"},{name:"mute",type:"button"},{name:"volume",type:"slider"},{name:"divider",type:"divider"},{name:"fullscreen",type:"button"}]}}};_css=a.html5.utils.css;_hide=function(c){_css(c,{display:"none"})};_show=function(c){_css(c,{display:"block"})};a.html5.controlbar=function(j,L){var i=j;var A=a.utils.extend({},b,i.skin.getComponentSettings("controlbar"),L);if(a.html5.utils.mapLength(i.skin.getComponentLayout("controlbar"))>0){A.layout=i.skin.getComponentLayout("controlbar")}var P;var I;var O;var B;var t="none";var f;var h;var Q;var e;var d;var w;var s;var J={};var n=false;var c={};function H(){O=0;B=0;I=0;if(!n){var V={height:i.skin.getSkinElement("controlbar","background").height,backgroundColor:A.backgroundcolor};P=document.createElement("div");P.id=i.id+"_jwplayer_controlbar";_css(P,V)}v("capLeft","left",false,P);var W={position:"absolute",height:i.skin.getSkinElement("controlbar","background").height,background:" url("+i.skin.getSkinElement("controlbar","background").src+") repeat-x center left",left:i.skin.getSkinElement("controlbar","capLeft").width};N("elements",P,W);v("capRight","right",false,P)}this.getDisplayElement=function(){return P};this.resize=function(X,V){a.html5.utils.cancelAnimation(P);document.getElementById(i.id).onmousemove=x;d=X;w=V;x();var W=u();D({id:i.id,duration:Q,position:h});r({id:i.id,bufferPercent:e});return W};function o(){var W=["timeSlider","volumeSlider","timeSliderRail","volumeSliderRail"];for(var X in W){var V=W[X];if(typeof J[V]!="undefined"){c[V]=J[V].getBoundingClientRect()}}}function x(){a.html5.utils.cancelAnimation(P);if(g()){a.html5.utils.fadeTo(P,1,0,1,0)}else{a.html5.utils.fadeTo(P,0,0.1,1,2)}}function g(){if(i.jwGetState()==a.api.events.state.IDLE||i.jwGetState()==a.api.events.state.PAUSED){if(A.idlehide){return false}return true}if(i.jwGetFullscreen()){return false}if(A.position.toUpperCase()==a.html5.view.positions.OVER){return false}return true}function N(Y,X,W){var V;if(!n){V=document.createElement("div");J[Y]=V;V.id=P.id+"_"+Y;X.appendChild(V)}else{V=document.getElementById(P.id+"_"+Y)}if(W!==undefined){_css(V,W)}return V}function G(){U(A.layout.left);U(A.layout.right,-1);U(A.layout.center)}function U(Y,V){var Z=Y.position=="right"?"right":"left";var X=a.utils.extend([],Y.elements);if(V!==undefined){X.reverse()}for(var W=0;W<X.length;W++){z(X[W],Z)}}function E(){return I++}function z(Z,ab){var Y,W,X,V,ad;switch(Z.name){case"play":v("playButton",ab,false);v("pauseButton",ab,true);K("playButton","jwPlay");K("pauseButton","jwPause");break;case"divider":v("divider"+E(),ab,true);break;case"prev":v("prevButton",ab,true);K("prevButton","jwPlaylistPrev");break;case"next":v("nextButton",ab,true);K("nextButton","jwPlaylistNext");break;case"elapsed":v("elapsedText",ab,true);break;case"time":W=i.skin.getSkinElement("controlbar","timeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","timeSliderCapLeft").width;X=i.skin.getSkinElement("controlbar","timeSliderCapRight")===undefined?0:i.skin.getSkinElement("controlbar","timeSliderCapRight").width;Y=ab=="left"?W:X;V=i.skin.getSkinElement("controlbar","timeSliderRail").width+W+X;ad={height:i.skin.getSkinElement("controlbar","background").height,position:"absolute",top:0,width:V};ad[ab]=ab=="left"?O:B;var aa=N("timeSlider",J.elements,ad);v("timeSliderCapLeft",ab,true,aa,ab=="left"?0:Y);v("timeSliderRail",ab,false,aa,Y);v("timeSliderBuffer",ab,false,aa,Y);v("timeSliderProgress",ab,false,aa,Y);v("timeSliderThumb",ab,false,aa,Y);v("timeSliderCapRight",ab,true,aa,ab=="right"?0:Y);M("time");break;case"fullscreen":v("fullscreenButton",ab,false);v("normalscreenButton",ab,true);K("fullscreenButton","jwSetFullscreen",true);K("normalscreenButton","jwSetFullscreen",false);break;case"volume":W=i.skin.getSkinElement("controlbar","volumeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;X=i.skin.getSkinElement("controlbar","volumeSliderCapRight")===undefined?0:i.skin.getSkinElement("controlbar","volumeSliderCapRight").width;Y=ab=="left"?W:X;V=i.skin.getSkinElement("controlbar","volumeSliderRail").width+W+X;ad={height:i.skin.getSkinElement("controlbar","background").height,position:"absolute",top:0,width:V};ad[ab]=ab=="left"?O:B;var ac=N("volumeSlider",J.elements,ad);v("volumeSliderCapLeft",ab,true,ac,ab=="left"?0:Y);v("volumeSliderRail",ab,true,ac,Y);v("volumeSliderProgress",ab,false,ac,Y);v("volumeSliderCapRight",ab,true,ac,ab=="right"?0:Y);M("volume");break;case"mute":v("muteButton",ab,false);v("unmuteButton",ab,true);K("muteButton","jwSetMute",true);K("unmuteButton","jwSetMute",false);break;case"duration":v("durationText",ab,true);break}}function v(Y,ac,ab,Z,V){if((i.skin.getSkinElement("controlbar",Y)!==undefined||Y.indexOf("Text")>0||Y.indexOf("divider")===0)&&!(Y.indexOf("divider")===0&&s.indexOf("divider")===0)){s=Y;var X={height:i.skin.getSkinElement("controlbar","background").height,position:"absolute",display:"block",top:0};if((Y.indexOf("next")===0||Y.indexOf("prev")===0)&&i.jwGetPlaylist().length<2){ab=false;X.display="none"}var aa;if(Y.indexOf("Text")>0){Y.innerhtml="00:00";X.font=A.fontsize+"px/"+(i.skin.getSkinElement("controlbar","background").height+1)+"px "+A.font;X.color=A.fontcolor;X.textAlign="center";X.fontWeight=A.fontweight;X.fontStyle=A.fontstyle;X.cursor="default";aa=14+3*A.fontsize}else{if(Y.indexOf("divider")===0){X.background="url("+i.skin.getSkinElement("controlbar","divider").src+") repeat-x center left";aa=i.skin.getSkinElement("controlbar","divider").width}else{X.background="url("+i.skin.getSkinElement("controlbar",Y).src+") repeat-x center left";aa=i.skin.getSkinElement("controlbar",Y).width}}if(ac=="left"){X.left=V===undefined?O:V;if(ab){O+=aa}}else{if(ac=="right"){X.right=V===undefined?B:V;if(ab){B+=aa}}}if(Z===undefined){Z=J.elements}X.width=aa;if(n){_css(J[Y],X)}else{var W=N(Y,Z,X);if(i.skin.getSkinElement("controlbar",Y+"Over")!==undefined){W.onmouseover=function(ad){W.style.backgroundImage=["url(",i.skin.getSkinElement("controlbar",Y+"Over").src,")"].join("")};W.onmouseout=function(ad){W.style.backgroundImage=["url(",i.skin.getSkinElement("controlbar",Y).src,")"].join("")}}}}}function C(){i.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,y);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_BUFFER,r);i.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,p);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_TIME,D);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE,T);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_VOLUME,k);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_COMPLETE,F)}function y(){H();G();u();R()}function R(){D({id:i.id,duration:i.jwGetDuration(),position:0});r({id:i.id,bufferProgress:0});T({id:i.id,mute:i.jwGetMute()});p({id:i.id,newstate:a.api.events.state.IDLE});k({id:i.id,volume:i.jwGetVolume()})}function K(X,Y,W){if(n){return}if(i.skin.getSkinElement("controlbar",X)!==undefined){var V=J[X];if(V!==null){_css(V,{cursor:"pointer"});if(Y=="fullscreen"){V.onmouseup=function(Z){Z.stopPropagation();i.jwSetFullscreen(!i.jwGetFullscreen())}}else{V.onmouseup=function(Z){Z.stopPropagation();if(W!==null){i[Y](W)}else{i[Y]()}}}}}}function M(V){if(n){return}var W=J[V+"Slider"];_css(J.elements,{cursor:"pointer"});_css(W,{cursor:"pointer"});W.onmousedown=function(X){t=V};W.onmouseup=function(X){X.stopPropagation();S(X.pageX)};W.onmousemove=function(X){if(t=="time"){f=true;var Y=X.pageX-c[V+"Slider"].left-window.pageXOffset;_css(J.timeSliderThumb,{left:Y})}}}function S(W){f=false;var V;if(t=="time"){V=W-c.timeSliderRail.left+window.pageXOffset;var Y=V/c.timeSliderRail.width*Q;if(Y<0){Y=0}else{if(Y>Q){Y=Q-3}}i.jwSeek(Y);if(i.jwGetState()!=a.api.events.state.PLAYING){i.jwPlay()}}else{if(t=="volume"){V=W-c.volumeSliderRail.left-window.pageXOffset;var X=Math.round(V/c.volumeSliderRail.width*100);if(X<0){X=0}else{if(X>100){X=100}}if(i.jwGetMute()){i.jwSetMute(false)}i.jwSetVolume(X)}}t="none"}function r(W){if(W.bufferPercent!==null){e=W.bufferPercent}var X=c.timeSliderRail.width;var V=isNaN(Math.round(X*e/100))?0:Math.round(X*e/100);_css(J.timeSliderBuffer,{width:V})}function T(V){if(V.mute){_hide(J.muteButton);_show(J.unmuteButton);_hide(J.volumeSliderProgress)}else{_show(J.muteButton);_hide(J.unmuteButton);_show(J.volumeSliderProgress)}}function p(V){if(V.newstate==a.api.events.state.BUFFERING||V.newstate==a.api.events.state.PLAYING){_show(J.pauseButton);_hide(J.playButton)}else{_hide(J.pauseButton);_show(J.playButton)}x();if(V.newstate==a.api.events.state.IDLE){_hide(J.timeSliderBuffer);_hide(J.timeSliderProgress);_hide(J.timeSliderThumb);D({id:i.id,duration:i.jwGetDuration(),position:0})}else{_show(J.timeSliderBuffer);if(V.newstate!=a.api.events.state.BUFFERING){_show(J.timeSliderProgress);_show(J.timeSliderThumb)}}}function F(V){D(a.utils.extend(V,{position:0,duration:Q}))}function D(Y){if(Y.position!==null){h=Y.position}if(Y.duration!==null){Q=Y.duration}var W=(h===Q===0)?0:h/Q;var V=isNaN(Math.round(c.timeSliderRail.width*W))?0:Math.round(c.timeSliderRail.width*W);var X=V;J.timeSliderProgress.style.width=V+"px";if(!f){if(J.timeSliderThumb){J.timeSliderThumb.style.left=X+"px"}}if(J.durationText){J.durationText.innerHTML=m(Q)}if(J.elapsedText){J.elapsedText.innerHTML=m(h)}}function m(V){str="00:00";if(V>0){str=Math.floor(V/60)<10?"0"+Math.floor(V/60)+":":Math.floor(V/60)+":";str+=Math.floor(V%60)<10?"0"+Math.floor(V%60):Math.floor(V%60)}return str}function l(){var Y,W;var X=document.getElementById(P.id+"_elements").childNodes;for(var V in document.getElementById(P.id+"_elements").childNodes){if(isNaN(parseInt(V,10))){continue}if(X[V].id.indexOf(P.id+"_divider")===0&&W.id.indexOf(P.id+"_divider")===0){X[V].style.display="none"}else{if(X[V].id.indexOf(P.id+"_divider")===0&&Y.style.display!="none"){X[V].style.display="block"}}if(X[V].style.display!="none"){W=X[V]}Y=X[V]}}function u(){l();if(i.jwGetFullscreen()){_show(J.normalscreenButton);_hide(J.fullscreenButton)}else{_hide(J.normalscreenButton);_show(J.fullscreenButton)}var W={width:d};var V={};if(A.position.toUpperCase()==a.html5.view.positions.OVER||i.jwGetFullscreen()){W.left=A.margin;W.width-=2*A.margin;W.top=w-i.skin.getSkinElement("controlbar","background").height-A.margin;W.height=i.skin.getSkinElement("controlbar","background").height}else{W.left=0}V.left=i.skin.getSkinElement("controlbar","capLeft").width;V.width=W.width-i.skin.getSkinElement("controlbar","capLeft").width-i.skin.getSkinElement("controlbar","capRight").width;var X=i.skin.getSkinElement("controlbar","timeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","timeSliderCapLeft").width;_css(J.timeSliderRail,{width:(V.width-O-B),left:X});if(J.timeSliderCapRight!==undefined){_css(J.timeSliderCapRight,{left:X+(V.width-O-B)})}_css(P,W);_css(J.elements,V);o();return W}function k(Z){if(J.volumeSliderRail!==undefined){var X=isNaN(Z.volume/100)?1:Z.volume/100;var Y=parseInt(J.volumeSliderRail.style.width.replace("px",""),10);var V=isNaN(Math.round(Y*X))?0:Math.round(Y*X);var aa=parseInt(J.volumeSliderRail.style.right.replace("px",""),10);var W=i.skin.getSkinElement("controlbar","volumeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;_css(J.volumeSliderProgress,{width:V,left:W});if(J.volumeSliderCapLeft!==undefined){_css(J.volumeSliderCapLeft,{left:0})}}}function q(){H();G();o();n=true;C();R();P.style.opacity=A.idlehide?0:1}q();return this}})(jwplayer);(function(b){var a=["width","height","state","playlist","item","position","buffer","duration","volume","mute","fullscreen"];b.html5.controller=function(s,q,d,p){var v=s;var x=d;var c=p;var j=q;var z=true;var t=(x.config.debug!==undefined)&&(x.config.debug.toString().toLowerCase()=="console");var h=new b.html5.eventdispatcher(j.id,t);b.utils.extend(this,h);function l(C){h.sendEvent(C.type,C)}x.addGlobalListener(l);function o(){try{if(x.playlist[0].levels[0].file.length>0){if(z||x.state==b.api.events.state.IDLE){x.setActiveMediaProvider(x.playlist[x.item]);x.addEventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL,function(){x.getMedia().play()});if(x.config.repeat){x.addEventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE,function(D){setTimeout(m,25)})}x.getMedia().load(x.playlist[x.item]);z=false}else{if(x.state==b.api.events.state.PAUSED){x.getMedia().play()}}}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function A(){try{if(x.playlist[0].levels[0].file.length>0){switch(x.state){case b.api.events.state.PLAYING:case b.api.events.state.BUFFERING:x.getMedia().pause();break}}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function w(C){try{if(x.playlist[0].levels[0].file.length>0){switch(x.state){case b.api.events.state.PLAYING:case b.api.events.state.PAUSED:case b.api.events.state.BUFFERING:x.getMedia().seek(C);break}}return true}catch(D){h.sendEvent(b.api.events.JWPLAYER_ERROR,D)}return false}function i(){try{if(x.playlist[0].levels[0].file.length>0&&x.state!=b.api.events.state.IDLE){x.getMedia().stop()}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function f(){try{if(x.playlist[0].levels[0].file.length>0){if(x.config.shuffle){n(r())}else{if(x.item+1==x.playlist.length){n(0)}else{n(x.item+1)}}}if(x.state!=b.api.events.state.PLAYING&&x.state!=b.api.events.state.BUFFERING){o()}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function e(){try{if(x.playlist[0].levels[0].file.length>0){if(x.config.shuffle){n(r())}else{if(x.item===0){n(x.playlist.length-1)}else{n(x.item-1)}}}if(x.state!=b.api.events.state.PLAYING&&x.state!=b.api.events.state.BUFFERING){o()}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function r(){var C=null;if(x.playlist.length>1){while(C===null){C=Math.floor(Math.random()*x.playlist.length);if(C==x.item){C=null}}}else{C=0}return C}function n(D){x.resetEventListeners();x.addGlobalListener(l);try{if(x.playlist[0].levels[0].file.length>0){var E=x.state;if(E!==b.api.events.state.IDLE){i()}x.item=D;z=true;h.sendEvent(b.api.events.JWPLAYER_PLAYLIST_ITEM,{item:D});if(E==b.api.events.state.PLAYING||E==b.api.events.state.BUFFERING){o()}}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function y(D){try{switch(typeof(D)){case"number":x.getMedia().volume(D);break;case"string":x.getMedia().volume(parseInt(D,10));break}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function k(D){try{x.getMedia().mute(D);return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function g(D,C){try{x.width=D;x.height=C;c.resize(D,C);return true}catch(E){h.sendEvent(b.api.events.JWPLAYER_ERROR,E)}return false}function u(D){try{x.fullscreen=D;c.fullscreen(D);return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function B(C){try{i();x.loadPlaylist(C);z=true;return true}catch(D){h.sendEvent(b.api.events.JWPLAYER_ERROR,D)}return false}b.html5.controller.repeatoptions={LIST:"LIST",ALWAYS:"ALWAYS",SINGLE:"SINGLE",NONE:"NONE"};function m(){x.resetEventListeners();x.addGlobalListener(l);switch(x.config.repeat.toUpperCase()){case b.html5.controller.repeatoptions.SINGLE:o();break;case b.html5.controller.repeatoptions.ALWAYS:if(x.item==x.playlist.length-1&&!x.config.shuffle){n(0);o()}else{f()}break;case b.html5.controller.repeatoptions.LIST:if(x.item==x.playlist.length-1&&!x.config.shuffle){n(0)}else{f()}break}}this.play=o;this.pause=A;this.seek=w;this.stop=i;this.next=f;this.prev=e;this.item=n;this.setVolume=y;this.setMute=k;this.resize=g;this.setFullscreen=u;this.load=B}})(jwplayer);(function(a){a.html5.defaultSkin=function(){this.text='<?xml version="1.0" ?><skin author="LongTail Video" name="Five" version="1.0"><settings><setting name="backcolor" value="0xFFFFFF"/><setting name="frontcolor" value="0x000000"/><setting name="lightcolor" value="0x000000"/><setting name="screencolor" value="0x000000"/></settings><components><component name="controlbar"><settings><setting name="margin" value="20"/><setting name="fontsize" value="11"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFJJREFUeNrslLENwAAIwxLU/09j5AiOgD5hVQzNAVY8JK4qEfHMIKBnd2+BQlBINaiRtL/aV2rdzYBsM6CIONbI1NZENTr3RwdB2PlnJgJ6BRgA4hwu5Qg5iswAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhJREFUeNpiYqABYBo1dNRQ+hr6H4jvA3E8NS39j4SpZvh/LJig4YxEGEqy3kET+w+AOGFQRhTJhrEQkGcczfujhg4CQwECDADpTRWU/B3wHQAAAABJRU5ErkJggg=="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpiYBgFo2DwA0YC8v/R1P4nRu+ooaOGUtnQUTAKhgIACDAAFCwQCfAJ4gwAAAAASUVORK5CYII="/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEtJREFUeNpiYBgFo2Dog/9QDAPyQHweTYwiQ/2B+D0Wi8g2tB+JTdBQRiIMJVkvEy0iglhDF9Aq9uOpHVEwoE+NJDUKRsFgAAABBgDe2hqZcNNL0AAAAABJRU5ErkJggg=="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAElJREFUeNpiYBgFo2Dog/9AfB6I5dHE/lNqKAi/B2J/ahsKw/3EGMpIhKEk66WJoaR6fz61IyqemhEFSlL61ExSo2AUDAYAEGAAiG4hj+5t7M8AAAAASUVORK5CYII="/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADxJREFUeNpiYBgFo2AU0Bwwzluw+D8tLWARFhKiqQ9YuLg4aWsBGxs7bS1gZ6e5BWyjSX0UjIKhDgACDABlYQOGh5pYywAAAABJRU5ErkJggg=="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYBgFo2AU0Bww1jc0/aelBSz8/Pw09QELOzs7bS1gY2OjrQWsrKy09gHraFIfBaNgqAOAAAMAvy0DChXHsZMAAAAASUVORK5CYII="/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAClJREFUeNpiYBgFo2AU0BwwAvF/WlrARGsfjFow8BaMglEwCugAAAIMAOHfAQunR+XzAAAAAElFTkSuQmCC"/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpiZICA/yCCiQEJUJcDEGAAY0gBD1/m7Q0AAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNpiYBgFIw3MB+L/5Gj8j6yRiRTFyICJXHfTXyMLAXlGati4YDRFDj8AEGAABk8GSqqS4CoAAAAASUVORK5CYII="/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYBgFgxz8p7bm+cQa+h8LHy7GhEcjIz4bmAjYykiun/8j0fakGPIfTfPgiSr6aB4FVAcAAQYAWdwR1G1Wd2gAAAAASUVORK5CYII="/><element name="volumeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGpJREFUeNpi/P//PwM9ABMDncCoRYPfIqqDZcuW1UPp/6AUDcNM1DQYKtRAlaAj1mCSLSLXYIIWUctgDItoZfDA5aOoqKhGEANIM9LVR7SymGDQUctikuOIXkFNdhHEOFrDjlpEd4sAAgwAriRMub95fu8AAAAASUVORK5CYII="/><element name="volumeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFtJREFUeNpi/P//PwM9ABMDncCoRYPfIlqAeij9H5SiYZiqBqPTlFqE02BKLSLaYFItIttgQhZRzWB8FjENiuRJ7aAbsMQwYMl7wDIsWUUQ42gNO2oR3S0CCDAAKhKq6MLLn8oAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5JREFUeNpiYBgFo2DQA0YC8v/xqP1PjDlMRDrEgUgxkgHIlfZoriVGjmzLsLFHAW2D6D8eA/9Tw7L/BAwgJE90PvhPpNgoGAVDEQAEGAAMdhTyXcPKcAAAAABJRU5ErkJggg=="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEZJREFUeNpiYBgFo2DIg/9UUkOUAf8JiFFsyX88fJyAkcQgYMQjNkzBoAgiezyRbE+tFGSPxQJ7auYBmma0UTAKBhgABBgAJAEY6zON61sAAAAASUVORK5CYII="/></elements></component><component name="display"><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNrszwENADAIA7DhX8ENoBMZ5KR10EryckCJiIiIiIiIiIiIiIiIiIiIiIh8GmkRERERERERERERERERERERERGRHSPAAPlXH1phYpYaAAAAAElFTkSuQmCC"/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALdJREFUeNrs18ENgjAYhmFouDOCcQJGcARHgE10BDcgTOIosAGwQOuPwaQeuFRi2p/3Sb6EC5L3QCxZBgAAAOCorLW1zMn65TrlkH4NcV7QNcUQt7Gn7KIhxA+qNIR81spOGkL8oFJDyLJRdosqKDDkK+iX5+d7huzwM40xptMQMkjIOeRGo+VkEVvIPfTGIpKASfYIfT9iCHkHrBEzf4gcUQ56aEzuGK/mw0rHpy4AAACAf3kJMACBxjAQNRckhwAAAABJRU5ErkJggg=="/><element name="muteIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNrs1jEOgCAMBVAg7t5/8qaoIy4uoobyXsLCxA+0NCUAAADGUWvdQoQ41x4ixNBB2hBvBskdD3w5ZCkl3+33VqI0kjBBlh9rp+uTcyOP33TnolfsU85XX3yIRpQph8ZQY3wTZtU5AACASA4BBgDHoVuY1/fvOQAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWlJREFUeNrsl+1twjAQhsHq/7BBYQLYIBmBDcoGMAIjtBPQTcII2SDtBDBBwrU6pGsUO7YbO470PtKJkz9iH++d4ywWAAAAAABgljRNsyWr2bZzDuJG1rLdZhcMbTjrBCGDyUKsqQLFciJb9bSvuG/WagRVRUVUI6gqy5HVeKWfSgRyJruKIU//TrZTSn2nmlaXThrloi/v9F2STC1W4+Aw5cBzkquRc09bofFNc6YLxEON0VUZS5FPTftO49vMjRsIF3RhOGr7/D/pJw+FKU+q0vDyq8W42jCunDqI3LC5XxNj2wHLU1XjaRnb0Lhykhqhhd8MtSF5J9tbjCv4mXGvKJz/65FF/qJryyaaIvzP2QRxZTX2nTuXjvV/VPFSwyLnW7mpH99yTh1FEVro6JBSd40/pMrRdV8vPtcKl28T2pT8TnFZ4yNosct3Q0io6JfBiz1FlGdqVQH3VHnepAEAAAAAADDzEGAAcTwB10jWgxcAAAAASUVORK5CYII="/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuhJREFUeNrsWr9rU1EUznuNGqvFQh1ULOhiBx0KDtIuioO4pJuik3FxFfUPaAV1FTdx0Q5d2g4FFxehTnEpZHFoBy20tCIWtGq0TZP4HfkeHB5N8m6Sl/sa74XDybvv3vvOd8/Pe4lXrVZT3dD8VJc0B8QBcUAcEAfESktHGeR5XtMfqFQq/f92zPe/NbtGlKTdCY30kuxrpMGO94BlQCXs+rbh3ONgA6BlzP1p20d80gEI5hmA2A92Qua1Q2PtAFISM+bvjMG8U+Q7oA3rQGASwrYCU6WpNdLGYbA+Pq5jjXIiwi8EEa2UDbQSaKOIuV+SlkcCrfjY8XTI9EpKGwP0C2kru2hLtHqa4zoXtZRWyvi4CLwv9Opr6Hkn6A9HKgEANsQ1iqC3Ub/vRUk2JgmRkatK36kVrnt0qObunwUdUUMXMWYpakJsO5Am8tAw2GBIgwWA+G2S2dMpiw0gDioQRQJoKhRb1QiDwlHZUABYbaXWsm5ae6loTE4ZDxN4CZar8foVzOJ2iyZ2kWF3t7YIevffaMT5yJ70kQb2fQ1sE5SHr2wazs2wgMxgbsEKEAgxAvZUJbQLBGTSBMgNrncJbA6AljtS/eKDJ0Ez+DmrQEzXS2h1Ck25kAg0IZcUOaydCy4sYnN2fOA+2AP16gNoHALlQ+fwH7XO4CxLenUpgj4xr6ugY2roPMbMx+Xs18m/E8CVEIhxsNeg83XWOAN6grG3lGbk8uE5fr4B/WH3cJw+co/l9nTYsSGYCJ/lY5/qv0thn6nrIWmjeJcPSnWOeY++AkF8tpJHIMAUs/MaBBpj3znZfQo5psY+ZrG4gv5HickjEOymKjEeRpgyST6IuZcTcWbnjcgdPi5ghxciRKsl1lDSsgwA1i8fssonJgzmTSqfGUkCENndNdAL7PS6QQ7ZYISTo+1qq0LEWjTWcvY4isa4z+yfQB+7ooyHVg5RI7/i1Ijn/vnggDggDogD4oC00P4KMACd/juEHOrS4AAAAABJRU5ErkJggg=="/></elements></component><component name="dock"><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFBJREFUeNrs0cEJACAQA8Eofu0fu/W6EM5ZSAFDRpKTBs00CQQEBAQEBAQEBAQEBAQEBATkK8iqbY+AgICAgICAgICAgICAgICAgIC86QowAG5PAQzEJ0lKAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><elements><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhJREFUeNrs2NEJwCAMBcBYuv/CFuIE9VN47WWCR7iocXR3pdWdGPqqwIoMjYfQeAiNh9B4JHc6MHQVHnjggQceeOCBBx77TifyeOY0iHi8DqIdEY8dD5cL094eePzINB5CO/LwcOTptNB4CP25L4TIbZzpU7UEGAA5wz1uF5rF9AAAAABJRU5ErkJggg=="/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAIAAADpFA0BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADhJREFUeNrsy6ENACAMAMHClp2wYxZLAg5Fcu9e3OjuOKqqfTMzbs14CIZhGIZhGIZhGP4VLwEGAK/BBnVFpB0oAAAAAElFTkSuQmCC"/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAIAAADpFA0BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADRJREFUeNrsy7ENACAMBLE8++8caFFKKiRffU53112SGs3ttOohGIZhGIZhGIZh+Fe8BRgAiaUGde6NOSEAAAAASUVORK5CYII="/></elements></component></components></skin>';this.xml=null;if(window.DOMParser){parser=new DOMParser();this.xml=parser.parseFromString(this.text,"text/xml")}else{this.xml=new ActiveXObject("Microsoft.XMLDOM");this.xml.async="false";this.xml.loadXML(this.text)}return this}})(jwplayer);(function(a){_css=a.html5.utils.css;_hide=function(b){_css(b,{display:"none"})};_show=function(b){_css(b,{display:"block"})};a.html5.display=function(k,s){var q=k;var d={};var f;var t;var r;var l;var g;var j=q.skin.getComponentSettings("display").bufferrotation===undefined?15:parseInt(q.skin.getComponentSettings("display").bufferrotation,10);var e=q.skin.getComponentSettings("display").bufferinterval===undefined?100:parseInt(q.skin.getComponentSettings("display").bufferinterval,10);var c={display:{style:{cursor:"pointer",top:0,left:0},click:p},display_icon:{style:{cursor:"pointer",position:"absolute",top:((q.skin.getSkinElement("display","background").height-q.skin.getSkinElement("display","playIcon").height)/2),left:((q.skin.getSkinElement("display","background").width-q.skin.getSkinElement("display","playIcon").width)/2),border:0,margin:0,padding:0,zIndex:3}},display_iconBackground:{style:{cursor:"pointer",position:"absolute",top:((t-q.skin.getSkinElement("display","background").height)/2),left:((f-q.skin.getSkinElement("display","background").width)/2),border:0,backgroundImage:(["url(",q.skin.getSkinElement("display","background").src,")"]).join(""),width:q.skin.getSkinElement("display","background").width,height:q.skin.getSkinElement("display","background").height,margin:0,padding:0,zIndex:2}},display_image:{style:{display:"none",width:f,height:t,position:"absolute",cursor:"pointer",left:0,top:0,margin:0,padding:0,textDecoration:"none",zIndex:1}},display_text:{style:{zIndex:4,position:"relative",opacity:0.8,backgroundColor:parseInt("000000",16),color:parseInt("ffffff",16),textAlign:"center",fontFamily:"Arial,sans-serif",padding:"0 5px",fontSize:14}}};q.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,i);q.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE,i);q.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_ITEM,i);q.jwAddEventListener(a.api.events.JWPLAYER_ERROR,o);u();function u(){d.display=n("div","display");d.display_text=n("div","display_text");d.display.appendChild(d.display_text);d.display_image=n("img","display_image");d.display_image.onerror=function(v){_hide(d.display_image)};d.display_icon=n("div","display_icon");d.display_iconBackground=n("div","display_iconBackground");d.display.appendChild(d.display_image);d.display_iconBackground.appendChild(d.display_icon);d.display.appendChild(d.display_iconBackground);b()}this.getDisplayElement=function(){return d.display};this.resize=function(w,v){f=w;t=v;_css(d.display,{width:w,height:v});_css(d.display_text,{width:(w-10),top:((t-d.display_text.getBoundingClientRect().height)/2)});_css(d.display_image,{width:w,height:v});_css(d.display_iconBackground,{top:((t-q.skin.getSkinElement("display","background").height)/2),left:((f-q.skin.getSkinElement("display","background").width)/2)});i({})};function n(v,x){var w=document.createElement(v);w.id=q.id+"_jwplayer_"+x;_css(w,c[x].style);return w}function b(){for(var v in d){if(c[v].click!==undefined){d[v].onclick=c[v].click}}}function p(v){if(typeof v.preventDefault!="undefined"){v.preventDefault()}else{v.returnValue=false}if(q.jwGetState()!=a.api.events.state.PLAYING){q.jwPlay()}else{q.jwPause()}}function h(v){if(g){return}_show(d.display_iconBackground);d.display_icon.style.backgroundImage=(["url(",q.skin.getSkinElement("display",v).src,")"]).join("");_css(d.display_icon,{display:"block",width:q.skin.getSkinElement("display",v).width,height:q.skin.getSkinElement("display",v).height,top:(q.skin.getSkinElement("display","background").height-q.skin.getSkinElement("display",v).height)/2,left:(q.skin.getSkinElement("display","background").width-q.skin.getSkinElement("display",v).width)/2});if(q.skin.getSkinElement("display",v+"Over")!==undefined){d.display_icon.onmouseover=function(w){d.display_icon.style.backgroundImage=["url(",q.skin.getSkinElement("display",v+"Over").src,")"].join("")};d.display_icon.onmouseout=function(w){d.display_icon.style.backgroundImage=["url(",q.skin.getSkinElement("display",v).src,")"].join("")}}else{d.display_icon.onmouseover=null;d.display_icon.onmouseout=null}}function m(){_hide(d.display_icon);_hide(d.display_iconBackground)}function o(v){g=true;m();d.display_text.innerHTML=v.error;_show(d.display_text);d.display_text.style.top=((t-d.display_text.getBoundingClientRect().height)/2)+"px"}function i(v){if((v.type==a.api.events.JWPLAYER_PLAYER_STATE||v.type==a.api.events.JWPLAYER_PLAYLIST_ITEM)&&g){g=false;_hide(d.display_text)}if(l!==undefined){clearInterval(l);l=null;a.html5.utils.animations.rotate(d.display_icon,0)}switch(q.jwGetState()){case a.api.events.state.BUFFERING:h("bufferIcon");r=0;l=setInterval(function(){r+=j;a.html5.utils.animations.rotate(d.display_icon,r%360)},e);h("bufferIcon");break;case a.api.events.state.PAUSED:_css(d.display_image,{background:"transparent no-repeat center center"});h("playIcon");break;case a.api.events.state.IDLE:if(q.jwGetPlaylist()[q.jwGetItem()].image){_css(d.display_image,{display:"block"});d.display_image.src=a.html5.utils.getAbsolutePath(q.jwGetPlaylist()[q.jwGetItem()].image)}else{_css(d.display_image,{display:"none"});delete d.display_image.src}h("playIcon");break;default:if(q.jwGetMute()){_css(d.display_image,{display:"none"});delete d.display_image.src;h("muteIcon")}else{_css(d.display_image,{display:"none"});delete d.display_image.src;_hide(d.display_iconBackground);_hide(d.display_icon)}break}}return this}})(jwplayer);(function(jwplayer){jwplayer.html5.eventdispatcher=function(id,debug){var _id=id;var _debug=debug;var _listeners;var _globallisteners;this.resetEventListeners=function(){_listeners={};_globallisteners=[]};this.resetEventListeners();this.addEventListener=function(type,listener,count){try{if(_listeners[type]===undefined){_listeners[type]=[]}if(typeof(listener)=="string"){eval("listener = "+listener)}_listeners[type].push({listener:listener,count:count})}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.removeEventListener=function(type,listener){try{for(var lisenterIndex in _listeners[type]){if(_listeners[type][lisenterIndex].toString()==listener.toString()){_listeners[type].slice(lisenterIndex,lisenterIndex+1);break}}}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.addGlobalListener=function(listener,count){try{if(typeof(listener)=="string"){eval("listener = "+listener)}_globallisteners.push({listener:listener,count:count})}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.removeGlobalListener=function(listener){try{for(var lisenterIndex in _globallisteners){if(_globallisteners[lisenterIndex].toString()==listener.toString()){_globallisteners.slice(lisenterIndex,lisenterIndex+1);break}}}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.sendEvent=function(type,data){if(data===undefined){data={}}jwplayer.utils.extend(data,{id:_id,version:jwplayer.html5.version,type:type});if(_debug){jwplayer.html5.utils.log(type,data)}for(var listenerIndex in _listeners[type]){try{_listeners[type][listenerIndex].listener(data)}catch(err){jwplayer.html5.utils.log("There was an error while handling a listener",_listeners[type][listenerIndex].listener,err)}if(_listeners[type][listenerIndex].count===1){delete _listeners[type][listenerIndex]}else{if(_listeners[type][listenerIndex].count>0){_listeners[type][listenerIndex].count=_listeners[type][listenerIndex].count-1}}}for(var globalListenerIndex in _globallisteners){try{_globallisteners[globalListenerIndex].listener(data)}catch(err){jwplayer.html5.utils.log("There was an error while handling a listener",_globallisteners[globalListenerIndex].listener,err)}if(_globallisteners[globalListenerIndex].count===1){delete _globallisteners[globalListenerIndex]}else{if(_globallisteners[globalListenerIndex].count>0){_globallisteners[globalListenerIndex].count=_globallisteners[globalListenerIndex].count-1}}}}}})(jwplayer);(function(a){a.html5.extensionmap={"3gp":"video/3gpp","3gpp":"video/3gpp","3g2":"video/3gpp2","3gpp2":"video/3gpp2",flv:"video/x-flv",f4a:"audio/mp4",f4b:"audio/mp4",f4p:"video/mp4",f4v:"video/mp4",mov:"video/quicktime",m4a:"audio/mp4",m4b:"audio/mp4",m4p:"audio/mp4",m4v:"video/mp4",mkv:"video/x-matroska",mp4:"video/mp4",sdp:"application/sdp",vp6:"video/x-vp6",aac:"audio/aac",mp3:"audio/mp3",ogg:"audio/ogg",ogv:"video/ogg",webm:"video/webm"}})(jwplayer);(function(a){var b={prefix:"http://l.longtailvideo.com/html5/",file:"logo.png",link:"http://www.longtailvideo.com/players/jw-flv-player/",margin:8,out:0.5,over:1,timeout:3,hide:true,position:"bottom-left"};_css=a.html5.utils.css;a.html5.logo=function(g,h){var l=g;var j;if(b.prefix){var i=g.version.split(/\W/).splice(0,2).join("/");if(b.prefix.indexOf(i)<0){b.prefix+=i+"/"}}if(h.position==a.html5.view.positions.OVER){h.position=b.position}var f=a.utils.extend({},b);if(!f.file){return}var c=document.createElement("img");c.id=l.id+"_jwplayer_logo";c.style.display="none";c.onload=function(n){_css(c,k());l.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,m)};if(f.file.indexOf("http://")===0){c.src=f.file}else{c.src=f.prefix+f.file}c.onmouseover=function(n){c.style.opacity=f.over;d()};c.onmouseout=function(n){c.style.opacity=f.out;d()};c.onclick=e;function k(){var p={textDecoration:"none",position:"absolute"};p.display=f.hide?"none":"block";var o=f.position.toLowerCase().split("-");for(var n in o){p[o[n]]=f.margin}return p}this.resize=function(o,n){};this.getDisplayElement=function(){return c};function e(n){n.stopPropagation();window.open(f.link,"_blank");return}function d(){if(j){clearTimeout(j)}j=setTimeout(function(){a.html5.utils.fadeTo(c,0,0.1,parseFloat(c.style.opacity))},f.timeout*1000)}function m(n){switch(l.jwGetState()){case a.api.events.state.BUFFERING:c.style.display="block";c.style.opacity=f.out;if(f.hide){d()}break;case a.api.events.state.PAUSED:break;case a.api.events.state.IDLE:break;case a.api.events.state.PLAYING:break;default:if(f.hide){d()}break}}return this}})(jwplayer);(function(a){var c={ended:a.api.events.state.IDLE,playing:a.api.events.state.PLAYING,pause:a.api.events.state.PAUSED,buffering:a.api.events.state.BUFFERING};var b=a.html5.utils.css;a.html5.mediavideo=function(f,C){var G={abort:t,canplay:m,canplaythrough:m,durationchange:q,emptied:t,ended:m,error:l,loadeddata:q,loadedmetadata:q,loadstart:m,pause:m,play:J,playing:m,progress:z,ratechange:t,seeked:m,seeking:m,stalled:m,suspend:m,timeupdate:J,volumechange:t,waiting:m,canshowcurrentframe:t,dataunavailable:t,empty:t,load:e,loadedfirstframe:t};var H=new a.html5.eventdispatcher();a.utils.extend(this,H);var h=f;var x=C;var D;var F;var d=a.api.events.state.IDLE;var A=null;var n;var g=0;var y=false;var r=false;var L;var K;var i=[];var M;var B=false;function v(){return d}function e(N){}function t(N){}function m(N){if(c[N.type]){s(c[N.type])}}function s(N){if(B){return}if(n){N=a.api.events.state.IDLE}if(N==a.api.events.state.PAUSED&&d==a.api.events.state.IDLE){return}if(d!=N){var O=d;h.state=N;d=N;var P=false;if(N==a.api.events.state.IDLE){p();if(h.position>=h.duration&&(h.position||h.duration)){P=true}if(x.style.display!="none"&&!h.config.chromeless){x.style.display="none"}}H.sendEvent(a.api.events.JWPLAYER_PLAYER_STATE,{oldstate:O,newstate:N});if(P){H.sendEvent(a.api.events.JWPLAYER_MEDIA_COMPLETE)}}n=false}function q(N){var O={height:N.target.videoHeight,width:N.target.videoWidth,duration:Math.round(N.target.duration*10)/10};if(h.duration===0||isNaN(h.duration)){h.duration=Math.round(N.target.duration*10)/10}h.playlist[h.item]=a.utils.extend(h.playlist[h.item],O);H.sendEvent(a.api.events.JWPLAYER_MEDIA_META,{metadata:O})}function J(O){if(n){return}if(O!==undefined&&O.target!==undefined){if(h.duration===0||isNaN(h.duration)){h.duration=Math.round(O.target.duration*10)/10}if(!y&&x.readyState>0){s(a.api.events.state.PLAYING)}if(d==a.api.events.state.PLAYING){if(!y&&x.readyState>0){y=true;try{x.currentTime=h.playlist[h.item].start}catch(N){}x.volume=h.volume/100;x.muted=h.mute}h.position=Math.round(O.target.currentTime*10)/10;H.sendEvent(a.api.events.JWPLAYER_MEDIA_TIME,{position:Math.round(O.target.currentTime*10)/10,duration:Math.round(O.target.duration*10)/10})}}z(O)}function E(){var N=(i[i.length-1]-i[0])/i.length;M=setTimeout(function(){if(!F){z({lengthComputable:true,loaded:1,total:1})}},N*10)}function z(P){var O,N;if(P!==undefined&&P.lengthComputable&&P.total){o();O=P.loaded/P.total*100;N=O/100*(h.duration-x.currentTime);if(50<O&&!F){clearTimeout(M);E()}}else{if((x.buffered!==undefined)&&(x.buffered.length>0)){maxBufferIndex=0;if(maxBufferIndex>=0){O=x.buffered.end(maxBufferIndex)/x.duration*100;N=x.buffered.end(maxBufferIndex)-x.currentTime}}}if(D===false&&d==a.api.events.state.BUFFERING){D=true;H.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER_FULL)}if(!F){if(O==100&&F===false){F=true}if(O!==null&&(O>h.buffer)){h.buffer=Math.round(O);H.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:Math.round(O)})}}}function w(){if(A===null){A=setInterval(function(){J()},100)}}function p(){clearInterval(A);A=null}function l(P){var O="There was an error: ";if((P.target.error&&P.target.tagName.toLowerCase()=="video")||P.target.parentNode.error&&P.target.parentNode.tagName.toLowerCase()=="video"){var N=P.target.error===undefined?P.target.parentNode.error:P.target.error;switch(N.code){case N.MEDIA_ERR_ABORTED:O="You aborted the video playback: ";break;case N.MEDIA_ERR_NETWORK:O="A network error caused the video download to fail part-way: ";break;case N.MEDIA_ERR_DECODE:O="The video playback was aborted due to a corruption problem or because the video used features your browser did not support: ";break;case N.MEDIA_ERR_SRC_NOT_SUPPORTED:O="The video could not be loaded, either because the server or network failed or because the format is not supported: ";break;default:O="An unknown error occurred: ";break}}else{if(P.target.tagName.toLowerCase()=="source"){K--;if(K>0){return}O="The video could not be loaded, either because the server or network failed or because the format is not supported: "}else{a.html5.utils.log("Erroneous error received. Continuing...");return}}u();O+=j();B=true;H.sendEvent(a.api.events.JWPLAYER_ERROR,{error:O});return}function j(){var P="";for(var O in L.levels){var N=L.levels[O];var Q=x.ownerDocument.createElement("source");P+=a.html5.utils.getAbsolutePath(N.file);if(O<(L.levels.length-1)){P+=", "}}return P}this.getDisplayElement=function(){return x};this.play=function(){if(d!=a.api.events.state.PLAYING){if(x.style.display!="block"){x.style.display="block"}x.play();w()}};this.pause=function(){x.pause();s(a.api.events.state.PAUSED)};this.seek=function(N){if(!(h.duration===0||isNaN(h.duration))&&!(h.position===0||isNaN(h.position))){x.currentTime=N;x.play()}};function u(){x.pause();p();h.position=0;n=true;s(a.api.events.state.IDLE)}this.stop=u;this.volume=function(N){x.volume=N/100;h.volume=N;H.sendEvent(a.api.events.JWPLAYER_MEDIA_VOLUME,{volume:Math.round(N)})};this.mute=function(N){x.muted=N;h.mute=N;H.sendEvent(a.api.events.JWPLAYER_MEDIA_MUTE,{mute:N})};this.resize=function(O,N){if(false){b(x,{width:O,height:N})}H.sendEvent(a.api.events.JWPLAYER_MEDIA_RESIZE,{fullscreen:h.fullscreen,width:O,hieght:N})};this.fullscreen=function(N){if(N===true){this.resize("100%","100%")}else{this.resize(h.config.width,h.config.height)}};this.load=function(N){I(N);H.sendEvent(a.api.events.JWPLAYER_MEDIA_LOADED);D=false;F=false;y=false;if(!h.config.chromeless){i=[];o();s(a.api.events.state.BUFFERING);setTimeout(function(){J()},25)}};function o(){var N=new Date().getTime();i.push(N)}this.hasChrome=function(){return r};function I(U){h.duration=U.duration;r=false;L=U;var P=document.createElement("video");P.preload="none";B=false;K=0;for(var O in U.levels){var N=U.levels[O];if(a.html5.utils.isYouTube(N.file)){delete P;k(N.file);return}var Q;if(N.type===undefined){var T=a.html5.utils.extension(N.file);if(a.html5.extensionmap[T]!==undefined){Q=a.html5.extensionmap[T]}else{Q="video/"+T+";"}}else{Q=N.type}if(P.canPlayType(Q)===""){continue}var S=x.ownerDocument.createElement("source");S.src=a.html5.utils.getAbsolutePath(N.file);S.type=Q;K++;P.appendChild(S)}if(K===0){B=true;H.sendEvent(a.api.events.JWPLAYER_ERROR,{error:"The video could not be loaded because the format is not supported by your browser: "+j()})}if(h.config.chromeless){P.poster=a.html5.utils.getAbsolutePath(U.image);P.controls="controls"}P.style.position=x.style.position;P.style.top=x.style.top;P.style.left=x.style.left;P.style.width=x.style.width;P.style.height=x.style.height;P.style.zIndex=x.style.zIndex;P.onload=e;P.volume=0;x.parentNode.replaceChild(P,x);P.id=x.id;x=P;for(var R in G){x.addEventListener(R,function(V){if(V.target.parentNode!==null){G[V.type](V)}},true)}}function k(R){var O=document.createElement("object");R=["http://www.youtube.com/v/",R.replace(/^[^v]+v.(.{11}).*/,"$1"),"&amp;hl=en_US&amp;fs=1&autoplay=1"].join("");var U={movie:R,allowFullScreen:"true",allowscriptaccess:"always"};for(var N in U){var S=document.createElement("param");S.name=N;S.value=U[N];O.appendChild(S)}var T=document.createElement("embed");var P={src:R,type:"application/x-shockwave-flash",allowscriptaccess:"always",allowfullscreen:"true",width:document.getElementById(f.id).style.width,height:document.getElementById(f.id).style.height};for(var Q in P){T[Q]=P[Q]}O.appendChild(T);O.style.position=x.style.position;O.style.top=x.style.top;O.style.left=x.style.left;O.style.width=document.getElementById(f.id).style.width;O.style.height=document.getElementById(f.id).style.height;O.style.zIndex=2147483000;x.parentNode.replaceChild(O,x);O.id=x.id;x=O;r=true}this.embed=I;return this}})(jwplayer);(function(jwplayer){var _configurableStateVariables=["width","height","start","duration","volume","mute","fullscreen","item","plugins"];jwplayer.html5.model=function(api,container,options){var _api=api;var _container=container;var _model={id:_container.id,playlist:[],state:jwplayer.api.events.state.IDLE,position:0,buffer:0,config:{width:480,height:320,item:0,skin:undefined,file:undefined,image:undefined,start:0,duration:0,bufferlength:5,volume:90,mute:false,fullscreen:false,repeat:"none",autostart:false,debug:undefined,screencolor:undefined}};var _media;var _eventDispatcher=new jwplayer.html5.eventdispatcher();var _components=["display","logo","controlbar"];jwplayer.utils.extend(_model,_eventDispatcher);for(var option in options){if(typeof options[option]=="string"){var type=/color$/.test(option)?"color":null;options[option]=jwplayer.html5.utils.typechecker(options[option],type)}var config=_model.config;var path=option.split(".");for(var edge in path){if(edge==path.length-1){config[path[edge]]=options[option]}else{if(config[path[edge]]===undefined){config[path[edge]]={}}config=config[path[edge]]}}}for(var index in _configurableStateVariables){var configurableStateVariable=_configurableStateVariables[index];_model[configurableStateVariable]=_model.config[configurableStateVariable]}var pluginorder=_components.concat([]);if(_model.plugins!==undefined){if(typeof _model.plugins=="string"){var userplugins=_model.plugins.split(",");for(var userplugin in userplugins){pluginorder.push(userplugin.replace(/^\s+|\s+$/g,""))}}else{for(var plugin in _model.plugins){pluginorder.push(plugin.replace(/^\s+|\s+$/g,""))}}}if(jwplayer.utils.isIOS()){_model.config.chromeless=true}if(_model.config.chromeless){pluginorder=[]}_model.plugins={order:pluginorder,config:{controlbar:{position:jwplayer.html5.view.positions.BOTTOM}},object:{}};if(typeof _model.config.components!="undefined"){for(var component in _model.config.components){_model.plugins.config[component]=_model.config.components[component]}}for(var pluginIndex in _model.plugins.order){var pluginName=_model.plugins.order[pluginIndex];var pluginConfig=_model.config[pluginName]===undefined?{}:_model.config[pluginName];_model.plugins.config[pluginName]=_model.plugins.config[pluginName]===undefined?pluginConfig:jwplayer.utils.extend(_model.plugins.config[pluginName],pluginConfig);if(_model.plugins.config[pluginName].position===undefined){_model.plugins.config[pluginName].position=jwplayer.html5.view.positions.OVER}}_model.loadPlaylist=function(arg,ready){var input;if(typeof arg=="string"){try{input=eval(arg)}catch(err){input=arg}}else{input=arg}var config;switch(jwplayer.utils.typeOf(input)){case"object":config=input;break;case"array":config={playlist:input};break;default:config={file:input};break}_model.playlist=new jwplayer.html5.playlist(config);if(_model.config.shuffle){_model.item=_getShuffleItem()}else{if(_model.config.item>=_model.playlist.length){_model.config.item=_model.playlist.length-1}_model.item=_model.config.item}if(!ready){_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_LOADED);_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_ITEM,{item:_model.item})}_model.setActiveMediaProvider(_model.playlist[_model.item])};function _getShuffleItem(){var result=null;if(_model.playlist.length>1){while(result===null){result=Math.floor(Math.random()*_model.playlist.length);if(result==_model.item){result=null}}}else{result=0}return result}function forward(evt){if(evt.type==jwplayer.api.events.JWPLAYER_MEDIA_LOADED){_container=_media.getDisplayElement()}_eventDispatcher.sendEvent(evt.type,evt)}_model.setActiveMediaProvider=function(playlistItem){if(_media!==undefined){_media.resetEventListeners()}_media=new jwplayer.html5.mediavideo(_model,_container);_media.addGlobalListener(forward);if(_model.config.chromeless){_media.load(playlistItem)}return true};_model.getMedia=function(){return _media};_model.setupPlugins=function(){for(var plugin in _model.plugins.order){try{if(jwplayer.html5[_model.plugins.order[plugin]]!==undefined){_model.plugins.object[_model.plugins.order[plugin]]=new jwplayer.html5[_model.plugins.order[plugin]](_api,_model.plugins.config[_model.plugins.order[plugin]])}else{if(window[_model.plugins.order[plugin]]!==undefined){_model.plugins.object[_model.plugins.order[plugin]]=new window[_model.plugins.order[plugin]](_api,_model.plugins.config[_model.plugins.order[plugin]])}else{_model.plugins.order.splice(plugin,plugin+1)}}}catch(err){jwplayer.html5.utils.log("Could not setup "+_model.plugins.order[plugin])}}};return _model}})(jwplayer);(function(a){a.html5.playlist=function(b){var d=[];if(b.playlist&&b.playlist.length>0){for(var c in b.playlist){d.push(new a.html5.playlistitem(b.playlist[c]))}}else{d.push(new a.html5.playlistitem(b))}return d}})(jwplayer);(function(a){a.html5.playlistitem=function(c){var b={author:"",date:"",description:"",image:"",link:"",mediaid:"",tags:"",title:"",provider:"",file:"",streamer:"",duration:-1,start:0,currentLevel:-1,levels:[]};for(var d in b){if(c[d]!==undefined){b[d]=c[d]}}if(b.levels.length===0){b.levels[0]=new a.html5.playlistitemlevel(b)}return b}})(jwplayer);(function(a){a.html5.playlistitemlevel=function(b){var d={file:"",streamer:"",bitrate:0,width:0};for(var c in d){if(b[c]!==undefined){d[c]=b[c]}}return d}})(jwplayer);(function(a){a.html5.skin=function(){var b={};var c=false;this.load=function(d,e){new a.html5.skinloader(d,function(f){c=true;b=f;e()},function(){new a.html5.skinloader("",function(f){c=true;b=f;e()})})};this.getSkinElement=function(d,e){if(c){try{return b[d].elements[e]}catch(f){a.html5.utils.log("No such skin component / element: ",[d,e])}}return null};this.getComponentSettings=function(d){if(c){return b[d].settings}return null};this.getComponentLayout=function(d){if(c){return b[d].layout}return null}}})(jwplayer);(function(a){a.html5.skinloader=function(f,n,i){var m={};var c=n;var j=i;var e=true;var h;var l=f;var q=false;function k(){if(l===undefined||l===""){d(a.html5.defaultSkin().xml)}else{a.utils.ajax(a.html5.utils.getAbsolutePath(l),function(r){d(r.responseXML)},function(r){d(a.html5.defaultSkin().xml)})}}function d(w){var C=w.getElementsByTagName("component");if(C.length===0){return}for(var F=0;F<C.length;F++){var A=C[F].getAttribute("name");var z={settings:{},elements:{},layout:{}};m[A]=z;var E=C[F].getElementsByTagName("elements")[0].getElementsByTagName("element");for(var D=0;D<E.length;D++){b(E[D],A)}var x=C[F].getElementsByTagName("settings")[0];if(x!==undefined&&x.childNodes.length>0){var I=x.getElementsByTagName("setting");for(var N=0;N<I.length;N++){var O=I[N].getAttribute("name");var G=I[N].getAttribute("value");var v=/color$/.test(O)?"color":null;m[A].settings[O]=a.html5.utils.typechecker(G,v)}}var J=C[F].getElementsByTagName("layout")[0];if(J!==undefined&&J.childNodes.length>0){var K=J.getElementsByTagName("group");for(var u=0;u<K.length;u++){var y=K[u];m[A].layout[y.getAttribute("position")]={elements:[]};for(var M=0;M<y.attributes.length;M++){var B=y.attributes[M];m[A].layout[y.getAttribute("position")][B.name]=B.value}var L=y.getElementsByTagName("*");for(var t=0;t<L.length;t++){var r=L[t];m[A].layout[y.getAttribute("position")].elements.push({type:r.tagName});for(var s=0;s<r.attributes.length;s++){var H=r.attributes[s];m[A].layout[y.getAttribute("position")].elements[t][H.name]=H.value}if(m[A].layout[y.getAttribute("position")].elements[t].name===undefined){m[A].layout[y.getAttribute("position")].elements[t].name=r.tagName}}}}e=false;p()}}function p(){clearInterval(h);if(!q){h=setInterval(function(){o()},100)}}function b(w,v){var u=new Image();var r=w.getAttribute("name");var t=w.getAttribute("src");var y;if(t.indexOf("data:image/png;base64,")===0){y=t}else{var s=a.html5.utils.getAbsolutePath(l);var x=s.substr(0,s.lastIndexOf("/"));y=[x,v,t].join("/")}m[v].elements[r]={height:0,width:0,src:"",ready:false};u.onload=function(z){g(u,r,v)};u.onerror=function(z){q=true;p();j()};u.src=y}function o(){for(var r in m){if(r!="properties"){for(var s in m[r].elements){if(!m[r].elements[s].ready){return}}}}if(e===false){clearInterval(h);c(m)}}function g(r,t,s){m[s].elements[t].height=r.height;m[s].elements[t].width=r.width;m[s].elements[t].src=r.src;m[s].elements[t].ready=true;p()}k()}})(jwplayer);(function(a){var b={};a.html5.utils.animations=function(){};a.html5.utils.animations.transform=function(c,d){c.style.webkitTransform=d;c.style.MozTransform=d;c.style.OTransform=d};a.html5.utils.animations.transformOrigin=function(c,d){c.style.webkitTransformOrigin=d;c.style.MozTransformOrigin=d;c.style.OTransformOrigin=d};a.html5.utils.animations.rotate=function(c,d){a.html5.utils.animations.transform(c,["rotate(",d,"deg)"].join(""))};a.html5.utils.cancelAnimation=function(c){delete b[c.id]};a.html5.utils.fadeTo=function(l,f,e,i,h,d){if(b[l.id]!=d&&d!==undefined){return}var c=new Date().getTime();if(d>c){setTimeout(function(){a.html5.utils.fadeTo(l,f,e,i,0,d)},d-c)}l.style.display="block";if(i===undefined){i=l.style.opacity===""?1:l.style.opacity}if(l.style.opacity==f&&l.style.opacity!==""&&d!==undefined){if(f===0){l.style.display="none"}return}if(d===undefined){d=c;b[l.id]=d}if(h===undefined){h=0}var j=(c-d)/(e*1000);j=j>1?1:j;var k=f-i;var g=i+(j*k);if(g>1){g=1}else{if(g<0){g=0}}l.style.opacity=g;if(h>0){b[l.id]=d+h*1000;a.html5.utils.fadeTo(l,f,e,i,0,b[l.id]);return}setTimeout(function(){a.html5.utils.fadeTo(l,f,e,i,0,d)},10)}})(jwplayer);(function(c){var d=new RegExp(/^(#|0x)[0-9a-fA-F]{3,6}/);c.html5.utils.typechecker=function(g,f){f=f===null?b(g):f;return e(g,f)};function b(f){var g=["true","false","t","f"];if(g.indexOf(f.toLowerCase().replace(" ",""))>=0){return"boolean"}else{if(d.test(f)){return"color"}else{if(!isNaN(parseInt(f,10))&&parseInt(f,10).toString().length==f.length){return"integer"}else{if(!isNaN(parseFloat(f))&&parseFloat(f).toString().length==f.length){return"float"}}}}return"string"}function e(g,f){if(f===null){return g}switch(f){case"color":if(g.length>0){return a(g)}return null;case"integer":return parseInt(g,10);case"float":return parseFloat(g);case"boolean":if(g.toLowerCase()=="true"){return true}else{if(g=="1"){return true}}return false}return g}function a(f){switch(f.toLowerCase()){case"blue":return parseInt("0000FF",16);case"green":return parseInt("00FF00",16);case"red":return parseInt("FF0000",16);case"cyan":return parseInt("00FFFF",16);case"magenta":return parseInt("FF00FF",16);case"yellow":return parseInt("FFFF00",16);case"black":return parseInt("000000",16);case"white":return parseInt("FFFFFF",16);default:f=f.replace(/(#|0x)?([0-9A-F]{3,6})$/gi,"$2");if(f.length==3){f=f.charAt(0)+f.charAt(0)+f.charAt(1)+f.charAt(1)+f.charAt(2)+f.charAt(2)}return parseInt(f,16)}return parseInt("000000",16)}})(jwplayer);(function(a){a.html5.api=function(b,j){var i={};if(!a.utils.hasHTML5()){return i}var d=document.createElement("div");b.parentNode.replaceChild(d,b);d.id=b.id;i.version=a.html5.version;i.id=d.id;var h=new a.html5.model(i,d,j);var e=new a.html5.view(i,d,h);var g=new a.html5.controller(i,d,h,e);i.skin=new a.html5.skin();i.jwPlay=g.play;i.jwPause=g.pause;i.jwStop=g.stop;i.jwSeek=g.seek;i.jwPlaylistItem=g.item;i.jwPlaylistNext=g.next;i.jwPlaylistPrev=g.prev;i.jwResize=g.resize;i.jwLoad=g.load;function f(k){return function(){return h[k]}}i.jwGetItem=f("item");i.jwGetPosition=f("position");i.jwGetDuration=f("duration");i.jwGetBuffer=f("buffer");i.jwGetWidth=f("width");i.jwGetHeight=f("height");i.jwGetFullscreen=f("fullscreen");i.jwSetFullscreen=g.setFullscreen;i.jwGetVolume=f("volume");i.jwSetVolume=g.setVolume;i.jwGetMute=f("mute");i.jwSetMute=g.setMute;i.jwGetState=f("state");i.jwGetVersion=function(){return i.version};i.jwGetPlaylist=function(){return h.playlist};i.jwAddEventListener=g.addEventListener;i.jwRemoveEventListener=g.removeEventListener;i.jwSendEvent=g.sendEvent;i.jwGetLevel=function(){};i.jwGetBandwidth=function(){};i.jwGetLockState=function(){};i.jwLock=function(){};i.jwUnlock=function(){};function c(m,l,k){return function(){m.loadPlaylist(m.config,true);m.setupPlugins();l.setup(m.getMedia().getDisplayElement());var n={id:i.id,version:i.version};k.sendEvent(a.api.events.JWPLAYER_READY,n);if(playerReady!==undefined){playerReady(n)}if(window[m.config.playerReady]!==undefined){window[m.config.playerReady](n)}m.sendEvent(a.api.events.JWPLAYER_PLAYLIST_LOADED);m.sendEvent(a.api.events.JWPLAYER_PLAYLIST_ITEM,{item:m.config.item});if(m.config.autostart===true&&!m.config.chromeless){k.play()}}}if(h.config.chromeless){setTimeout(c(h,e,g),25)}else{i.skin.load(h.config.skin,c(h,e,g))}return i}})(jwplayer);


