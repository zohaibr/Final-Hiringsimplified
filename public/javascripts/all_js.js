// FROM: /javascripts/prototype.feedback.js?1294660143
/*
 * Feedback (for Prototype)
 * version: 0.1 (2009-07-21)
 * @requires Prototype v1.6 or later
 *
 * This script is part of the Feedback Ruby on Rails Plugin:
 *   http://
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2009 Jean-Sebastien Boulanger [ jsboulanger@gmail.com ]
 *
 * Usage:
 *
 *  Feedback.init('feedback_link_tab', {
 *    // options
 *  });
 *
 */

var Feedback;

if(Feedback == undefined) {
  Feedback = {};
  Feedback.init = function(callerSettings) {
    // Changes to those default settings might need adjustment in feedback.css
    this.settings = Object.extend({
      tabControl: 'feedback_link',
      main: 'feedback',
      closeLink: 'feedback_close_link',
      modalWindow: 'feedback_modal_window',
      modalContent: 'feedback_modal_content',
      form: 'feedback_form',
      formUrl: '/feedbacks/new',
      overlay: 'feedback_overlay',
      loadingImage: '/images/feedback/loading.gif',
      loadingText: 'Loading...',
      sendingText: 'Sending...',
      tabPosition: 'left'
    }, callerSettings || {});

    this.settings.feedbackHtml = '<div id="' + this.settings.main + '" style="display: none;">' +
                                   '<div id="' + this.settings.modalWindow + '">' +
                                     '<a href="#" id="' + this.settings.closeLink + '"></a>' +
                                     '<div id="' + this.settings.modalContent + '"></div>' +
                                   '</div>' +
                                 '</div>'
    this.settings.overlayHtml = '<div id="' + this.settings.overlay + '" class="feedback_hide"></div>';
    this.settings.tabHtml = '<a href="#" id="feedback_link" class="' + this.settings.tabControl + ' ' + this.settings.tabPosition + '"></a>';

    if (this.settings.tabPosition != null && $$('#' + this.settings.tabControl).length == 0)
      $$("body").first().insert(this.settings.tabHtml);

    $$('.' + this.settings.tabControl).each(function(e) {
      $(e).observe('click', function() {
        Feedback.loading();
        new Ajax.Updater(Feedback.settings.modalContent, Feedback.settings.formUrl, {
          method: 'get',
          onComplete: function(transport) {
            $(Feedback.settings.form).observe('submit', Feedback.submitFeedback);
          }
        });
        return false;
      });
    });
  }

  Feedback.submitFeedback = function(event){
		$('feedback_page').value = location.href;
    var data = Form.serialize($(Feedback.settings.form));
    var url = $(Feedback.settings.form).action;
    Feedback.loading(Feedback.settings.sendingText);
    new Ajax.Updater(Feedback.settings.modalContent, url, {
      method: 'POST',
      parameters: data,
      onComplete: function(transport){
        if (transport.status >= 200 && transport.status < 300) {
          $(Feedback.settings.modalWindow).fade({
            duration: 2.0,
            afterFinish: function() {
              Feedback.hideFeedback();
            }
          });
        }
        else {
          $(Feedback.settings.form).observe('submit', Feedback.submitFeedback);
        }
      }
    });
    Event.stop(event);
  }

  Feedback.initOverlay = function() {
    if ($$('#' + this.settings.overlay).length == 0)
      $$("body").first().insert(this.settings.overlayHtml)

    $(this.settings.overlay).addClassName('feedback_overlayBG');
  }

  Feedback.showOverlay = function() {
    Feedback.initOverlay();
    $(this.settings.overlay).show();
  }

  Feedback.hideOverlay = function() {
    if ($$('#' + this.settings.overlay).length == 0) return false;
      $(this.settings.overlay).remove();
  }

  Feedback.initFeedback = function() {
    if ($$('#' + this.settings.main).length == 0) {
      $$("body").first().insert(this.settings.feedbackHtml);
      $(this.settings.closeLink).observe('click', function(){
        Feedback.hideFeedback();
        return false;
      });
      Feedback.setWindowPosition();
    }
  }

  Feedback.showFeedback = function() {
    Feedback.initFeedback();
    $(this.settings.main).show();
  }

  Feedback.hideFeedback = function() {
    $(this.settings.main).hide();
    $(this.settings.main).remove();
    Feedback.hideOverlay();
  }


  Feedback.loading = function(text){
    Feedback.showOverlay();
    Feedback.initFeedback();
    if (text == null)
      text = this.settings.loadingText;

    $(this.settings.modalContent).update('<h1>' + text + '<img src="' + this.settings.loadingImage + '" /></h1>');
    $(this.settings.main).show();
  }

  Feedback.setWindowPosition = function() {
    var scrollTop, clientHeight;
    if (self.pageYOffset) {
      scrollTop = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {// all other Explorers
      scrollTop = document.body.scrollTop;
    }
    if (self.innerHeight) {	// all except Explorer
      clientHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      clientHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      clientHeight = document.body.clientHeight;
    }
    $(this.settings.modalWindow).setStyle({
      top: scrollTop + (clientHeight / 10) + 'px'
    });
  }
}



// FROM: /javascripts/common.js?1294660143
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



// FROM: /javascripts/curvycorners.js?1294660143
function browserdetect(){var A=navigator.userAgent.toLowerCase();this.isIE=A.indexOf("msie")>-1;this.ieVer=this.isIE?/msie\s(\d\.\d)/.exec(A)[1]:0;this.isMoz=A.indexOf("firefox")!=-1;this.isSafari=A.indexOf("safari")!=-1;this.quirksMode=this.isIE&&(!document.compatMode||document.compatMode.indexOf("BackCompat")>-1);this.isOp="opera" in window;this.isWebKit=A.indexOf("webkit")!=-1;if(this.isIE){this.get_style=function(D,F){if(!(F in D.currentStyle)){return""}var C=/^([\d.]+)(\w*)/.exec(D.currentStyle[F]);if(!C){return D.currentStyle[F]}if(C[1]==0){return"0"}if(C[2]&&C[2]!=="px"){var B=D.style.left;var E=D.runtimeStyle.left;D.runtimeStyle.left=D.currentStyle.left;D.style.left=C[1]+C[2];C[0]=D.style.pixelLeft;D.style.left=B;D.runtimeStyle.left=E}return C[0]}}else{this.get_style=function(B,C){C=C.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();return document.defaultView.getComputedStyle(B,"").getPropertyValue(C)}}}var curvyBrowser=new browserdetect;if(curvyBrowser.isIE){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}}function curvyCnrSpec(A){this.selectorText=A;this.tlR=this.trR=this.blR=this.brR=0;this.tlu=this.tru=this.blu=this.bru="";this.antiAlias=true}curvyCnrSpec.prototype.setcorner=function(B,C,A,D){if(!B){this.tlR=this.trR=this.blR=this.brR=parseInt(A);this.tlu=this.tru=this.blu=this.bru=D}else{propname=B.charAt(0)+C.charAt(0);this[propname+"R"]=parseInt(A);this[propname+"u"]=D}};curvyCnrSpec.prototype.get=function(D){if(/^(t|b)(l|r)(R|u)$/.test(D)){return this[D]}if(/^(t|b)(l|r)Ru$/.test(D)){var C=D.charAt(0)+D.charAt(1);return this[C+"R"]+this[C+"u"]}if(/^(t|b)Ru?$/.test(D)){var B=D.charAt(0);B+=this[B+"lR"]>this[B+"rR"]?"l":"r";var A=this[B+"R"];if(D.length===3&&D.charAt(2)==="u"){A+=this[B="u"]}return A}throw new Error("Don't recognize property "+D)};curvyCnrSpec.prototype.radiusdiff=function(A){if(A!=="t"&&A!=="b"){throw new Error("Param must be 't' or 'b'")}return Math.abs(this[A+"lR"]-this[A+"rR"])};curvyCnrSpec.prototype.setfrom=function(A){this.tlu=this.tru=this.blu=this.bru="px";if("tl" in A){this.tlR=A.tl.radius}if("tr" in A){this.trR=A.tr.radius}if("bl" in A){this.blR=A.bl.radius}if("br" in A){this.brR=A.br.radius}if("antiAlias" in A){this.antiAlias=A.antiAlias}};curvyCnrSpec.prototype.cloneOn=function(G){var E=["tl","tr","bl","br"];var H=0;var C,A;for(C in E){if(!isNaN(C)){A=this[E[C]+"u"];if(A!==""&&A!=="px"){H=new curvyCnrSpec;break}}}if(!H){H=this}else{var B,D,F=curvyBrowser.get_style(G,"left");for(C in E){if(!isNaN(C)){B=E[C];A=this[B+"u"];D=this[B+"R"];if(A!=="px"){var F=G.style.left;G.style.left=D+A;D=G.style.pixelLeft;G.style.left=F}H[B+"R"]=D;H[B+"u"]="px"}}G.style.left=F}return H};curvyCnrSpec.prototype.radiusSum=function(A){if(A!=="t"&&A!=="b"){throw new Error("Param must be 't' or 'b'")}return this[A+"lR"]+this[A+"rR"]};curvyCnrSpec.prototype.radiusCount=function(A){var B=0;if(this[A+"lR"]){++B}if(this[A+"rR"]){++B}return B};curvyCnrSpec.prototype.cornerNames=function(){var A=[];if(this.tlR){A.push("tl")}if(this.trR){A.push("tr")}if(this.blR){A.push("bl")}if(this.brR){A.push("br")}return A};function operasheet(C){var A=document.styleSheets.item(C).ownerNode.text;A=A.replace(/\/\*(\n|\r|.)*?\*\//g,"");var D=new RegExp("^s*([\\w.#][-\\w.#, ]+)[\\n\\s]*\\{([^}]+border-((top|bottom)-(left|right)-)?radius[^}]*)\\}","mg");var G;this.rules=[];while((G=D.exec(A))!==null){var F=new RegExp("(..)border-((top|bottom)-(left|right)-)?radius:\\s*([\\d.]+)(in|em|px|ex|pt)","g");var E,B=new curvyCnrSpec(G[1]);while((E=F.exec(G[2]))!==null){if(E[1]!=="z-"){B.setcorner(E[3],E[4],E[5],E[6])}}this.rules.push(B)}}operasheet.contains_border_radius=function(A){return/border-((top|bottom)-(left|right)-)?radius/.test(document.styleSheets.item(A).ownerNode.text)};function curvyCorners(){var G,D,E,B,J;if(typeof arguments[0]!=="object"){throw curvyCorners.newError("First parameter of curvyCorners() must be an object.")}if(arguments[0] instanceof curvyCnrSpec){B=arguments[0];if(!B.selectorText&&typeof arguments[1]==="string"){B.selectorText=arguments[1]}}else{if(typeof arguments[1]!=="object"&&typeof arguments[1]!=="string"){throw curvyCorners.newError("Second parameter of curvyCorners() must be an object or a class name.")}D=arguments[1];if(typeof D!=="string"){D=""}if(D!==""&&D.charAt(0)!=="."&&"autoPad" in arguments[0]){D="."+D}B=new curvyCnrSpec(D);B.setfrom(arguments[0])}if(B.selectorText){J=0;var I=B.selectorText.replace(/\s+$/,"").split(/,\s*/);E=new Array;function A(M){var L=M.split("#");return(L.length===2?"#":"")+L.pop()}for(G=0;G<I.length;++G){var K=A(I[G]);var H=K.split(" ");switch(K.charAt(0)){case"#":D=H.length===1?K:H[0];D=document.getElementById(D.substr(1));if(D===null){curvyCorners.alert("No object with ID "+K+" exists yet.\nCall curvyCorners(settings, obj) when it is created.")}else{if(H.length===1){E.push(D)}else{E=E.concat(curvyCorners.getElementsByClass(H[1],D))}}break;default:if(H.length===1){E=E.concat(curvyCorners.getElementsByClass(K))}else{var C=curvyCorners.getElementsByClass(H[0]);for(D=0;D<C.length;++D){E=E.concat(curvyCorners.getElementsByClass(H[1],C))}}}}}else{J=1;E=arguments}for(G=J,D=E.length;G<D;++G){if(E[G]&&(!("IEborderRadius" in E[G].style)||E[G].style.IEborderRadius!="set")){if(E[G].className&&E[G].className.indexOf("curvyRedraw")!==-1){if(typeof curvyCorners.redrawList==="undefined"){curvyCorners.redrawList=new Array}curvyCorners.redrawList.push({node:E[G],spec:B,copy:E[G].cloneNode(false)})}E[G].style.IEborderRadius="set";var F=new curvyObject(B,E[G]);F.applyCorners()}}}curvyCorners.prototype.applyCornersToAll=function(){curvyCorners.alert("This function is now redundant. Just call curvyCorners(). See documentation.")};curvyCorners.redraw=function(){if(!curvyBrowser.isOp&&!curvyBrowser.isIE){return}if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.redraw() has nothing to redraw.")}var E=curvyCorners.bock_redraw;curvyCorners.block_redraw=true;for(var A in curvyCorners.redrawList){if(isNaN(A)){continue}var D=curvyCorners.redrawList[A];if(!D.node.clientWidth){continue}var B=D.copy.cloneNode(false);for(var C=D.node.firstChild;C!=null;C=C.nextSibling){if(C.className==="autoPadDiv"){break}}if(!C){curvyCorners.alert("Couldn't find autoPad DIV");break}D.node.parentNode.replaceChild(B,D.node);while(C.firstChild){B.appendChild(C.removeChild(C.firstChild))}D=new curvyObject(D.spec,D.node=B);D.applyCorners()}curvyCorners.block_redraw=E};curvyCorners.adjust=function(obj,prop,newval){if(curvyBrowser.isOp||curvyBrowser.isIE){if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.adjust() has nothing to adjust.")}var i,j=curvyCorners.redrawList.length;for(i=0;i<j;++i){if(curvyCorners.redrawList[i].node===obj){break}}if(i===j){throw curvyCorners.newError("Object not redrawable")}obj=curvyCorners.redrawList[i].copy}if(prop.indexOf(".")===-1){obj[prop]=newval}else{eval("obj."+prop+"='"+newval+"'")}};curvyCorners.handleWinResize=function(){if(!curvyCorners.block_redraw){curvyCorners.redraw()}};curvyCorners.setWinResize=function(A){curvyCorners.block_redraw=!A};curvyCorners.newError=function(A){return new Error("curvyCorners Error:\n"+A)};curvyCorners.alert=function(A){if(typeof curvyCornersVerbose==="undefined"||curvyCornersVerbose){alert(A)}};function curvyObject(){var U;this.box=arguments[1];this.settings=arguments[0];this.topContainer=this.bottomContainer=this.shell=U=null;var K=this.box.clientWidth;if(!K&&curvyBrowser.isIE){this.box.style.zoom=1;K=this.box.clientWidth}if(!K){if(!this.box.parentNode){throw this.newError("box has no parent!")}for(U=this.box;;U=U.parentNode){if(!U||U.tagName==="BODY"){this.applyCorners=function(){};curvyCorners.alert(this.errmsg("zero-width box with no accountable parent","warning"));return}if(U.style.display==="none"){break}}U.style.display="block";K=this.box.clientWidth}if(arguments[0] instanceof curvyCnrSpec){this.spec=arguments[0].cloneOn(this.box)}else{this.spec=new curvyCnrSpec("");this.spec.setfrom(this.settings)}var b=curvyBrowser.get_style(this.box,"borderTopWidth");var J=curvyBrowser.get_style(this.box,"borderBottomWidth");var D=curvyBrowser.get_style(this.box,"borderLeftWidth");var B=curvyBrowser.get_style(this.box,"borderRightWidth");var I=curvyBrowser.get_style(this.box,"borderTopColor");var G=curvyBrowser.get_style(this.box,"borderBottomColor");var A=curvyBrowser.get_style(this.box,"borderLeftColor");var E=curvyBrowser.get_style(this.box,"backgroundColor");var C=curvyBrowser.get_style(this.box,"backgroundImage");var Y=curvyBrowser.get_style(this.box,"backgroundRepeat");if(this.box.currentStyle&&this.box.currentStyle.backgroundPositionX){var R=curvyBrowser.get_style(this.box,"backgroundPositionX");var P=curvyBrowser.get_style(this.box,"backgroundPositionY")}else{var R=curvyBrowser.get_style(this.box,"backgroundPosition");R=R.split(" ");var P=R[1];R=R[0]}var O=curvyBrowser.get_style(this.box,"position");var Z=curvyBrowser.get_style(this.box,"paddingTop");var c=curvyBrowser.get_style(this.box,"paddingBottom");var Q=curvyBrowser.get_style(this.box,"paddingLeft");var a=curvyBrowser.get_style(this.box,"paddingRight");var S=curvyBrowser.get_style(this.box,"border");filter=curvyBrowser.ieVer>7?curvyBrowser.get_style(this.box,"filter"):null;var H=this.spec.get("tR");var M=this.spec.get("bR");var W=function(f){if(typeof f==="number"){return f}if(typeof f!=="string"){throw new Error("unexpected styleToNPx type "+typeof f)}var d=/^[-\d.]([a-z]+)$/.exec(f);if(d&&d[1]!="px"){throw new Error("Unexpected unit "+d[1])}if(isNaN(f=parseInt(f))){f=0}return f};var T=function(d){return d<=0?"0":d+"px"};try{this.borderWidth=W(b);this.borderWidthB=W(J);this.borderWidthL=W(D);this.borderWidthR=W(B);this.boxColour=curvyObject.format_colour(E);this.topPadding=W(Z);this.bottomPadding=W(c);this.leftPadding=W(Q);this.rightPadding=W(a);this.boxWidth=K;this.boxHeight=this.box.clientHeight;this.borderColour=curvyObject.format_colour(I);this.borderColourB=curvyObject.format_colour(G);this.borderColourL=curvyObject.format_colour(A);this.borderString=this.borderWidth+"px solid "+this.borderColour;this.borderStringB=this.borderWidthB+"px solid "+this.borderColourB;this.backgroundImage=((C!="none")?C:"");this.backgroundRepeat=Y}catch(X){throw this.newError("getMessage" in X?X.getMessage():X.message)}var F=this.boxHeight;var V=K;if(curvyBrowser.isOp){R=W(R);P=W(P);if(R){var N=V+this.borderWidthL+this.borderWidthR;if(R>N){R=N}R=(N/R*100)+"%"}if(P){var N=F+this.borderWidth+this.borderWidthB;if(P>N){P=N}P=(N/P*100)+"%"}}if(curvyBrowser.quirksMode){}else{this.boxWidth-=this.leftPadding+this.rightPadding;this.boxHeight-=this.topPadding+this.bottomPadding}this.contentContainer=document.createElement("div");if(filter){this.contentContainer.style.filter=filter}while(this.box.firstChild){this.contentContainer.appendChild(this.box.removeChild(this.box.firstChild))}if(O!="absolute"){this.box.style.position="relative"}this.box.style.padding="0";this.box.style.border=this.box.style.backgroundImage="none";this.box.style.backgroundColor="transparent";this.box.style.width=(V+this.borderWidthL+this.borderWidthR)+"px";this.box.style.height=(F+this.borderWidth+this.borderWidthB)+"px";var L=document.createElement("div");L.style.position="absolute";if(filter){L.style.filter=filter}if(curvyBrowser.quirksMode){L.style.width=(V+this.borderWidthL+this.borderWidthR)+"px"}else{L.style.width=V+"px"}L.style.height=T(F+this.borderWidth+this.borderWidthB-H-M);L.style.padding="0";L.style.top=H+"px";L.style.left="0";if(this.borderWidthL){L.style.borderLeft=this.borderWidthL+"px solid "+this.borderColourL}if(this.borderWidth&&!H){L.style.borderTop=this.borderWidth+"px solid "+this.borderColour}if(this.borderWidthR){L.style.borderRight=this.borderWidthR+"px solid "+this.borderColourL}if(this.borderWidthB&&!M){L.style.borderBottom=this.borderWidthB+"px solid "+this.borderColourB}L.style.backgroundColor=E;L.style.backgroundImage=this.backgroundImage;L.style.backgroundRepeat=this.backgroundRepeat;this.shell=this.box.appendChild(L);K=curvyBrowser.get_style(this.shell,"width");if(K===""||K==="auto"||K.indexOf("%")!==-1){throw this.newError("Shell width is "+K)}this.boxWidth=(K!=""&&K!="auto"&&K.indexOf("%")==-1)?parseInt(K):this.shell.clientWidth;this.applyCorners=function(){if(this.backgroundObject){var w=function(AO,i,t){if(AO===0){return 0}var k;if(AO==="right"||AO==="bottom"){return t-i}if(AO==="center"){return(t-i)/2}if(AO.indexOf("%")>0){return(t-i)*100/parseInt(AO)}return W(AO)};this.backgroundPosX=w(R,this.backgroundObject.width,V);this.backgroundPosY=w(P,this.backgroundObject.height,F)}else{if(this.backgroundImage){this.backgroundPosX=W(R);this.backgroundPosY=W(P)}}if(H){v=document.createElement("div");v.style.width=this.boxWidth+"px";v.style.fontSize="1px";v.style.overflow="hidden";v.style.position="absolute";v.style.paddingLeft=this.borderWidth+"px";v.style.paddingRight=this.borderWidth+"px";v.style.height=H+"px";v.style.top=-H+"px";v.style.left=-this.borderWidthL+"px";this.topContainer=this.shell.appendChild(v)}if(M){var v=document.createElement("div");v.style.width=this.boxWidth+"px";v.style.fontSize="1px";v.style.overflow="hidden";v.style.position="absolute";v.style.paddingLeft=this.borderWidthB+"px";v.style.paddingRight=this.borderWidthB+"px";v.style.height=M+"px";v.style.bottom=-M+"px";v.style.left=-this.borderWidthL+"px";this.bottomContainer=this.shell.appendChild(v)}var AG=this.spec.cornerNames();for(var AK in AG){if(!isNaN(AK)){var AC=AG[AK];var AD=this.spec[AC+"R"];var AE,AH,j,AF;if(AC=="tr"||AC=="tl"){AE=this.borderWidth;AH=this.borderColour;AF=this.borderWidth}else{AE=this.borderWidthB;AH=this.borderColourB;AF=this.borderWidthB}j=AD-AF;var u=document.createElement("div");u.style.height=this.spec.get(AC+"Ru");u.style.width=this.spec.get(AC+"Ru");u.style.position="absolute";u.style.fontSize="1px";u.style.overflow="hidden";var r,q,p;var n=filter?parseInt(/alpha\(opacity.(\d+)\)/.exec(filter)[1]):100;for(r=0;r<AD;++r){var m=(r+1>=j)?-1:Math.floor(Math.sqrt(Math.pow(j,2)-Math.pow(r+1,2)))-1;if(j!=AD){var h=(r>=j)?-1:Math.ceil(Math.sqrt(Math.pow(j,2)-Math.pow(r,2)));var f=(r+1>=AD)?-1:Math.floor(Math.sqrt(Math.pow(AD,2)-Math.pow((r+1),2)))-1}var d=(r>=AD)?-1:Math.ceil(Math.sqrt(Math.pow(AD,2)-Math.pow(r,2)));if(m>-1){this.drawPixel(r,0,this.boxColour,n,(m+1),u,true,AD)}if(j!=AD){if(this.spec.antiAlias){for(q=m+1;q<h;++q){if(this.backgroundImage!=""){var g=curvyObject.pixelFraction(r,q,j)*100;this.drawPixel(r,q,AH,n,1,u,g>=30,AD)}else{if(this.boxColour!=="transparent"){var AB=curvyObject.BlendColour(this.boxColour,AH,curvyObject.pixelFraction(r,q,j));this.drawPixel(r,q,AB,n,1,u,false,AD)}else{this.drawPixel(r,q,AH,n>>1,1,u,false,AD)}}}if(f>=h){if(h==-1){h=0}this.drawPixel(r,h,AH,n,(f-h+1),u,false,0)}p=AH;q=f}else{if(f>m){this.drawPixel(r,(m+1),AH,n,(f-m),u,false,0)}}}else{p=this.boxColour;q=m}if(this.spec.antiAlias){while(++q<d){this.drawPixel(r,q,p,(curvyObject.pixelFraction(r,q,AD)*n),1,u,AF<=0,AD)}}}for(var y=0,AJ=u.childNodes.length;y<AJ;++y){var s=u.childNodes[y];var AI=parseInt(s.style.top);var AM=parseInt(s.style.left);var AN=parseInt(s.style.height);if(AC=="tl"||AC=="bl"){s.style.left=(AD-AM-1)+"px"}if(AC=="tr"||AC=="tl"){s.style.top=(AD-AN-AI)+"px"}s.style.backgroundRepeat=this.backgroundRepeat;if(this.backgroundImage){switch(AC){case"tr":s.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL+AD-V-AM)+"px "+(this.backgroundPosY+AN+AI+this.borderWidth-AD)+"px";break;case"tl":s.style.backgroundPosition=(this.backgroundPosX-AD+AM+this.borderWidthL)+"px "+(this.backgroundPosY-AD+AN+AI+this.borderWidth)+"px";break;case"bl":s.style.backgroundPosition=(this.backgroundPosX-AD+AM+1+this.borderWidthL)+"px "+(this.backgroundPosY-F-this.borderWidth+(curvyBrowser.quirksMode?AI:-AI)+AD)+"px";break;case"br":if(curvyBrowser.quirksMode){s.style.backgroundPosition=(this.backgroundPosX+this.borderWidthL-V+AD-AM)+"px "+(this.backgroundPosY-F-this.borderWidth+AI+AD)+"px"}else{s.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL-V+AD-AM)+"px "+(this.backgroundPosY-F-this.borderWidth+AD-AI)+"px"}}}}switch(AC){case"tl":u.style.top=u.style.left="0";this.topContainer.appendChild(u);break;case"tr":u.style.top=u.style.right="0";this.topContainer.appendChild(u);break;case"bl":u.style.bottom=u.style.left="0";this.bottomContainer.appendChild(u);break;case"br":u.style.bottom=u.style.right="0";this.bottomContainer.appendChild(u)}}}var x={t:this.spec.radiusdiff("t"),b:this.spec.radiusdiff("b")};for(z in x){if(typeof z==="function"){continue}if(!this.spec.get(z+"R")){continue}if(x[z]){if(this.backgroundImage&&this.spec.radiusSum(z)!==x[z]){curvyCorners.alert(this.errmsg("Not supported: unequal non-zero top/bottom radii with background image"))}var AL=(this.spec[z+"lR"]<this.spec[z+"rR"])?z+"l":z+"r";var l=document.createElement("div");l.style.height=x[z]+"px";l.style.width=this.spec.get(AL+"Ru");l.style.position="absolute";l.style.fontSize="1px";l.style.overflow="hidden";l.style.backgroundColor=this.boxColour;switch(AL){case"tl":l.style.bottom=l.style.left="0";l.style.borderLeft=this.borderString;this.topContainer.appendChild(l);break;case"tr":l.style.bottom=l.style.right="0";l.style.borderRight=this.borderString;this.topContainer.appendChild(l);break;case"bl":l.style.top=l.style.left="0";l.style.borderLeft=this.borderStringB;this.bottomContainer.appendChild(l);break;case"br":l.style.top=l.style.right="0";l.style.borderRight=this.borderStringB;this.bottomContainer.appendChild(l)}}var o=document.createElement("div");if(filter){o.style.filter=filter}o.style.position="relative";o.style.fontSize="1px";o.style.overflow="hidden";o.style.width=this.fillerWidth(z);o.style.backgroundColor=this.boxColour;o.style.backgroundImage=this.backgroundImage;o.style.backgroundRepeat=this.backgroundRepeat;switch(z){case"t":if(this.topContainer){if(curvyBrowser.quirksMode){o.style.height=100+H+"px"}else{o.style.height=100+H-this.borderWidth+"px"}o.style.marginLeft=this.spec.tlR?(this.spec.tlR-this.borderWidthL)+"px":"0";o.style.borderTop=this.borderString;if(this.backgroundImage){var AA=this.spec.tlR?(this.backgroundPosX-(H-this.borderWidthL))+"px ":"0 ";o.style.backgroundPosition=AA+this.backgroundPosY+"px";this.shell.style.backgroundPosition=this.backgroundPosX+"px "+(this.backgroundPosY-H+this.borderWidthL)+"px"}this.topContainer.appendChild(o)}break;case"b":if(this.bottomContainer){if(curvyBrowser.quirksMode){o.style.height=M+"px"}else{o.style.height=M-this.borderWidthB+"px"}o.style.marginLeft=this.spec.blR?(this.spec.blR-this.borderWidthL)+"px":"0";o.style.borderBottom=this.borderStringB;if(this.backgroundImage){var AA=this.spec.blR?(this.backgroundPosX+this.borderWidthL-M)+"px ":this.backgroundPosX+"px ";o.style.backgroundPosition=AA+(this.backgroundPosY-F-this.borderWidth+M)+"px"}this.bottomContainer.appendChild(o)}}}this.contentContainer.style.position="absolute";this.contentContainer.className="autoPadDiv";this.contentContainer.style.left=this.borderWidthL+"px";this.contentContainer.style.paddingTop=this.topPadding+"px";this.contentContainer.style.top=this.borderWidth+"px";this.contentContainer.style.paddingLeft=this.leftPadding+"px";this.contentContainer.style.paddingRight=this.rightPadding+"px";z=V;if(!curvyBrowser.quirksMode){z-=this.leftPadding+this.rightPadding}this.contentContainer.style.width=z+"px";this.contentContainer.style.textAlign=curvyBrowser.get_style(this.box,"textAlign");this.box.style.textAlign="left";this.box.appendChild(this.contentContainer);if(U){U.style.display="none"}};if(this.backgroundImage){R=this.backgroundCheck(R);P=this.backgroundCheck(P);if(this.backgroundObject){this.backgroundObject.holdingElement=this;this.dispatch=this.applyCorners;this.applyCorners=function(){if(this.backgroundObject.complete){this.dispatch()}else{this.backgroundObject.onload=new Function("curvyObject.dispatch(this.holdingElement);")}}}}}curvyObject.prototype.backgroundCheck=function(B){if(B==="top"||B==="left"||parseInt(B)===0){return 0}if(!(/^[-\d.]+px$/.test(B))&&!this.backgroundObject){this.backgroundObject=new Image;var A=function(D){var C=/url\("?([^'"]+)"?\)/.exec(D);return(C?C[1]:D)};this.backgroundObject.src=A(this.backgroundImage)}return B};curvyObject.dispatch=function(A){if("dispatch" in A){A.dispatch()}else{throw A.newError("No dispatch function")}};curvyObject.prototype.drawPixel=function(J,G,A,F,H,I,C,E){var B=document.createElement("div");B.style.height=H+"px";B.style.width="1px";B.style.position="absolute";B.style.fontSize="1px";B.style.overflow="hidden";var D=this.spec.get("tR");B.style.backgroundColor=A;if(C&&this.backgroundImage!=""){B.style.backgroundImage=this.backgroundImage;B.style.backgroundPosition="-"+(this.boxWidth-(E-J)+this.borderWidth)+"px -"+((this.boxHeight+D+G)-this.borderWidth)+"px"}if(F!=100){curvyObject.setOpacity(B,F)}B.style.top=G+"px";B.style.left=J+"px";I.appendChild(B)};curvyObject.prototype.fillerWidth=function(A){var B=curvyBrowser.quirksMode?0:this.spec.radiusCount(A)*this.borderWidthL;return(this.boxWidth-this.spec.radiusSum(A)+B)+"px"};curvyObject.prototype.errmsg=function(C,D){var B="\ntag: "+this.box.tagName;if(this.box.id){B+="\nid: "+this.box.id}if(this.box.className){B+="\nclass: "+this.box.className}var A;if((A=this.box.parentNode)===null){B+="\n(box has no parent)"}else{B+="\nParent tag: "+A.tagName;if(A.id){B+="\nParent ID: "+A.id}if(A.className){B+="\nParent class: "+A.className}}if(D===undefined){D="warning"}return"curvyObject "+D+":\n"+C+B};curvyObject.prototype.newError=function(A){return new Error(this.errmsg(A,"exception"))};curvyObject.IntToHex=function(B){var A=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];return A[B>>>4]+""+A[B&15]};curvyObject.BlendColour=function(L,J,G){if(L==="transparent"||J==="transparent"){throw this.newError("Cannot blend with transparent")}if(L.charAt(0)!=="#"){L=curvyObject.format_colour(L)}if(J.charAt(0)!=="#"){J=curvyObject.format_colour(J)}var D=parseInt(L.substr(1,2),16);var K=parseInt(L.substr(3,2),16);var F=parseInt(L.substr(5,2),16);var C=parseInt(J.substr(1,2),16);var I=parseInt(J.substr(3,2),16);var E=parseInt(J.substr(5,2),16);if(G>1||G<0){G=1}var H=Math.round((D*G)+(C*(1-G)));if(H>255){H=255}if(H<0){H=0}var B=Math.round((K*G)+(I*(1-G)));if(B>255){B=255}if(B<0){B=0}var A=Math.round((F*G)+(E*(1-G)));if(A>255){A=255}if(A<0){A=0}return"#"+curvyObject.IntToHex(H)+curvyObject.IntToHex(B)+curvyObject.IntToHex(A)};curvyObject.pixelFraction=function(H,G,A){var J;var E=A*A;var B=new Array(2);var F=new Array(2);var I=0;var C="";var D=Math.sqrt(E-Math.pow(H,2));if(D>=G&&D<(G+1)){C="Left";B[I]=0;F[I]=D-G;++I}D=Math.sqrt(E-Math.pow(G+1,2));if(D>=H&&D<(H+1)){C+="Top";B[I]=D-H;F[I]=1;++I}D=Math.sqrt(E-Math.pow(H+1,2));if(D>=G&&D<(G+1)){C+="Right";B[I]=1;F[I]=D-G;++I}D=Math.sqrt(E-Math.pow(G,2));if(D>=H&&D<(H+1)){C+="Bottom";B[I]=D-H;F[I]=0}switch(C){case"LeftRight":J=Math.min(F[0],F[1])+((Math.max(F[0],F[1])-Math.min(F[0],F[1]))/2);break;case"TopRight":J=1-(((1-B[0])*(1-F[1]))/2);break;case"TopBottom":J=Math.min(B[0],B[1])+((Math.max(B[0],B[1])-Math.min(B[0],B[1]))/2);break;case"LeftBottom":J=F[0]*B[1]/2;break;default:J=1}return J};curvyObject.rgb2Array=function(A){var B=A.substring(4,A.indexOf(")"));return B.split(", ")};curvyObject.rgb2Hex=function(B){try{var C=curvyObject.rgb2Array(B);var G=parseInt(C[0]);var E=parseInt(C[1]);var A=parseInt(C[2]);var D="#"+curvyObject.IntToHex(G)+curvyObject.IntToHex(E)+curvyObject.IntToHex(A)}catch(F){var H="getMessage" in F?F.getMessage():F.message;throw new Error("Error ("+H+") converting RGB value to Hex in rgb2Hex")}return D};curvyObject.setOpacity=function(F,C){C=(C==100)?99.999:C;if(curvyBrowser.isSafari&&F.tagName!="IFRAME"){var B=curvyObject.rgb2Array(F.style.backgroundColor);var E=parseInt(B[0]);var D=parseInt(B[1]);var A=parseInt(B[2]);F.style.backgroundColor="rgba("+E+", "+D+", "+A+", "+C/100+")"}else{if(typeof F.style.opacity!=="undefined"){F.style.opacity=C/100}else{if(typeof F.style.MozOpacity!=="undefined"){F.style.MozOpacity=C/100}else{if(typeof F.style.filter!="undefined"){F.style.filter="alpha(opacity="+C+")"}else{if(typeof F.style.KHTMLOpacity!="undefined"){F.style.KHTMLOpacity=C/100}}}}}};function addEvent(D,C,B,A){if(D.addEventListener){D.addEventListener(C,B,A);return true}if(D.attachEvent){return D.attachEvent("on"+C,B)}D["on"+C]=B;return false}curvyObject.getComputedColour=function(E){var F=document.createElement("DIV");F.style.backgroundColor=E;document.body.appendChild(F);if(window.getComputedStyle){var D=document.defaultView.getComputedStyle(F,null).getPropertyValue("background-color");F.parentNode.removeChild(F);if(D.substr(0,3)==="rgb"){D=curvyObject.rgb2Hex(D)}return D}else{var A=document.body.createTextRange();A.moveToElementText(F);A.execCommand("ForeColor",false,E);var B=A.queryCommandValue("ForeColor");var C="rgb("+(B&255)+", "+((B&65280)>>8)+", "+((B&16711680)>>16)+")";F.parentNode.removeChild(F);A=null;return curvyObject.rgb2Hex(C)}};curvyObject.format_colour=function(A){if(A!=""&&A!="transparent"){if(A.substr(0,3)==="rgb"){A=curvyObject.rgb2Hex(A)}else{if(A.charAt(0)!=="#"){A=curvyObject.getComputedColour(A)}else{if(A.length===4){A="#"+A.charAt(1)+A.charAt(1)+A.charAt(2)+A.charAt(2)+A.charAt(3)+A.charAt(3)}}}}return A};curvyCorners.getElementsByClass=function(H,F){var E=new Array;if(F===undefined){F=document}H=H.split(".");var A="*";if(H.length===1){A=H[0];H=false}else{if(H[0]){A=H[0]}H=H[1]}var D,C,B;if(A.charAt(0)==="#"){C=document.getElementById(A.substr(1));if(C){E.push(C)}}else{C=F.getElementsByTagName(A);B=C.length;if(H){var G=new RegExp("(^|\\s)"+H+"(\\s|$)");for(D=0;D<B;++D){if(G.test(C[D].className)){E.push(C[D])}}}else{for(D=0;D<B;++D){E.push(C[D])}}}return E};if(curvyBrowser.isMoz||curvyBrowser.isWebKit){var curvyCornersNoAutoScan=true}else{curvyCorners.scanStyles=function(){function B(F){var G=/^[\d.]+(\w+)$/.exec(F);return G[1]}var E,D,C;if(curvyBrowser.isIE){function A(L){var J=L.style;if(curvyBrowser.ieVer>6){var H=J["-webkit-border-radius"]||0;var K=J["-webkit-border-top-right-radius"]||0;var F=J["-webkit-border-top-left-radius"]||0;var G=J["-webkit-border-bottom-right-radius"]||0;var M=J["-webkit-border-bottom-left-radius"]||0}else{var H=J["webkit-border-radius"]||0;var K=J["webkit-border-top-right-radius"]||0;var F=J["webkit-border-top-left-radius"]||0;var G=J["webkit-border-bottom-right-radius"]||0;var M=J["webkit-border-bottom-left-radius"]||0}if(H||F||K||G||M){var I=new curvyCnrSpec(L.selectorText);if(H){I.setcorner(null,null,parseInt(H),B(H))}else{if(K){I.setcorner("t","r",parseInt(K),B(K))}if(F){I.setcorner("t","l",parseInt(F),B(F))}if(M){I.setcorner("b","l",parseInt(M),B(M))}if(G){I.setcorner("b","r",parseInt(G),B(G))}}curvyCorners(I)}}for(E=0;E<document.styleSheets.length;++E){if(document.styleSheets[E].imports){for(D=0;D<document.styleSheets[E].imports.length;++D){for(C=0;C<document.styleSheets[E].imports[D].rules.length;++C){A(document.styleSheets[E].imports[D].rules[C])}}}for(D=0;D<document.styleSheets[E].rules.length;++D){A(document.styleSheets[E].rules[D])}}}else{if(curvyBrowser.isOp){for(E=0;E<document.styleSheets.length;++E){if(operasheet.contains_border_radius(E)){C=new operasheet(E);for(D in C.rules){if(!isNaN(D)){curvyCorners(C.rules[D])}}}}}else{curvyCorners.alert("Scanstyles does nothing in Webkit/Firefox")}}};curvyCorners.init=function(){if(arguments.callee.done){return}arguments.callee.done=true;if(curvyBrowser.isWebKit&&curvyCorners.init.timer){clearInterval(curvyCorners.init.timer);curvyCorners.init.timer=null}curvyCorners.scanStyles()}}if(typeof curvyCornersNoAutoScan==="undefined"||curvyCornersNoAutoScan===false){if(curvyBrowser.isOp){document.addEventListener("DOMContentLoaded",curvyCorners.init,false)}else{addEvent(window,"load",curvyCorners.init,false)}};



// FROM: /javascripts/flexcroll.js?1294660143
/*
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



// FROM: /javascripts/code_highlighter.js?1294660143
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


// FROM: /javascripts/dragdrop.js?1294660143
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


// FROM: /javascripts/lightbox.js?1294660143
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




// FROM: /javascripts/tooltips.js?1294660143
// Tooltips Class
// A superclass to work with simple CSS selectors
var Tooltips = Class.create();
Tooltips.prototype = {
	initialize: function(selector, options) {
		var tooltips = $$(selector);
		tooltips.each( function(tooltip) {
			new Tooltip(tooltip, options);
		});
	}
};
// Tooltip Class
var Tooltip = Class.create();
Tooltip.prototype = {
	initialize: function(el, options) {
		this.el = $(el);
		this.initialized = false;
		this.setOptions(options);

		// Event handlers
		this.showEvent = this.show.bindAsEventListener(this);
		this.hideEvent = this.hide.bindAsEventListener(this);
		this.updateEvent = this.update.bindAsEventListener(this);
		Event.observe(this.el, "mouseover", this.showEvent );
		Event.observe(this.el, "mouseout", this.hideEvent );

		// Content for Tooltip is either given through
		// 'content' option or 'title' attribute of the trigger element. If 'content' is present, then 'title' attribute is ignored.
		// 'content' is an element or the id of an element from which the innerHTML is taken as content of the tooltip
		if (options && options['content']) {
			this.content = $(options['content']).innerHTML;
		} else {
			this.content = this.el.title.stripScripts().strip();
		}
		// Removing title from DOM element to avoid showing it
		this.content = this.el.title.stripScripts().strip();
		this.el.title = "";

		// If descendant elements has 'alt' attribute defined, clear it
		this.el.descendants().each(function(el){
			if(Element.readAttribute(el, 'alt'))
				el.alt = "";
		});
	},
	setOptions: function(options) {
		this.options = {
			backgroundColor: '#D9E6F7', // Default background color
			borderColor: '#666', // Default border color
			textColor: '', // Default text color (use CSS value)
			textShadowColor: '', // Default text shadow color (use CSS value)
			maxWidth: 250,	// Default tooltip width
			align: "left", // Default align
			delay: 250, // Default delay before tooltip appears in ms
			mouseFollow: true, // Tooltips follows the mouse moving
			opacity: .95, // Default tooltips opacity
			appearDuration: .25, // Default appear duration in sec
			hideDuration: .25 // Default disappear duration in sec
		};
		Object.extend(this.options, options || {});
	},
	show: function(e) {
		this.xCord = Event.pointerX(e);
		this.yCord = Event.pointerY(e);
		if(!this.initialized)
			this.timeout = window.setTimeout(this.appear.bind(this), this.options.delay);
	},
	hide: function(e) {
		if(this.initialized) {
			this.appearingFX.cancel();
			if(this.options.mouseFollow)
				Event.stopObserving(this.el, "mousemove", this.updateEvent);
			new Effect.Fade(this.tooltip, {duration: this.options.hideDuration, afterFinish: function() { Element.remove(this.tooltip) }.bind(this) });
		}
		this._clearTimeout(this.timeout);

		this.initialized = false;
	},
	update: function(e){
		this.xCord = Event.pointerX(e);
		this.yCord = Event.pointerY(e);
		this.setup();
	},
	appear: function() {
		// Building tooltip container
		this.tooltip = new Element("div", { className: "tooltip", style: "display: none" });

		var arrow = new Element("div", { className: "xarrow" }).insert('<b class="a1"></b><b class="a2"></b><b class="a3"></b><b class="a4"></b><b class="a5"></b><b class="a6"></b>');

		var top = new Element("div", { className: "xtop" }).insert(
			new Element("div", { className: "xb1", style: "background-color:" + this.options.borderColor + ";" })
		).insert(
			new Element("div", { className: "xb2", style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";" })
		).insert(
			new Element("div", { className: "xb3", style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";" })
		).insert(
			new Element("div", { className: "xb4", style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";" })
		);

		var bottom = new Element("div", { className: "xbottom" }).insert(
			new Element("div", { className: "xb4", style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";" })
		).insert(
			new Element("div", { className: "xb3", style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";" })
		).insert(
			new Element("div", { className: "xb2", style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";" })
		).insert(
			new Element("div", { className: "xb1", style:"background-color:" + this.options.borderColor + ";" })
		);

		var content = new Element("div", { className: "xboxcontent", style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor +
			((this.options.textColor != '') ? "; color:" + this.options.textColor : "") +
			((this.options.textShadowColor != '') ? "; text-shadow:2px 2px 0" + this.options.textShadowColor + ";" : "") }).update(this.content);

		// Building and injecting tooltip into DOM
		this.tooltip.insert(arrow).insert(top).insert(content).insert(bottom);
		$(document.body).insert({'top':this.tooltip});

		// Coloring arrow element
		this.tooltip.select('.xarrow b').each(function(el){
			if(!el.hasClassName('a1'))
				el.setStyle({backgroundColor: this.options.backgroundColor, borderColor: this.options.borderColor });
			else
				el.setStyle({backgroundColor: this.options.borderColor });
		}.bind(this));

		Element.extend(this.tooltip); // IE needs element to be manually extended
		this.options.width = this.tooltip.getWidth() + 1; // Quick fix for Firefox 3
		this.tooltip.style.width = this.options.width + 'px'; // IE7 needs width to be defined

		this.setup();

		if(this.options.mouseFollow)
			Event.observe(this.el, "mousemove", this.updateEvent);

		this.initialized = true;
		this.appearingFX = new Effect.Appear(this.tooltip, {duration: this.options.appearDuration, to: this.options.opacity });
	},
	setup: function(){
		// If content width is more then allowed max width, set width to max
		if(this.options.width > this.options.maxWidth) {
			this.options.width = this.options.maxWidth;
			this.tooltip.style.width = this.options.width + 'px';
		}

		// Tooltip doesn't fit the current document dimensions
		if(this.xCord + this.options.width >= Element.getWidth(document.body)) {
			this.options.align = "right";
			this.xCord = this.xCord - this.options.width + 20;
			this.tooltip.down('.xarrow').setStyle({left: this.options.width - 24 + 'px'});
		} else {
			this.options.align = "left";
			this.tooltip.down('.xarrow').setStyle({left: 12 + 'px'});
		}

		this.tooltip.style.left = this.xCord - 7 + "px";
		this.tooltip.style.top = this.yCord + 12 + "px";
	},
	_clearTimeout: function(timer) {
		clearTimeout(timer);
		clearInterval(timer);
		return null;
	}
};


// FROM: /javascripts/AC_OETags.js?1294660143
// Flash Player Version Detection - Rev 1.6
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful.

			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}

	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;

	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			} else if (versionRevision[0] == "b") {
				versionRevision = versionRevision.substring(1);
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  var qIndex = src.indexOf('?');
  if ( qIndex != -1)
  {
    // Add the extention (if needed) before the query params
    var path = src.substring(0, qIndex);
    if (path.length >= ext.length && path.lastIndexOf(ext) == (path.length - ext.length))
      return src;
    else
      return src.replace(/\?/, ext+'?');
  }
  else
  {
    // Add the extension (if needed) to the end of the URL
    if (src.length >= ext.length && src.lastIndexOf(ext) == (src.length - ext.length))
      return src;  // Already have extension
    else
      return src + ext;
  }
}

function AC_Generateobj(objAttrs, params, embedAttrs)
{
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		str += '>';
  		for (var i in params)
  			str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '</object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret =
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();

    switch (currArg){
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "id":
      case "width":
      case "height":
      case "align":
      case "vspace":
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}





// FROM: /javascripts/javascript.js?1294660143
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


// FROM: /javascripts/html.js?1294660143
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


// FROM: /javascripts/window.js?1294660143
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




// FROM: /javascripts/window_effects.js?1294660143
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




// FROM: /javascripts/scriptaculous.js?1294660143
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


// FROM: /javascripts/jwplayer.js?1294660143
jwplayer=function(a){return jwplayer.constructor(a)};jwplayer.constructor=function(a){};$jw=jwplayer;jwplayer.utils=function(){};jwplayer.utils.typeOf=function(b){var a=typeof b;if(a==="object"){if(b){if(b instanceof Array){a="array"}}else{a="null"}}return a};jwplayer.utils.extend=function(){var a=jwplayer.utils.extend["arguments"];if(a.length>1){for(var b=1;b<a.length;b++){for(element in a[b]){a[0][element]=a[b][element]}}return a[0]}return null};jwplayer.utils.extension=function(a){return a.substr(a.lastIndexOf(".")+1,a.length).toLowerCase()};jwplayer.utils.html=function(a,b){a.innerHTML=b};jwplayer.utils.append=function(a,b){a.appendChild(b)};jwplayer.utils.wrap=function(a,b){a.parentNode.replaceChild(b,a);b.appendChild(a)};jwplayer.utils.ajax=function(d,c,a){var b;if(window.XMLHttpRequest){b=new XMLHttpRequest()}else{b=new ActiveXObject("Microsoft.XMLHTTP")}b.onreadystatechange=function(){if(b.readyState===4){if(b.status===200){if(c){c(b)}}else{if(a){a(d)}}}};b.open("GET",d,true);b.send(null);return b};jwplayer.utils.load=function(b,c,a){b.onreadystatechange=function(){if(b.readyState===4){if(b.status===200){if(c){c()}}else{if(a){a()}}}}};jwplayer.utils.find=function(b,a){return b.getElementsByTagName(a)};jwplayer.utils.append=function(a,b){a.appendChild(b)};jwplayer.utils.isIE=function(){return(!+"\v1")};jwplayer.utils.isIOS=function(){var a=navigator.userAgent.toLowerCase();return(a.match(/iP(hone|ad)/i)!==null)};jwplayer.utils.hasHTML5=function(b){var a=document.createElement("video");if(!!a.canPlayType){if(b){var d={};if(b.playlist&&b.playlist.length){d.file=b.playlist[0].file;d.levels=b.playlist[0].levels}else{d.file=b.file;d.levels=b.levels}if(d.file){return jwplayer.utils.vidCanPlay(a,d.file)}else{if(d.levels&&d.levels.length){for(var c=0;c<d.levels.length;c++){if(d.levels[c].file&&jwplayer.utils.vidCanPlay(a,d.levels[c].file)){return true}}}}}else{return true}}return false};jwplayer.utils.vidCanPlay=function(b,a){var c=jwplayer.utils.strings.extension(a);if(jwplayer.utils.extensionmap[c]!==undefined){sourceType=jwplayer.utils.extensionmap[c]}else{sourceType="video/"+c+";"}return b.canPlayType(sourceType)};jwplayer.utils.hasFlash=function(){return(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]!="undefined")||(typeof window.ActiveXObject!="undefined")};(function(e){e.utils.mediaparser=function(){};var g={element:{width:"width",height:"height",id:"id","class":"className",name:"name"},media:{src:"file",preload:"preload",autoplay:"autostart",loop:"repeat",controls:"controls"},source:{src:"file",type:"type",media:"media","data-jw-width":"width","data-jw-bitrate":"bitrate"},video:{poster:"image"}};var f={};e.utils.mediaparser.parseMedia=function(i){return d(i)};function c(j,i){if(i===undefined){i=g[j]}else{e.utils.extend(i,g[j])}return i}function d(m,i){if(f[m.tagName.toLowerCase()]&&(i===undefined)){return f[m.tagName.toLowerCase()](m)}else{i=c("element",i);var n={};for(var j in i){if(j!="length"){var l=m.getAttribute(j);if(!(l===""||l===undefined||l===null)){n[i[j]]=m.getAttribute(j)}}}var k=m.style["#background-color"];if(k&&!(k=="transparent"||k=="rgba(0, 0, 0, 0)")){n.screencolor=k}return n}}function h(o,k){k=c("media",k);var m=[];if(e.utils.isIE()){var l=o.nextSibling;if(l!==undefined){while(l.tagName.toLowerCase()=="source"){m.push(a(l));l=l.nextSibling}}}else{var j=e.utils.selectors("source",o);for(var n in j){if(!isNaN(n)){m.push(a(j[n]))}}}var p=d(o,k);if(p.file!==undefined){m[0]={file:p.file}}p.levels=m;return p}function a(k,j){j=c("source",j);var i=d(k,j);i.width=i.width?i.width:0;i.bitrate=i.bitrate?i.bitrate:0;return i}function b(k,j){j=c("video",j);var i=h(k,j);return i}e.utils.mediaparser.replaceMediaElement=function(i,k){if(e.utils.isIE()){var l=false;var n=[];var m=i.nextSibling;while(m&&!l){n.push(m);if(m.nodeType==1&&m.tagName.toLowerCase()==("/")+i.tagName.toLowerCase()){l=true}m=m.nextSibling}if(l){while(n.length>0){var j=n.pop();j.parentNode.removeChild(j)}}i.outerHTML=k}};f.media=h;f.audio=h;f.source=a;f.video=b})(jwplayer);jwplayer.utils.selectors=function(a,c){if(c===undefined){c=document}a=jwplayer.utils.strings.trim(a);var b=a.charAt(0);if(b=="#"){return c.getElementById(a.substr(1))}else{if(b=="."){if(c.getElementsByClassName){return c.getElementsByClassName(a.substr(1))}else{return jwplayer.utils.selectors.getElementsByTagAndClass("*",a.substr(1))}}else{if(a.indexOf(".")>0){selectors=a.split(".");return jwplayer.utils.selectors.getElementsByTagAndClass(selectors[0],selectors[1])}else{return c.getElementsByTagName(a)}}}return null};jwplayer.utils.selectors.getElementsByTagAndClass=function(d,g,f){elements=[];if(f===undefined){f=document}var e=f.getElementsByTagName(d);for(var c=0;c<e.length;c++){if(e[c].className!==undefined){var b=e[c].className.split(" ");for(var a=0;a<b.length;a++){if(b[a]==g){elements.push(e[c])}}}}return elements};jwplayer.utils.strings=function(){};jwplayer.utils.strings.trim=function(a){return a.replace(/^\s*/,"").replace(/\s*$/,"")};jwplayer.utils.strings.extension=function(a){return a.substr(a.lastIndexOf(".")+1,a.length).toLowerCase()};(function(a){a.utils.extensionmap={"3gp":"video/3gpp","3gpp":"video/3gpp","3g2":"video/3gpp2","3gpp2":"video/3gpp2",flv:"video/x-flv",f4a:"audio/mp4",f4b:"audio/mp4",f4p:"video/mp4",f4v:"video/mp4",mov:"video/quicktime",m4a:"audio/mp4",m4b:"audio/mp4",m4p:"audio/mp4",m4v:"video/mp4",mkv:"video/x-matroska",mp4:"video/mp4",sdp:"application/sdp",vp6:"video/x-vp6",aac:"audio/aac",mp3:"audio/mp3",ogg:"audio/ogg",ogv:"video/ogg",webm:"video/webm"}})(jwplayer);(function(b){var a=[];b.constructor=function(c){return b.api.selectPlayer(c)};b.api=function(){};b.api.events={API_READY:"jwplayerAPIReady",JWPLAYER_READY:"jwplayerReady",JWPLAYER_FULLSCREEN:"jwplayerFullscreen",JWPLAYER_RESIZE:"jwplayerResize",JWPLAYER_ERROR:"jwplayerError",JWPLAYER_MEDIA_BUFFER:"jwplayerMediaBuffer",JWPLAYER_MEDIA_BUFFER_FULL:"jwplayerMediaBufferFull",JWPLAYER_MEDIA_ERROR:"jwplayerMediaError",JWPLAYER_MEDIA_LOADED:"jwplayerMediaLoaded",JWPLAYER_MEDIA_COMPLETE:"jwplayerMediaComplete",JWPLAYER_MEDIA_TIME:"jwplayerMediaTime",JWPLAYER_MEDIA_VOLUME:"jwplayerMediaVolume",JWPLAYER_MEDIA_META:"jwplayerMediaMeta",JWPLAYER_MEDIA_MUTE:"jwplayerMediaMute",JWPLAYER_PLAYER_STATE:"jwplayerPlayerState",JWPLAYER_PLAYLIST_LOADED:"jwplayerPlaylistLoaded",JWPLAYER_PLAYLIST_ITEM:"jwplayerPlaylistItem"};b.api.events.state={BUFFERING:"BUFFERING",IDLE:"IDLE",PAUSED:"PAUSED",PLAYING:"PLAYING"};b.api.PlayerAPI=function(d){this.container=d;this.id=d.id;var j={};var o={};var c=[];var g=undefined;var i=false;var h=[];var m=d.outerHTML;var n={};var k=0;this.setPlayer=function(p){g=p};this.stateListener=function(p,q){if(!o[p]){o[p]=[];this.eventListener(b.api.events.JWPLAYER_PLAYER_STATE,f(p))}o[p].push(q);return this};function f(p){return function(r){var q=r.newstate,t=r.oldstate;if(q==p){var s=o[q];if(s){for(var u in s){if(typeof s[u]=="function"){s[u].call(this,{oldstate:t,newstate:q})}}}}}}this.addInternalListener=function(p,q){p.jwAddEventListener(q,'function(dat) { jwplayer("'+this.id+'").dispatchEvent("'+q+'", dat); }')};this.eventListener=function(p,q){if(!j[p]){j[p]=[];if(g&&i){this.addInternalListener(g,p)}}j[p].push(q);return this};this.dispatchEvent=function(r){if(j[r]){var q=e(r,arguments[1]);for(var p in j[r]){if(typeof j[r][p]=="function"){j[r][p].call(this,q)}}}};function e(q,p){var r=b.utils.extend({},p);if(q==b.api.events.JWPLAYER_FULLSCREEN){r.fullscreen=r.message;delete r.message}else{if(q==b.api.events.JWPLAYER_PLAYLIST_ITEM){if(r.item&&r.index===undefined){r.index=r.item;delete r.item}}else{if(typeof r.data=="object"){r=b.utils.extend(r,r.data);delete r.data}}}return r}this.callInternal=function(q,p){if(i){if(typeof g!="undefined"&&typeof g[q]=="function"){if(p!==undefined){return(g[q])(p)}else{return(g[q])()}}return null}else{h.push({method:q,parameters:p})}};this.playerReady=function(r){i=true;if(!g){this.setPlayer(document.getElementById(r.id))}this.container=document.getElementById(this.id);for(var p in j){this.addInternalListener(g,p)}this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM,function(s){if(s.index!==undefined){k=s.index}else{if(s.item!==undefined){k=s.item}}n={}});this.eventListener(b.api.events.JWPLAYER_MEDIA_META,function(s){b.utils.extend(n,s.metadata)});this.dispatchEvent(b.api.events.API_READY);while(h.length>0){var q=h.shift();this.callInternal(q.method,q.parameters)}};this.getItemMeta=function(){return n};this.getCurrentItem=function(){return k};this.destroy=function(){j={};h=[];if(this.container.outerHTML!=m){b.api.destroyPlayer(this.id,m)}};function l(r,t,s){var p=[];if(!t){t=0}if(!s){s=r.length-1}for(var q=t;q<=s;q++){p.push(r[q])}return p}};b.api.PlayerAPI.prototype={container:undefined,options:undefined,id:undefined,getBuffer:function(){return this.callInternal("jwGetBuffer")},getDuration:function(){return this.callInternal("jwGetDuration")},getFullscreen:function(){return this.callInternal("jwGetFullscreen")},getHeight:function(){return this.callInternal("jwGetHeight")},getLockState:function(){return this.callInternal("jwGetLockState")},getMeta:function(){return this.getItemMeta()},getMute:function(){return this.callInternal("jwGetMute")},getPlaylist:function(){var d=this.callInternal("jwGetPlaylist");for(var c=0;c<d.length;c++){if(d[c].index===undefined){d[c].index=c}}return d},getPlaylistItem:function(c){if(c==undefined){c=this.getCurrentItem()}return this.getPlaylist()[c]},getPosition:function(){return this.callInternal("jwGetPosition")},getState:function(){return this.callInternal("jwGetState")},getVolume:function(){return this.callInternal("jwGetVolume")},getWidth:function(){return this.callInternal("jwGetWidth")},setFullscreen:function(c){if(c===undefined){this.callInternal("jwSetFullscreen",true)}else{this.callInternal("jwSetFullscreen",c)}return this},setMute:function(c){if(c===undefined){this.callInternal("jwSetMute",true)}else{this.callInternal("jwSetMute",c)}return this},lock:function(){return this},unlock:function(){return this},load:function(c){this.callInternal("jwLoad",c);return this},playlistItem:function(c){this.callInternal("jwPlaylistItem",c);return this},playlistPrev:function(){this.callInternal("jwPlaylistPrev");return this},playlistNext:function(){this.callInternal("jwPlaylistNext");return this},resize:function(d,c){this.container.width=d;this.container.height=c;return this},play:function(c){if(typeof c==="undefined"){var c=this.getState();if(c==b.api.events.state.PLAYING||c==b.api.events.state.BUFFERING){this.callInternal("jwPause")}else{this.callInternal("jwPlay")}}else{this.callInternal("jwPlay",c)}return this},pause:function(){var c=this.getState();switch(c){case b.api.events.state.PLAYING:case b.api.events.state.BUFFERING:this.callInternal("jwPause");break;case b.api.events.state.PAUSED:this.callInternal("jwPlay");break}return this},stop:function(){this.callInternal("jwStop");return this},seek:function(c){this.callInternal("jwSeek",c);return this},setVolume:function(c){this.callInternal("jwSetVolume",c);return this},onBufferChange:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER,c)},onBufferFull:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL,c)},onError:function(c){return this.eventListener(b.api.events.JWPLAYER_ERROR,c)},onFullscreen:function(c){return this.eventListener(b.api.events.JWPLAYER_FULLSCREEN,c)},onMeta:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_META,c)},onMute:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_MUTE,c)},onPlaylist:function(c){return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,c)},onPlaylistItem:function(c){return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM,c)},onReady:function(c){return this.eventListener(b.api.events.API_READY,c)},onResize:function(c){return this.eventListener(b.api.events.JWPLAYER_RESIZE,c)},onComplete:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE,c)},onTime:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_TIME,c)},onVolume:function(c){return this.eventListener(b.api.events.JWPLAYER_MEDIA_VOLUME,c)},onBuffer:function(c){return this.stateListener(b.api.events.state.BUFFERING,c)},onPause:function(c){return this.stateListener(b.api.events.state.PAUSED,c)},onPlay:function(c){return this.stateListener(b.api.events.state.PLAYING,c)},onIdle:function(c){return this.stateListener(b.api.events.state.IDLE,c)},setup:function(c){return this},remove:function(){this.destroy()},initializePlugin:function(c,d){return this}};b.api.selectPlayer=function(d){var c;if(d==undefined){d=0}if(d.nodeType){c=d}else{if(typeof d=="string"){c=document.getElementById(d)}}if(c){var e=b.api.playerById(c.id);if(e){return e}else{return b.api.addPlayer(new b.api.PlayerAPI(c))}}else{if(typeof d=="number"){return b.getPlayers()[d]}}return null};b.api.playerById=function(d){for(var c in a){if(a[c].id==d){return a[c]}}return null};b.api.addPlayer=function(d){for(var c in a){if(a[c]==d){return d}}a.push(d);return d};b.api.destroyPlayer=function(f,d){var e=-1;for(var h in a){if(a[h].id==f){e=h;continue}}if(e>=0){var c=document.getElementById(a[e].id);if(c){if(d){c.outerHTML=d}else{var g=document.createElement("div");g.setAttribute("id",c.id);c.parentNode.replaceChild(g,c)}}a.splice(e,1)}return null};b.getPlayers=function(){return a.slice(0)}})(jwplayer);var _userPlayerReady=(typeof playerReady=="function")?playerReady:undefined;playerReady=function(b){var a=jwplayer.api.playerById(b.id);if(a){a.playerReady(b)}if(_userPlayerReady){_userPlayerReady.call(this,b)}};(function(a){a.embed=function(){};a.embed.Embedder=function(c){this.constructor(c)};a.embed.defaults={width:400,height:300,players:[{type:"flash",src:"player.swf"},{type:"html5"}],components:{controlbar:{position:"over"}}};a.embed.Embedder.prototype={config:undefined,api:undefined,events:{},players:undefined,constructor:function(d){this.api=d;var c=a.utils.mediaparser.parseMedia(this.api.container);this.config=this.parseConfig(a.utils.extend({},a.embed.defaults,c,this.api.config))},embedPlayer:function(){var c=this.players[0];if(c&&c.type){switch(c.type){case"flash":if(a.utils.hasFlash()){if(this.config.file&&!this.config.provider){switch(a.utils.extension(this.config.file).toLowerCase()){case"webm":case"ogv":case"ogg":this.config.provider="video";break}}if(this.config.levels||this.config.playlist){this.api.onReady(this.loadAfterReady(this.config))}this.config.id=this.api.id;var e=a.embed.embedFlash(document.getElementById(this.api.id),c,this.config);this.api.container=e;this.api.setPlayer(e)}else{this.players.splice(0,1);return this.embedPlayer()}break;case"html5":if(a.utils.hasHTML5(this.config)){var d=a.embed.embedHTML5(document.getElementById(this.api.id),c,this.config);this.api.container=document.getElementById(this.api.id);this.api.setPlayer(d)}else{this.players.splice(0,1);return this.embedPlayer()}break}}else{this.api.container.innerHTML="<p>No suitable players found</p>"}this.setupEvents();return this.api},setupEvents:function(){for(evt in this.events){if(typeof this.api[evt]=="function"){(this.api[evt]).call(this.api,this.events[evt])}}},loadAfterReady:function(c){return function(e){if(c.playlist){this.load(c.playlist)}else{if(c.levels){var d=this.getPlaylistItem(0);if(!d){d={file:c.levels[0].file,provider:(c.provider?c.provider:"video")}}if(!d.image){d.image=c.image}d.levels=c.levels;this.load(d)}}}},parseConfig:function(c){var d=a.utils.extend({},c);if(d.events){this.events=d.events;delete d.events}if(d.players){this.players=d.players;delete d.players}if(d.plugins){if(typeof d.plugins=="object"){d=a.utils.extend(d,a.embed.parsePlugins(d.plugins))}}if(d.playlist&&typeof d.playlist==="string"&&!d["playlist.position"]){d["playlist.position"]=d.playlist;delete d.playlist}if(d.controlbar&&typeof d.controlbar==="string"&&!d["controlbar.position"]){d["controlbar.position"]=d.controlbar;delete d.controlbar}return d}};a.embed.embedFlash=function(e,i,d){var j=a.utils.extend({},d);var g=j.width;delete j.width;var c=j.height;delete j.height;delete j.levels;delete j.playlist;a.embed.parseConfigBlock(j,"components");a.embed.parseConfigBlock(j,"providers");if(a.utils.isIE()){var f='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+g+'" height="'+c+'" id="'+e.id+'" name="'+e.id+'">';f+='<param name="movie" value="'+i.src+'">';f+='<param name="allowfullscreen" value="true">';f+='<param name="allowscriptaccess" value="always">';f+='<param name="wmode" value="opaque">';f+='<param name="flashvars" value="'+a.embed.jsonToFlashvars(j)+'">';f+="</object>";if(e.tagName.toLowerCase()=="video"){a.utils.mediaparser.replaceMediaElement(e,f)}else{e.outerHTML=f}return document.getElementById(e.id)}else{var h=document.createElement("object");h.setAttribute("type","application/x-shockwave-flash");h.setAttribute("data",i.src);h.setAttribute("width",g);h.setAttribute("height",c);h.setAttribute("id",e.id);h.setAttribute("name",e.id);a.embed.appendAttribute(h,"allowfullscreen","true");a.embed.appendAttribute(h,"allowscriptaccess","always");a.embed.appendAttribute(h,"wmode","opaque");a.embed.appendAttribute(h,"flashvars",a.embed.jsonToFlashvars(j));e.parentNode.replaceChild(h,e);return h}};a.embed.embedHTML5=function(d,f,e){if(a.html5){d.innerHTML="";var c=a.utils.extend({screencolor:"0x000000"},e);a.embed.parseConfigBlock(c,"components");if(c.levels&&!c.sources){c.sources=e.levels}if(c.skin&&c.skin.toLowerCase().indexOf(".zip")>0){c.skin=c.skin.replace(/\.zip/i,".xml")}return new (a.html5(d)).setup(c)}else{return null}};a.embed.appendAttribute=function(d,c,e){var f=document.createElement("param");f.setAttribute("name",c);f.setAttribute("value",e);d.appendChild(f)};a.embed.jsonToFlashvars=function(d){var c="";for(key in d){c+=key+"="+escape(d[key])+"&"}return c.substring(0,c.length-1)};a.embed.parsePlugins=function(e){if(!e){return{}}var g={},f=[];for(plugin in e){var d=plugin.indexOf("-")>0?plugin.substring(0,plugin.indexOf("-")):plugin;var c=e[plugin];f.push(plugin);for(param in c){g[d+"."+param]=c[param]}}g.plugins=f.join(",");return g};a.embed.parseConfigBlock=function(f,e){if(f[e]){var h=f[e];for(var d in h){var c=h[d];if(typeof c=="string"){if(!f[d]){f[d]=c}}else{for(var g in c){if(!f[d+"."+g]){f[d+"."+g]=c[g]}}}}delete f[e]}};a.api.PlayerAPI.prototype.setup=function(d,e){if(d&&d.flashplayer&&!d.players){d.players=[{type:"flash",src:d.flashplayer},{type:"html5"}];delete d.flashplayer}if(e&&!d.players){if(typeof e=="string"){d.players=[{type:"flash",src:e}]}else{if(e instanceof Array){d.players=e}else{if(typeof e=="object"&&e.type){d.players=[e]}}}}var c=this.id;this.remove();var f=a(c);f.config=d;return(new a.embed.Embedder(f)).embedPlayer()};function b(){if(!document.body){return setTimeout(b,15)}var c=a.utils.selectors.getElementsByTagAndClass("video","jwplayer");for(var d=0;d<c.length;d++){var e=c[d];a(e.id).setup({players:[{type:"flash",src:"/jwplayer/player.swf"},{type:"html5"}]})}}b()})(jwplayer);(function(a){a.html5=function(b){var c=b;this.setup=function(d){a.utils.extend(this,new a.html5.api(c,d));return this};return this};a.html5.version="5.3"})(jwplayer);(function(b){b.html5.utils=function(){};b.html5.utils.extension=function(d){return d.substr(d.lastIndexOf(".")+1,d.length).toLowerCase()};b.html5.utils.getAbsolutePath=function(j){if(j===undefined){return undefined}if(a(j)){return j}var k=document.location.href.substring(0,document.location.href.indexOf("://")+3);var h=document.location.href.substring(k.length,document.location.href.indexOf("/",k.length+1));var e;if(j.indexOf("/")===0){e=j.split("/")}else{var f=document.location.href.split("?")[0];f=f.substring(k.length+h.length+1,f.lastIndexOf("/"));e=f.split("/").concat(j.split("/"))}var d=[];for(var g=0;g<e.length;g++){if(!e[g]||e[g]===undefined||e[g]=="."){continue}else{if(e[g]==".."){d.pop()}else{d.push(e[g])}}}return k+h+"/"+d.join("/")};function a(e){if(e===null){return}var f=e.indexOf("://");var d=e.indexOf("?");return(f>0&&(d<0||(d>f)))}b.html5.utils.mapEmpty=function(d){for(var e in d){return false}return true};b.html5.utils.mapLength=function(e){var d=0;for(var f in e){d++}return d};b.html5.utils.log=function(e,d){if(typeof console!="undefined"&&typeof console.log!="undefined"){if(d){console.log(e,d)}else{console.log(e)}}};b.html5.utils.css=function(e,h,d){if(e!==undefined){for(var f in h){try{if(typeof h[f]==="undefined"){continue}else{if(typeof h[f]=="number"&&!(f=="zIndex"||f=="opacity")){if(isNaN(h[f])){continue}if(f.match(/color/i)){h[f]="#"+c(h[f].toString(16),6)}else{h[f]=h[f]+"px"}}}e.style[f]=h[f]}catch(g){}}}};function c(d,e){while(d.length<e){d="0"+d}return d}b.html5.utils.isYouTube=function(d){return d.indexOf("youtube.com")>-1};b.html5.utils.getYouTubeId=function(d){d.indexOf("youtube.com">0)}})(jwplayer);(function(b){var c=b.html5.utils.css;b.html5.view=function(p,n,e){var s=p;var k=n;var v=e;var u;var f;var z;var q;var A;var m;function x(){u=document.createElement("div");u.id=k.id;u.className=k.className;k.id=u.id+"_video";c(u,{position:"relative",height:v.height,width:v.width,padding:0,backgroundColor:C(),zIndex:0});function C(){if(s.skin.getComponentSettings("display")&&s.skin.getComponentSettings("display").backgroundcolor){return s.skin.getComponentSettings("display").backgroundcolor}return parseInt("000000",16)}c(k,{position:"absolute",width:v.width,height:v.height,top:0,left:0,zIndex:1,margin:"auto",display:"block"});b.utils.wrap(k,u);q=document.createElement("div");q.id=u.id+"_displayarea";u.appendChild(q)}function i(){for(var C in v.plugins.order){var D=v.plugins.order[C];if(v.plugins.object[D].getDisplayElement!==undefined){v.plugins.object[D].height=B(v.plugins.object[D].getDisplayElement().style.height);v.plugins.object[D].width=B(v.plugins.object[D].getDisplayElement().style.width);v.plugins.config[D].currentPosition=v.plugins.config[D].position}}t()}function t(D){if(v.getMedia()!==undefined){for(var C in v.plugins.order){var E=v.plugins.order[C];if(v.plugins.object[E].getDisplayElement!==undefined){if(v.config.chromeless||v.getMedia().hasChrome()){v.plugins.config[E].currentPosition=b.html5.view.positions.NONE}else{v.plugins.config[E].currentPosition=v.plugins.config[E].position}}}}h(v.width,v.height)}function B(C){if(typeof C=="number"){return C}if(C===""){return 0}return parseInt(C.replace("px",""),10)}function o(){m=setInterval(function(){if(u.width&&u.height&&(v.width!==B(u.width)||v.height!==B(u.height))){h(B(u.width),B(u.height))}else{var C=u.getBoundingClientRect();if(v.width!==C.width||v.height!==C.height){h(C.width,C.height)}delete C}},100)}this.setup=function(C){k=C;x();i();s.jwAddEventListener(b.api.events.JWPLAYER_MEDIA_LOADED,t);o();var D;if(window.onresize!==null){D=window.onresize}window.onresize=function(E){if(D!==undefined){try{D(E)}catch(F){}}if(s.jwGetFullscreen()){v.width=window.innerWidth;v.height=window.innerHeight}h(v.width,v.height)}};function g(C){switch(C.keyCode){case 27:if(s.jwGetFullscreen()){s.jwSetFullscreen(false)}break;case 32:if(s.jwGetState()!=b.api.events.state.IDLE&&s.jwGetState()!=b.api.events.state.PAUSED){s.jwPause()}else{s.jwPlay()}break}}function h(F,C){if(u.style.display=="none"){return}var E=[].concat(v.plugins.order);E.reverse();A=E.length+2;if(!v.fullscreen){v.width=F;v.height=C;f=F;z=C;c(q,{top:0,bottom:0,left:0,right:0,width:F,height:C});c(u,{height:z,width:f});var D=l(r,E);if(D.length>0){A+=D.length;l(j,D,true)}w()}else{l(y,E,true)}}function l(H,E,F){var D=[];for(var C in E){var I=E[C];if(v.plugins.object[I].getDisplayElement!==undefined){if(v.plugins.config[I].currentPosition.toUpperCase()!==b.html5.view.positions.NONE){var G=H(I,A--);if(!G){D.push(I)}else{v.plugins.object[I].resize(G.width,G.height);if(F){delete G.width;delete G.height}c(v.plugins.object[I].getDisplayElement(),G)}}else{c(v.plugins.object[I].getDisplayElement(),{display:"none"})}}}return D}function r(D,E){if(v.plugins.object[D].getDisplayElement!==undefined){if(a(v.plugins.config[D].position)){if(v.plugins.object[D].getDisplayElement().parentNode===null){u.appendChild(v.plugins.object[D].getDisplayElement())}var C=d(D);C.zIndex=E;return C}}return false}function j(C,D){if(v.plugins.object[C].getDisplayElement().parentNode===null){q.appendChild(v.plugins.object[C].getDisplayElement())}return{position:"absolute",width:(v.width-B(q.style.left)-B(q.style.right)),height:(v.height-B(q.style.top)-B(q.style.bottom)),zIndex:D}}function y(C,D){return{position:"fixed",width:v.width,height:v.height,zIndex:D}}function w(){q.style.position="absolute";var C={position:"absolute",width:B(q.style.width),height:B(q.style.height),top:B(q.style.top),left:B(q.style.left)};c(v.getMedia().getDisplayElement(),C)}function d(D){var E={position:"absolute",margin:0,padding:0,top:null};var C=v.plugins.config[D].currentPosition.toLowerCase();switch(C.toUpperCase()){case b.html5.view.positions.TOP:E.top=B(q.style.top);E.left=B(q.style.left);E.width=f-B(q.style.left)-B(q.style.right);E.height=v.plugins.object[D].height;q.style[C]=B(q.style[C])+v.plugins.object[D].height+"px";q.style.height=B(q.style.height)-E.height+"px";break;case b.html5.view.positions.RIGHT:E.top=B(q.style.top);E.right=B(q.style.right);E.width=E.width=v.plugins.object[D].width;E.height=z-B(q.style.top)-B(q.style.bottom);q.style[C]=B(q.style[C])+v.plugins.object[D].width+"px";q.style.width=B(q.style.width)-E.width+"px";break;case b.html5.view.positions.BOTTOM:E.bottom=B(q.style.bottom);E.left=B(q.style.left);E.width=f-B(q.style.left)-B(q.style.right);E.height=v.plugins.object[D].height;q.style[C]=B(q.style[C])+v.plugins.object[D].height+"px";q.style.height=B(q.style.height)-E.height+"px";break;case b.html5.view.positions.LEFT:E.top=B(q.style.top);E.left=B(q.style.left);E.width=v.plugins.object[D].width;E.height=z-B(q.style.top)-B(q.style.bottom);q.style[C]=B(q.style[C])+v.plugins.object[D].width+"px";q.style.width=B(q.style.width)-E.width+"px";break;default:break}return E}this.resize=h;this.fullscreen=function(D){if(navigator.vendor.indexOf("Apple")===0){if(v.getMedia().getDisplayElement().webkitSupportsFullscreen){if(D){v.fullscreen=false;v.getMedia().getDisplayElement().webkitEnterFullscreen()}else{v.getMedia().getDisplayElement().webkitExitFullscreen()}}else{v.fullscreen=false}}else{if(D){document.onkeydown=g;clearInterval(m);v.width=window.innerWidth;v.height=window.innerHeight;var C={position:"fixed",width:"100%",height:"100%",top:0,left:0,zIndex:2147483000};c(u,C);C.zIndex=1;c(v.getMedia().getDisplayElement(),C);C.zIndex=2;c(q,C)}else{document.onkeydown="";o();v.width=f;v.height=z;c(u,{position:"relative",height:v.height,width:v.width,zIndex:0})}h(v.width,v.height)}}};function a(d){return([b.html5.view.positions.TOP,b.html5.view.positions.RIGHT,b.html5.view.positions.BOTTOM,b.html5.view.positions.LEFT].indexOf(d.toUpperCase())>-1)}b.html5.view.positions={TOP:"TOP",RIGHT:"RIGHT",BOTTOM:"BOTTOM",LEFT:"LEFT",OVER:"OVER",NONE:"NONE"}})(jwplayer);(function(a){var b={backgroundcolor:"",margin:10,font:"Arial,sans-serif",fontsize:10,fontcolor:parseInt("000000",16),fontstyle:"normal",fontweight:"bold",buttoncolor:parseInt("ffffff",16),position:a.html5.view.positions.BOTTOM,idlehide:false,layout:{left:{position:"left",elements:[{name:"play",type:"button"},{name:"divider",type:"divider"},{name:"prev",type:"button"},{name:"divider",type:"divider"},{name:"next",type:"button"},{name:"divider",type:"divider"},{name:"elapsed",type:"text"}]},center:{position:"center",elements:[{name:"time",type:"slider"}]},right:{position:"right",elements:[{name:"duration",type:"text"},{name:"blank",type:"button"},{name:"divider",type:"divider"},{name:"mute",type:"button"},{name:"volume",type:"slider"},{name:"divider",type:"divider"},{name:"fullscreen",type:"button"}]}}};_css=a.html5.utils.css;_hide=function(c){_css(c,{display:"none"})};_show=function(c){_css(c,{display:"block"})};a.html5.controlbar=function(j,L){var i=j;var A=a.utils.extend({},b,i.skin.getComponentSettings("controlbar"),L);if(a.html5.utils.mapLength(i.skin.getComponentLayout("controlbar"))>0){A.layout=i.skin.getComponentLayout("controlbar")}var P;var I;var O;var B;var t="none";var f;var h;var Q;var e;var d;var w;var s;var J={};var n=false;var c={};function H(){O=0;B=0;I=0;if(!n){var V={height:i.skin.getSkinElement("controlbar","background").height,backgroundColor:A.backgroundcolor};P=document.createElement("div");P.id=i.id+"_jwplayer_controlbar";_css(P,V)}v("capLeft","left",false,P);var W={position:"absolute",height:i.skin.getSkinElement("controlbar","background").height,background:" url("+i.skin.getSkinElement("controlbar","background").src+") repeat-x center left",left:i.skin.getSkinElement("controlbar","capLeft").width};N("elements",P,W);v("capRight","right",false,P)}this.getDisplayElement=function(){return P};this.resize=function(X,V){a.html5.utils.cancelAnimation(P);document.getElementById(i.id).onmousemove=x;d=X;w=V;x();var W=u();D({id:i.id,duration:Q,position:h});r({id:i.id,bufferPercent:e});return W};function o(){var W=["timeSlider","volumeSlider","timeSliderRail","volumeSliderRail"];for(var X in W){var V=W[X];if(typeof J[V]!="undefined"){c[V]=J[V].getBoundingClientRect()}}}function x(){a.html5.utils.cancelAnimation(P);if(g()){a.html5.utils.fadeTo(P,1,0,1,0)}else{a.html5.utils.fadeTo(P,0,0.1,1,2)}}function g(){if(i.jwGetState()==a.api.events.state.IDLE||i.jwGetState()==a.api.events.state.PAUSED){if(A.idlehide){return false}return true}if(i.jwGetFullscreen()){return false}if(A.position.toUpperCase()==a.html5.view.positions.OVER){return false}return true}function N(Y,X,W){var V;if(!n){V=document.createElement("div");J[Y]=V;V.id=P.id+"_"+Y;X.appendChild(V)}else{V=document.getElementById(P.id+"_"+Y)}if(W!==undefined){_css(V,W)}return V}function G(){U(A.layout.left);U(A.layout.right,-1);U(A.layout.center)}function U(Y,V){var Z=Y.position=="right"?"right":"left";var X=a.utils.extend([],Y.elements);if(V!==undefined){X.reverse()}for(var W=0;W<X.length;W++){z(X[W],Z)}}function E(){return I++}function z(Z,ab){var Y,W,X,V,ad;switch(Z.name){case"play":v("playButton",ab,false);v("pauseButton",ab,true);K("playButton","jwPlay");K("pauseButton","jwPause");break;case"divider":v("divider"+E(),ab,true);break;case"prev":v("prevButton",ab,true);K("prevButton","jwPlaylistPrev");break;case"next":v("nextButton",ab,true);K("nextButton","jwPlaylistNext");break;case"elapsed":v("elapsedText",ab,true);break;case"time":W=i.skin.getSkinElement("controlbar","timeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","timeSliderCapLeft").width;X=i.skin.getSkinElement("controlbar","timeSliderCapRight")===undefined?0:i.skin.getSkinElement("controlbar","timeSliderCapRight").width;Y=ab=="left"?W:X;V=i.skin.getSkinElement("controlbar","timeSliderRail").width+W+X;ad={height:i.skin.getSkinElement("controlbar","background").height,position:"absolute",top:0,width:V};ad[ab]=ab=="left"?O:B;var aa=N("timeSlider",J.elements,ad);v("timeSliderCapLeft",ab,true,aa,ab=="left"?0:Y);v("timeSliderRail",ab,false,aa,Y);v("timeSliderBuffer",ab,false,aa,Y);v("timeSliderProgress",ab,false,aa,Y);v("timeSliderThumb",ab,false,aa,Y);v("timeSliderCapRight",ab,true,aa,ab=="right"?0:Y);M("time");break;case"fullscreen":v("fullscreenButton",ab,false);v("normalscreenButton",ab,true);K("fullscreenButton","jwSetFullscreen",true);K("normalscreenButton","jwSetFullscreen",false);break;case"volume":W=i.skin.getSkinElement("controlbar","volumeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;X=i.skin.getSkinElement("controlbar","volumeSliderCapRight")===undefined?0:i.skin.getSkinElement("controlbar","volumeSliderCapRight").width;Y=ab=="left"?W:X;V=i.skin.getSkinElement("controlbar","volumeSliderRail").width+W+X;ad={height:i.skin.getSkinElement("controlbar","background").height,position:"absolute",top:0,width:V};ad[ab]=ab=="left"?O:B;var ac=N("volumeSlider",J.elements,ad);v("volumeSliderCapLeft",ab,true,ac,ab=="left"?0:Y);v("volumeSliderRail",ab,true,ac,Y);v("volumeSliderProgress",ab,false,ac,Y);v("volumeSliderCapRight",ab,true,ac,ab=="right"?0:Y);M("volume");break;case"mute":v("muteButton",ab,false);v("unmuteButton",ab,true);K("muteButton","jwSetMute",true);K("unmuteButton","jwSetMute",false);break;case"duration":v("durationText",ab,true);break}}function v(Y,ac,ab,Z,V){if((i.skin.getSkinElement("controlbar",Y)!==undefined||Y.indexOf("Text")>0||Y.indexOf("divider")===0)&&!(Y.indexOf("divider")===0&&s.indexOf("divider")===0)){s=Y;var X={height:i.skin.getSkinElement("controlbar","background").height,position:"absolute",display:"block",top:0};if((Y.indexOf("next")===0||Y.indexOf("prev")===0)&&i.jwGetPlaylist().length<2){ab=false;X.display="none"}var aa;if(Y.indexOf("Text")>0){Y.innerhtml="00:00";X.font=A.fontsize+"px/"+(i.skin.getSkinElement("controlbar","background").height+1)+"px "+A.font;X.color=A.fontcolor;X.textAlign="center";X.fontWeight=A.fontweight;X.fontStyle=A.fontstyle;X.cursor="default";aa=14+3*A.fontsize}else{if(Y.indexOf("divider")===0){X.background="url("+i.skin.getSkinElement("controlbar","divider").src+") repeat-x center left";aa=i.skin.getSkinElement("controlbar","divider").width}else{X.background="url("+i.skin.getSkinElement("controlbar",Y).src+") repeat-x center left";aa=i.skin.getSkinElement("controlbar",Y).width}}if(ac=="left"){X.left=V===undefined?O:V;if(ab){O+=aa}}else{if(ac=="right"){X.right=V===undefined?B:V;if(ab){B+=aa}}}if(Z===undefined){Z=J.elements}X.width=aa;if(n){_css(J[Y],X)}else{var W=N(Y,Z,X);if(i.skin.getSkinElement("controlbar",Y+"Over")!==undefined){W.onmouseover=function(ad){W.style.backgroundImage=["url(",i.skin.getSkinElement("controlbar",Y+"Over").src,")"].join("")};W.onmouseout=function(ad){W.style.backgroundImage=["url(",i.skin.getSkinElement("controlbar",Y).src,")"].join("")}}}}}function C(){i.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,y);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_BUFFER,r);i.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,p);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_TIME,D);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE,T);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_VOLUME,k);i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_COMPLETE,F)}function y(){H();G();u();R()}function R(){D({id:i.id,duration:i.jwGetDuration(),position:0});r({id:i.id,bufferProgress:0});T({id:i.id,mute:i.jwGetMute()});p({id:i.id,newstate:a.api.events.state.IDLE});k({id:i.id,volume:i.jwGetVolume()})}function K(X,Y,W){if(n){return}if(i.skin.getSkinElement("controlbar",X)!==undefined){var V=J[X];if(V!==null){_css(V,{cursor:"pointer"});if(Y=="fullscreen"){V.onmouseup=function(Z){Z.stopPropagation();i.jwSetFullscreen(!i.jwGetFullscreen())}}else{V.onmouseup=function(Z){Z.stopPropagation();if(W!==null){i[Y](W)}else{i[Y]()}}}}}}function M(V){if(n){return}var W=J[V+"Slider"];_css(J.elements,{cursor:"pointer"});_css(W,{cursor:"pointer"});W.onmousedown=function(X){t=V};W.onmouseup=function(X){X.stopPropagation();S(X.pageX)};W.onmousemove=function(X){if(t=="time"){f=true;var Y=X.pageX-c[V+"Slider"].left-window.pageXOffset;_css(J.timeSliderThumb,{left:Y})}}}function S(W){f=false;var V;if(t=="time"){V=W-c.timeSliderRail.left+window.pageXOffset;var Y=V/c.timeSliderRail.width*Q;if(Y<0){Y=0}else{if(Y>Q){Y=Q-3}}i.jwSeek(Y);if(i.jwGetState()!=a.api.events.state.PLAYING){i.jwPlay()}}else{if(t=="volume"){V=W-c.volumeSliderRail.left-window.pageXOffset;var X=Math.round(V/c.volumeSliderRail.width*100);if(X<0){X=0}else{if(X>100){X=100}}if(i.jwGetMute()){i.jwSetMute(false)}i.jwSetVolume(X)}}t="none"}function r(W){if(W.bufferPercent!==null){e=W.bufferPercent}var X=c.timeSliderRail.width;var V=isNaN(Math.round(X*e/100))?0:Math.round(X*e/100);_css(J.timeSliderBuffer,{width:V})}function T(V){if(V.mute){_hide(J.muteButton);_show(J.unmuteButton);_hide(J.volumeSliderProgress)}else{_show(J.muteButton);_hide(J.unmuteButton);_show(J.volumeSliderProgress)}}function p(V){if(V.newstate==a.api.events.state.BUFFERING||V.newstate==a.api.events.state.PLAYING){_show(J.pauseButton);_hide(J.playButton)}else{_hide(J.pauseButton);_show(J.playButton)}x();if(V.newstate==a.api.events.state.IDLE){_hide(J.timeSliderBuffer);_hide(J.timeSliderProgress);_hide(J.timeSliderThumb);D({id:i.id,duration:i.jwGetDuration(),position:0})}else{_show(J.timeSliderBuffer);if(V.newstate!=a.api.events.state.BUFFERING){_show(J.timeSliderProgress);_show(J.timeSliderThumb)}}}function F(V){D(a.utils.extend(V,{position:0,duration:Q}))}function D(Y){if(Y.position!==null){h=Y.position}if(Y.duration!==null){Q=Y.duration}var W=(h===Q===0)?0:h/Q;var V=isNaN(Math.round(c.timeSliderRail.width*W))?0:Math.round(c.timeSliderRail.width*W);var X=V;J.timeSliderProgress.style.width=V+"px";if(!f){if(J.timeSliderThumb){J.timeSliderThumb.style.left=X+"px"}}if(J.durationText){J.durationText.innerHTML=m(Q)}if(J.elapsedText){J.elapsedText.innerHTML=m(h)}}function m(V){str="00:00";if(V>0){str=Math.floor(V/60)<10?"0"+Math.floor(V/60)+":":Math.floor(V/60)+":";str+=Math.floor(V%60)<10?"0"+Math.floor(V%60):Math.floor(V%60)}return str}function l(){var Y,W;var X=document.getElementById(P.id+"_elements").childNodes;for(var V in document.getElementById(P.id+"_elements").childNodes){if(isNaN(parseInt(V,10))){continue}if(X[V].id.indexOf(P.id+"_divider")===0&&W.id.indexOf(P.id+"_divider")===0){X[V].style.display="none"}else{if(X[V].id.indexOf(P.id+"_divider")===0&&Y.style.display!="none"){X[V].style.display="block"}}if(X[V].style.display!="none"){W=X[V]}Y=X[V]}}function u(){l();if(i.jwGetFullscreen()){_show(J.normalscreenButton);_hide(J.fullscreenButton)}else{_hide(J.normalscreenButton);_show(J.fullscreenButton)}var W={width:d};var V={};if(A.position.toUpperCase()==a.html5.view.positions.OVER||i.jwGetFullscreen()){W.left=A.margin;W.width-=2*A.margin;W.top=w-i.skin.getSkinElement("controlbar","background").height-A.margin;W.height=i.skin.getSkinElement("controlbar","background").height}else{W.left=0}V.left=i.skin.getSkinElement("controlbar","capLeft").width;V.width=W.width-i.skin.getSkinElement("controlbar","capLeft").width-i.skin.getSkinElement("controlbar","capRight").width;var X=i.skin.getSkinElement("controlbar","timeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","timeSliderCapLeft").width;_css(J.timeSliderRail,{width:(V.width-O-B),left:X});if(J.timeSliderCapRight!==undefined){_css(J.timeSliderCapRight,{left:X+(V.width-O-B)})}_css(P,W);_css(J.elements,V);o();return W}function k(Z){if(J.volumeSliderRail!==undefined){var X=isNaN(Z.volume/100)?1:Z.volume/100;var Y=parseInt(J.volumeSliderRail.style.width.replace("px",""),10);var V=isNaN(Math.round(Y*X))?0:Math.round(Y*X);var aa=parseInt(J.volumeSliderRail.style.right.replace("px",""),10);var W=i.skin.getSkinElement("controlbar","volumeSliderCapLeft")===undefined?0:i.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;_css(J.volumeSliderProgress,{width:V,left:W});if(J.volumeSliderCapLeft!==undefined){_css(J.volumeSliderCapLeft,{left:0})}}}function q(){H();G();o();n=true;C();R();P.style.opacity=A.idlehide?0:1}q();return this}})(jwplayer);(function(b){var a=["width","height","state","playlist","item","position","buffer","duration","volume","mute","fullscreen"];b.html5.controller=function(s,q,d,p){var v=s;var x=d;var c=p;var j=q;var z=true;var t=(x.config.debug!==undefined)&&(x.config.debug.toString().toLowerCase()=="console");var h=new b.html5.eventdispatcher(j.id,t);b.utils.extend(this,h);function l(C){h.sendEvent(C.type,C)}x.addGlobalListener(l);function o(){try{if(x.playlist[0].levels[0].file.length>0){if(z||x.state==b.api.events.state.IDLE){x.setActiveMediaProvider(x.playlist[x.item]);x.addEventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL,function(){x.getMedia().play()});if(x.config.repeat){x.addEventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE,function(D){setTimeout(m,25)})}x.getMedia().load(x.playlist[x.item]);z=false}else{if(x.state==b.api.events.state.PAUSED){x.getMedia().play()}}}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function A(){try{if(x.playlist[0].levels[0].file.length>0){switch(x.state){case b.api.events.state.PLAYING:case b.api.events.state.BUFFERING:x.getMedia().pause();break}}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function w(C){try{if(x.playlist[0].levels[0].file.length>0){switch(x.state){case b.api.events.state.PLAYING:case b.api.events.state.PAUSED:case b.api.events.state.BUFFERING:x.getMedia().seek(C);break}}return true}catch(D){h.sendEvent(b.api.events.JWPLAYER_ERROR,D)}return false}function i(){try{if(x.playlist[0].levels[0].file.length>0&&x.state!=b.api.events.state.IDLE){x.getMedia().stop()}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function f(){try{if(x.playlist[0].levels[0].file.length>0){if(x.config.shuffle){n(r())}else{if(x.item+1==x.playlist.length){n(0)}else{n(x.item+1)}}}if(x.state!=b.api.events.state.PLAYING&&x.state!=b.api.events.state.BUFFERING){o()}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function e(){try{if(x.playlist[0].levels[0].file.length>0){if(x.config.shuffle){n(r())}else{if(x.item===0){n(x.playlist.length-1)}else{n(x.item-1)}}}if(x.state!=b.api.events.state.PLAYING&&x.state!=b.api.events.state.BUFFERING){o()}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function r(){var C=null;if(x.playlist.length>1){while(C===null){C=Math.floor(Math.random()*x.playlist.length);if(C==x.item){C=null}}}else{C=0}return C}function n(D){x.resetEventListeners();x.addGlobalListener(l);try{if(x.playlist[0].levels[0].file.length>0){var E=x.state;if(E!==b.api.events.state.IDLE){i()}x.item=D;z=true;h.sendEvent(b.api.events.JWPLAYER_PLAYLIST_ITEM,{item:D});if(E==b.api.events.state.PLAYING||E==b.api.events.state.BUFFERING){o()}}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function y(D){try{switch(typeof(D)){case"number":x.getMedia().volume(D);break;case"string":x.getMedia().volume(parseInt(D,10));break}return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function k(D){try{x.getMedia().mute(D);return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function g(D,C){try{x.width=D;x.height=C;c.resize(D,C);return true}catch(E){h.sendEvent(b.api.events.JWPLAYER_ERROR,E)}return false}function u(D){try{x.fullscreen=D;c.fullscreen(D);return true}catch(C){h.sendEvent(b.api.events.JWPLAYER_ERROR,C)}return false}function B(C){try{i();x.loadPlaylist(C);z=true;return true}catch(D){h.sendEvent(b.api.events.JWPLAYER_ERROR,D)}return false}b.html5.controller.repeatoptions={LIST:"LIST",ALWAYS:"ALWAYS",SINGLE:"SINGLE",NONE:"NONE"};function m(){x.resetEventListeners();x.addGlobalListener(l);switch(x.config.repeat.toUpperCase()){case b.html5.controller.repeatoptions.SINGLE:o();break;case b.html5.controller.repeatoptions.ALWAYS:if(x.item==x.playlist.length-1&&!x.config.shuffle){n(0);o()}else{f()}break;case b.html5.controller.repeatoptions.LIST:if(x.item==x.playlist.length-1&&!x.config.shuffle){n(0)}else{f()}break}}this.play=o;this.pause=A;this.seek=w;this.stop=i;this.next=f;this.prev=e;this.item=n;this.setVolume=y;this.setMute=k;this.resize=g;this.setFullscreen=u;this.load=B}})(jwplayer);(function(a){a.html5.defaultSkin=function(){this.text='<?xml version="1.0" ?><skin author="LongTail Video" name="Five" version="1.0"><settings><setting name="backcolor" value="0xFFFFFF"/><setting name="frontcolor" value="0x000000"/><setting name="lightcolor" value="0x000000"/><setting name="screencolor" value="0x000000"/></settings><components><component name="controlbar"><settings><setting name="margin" value="20"/><setting name="fontsize" value="11"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFJJREFUeNrslLENwAAIwxLU/09j5AiOgD5hVQzNAVY8JK4qEfHMIKBnd2+BQlBINaiRtL/aV2rdzYBsM6CIONbI1NZENTr3RwdB2PlnJgJ6BRgA4hwu5Qg5iswAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhJREFUeNpiYqABYBo1dNRQ+hr6H4jvA3E8NS39j4SpZvh/LJig4YxEGEqy3kET+w+AOGFQRhTJhrEQkGcczfujhg4CQwECDADpTRWU/B3wHQAAAABJRU5ErkJggg=="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpiYBgFo2DwA0YC8v/R1P4nRu+ooaOGUtnQUTAKhgIACDAAFCwQCfAJ4gwAAAAASUVORK5CYII="/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEtJREFUeNpiYBgFo2Dog/9QDAPyQHweTYwiQ/2B+D0Wi8g2tB+JTdBQRiIMJVkvEy0iglhDF9Aq9uOpHVEwoE+NJDUKRsFgAAABBgDe2hqZcNNL0AAAAABJRU5ErkJggg=="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAElJREFUeNpiYBgFo2Dog/9AfB6I5dHE/lNqKAi/B2J/ahsKw/3EGMpIhKEk66WJoaR6fz61IyqemhEFSlL61ExSo2AUDAYAEGAAiG4hj+5t7M8AAAAASUVORK5CYII="/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADxJREFUeNpiYBgFo2AU0Bwwzluw+D8tLWARFhKiqQ9YuLg4aWsBGxs7bS1gZ6e5BWyjSX0UjIKhDgACDABlYQOGh5pYywAAAABJRU5ErkJggg=="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYBgFo2AU0Bww1jc0/aelBSz8/Pw09QELOzs7bS1gY2OjrQWsrKy09gHraFIfBaNgqAOAAAMAvy0DChXHsZMAAAAASUVORK5CYII="/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAClJREFUeNpiYBgFo2AU0BwwAvF/WlrARGsfjFow8BaMglEwCugAAAIMAOHfAQunR+XzAAAAAElFTkSuQmCC"/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpiZICA/yCCiQEJUJcDEGAAY0gBD1/m7Q0AAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNpiYBgFIw3MB+L/5Gj8j6yRiRTFyICJXHfTXyMLAXlGati4YDRFDj8AEGAABk8GSqqS4CoAAAAASUVORK5CYII="/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYBgFgxz8p7bm+cQa+h8LHy7GhEcjIz4bmAjYykiun/8j0fakGPIfTfPgiSr6aB4FVAcAAQYAWdwR1G1Wd2gAAAAASUVORK5CYII="/><element name="volumeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGpJREFUeNpi/P//PwM9ABMDncCoRYPfIqqDZcuW1UPp/6AUDcNM1DQYKtRAlaAj1mCSLSLXYIIWUctgDItoZfDA5aOoqKhGEANIM9LVR7SymGDQUctikuOIXkFNdhHEOFrDjlpEd4sAAgwAriRMub95fu8AAAAASUVORK5CYII="/><element name="volumeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFtJREFUeNpi/P//PwM9ABMDncCoRYPfIlqAeij9H5SiYZiqBqPTlFqE02BKLSLaYFItIttgQhZRzWB8FjENiuRJ7aAbsMQwYMl7wDIsWUUQ42gNO2oR3S0CCDAAKhKq6MLLn8oAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5JREFUeNpiYBgFo2DQA0YC8v/xqP1PjDlMRDrEgUgxkgHIlfZoriVGjmzLsLFHAW2D6D8eA/9Tw7L/BAwgJE90PvhPpNgoGAVDEQAEGAAMdhTyXcPKcAAAAABJRU5ErkJggg=="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEZJREFUeNpiYBgFo2DIg/9UUkOUAf8JiFFsyX88fJyAkcQgYMQjNkzBoAgiezyRbE+tFGSPxQJ7auYBmma0UTAKBhgABBgAJAEY6zON61sAAAAASUVORK5CYII="/></elements></component><component name="display"><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNrszwENADAIA7DhX8ENoBMZ5KR10EryckCJiIiIiIiIiIiIiIiIiIiIiIh8GmkRERERERERERERERERERERERGRHSPAAPlXH1phYpYaAAAAAElFTkSuQmCC"/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALdJREFUeNrs18ENgjAYhmFouDOCcQJGcARHgE10BDcgTOIosAGwQOuPwaQeuFRi2p/3Sb6EC5L3QCxZBgAAAOCorLW1zMn65TrlkH4NcV7QNcUQt7Gn7KIhxA+qNIR81spOGkL8oFJDyLJRdosqKDDkK+iX5+d7huzwM40xptMQMkjIOeRGo+VkEVvIPfTGIpKASfYIfT9iCHkHrBEzf4gcUQ56aEzuGK/mw0rHpy4AAACAf3kJMACBxjAQNRckhwAAAABJRU5ErkJggg=="/><element name="muteIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNrs1jEOgCAMBVAg7t5/8qaoIy4uoobyXsLCxA+0NCUAAADGUWvdQoQ41x4ixNBB2hBvBskdD3w5ZCkl3+33VqI0kjBBlh9rp+uTcyOP33TnolfsU85XX3yIRpQph8ZQY3wTZtU5AACASA4BBgDHoVuY1/fvOQAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWlJREFUeNrsl+1twjAQhsHq/7BBYQLYIBmBDcoGMAIjtBPQTcII2SDtBDBBwrU6pGsUO7YbO470PtKJkz9iH++d4ywWAAAAAABgljRNsyWr2bZzDuJG1rLdZhcMbTjrBCGDyUKsqQLFciJb9bSvuG/WagRVRUVUI6gqy5HVeKWfSgRyJruKIU//TrZTSn2nmlaXThrloi/v9F2STC1W4+Aw5cBzkquRc09bofFNc6YLxEON0VUZS5FPTftO49vMjRsIF3RhOGr7/D/pJw+FKU+q0vDyq8W42jCunDqI3LC5XxNj2wHLU1XjaRnb0Lhykhqhhd8MtSF5J9tbjCv4mXGvKJz/65FF/qJryyaaIvzP2QRxZTX2nTuXjvV/VPFSwyLnW7mpH99yTh1FEVro6JBSd40/pMrRdV8vPtcKl28T2pT8TnFZ4yNosct3Q0io6JfBiz1FlGdqVQH3VHnepAEAAAAAADDzEGAAcTwB10jWgxcAAAAASUVORK5CYII="/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuhJREFUeNrsWr9rU1EUznuNGqvFQh1ULOhiBx0KDtIuioO4pJuik3FxFfUPaAV1FTdx0Q5d2g4FFxehTnEpZHFoBy20tCIWtGq0TZP4HfkeHB5N8m6Sl/sa74XDybvv3vvOd8/Pe4lXrVZT3dD8VJc0B8QBcUAcEAfESktHGeR5XtMfqFQq/f92zPe/NbtGlKTdCY30kuxrpMGO94BlQCXs+rbh3ONgA6BlzP1p20d80gEI5hmA2A92Qua1Q2PtAFISM+bvjMG8U+Q7oA3rQGASwrYCU6WpNdLGYbA+Pq5jjXIiwi8EEa2UDbQSaKOIuV+SlkcCrfjY8XTI9EpKGwP0C2kru2hLtHqa4zoXtZRWyvi4CLwv9Opr6Hkn6A9HKgEANsQ1iqC3Ub/vRUk2JgmRkatK36kVrnt0qObunwUdUUMXMWYpakJsO5Am8tAw2GBIgwWA+G2S2dMpiw0gDioQRQJoKhRb1QiDwlHZUABYbaXWsm5ae6loTE4ZDxN4CZar8foVzOJ2iyZ2kWF3t7YIevffaMT5yJ70kQb2fQ1sE5SHr2wazs2wgMxgbsEKEAgxAvZUJbQLBGTSBMgNrncJbA6AljtS/eKDJ0Ez+DmrQEzXS2h1Ck25kAg0IZcUOaydCy4sYnN2fOA+2AP16gNoHALlQ+fwH7XO4CxLenUpgj4xr6ugY2roPMbMx+Xs18m/E8CVEIhxsNeg83XWOAN6grG3lGbk8uE5fr4B/WH3cJw+co/l9nTYsSGYCJ/lY5/qv0thn6nrIWmjeJcPSnWOeY++AkF8tpJHIMAUs/MaBBpj3znZfQo5psY+ZrG4gv5HickjEOymKjEeRpgyST6IuZcTcWbnjcgdPi5ghxciRKsl1lDSsgwA1i8fssonJgzmTSqfGUkCENndNdAL7PS6QQ7ZYISTo+1qq0LEWjTWcvY4isa4z+yfQB+7ooyHVg5RI7/i1Ijn/vnggDggDogD4oC00P4KMACd/juEHOrS4AAAAABJRU5ErkJggg=="/></elements></component><component name="dock"><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFBJREFUeNrs0cEJACAQA8Eofu0fu/W6EM5ZSAFDRpKTBs00CQQEBAQEBAQEBAQEBAQEBATkK8iqbY+AgICAgICAgICAgICAgICAgIC86QowAG5PAQzEJ0lKAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><elements><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhJREFUeNrs2NEJwCAMBcBYuv/CFuIE9VN47WWCR7iocXR3pdWdGPqqwIoMjYfQeAiNh9B4JHc6MHQVHnjggQceeOCBBx77TifyeOY0iHi8DqIdEY8dD5cL094eePzINB5CO/LwcOTptNB4CP25L4TIbZzpU7UEGAA5wz1uF5rF9AAAAABJRU5ErkJggg=="/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAIAAADpFA0BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADhJREFUeNrsy6ENACAMAMHClp2wYxZLAg5Fcu9e3OjuOKqqfTMzbs14CIZhGIZhGIZhGP4VLwEGAK/BBnVFpB0oAAAAAElFTkSuQmCC"/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAIAAADpFA0BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADRJREFUeNrsy7ENACAMBLE8++8caFFKKiRffU53112SGs3ttOohGIZhGIZhGIZh+Fe8BRgAiaUGde6NOSEAAAAASUVORK5CYII="/></elements></component></components></skin>';this.xml=null;if(window.DOMParser){parser=new DOMParser();this.xml=parser.parseFromString(this.text,"text/xml")}else{this.xml=new ActiveXObject("Microsoft.XMLDOM");this.xml.async="false";this.xml.loadXML(this.text)}return this}})(jwplayer);(function(a){_css=a.html5.utils.css;_hide=function(b){_css(b,{display:"none"})};_show=function(b){_css(b,{display:"block"})};a.html5.display=function(k,s){var q=k;var d={};var f;var t;var r;var l;var g;var j=q.skin.getComponentSettings("display").bufferrotation===undefined?15:parseInt(q.skin.getComponentSettings("display").bufferrotation,10);var e=q.skin.getComponentSettings("display").bufferinterval===undefined?100:parseInt(q.skin.getComponentSettings("display").bufferinterval,10);var c={display:{style:{cursor:"pointer",top:0,left:0},click:p},display_icon:{style:{cursor:"pointer",position:"absolute",top:((q.skin.getSkinElement("display","background").height-q.skin.getSkinElement("display","playIcon").height)/2),left:((q.skin.getSkinElement("display","background").width-q.skin.getSkinElement("display","playIcon").width)/2),border:0,margin:0,padding:0,zIndex:3}},display_iconBackground:{style:{cursor:"pointer",position:"absolute",top:((t-q.skin.getSkinElement("display","background").height)/2),left:((f-q.skin.getSkinElement("display","background").width)/2),border:0,backgroundImage:(["url(",q.skin.getSkinElement("display","background").src,")"]).join(""),width:q.skin.getSkinElement("display","background").width,height:q.skin.getSkinElement("display","background").height,margin:0,padding:0,zIndex:2}},display_image:{style:{display:"none",width:f,height:t,position:"absolute",cursor:"pointer",left:0,top:0,margin:0,padding:0,textDecoration:"none",zIndex:1}},display_text:{style:{zIndex:4,position:"relative",opacity:0.8,backgroundColor:parseInt("000000",16),color:parseInt("ffffff",16),textAlign:"center",fontFamily:"Arial,sans-serif",padding:"0 5px",fontSize:14}}};q.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,i);q.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE,i);q.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_ITEM,i);q.jwAddEventListener(a.api.events.JWPLAYER_ERROR,o);u();function u(){d.display=n("div","display");d.display_text=n("div","display_text");d.display.appendChild(d.display_text);d.display_image=n("img","display_image");d.display_image.onerror=function(v){_hide(d.display_image)};d.display_icon=n("div","display_icon");d.display_iconBackground=n("div","display_iconBackground");d.display.appendChild(d.display_image);d.display_iconBackground.appendChild(d.display_icon);d.display.appendChild(d.display_iconBackground);b()}this.getDisplayElement=function(){return d.display};this.resize=function(w,v){f=w;t=v;_css(d.display,{width:w,height:v});_css(d.display_text,{width:(w-10),top:((t-d.display_text.getBoundingClientRect().height)/2)});_css(d.display_image,{width:w,height:v});_css(d.display_iconBackground,{top:((t-q.skin.getSkinElement("display","background").height)/2),left:((f-q.skin.getSkinElement("display","background").width)/2)});i({})};function n(v,x){var w=document.createElement(v);w.id=q.id+"_jwplayer_"+x;_css(w,c[x].style);return w}function b(){for(var v in d){if(c[v].click!==undefined){d[v].onclick=c[v].click}}}function p(v){if(typeof v.preventDefault!="undefined"){v.preventDefault()}else{v.returnValue=false}if(q.jwGetState()!=a.api.events.state.PLAYING){q.jwPlay()}else{q.jwPause()}}function h(v){if(g){return}_show(d.display_iconBackground);d.display_icon.style.backgroundImage=(["url(",q.skin.getSkinElement("display",v).src,")"]).join("");_css(d.display_icon,{display:"block",width:q.skin.getSkinElement("display",v).width,height:q.skin.getSkinElement("display",v).height,top:(q.skin.getSkinElement("display","background").height-q.skin.getSkinElement("display",v).height)/2,left:(q.skin.getSkinElement("display","background").width-q.skin.getSkinElement("display",v).width)/2});if(q.skin.getSkinElement("display",v+"Over")!==undefined){d.display_icon.onmouseover=function(w){d.display_icon.style.backgroundImage=["url(",q.skin.getSkinElement("display",v+"Over").src,")"].join("")};d.display_icon.onmouseout=function(w){d.display_icon.style.backgroundImage=["url(",q.skin.getSkinElement("display",v).src,")"].join("")}}else{d.display_icon.onmouseover=null;d.display_icon.onmouseout=null}}function m(){_hide(d.display_icon);_hide(d.display_iconBackground)}function o(v){g=true;m();d.display_text.innerHTML=v.error;_show(d.display_text);d.display_text.style.top=((t-d.display_text.getBoundingClientRect().height)/2)+"px"}function i(v){if((v.type==a.api.events.JWPLAYER_PLAYER_STATE||v.type==a.api.events.JWPLAYER_PLAYLIST_ITEM)&&g){g=false;_hide(d.display_text)}if(l!==undefined){clearInterval(l);l=null;a.html5.utils.animations.rotate(d.display_icon,0)}switch(q.jwGetState()){case a.api.events.state.BUFFERING:h("bufferIcon");r=0;l=setInterval(function(){r+=j;a.html5.utils.animations.rotate(d.display_icon,r%360)},e);h("bufferIcon");break;case a.api.events.state.PAUSED:_css(d.display_image,{background:"transparent no-repeat center center"});h("playIcon");break;case a.api.events.state.IDLE:if(q.jwGetPlaylist()[q.jwGetItem()].image){_css(d.display_image,{display:"block"});d.display_image.src=a.html5.utils.getAbsolutePath(q.jwGetPlaylist()[q.jwGetItem()].image)}else{_css(d.display_image,{display:"none"});delete d.display_image.src}h("playIcon");break;default:if(q.jwGetMute()){_css(d.display_image,{display:"none"});delete d.display_image.src;h("muteIcon")}else{_css(d.display_image,{display:"none"});delete d.display_image.src;_hide(d.display_iconBackground);_hide(d.display_icon)}break}}return this}})(jwplayer);(function(jwplayer){jwplayer.html5.eventdispatcher=function(id,debug){var _id=id;var _debug=debug;var _listeners;var _globallisteners;this.resetEventListeners=function(){_listeners={};_globallisteners=[]};this.resetEventListeners();this.addEventListener=function(type,listener,count){try{if(_listeners[type]===undefined){_listeners[type]=[]}if(typeof(listener)=="string"){eval("listener = "+listener)}_listeners[type].push({listener:listener,count:count})}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.removeEventListener=function(type,listener){try{for(var lisenterIndex in _listeners[type]){if(_listeners[type][lisenterIndex].toString()==listener.toString()){_listeners[type].slice(lisenterIndex,lisenterIndex+1);break}}}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.addGlobalListener=function(listener,count){try{if(typeof(listener)=="string"){eval("listener = "+listener)}_globallisteners.push({listener:listener,count:count})}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.removeGlobalListener=function(listener){try{for(var lisenterIndex in _globallisteners){if(_globallisteners[lisenterIndex].toString()==listener.toString()){_globallisteners.slice(lisenterIndex,lisenterIndex+1);break}}}catch(err){jwplayer.html5.utils.log("error",err)}return false};this.sendEvent=function(type,data){if(data===undefined){data={}}jwplayer.utils.extend(data,{id:_id,version:jwplayer.html5.version,type:type});if(_debug){jwplayer.html5.utils.log(type,data)}for(var listenerIndex in _listeners[type]){try{_listeners[type][listenerIndex].listener(data)}catch(err){jwplayer.html5.utils.log("There was an error while handling a listener",_listeners[type][listenerIndex].listener,err)}if(_listeners[type][listenerIndex].count===1){delete _listeners[type][listenerIndex]}else{if(_listeners[type][listenerIndex].count>0){_listeners[type][listenerIndex].count=_listeners[type][listenerIndex].count-1}}}for(var globalListenerIndex in _globallisteners){try{_globallisteners[globalListenerIndex].listener(data)}catch(err){jwplayer.html5.utils.log("There was an error while handling a listener",_globallisteners[globalListenerIndex].listener,err)}if(_globallisteners[globalListenerIndex].count===1){delete _globallisteners[globalListenerIndex]}else{if(_globallisteners[globalListenerIndex].count>0){_globallisteners[globalListenerIndex].count=_globallisteners[globalListenerIndex].count-1}}}}}})(jwplayer);(function(a){a.html5.extensionmap={"3gp":"video/3gpp","3gpp":"video/3gpp","3g2":"video/3gpp2","3gpp2":"video/3gpp2",flv:"video/x-flv",f4a:"audio/mp4",f4b:"audio/mp4",f4p:"video/mp4",f4v:"video/mp4",mov:"video/quicktime",m4a:"audio/mp4",m4b:"audio/mp4",m4p:"audio/mp4",m4v:"video/mp4",mkv:"video/x-matroska",mp4:"video/mp4",sdp:"application/sdp",vp6:"video/x-vp6",aac:"audio/aac",mp3:"audio/mp3",ogg:"audio/ogg",ogv:"video/ogg",webm:"video/webm"}})(jwplayer);(function(a){var b={prefix:"http://l.longtailvideo.com/html5/",file:"logo.png",link:"http://www.longtailvideo.com/players/jw-flv-player/",margin:8,out:0.5,over:1,timeout:3,hide:true,position:"bottom-left"};_css=a.html5.utils.css;a.html5.logo=function(g,h){var l=g;var j;if(b.prefix){var i=g.version.split(/\W/).splice(0,2).join("/");if(b.prefix.indexOf(i)<0){b.prefix+=i+"/"}}if(h.position==a.html5.view.positions.OVER){h.position=b.position}var f=a.utils.extend({},b);if(!f.file){return}var c=document.createElement("img");c.id=l.id+"_jwplayer_logo";c.style.display="none";c.onload=function(n){_css(c,k());l.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,m)};if(f.file.indexOf("http://")===0){c.src=f.file}else{c.src=f.prefix+f.file}c.onmouseover=function(n){c.style.opacity=f.over;d()};c.onmouseout=function(n){c.style.opacity=f.out;d()};c.onclick=e;function k(){var p={textDecoration:"none",position:"absolute"};p.display=f.hide?"none":"block";var o=f.position.toLowerCase().split("-");for(var n in o){p[o[n]]=f.margin}return p}this.resize=function(o,n){};this.getDisplayElement=function(){return c};function e(n){n.stopPropagation();window.open(f.link,"_blank");return}function d(){if(j){clearTimeout(j)}j=setTimeout(function(){a.html5.utils.fadeTo(c,0,0.1,parseFloat(c.style.opacity))},f.timeout*1000)}function m(n){switch(l.jwGetState()){case a.api.events.state.BUFFERING:c.style.display="block";c.style.opacity=f.out;if(f.hide){d()}break;case a.api.events.state.PAUSED:break;case a.api.events.state.IDLE:break;case a.api.events.state.PLAYING:break;default:if(f.hide){d()}break}}return this}})(jwplayer);(function(a){var c={ended:a.api.events.state.IDLE,playing:a.api.events.state.PLAYING,pause:a.api.events.state.PAUSED,buffering:a.api.events.state.BUFFERING};var b=a.html5.utils.css;a.html5.mediavideo=function(f,C){var G={abort:t,canplay:m,canplaythrough:m,durationchange:q,emptied:t,ended:m,error:l,loadeddata:q,loadedmetadata:q,loadstart:m,pause:m,play:J,playing:m,progress:z,ratechange:t,seeked:m,seeking:m,stalled:m,suspend:m,timeupdate:J,volumechange:t,waiting:m,canshowcurrentframe:t,dataunavailable:t,empty:t,load:e,loadedfirstframe:t};var H=new a.html5.eventdispatcher();a.utils.extend(this,H);var h=f;var x=C;var D;var F;var d=a.api.events.state.IDLE;var A=null;var n;var g=0;var y=false;var r=false;var L;var K;var i=[];var M;var B=false;function v(){return d}function e(N){}function t(N){}function m(N){if(c[N.type]){s(c[N.type])}}function s(N){if(B){return}if(n){N=a.api.events.state.IDLE}if(N==a.api.events.state.PAUSED&&d==a.api.events.state.IDLE){return}if(d!=N){var O=d;h.state=N;d=N;var P=false;if(N==a.api.events.state.IDLE){p();if(h.position>=h.duration&&(h.position||h.duration)){P=true}if(x.style.display!="none"&&!h.config.chromeless){x.style.display="none"}}H.sendEvent(a.api.events.JWPLAYER_PLAYER_STATE,{oldstate:O,newstate:N});if(P){H.sendEvent(a.api.events.JWPLAYER_MEDIA_COMPLETE)}}n=false}function q(N){var O={height:N.target.videoHeight,width:N.target.videoWidth,duration:Math.round(N.target.duration*10)/10};if(h.duration===0||isNaN(h.duration)){h.duration=Math.round(N.target.duration*10)/10}h.playlist[h.item]=a.utils.extend(h.playlist[h.item],O);H.sendEvent(a.api.events.JWPLAYER_MEDIA_META,{metadata:O})}function J(O){if(n){return}if(O!==undefined&&O.target!==undefined){if(h.duration===0||isNaN(h.duration)){h.duration=Math.round(O.target.duration*10)/10}if(!y&&x.readyState>0){s(a.api.events.state.PLAYING)}if(d==a.api.events.state.PLAYING){if(!y&&x.readyState>0){y=true;try{x.currentTime=h.playlist[h.item].start}catch(N){}x.volume=h.volume/100;x.muted=h.mute}h.position=Math.round(O.target.currentTime*10)/10;H.sendEvent(a.api.events.JWPLAYER_MEDIA_TIME,{position:Math.round(O.target.currentTime*10)/10,duration:Math.round(O.target.duration*10)/10})}}z(O)}function E(){var N=(i[i.length-1]-i[0])/i.length;M=setTimeout(function(){if(!F){z({lengthComputable:true,loaded:1,total:1})}},N*10)}function z(P){var O,N;if(P!==undefined&&P.lengthComputable&&P.total){o();O=P.loaded/P.total*100;N=O/100*(h.duration-x.currentTime);if(50<O&&!F){clearTimeout(M);E()}}else{if((x.buffered!==undefined)&&(x.buffered.length>0)){maxBufferIndex=0;if(maxBufferIndex>=0){O=x.buffered.end(maxBufferIndex)/x.duration*100;N=x.buffered.end(maxBufferIndex)-x.currentTime}}}if(D===false&&d==a.api.events.state.BUFFERING){D=true;H.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER_FULL)}if(!F){if(O==100&&F===false){F=true}if(O!==null&&(O>h.buffer)){h.buffer=Math.round(O);H.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:Math.round(O)})}}}function w(){if(A===null){A=setInterval(function(){J()},100)}}function p(){clearInterval(A);A=null}function l(P){var O="There was an error: ";if((P.target.error&&P.target.tagName.toLowerCase()=="video")||P.target.parentNode.error&&P.target.parentNode.tagName.toLowerCase()=="video"){var N=P.target.error===undefined?P.target.parentNode.error:P.target.error;switch(N.code){case N.MEDIA_ERR_ABORTED:O="You aborted the video playback: ";break;case N.MEDIA_ERR_NETWORK:O="A network error caused the video download to fail part-way: ";break;case N.MEDIA_ERR_DECODE:O="The video playback was aborted due to a corruption problem or because the video used features your browser did not support: ";break;case N.MEDIA_ERR_SRC_NOT_SUPPORTED:O="The video could not be loaded, either because the server or network failed or because the format is not supported: ";break;default:O="An unknown error occurred: ";break}}else{if(P.target.tagName.toLowerCase()=="source"){K--;if(K>0){return}O="The video could not be loaded, either because the server or network failed or because the format is not supported: "}else{a.html5.utils.log("Erroneous error received. Continuing...");return}}u();O+=j();B=true;H.sendEvent(a.api.events.JWPLAYER_ERROR,{error:O});return}function j(){var P="";for(var O in L.levels){var N=L.levels[O];var Q=x.ownerDocument.createElement("source");P+=a.html5.utils.getAbsolutePath(N.file);if(O<(L.levels.length-1)){P+=", "}}return P}this.getDisplayElement=function(){return x};this.play=function(){if(d!=a.api.events.state.PLAYING){if(x.style.display!="block"){x.style.display="block"}x.play();w()}};this.pause=function(){x.pause();s(a.api.events.state.PAUSED)};this.seek=function(N){if(!(h.duration===0||isNaN(h.duration))&&!(h.position===0||isNaN(h.position))){x.currentTime=N;x.play()}};function u(){x.pause();p();h.position=0;n=true;s(a.api.events.state.IDLE)}this.stop=u;this.volume=function(N){x.volume=N/100;h.volume=N;H.sendEvent(a.api.events.JWPLAYER_MEDIA_VOLUME,{volume:Math.round(N)})};this.mute=function(N){x.muted=N;h.mute=N;H.sendEvent(a.api.events.JWPLAYER_MEDIA_MUTE,{mute:N})};this.resize=function(O,N){if(false){b(x,{width:O,height:N})}H.sendEvent(a.api.events.JWPLAYER_MEDIA_RESIZE,{fullscreen:h.fullscreen,width:O,hieght:N})};this.fullscreen=function(N){if(N===true){this.resize("100%","100%")}else{this.resize(h.config.width,h.config.height)}};this.load=function(N){I(N);H.sendEvent(a.api.events.JWPLAYER_MEDIA_LOADED);D=false;F=false;y=false;if(!h.config.chromeless){i=[];o();s(a.api.events.state.BUFFERING);setTimeout(function(){J()},25)}};function o(){var N=new Date().getTime();i.push(N)}this.hasChrome=function(){return r};function I(U){h.duration=U.duration;r=false;L=U;var P=document.createElement("video");P.preload="none";B=false;K=0;for(var O in U.levels){var N=U.levels[O];if(a.html5.utils.isYouTube(N.file)){delete P;k(N.file);return}var Q;if(N.type===undefined){var T=a.html5.utils.extension(N.file);if(a.html5.extensionmap[T]!==undefined){Q=a.html5.extensionmap[T]}else{Q="video/"+T+";"}}else{Q=N.type}if(P.canPlayType(Q)===""){continue}var S=x.ownerDocument.createElement("source");S.src=a.html5.utils.getAbsolutePath(N.file);S.type=Q;K++;P.appendChild(S)}if(K===0){B=true;H.sendEvent(a.api.events.JWPLAYER_ERROR,{error:"The video could not be loaded because the format is not supported by your browser: "+j()})}if(h.config.chromeless){P.poster=a.html5.utils.getAbsolutePath(U.image);P.controls="controls"}P.style.position=x.style.position;P.style.top=x.style.top;P.style.left=x.style.left;P.style.width=x.style.width;P.style.height=x.style.height;P.style.zIndex=x.style.zIndex;P.onload=e;P.volume=0;x.parentNode.replaceChild(P,x);P.id=x.id;x=P;for(var R in G){x.addEventListener(R,function(V){if(V.target.parentNode!==null){G[V.type](V)}},true)}}function k(R){var O=document.createElement("object");R=["http://www.youtube.com/v/",R.replace(/^[^v]+v.(.{11}).*/,"$1"),"&amp;hl=en_US&amp;fs=1&autoplay=1"].join("");var U={movie:R,allowFullScreen:"true",allowscriptaccess:"always"};for(var N in U){var S=document.createElement("param");S.name=N;S.value=U[N];O.appendChild(S)}var T=document.createElement("embed");var P={src:R,type:"application/x-shockwave-flash",allowscriptaccess:"always",allowfullscreen:"true",width:document.getElementById(f.id).style.width,height:document.getElementById(f.id).style.height};for(var Q in P){T[Q]=P[Q]}O.appendChild(T);O.style.position=x.style.position;O.style.top=x.style.top;O.style.left=x.style.left;O.style.width=document.getElementById(f.id).style.width;O.style.height=document.getElementById(f.id).style.height;O.style.zIndex=2147483000;x.parentNode.replaceChild(O,x);O.id=x.id;x=O;r=true}this.embed=I;return this}})(jwplayer);(function(jwplayer){var _configurableStateVariables=["width","height","start","duration","volume","mute","fullscreen","item","plugins"];jwplayer.html5.model=function(api,container,options){var _api=api;var _container=container;var _model={id:_container.id,playlist:[],state:jwplayer.api.events.state.IDLE,position:0,buffer:0,config:{width:480,height:320,item:0,skin:undefined,file:undefined,image:undefined,start:0,duration:0,bufferlength:5,volume:90,mute:false,fullscreen:false,repeat:"none",autostart:false,debug:undefined,screencolor:undefined}};var _media;var _eventDispatcher=new jwplayer.html5.eventdispatcher();var _components=["display","logo","controlbar"];jwplayer.utils.extend(_model,_eventDispatcher);for(var option in options){if(typeof options[option]=="string"){var type=/color$/.test(option)?"color":null;options[option]=jwplayer.html5.utils.typechecker(options[option],type)}var config=_model.config;var path=option.split(".");for(var edge in path){if(edge==path.length-1){config[path[edge]]=options[option]}else{if(config[path[edge]]===undefined){config[path[edge]]={}}config=config[path[edge]]}}}for(var index in _configurableStateVariables){var configurableStateVariable=_configurableStateVariables[index];_model[configurableStateVariable]=_model.config[configurableStateVariable]}var pluginorder=_components.concat([]);if(_model.plugins!==undefined){if(typeof _model.plugins=="string"){var userplugins=_model.plugins.split(",");for(var userplugin in userplugins){pluginorder.push(userplugin.replace(/^\s+|\s+$/g,""))}}else{for(var plugin in _model.plugins){pluginorder.push(plugin.replace(/^\s+|\s+$/g,""))}}}if(jwplayer.utils.isIOS()){_model.config.chromeless=true}if(_model.config.chromeless){pluginorder=[]}_model.plugins={order:pluginorder,config:{controlbar:{position:jwplayer.html5.view.positions.BOTTOM}},object:{}};if(typeof _model.config.components!="undefined"){for(var component in _model.config.components){_model.plugins.config[component]=_model.config.components[component]}}for(var pluginIndex in _model.plugins.order){var pluginName=_model.plugins.order[pluginIndex];var pluginConfig=_model.config[pluginName]===undefined?{}:_model.config[pluginName];_model.plugins.config[pluginName]=_model.plugins.config[pluginName]===undefined?pluginConfig:jwplayer.utils.extend(_model.plugins.config[pluginName],pluginConfig);if(_model.plugins.config[pluginName].position===undefined){_model.plugins.config[pluginName].position=jwplayer.html5.view.positions.OVER}}_model.loadPlaylist=function(arg,ready){var input;if(typeof arg=="string"){try{input=eval(arg)}catch(err){input=arg}}else{input=arg}var config;switch(jwplayer.utils.typeOf(input)){case"object":config=input;break;case"array":config={playlist:input};break;default:config={file:input};break}_model.playlist=new jwplayer.html5.playlist(config);if(_model.config.shuffle){_model.item=_getShuffleItem()}else{if(_model.config.item>=_model.playlist.length){_model.config.item=_model.playlist.length-1}_model.item=_model.config.item}if(!ready){_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_LOADED);_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_ITEM,{item:_model.item})}_model.setActiveMediaProvider(_model.playlist[_model.item])};function _getShuffleItem(){var result=null;if(_model.playlist.length>1){while(result===null){result=Math.floor(Math.random()*_model.playlist.length);if(result==_model.item){result=null}}}else{result=0}return result}function forward(evt){if(evt.type==jwplayer.api.events.JWPLAYER_MEDIA_LOADED){_container=_media.getDisplayElement()}_eventDispatcher.sendEvent(evt.type,evt)}_model.setActiveMediaProvider=function(playlistItem){if(_media!==undefined){_media.resetEventListeners()}_media=new jwplayer.html5.mediavideo(_model,_container);_media.addGlobalListener(forward);if(_model.config.chromeless){_media.load(playlistItem)}return true};_model.getMedia=function(){return _media};_model.setupPlugins=function(){for(var plugin in _model.plugins.order){try{if(jwplayer.html5[_model.plugins.order[plugin]]!==undefined){_model.plugins.object[_model.plugins.order[plugin]]=new jwplayer.html5[_model.plugins.order[plugin]](_api,_model.plugins.config[_model.plugins.order[plugin]])}else{if(window[_model.plugins.order[plugin]]!==undefined){_model.plugins.object[_model.plugins.order[plugin]]=new window[_model.plugins.order[plugin]](_api,_model.plugins.config[_model.plugins.order[plugin]])}else{_model.plugins.order.splice(plugin,plugin+1)}}}catch(err){jwplayer.html5.utils.log("Could not setup "+_model.plugins.order[plugin])}}};return _model}})(jwplayer);(function(a){a.html5.playlist=function(b){var d=[];if(b.playlist&&b.playlist.length>0){for(var c in b.playlist){d.push(new a.html5.playlistitem(b.playlist[c]))}}else{d.push(new a.html5.playlistitem(b))}return d}})(jwplayer);(function(a){a.html5.playlistitem=function(c){var b={author:"",date:"",description:"",image:"",link:"",mediaid:"",tags:"",title:"",provider:"",file:"",streamer:"",duration:-1,start:0,currentLevel:-1,levels:[]};for(var d in b){if(c[d]!==undefined){b[d]=c[d]}}if(b.levels.length===0){b.levels[0]=new a.html5.playlistitemlevel(b)}return b}})(jwplayer);(function(a){a.html5.playlistitemlevel=function(b){var d={file:"",streamer:"",bitrate:0,width:0};for(var c in d){if(b[c]!==undefined){d[c]=b[c]}}return d}})(jwplayer);(function(a){a.html5.skin=function(){var b={};var c=false;this.load=function(d,e){new a.html5.skinloader(d,function(f){c=true;b=f;e()},function(){new a.html5.skinloader("",function(f){c=true;b=f;e()})})};this.getSkinElement=function(d,e){if(c){try{return b[d].elements[e]}catch(f){a.html5.utils.log("No such skin component / element: ",[d,e])}}return null};this.getComponentSettings=function(d){if(c){return b[d].settings}return null};this.getComponentLayout=function(d){if(c){return b[d].layout}return null}}})(jwplayer);(function(a){a.html5.skinloader=function(f,n,i){var m={};var c=n;var j=i;var e=true;var h;var l=f;var q=false;function k(){if(l===undefined||l===""){d(a.html5.defaultSkin().xml)}else{a.utils.ajax(a.html5.utils.getAbsolutePath(l),function(r){d(r.responseXML)},function(r){d(a.html5.defaultSkin().xml)})}}function d(w){var C=w.getElementsByTagName("component");if(C.length===0){return}for(var F=0;F<C.length;F++){var A=C[F].getAttribute("name");var z={settings:{},elements:{},layout:{}};m[A]=z;var E=C[F].getElementsByTagName("elements")[0].getElementsByTagName("element");for(var D=0;D<E.length;D++){b(E[D],A)}var x=C[F].getElementsByTagName("settings")[0];if(x!==undefined&&x.childNodes.length>0){var I=x.getElementsByTagName("setting");for(var N=0;N<I.length;N++){var O=I[N].getAttribute("name");var G=I[N].getAttribute("value");var v=/color$/.test(O)?"color":null;m[A].settings[O]=a.html5.utils.typechecker(G,v)}}var J=C[F].getElementsByTagName("layout")[0];if(J!==undefined&&J.childNodes.length>0){var K=J.getElementsByTagName("group");for(var u=0;u<K.length;u++){var y=K[u];m[A].layout[y.getAttribute("position")]={elements:[]};for(var M=0;M<y.attributes.length;M++){var B=y.attributes[M];m[A].layout[y.getAttribute("position")][B.name]=B.value}var L=y.getElementsByTagName("*");for(var t=0;t<L.length;t++){var r=L[t];m[A].layout[y.getAttribute("position")].elements.push({type:r.tagName});for(var s=0;s<r.attributes.length;s++){var H=r.attributes[s];m[A].layout[y.getAttribute("position")].elements[t][H.name]=H.value}if(m[A].layout[y.getAttribute("position")].elements[t].name===undefined){m[A].layout[y.getAttribute("position")].elements[t].name=r.tagName}}}}e=false;p()}}function p(){clearInterval(h);if(!q){h=setInterval(function(){o()},100)}}function b(w,v){var u=new Image();var r=w.getAttribute("name");var t=w.getAttribute("src");var y;if(t.indexOf("data:image/png;base64,")===0){y=t}else{var s=a.html5.utils.getAbsolutePath(l);var x=s.substr(0,s.lastIndexOf("/"));y=[x,v,t].join("/")}m[v].elements[r]={height:0,width:0,src:"",ready:false};u.onload=function(z){g(u,r,v)};u.onerror=function(z){q=true;p();j()};u.src=y}function o(){for(var r in m){if(r!="properties"){for(var s in m[r].elements){if(!m[r].elements[s].ready){return}}}}if(e===false){clearInterval(h);c(m)}}function g(r,t,s){m[s].elements[t].height=r.height;m[s].elements[t].width=r.width;m[s].elements[t].src=r.src;m[s].elements[t].ready=true;p()}k()}})(jwplayer);(function(a){var b={};a.html5.utils.animations=function(){};a.html5.utils.animations.transform=function(c,d){c.style.webkitTransform=d;c.style.MozTransform=d;c.style.OTransform=d};a.html5.utils.animations.transformOrigin=function(c,d){c.style.webkitTransformOrigin=d;c.style.MozTransformOrigin=d;c.style.OTransformOrigin=d};a.html5.utils.animations.rotate=function(c,d){a.html5.utils.animations.transform(c,["rotate(",d,"deg)"].join(""))};a.html5.utils.cancelAnimation=function(c){delete b[c.id]};a.html5.utils.fadeTo=function(l,f,e,i,h,d){if(b[l.id]!=d&&d!==undefined){return}var c=new Date().getTime();if(d>c){setTimeout(function(){a.html5.utils.fadeTo(l,f,e,i,0,d)},d-c)}l.style.display="block";if(i===undefined){i=l.style.opacity===""?1:l.style.opacity}if(l.style.opacity==f&&l.style.opacity!==""&&d!==undefined){if(f===0){l.style.display="none"}return}if(d===undefined){d=c;b[l.id]=d}if(h===undefined){h=0}var j=(c-d)/(e*1000);j=j>1?1:j;var k=f-i;var g=i+(j*k);if(g>1){g=1}else{if(g<0){g=0}}l.style.opacity=g;if(h>0){b[l.id]=d+h*1000;a.html5.utils.fadeTo(l,f,e,i,0,b[l.id]);return}setTimeout(function(){a.html5.utils.fadeTo(l,f,e,i,0,d)},10)}})(jwplayer);(function(c){var d=new RegExp(/^(#|0x)[0-9a-fA-F]{3,6}/);c.html5.utils.typechecker=function(g,f){f=f===null?b(g):f;return e(g,f)};function b(f){var g=["true","false","t","f"];if(g.indexOf(f.toLowerCase().replace(" ",""))>=0){return"boolean"}else{if(d.test(f)){return"color"}else{if(!isNaN(parseInt(f,10))&&parseInt(f,10).toString().length==f.length){return"integer"}else{if(!isNaN(parseFloat(f))&&parseFloat(f).toString().length==f.length){return"float"}}}}return"string"}function e(g,f){if(f===null){return g}switch(f){case"color":if(g.length>0){return a(g)}return null;case"integer":return parseInt(g,10);case"float":return parseFloat(g);case"boolean":if(g.toLowerCase()=="true"){return true}else{if(g=="1"){return true}}return false}return g}function a(f){switch(f.toLowerCase()){case"blue":return parseInt("0000FF",16);case"green":return parseInt("00FF00",16);case"red":return parseInt("FF0000",16);case"cyan":return parseInt("00FFFF",16);case"magenta":return parseInt("FF00FF",16);case"yellow":return parseInt("FFFF00",16);case"black":return parseInt("000000",16);case"white":return parseInt("FFFFFF",16);default:f=f.replace(/(#|0x)?([0-9A-F]{3,6})$/gi,"$2");if(f.length==3){f=f.charAt(0)+f.charAt(0)+f.charAt(1)+f.charAt(1)+f.charAt(2)+f.charAt(2)}return parseInt(f,16)}return parseInt("000000",16)}})(jwplayer);(function(a){a.html5.api=function(b,j){var i={};if(!a.utils.hasHTML5()){return i}var d=document.createElement("div");b.parentNode.replaceChild(d,b);d.id=b.id;i.version=a.html5.version;i.id=d.id;var h=new a.html5.model(i,d,j);var e=new a.html5.view(i,d,h);var g=new a.html5.controller(i,d,h,e);i.skin=new a.html5.skin();i.jwPlay=g.play;i.jwPause=g.pause;i.jwStop=g.stop;i.jwSeek=g.seek;i.jwPlaylistItem=g.item;i.jwPlaylistNext=g.next;i.jwPlaylistPrev=g.prev;i.jwResize=g.resize;i.jwLoad=g.load;function f(k){return function(){return h[k]}}i.jwGetItem=f("item");i.jwGetPosition=f("position");i.jwGetDuration=f("duration");i.jwGetBuffer=f("buffer");i.jwGetWidth=f("width");i.jwGetHeight=f("height");i.jwGetFullscreen=f("fullscreen");i.jwSetFullscreen=g.setFullscreen;i.jwGetVolume=f("volume");i.jwSetVolume=g.setVolume;i.jwGetMute=f("mute");i.jwSetMute=g.setMute;i.jwGetState=f("state");i.jwGetVersion=function(){return i.version};i.jwGetPlaylist=function(){return h.playlist};i.jwAddEventListener=g.addEventListener;i.jwRemoveEventListener=g.removeEventListener;i.jwSendEvent=g.sendEvent;i.jwGetLevel=function(){};i.jwGetBandwidth=function(){};i.jwGetLockState=function(){};i.jwLock=function(){};i.jwUnlock=function(){};function c(m,l,k){return function(){m.loadPlaylist(m.config,true);m.setupPlugins();l.setup(m.getMedia().getDisplayElement());var n={id:i.id,version:i.version};k.sendEvent(a.api.events.JWPLAYER_READY,n);if(playerReady!==undefined){playerReady(n)}if(window[m.config.playerReady]!==undefined){window[m.config.playerReady](n)}m.sendEvent(a.api.events.JWPLAYER_PLAYLIST_LOADED);m.sendEvent(a.api.events.JWPLAYER_PLAYLIST_ITEM,{item:m.config.item});if(m.config.autostart===true&&!m.config.chromeless){k.play()}}}if(h.config.chromeless){setTimeout(c(h,e,g),25)}else{i.skin.load(h.config.skin,c(h,e,g))}return i}})(jwplayer);


// FROM: /javascripts/subModal.js?1294660143
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
					'<img src="../images/close.gif" onclick="parent.get_current_questionare();hidePopWin(false);" id="popCloseBox" />' +
				'</div>' +
			'</div>' +
			'<iframe src="'+ gDefaultPage +'" scrolling="no" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" ></iframe>' +
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


// FROM: /javascripts/tabber.js?1294660143
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



// FROM: /javascripts/functions.js?1294660143
//=========================================== carousels


  var db_interviews_list_y = 0;
  var db_interviews_list_size = 214;
  var db_interviews_list_selected = null;

  var candidates_list_y = 0;
  var candidates_list_size = 264;
  var candidates_list_selected = null;

  var jitem_y=0;
  var jitem_size=330;
  var jitem_selected=null;

  var interview_items_y=0;
  var interview_items_size=328;
  var interview_items_selected=null;

  var jobs_list_y=0;
  var jobs_list_size=242;
  var jobs_list_selected=null;

  var c_int_y=0;
  var c_int_size=286;
  var c_int_selected=null;

  var candidates_list_h_y=0;
  var candidates_list_h_size=905;
  var candidates_list_h_selected=null;

  var answers_list_y=0;
  var answers_list_size=278;
  var answers_list_selected=null;



  function MoveForward_H(id,x)
  {
    new Effect.Move(id, { x: x, y: 0, mode: 'absolute',duration: 0.3 });
  }

  function MoveBackward_H(id,x)
  {

    new Effect.Move(id, { x: x, y: 0, mode: 'absolute',duration: 0.3 });
  }





  function MoveForward(id,y)
  {
    new Effect.Move(id, { x: 0, y: y, mode: 'absolute',duration: 0.3 });
  }

  function MoveBackward(id,y)
  {

    new Effect.Move(id, { x: 0, y: y, mode: 'absolute',duration: 0.3 });
  }

  function ResetControl(id)
  {

  // alert(document.getElementById(id).offsetTop);

    new Effect.Move(id, { x: 0, y:0, mode: 'absolute',duration: 0 });

    candidates_list_size = 264;
    candidates_list_y = 0;
  }


  function GetHeight(id)
  {
    return document.getElementById(id).offsetHeight;
  }

  function GetWidth(id)
  {
    return document.getElementById(id).offsetWidth;
  }

  function testHeight(id)
  {
    alert(GetHeight(id));
  }





  function ScrollForward(id)
  {
    if(id == "answers_list")
      {
             if(answers_list_y>-(GetHeight(id) - answers_list_size))
          {

            answers_list_y-=answers_list_size;
             if(answers_list_y == 0)
              {
                answers_list_y -= answers_list_size;
              }
            MoveForward(id,answers_list_y);
          }
      }

      if(id == "candidates_list_h")
      {
             if(candidates_list_h_y>-(GetWidth('candidates_list') - candidates_list_h_size))
          {

            candidates_list_h_y-=candidates_list_h_size;
             if(candidates_list_h_y == 0)
              {
                candidates_list_h_y -= candidates_list_h_size;
              }
            MoveForward_H('candidates_list',candidates_list_h_y);
          }
      }
    if(id == "db_interviews_list")
      {
        if(db_interviews_list_y>-(GetHeight(id) - db_interviews_list_size))
          {

            db_interviews_list_y-=db_interviews_list_size;
             if(db_interviews_list_y == 0)
              {
                db_interviews_list_y -= db_interviews_list_size;
              }
            MoveForward(id,db_interviews_list_y);
          }
      }

      if(id == "candidates_list")
      {

        if(candidates_list_y>-(GetHeight(id) - candidates_list_size))
          {

           // alert(candidates_list_y);
            candidates_list_y-=candidates_list_size;
             if(candidates_list_y == 0)
              {
                candidates_list_y -= candidates_list_size;
              }

            MoveForward(id,candidates_list_y);
          }
      }

      if(id == "jitem")
      {
        if(jitem_y>-(GetHeight(id) - jitem_size))
          {

            jitem_y-=jitem_size;
             if(jitem_y == 0)
              {
                jitem_y -= jitem_size;
              }
            MoveForward(id,jitem_y);
          }
      }

      if(id == "interview_items")
      {
        if(interview_items_y>-(GetHeight(id) - interview_items_size))
          {

            interview_items_y-=interview_items_size;
             if(interview_items_y == 0)
              {
                interview_items_y -= interview_items_size;
              }
            MoveForward(id,interview_items_y);
          }
      }

      if(id == "jobs_list")
      {
        if(jobs_list_y>-(GetHeight(id) - jobs_list_size))
          {

            jobs_list_y-=jobs_list_size;
             if(jobs_list_y == 0)
              {
                jobs_list_y -= jobs_list_size;
              }
            MoveForward(id,jobs_list_y);
          }
      }


       if(id == "c_int")
      {
        if(c_int_y>-(GetHeight(id) - c_int_size))
          {

            c_int_y-=c_int_size;
             if(c_int_y == 0)
              {
                c_int_y -= c_int_size;
              }
            MoveForward(id,c_int_y);
          }
      }






  }

  function ScrollBackward(id)
  {


      if(id == "answers_list")
      {

        if(answers_list_y < (GetHeight(id) - answers_list_size) && answers_list_y != answers_list_size)
          {

              if(answers_list_y == 0)
              {
               // candidates_list_y = candidates_list_size;
               return;
              }
            answers_list_y+=answers_list_size;
            MoveBackward(id,answers_list_y)

          }

      }



      if(id == "candidates_list_h")
      {

        if(candidates_list_h_y < (GetWidth('candidates_list') - candidates_list_h_size) && candidates_list_h_y != candidates_list_h_size)
          {

              if(candidates_list_h_y == 0)
              {
               // candidates_list_y = candidates_list_size;
               return;
              }
            candidates_list_h_y+=candidates_list_h_size;
            MoveBackward_H('candidates_list',candidates_list_h_y)

          }

      }


    if(id == "db_interviews_list")
      {

        if(db_interviews_list_y < (GetHeight(id) - db_interviews_list_size) && db_interviews_list_y != db_interviews_list_size)
          {

              if(db_interviews_list_y == 0)
              {
               // candidates_list_y = candidates_list_size;
               return;
              }
            db_interviews_list_y+=db_interviews_list_size;
            MoveBackward(id,db_interviews_list_y)

          }

      }

      if(id == "candidates_list")
      {

        if(candidates_list_y < (GetHeight(id) - candidates_list_size) && candidates_list_y != candidates_list_size)
          {

              if(candidates_list_y == 0)
              {
                //candidates_list_y = candidates_list_size;
               return;
              }
            candidates_list_y+=candidates_list_size;

            MoveBackward(id,candidates_list_y)

          }
      }


      if(id == "jitem")
      {

        if(jitem_y < (GetHeight(id) - jitem_size) && jitem_y != jitem_size)
          {

              if(jitem_y == 0)
              {
               // candidates_list_y = candidates_list_size;
               return;
              }
            jitem_y+=jitem_size;
            MoveBackward(id,jitem_y)

          }
      }

      if(id == "interview_items")
      {

        if(interview_items_y < (GetHeight(id) - interview_items_size) && interview_items_y != interview_items_size)
          {

              if(interview_items_y == 0)
              {
               // candidates_list_y = candidates_list_size;
               return;
              }
            interview_items_y+=interview_items_size;
            MoveBackward(id,interview_items_y)

          }
      }

      if(id == "jobs_list")
      {

        if(jobs_list_y < (GetHeight(id) - jobs_list_size) && jobs_list_y != jobs_list_size)
          {

              if(jobs_list_y == 0)
              {
               // candidates_list_y = candidates_list_size;
               return;
              }
            jobs_list_y+=jobs_list_size;
            MoveBackward(id,jobs_list_y)

          }
      }

      if(id == "c_int")
      {

        if(c_int_y < (GetHeight(id) - c_int_size) && c_int_y != c_int_size)
          {

              if(c_int_y == 0)
              {
               // candidates_list_y = candidates_list_size;
               return;
              }
            c_int_y+=c_int_size;
            MoveBackward(id,c_int_y)

          }
      }



  }

  function change(previous,current)
  {
   /* if($(previous) != null)
      {
         $(previous).removeClassName('selected');
      }

    $(current).addClassName('selected');
      */
  }

  function change_selected(name,id)
  {

     if(name == "jitem")
     {
        selected_item = jitem_selected;
        change(selected_item,'job_item_'+id);
        jitem_selected = 'job_item_'+id;

     }

     if(name == "interview_items")
     {
        selected_item = interview_items_selected;
        change(selected_item,'interview_item_'+id);
        interview_items_selected = 'interview_item_'+id;

     }

     if(name == "c_int")
     {
        selected_item = c_int_selected;
        change(selected_item,'interview_item_'+id);
        c_int_selected = 'interview_item_'+id;

     }

     if(name == "answers_list")
     {
        selected_item = answers_list_selected;
        change(selected_item,'answers_item_'+id);
        answers_list_selected = 'answers_item_'+id;

     }



  }


//============================================================= Windows======


 var win = null;
  var index = 1;

	function openDialog(id) {
	  Dialog.confirm($(id).innerHTML, {className: "spread",  width:250, id: "d" + index,closable:true,zIndex:3000})
	  index++;
  }
  function openJobDialog(id) {
	  Dialog.confirm($(id).innerHTML, {className: "spread",  width:850, id: "d" + index,closable:true,zIndex:3000})
	  index++;
  }

   function openShareDialog(id) {

	  Dialog.confirm($(id).innerHTML, {className: "spread",  width:750, id: "d0" + index,closable:true,zIndex:3000})
	  index++;
  }

   function openNewInterview(id) {
	  Dialog.confirm($(id).innerHTML, {className: "spread",  width:500,height:150, id: "d" + index,closable:true,zIndex:3000})
	  index++;
  }

   function editJob(id) {
	  Dialog.confirm($(id).innerHTML, {className: "spread",  width:850,height:450, id: "d" + index,closable:true,zIndex:3000})
	  index++;
  }

  function openInvitation(id) {
	  Dialog.confirm($(id).innerHTML, {className: "spread",  width:750,height:460, id: "d" + index,closable:true,zIndex:3000})
	  index++;
  }

  function lastDialog(id) {
	  Dialog.confirm($(id).innerHTML, {className: "spread",  width:250, okLabel: "Close All", ok: closeAllModalWindows,closable:true,zIndex:3000})
  }

  function open_movie(id)
  {
      Dialog.confirm($(id).innerHTML, {className: "spread",  width:640,height:390, okLabel: "Close All", ok: closeAllModalWindows,closable:true,zIndex:3000})
  }

  function closeAllModalWindows() {
    Windows.closeAllModalWindows();
    return true;
  }

  //=========================================================== input box and scroll


  function Focus(objname, waterMarkText) {
            obj = document.getElementById(objname);
            if (obj.value == waterMarkText) {
                obj.value = "";

                if (obj.value == "username" || obj.value == "" || obj.value == null) {

                }
            }
        }
        function Blur(objname, waterMarkText) {
            obj = document.getElementById(objname);

            if (objname != "password")
            {
                    if (obj.value == "username" || obj.value == "" || obj.value == null)
                    {
                      obj.value = "username";
                    }
            }
            if (objname == "password")
              {
                    if (obj.value == "password" || obj.value == "" || obj.value == null)
                    {
                    //  obj.type = 'text';
                      obj.value = 'password';
                    }
              }




        }

         function FocusPassword() {
         obj = document.getElementById('password');
          obj.type = 'password';
          obj.value = '';

         }



  function currentYPosition() {
	if (self.pageYOffset)
		 return self.pageYOffset;
	if (document.documentElement && document.documentElement.scrollTop)
		return document.documentElement.scrollTop;
	if (document.body.scrollTop)
		 return document.body.scrollTop;
	return 0;
}
function elmYPosition(eID) {
	var elm  = document.getElementById(eID);
	var y    = elm.offsetTop;
	var node = elm;
	while (node.offsetParent && node.offsetParent != document.body) {
		node = node.offsetParent;
		y   += node.offsetTop;
	} return y;
}
function smoothScroll(eID) {
	var startY   = currentYPosition();
	var stopY    = elmYPosition(eID);
	var distance = stopY > startY ? stopY - startY : startY - stopY;
	if (distance < 100) {
		scrollTo(0, stopY); return;
	}
	var speed = Math.round(distance / 100);
	if (speed >= 20) speed = 20;
	var step  = Math.round(distance / 25);
	var leapY = stopY > startY ? startY + step : startY - step;
	var timer = 0;
	if (stopY > startY) {
		for ( var i=startY; i<stopY; i+=step ) {
			setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
			leapY += step; if (leapY > stopY) leapY = stopY; timer++;
		} return;
	}
	for ( var i=startY; i>stopY; i-=step ) {
		setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
		leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
	}
}

//============================== navigate

 function navigate(url)
  {
     window.location = url;
  }


 function show_wait(id)
 {
     document.getElementById(id);
 }




// FROM: /javascripts/dhtmlxcommon.js?1294660143
//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
dhtmlx=function(obj){for (var a in obj)dhtmlx[a]=obj[a];return dhtmlx;};dhtmlx.extend_api=function(name,map,ext){var t = window[name];if (!t)return;window[name]=function(obj){if (obj && typeof obj == "object" && !obj.tagName){var that = t.apply(this,(map._init?map._init(obj):arguments));for (var a in dhtmlx)if (map[a])this[map[a]](dhtmlx[a]);for (var a in obj){if (map[a])this[map[a]](obj[a]);else if (a.indexOf("on")==0){this.attachEvent(a,obj[a]);}}}else
 var that = t.apply(this,arguments);if (map._patch)map._patch(this);return that||this;};window[name].prototype=t.prototype;if (ext)dhtmlXHeir(window[name].prototype,ext);};dhtmlxAjax={get:function(url,callback){var t=new dtmlXMLLoaderObject(true);t.async=(arguments.length<3);t.waitCall=callback;t.loadXML(url)
 return t;},
 post:function(url,post,callback){var t=new dtmlXMLLoaderObject(true);t.async=(arguments.length<4);t.waitCall=callback;t.loadXML(url,true,post)
 return t;},
 getSync:function(url){return this.get(url,null,true)
 },
 postSync:function(url,post){return this.post(url,post,null,true);}};function dtmlXMLLoaderObject(funcObject, dhtmlObject, async, rSeed){this.xmlDoc="";if (typeof (async)!= "undefined")
 this.async=async;else
 this.async=true;this.onloadAction=funcObject||null;this.mainObject=dhtmlObject||null;this.waitCall=null;this.rSeed=rSeed||false;return this;};dtmlXMLLoaderObject.prototype.waitLoadFunction=function(dhtmlObject){var once = true;this.check=function (){if ((dhtmlObject)&&(dhtmlObject.onloadAction != null)){if ((!dhtmlObject.xmlDoc.readyState)||(dhtmlObject.xmlDoc.readyState == 4)){if (!once)return;once=false;if (typeof dhtmlObject.onloadAction == "function")dhtmlObject.onloadAction(dhtmlObject.mainObject, null, null, null, dhtmlObject);if (dhtmlObject.waitCall){dhtmlObject.waitCall.call(this,dhtmlObject);dhtmlObject.waitCall=null;}}}};return this.check;};dtmlXMLLoaderObject.prototype.getXMLTopNode=function(tagName, oldObj){if (this.xmlDoc.responseXML){var temp = this.xmlDoc.responseXML.getElementsByTagName(tagName);if(temp.length==0 && tagName.indexOf(":")!=-1)
 var temp = this.xmlDoc.responseXML.getElementsByTagName((tagName.split(":"))[1]);var z = temp[0];}else
 var z = this.xmlDoc.documentElement;if (z){this._retry=false;return z;};if ((_isIE)&&(!this._retry)){var xmlString = this.xmlDoc.responseText;var oldObj = this.xmlDoc;this._retry=true;this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");this.xmlDoc.async=false;this.xmlDoc["loadXM"+"L"](xmlString);return this.getXMLTopNode(tagName, oldObj);};dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (oldObj||this.xmlDoc),
 this.mainObject
 ]);return document.createElement("DIV");};dtmlXMLLoaderObject.prototype.loadXMLString=function(xmlString){{
 try{var parser = new DOMParser();this.xmlDoc=parser.parseFromString(xmlString, "text/xml");}catch (e){this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");this.xmlDoc.async=this.async;this.xmlDoc["loadXM"+"L"](xmlString);}};this.onloadAction(this.mainObject, null, null, null, this);if (this.waitCall){this.waitCall();this.waitCall=null;}};dtmlXMLLoaderObject.prototype.loadXML=function(filePath, postMode, postVars, rpc){if (this.rSeed)filePath+=((filePath.indexOf("?") != -1) ? "&" : "?")+"a_dhx_rSeed="+(new Date()).valueOf();this.filePath=filePath;if ((!_isIE)&&(window.XMLHttpRequest))
 this.xmlDoc=new XMLHttpRequest();else {if (document.implementation&&document.implementation.createDocument){this.xmlDoc=document.implementation.createDocument("", "", null);this.xmlDoc.onload=new this.waitLoadFunction(this);this.xmlDoc.load(filePath);return;}else
 this.xmlDoc=new ActiveXObject("Microsoft.XMLHTTP");};if (this.async)this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this);this.xmlDoc.open(postMode ? "POST" : "GET", filePath, this.async);if (rpc){this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 ("+navigator.userAgent+")");this.xmlDoc.setRequestHeader("Content-type", "text/xml");}else if (postMode)this.xmlDoc.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest");this.xmlDoc.send(null||postVars);if (!this.async)(new this.waitLoadFunction(this))();};dtmlXMLLoaderObject.prototype.destructor=function(){this._filterXPath = null;this._getAllNamedChilds = null;this._retry = null;this.async = null;this.rSeed = null;this.filePath = null;this.onloadAction = null;this.mainObject = null;this.xmlDoc = null;this.doXPath = null;this.doXPathOpera = null;this.doXSLTransToObject = null;this.doXSLTransToString = null;this.loadXML = null;this.loadXMLString = null;this.doSerialization = null;this.xmlNodeToJSON = null;this.getXMLTopNode = null;this.setXSLParamValue = null;return null;};dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(node){var t={};for (var i=0;i<node.attributes.length;i++)t[node.attributes[i].name]=node.attributes[i].value;t["_tagvalue"]=node.firstChild?node.firstChild.nodeValue:"";for (var i=0;i<node.childNodes.length;i++){var name=node.childNodes[i].tagName;if (name){if (!t[name])t[name]=[];t[name].push(this.xmlNodeToJSON(node.childNodes[i]));}};return t;};function callerFunction(funcObject, dhtmlObject){this.handler=function(e){if (!e)e=window.event;funcObject(e, dhtmlObject);return true;};return this.handler;};function getAbsoluteLeft(htmlObject){return getOffset(htmlObject).left;};function getAbsoluteTop(htmlObject){return getOffset(htmlObject).top;};function getOffsetSum(elem) {var top=0, left=0;while(elem){top = top + parseInt(elem.offsetTop);left = left + parseInt(elem.offsetLeft);elem = elem.offsetParent;};return {top: top, left: left}};function getOffsetRect(elem) {var box = elem.getBoundingClientRect();var body = document.body;var docElem = document.documentElement;var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;var clientTop = docElem.clientTop || body.clientTop || 0;var clientLeft = docElem.clientLeft || body.clientLeft || 0;var top = box.top + scrollTop - clientTop;var left = box.left + scrollLeft - clientLeft;return {top: Math.round(top), left: Math.round(left) }};function getOffset(elem) {if (elem.getBoundingClientRect){return getOffsetRect(elem);}else {return getOffsetSum(elem);}};function convertStringToBoolean(inputString){if (typeof (inputString)== "string")
 inputString=inputString.toLowerCase();switch (inputString){case "1":
 case "true":
 case "yes":
 case "y":
 case 1:
 case true:
 return true;break;default: return false;}};function getUrlSymbol(str){if (str.indexOf("?")!= -1)
 return "&"
 else
 return "?"
};function dhtmlDragAndDropObject(){if (window.dhtmlDragAndDrop)return window.dhtmlDragAndDrop;this.lastLanding=0;this.dragNode=0;this.dragStartNode=0;this.dragStartObject=0;this.tempDOMU=null;this.tempDOMM=null;this.waitDrag=0;window.dhtmlDragAndDrop=this;return this;};dhtmlDragAndDropObject.prototype.removeDraggableItem=function(htmlNode){htmlNode.onmousedown=null;htmlNode.dragStarter=null;htmlNode.dragLanding=null;};dhtmlDragAndDropObject.prototype.addDraggableItem=function(htmlNode, dhtmlObject){htmlNode.onmousedown=this.preCreateDragCopy;htmlNode.dragStarter=dhtmlObject;this.addDragLanding(htmlNode, dhtmlObject);};dhtmlDragAndDropObject.prototype.addDragLanding=function(htmlNode, dhtmlObject){htmlNode.dragLanding=dhtmlObject;};dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(e){if ((e||window.event)&& (e||event).button == 2)
 return;if (window.dhtmlDragAndDrop.waitDrag){window.dhtmlDragAndDrop.waitDrag=0;document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU;document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM;return false;};window.dhtmlDragAndDrop.waitDrag=1;window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove;window.dhtmlDragAndDrop.dragStartNode=this;window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;window.dhtmlDragAndDrop.downtime = new Date().valueOf();if ((e)&&(e.preventDefault)){e.preventDefault();return false;};return false;};dhtmlDragAndDropObject.prototype.callDrag=function(e){if (!e)e=window.event;dragger=window.dhtmlDragAndDrop;if ((new Date()).valueOf()-dragger.downtime<100) return;if ((e.button == 0)&&(_isIE))
 return dragger.stopDrag();if (!dragger.dragNode&&dragger.waitDrag){dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode, e);if (!dragger.dragNode)return dragger.stopDrag();dragger.dragNode.onselectstart=function(){return false;};dragger.gldragNode=dragger.dragNode;document.body.appendChild(dragger.dragNode);document.body.onmouseup=dragger.stopDrag;dragger.waitDrag=0;dragger.dragNode.pWindow=window;dragger.initFrameRoute();};if (dragger.dragNode.parentNode != window.document.body){var grd = dragger.gldragNode;if (dragger.gldragNode.old)grd=dragger.gldragNode.old;grd.parentNode.removeChild(grd);var oldBody = dragger.dragNode.pWindow;if (grd.pWindow && grd.pWindow.dhtmlDragAndDrop.lastLanding)grd.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(grd.pWindow.dhtmlDragAndDrop.lastLanding);if (_isIE){var div = document.createElement("Div");div.innerHTML=dragger.dragNode.outerHTML;dragger.dragNode=div.childNodes[0];}else
 dragger.dragNode=dragger.dragNode.cloneNode(true);dragger.dragNode.pWindow=window;dragger.gldragNode.old=dragger.dragNode;document.body.appendChild(dragger.dragNode);oldBody.dhtmlDragAndDrop.dragNode=dragger.dragNode;};dragger.dragNode.style.left=e.clientX+15+(dragger.fx
 ? dragger.fx*(-1)
 : 0)
 +(document.body.scrollLeft||document.documentElement.scrollLeft)+"px";dragger.dragNode.style.top=e.clientY+3+(dragger.fy
 ? dragger.fy*(-1)
 : 0)
 +(document.body.scrollTop||document.documentElement.scrollTop)+"px";if (!e.srcElement)var z = e.target;else
 z=e.srcElement;dragger.checkLanding(z, e);};dhtmlDragAndDropObject.prototype.calculateFramePosition=function(n){if (window.name){var el = parent.frames[window.name].frameElement.offsetParent;var fx = 0;var fy = 0;while (el){fx+=el.offsetLeft;fy+=el.offsetTop;el=el.offsetParent;};if ((parent.dhtmlDragAndDrop)){var ls = parent.dhtmlDragAndDrop.calculateFramePosition(1);fx+=ls.split('_')[0]*1;fy+=ls.split('_')[1]*1;};if (n)return fx+"_"+fy;else
 this.fx=fx;this.fy=fy;};return "0_0";};dhtmlDragAndDropObject.prototype.checkLanding=function(htmlObject, e){if ((htmlObject)&&(htmlObject.dragLanding)){if (this.lastLanding)this.lastLanding.dragLanding._dragOut(this.lastLanding);this.lastLanding=htmlObject;this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, e.clientX,
 e.clientY, e);this.lastLanding_scr=(_isIE ? e.srcElement : e.target);}else {if ((htmlObject)&&(htmlObject.tagName != "BODY"))
 this.checkLanding(htmlObject.parentNode, e);else {if (this.lastLanding)this.lastLanding.dragLanding._dragOut(this.lastLanding, e.clientX, e.clientY, e);this.lastLanding=0;if (this._onNotFound)this._onNotFound();}}};dhtmlDragAndDropObject.prototype.stopDrag=function(e, mode){dragger=window.dhtmlDragAndDrop;if (!mode){dragger.stopFrameRoute();var temp = dragger.lastLanding;dragger.lastLanding=null;if (temp)temp.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, temp, (_isIE
 ? event.srcElement
 : e.target));};dragger.lastLanding=null;if ((dragger.dragNode)&&(dragger.dragNode.parentNode == document.body))
 dragger.dragNode.parentNode.removeChild(dragger.dragNode);dragger.dragNode=0;dragger.gldragNode=0;dragger.fx=0;dragger.fy=0;dragger.dragStartNode=0;dragger.dragStartObject=0;document.body.onmouseup=dragger.tempDOMU;document.body.onmousemove=dragger.tempDOMM;dragger.tempDOMU=null;dragger.tempDOMM=null;dragger.waitDrag=0;};dhtmlDragAndDropObject.prototype.stopFrameRoute=function(win){if (win)window.dhtmlDragAndDrop.stopDrag(1, 1);for (var i = 0;i < window.frames.length;i++){try{if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
 window.frames[i].dhtmlDragAndDrop.stopFrameRoute(window);}catch(e){}};try{if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
 parent.dhtmlDragAndDrop.stopFrameRoute(window);}catch(e){}};dhtmlDragAndDropObject.prototype.initFrameRoute=function(win, mode){if (win){window.dhtmlDragAndDrop.preCreateDragCopy();window.dhtmlDragAndDrop.dragStartNode=win.dhtmlDragAndDrop.dragStartNode;window.dhtmlDragAndDrop.dragStartObject=win.dhtmlDragAndDrop.dragStartObject;window.dhtmlDragAndDrop.dragNode=win.dhtmlDragAndDrop.dragNode;window.dhtmlDragAndDrop.gldragNode=win.dhtmlDragAndDrop.dragNode;window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag;window.waitDrag=0;if (((!_isIE)&&(mode))&&((!_isFF)||(_FFrv < 1.8)))
 window.dhtmlDragAndDrop.calculateFramePosition();};try{if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
 parent.dhtmlDragAndDrop.initFrameRoute(window);}catch(e){};for (var i = 0;i < window.frames.length;i++){try{if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
 window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, ((!win||mode) ? 1 : 0));}catch(e){}}};var _isFF = false;var _isIE = false;var _isOpera = false;var _isKHTML = false;var _isMacOS = false;var _isChrome = false;if (navigator.userAgent.indexOf('Macintosh')!= -1)
 _isMacOS=true;if (navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
 _isChrome=true;if ((navigator.userAgent.indexOf('Safari')!= -1)||(navigator.userAgent.indexOf('Konqueror') != -1)){var _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Safari')+7, 5));if (_KHTMLrv > 525){_isFF=true;var _FFrv = 1.9;}else
 _isKHTML=true;}else if (navigator.userAgent.indexOf('Opera')!= -1){_isOpera=true;_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Opera')+6, 3));}else if (navigator.appName.indexOf("Microsoft")!= -1){_isIE=true;if (navigator.appVersion.indexOf("MSIE 8.0")!= -1 && document.compatMode != "BackCompat") _isIE=8;}else {_isFF=true;var _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
};dtmlXMLLoaderObject.prototype.doXPath=function(xpathExp, docObj, namespace, result_type){if (_isKHTML || (!_isIE && !window.XPathResult))
 return this.doXPathOpera(xpathExp, docObj);if (_isIE){if (!docObj)if (!this.xmlDoc.nodeName)docObj=this.xmlDoc.responseXML
 else
 docObj=this.xmlDoc;if (!docObj)dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (docObj||this.xmlDoc),
 this.mainObject
 ]);if (namespace != null)docObj.setProperty("SelectionNamespaces", "xmlns:xsl='"+namespace+"'");if (result_type == 'single'){return docObj.selectSingleNode(xpathExp);}else {return docObj.selectNodes(xpathExp)||new Array(0);}}else {var nodeObj = docObj;if (!docObj){if (!this.xmlDoc.nodeName){docObj=this.xmlDoc.responseXML
 }else {docObj=this.xmlDoc;}};if (!docObj)dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (docObj||this.xmlDoc),
 this.mainObject
 ]);if (docObj.nodeName.indexOf("document")!= -1){nodeObj=docObj;}else {nodeObj=docObj;docObj=docObj.ownerDocument;};var retType = XPathResult.ANY_TYPE;if (result_type == 'single')retType=XPathResult.FIRST_ORDERED_NODE_TYPE
 var rowsCol = new Array();var col = docObj.evaluate(xpathExp, nodeObj, function(pref){return namespace
 }, retType, null);if (retType == XPathResult.FIRST_ORDERED_NODE_TYPE){return col.singleNodeValue;};var thisColMemb = col.iterateNext();while (thisColMemb){rowsCol[rowsCol.length]=thisColMemb;thisColMemb=col.iterateNext();};return rowsCol;}};function _dhtmlxError(type, name, params){if (!this.catches)this.catches=new Array();return this;};_dhtmlxError.prototype.catchError=function(type, func_name){this.catches[type]=func_name;};_dhtmlxError.prototype.throwError=function(type, name, params){if (this.catches[type])return this.catches[type](type, name, params);if (this.catches["ALL"])return this.catches["ALL"](type, name, params);alert("Error type: "+arguments[0]+"\nDescription: "+arguments[1]);return null;};window.dhtmlxError=new _dhtmlxError();dtmlXMLLoaderObject.prototype.doXPathOpera=function(xpathExp, docObj){var z = xpathExp.replace(/[\/]+/gi, "/").split('/');var obj = null;var i = 1;if (!z.length)return [];if (z[0] == ".")obj=[docObj];else if (z[0] == ""){obj=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(z[i].replace(/\[[^\]]*\]/g, ""));i++;}else
 return [];for (i;i < z.length;i++)obj=this._getAllNamedChilds(obj, z[i]);if (z[i-1].indexOf("[")!= -1)
 obj=this._filterXPath(obj, z[i-1]);return obj;};dtmlXMLLoaderObject.prototype._filterXPath=function(a, b){var c = new Array();var b = b.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, "");for (var i = 0;i < a.length;i++)if (a[i].getAttribute(b))
 c[c.length]=a[i];return c;};dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(a, b){var c = new Array();if (_isKHTML)b=b.toUpperCase();for (var i = 0;i < a.length;i++)for (var j = 0;j < a[i].childNodes.length;j++){if (_isKHTML){if (a[i].childNodes[j].tagName&&a[i].childNodes[j].tagName.toUpperCase()== b)
 c[c.length]=a[i].childNodes[j];}else if (a[i].childNodes[j].tagName == b)c[c.length]=a[i].childNodes[j];};return c;};function dhtmlXHeir(a, b){for (var c in b)if (typeof (b[c])== "function")
 a[c]=b[c];return a;};function dhtmlxEvent(el, event, handler){if (el.addEventListener)el.addEventListener(event, handler, false);else if (el.attachEvent)el.attachEvent("on"+event, handler);};dtmlXMLLoaderObject.prototype.xslDoc=null;dtmlXMLLoaderObject.prototype.setXSLParamValue=function(paramName, paramValue, xslDoc){if (!xslDoc)xslDoc=this.xslDoc

 if (xslDoc.responseXML)xslDoc=xslDoc.responseXML;var item =
 this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+paramName+"']", xslDoc,
 "http:/\/www.w3.org/1999/XSL/Transform", "single");if (item != null)item.firstChild.nodeValue=paramValue
};dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(xslDoc, xmlDoc){if (!xslDoc)xslDoc=this.xslDoc;if (xslDoc.responseXML)xslDoc=xslDoc.responseXML

 if (!xmlDoc)xmlDoc=this.xmlDoc;if (xmlDoc.responseXML)xmlDoc=xmlDoc.responseXML


 if (!_isIE){if (!this.XSLProcessor){this.XSLProcessor=new XSLTProcessor();this.XSLProcessor.importStylesheet(xslDoc);};var result = this.XSLProcessor.transformToDocument(xmlDoc);}else {var result = new ActiveXObject("Msxml2.DOMDocument.3.0");try{xmlDoc.transformNodeToObject(xslDoc, result);}catch(e){result = xmlDoc.transformNode(xslDoc);}};return result;};dtmlXMLLoaderObject.prototype.doXSLTransToString=function(xslDoc, xmlDoc){var res = this.doXSLTransToObject(xslDoc, xmlDoc);if(typeof(res)=="string")
 return res;return this.doSerialization(res);};dtmlXMLLoaderObject.prototype.doSerialization=function(xmlDoc){if (!xmlDoc)xmlDoc=this.xmlDoc;if (xmlDoc.responseXML)xmlDoc=xmlDoc.responseXML
 if (!_isIE){var xmlSerializer = new XMLSerializer();return xmlSerializer.serializeToString(xmlDoc);}else
 return xmlDoc.xml;};dhtmlxEventable=function(obj){obj.attachEvent=function(name, catcher, callObj){name='ev_'+name.toLowerCase();if (!this[name])this[name]=new this.eventCatcher(callObj||this);return(name+':'+this[name].addEvent(catcher));};obj.callEvent=function(name, arg0){name='ev_'+name.toLowerCase();if (this[name])return this[name].apply(this, arg0);return true;};obj.checkEvent=function(name){return (!!this['ev_'+name.toLowerCase()])
 };obj.eventCatcher=function(obj){var dhx_catch = [];var z = function(){var res = true;for (var i = 0;i < dhx_catch.length;i++){if (dhx_catch[i] != null){var zr = dhx_catch[i].apply(obj, arguments);res=res&&zr;}};return res;};z.addEvent=function(ev){if (typeof (ev)!= "function")
 ev=eval(ev);if (ev)return dhx_catch.push(ev)-1;return false;};z.removeEvent=function(id){dhx_catch[id]=null;};return z;};obj.detachEvent=function(id){if (id != false){var list = id.split(':');this[list[0]].removeEvent(list[1]);}};obj.detachAllEvents = function(){for (var name in this){if (name.indexOf("ev_")==0)
 delete this[name];}}};
//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/


// FROM: /javascripts/dhtmlxcalendar.js?1294660143
//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/

function dhtmlxDblCalendarObject(contId, isAutoDraw, options){this.scriptName = 'dhtmlxcalendar.js';this.entObj = document.createElement("DIV");this.winHeader = null
 this.style = "dhtmlxdblcalendar";this.uid = 'sc&dblCal'+Math.round(1000000*Math.random());this.numLoaded = 2;this.options = {isWinHeader: false,
 headerText: 'dhtmlxDblCalendarObject',
 headerButtons: '',



 isWinDrag: false,
 msgClose: "Close",
 msgMinimize: "Minimize",
 msgToday: "Today",
 msgClear: "Clear"
 };if (options)for (x in options)this.options[x] = options[x];this.entBox = document.createElement("TABLE");this.entBox.cellPadding = "0px";this.entBox.cellSpacing = "0px";this.entBox.className = this.style;this.entObj.appendChild(this.entBox);var entRow = this.entBox.insertRow(0);var calLeft = entRow.insertCell(0);calLeft.style.paddingRight = '2px';var calRight = entRow.insertCell(1);this.leftCalendar = new dhtmlxCalendarObject(calLeft, false, this.options);this.leftCalendar._dblC = this;this.leftCalendar.setOnClickHandler(this.doOnCLeftClick);this.rightCalendar = new dhtmlxCalendarObject(calRight, false, this.options);this.rightCalendar._dblC = this;this.rightCalendar.setOnClickHandler(this.doOnCRightClick);this.doOnClick = null;this.onLanguageLoaded = null;this.getPosition = this.leftCalendar.getPosition;this.startDrag = this.leftCalendar.startDrag;this.stopDrag = this.leftCalendar.stopDrag;this.onDrag = this.leftCalendar.onDrag;this.drawHeader = this.leftCalendar.drawHeader;dhtmlxEventable(this);var self = this;if (typeof(contId)!= 'string') this.con = contId;else this.con = document.getElementById(contId);if (isAutoDraw)this.draw ();};dhtmlXDblCalendarObject = dhtmlxDblCalendarObject;dhtmlxDblCalendarObject.prototype.setHeader = function(isVisible, isDrag, btnsOpt){this.leftCalendar.options.isWinHeader = this.options.isWinHeader = isVisible;this.leftCalendar.options.isWinDrag = this.options.isWinDrag = isDrag;if (btnsOpt)this.options.headerButtons = this.leftCalendar.options.headerButtons = btnsOpt;if (this.isAutoDraw)this.drawHeader();};dhtmlxDblCalendarObject.prototype.setYearsRange = function(minYear, maxYear){var cs = [this.leftCalendar, this.rightCalendar];for (var ind=0;ind < cs.length;ind++){cs[ind].options.yearsRange = [parseInt(minYear), parseInt(maxYear)];cs[ind].allYears = [];for (var i=minYear;i <= maxYear;i++)cs[ind].allYears.push(i);}};dhtmlxDblCalendarObject.prototype.show = function(){this.parent.style.display = 'block';};dhtmlxDblCalendarObject.prototype.hide = function(){this.parent.style.display = 'none';};dhtmlxDblCalendarObject.prototype.createStructure = function(){if (this.options.isWinHeader){var headerRow = this.entBox.insertRow(0).insertCell(0);headerRow.colSpan = 2;headerRow.align = 'right';this.winHeader = document.createElement('DIV');headerRow.appendChild(this.winHeader);};this.setParent(this.con);};dhtmlxDblCalendarObject.prototype.draw = function(){if (!this.parent)this.createStructure();this.drawHeader();this.leftCalendar.draw();this.rightCalendar.draw();this.isAutoDraw = true;};dhtmlxDblCalendarObject.prototype.loadUserLanguage = function(lang, userCBfunction){this.numLoaded = 0;if (userCBfunction)this.onLanguageLoaded = userCBfunction;this.leftCalendar.loadUserLanguage(lang, this.languageLoaded);this.rightCalendar.loadUserLanguage(lang, this.languageLoaded);};dhtmlxDblCalendarObject.prototype.languageLoaded = function(status){var self = this._dblC;self.numLoaded ++;if (self.numLoaded == 2){for (param in this.options)self.options[param] = this.options[param];if (this.isAutoDraw)self.drawHeader();if (self.onLanguageLoaded)self.onLanguageLoaded(status);}};dhtmlxDblCalendarObject.prototype.setParent = function(newParent){if (newParent){this.parent = newParent;this.parent.style.display = 'block';this.parent.appendChild(this.entObj);}};dhtmlxDblCalendarObject.prototype.setOnClickHandler = function(func){this.doOnClick = func;};dhtmlxDblCalendarObject.prototype.doOnCLeftClick = function(date){date = new Date (date);this._dblC.rightCalendar.setSensitive(date, null);if (this._dblC.doOnClick)this._dblC.doOnClick(date, this, "left");return true;};dhtmlxDblCalendarObject.prototype.doOnCRightClick = function(date){date = new Date (date);this._dblC.leftCalendar.setSensitive(null, date);if (this._dblC.doOnClick)this._dblC.doOnClick(date, this, "right");return true;};dhtmlxDblCalendarObject.prototype.setSensitive = function(){this.rightCalendar.setSensitive(null, this.leftCalendar.date[0]);this.leftCalendar.setSensitive(this.rightCalendar.date[0], null);};dhtmlxDblCalendarObject.prototype.minimize = function(){if (!this.winHeader)return;var tr = this.winHeader.parentNode.parentNode.nextSibling;tr.parentNode.parentNode.style.width = parseInt(tr.parentNode.parentNode.offsetWidth) + 'px';if (tr)tr.style.display = (tr.style.display == 'none')? 'block': 'none';};dhtmlxDblCalendarObject.prototype.setDate = function(dateFrom,dateTo){this.leftCalendar.setDate(dateFrom);this.rightCalendar.setDate(dateTo);this.leftCalendar.setSensitive(null, this.rightCalendar.date[0]);this.rightCalendar.setSensitive(this.leftCalendar.date[0], null);};dhtmlxDblCalendarObject.prototype.setDateFormat = function(format){this.leftCalendar.setDateFormat(format);this.rightCalendar.setDateFormat(format);};dhtmlxDblCalendarObject.prototype.isVisible = function(){return (this.parent.style.display == 'block'?true:false);};dhtmlxDblCalendarObject.prototype.setHolidays = function(dates){this.leftCalendar.setHolidays(dates);this.rightCalendar.setHolidays(dates);};function dhtmlxCalendarObject (base, isAutoDraw, options){if (typeof(base)== "object" && base.parent)
 {options = {};for (i in base)options [i] = base [i];};this.isAutoDraw = base.autoDraw === false ? false : (isAutoDraw === false ? false : true)
 this.contId = base.parent || base;this.scriptName = 'dhtmlxcalendar.js';this.date = [this.cutTime(new Date())];this.selDate = [this.cutTime(new Date())];this.curDate = this.cutTime(new Date());this.entObj = document.createElement("DIV");this.monthPan = document.createElement("TABLE");this.dlabelPan = document.createElement("TABLE");this.daysPan = document.createElement("TABLE");this.parent = null;this.style = "dhtmlxcalendar";this.skinName = dhtmlx.skin || "";this.doOnClick = null;this.sensitiveFrom = null;this.sensitiveTo = null;this.insensitiveDates = null;this.activeCell = null;this.hotCell = null;this.winHeader = null
 this.onLanguageLoaded = null;this.dragging = false;this.minimized = false;this.uid = 'sc&Cal'+Math.round(1000000*Math.random());this.holidays = null;this.time = false;this.daysCells = {};this.weekCells = {};this.con = [];this.conInd = [];this.activeCon = null;this.activeConInd = 0;this.userPosition = false;this.useIframe = true;this._c = this;dhtmlxEventable(this);this.options = {btnPrev: "&laquo;",
 btnBgPrev: null,
 btnNext: "&raquo;",
 btnBgNext: null,
 yearsRange: [1900, 2100],

 isMonthEditable: false,
 isYearEditable: false,

 isWinHeader: false,
 headerText : 'Calendar header',
 headerButtons: 'TMX',


 isWinDrag: true
 };defLeng = {langname: 'en-us',
 dateformat: '%Y-%m-%d',
 monthesFNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
 monthesSNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
 daysFNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
 daysSNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
 weekend: [0, 6],
 weekstart: 0,
 msgClose: "Close",
 msgMinimize: "Minimize",
 msgToday: "Today",
 msgClear: "Clear"
 };if (!window.dhtmlxCalendarLangModules)window.dhtmlxCalendarLangModules = {};window.dhtmlxCalendarLangModules['en-us'] = defLeng;if (window.dhtmlxCalendarObjects)window.dhtmlxCalendarObjects.push(this);else window.dhtmlxCalendarObjects = [this];dhtmlxEvent(document.body,"click",function(ev){for (var i=0;i < window.dhtmlxCalendarObjects.length;i++){var wCal = window.dhtmlxCalendarObjects [i];if (wCal.con[0].nodeName == 'INPUT')wCal.hide ()
 }});for (lg in defLeng)this.options[lg] = defLeng[lg];if (options)for (param in options)this.options[param] = options[param];this.loadUserLanguage();if (options)for (param in options)this.options[param] = options[param];this.allYears = Array();with (this.options)
 for (var i=yearsRange[0];i <= yearsRange[1];i++)this.allYears.push(i);if(this.isAutoDraw !== false)this.draw(options);return this;};dhtmlXCalendarObject = dhtmlxCalendarObject;dhtmlxCalendarObject.prototype={createStructure:function(){var self = this;if (!this.entObj.className)this.setSkin (this.skinName);this.entObj.style.position = "relative";if (this.options.isWinHeader){this.winHeader = document.createElement('DIV');this.entObj.appendChild(this.winHeader);};this.entBox = document.createElement("TABLE");this.entBox.className = "entbox";with (this.entBox) {cellPadding = "0px";cellSpacing = "0px";width = '100%';};this.entObj.appendChild(this.entBox);var monthBox = this.entBox.insertRow(0).insertCell(0);with (this.monthPan) {cellPadding = "0px";cellSpacing = "0px";width = '100%';align = 'center';};this.monthPan.className = "dxcalmonth";monthBox.appendChild(this.monthPan);var dlabelBox = this.entBox.insertRow(1).insertCell(0);dlabelBox.appendChild(this.dlabelPan);with (this.dlabelPan) {cellPadding = "0px";cellSpacing = "0px";width = '100%';align = 'center';};this.dlabelPan.className = "dxcaldlabel";var daysBox = this.entBox.insertRow(2).insertCell(0);daysBox.appendChild(this.daysPan);with (this.daysPan) {cellPadding = "1px";cellSpacing = "0px";width = '100%';align = 'center';};if(_isIE || _isKHTML)this.daysPan.className = "dxcaldays_ie";else
 this.daysPan.className = "dxcaldays";this.daysPan.onmousemove = function (e) {self.doHotKeys(e);};this.daysPan.onmouseout = function () {self.endHotKeys();};if (typeof(this.contId)!= 'string') {if (!this.contId.nodeName){for (var i=0;i < this.contId.length;i++){this.con[i] = document.getElementById(this.contId[i]);this.selDate[i] = this.cutTime(new Date());this.conInd[this.contId[i]] = i;}}else {this.con [0] = this.contId;this.conInd [this.contId.id] = 0;}}else
 {this.con [0] = document.getElementById(this.contId);this.conInd [this.contId] = 0;};this.activeCon = this.con[0];if (this.con[0].nodeName == 'INPUT'){var div = document.createElement('DIV');with (div.style) {position = 'absolute';display = 'none';zIndex = 101;};this.setParent(div);document.body.appendChild(div);conOnclick = function (e) {if (self.isVisible())
 self.hide()
 else {self.activeCon = this;if (this.value){self.setFormatedDate(null, this.value);}else if (self.time){self.tp.reset();};self.show(this.id);self.draw();};if (this.id != self.activeCon.id){self.show(this.id);self.draw();};(e||event).cancelBubble=true;};this.doOnClick = function (date) {self.hide();self.activeCon.focus();return true;};conOnkeydown = function(e){if((e||window.event).keyCode==27)
 self.hide();else if((e||window.event).keyCode==13)
 self.show();};for (i in this.con){this.con[i].onclick = conOnclick;this.con[i].onkeydown = conOnkeydown;}}else this.setParent(this.con [0]);if(_isIE && this.useIframe){if(this.parent.style.zIndex==0){this.parent.style.zIndex = 100;};if(this.ifr == undefined && this._dblC == undefined){this.ifr = document.createElement("IFRAME");this.ifr.src="javascript:'';"
 this.ifr.style.position = "absolute";this.ifr.style.zIndex = 1;this.ifr.frameBorder = "no";this.ifr.style.top = getAbsoluteTop(this.entObj) + 'px';this.ifr.scrolling = 'no';this.ifr.style.display = this.parent.style.display;this.ifr.className = this.style + (this.skinName?'_':"") + this.skinName + "_ifr";this.parent.appendChild(this.ifr);}};this.entObj.onclick = function (e) {e = e||event;if (e.stopPropagation)e.stopPropagation();else e.cancelBubble = true;};if (!this.entObj.className)this.setSkin (this.skinName);},


 drawHeader:function(){if (this._dblC
 || !this.options.isWinHeader
 || !this.winHeader)return
 var self = this;while (this.winHeader.hasChildNodes())
 this.winHeader.removeChild(this.winHeader.firstChild);this.winHeader.className = 'winHeader';this.winHeader.onselectstart=function(){return false};this.headerLabel = document.createElement('div');this.headerLabel.className = 'winTitle';this.headerLabel.appendChild(document.createTextNode(this.options.headerText));this.headerLabel.setAttribute('title', this.options.headerText);this.winHeader.appendChild(this.headerLabel);if (this.options.isWinDrag){this.winHeader.onmousedown = function(e) {self.startDrag(e);}};if (this.options.headerButtons.indexOf('X')>=0) {var btnClose = document.createElement('DIV');btnClose.className = 'btn_close';btnClose.setAttribute('title', this.options.msgClose);btnClose.onmousedown =function (e) {(e||event).cancelBubble=true;};btnClose.onclick = function (e) {(e||event).cancelBubble=true;self.hide();};this.winHeader.appendChild(btnClose);};if (this.options.headerButtons.indexOf('M')>=0) {var btnMin = document.createElement('DIV');btnMin.className = 'btn_mini';btnMin.setAttribute('title', this.options.msgMinimize);btnMin.onmousedown =function (e) {(e||event).cancelBubble=true;};btnMin.onclick = function(e) {this.className = this.className == 'btn_mini' ? 'btn_maxi' : 'btn_mini';(e||event).cancelBubble=true;self.minimize();};this.winHeader.appendChild(btnMin);};if (this.options.headerButtons.indexOf('C')>=0) {var btnClear = document.createElement('DIV');btnClear.className = 'btn_clear';btnClear.setAttribute('title', this.options.msgClear);btnClear.onmousedown =function (e) {(e||event).cancelBubble=true;};btnClear.onclick = function(e) {(e||event).cancelBubble=true;self.activeCon.value = "";self.hide();};this.winHeader.appendChild(btnClear);};if (this.options.headerButtons.indexOf('T')>=0) {var btnToday = document.createElement('DIV');btnToday.className = 'btn_today';btnToday.setAttribute('title', this.options.msgToday);btnToday.onmousedown =function (e) {(e||event).cancelBubble=true;};btnToday.onclick = function(e) {(e||event).cancelBubble=true;self.setDate(new Date());};this.winHeader.appendChild(btnToday);}},


 drawMonth:function(){var self = this;if (this.monthPan.hasChildNodes())
 this.monthPan.removeChild(this.monthPan.firstChild);var row = this.monthPan.insertRow(0);var cArLeft = row.insertCell(0);var cContent = row.insertCell(1);var cArRight = row.insertCell(2);cArLeft.align = "left";cArLeft.className = 'month_btn_left';var btnLabel = document.createElement("div");btnLabel.innerHTML = " ";cArLeft.appendChild(btnLabel);cArLeft.onclick = function(){self.prevMonth() };cArLeft.onselectstart = function () {return false};cArRight.align = "right";cArRight.className = 'month_btn_right';var btnLabel = document.createElement("div");btnLabel.innerHTML = " ";cArRight.appendChild(btnLabel);cArRight.onclick = function(){self.nextMonth() };cArRight.onselectstart = function () {return false};cContent.align = 'center';var mHeader = document.createElement("TABLE");with (mHeader) {cellPadding = "0px";cellSpacing = "0px";align = "center";};var mRow = mHeader.insertRow(0);var cMonth = mRow.insertCell(0);var cComma = mRow.insertCell(1);var cYear = mRow.insertCell(2);cContent.appendChild(mHeader);var date = this.date[0];this.planeMonth = document.createElement('DIV');this.planeMonth._c = this;this.planeMonth.appendChild(document.createTextNode(this.options.monthesFNames[date.getMonth()]));this.planeMonth.className = 'planeMonth';cMonth.appendChild(this.planeMonth);if (this.options.isMonthEditable){this.planeMonth.style.cursor = 'pointer';this.editorMonth = new dhtmlxRichSelector({nodeBefore: this.planeMonth,
 valueList: [0,1,2,3,4,5,6,7,8,9,10,11],
 titleList: this.options.monthesFNames,
 activeValue: this.options.monthesFNames[date.getMonth()],
 onSelect: this.onMonthSelect,
 isAllowUserValue: false
 });this.editorMonth._c = this;};cComma.appendChild(document.createTextNode(","));cComma.className = 'comma';this.planeYear = document.createElement('DIV');this.planeYear._c = this;this.planeYear.appendChild(document.createTextNode(date.getFullYear()));this.planeYear.className = 'planeYear';cYear.appendChild(this.planeYear);if (this.options.isYearEditable){this.planeYear.style.cursor = 'pointer';this.editorYear = new dhtmlxRichSelector({nodeBefore: this.planeYear,
 valueList: this.allYears,
 titleList: this.allYears,
 activeValue: date.getFullYear(),
 onSelect: this.onYearSelect,
 isOrderedList: true,
 isNumbersList: true,
 isAllowUserValue: true
 });this.editorYear._c = this;}},


 drawDayLabels:function() {var self = this;if(!this.dlabelPan.hasChildNodes())
 {var row = this.dlabelPan.insertRow(-1);row.className = "daynames";for(var i=0;i<7;i++){(this.weekCells [i] = row.insertCell(i)).appendChild(document.createTextNode(this.getDayName(i)))
 }}else
 {for(var i=0;i<7;i++)this.weekCells[i].childNodes [0].nodeValue = this.getDayName(i);}},


 drawDays:function() {var self = this;var row = {}, cell;if(!this.daysPan.hasChildNodes())
 {for (var weekNumber=0;weekNumber<6;weekNumber++){row = this.daysPan.insertRow(-1);this.daysCells [weekNumber] = {};for (var i=0;i<7;i++){(this.daysCells [weekNumber] [i] = row.insertCell(-1)).appendChild(document.createTextNode(""));}}};var date = this.date[0], tempDate = new Date(date);var selectedDate = this.selDate[this.activeConInd].toDateString();tempDate.setDate(1);var day1 = (tempDate.getDay() - this.options.weekstart) % 7;if (day1 <= 0)day1 += 7;tempDate.setDate(- day1);tempDate.setDate(tempDate.getDate() + 1);if (tempDate.getDate()< tempDate.getDay())
 tempDate.setMonth(tempDate.getMonth() - 1);var curDay = null;for (var weekNumber=0;weekNumber<6;weekNumber++){for (var i=0;i<7;i++){if (curDay == tempDate.getDate())
 tempDate.setDate(tempDate.getDate() + 1);curDay = tempDate.getDate();cell = this.daysCells [weekNumber] [i];cell.setAttribute('id', this.uid+tempDate.getFullYear()+tempDate.getMonth()+tempDate.getDate());cell.childNodes [0].nodeValue = tempDate.getDate();cell.thisdate = tempDate.toString();cell.className = "thismonth";cell.onclick = null;if(tempDate.getMonth()!=date.getMonth())
 cell.className = "othermonth";if (this.insensitiveDates){var c = false;for (var j=0;j<this.insensitiveDates.length;j++){var s = /\.|\-/.exec(this.insensitiveDates[j])
 if (s)var f = (this.insensitiveDates[j].split (s).length == 2 ? '%m'+s+'%d' : '%Y'+s+'%m'+s+'%d');if (s && this.getFormatedDate(f, tempDate)== this.insensitiveDates[j] || tempDate.getDay () == this.insensitiveDates[j]) {this.addClass(cell, "insensitive");tempDate.setDate(tempDate.getDate() + 1);c = true;break;}};if (c)continue;};if (this.sensitiveFrom && this.sensitiveFrom instanceof Array){var c = true;for (var j=0;j<this.sensitiveFrom.length;j++){var s = /\.|\-/.exec(this.sensitiveFrom[j]);var f = (this.sensitiveFrom[j].split (s).length == 2 ? '%m'+s+'%d' : '%Y'+s+'%m'+s+'%d');if (this.getFormatedDate(f, tempDate)== this.sensitiveFrom[j])
 c = false;};if (c){this.addClass(cell, "insensitive");tempDate.setDate(tempDate.getDate() + 1);continue;}};if ((this.sensitiveFrom && (tempDate.valueOf()< this.sensitiveFrom.valueOf()))
 || (this.sensitiveTo && (tempDate.valueOf() > this.sensitiveTo.valueOf()))) {this.addClass(cell, "insensitive");tempDate.setDate(tempDate.getDate() + 1);continue;};if (this.isWeekend(i)&& tempDate.getMonth()==date.getMonth())
 cell.className = "weekend";if (tempDate.toDateString()== this.curDate.toDateString())
 this.addClass(cell, "current");if (tempDate.toDateString()== selectedDate) {this.activeCell = cell;this.addClass(cell, "selected");};if (this.holidays)for (var j=0;j<this.holidays.length;j++){var s = /\.|\-/.exec(this.holidays[j]);var f = (this.holidays[j].split (s).length == 2 ? '%m'+s+'%d' : '%Y'+s+'%m'+s+'%d');if (this.getFormatedDate(f, tempDate)== this.holidays[j])
 this.addClass(cell, "holiday");};cell.onclick = function(){var date = new Date(this.thisdate);self.setDate (date);if(!self.doOnClick || self.doOnClick(date)){self.callEvent("onClick", [date]);}};tempDate.setDate(tempDate.getDate() + 1);}}},


 draw:function(){if (!this.parent)this.createStructure();var self = this;if (this.loadingLanguage){setTimeout(function() {self.draw();return;}, 20);return;};this.drawHeader();this.drawMonth();this.drawDayLabels();this.drawDays();this.isAutoDraw = true;},


 loadUserLanguage:function(language, userCBfunction){if (userCBfunction)this.onLanguageLoaded = userCBfunction;if (!language){language="en-us";};this.loadingLanguage = language;if (!language){this.loadUserLanguageCallback(false);return;};if (language == this.options.langname){this.loadUserLanguageCallback(true);return;};var __lm = window.dhtmlxCalendarLangModules;if (__lm[language]){for (lg in __lm[language])this.options[lg] = __lm[language][lg];this.loadUserLanguageCallback(true);return;};var src, path = null;var scripts = document.getElementsByTagName('SCRIPT');for (var i=0;i<scripts.length;i++)if(src = scripts[i].getAttribute('src'))
 if (src.indexOf(this.scriptName)>= 0) {path = src.substr(0, src.indexOf(this.scriptName));break;};if (path === null){this.loadUserLanguageCallback(false);return;};this.options.langname = language;var langPath = path + 'lang/' + language + '.js';for (var i=0;i<scripts.length;i++)if(src = scripts[i].getAttribute('src'))
 if (src == langPath)return;var script = document.createElement('SCRIPT');script.setAttribute('language', "Java-Script");script.setAttribute('type', "text/javascript");script.setAttribute('src', langPath);document.body.appendChild(script);},

 loadUserLanguageCallback:function(status) {this.loadingLanguage = null;if (this.isAutoDraw)this.draw();if (this.onLanguageLoaded && (typeof(this.onLanguageLoaded)== 'function'))
 this.onLanguageLoaded(status);},

 loadLanguageModule:function(langModule) {var __c = window.dhtmlxCalendarObjects;for (var i=0;i<__c.length;i++){if (__c[i].loadingLanguage == langModule.langname){for (lg in langModule)__c[i].options[lg] = langModule[lg];__c[i].loadUserLanguageCallback(true);}};window.dhtmlxCalendarLangModules[langModule.langname] = langModule;},



 show:function(conId){this.activeCon = this.con[this._activeConInd(conId)];this.parent.style.display = '';this.parent.style.visibility = 'hidden';if (this.activeCon.nodeName == 'INPUT' && !this.userPosition){if( typeof window.innerWidth == 'number' ){docWidth = window.innerWidth;docHeight = window.innerHeight;}else {docWidth = document.body.offsetWidth;docHeight = document.body.offsetHeight;};var aLeft = getAbsoluteLeft( this.activeCon);var aTop = getAbsoluteTop( this.activeCon);if (aTop + this.parent.offsetHeight > docHeight && this.parent.offsetHeight < aTop)this.parent.style.top = aTop - this.parent.offsetHeight + this.activeCon.offsetHeight + 'px';else
 this.parent.style.top = aTop + 'px';if (aLeft + this.parent.offsetWidth + this.activeCon.offsetWidth > docWidth)this.parent.style.left = aLeft + 'px';else
 this.parent.style.left = aLeft + this.activeCon.offsetWidth + 'px';};if (this.ifr != undefined){this.ifr.style.top = this.entObj.offsetTop + 'px';this.ifr.style.left = this.entObj.offsetLeft + 'px';this.ifr.style.display = 'block';};if (this.time && !this.minimized){this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 147);this.tp.show ();};this.parent.style.visibility = 'visible';return this;},


 hide:function(){this.parent.style.display = 'none';if(this.ifr!=undefined)this.ifr.style.display = 'none';if (this.time)this.tp.hide();return this;},


 setDateFormat:function(format){this.options.dateformat = format;},




 cutTime:function(date) {date = new Date(date);var ndate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 1);return ndate;},



 setParent:function(newParent){if (newParent){this.parent = newParent;this.parent.appendChild(this.entObj);}},

 setDate:function(date, conId){tmpDate = date;conId = this._activeConInd (conId);this.activeCon = this.con [conId];if (typeof date != "Object"){date = this.setFormatedDate(null ,tmpDate);};if (isNaN(date)|| !date) {date = new Date;};this.date[conId] = new Date(this.cutTime(date));this.selDate[conId] = new Date(this.cutTime(date));if (this.isAutoDraw){this.draw();};if (this.activeCon.nodeName == 'INPUT'){this.activeCon.value = !tmpDate ? '' : this.getFormatedDate(this.options.dateformat, date);}},

 addClass:function(obj, styleName) {obj.className += ' ' + styleName;},


 resetClass:function(obj) {obj.className = obj.className.toString().split(' ')[0];},

 resetHotClass:function(obj) {obj.className = obj.className.toString().replace(/hover/, '');},


 setSkin:function(newSkin) {this.skinName = newSkin;var mode = "";mode = (this.minimized
 ? "_mini"
 : (this.time
 ? "_long"
 : (this.options.isWinHeader
 ? "_maxi"
 : ""
 )
 )
 );this.entObj.className = this.style + (newSkin ? '_' + newSkin : '');if (mode)this.entObj.className += " " + this.entObj.className + mode;if(this.ifr!=undefined){this.ifr.className = this.style + (newSkin ? '_' + newSkin : '') + mode + "_ifr";};if (this.time)(this.isVisible () && !this.minimized) ? this.tp.show () : this.tp.hide ();},


 getDate:function(conId)
 {return this.selDate[this._activeConInd(conId)].toString();},



 nextMonth:function(){var date = this.date[0], month;date.setDate(1);date.setMonth(month = date.getMonth() + 1);this.callEvent ("onChangeMonth",[(month+1 > 12 ? 1 : month+1), month || 12]);if (this.isAutoDraw)this.draw();},


 prevMonth:function(){var date = this.date[0], month;date.setDate(1);date.setMonth(month = date.getMonth()-1);this.callEvent ("onChangeMonth",[month+1 || 12,month+2 > 12 ? 1 : (month+2 || 12)]);if (this.isAutoDraw)this.draw();},

 setOnClickHandler:function(func){this.attachEvent("onClick",func);},



 getFormatedDate:function (dateformat, date, conInd) {if(!dateformat)dateformat = this.options.dateformat
 if(!date)date = this.selDate[this._activeConInd(conInd)];date = new Date(date);var out = '';var plain = true;for (var i=0;i<dateformat.length;i++){var replStr = dateformat.substr(i, 1);if (plain){if (replStr == '%'){plain = false;continue;};out += replStr;}else {switch (replStr) {case 'e':
 replStr = date.getDate();break;case 'd':
 replStr = date.getDate();if (replStr.toString().length == 1)
 replStr='0'+replStr;break;case 'j':
 var x = new Date(date.getFullYear(), 0, 0, 0, 0, 0, 0);replStr = Math.ceil((date.valueOf() - x.valueOf())/1000/60/60/24 - 1);while (replStr.toString().length < 3)
 replStr = '0' + replStr;break;case 'a':
 replStr = this.options.daysSNames[date.getDay()];break;case 'W':
 replStr = this.options.daysFNames[date.getDay()];break;case 'c':
 replStr = 1 + date.getMonth();break;case 'm':
 replStr = 1 + date.getMonth();if (replStr.toString().length == 1)
 replStr = '0' + replStr;break;case 'b':
 replStr = this.options.monthesSNames[date.getMonth()];break;case 'M':
 replStr = this.options.monthesFNames[date.getMonth()];break;case 'y':
 replStr = date.getFullYear();replStr = replStr.toString().substr(2);break;case 'Y':
 replStr = date.getFullYear();break;case 'H':
 case 'h':
 case 'i':
 case 's':
 case 'f':
 if (this.time){replStr = this.tp.getFormatedTime('%'+replStr, arguments[2]);};break;};out += replStr;plain = true;}};return out;},




 setFormatedDate: function(dateformatarg, date, conInd, skip){if (!date || !(typeof date == 'string')) return date;if (date == '0000-00-00'){this.setDate (new Date, conInd);return new Date;};if(!dateformatarg)dateformatarg = this.options.dateformat;if (this.time){this.tp.setFormatedTime(dateformatarg, date);};function parseMonth(val){var tmpAr = new Array(this.options.monthesSNames,this.options.monthesFNames);for(var j=0;j<tmpAr.length;j++){for (var i=0;i<tmpAr[j].length;i++)if (tmpAr[j][i].indexOf(val)== 0)
 return i;};return -1;};var outputDate = new Date(2008, 0, 1);var j=0;for(var i=0;i<dateformatarg.length;i++){var _char = dateformatarg.charAt(i);if(_char=="%"){var _cd = dateformatarg.charAt(i+1);var _nextpc = dateformatarg.indexOf("%",i+1);var _nextDelim = dateformatarg.substr(i+2,_nextpc-i-1-1);var _nDelimInDatePos = date.indexOf(_nextDelim,j);if(_nextDelim=="")_nDelimInDatePos = date.length
 if(_nDelimInDatePos==-1)return null;var value = date.substr(j, _nDelimInDatePos-j);if (_cd != 'M' && _cd != 'b')value = parseFloat(value);j=_nDelimInDatePos+_nextDelim.length
 switch (_cd) {case 'd':
 case 'e':
 outputDate.setDate(parseFloat(value));break;case "c":
 case "m":
 outputDate.setMonth(parseFloat(value) - 1);break;case "M":
 var val = parseMonth.call(this,value);if(val!=-1)outputDate.setMonth(parseFloat(val));else
 return null;break;case "b":
 var val = parseMonth.call(this,value);if(val!=-1)outputDate.setMonth(parseFloat(val));else
 return null;break;case 'Y':
 outputDate.setFullYear(parseFloat(value));break;case 'y':
 var year=parseFloat(value);outputDate.setFullYear(((year>20)?1900:2000) + year);break;}}};if (isNaN(outputDate))
 outputDate = new Date(this.selDate[this._activeConInd]);if (skip)return outputDate;this.setDate (outputDate, conInd);return this.selDate[this.activeConInd];},


 isWeekend:function(k){var q = k + this.options.weekstart;if (q > 6)q -= 7;for (var i=0;i<this.options.weekend.length;i++)if (this.options.weekend[i] == q)return true;return false;},


 getDayName:function(k){var q = k + this.options.weekstart;if (q > 6)q = q - 7;return this.options.daysSNames[q];},


 isVisible: function(){return this.parent.style.display != 'none';},
 doHotKeys:function(e){e = e||event;var cell = e.target || e.srcElement;if (cell.className.toString().indexOf('insensitive') >=0 ) {this.endHotKeys();}else {if (this.hotCell)this.resetHotClass(this.hotCell);this.addClass(cell, 'hover');this.hotCell = cell;}},

 endHotKeys:function(){if (this.hotCell){this.resetHotClass(this.hotCell);this.hotCell = null;}},
 _activeConInd:function(ind){if (!this.parent)this.createStructure();return (this.activeConInd = (this.conInd[ind]==0?'0':this.conInd[ind]) || (ind==0?'0':ind) || this.conInd[this.activeCon.id] || 0);}};function dhtmlxRichSelector(parametres) {for (x in parametres)this[x] = parametres[x];this.initValue = this.activeValue;if (!this.selectorSize)this.selectorSize = 7;var self = this;this.blurTimer = null;this.nodeBefore.onclick = function() {self.show();};this.editor = document.createElement('TEXTAREA');this.editor.value = this.activeValue;this.editor._s = this;this.editor.className = 'dhtmlxRichSelector';this.editor.onfocus = this.onFocus;this.editor.onblur = this.onBlur;this.selector = document.createElement('SELECT');this.selector.size = this.selectorSize;this.selector.className = 'dhtmlxRichSelector';if (this.valueList)for (var i = 0;i < this.valueList.length;i++)this.selector.options[i] = new Option(this.titleList[i], this.valueList[i], false, false);this.selector._s = this;this.selector.onfocus = this.onFocus;this.selector.onblur = this.onBlur;this.selector.onclick = function () {window.t = self;self.onSelect(self.selector.value);clearTimeout(self.blurTimer);};this.selector.getIndexByValue = function (Value, isFull) {var Select = this;Value = Value.toString().toUpperCase();if (!isFull)isFull=false;for (var i=0;i<Select.length;i++){var i_value = Select[i].text.toUpperCase();if (isFull){if(i_value == Value)return i;}else {if (i_value.indexOf(Value)== 0) return i;}};if (Select._s.isOrderedList){if (Select._s.isNumbersList)if (isNaN(Value)) return -1;i_value = Select[0].text.substring(0, Value.length).toUpperCase();if (i_value > Value)return 0;i_value = Select[Select.length-1].text.substring(0, Value.length);if (i_value < Value)return Select.length-1;};return -1;};this.con = document.createElement('DIV')
 this.con.className = 'dhtmlxRichSelector';with (this.con.style) {width = 'auto';display = 'none';};this.con.appendChild(this.editor);this.con.appendChild(this.selector);this.nodeBefore.parentNode.insertBefore(this.con, this.nodeBefore);return this;};dhtmlxRichSelector.prototype.show = function() {this.con.style.display = 'block';with (this.selector.style) {marginTop = parseInt(this.nodeBefore.offsetHeight)+'px';width = 'auto';};with (this.editor.style) {width = parseInt(this.nodeBefore.offsetWidth)+15+'px';height = parseInt(this.nodeBefore.offsetHeight)+'px';};this.selector.selectedIndex = this.selector.getIndexByValue(this.activeValue);this.editor.focus();};dhtmlxRichSelector.prototype.hide = function() {this.con.style.display = 'none';};dhtmlxRichSelector.prototype.onBlur = function() {var self = this._s;self.blurTimer = setTimeout(function(){if (self.isAllowUserValue){if (self.onSelect(self.editor.value))
 self.activeValue = self.editor.value;}else {if (self.onSelect(self.selector.value))
 self.activeValue = self.selector.value;}}, 10);};dhtmlxRichSelector.prototype.onFocus = function() {var self = this._s;if(self.blurTimer){clearTimeout(self.blurTimer);self.blurTimer = null;};if (this === this._s.selector)self.editor.focus();};dhtmlxCalendarObject.prototype.setHeader = function(isVisible, isDrag, btnsOpt){with (this.options) {isWinHeader = isVisible;isWinDrag = isDrag;if (btnsOpt)headerButtons = btnsOpt;};this.setSkin (this.skinName);};dhtmlxCalendarObject.prototype.setYearsRange = function(minYear, maxYear){this.options.yearsRange = [parseInt(minYear), parseInt(maxYear)];this.allYears = [];for (var i=minYear;i <= maxYear;i++)this.allYears.push(i);};dhtmlxCalendarObject.prototype.startDrag = function(e) {e = e||event;if ((e.button === 0)|| (e.button === 1)) {if (this.dragging){this.stopDrag(e);};this.drag_mx = e.clientX;this.drag_my = e.clientY;this.drag_spos = this.getPosition(this.parent);document.body.appendChild(this.parent);with (this.parent.style) {left = this.drag_spos[0] + 'px';top = this.drag_spos[1] + 'px';margin = '0px';position = 'absolute';};if (this.ifr){this.ifr.style.top = '0px';this.ifr.style.left = '0px';};this.bu_onmousemove = document.body.onmousemove;var self = this;document.body.onmousemove = function (e) {self.onDrag(e);};this.bu_onmouseup = document.body.onmouseup;document.body.onmouseup = function (e) {self.stopDrag(e);};this.dragging = true;}};dhtmlxCalendarObject.prototype.onDrag = function(e) {e = e||event;if ((e.button === 0)|| (e.button === 1)) {var delta_x = this.drag_mx - e.clientX;var delta_y = this.drag_my - e.clientY;this.parent.style.left = this.drag_spos[0] - delta_x + 'px';this.parent.style.top = this.drag_spos[1] - delta_y + 'px';if (this.time){this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 160);};if(this.ifr != undefined){this.ifr.style.left = 0;this.ifr.style.top = 0;}}else {this.stopDrag(e);}};dhtmlxCalendarObject.prototype.stopDrag = function(e) {e = e||event;document.body.onmouseup = (this.bu_onmouseup === window.undefined)? null: this.bu_onmouseup;document.body.onmousemove = (this.bu_onmousemove === window.undefined)? null: this.bu_onmousemove;this.dragging = false;};dhtmlxCalendarObject.prototype.minimize = function(){if (!this.winHeader)return;this.minimized = !this.minimized;this.entBox.style.display = (!this.minimized) ? '' : 'none';this.setSkin (this.skinName);};dhtmlxCalendarObject.prototype.onYearSelect = function(value) {if (!isNaN(value))
 {this._c.date[0].setFullYear(
 Math.min
 (
 Math.max
 (
 value,
 this._c.allYears[0]
 ),
 this._c.allYears.slice(-1)
 )
 );};this._c.draw();return (!isNaN(value));};dhtmlxCalendarObject.prototype.onMonthSelect = function(value) {this._c.date[0].setMonth(value);this._c.draw();return true;};dhtmlxCalendarObject.prototype.setPosition = function(argA,argB,argC){if(typeof(argA)=='object'){var posAr = this.getPosition(argA)
 var left = posAr[0]+argA.offsetWidth+(argC||0);var top = posAr[1]+(argB||0);};this.parent.style.position = "absolute";this.parent.style.top = (top||argA)+"px";this.parent.style.left = (left||argB)+"px";if (this.ifr != undefined){this.ifr.style.left = '0px';this.ifr.style.top = '0px';};if (this.time)this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 160);};dhtmlxCalendarObject.prototype.close = function(func){this.hide ();};dhtmlxCalendarObject.prototype.getPosition = function(oNode,pNode) {if(!pNode)var pNode = document.body
 var oCurrentNode=oNode;var iLeft=0;var iTop=0;while ((oCurrentNode)&&(oCurrentNode!=pNode)){iLeft+=oCurrentNode.offsetLeft-oCurrentNode.scrollLeft;iTop+=oCurrentNode.offsetTop-oCurrentNode.scrollTop;oCurrentNode=oCurrentNode.offsetParent;};if (pNode == document.body ){if (_isIE){if (document.documentElement.scrollTop)iTop+=document.documentElement.scrollTop;if (document.documentElement.scrollLeft)iLeft+=document.documentElement.scrollLeft;}else
 if (!_isFF){iLeft+=document.body.offsetLeft;iTop+=document.body.offsetTop;}};return new Array(iLeft,iTop);};dhtmlxCalendarObject.prototype.setSensitive = function(fromDate,toDate){if (fromDate)if (fromDate instanceof Date){this.sensitiveFrom = this.cutTime(fromDate);}else {this.sensitiveFrom = fromDate.toString ().split (',');};if (toDate)this.sensitiveTo = this.cutTime(toDate);if (this.isAutoDraw)this.draw();};dhtmlxCalendarObject.prototype.setHolidays = function(dates){this.holidays = dates.toString().split(",");if (this.isAutoDraw)this.draw();};dhtmlxCalendarObject.prototype.onChangeMonth = function (func) {this.attachEvent ("onChangeMonth",func);};dhtmlxCalendarObject.prototype.setInsensitiveDates = function (dates) {this.insensitiveDates = dates.toString().split(",");if (this.isAutoDraw)this.draw();};dhtmlxCalendarObject.prototype.enableTime = function (mode) {if (this.time = mode){this.tp = new dhtmlXTimePicker ();this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 160);for (m in dhtmlXTimePicker.prototype)(function (m) {if (!dhtmlxCalendarObject.prototype [m])dhtmlxCalendarObject.prototype [m] = function (){return this.tp[m].apply(this.tp, arguments)}})(m);}else {this.tp.entBox.parentNode.removeChild (this.tp.entBox);this.tp = null;};this.setSkin(this.skinName);};dhtmlxCalendarObject.prototype.setHeaderText = function (text) {this.options.headerText = text;if (this.headerLabel){this.headerLabel.childNodes[0].nodeValue = text;this.headerLabel.setAttribute('title', text);}};dhtmlxCalendarObject.prototype.disableIESelectFix = function (mode) {this.useIframe = !mode;if (this.ifr != undefined){this.ifr.parentNode.removeChild(this.ifr);this.ifr = null;}};
//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/


// FROM: /javascripts/sifr.js?1294660143
/*****************************************************************************
scalable Inman Flash Replacement (sIFR) version 3, revision 436.

Copyright 2006 – 2008 Mark Wubben, <http://novemberborn.net/>

Older versions:
* IFR by Shaun Inman
* sIFR 1.0 by Mike Davidson, Shaun Inman and Tomas Jogin
* sIFR 2.0 by Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben

See also <http://novemberborn.net/sifr3> and <http://wiki.novemberborn.net/sifr3>.

This software is licensed and provided under the CC-GNU LGPL.
See <http://creativecommons.org/licenses/LGPL/2.1/>
*****************************************************************************/

var sIFR = new function() {
  var self = this;

  var ClassNames  = {
    ACTIVE    : 'sIFR-active',
    REPLACED  : 'sIFR-replaced',
    IGNORE    : 'sIFR-ignore',
    ALTERNATE : 'sIFR-alternate',
    CLASS     : 'sIFR-class',
    LAYOUT    : 'sIFR-layout',
    FLASH     : 'sIFR-flash',
    FIX_FOCUS : 'sIFR-fixfocus',
    DUMMY     : 'sIFR-dummy'
  };

  ClassNames.IGNORE_CLASSES = [ClassNames.REPLACED, ClassNames.IGNORE, ClassNames.ALTERNATE];

  this.MIN_FONT_SIZE        = 6;
  this.MAX_FONT_SIZE        = 126;
  this.FLASH_PADDING_BOTTOM = 5;
  this.VERSION              = '436';

  this.isActive             = false;
  this.isEnabled            = true;
  this.fixHover             = true;
  this.autoInitialize       = true;
  this.setPrefetchCookie    = true;
  this.cookiePath           = '/';
  this.domains              = [];
  this.forceWidth           = true;
  this.fitExactly           = false;
  this.forceTextTransform   = true;
  this.useDomLoaded         = true;
  this.useStyleCheck        = false;
  this.hasFlashClassSet     = false;
  this.repaintOnResize      = true;
  this.replacements         = [];

  var elementCount          = 0; // The number of replaced elements.
  var isInitialized         = false;

  function Errors() {
    this.fire = function(id) {
      if(this[id + 'Alert']) alert(this[id + 'Alert']);
      throw new Error(this[id]);
    };

    this.isFile      = 'sIFR: Did not activate because the page is being loaded from the filesystem.';
    this.isFileAlert = 'Hi!\n\nThanks for using sIFR on your page. Unfortunately sIFR couldn\'t activate, because it was loaded '
                        + 'directly from your computer.\nDue to Flash security restrictions, you need to load sIFR through a web'
                        + ' server.\n\nWe apologize for the inconvenience.';
  };

  function Util(sIFR) {
    function capitalize($) {
      return $.toLocaleUpperCase();
    }

    this.normalize = function(str) {
      // Replace linebreaks and &nbsp; by whitespace, then normalize.
      // Flash doesn't support no-breaking space characters, hence they're replaced by a normal space.
      return str.replace(/\n|\r|\xA0/g, Util.SINGLE_WHITESPACE).replace(/\s+/g, Util.SINGLE_WHITESPACE);
    };

    this.textTransform = function(type, str) {
      switch(type) {
        case 'uppercase':
          return str.toLocaleUpperCase();
        case 'lowercase':
          return str.toLocaleLowerCase();
        case 'capitalize':
          return str.replace(/^\w|\s\w/g, capitalize);
      }
      return str;
    };

    this.toHexString = function(str) {
      if(str.charAt(0) != '#' || str.length != 4 && str.length != 7) return str;

      str = str.substring(1);
      return '0x' + (str.length == 3 ? str.replace(/(.)(.)(.)/, '$1$1$2$2$3$3') : str);
    };

    this.toJson = function(obj, strFunc) {
      var json = '';

      switch(typeof(obj)) {
        case 'string':
          json = '"' + strFunc(obj) + '"';
          break;
        case 'number':
        case 'boolean':
          json = obj.toString();
          break;
        case 'object':
          json = [];
          for(var prop in obj) {
            if(obj[prop] == Object.prototype[prop]) continue;
            json.push('"' + prop + '":' + this.toJson(obj[prop]));
          }
          json = '{' + json.join(',') + '}';
          break;
      }

      return json;
    };

    this.convertCssArg = function(arg) {
      if(!arg) return {};
      if(typeof(arg) == 'object') {
        if(arg.constructor == Array) arg = arg.join('');
        else return arg;
      }

      var obj = {};
      var rules = arg.split('}');

      for(var i = 0; i < rules.length; i++) {
        var $ = rules[i].match(/([^\s{]+)\s*\{(.+)\s*;?\s*/);
        if(!$ || $.length != 3) continue;

        if(!obj[$[1]]) obj[$[1]] = {};

        var properties = $[2].split(';');
        for(var j = 0; j < properties.length; j++) {
          var $2 = properties[j].match(/\s*([^:\s]+)\s*\:\s*([^;]+)/);
          if(!$2 || $2.length != 3) continue;
          obj[$[1]][$2[1]] = $2[2].replace(/\s+$/, '');
        }
      }

      return obj;
    };

    this.extractFromCss = function(css, selector, property, remove) {
      var value = null;

      if(css && css[selector] && css[selector][property]) {
        value = css[selector][property];
        if(remove) delete css[selector][property];
      }

      return value;
    };

    this.cssToString = function(arg) {
      var css = [];
      for(var selector in arg) {
        var rule = arg[selector];
        if(rule == Object.prototype[selector]) continue;

        css.push(selector, '{');
        for(var property in rule) {
          if(rule[property] == Object.prototype[property]) continue;
          var value = rule[property];
          if(Util.UNIT_REMOVAL_PROPERTIES[property]) value = parseInt(value, 10);
          css.push(property, ':', value, ';');
        }
        css.push('}');
      }

      return css.join('');
    };

    this.escape = function(str) {
      return escape(str).replace(/\+/g, '%2B');
    };

    this.encodeVars = function(vars) {
      return vars.join('&').replace(/%/g, '%25');
    };

    this.copyProperties = function(from, to) {
      for(var property in from) {
        if(to[property] === undefined) to[property] = from[property];
      }
      return to;
    };

    this.domain = function() {
      var domain = '';
      // When trying to access document.domain on a Google-translated page with Firebug, I got an exception.
      // Try/catch to be safe.
      try { domain = document.domain } catch(e) {};
      return domain;
    };

    this.domainMatches = function(domain, match) {
      if(match == '*' || match == domain) return true;

      var wildcard = match.lastIndexOf('*');
      if(wildcard > -1) {
        match = match.substr(wildcard + 1);
        var matchPosition = domain.lastIndexOf(match);
        if(matchPosition > -1 && (matchPosition + match.length) == domain.length) return true;
      }

      return false;
    };

    this.uriEncode = function(s) {
      return encodeURI(decodeURIComponent(s));  // Decode first, in case the URI was already encoded.
    };

    this.delay = function(ms, func, scope) {
      var args = Array.prototype.slice.call(arguments, 3);
      setTimeout(function() { func.apply(scope, args) }, ms);
    };
  };

  Util.UNIT_REMOVAL_PROPERTIES = {leading: true, 'margin-left': true, 'margin-right': true, 'text-indent': true};
  Util.SINGLE_WHITESPACE       = ' ';


  function DomUtil(sIFR) {
    var self = this;

    function getDimensionFromStyle(node, property, offsetProperty)
    {
      var dimension = self.getStyleAsInt(node, property, sIFR.ua.ie);
      if(dimension == 0) {
        dimension = node[offsetProperty];
        for(var i = 3; i < arguments.length; i++) dimension -= self.getStyleAsInt(node, arguments[i], true);
      }
      return dimension;
    }

    this.getBody = function() {
      return document.getElementsByTagName('body')[0] || null;
    };

    this.querySelectorAll = function(selector) {
      return window.parseSelector(selector);
    };

    this.addClass = function(name, node) {
      if(node) node.className = ((node.className || '') == '' ? '' : node.className + ' ') + name;
    };

    this.removeClass = function(name, node) {
      if(node) node.className = node.className.replace(new RegExp('(^|\\s)' + name + '(\\s|$)'), '').replace(/^\s+|(\s)\s+/g, '$1');
    };

    this.hasClass = function(name, node) {
      return new RegExp('(^|\\s)' + name + '(\\s|$)').test(node.className);
    };

    this.hasOneOfClassses = function(names, node) {
      for(var i = 0; i < names.length; i++) {
        if(this.hasClass(names[i], node)) return true;
      }
      return false;
    };

    this.ancestorHasClass = function(node, name) {
      node = node.parentNode;
      while(node && node.nodeType == 1) {
        if(this.hasClass(name, node)) return true;
        node = node.parentNode;
      }
      return false;
    };

    this.create = function(name, className) {
      var node = document.createElementNS ? document.createElementNS(DomUtil.XHTML_NS, name) : document.createElement(name);
      if(className) node.className = className;
      return node;
    };

    this.getComputedStyle = function(node, property) {
      var result;
      if(document.defaultView && document.defaultView.getComputedStyle) {
        var style = document.defaultView.getComputedStyle(node, null);
        result = style ? style[property] : null;
      } else {
        if(node.currentStyle) result = node.currentStyle[property];
      }
      return result || ''; // Ensuring a string.
    };

    this.getStyleAsInt = function(node, property, requirePx) {
      var value = this.getComputedStyle(node, property);
      if(requirePx && !/px$/.test(value)) return 0;
      return parseInt(value) || 0;
    };

    this.getWidthFromStyle = function(node) {
      return getDimensionFromStyle(node, 'width', 'offsetWidth', 'paddingRight', 'paddingLeft', 'borderRightWidth', 'borderLeftWidth');
    };

    this.getHeightFromStyle = function(node) {
      return getDimensionFromStyle(node, 'height', 'offsetHeight', 'paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth');
    };

    this.getDimensions = function(node) {
      var width  = node.offsetWidth;
      var height = node.offsetHeight;

      if(width == 0 || height == 0) {
        for(var i = 0; i < node.childNodes.length; i++) {
          var child = node.childNodes[i];
          if(child.nodeType != 1) continue;
          width  = Math.max(width, child.offsetWidth);
          height = Math.max(height, child.offsetHeight);
        }
      }

      return {width: width, height: height};
    };

    this.getViewport = function() {
      return {
        width:  window.innerWidth  || document.documentElement.clientWidth  || this.getBody().clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || this.getBody().clientHeight
      };
    };

    this.blurElement = function(element) {
      try {
        element.blur();
        return;
      } catch(e) {};

      // Move the focus to an input element, and then destroy it.
      var input = this.create('input');
      input.style.width  = '0px';
      input.style.height = '0px';
      element.parentNode.appendChild(input);
      input.focus();
      input.blur();
      input.parentNode.removeChild(input);
    };
  };

  DomUtil.XHTML_NS = 'http://www.w3.org/1999/xhtml';

  function UserAgentDetection(sIFR) {
    var ua              = navigator.userAgent.toLowerCase();
    var product         = (navigator.product || '').toLowerCase();
    var platform        = navigator.platform.toLowerCase();

    this.parseVersion = UserAgentDetection.parseVersion;

    this.macintosh        = /^mac/.test(platform);
    this.windows          = /^win/.test(platform);
    this.linux            = /^linux/.test(platform);
    this.quicktime        = false;

    this.opera            = /opera/.test(ua);
    this.konqueror        = /konqueror/.test(ua);
    this.ie               = false/*@cc_on || true @*/;
    this.ieSupported      = this.ie         && !/ppc|smartphone|iemobile|msie\s5\.5/.test(ua)/*@cc_on && @_jscript_version >= 5.5 @*/
    this.ieWin            = this.windows    && this.ie/*@cc_on && @_jscript_version >= 5.1 @*/;
    this.windows          = this.windows    && (!this.ie || this.ieWin);
    this.ieMac            = this.macintosh  && this.ie/*@cc_on && @_jscript_version < 5.1 @*/;
    this.macintosh        = this.macintosh  && (!this.ie || this.ieMac);
    this.safari           = /safari/.test(ua);
    this.webkit           = !this.konqueror && /applewebkit/.test(ua);
    this.khtml            = this.webkit     || this.konqueror;
    this.gecko            = !this.khtml     && product == 'gecko';

    this.ieVersion        = this.ie         && /.*msie\s(\d\.\d)/.exec(ua)           ? this.parseVersion(RegExp.$1) : '0';
    this.operaVersion     = this.opera      && /.*opera(\s|\/)(\d+\.\d+)/.exec(ua)   ? this.parseVersion(RegExp.$2) : '0';
    this.webkitVersion    = this.webkit     && /.*applewebkit\/(\d+).*/.exec(ua)     ? this.parseVersion(RegExp.$1) : '0';
    this.geckoVersion     = this.gecko      && /.*rv:\s*([^\)]+)\)\s+gecko/.exec(ua) ? this.parseVersion(RegExp.$1) : '0';
    this.konquerorVersion = this.konqueror  && /.*konqueror\/([\d\.]+).*/.exec(ua)   ? this.parseVersion(RegExp.$1) : '0';

    this.flashVersion   = 0;

    if(this.ieWin) {
      var axo;
      var stop = false;
      try {
        axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
      } catch(e) {
        // In case the Flash 7 registry key does not exist, we need to test for specific
        // Flash 6 installs before we can use the general key.
        // See also <http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/>.
        // Many thanks to Geoff Stearns and Bobby van der Sluis for clarifying the problem and providing
        // examples of non-crashing code.
        try {
          axo                   = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
          this.flashVersion     = this.parseVersion('6');
          axo.AllowScriptAccess = 'always';
        } catch(e) { stop = this.flashVersion == this.parseVersion('6'); }

        if(!stop) try { axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); } catch(e) {}
      }

      if(!stop && axo) {
        this.flashVersion = this.parseVersion((axo.GetVariable('$version') || '').replace(/^\D+(\d+)\D+(\d+)\D+(\d+).*/g, '$1.$2.$3'));
      }
    } else if(navigator.plugins && navigator.plugins['Shockwave Flash']) {
      var d = navigator.plugins['Shockwave Flash'].description.replace(/^.*\s+(\S+\s+\S+$)/, '$1');
      var v = d.replace(/^\D*(\d+\.\d+).*$/, '$1');
      if(/r/.test(d)) v += d.replace(/^.*r(\d*).*$/, '.$1');
      else if(/d/.test(d)) v += '.0';
      this.flashVersion = this.parseVersion(v);

      // Watch out for QuickTime, which could be stealing the Flash handling! Also check to make sure the plugin for the Flash
      // MIMEType is enabled.
      var foundEnabled = false;
      for(var i = 0, valid = this.flashVersion >= UserAgentDetection.MIN_FLASH_VERSION; valid && i < navigator.mimeTypes.length; i++) {
        var mime = navigator.mimeTypes[i];
        if(mime.type != 'application/x-shockwave-flash') continue;
        if(mime.enabledPlugin) {
          foundEnabled = true;
          if(mime.enabledPlugin.description.toLowerCase().indexOf('quicktime') > -1) {
            valid = false;
            this.quicktime = true;
          }
        }
      }

      if(this.quicktime || !foundEnabled) this.flashVersion = this.parseVersion('0');
    }
    this.flash = this.flashVersion >= UserAgentDetection.MIN_FLASH_VERSION;
    this.transparencySupport  = this.macintosh || this.windows
                                               || this.linux && (
                                                    this.flashVersion >= this.parseVersion('10')
                                                    && (
                                                      this.gecko && this.geckoVersion >= this.parseVersion('1.9')
                                                      || this.opera
                                                    )
                                                  );
    this.computedStyleSupport = this.ie || !!document.defaultView.getComputedStyle;
    this.fixFocus             = this.gecko  && this.windows;
    this.nativeDomLoaded      = this.gecko  || this.webkit    && this.webkitVersion  >= this.parseVersion('525')
                                            || this.konqueror && this.konquerorMajor >  this.parseVersion('03') || this.opera;
    this.mustCheckStyle       = this.khtml  || this.opera;
    this.forcePageLoad        = this.webkit && this.webkitVersion < this.parseVersion('523')
    this.properDocument       = typeof(document.location) == 'object';

    this.supported            = this.flash  && this.properDocument && (!this.ie || this.ieSupported) && this.computedStyleSupport
                                            && (!this.opera  || this.operaVersion  >= this.parseVersion('9.61'))
                                            && (!this.webkit || this.webkitVersion >= this.parseVersion('412'))
                                            && (!this.gecko  || this.geckoVersion  >= this.parseVersion('1.8.0.12'))
                                            && (!this.konqueror/* || this.konquerorVersion >= this.parseVersion('4.1')*/);
  };

  UserAgentDetection.parseVersion = function(s) {
    return s.replace(
      /(^|\D)(\d+)(?=\D|$)/g,
      function(s, nonDigit, digits) {
        s = nonDigit;
        for(var i = 4 - digits.length; i >= 0; i--) s += '0';
        return s + digits;
      }
    );
  };
  UserAgentDetection.MIN_FLASH_VERSION = UserAgentDetection.parseVersion('8');

  function FragmentIdentifier(sIFR) {
    this.fix = sIFR.ua.ieWin && window.location.hash != '';

    var cachedTitle;
    this.cache = function() {
      cachedTitle = document.title;
    };

    function doFix() {
      document.title = cachedTitle;
    }

    this.restore = function() {
      if(this.fix) setTimeout(doFix, 0);
    };
  };
  function PageLoad(sIFR) {
    var dummy = null;

    function pollLoad() {
      try {
        // IE hack courtesy of Diego Perini – <http://javascript.nwbox.com/IEContentLoaded/>.
        // Merged polling taken from jQuery – <http://dev.jquery.com/browser/trunk/jquery/src/event.js>
        if(sIFR.ua.ie || document.readyState != 'loaded' && document.readyState != 'complete') {
          document.documentElement.doScroll('left');
        }
      } catch(e) {
        return setTimeout(pollLoad, 10);
      }
      afterDomLoad();
    };

    function afterDomLoad() {
      if(sIFR.useStyleCheck) checkStyle();
      else if(!sIFR.ua.mustCheckStyle) fire(null, true);
    };

    function checkStyle() {
      dummy = sIFR.dom.create("div", ClassNames.DUMMY);
      sIFR.dom.getBody().appendChild(dummy);
      pollStyle();
    };

    function pollStyle() {
      if(sIFR.dom.getComputedStyle(dummy, 'marginLeft') == '42px') afterStyle();
      else setTimeout(pollStyle, 10);
    };

    function afterStyle() {
      if(dummy && dummy.parentNode) dummy.parentNode.removeChild(dummy);
      dummy = null;
      fire(null, true);
    };

    function fire(evt, preserveReplacements) {
      sIFR.initialize(preserveReplacements);

      // Remove handlers to prevent memory leak in Firefox 1.5, but only after onload.
      if(evt && evt.type == 'load') {
        if(document.removeEventListener) document.removeEventListener('DOMContentLoaded', fire, false);
        if(window.removeEventListener) window.removeEventListener('load', fire, false);
      }
    };

    // Unload detection based on the research from Moxiecode. <http://blog.moxiecode.com/2008/04/08/unload-event-never-fires-in-ie/>
    function verifyUnload() {
      sIFR.prepareClearReferences();
      if(document.readyState == 'interactive') {
        document.attachEvent('onstop', unloadByStop);
        setTimeout(function() { document.detachEvent('onstop', unloadByStop) }, 0);
      }
    };

    function unloadByStop() {
      document.detachEvent('onstop', unloadByStop);
      fireUnload();
    };

    function fireUnload() {
      sIFR.clearReferences();
    };

    this.attach = function() {
      if(window.addEventListener) window.addEventListener('load', fire, false);
      else window.attachEvent('onload', fire);

      if(!sIFR.useDomLoaded || sIFR.ua.forcePageLoad || sIFR.ua.ie && window.top != window) return;

      if(sIFR.ua.nativeDomLoaded) {
        document.addEventListener('DOMContentLoaded', afterDomLoad, false);
      } else if(sIFR.ua.ie || sIFR.ua.khtml) {
        pollLoad();
      }
    };

    this.attachUnload = function() {
      if(!sIFR.ua.ie) return;
      window.attachEvent('onbeforeunload', verifyUnload);
      window.attachEvent('onunload', fireUnload);
    }
  };

  var PREFETCH_COOKIE = 'sifrFetch';

  function Prefetch(sIFR) {
    var hasPrefetched = false;

    this.fetchMovies = function(movies) {
      if(sIFR.setPrefetchCookie && new RegExp(';?' + PREFETCH_COOKIE + '=true;?').test(document.cookie)) return;

      try { // We don't know which DOM actions the user agent will allow
        hasPrefetched = true;
        prefetch(movies);
      } catch(e) {}

      if(sIFR.setPrefetchCookie) document.cookie = PREFETCH_COOKIE + '=true;path=' + sIFR.cookiePath;
    };

    this.clear = function() {
      if(!hasPrefetched) return;

      try {
        var nodes = document.getElementsByTagName('script');
        for(var i = nodes.length - 1; i >= 0; i--) {
          var node = nodes[i];
          if(node.type == 'sifr/prefetch') node.parentNode.removeChild(node);
        }
      } catch(e) {}
    };

    function prefetch(args) {
      for(var i = 0; i < args.length; i++) {
        document.write('<scr' + 'ipt defer type="sifr/prefetch" src="' + args[i].src + '"></' + 'script>');
      }
    }
  };

  function BrokenFlashIE(sIFR) {
    var active      = sIFR.ua.ie;
    var fixFlash    = active && sIFR.ua.flashVersion < sIFR.ua.parseVersion('9.0.115');
    var resetMovies = {};
    var registry    = {};

    this.fixFlash = fixFlash;

    this.register = function(flashNode) {
      if(!active) return;

      var id = flashNode.getAttribute('id');
      // Try cleaning up previous Flash <object>
      this.cleanup(id, false);

      registry[id] = flashNode;
      delete resetMovies[id];

      if(fixFlash) window[id] = flashNode;
    };

    this.reset = function() {
      if(!active) return false;

      for(var i = 0; i < sIFR.replacements.length; i++) {
        var flash = sIFR.replacements[i];
        var flashNode = registry[flash.id];
        if(!resetMovies[flash.id] && (!flashNode.parentNode || flashNode.parentNode.nodeType == 11)) {
          flash.resetMovie();
          resetMovies[flash.id] = true;
        }
      }

      return true;
    };

    this.cleanup = function(id, usePlaceholder) {
      var node = registry[id];
      if(!node) return;

      for(var expando in node) {
        if(typeof(node[expando]) == 'function') node[expando] = null;
      }
      registry[id] = null;
      if(fixFlash) window[id] = null;

      if(node.parentNode) {
        if(usePlaceholder && node.parentNode.nodeType == 1) {
          // Replace the Flash node by a placeholde element with the same dimensions. This stops the page from collapsing
          // when the Flash movies are removed.
          var placeholder          = document.createElement('div');
          placeholder.style.width  = node.offsetWidth  + 'px';
          placeholder.style.height = node.offsetHeight + 'px';
          node.parentNode.replaceChild(placeholder, node);
        } else {
          node.parentNode.removeChild(node);
        }
      }
    };

    this.prepareClearReferences = function() {
      if(!fixFlash) return;

      // Disable Flash cleanup, see <http://blog.deconcept.com/2006/05/18/flash-player-bug-streaming-content-innerhtml-ie/>
      // for more info.
      __flash_unloadHandler      = function(){};
      __flash_savedUnloadHandler = function(){};
    };

    this.clearReferences = function() {
      // Since we've disabled Flash' own cleanup, add all objects on the page to our registry so they can be cleaned up.
      if(fixFlash) {
        var objects = document.getElementsByTagName('object');
        for(var i = objects.length - 1; i >= 0; i--) registry[objects[i].getAttribute('id')] = objects[i];
      }

      for(var id in registry) {
        if(Object.prototype[id] != registry[id]) this.cleanup(id, true);
      }
    };
  }

  function FlashInteractor(sIFR, id, vars, forceWidth, events) {
    this.sIFR         = sIFR;
    this.id           = id;
    this.vars         = vars;
    // Type of value depends on SWF builder. This could use some improvement!
    this.movie        = null;

    this.__forceWidth = forceWidth;
    this.__events     = events;
    this.__resizing   = 0;
  }

  FlashInteractor.prototype = {
    getFlashElement: function() {
      return document.getElementById(this.id);
    },

    getAlternate: function() {
      return document.getElementById(this.id + '_alternate');
    },

    getAncestor: function() {
      var ancestor = this.getFlashElement().parentNode;
      return !this.sIFR.dom.hasClass(ClassNames.FIX_FOCUS, ancestor) ? ancestor : ancestor.parentNode;
    },

    available: function() {
      var flashNode = this.getFlashElement();
      return flashNode && flashNode.parentNode;
    },

    call: function(type) {
      var flashNode = this.getFlashElement();

      if (!flashNode[type]) {
        return false;
      }
      // In Firefox 2, exposed Flash methods aren't proper functions, there's no `apply()` method! This workaround
      // does work, though.
      return Function.prototype.apply.call(flashNode[type], flashNode, Array.prototype.slice.call(arguments, 1));
    },

    attempt: function() {
      if(!this.available()) return false;

      try {
        this.call.apply(this, arguments);
      } catch(e) {
        if(this.sIFR.debug) throw e;
        return false;
      }

      return true;
    },

    updateVars: function(name, value) {
      for(var i = 0; i < this.vars.length; i++) {
        if (this.vars[i].split('=')[0] == name) {
          this.vars[i] = name + '=' + value;
          break;
        }
      }

      var vars = this.sIFR.util.encodeVars(this.vars);
      this.movie.injectVars(this.getFlashElement(), vars);
      this.movie.injectVars(this.movie.html, vars);
    },

    storeSize: function(type, value) {
      this.movie.setSize(type, value);
      this.updateVars(type, value);
    },

    fireEvent: function(name) {
      if(this.available() && this.__events[name]) this.sIFR.util.delay(0, this.__events[name], this, this);
    },

    resizeFlashElement: function(height, width, firstResize) {
      if(!this.available()) return;

      this.__resizing++;

      var flashNode = this.getFlashElement();
      flashNode.setAttribute('height', height);

      // Reset element height as declared by `MovieCreator`
      this.getAncestor().style.minHeight = '';

      this.updateVars('renderheight', height);
      this.storeSize('height', height);
      if(width !== null) {
        flashNode.setAttribute('width', width);
        // Don't store the size, it may cause Flash to wrap the text when the movie is reset.
        this.movie.setSize('width', width);
      }
      if(this.__events.onReplacement) {
        this.sIFR.util.delay(0, this.__events.onReplacement, this, this);
        delete this.__events.onReplacement;
      }

      if(firstResize) {
        this.sIFR.util.delay(0, function() {
          this.attempt('scaleMovie');
          this.__resizing--;
        }, this);
      } else {
        this.__resizing--;
      }
    },

    blurFlashElement: function() {
      if(this.available()) this.sIFR.dom.blurElement(this.getFlashElement());
    },

    resetMovie: function() {
      this.sIFR.util.delay(0, this.movie.reset, this.movie, this.getFlashElement(), this.getAlternate());
    },

    resizeAfterScale: function() {
      if(this.available() && this.__resizing == 0) this.sIFR.util.delay(0, this.resize, this);
    },

    resize: function() {
      if(!this.available()) return;

      this.__resizing++;

      var flashNode      = this.getFlashElement();
      var currentWidth   = flashNode.offsetWidth;

      // The Flash movie has no dimensions, which means it's not visible anyway. No need to recalculate.
      if(currentWidth == 0) return;

      var originalWidth  = flashNode.getAttribute('width');
      var originalHeight = flashNode.getAttribute('height');

      var ancestor       = this.getAncestor();
      var minHeight      = this.sIFR.dom.getHeightFromStyle(ancestor);

      // Remove Flash movie from flow
      flashNode.style.width  = '1px';
      flashNode.style.height = '1px';

      // Set a minimal height on the flashNode's parent, to stop a reflow
      ancestor.style.minHeight = minHeight + 'px';

      // Restore original content
      var nodes = this.getAlternate().childNodes;
      var clones = [];
      for(var i = 0; i < nodes.length; i++) {
        var node = nodes[i].cloneNode(true);
        clones.push(node);
        ancestor.appendChild(node);
      }

      // Calculate width
      var width = this.sIFR.dom.getWidthFromStyle(ancestor);

      // Remove original content again
      for(var i = 0; i < clones.length; i++) ancestor.removeChild(clones[i]);

      // Reset Flash movie flow
      flashNode.style.width = flashNode.style.height = ancestor.style.minHeight = '';
      flashNode.setAttribute('width', this.__forceWidth ? width : originalWidth);
      flashNode.setAttribute('height', originalHeight);

      // IE can get mightily confused about where to draw the Flash <object>. This is a workaround to force IE to repaint
      // the <object>.
      if(sIFR.ua.ie) {
        flashNode.style.display = 'none';
        var repaint = flashNode.offsetHeight;
        flashNode.style.display = '';
      }

      // Resize!
      if(width != currentWidth) {
        if(this.__forceWidth) this.storeSize('width', width);
        this.attempt('resize', width);
      }

      this.__resizing--;
    },

    // `content` must not be util.escaped when passed in.
    // alternate may be an array of nodes to be appended to the alternate content, use this
    // in XHTML documents.
    replaceText: function(content, alternate) {
      var escapedContent = this.sIFR.util.escape(content);
      if(!this.attempt('replaceText', escapedContent)) return false;

      this.updateVars('content', escapedContent);
      var node = this.getAlternate();
      if(alternate) {
        while(node.firstChild) node.removeChild(node.firstChild);
        for(var i = 0; i < alternate.length; i++) node.appendChild(alternate[i]);
      } else {
        try { node.innerHTML = content; } catch(e) {};
      }

      return true;
    },

    changeCSS: function(css) {
      css = this.sIFR.util.escape(this.sIFR.util.cssToString(this.sIFR.util.convertCssArg(css)));
      this.updateVars('css', css);
      return this.attempt('changeCSS', css);
    },

    remove: function() {
      if(this.movie && this.available()) this.movie.remove(this.getFlashElement(), this.id);
    }
  };

  var MovieCreator = new function() {
    this.create = function(sIFR, brokenFlash, node, fixFocus, id, src, width, height, vars, wmode, backgroundColor) {
      var klass = sIFR.ua.ie ? IEFlashMovie : FlashMovie;
      return new klass(
        sIFR, brokenFlash, node, fixFocus,
        id, src, width, height,
        ['flashvars', vars, 'wmode', 'transparent', 'bgcolor', backgroundColor, 'allowScriptAccess', 'always', 'quality', 'best']
      );
    }

    function FlashMovie(sIFR, brokenFlash, node, fixFocus, id, src, width, height, params) {
      var object = sIFR.dom.create('object', ClassNames.FLASH);
      var attrs  = ['type', 'application/x-shockwave-flash', 'id', id, 'name', id, 'data', src, 'width', width, 'height', height];
      for(var i = 0; i < attrs.length; i += 2) object.setAttribute(attrs[i], attrs[i + 1]);

      var insertion = object;
      if(fixFocus) {
        insertion = dom.create("div", ClassNames.FIX_FOCUS);
        insertion.appendChild(object);
      }

      for(var i = 0; i < params.length; i+=2) {
        if(params[i] == 'name') continue;

        var param = dom.create('param');
        param.setAttribute('name', params[i]);
        param.setAttribute('value', params[i + 1]);
        object.appendChild(param);
      }

      // Before removing the existing content, set its height such that the element
      // does not collapse. Height is restored in `FlashInteractor#resizeFlashElement`.
      node.style.minHeight = height + 'px';

      while(node.firstChild) node.removeChild(node.firstChild);
      node.appendChild(insertion);

      this.html = insertion.cloneNode(true);
    }

    FlashMovie.prototype = {
      reset: function(flashNode, alternate) {
        flashNode.parentNode.replaceChild(this.html.cloneNode(true), flashNode);
      },

      remove: function(flashNode, id) {
        flashNode.parentNode.removeChild(flashNode);
      },

      setSize: function(type, value) {
        this.html.setAttribute(type, value);
      },

      injectVars: function(flash, encodedVars) {
        var params = flash.getElementsByTagName('param');
        for(var i = 0; i < params.length; i++) {
          if(params[i].getAttribute('name') == 'flashvars') {
            params[i].setAttribute('value', encodedVars);
            break;
          }
        }
      }
    };

    function IEFlashMovie(sIFR, brokenFlash, node, fixFocus, id, src, width, height, params) {
      this.dom    = sIFR.dom;
      this.broken = brokenFlash;

      this.html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + id +
        '" width="' + width + '" height="' + height + '" class="' + ClassNames.FLASH + '">' +
        '<param name="movie" value="' + src + '"></param></object>'
        ;
      var paramsHtml = '';
      for(var i = 0; i < params.length; i+=2) {
        paramsHtml += '<param name="' + params[i] + '" value="' + params[i + 1] + '"></param>';
      }
      this.html      = this.html.replace(/(<\/object>)/, paramsHtml + '$1');

      // Before removing the existing content, set its height such that the element
      // does not collapse. Height is restored in `FlashInteractor#resizeFlashElement`.
      node.style.minHeight = height + 'px';

      node.innerHTML = this.html;

      this.broken.register(node.firstChild);
    }

    IEFlashMovie.prototype = {
      reset: function(flashNode, alternate) {
        alternate            = alternate.cloneNode(true);
        var parent           = flashNode.parentNode;
        parent.innerHTML     = this.html;
        this.broken.register(parent.firstChild);
        parent.appendChild(alternate);
      },

      remove: function(flashNode, id) {
        this.broken.cleanup(id);
      },

      setSize: function(type, value) {
         this.html = this.html.replace(type == 'height' ? /(height)="\d+"/ : /(width)="\d+"/, '$1="' + value + '"');
      },

      injectVars: function(flash, encodedVars) {
        if(flash != this.html) return;
        this.html = this.html.replace(/(flashvars(=|\"\svalue=)\")[^\"]+/, '$1' + encodedVars);
      }
    };
  }

  this.errors =             new Errors(self);
  var util    = this.util = new Util(self);
  var dom     = this.dom  = new DomUtil(self);
  var ua      = this.ua   = new UserAgentDetection(self);
  var hacks   = {
    fragmentIdentifier:     new FragmentIdentifier(self),
    pageLoad:               new PageLoad(self),
    prefetch:               new Prefetch(self),
    brokenFlashIE:          new BrokenFlashIE(self)
  };
  this.__resetBrokenMovies = hacks.brokenFlashIE.reset;

  var replaceKwargsStore = {
    kwargs: [],
    replaceAll:  function(preserve) {
      for(var i = 0; i < this.kwargs.length; i++) self.replace(this.kwargs[i]);
      if(!preserve) this.kwargs = [];
    }
  };

  this.activate = function(/* … */) {
    if(!ua.supported || !this.isEnabled || this.isActive || !isValidDomain() || isFile()) return;
    hacks.prefetch.fetchMovies(arguments);

    this.isActive = true;
    this.setFlashClass();
    hacks.fragmentIdentifier.cache();
    hacks.pageLoad.attachUnload();

    if(!this.autoInitialize) return;

    hacks.pageLoad.attach();
  };

  this.setFlashClass = function() {
    if(this.hasFlashClassSet) return;

    dom.addClass(ClassNames.ACTIVE, dom.getBody() || document.documentElement);
    this.hasFlashClassSet = true;
  };

  this.removeFlashClass = function() {
    if(!this.hasFlashClassSet) return;

    dom.removeClass(ClassNames.ACTIVE, dom.getBody());
    dom.removeClass(ClassNames.ACTIVE, document.documentElement);
    this.hasFlashClassSet = false;
  };

  this.initialize = function(preserveReplacements) {
    if(!this.isActive || !this.isEnabled) return;
    if(isInitialized) {
      if(!preserveReplacements) replaceKwargsStore.replaceAll(false);
      return;
    }

    isInitialized = true;
    replaceKwargsStore.replaceAll(preserveReplacements);

    if(self.repaintOnResize) {
      if(window.addEventListener) window.addEventListener('resize', resize, false);
      else window.attachEvent('onresize', resize);
    }

    hacks.prefetch.clear();
  };

  this.replace = function(kwargs, mergeKwargs) {
    if(!ua.supported) return;

    // This lets you specify two kwarg objects so you don't have to repeat common settings.
    // The first object will be merged with the second, while properties in the second
    // object have priority over those in the first. The first object is unmodified
    // for further use, the resulting second object will be used in the replacement.
    if(mergeKwargs) kwargs = util.copyProperties(kwargs, mergeKwargs);

    if(!isInitialized) return replaceKwargsStore.kwargs.push(kwargs);

    if(this.onReplacementStart) this.onReplacementStart(kwargs);

    var nodes = kwargs.elements || dom.querySelectorAll(kwargs.selector);
    if(nodes.length == 0) return;

    var src             = getSource(kwargs.src);
    var css             = util.convertCssArg(kwargs.css);
    var filters         = getFilters(kwargs.filters);

    var forceSingleLine = kwargs.forceSingleLine === true;
    var preventWrap     = kwargs.preventWrap === true && !forceSingleLine;
    var fitExactly      = forceSingleLine || (kwargs.fitExactly == null ? this.fitExactly : kwargs.fitExactly) === true;
    var forceWidth      = fitExactly || (kwargs.forceWidth == null ? this.forceWidth : kwargs.forceWidth) === true;
    var ratios          = kwargs.ratios || [];
    var pixelFont       = kwargs.pixelFont === true;
    var tuneHeight      = parseInt(kwargs.tuneHeight) || 0;
    var events          = !!kwargs.onRelease || !!kwargs.onRollOver || !!kwargs.onRollOut;

    // Alignment should be handled by the browser in this case.
    if(fitExactly) util.extractFromCss(css, '.sIFR-root', 'text-align', true);

    var fontSize        = util.extractFromCss(css, '.sIFR-root', 'font-size', true)        || '0';
    var backgroundColor = util.extractFromCss(css, '.sIFR-root', 'background-color', true) || '#FFFFFF';
    var kerning         = util.extractFromCss(css, '.sIFR-root', 'kerning', true)          || '';
    var opacity         = util.extractFromCss(css, '.sIFR-root', 'opacity', true)          || '100';
    var cursor          = util.extractFromCss(css, '.sIFR-root', 'cursor', true)           || 'default';
    var leading         = parseInt(util.extractFromCss(css, '.sIFR-root', 'leading'))      || 0;
    var gridFitType     = kwargs.gridFitType ||
                            (util.extractFromCss(css, '.sIFR-root', 'text-align') == 'right') ? 'subpixel' : 'pixel';
    var textTransform   = this.forceTextTransform === false
                            ? 'none'
                            : util.extractFromCss(css, '.sIFR-root', 'text-transform', true) || 'none';
    // Only font sizes specified in pixels are supported.
    fontSize            = /^\d+(px)?$/.test(fontSize) ? parseInt(fontSize) : 0;
    // Make sure to support percentages and decimals
    opacity             = parseFloat(opacity) < 1 ? 100 * parseFloat(opacity) : opacity;

    var cssText = kwargs.modifyCss ? '' : util.cssToString(css);
    var wmode   = kwargs.wmode || '';
    if(!wmode) {
      if(kwargs.transparent) wmode = 'transparent';
      else if(kwargs.opaque) wmode = 'opaque';
    }
    if(wmode == 'transparent') {
      if(!ua.transparencySupport) wmode = 'opaque';
      else backgroundColor = 'transparent';
    } else if(backgroundColor == 'transparent') {
      backgroundColor = '#FFFFFF';
    }

    for(var i = 0; i < nodes.length; i++) {
      var node = nodes[i];

      if(dom.hasOneOfClassses(ClassNames.IGNORE_CLASSES, node) || dom.ancestorHasClass(node, ClassNames.ALTERNATE)) continue;

      // Opera does not allow communication with hidden Flash movies. Visibility is tackled by sIFR itself, but
      // `display:none` isn't. Additionally, WebKit does not return computed style information for elements with
      // `display:none`. We'll prevent elements which have `display:none` or are contained in such an element from
      // being replaced. It's a bit hard to detect this, but we'll check for the dimensions of the element and its
      // `display` property.

      var dimensions = dom.getDimensions(node);
      var height     = dimensions.height;
      var width      = dimensions.width;
      var display    = dom.getComputedStyle(node, 'display');

      if(!height || !width || !display || display == 'none') continue;

      // Get the width (to approximate the final size).
      width = dom.getWidthFromStyle(node);

      var size, lines;
      if(!fontSize) {
        var calculation    = calculate(node);
        size               = Math.min(this.MAX_FONT_SIZE, Math.max(this.MIN_FONT_SIZE, calculation.fontSize));
        if(pixelFont) size = Math.max(8, 8 * Math.round(size / 8));

        lines = calculation.lines;
      } else {
        size  = fontSize;
        lines = 1;
      }

      var alternate = dom.create('span', ClassNames.ALTERNATE);
      // Clone the original content to the alternate element.
      var contentNode = node.cloneNode(true);
      // Temporarily append the contentNode to the document, to get around IE problems with resolved hrefs
      node.parentNode.appendChild(contentNode);
      for(var j = 0, l = contentNode.childNodes.length; j < l; j++) {
        var child = contentNode.childNodes[j];
        // Let's not keep <style> or <script> in the alternate content, since it may be
        // reintroduced to the DOM after resizing.
        if (!/^(style|script)$/i.test(child.nodeName)) {
          alternate.appendChild(child.cloneNode(true));
        }
      }

      // Allow the sIFR content to be modified
      if(kwargs.modifyContent) kwargs.modifyContent(contentNode, kwargs.selector);
      if(kwargs.modifyCss) cssText = kwargs.modifyCss(css, contentNode, kwargs.selector);

      var content = parseContent(contentNode, textTransform, kwargs.uriEncode);
      // Remove the contentNode again
      contentNode.parentNode.removeChild(contentNode);
      if(kwargs.modifyContentString) content.text = kwargs.modifyContentString(content.text, kwargs.selector);
      if(content.text == '') continue;

      // Approximate the final height to avoid annoying movements of the page
      var renderHeight = Math.round(lines * getRatio(size, ratios) * size) + this.FLASH_PADDING_BOTTOM + tuneHeight;
      if (lines > 1 && leading) {
        renderHeight += Math.round((lines - 1) * leading);
      }

      var forcedWidth = forceWidth ? width : '100%';

      var id   = 'sIFR_replacement_' + elementCount++;
      var vars = ['id='              + id,
                  'content='         + util.escape(content.text),
                  'width='           + width,
                  'renderheight='    + renderHeight,
                  'link='            + util.escape(content.primaryLink.href   || ''),
                  'target='          + util.escape(content.primaryLink.target || ''),
                  'size='            + size,
                  'css='             + util.escape(cssText),
                  'cursor='          + cursor,
                  'tunewidth='       + (kwargs.tuneWidth || 0),
                  'tuneheight='      + tuneHeight,
                  'offsetleft='      + (kwargs.offsetLeft || ''),
                  'offsettop='       + (kwargs.offsetTop  || ''),
                  'fitexactly='      + fitExactly,
                  'preventwrap='     + preventWrap,
                  'forcesingleline=' + forceSingleLine,
                  'antialiastype='   + (kwargs.antiAliasType || ''),
                  'thickness='       + (kwargs.thickness || ''),
                  'sharpness='       + (kwargs.sharpness || ''),
                  'kerning='         + kerning,
                  'gridfittype='     + gridFitType,
                  'flashfilters='    + filters,
                  'opacity='         + opacity,
                  'blendmode='       + (kwargs.blendMode || ''),
                  'selectable='      + (kwargs.selectable == null || wmode != '' && !sIFR.ua.macintosh && sIFR.ua.gecko && sIFR.ua.geckoVersion >= sIFR.ua.parseVersion('1.9')
                                         ? 'true'
                                         : kwargs.selectable === true
                                       ),
                  'fixhover='        + (this.fixHover === true),
                  'events='          + events,
                  'delayrun='        + hacks.brokenFlashIE.fixFlash,
                  'version='         + this.VERSION];

      var encodedVars = util.encodeVars(vars);
      var interactor  = new FlashInteractor(self, id, vars, forceWidth, {
        onReplacement: kwargs.onReplacement,
        onRollOver: kwargs.onRollOver,
        onRollOut: kwargs.onRollOut,
        onRelease: kwargs.onRelease
      });
      interactor.movie = MovieCreator.create(
        sIFR, hacks.brokenFlashIE, node, ua.fixFocus && kwargs.fixFocus,
        id, src, forcedWidth, renderHeight,
        encodedVars, wmode, backgroundColor
      );
      this.replacements.push(interactor);
      this.replacements[id] = interactor;
      if(kwargs.selector) {
        if(!this.replacements[kwargs.selector]) this.replacements[kwargs.selector] = [interactor];
        else this.replacements[kwargs.selector].push(interactor);
      }
      alternate.setAttribute('id', id + '_alternate');
      node.appendChild(alternate);
      dom.addClass(ClassNames.REPLACED, node);
    }

    hacks.fragmentIdentifier.restore();
  };

  this.getReplacementByFlashElement = function(node) {
    for(var i = 0; i < self.replacements.length; i++) {
      if(self.replacements[i].id == node.getAttribute('id')) return self.replacements[i];
    }
  };

  this.redraw = function() {
    for(var i = 0; i < self.replacements.length; i++) self.replacements[i].resetMovie();
  };

  this.prepareClearReferences = function() {
    hacks.brokenFlashIE.prepareClearReferences();
  };

  this.clearReferences = function() {
    hacks.brokenFlashIE.clearReferences();
    hacks = null;
    replaceKwargsStore = null;
    delete self.replacements;
  };

  // The goal here is not to prevent usage of the Flash movie, but running sIFR on possibly translated pages
  function isValidDomain() {
    if(self.domains.length == 0) return true;

    var domain = util.domain();
    for(var i = 0; i < self.domains.length; i++) {
      if(util.domainMatches(domain, self.domains[i])) {
        return true;
      }
    }

    return false;
  }

  function isFile() {
    if(document.location.protocol == 'file:') {
      if(self.debug) self.errors.fire('isFile');
      return true;
    }
    return false;
  }

  function getSource(src) {
    if(ua.ie && src.charAt(0) == '/') {
      src = window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/, '$1$2$3') + src;
    }

    return src;
  }

  // Gives a font-size to required vertical space ratio
  function getRatio(size, ratios) {
    for(var i = 0; i < ratios.length; i += 2) {
      if(size <= ratios[i]) return ratios[i + 1];
    }
    return ratios[ratios.length - 1] || 1;
  }

  function getFilters(obj) {
    var filters = [];
    for(var filter in obj) {
      if(obj[filter] == Object.prototype[filter]) continue;

      var properties = obj[filter];
      filter = [filter.replace(/filter/i, '') + 'Filter'];

      for(var property in properties) {
        if(properties[property] == Object.prototype[property]) continue;
        // Double-escaping (see end of function) makes it easier to parse the resulting string
        // in AS.
        filter.push(property + ':' + util.escape(util.toJson(properties[property], util.toHexString)));
      }

      filters.push(filter.join(','));
    }

    return util.escape(filters.join(';'));
  }

  function resize(evt) {
    var current  = resize.viewport;
    var viewport = dom.getViewport();

    if(current && viewport.width == current.width && viewport.height == current.height) return;
    resize.viewport = viewport;

    if(self.replacements.length == 0) return; // Nothing replaced yet, resize event is not important.

    if(resize.timer) clearTimeout(resize.timer);
    resize.timer = setTimeout(function() {
      delete resize.timer;
      for(var i = 0; i < self.replacements.length; i++) self.replacements[i].resize();
    }, 200);
  }

  function calculate(node) {
    var fontSize = dom.getComputedStyle(node, 'fontSize');
    var deduce = fontSize.indexOf('px') == -1;

    var html = node.innerHTML;
    if (deduce) {
      node.innerHTML = 'X';
    }

    // Reset padding and border, so offsetHeight works properly
    node.style.paddingTop = node.style.paddingBottom = node.style.borderTopWidth = node.style.borderBottomWidth = '0px';
    // 2em magically makes offsetHeight correct in IE
    node.style.lineHeight = '2em';
    // Provided display is block
    node.style.display = 'block';

    fontSize = deduce ? node.offsetHeight / 2 : parseInt(fontSize, 10);

    if (deduce) {
      node.innerHTML = html;
    }

    var lines = Math.round(node.offsetHeight / (2 * fontSize));

    node.style.paddingTop = node.style.paddingBottom = node.style.borderTopWidth = node.style.borderBottomWidth
                          = node.style.lineHeight = node.style.display = '';

    if (isNaN(lines) || !isFinite(lines) || lines == 0) {
      lines = 1;
    }

    return {fontSize: fontSize, lines: lines};
  }

  function parseContent(source, textTransform, uriEncode) {
    uriEncode = uriEncode || util.uriEncode;
    var stack = [], content = [];
    var primaryLink = null;
    var nodes = source.childNodes;
    var whiteSpaceEnd = false, firstText = false;

    var i = 0;
    while(i < nodes.length) {
      var node = nodes[i];

      if(node.nodeType == 3) {
        var text = util.textTransform(textTransform, util.normalize(node.nodeValue)).replace(/</g, '&lt;');
        if(whiteSpaceEnd && firstText) text = text.replace(/^\s+/, '');
        content.push(text);
        whiteSpaceEnd = /\s$/.test(text);
        firstText = false;
      }

      if(node.nodeType == 1 && !/^(style|script)$/i.test(node.nodeName)) {
        var attributes = [];
        var nodeName   = node.nodeName.toLowerCase();
        var className  = node.className || '';
        // If there are multiple classes, look for the specified sIFR class
        if(/\s+/.test(className)) {
          if(className.indexOf(ClassNames.CLASS) > -1) className = className.match('(\\s|^)' + ClassNames.CLASS + '-([^\\s$]*)(\\s|$)')[2];
          // or use the first class. This is because Flash does not support the use of multiple class names.
          // Flash doesn't support IDs either.
          else className = className.match(/^([^\s]+)/)[1];
        }
        if(className != '') attributes.push('class="' + className + '"');

        if(nodeName == 'a') {
          var href   = uriEncode(node.getAttribute('href') || '');
          var target = node.getAttribute('target') || '';
          attributes.push('href="' + href + '"', 'target="' + target + '"');

          if(!primaryLink) {
            primaryLink = {
              href: href,
              target: target
            };
          }
        }

        content.push('<' + nodeName + (attributes.length > 0 ? ' ' : '') + attributes.join(' ') + '>');
        firstText = true;

        if(node.hasChildNodes()) {
          // Push the current index to the stack and prepare to iterate
          // over the childNodes.
          stack.push(i);
          i = 0;
          nodes = node.childNodes;
          continue;
        } else if(!/^(br|img)$/i.test(node.nodeName)) content.push('</', node.nodeName.toLowerCase(), '>');
      }

      if(stack.length > 0 && !node.nextSibling) {
        // Iterating the childNodes has been completed. Go back to the position
        // before we started the iteration. If that position was the last child,
        // go back even further.
        do {
          i = stack.pop();
          nodes = node.parentNode.parentNode.childNodes;
          node = nodes[i];
          if(node) content.push('</', node.nodeName.toLowerCase(), '>');
        } while(i == nodes.length - 1 && stack.length > 0);
      }

      i++;
    }

    return {text: content.join('').replace(/^\s+|\s+$|\s*(<br>)\s*/g, '$1'), primaryLink: primaryLink || {}};
  }
};

/*=:project
    parseSelector 2.0.2

  =:description
    Provides an extensible way of parsing CSS selectors against a DOM in
    JavaScript.

  =:file
    Copyright: 2006-2008 Mark Wubben.
    Author: Mark Wubben, <http://novemberborn.net/>

  =:license
    This software is licensed and provided under the CC-GNU LGPL.
    See <http://creativecommons.org/licenses/LGPL/2.1/>

  =:support
    parseSelector supports the following user agents:
      * Internet Explorer 6 and above
      * Firefox 1.0 and above, and equivalent Gecko engine versions
      * Safari 2.0 and above
      * Opera 8.0 and above
      * Konqueror 3.5.5 and above
    It might work in other browsers and versions, but there are no guarantees. There is
    no verification made when parseSelector is run to ascertain the browser is supported.

  =:notes
    The parsing of CSS selectors as streams has been based on Dean Edwards
    excellent work with cssQuery. See <http://dean.edwards.name/my/cssQuery/>
    for more info.
*/

var parseSelector = (function() {
  var SEPERATOR       = /\s*,\s*/
  var WHITESPACE      = /\s*([\s>+~(),]|^|$)\s*/g;
  var IMPLIED_ALL     = /([\s>+~,]|[^(]\+|^)([#.:@])/g;
  var STANDARD_SELECT = /(^|\))[^\s>+~]/g;
  var INSERT_SPACE    = /(\)|^)/;
  var STREAM          = /[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;

  function parseSelector(selector, node) {
    node = node || document.documentElement;
    var argSelectors = selector.split(SEPERATOR), result = [];

    for(var i = 0; i < argSelectors.length; i++) {
      var nodes = [node], stream = toStream(argSelectors[i]);
      for(var j = 0; j < stream.length;) {
        var token = stream[j++], filter = stream[j++], args = '';
        if(stream[j] == '(') {
          while(stream[j++] != ')' && j < stream.length) args += stream[j];
          args = args.slice(0, -1);
        }
        nodes = select(nodes, token, filter, args);
      }
      result = result.concat(nodes);
    }

    return result;
  }

  function toStream(selector) {
    var stream = selector.replace(WHITESPACE, '$1').replace(IMPLIED_ALL, '$1*$2').replace(STANDARD_SELECT, insertSpaces);
    return stream.match(STREAM) || [];
  }

  function insertSpaces(str) {
    return str.replace(INSERT_SPACE, '$1 ');
  }

  function select(nodes, token, filter, args) {
    return (parseSelector.selectors[token]) ? parseSelector.selectors[token](nodes, filter, args) : [];
  }

  var util = {
    toArray: function(enumerable) {
      var a = [];
      for(var i = 0; i < enumerable.length; i++) a.push(enumerable[i]);
      return a;
    }
  };

  var dom = {
    isTag: function(node, tag) {
      return (tag == '*') || (tag.toLowerCase() == node.nodeName.toLowerCase());
    },

    previousSiblingElement: function(node) {
      do node = node.previousSibling; while(node && node.nodeType != 1);
      return node;
    },

    nextSiblingElement: function(node) {
      do node = node.nextSibling; while(node && node.nodeType != 1);
      return node;
    },

    hasClass: function(name, node) {
      return (node.className || '').match('(^|\\s)'+name+'(\\s|$)');
    },

    getByTag: function(tag, node) {
      return node.getElementsByTagName(tag);
    }
  };

  var selectors = {
    '#': function(nodes, filter) {
      for(var i = 0; i < nodes.length; i++) {
        if(nodes[i].getAttribute('id') == filter) return [nodes[i]];
      }
      return [];
    },

    ' ': function(nodes, filter) {
      var result = [];
      for(var i = 0; i < nodes.length; i++) {
        result = result.concat(util.toArray(dom.getByTag(filter, nodes[i])));
      }
      return result;
    },

    '>': function(nodes, filter) {
      var result = [];
      for(var i = 0, node; i < nodes.length; i++) {
        node = nodes[i];
        for(var j = 0, child; j < node.childNodes.length; j++) {
          child = node.childNodes[j];
          if(child.nodeType == 1 && dom.isTag(child, filter)) result.push(child);
        }
      }
      return result;
    },

    '.': function(nodes, filter) {
      var result = [];
      for(var i = 0, node; i < nodes.length; i++) {
        node = nodes[i];
        if(dom.hasClass([filter], node)) result.push(node);
      }
      return result;
    },

    ':': function(nodes, filter, args) {
      return (parseSelector.pseudoClasses[filter]) ? parseSelector.pseudoClasses[filter](nodes, args) : [];
    }

  };

  parseSelector.selectors     = selectors;
  parseSelector.pseudoClasses = {};
  parseSelector.util          = util;
  parseSelector.dom           = dom;

  return parseSelector;
})();



// FROM: /javascripts/sifr-debug.js?1294660143
/*=:project
    scalable Inman Flash Replacement (sIFR) version 3, revision 436.

    Provides debug information about sIFR.

  =:file
    Copyright: 2006 Mark Wubben.
    Author: Mark Wubben, <http://novemberborn.net/>

  =:license
    * This software is licensed and provided under the CC-GNU LGPL
    * See <http://creativecommons.org/licenses/LGPL/2.1/>
*/

sIFR.debug = new function() {
  function Errors() {
    this.fire = function(id) {
      if(this[id + 'Alert']) alert(this[id + 'Alert']);
      throw new Error(this[id]);
    };

    this.isFile      = 'sIFR: Did not activate because the page is being loaded from the filesystem.';
    this.isFileAlert = 'Hi!\n\nThanks for using sIFR on your page. Unfortunately sIFR couldn\'t activate, because it was loaded '
                        + 'directly from your computer.\nDue to Flash security restrictions, you need to load sIFR through a web'
                        + ' server.\n\nWe apologize for the inconvenience.';
  };

  sIFR.errors = new Errors();

  function log(msg) {
    if(!sIFR.ua.safari && window.console && console.log) console.log(msg);
    else alert(msg);
  }

  this.ua = function() {
    var info = [];

    for(var prop in sIFR.ua) {
      if(sIFR.ua[prop] == Object.prototype[prop]) continue;

      info.push(prop, ': ', sIFR.ua[prop], '\n');
    }

    log(info.join(''));
  };

  this.domains = function() {
    if(sIFR.domains.length == 0) {
      log('No domain verification used.');
      return;
    }

    var domain = sIFR.util.domain();
    var matches = [], nonMatches = [];

    for(var i = 0; i < sIFR.domains.length; i++) {
      var match = sIFR.domains[i];
      if(sIFR.util.domainMatches(domain, match)) matches.push(match);
      else nonMatches.push(match);
    }

    var msg = ['The domain "', domain, '"'];
    if(matches.length > 0) msg.push(' matches:\n* ', matches.join('\n* '));
    if(matches.length > 0 && nonMatches.length > 0) msg.push('\nbut');
    if(nonMatches.length > 0) msg.push(' does not match:\n* ', nonMatches.join('\n* '));
    log(msg.join(''));
  };

  this.ratios = function(kwargs, mergeKwargs) {
    if(mergeKwargs) kwargs = sIFR.util.copyProperties(kwargs, mergeKwargs);

    if(!kwargs.selector && !kwargs.elements) {
      log('Cannot calculate ratios, no selector or element given.');
      return;
    }

    delete kwargs.wmode;
    delete kwargs.transparent;
    delete kwargs.opaque;

    if (kwargs.css) {
      kwargs.css = sIFR.util.convertCssArg(kwargs.css);
      sIFR.util.extractFromCss(kwargs.css, '.sIFR-root', 'leading', true);
    }

    var running = false;
    kwargs.onReplacement = function(cb) {
      if(running) return; // Prevent duplicate results
      running = true;

      sIFR.debug.__ratiosCallback[cb.id] = function(ratios) {
        ratios = '[' + ratios.join(', ') + ']';
        setTimeout(function() {
          var before = new Date();
          prompt('The ratios for ' + kwargs.selector + ' are:', ratios);
          if(sIFR.ua.ie && before - new Date < 200) {
            alert("Press Control+C to copy the text of this alert box. Then paste it into your favorite text editor.\n"
                + "The numbers between the braces, including the braces, are the ratios. You have to add those to your sIFR configuration.\n\n"
                + "Tip: try calculating the ratios in Firefox instead, it'll be easier to copy the ratios.\n\n"
                + ratios);
          }
          cb.resetMovie();
        }, 0);
      };
      cb.call('calculateRatios');
    };

    sIFR.replace(kwargs);
  };

  this.__ratiosCallback = function(id, ratios) {
    if(this.__ratiosCallback[id]) this.__ratiosCallback[id](ratios);
  };

  function verifyResource(uri, fail, ok) {
    if(sIFR.ua.ie && uri.charAt(0) == '/') {
      uri = window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/, '$1$2$3') + uri;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status != 200) log(fail);
        else log(ok);
      }
    };
    xhr.send('');
  }

  this.test = function(kwargs, mergeKwargs) {
    kwargs = merge(kwargs, mergeKwargs);

    var src = kwargs.src;
    var checked = false;
    if(typeof(src) != 'string') {
      if(src.src) src = src.src;

      if(typeof(src) != 'string') {
        var versions = [];
        for(var version in src) if(src[version] != Object.prototype[version]) versions.push(version);
        versions.sort().reverse();

        var result = '';
        var i = -1;
        while(!result && ++i < versions.length) {
          if(parseFloat(versions[i]) <= ua.flashVersion) result = src[versions[i]];
          var msg = '<' + src[versions[i]] + '>, flash ' + parseFloat(versions[i]);
          verifyResource(src[versions[i]], 'FAILED: ' + msg, 'OK: ' + msg);
        }

        src = result;
        checked = true;
      }
    }

    if(!src) log('Could not determine appropriate source.');
    else if(!checked) verifyResource(src, 'FAILED: <' + src + '>', 'OK: <' + src + '>');
  };

  this.forceTest = function() {
    var replace = sIFR.replace;
    sIFR.replace = function(kwargs, mergeKwargs) {
      sIFR.debug.test(kwargs, mergeKwargs);
      replace.call(sIFR, kwargs, mergeKwargs);
    };
  }
};


// FROM: /javascripts/sifr-config.js?1294660143
var futura = {
      src: '../../images/futura_light.swf'
      ,ratios: [7, 1.32, 11, 1.31, 13, 1.24, 14, 1.25, 19, 1.23, 27, 1.2, 34, 1.19, 42, 1.18, 47, 1.17, 48, 1.18, 69, 1.17, 74, 1.16, 75, 1.17, 1.16]
    };

var futura_bt = {
      src: '../../images/futura_bt.swf'
      ,ratios: [7, 1.32, 11, 1.31, 13, 1.24, 14, 1.25, 19, 1.23, 27, 1.2, 34, 1.19, 42, 1.18, 47, 1.17, 48, 1.18, 69, 1.17, 74, 1.16, 75, 1.17, 1.16]
    };

    var rockwell = {
      src: '../../images/rockwell.swf'
      ,ratios: [6, 1.41, 9, 1.35, 15, 1.29, 21, 1.25, 22, 1.22, 27, 1.24, 29, 1.21, 34, 1.22, 41, 1.21, 45, 1.2, 46, 1.21, 59, 1.2, 68, 1.19, 69, 1.2, 96, 1.19, 97, 1.18, 102, 1.19, 103, 1.18, 107, 1.19, 108, 1.18, 112, 1.19, 114, 1.18, 116, 1.19, 120, 1.18, 121, 1.19, 1.18]
    };

    // You probably want to switch this on, but read <http://wiki.novemberborn.net/sifr3/DetectingCSSLoad> first.
    // sIFR.useStyleCheck = true;
    sIFR.activate(futura,futura_bt, rockwell);

    sIFR.replace(rockwell, {
      selector: 'div.bakersville_text'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'13px' }
        ,transparent :true
        ,wmode:'transparent'
      }
    });

    sIFR.replace(rockwell, {
      selector: 'div.grey_alert'
      ,css: {
        '.sIFR-root': { 'color': '#454545','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });

    sIFR.replace(rockwell, {
      selector: 'div.blue_alert'
      ,css: {
        '.sIFR-root': { 'color': '#274a7e','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });


     sIFR.replace(rockwell, {
      selector: 'div.grey_text'
      ,css: {
        '.sIFR-root': { 'color': '#000000','background-color': '#DCDCDC' ,'font-size':'13px','text-align':'right','cursor':'pointer'}

      }
    });
    sIFR.replace(rockwell, {
      selector: 'div.rockwell_tx'
      ,css: {
        '.sIFR-root': { 'color': '#000000','background-color': '#DCDCDC' ,'font-size':'9px'}

      }
    });





   sIFR.replace(rockwell, {
      selector: 'span.dark_grey_text'
      ,css: {
        '.sIFR-root': { 'color': '#000000','background-color': '#DCDCDC' ,'font-size':'13px','font-weight':'bold' }

      }
    });





    sIFR.replace(rockwell, {
      selector: 'div.brown_alert'
      ,css: {
        '.sIFR-root': { 'color': '#a7551d','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });

    sIFR.replace(rockwell, {
      selector: 'div.q_text_default'
      ,css: {
        '.sIFR-root': { 'color': '#a7551d','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });



     sIFR.replace(rockwell, {
      selector: 'div.baker'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'16px' }
        ,transparent :true
        ,wmode:'transparent'
      }
    });

     sIFR.replace(rockwell, {
      selector: 'div.g_black_bt'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'20px','font-weight':'bold','text-align': 'center' }
      }
    });

     sIFR.replace(futura_bt, {
      selector: 'div.futura_medium_heading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '16px' }
      }
    });

     sIFR.replace(futura, {
      selector: 'div.futura_subheading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '18px' }
      }
    });

    sIFR.replace(futura, {
      selector: 'div.red_head'
      ,css: {
        '.sIFR-root': {'color': '#a52a2a', 'background-color': '#DCDCDC' ,'font-size': '29px','line-height': '90px' }
      }
    });

    sIFR.replace(futura_bt, {
      selector: 'div.red_head_bt'
      ,css: {
        '.sIFR-root': {'color': '#a52a2a', 'background-color': '#DCDCDC' ,'font-size': '32px','line-height': '50px' }
      }
    });

    sIFR.replace(futura_bt, {
      selector: 'div.futura_heading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '21px' }
      }
    });

     sIFR.replace(futura_bt, {
      selector: 'div.heading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '21px' }
      }
    });

     sIFR.replace(futura_bt, {
      selector: 'div.blue_heading'
      ,css: {
        '.sIFR-root': {'color': '#4c6b99', 'background-color': '#DCDCDC' ,'font-size': '18px' }
      }
    });


      sIFR.replace(futura_bt, {
      selector: 'div.job'
      ,css: {
        '.sIFR-root': {'color': '#4c6b99', 'background-color': '#DCDCDC' ,'font-size': '14px','cursor':'pointer' }
      }
    });


     sIFR.replace(rockwell, {
      selector: 'h2'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'20px','font-weight':'bold','text-align': 'left' }
      }
    });

    sIFR.replace(rockwell, {
      selector: 'h3'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'16px','font-weight':'bold','text-align': 'left' }
      }
    });











// FROM: /javascripts/ribbon.js?1294660143
document.write('<img src="/images/ribbon.png" border="0" width="120" height="120" style="position:absolute;z-index:-10; right:0px; top:0px; margin:0px; padding:0px">')


function please_wait()
{

    document.getElementById('please_wait').style.display ="block";
}

function stop_wait()
{
     document.getElementById('please_wait').style.display ="none";
}