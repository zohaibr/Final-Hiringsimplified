function ext_links() {
 if (!document.getElementsByTagName) return;
 var anchors = document.getElementsByTagName("a");
 for (var i=0; i<anchors.length; i++) {
   var a = anchors[i]; if (a.getAttribute("href") && a.getAttribute("rel")=="external"){ a.target = "_blank"; }
 }
}
