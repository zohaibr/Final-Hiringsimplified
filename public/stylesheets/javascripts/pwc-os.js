// Overide WindowUtilities getPageSize to remove dock height (for maximized windows)
WindowUtilities._oldGetPageSize = WindowUtilities.getPageSize;
WindowUtilities.getPageSize = function() {
  var size = WindowUtilities._oldGetPageSize();
  var dockHeight = $('dock').getHeight();
  
  size.pageHeight -= dockHeight;
  size.windowHeight -= dockHeight;
  return size;
};    


// Overide Windows minimize to move window inside dock  
Object.extend(Windows, {
  // Overide minimize function
  minimize: function(id, event) {
    var win = this.getWindow(id)
    if (win && win.visible) {
      // Hide current window
      win.hide();            
    
      // Create a dock element
      var element = document.createElement("span");
      element.className = "dock_icon"; 
      element.style.display = "none";
      element.win = win;
      $('dock').appendChild(element);
      Event.observe(element, "mouseup", Windows.restore);
      $(element).update(win.getTitle());
    
      new Effect.Appear(element)
    }
    Event.stop(event);
  },                 
  
  // Restore function
  restore: function(event) { 
    var element = Event.element(event);
    // Show window
    element.win.show();
    //Windows.focus(element.win.getId());                    
    element.win.toFront();
    // Fade and destroy icon
    new Effect.Fade(element, {afterFinish: function() {element.remove()}})
  }
})

// blur focused window if click on document
Event.observe(document, "click", function(event) {   
  var e = Event.element(event);
  var win = e.up(".dialog");
  var dock = e == $('dock') || e.up("#dock"); 
  if (!win && !dock && Windows.focusedWindow) {
    Windows.blur(Windows.focusedWindow.getId());                    
  }
})               

// Chnage theme callback
var currentTheme = 0;
function changeTheme(event) {
  var index = Event.element(event).selectedIndex;
  if (index == currentTheme)
    return;

  var theme, blurTheme;
  switch (index) {
    case 0:
      theme = "mac_os_x";
      blurTheme = "blur_os_x";
      break;
    case 1:
      theme = "bluelighting";
      blurTheme = "greylighting";
      break;
    case 2:
      theme = "greenlighting";
      blurTheme = "greylighting";
      break;
  }
  Windows.windows.each(function(win) {
    win.options.focusClassName = theme; 
    win.options.blurClassName = blurTheme;
    win.changeClassName(blurTheme)
  });
  Windows.focusedWindow.changeClassName(theme);
  currentTheme = index;
}

// Init webOS, create 3 windows
function initWebOS() {         
  // Create 3 windows
  $R(1,3).each(function(index) {
	
    var win = new Window({className: "bluelighting", blurClassName: "greylighting",closable:false, title: "window #"+index, width:250, height:150, top: 100 + index*50, left:100 + index*50}); 
    win.getContent().update("<h1>Window #" + index + "</h1>");
    win.show();    
  })                 
  //
  $$("#theme select").first().selectedIndex = currentTheme;
  Event.observe($$("#theme select").first(), "change", changeTheme);  
}

function create_question_window()
{
	 	question_window = new Window({className: "bluelighting", blurClassName: "greylighting",closable:false, title: "Question 1 0f 5", width:document.documentElement.clientWidth-25, height:(document.documentElement.clientHeight/2)-120, top: 5 , left:0}); 
    	question_window.getContent().update("<h1>Window #</h1>");
    	question_window.show();
		
}

function create_webcam_window()
{
	 	cam_window = new Window({className: "bluelighting", blurClassName: "greylighting",closable:false, title: "Webcam Window", width:((document.documentElement.clientWidth/3)-25), height:(document.documentElement.clientHeight/2)-10, top: (document.documentElement.clientHeight/2)-65 , left:0}); 
    	cam_window.getContent().update("<h1>Window #</h1>");
    	cam_window.show();
		cam_window.setZIndex(10);
}

function create_notepad_window()
{
	 	notepad_window = new Window({className: "bluelighting", blurClassName: "greylighting",closable:false, title: "Notepad Window", width:((document.documentElement.clientWidth/3)-25), height:(document.documentElement.clientHeight/2)-10, top: (document.documentElement.clientHeight/2)-65 , left:((document.documentElement.clientWidth/3))}); 
    	notepad_window.getContent().update("<h1>Window #</h1>");
    	notepad_window.show();
}

function create_sketchpad_window()
{
	 	sketchpad_window = new Window({className: "bluelighting", blurClassName: "greylighting",closable:false, title: "Sketchpad Window", width:300, height:300, top: (document.documentElement.clientHeight/2)-65 , left:((document.documentElement.clientWidth)-document.documentElement.clientWidth/3)}); 
    	sketchpad_window.setURL("graffiti_advanced_demo.html")
    	sketchpad_window.show();
}

function remove_window()
{
	question_window.getContent().update("<h1>Hello</h1>");
}

               
               
