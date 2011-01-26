$ = function(v, o) { // ELEMENT

	return (typeof o == 'object' ? o : document).getElementById(v);
	
};

$T = function(v, o) { // TAG

	return (o ? typeof o == 'object' ? o : $(o) : document).getElementsByTagName(v);

};

$S = function(o, r) { // STYLE

	var o = (typeof o == 'object' ? o : $(o));

	if(r) for(var i in r) o.style[i] = r[i];

	return o.style;

};

$2D = function(o) { // CANVAS

	return (typeof o == 'object' ? o : $(o)).getContext('2d');
	
};

// Event Listener

(function() {

var fix = function(v) { // fix any browser discrepancies

	if(v == 'mousewheel' && Agent.isFF) return 'DOMMouseScroll';

	return v;

};

Event = { };

Event.add = function(o, v, fu) {

	v = fix(v);
	
	if(!Agent.isIE) o.addEventListener(v, fu, false);
	
	else { // IE 
	
		o["e" + v + fu] = fu;

		o[v + fu] = function() { o["e" + v + fu](window.event); };
		
		o.attachEvent(v, o[v + fu]);
		
	}
};

Event.remove = function(o, v, fu) {

	v = fix(v);

	if(!Agent.isIE) o.removeEventListener(v, fu, false);

	else { // IE

		o.detachEvent(v, o[v + fu]);

		o["e" + v + fu] = null;

		o[v + fu] = null;
		
	}
};

})();

// Object.prototype

Object.setAttributes = function(attrs) {

	for(var id in attrs) this.setAttribute(id, attrs[id]);

	return this;

};

// String.prototype

String.prototype.replaceAll = function(a, b) { // Replace all occurrences of the search string with the replacement string

	return this.split(a).join(b);
	
};

String.prototype.trim = function(v) { // Strip whitespace (or other characters) from the beginning and end of a string

	return this.replace(/^\s+|\s+$/g, "");
	
};

String.prototype.ucwords = function(v) { // Uppercase the first character of each word in a string

	return this.replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });

};

String.prototype.ucfirst = function(v) { // Make a string's first character uppercase

	return this[0].toUpperCase() + this.substr(1);
	
};

// User Agent

(function() {

	Agent = { };

	var o = navigator.userAgent, ver = navigator.appVersion, n = parseFloat(ver);

	var idx = Math.max(ver.indexOf("WebKit"), ver.indexOf("Safari"), 0);

	if(idx) Agent.isSafari = parseFloat(ver.split("Version/")[1]) || ((parseFloat(ver.substr(idx + 7)) >= 419.3) ? 3 : 2) || 2;

	Agent.isOpera = (o.indexOf("Opera") >= 0) ? n : false;
	Agent.isKhtml = (ver.indexOf("Konqueror") >= 0 || Agent.isSafari) ? n : false;
	Agent.isMoz = (o.indexOf("Gecko") >= 0 && !Agent.isKhtml) ? n : false;
	Agent.isFF = Agent.isIE = false;

	if(Agent.isMoz) Agent.isFF = parseFloat(o.split("Firefox/")[1]) || false;

	if(document.all && !Agent.isOpera) Agent.isIE = parseFloat(ver.split("MSIE ")[1]) || false;
	
	Agent.isMac = (o.indexOf('Mac') >= 0);
	Agent.isWin = (((o.indexOf('Win') >= 0) || (o.indexOf('NT') >= 0) ) && !Agent.isMac) ? true : false;
	Agent.isLinux = (o.indexOf('Linux') >= 0);

})();

// Cookies

//- http://api.dojotoolkit.org/jsdoc/dojo/HEAD/dojo.cookie
//- http://plugins.jquery.com/files/jquery.cookie.js.txt

Cookie = { };

Cookie = function(name, value, options) {

	var c = document.cookie;

	if(arguments.length == 1) {

		var matches = c.match(new RegExp("( ? :^|; )" + dojo.regexp.escapeString(name) + " = ([^;]*)"));

		return matches ? decodeURIComponent(matches[1]) : null;

	}
	else {

		props = props || { };

		var exp = props.expires;

		if(typeof exp == "number") {

			var d = new Date();

			d.setTime(d.getTime() + exp*24*60*60*1000);

			exp = props.expires = d;

		}

		if(exp && exp.toUTCString) { props.expires = exp.toUTCString(); }
	 
		value = encodeURIComponent(value);

		var updatedCookie = name + " = " + value;

		for(propName in props) {

			updatedCookie += "; " + propName;

			var propValue = props[propName];

			if(propValue !== true) { updatedCookie += " = " + propValue; }

		}

		document.cookie = updatedCookie;

	}
};

Cookie.isSupported = function() {

	if(!("cookieEnabled" in navigator)) {
	
		this("__djCookieTest__", "CookiesAllowed");

		navigator.cookieEnabled = this("__djCookieTest__") == "CookiesAllowed";

		if(navigator.cookieEnabled) this("__djCookieTest__", "", { expires: -1 });

	}

	return navigator.cookieEnabled;

};

// Page Query

PageQuery = function(v) {

	var o = window.location.search, n = o.indexOf(v);

	if(n == -1) return false;
	
	var len = v.length, q = (o.substr(n + len) ? o.substr(n + len) : null).split('&');

	var z = { }, v = '';
	
	for(var i in q) {
	
		v = q[i].split(' = ');
		
		z[v[0]] = v[1];
		
	}
	
	return z;
	
};

// Image <-> Base64

image2data = function(url) {

	var image = new Image(); image.src = url;

	image.onload = function() {
	
		var o = document.createElement('Canvas');
		
		o.width = image.width;
		o.height = image.height;

		var o2D = o.getContext('2d');

		o2D.drawImage(image, 0, 0);

		TEST(o.toDataURL())

	};
};

data2image = function(url) {

	var image = new Image();
	
	image.src = url;
	
	return image;
	
};

// Date Functions

now = function() {

	return (new Date()).getTime();

};

// Coordinates

XY = Agent.isIE ?

	function(e) { return { X: event.clientX + document.documentElement.scrollLeft, Y: event.clientY + document.documentElement.scrollTop }; } :
	
	function(e) { return { X: e.pageX, Y: e.pageY }; };

// Objects

clone = function(o) {

	if(typeof o != 'object') return(o);

	if(o == null) return(o);
	
	var z = (typeof o.length == 'number') ? [ ] : { };

	for(var i in o) z[i] = clone(o[i]);

	return z;
	
};

mixin = function(o) { // dojo.mixin

	var len = arguments.length;

	for(var i = 1; i < len; i++)
	{
		for(var j in arguments[i])
		
			o[j] = arguments[i][j]; 
	}
	return o;

};

isArray = function(o) {

	return Object.prototype.toString.call(o) === '[object Array]';

};

isEmpty = function(o) { 

	for(var i in o) return false; 
	
	return true; 

};

// Debugging

TEST = function(v, s) {

	var o = document.getElementById('T'), z1 = '';

	if(typeof v == 'object') {
	
		var b = v && v.length ? ['[',']'] : ['{','}'];

		for(var i in v) {

			if(typeof v[i] == 'object') {

				var c = v[i] && v[i].length ? ['[',']'] : ['{','}'], z2 = '';

				for(var j in v[i]) z2 += (c[0] == '[' ? '': j +': ')+ (typeof v[i][j] == 'string' ? "'"+ v[i][j] +"'" : v[i][j]) +', ';

				z1 += i+': '+c[0]+' '+ z2.substr(0, z2.length-2) +' '+c[1]+', ';

				continue;

			}

			z1 += i + ': ' + v[i] + ', '; // arrays

		}
		
		v = b[0]+' '+ z1.substr(0, z1.length-2) +' '+b[1];

	};

	v = s == 1 ? '<br>'+ v : v;

	o.innerHTML = s ? o.innerHTML + v : v;

};

Speed_TEST = function() {

	var o = arguments, len = o.length - 1, speed = o[ len ] - 1, t = 0, time = [ ];
	
	for(var n = 0; n < len; n ++) {

		t = now();
		
		for(var i = 0; i <= speed; i++)
		
			o[n](); // run function
		
		time[n] = now() - t;
	
	}
	
	var fast = 0, slow = Infinity;
	
	for(var n in time) {
	
		if(time[n] > fast) fast = time[n];
		if(time[n] < slow) slow = time[n];	

	}
	
	var z = '';
	
	for(var n in time) // record times
	
		z += n + ': ' + time[n] + ', ';

	$('T').innerHTML += ($('T').innerHTML ? '<br>' : '')
					 +  z.substr(0, z.length - 2) + ' == ' + ((fast / slow * 1000)/1000);

};