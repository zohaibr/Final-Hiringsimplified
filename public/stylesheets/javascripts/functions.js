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

//alert('here')
    $('#'+id).animate({'top': y},'slow');
  //  new Effect.Move(id, { x: 0, y: y, mode: 'absolute',duration: 0.3 });
  }

  function MoveBackward(id,y)
  {

   $('#'+id).animate({'top': y},'slow');
    
   // new Effect.Move(id, { x: 0, y: y, mode: 'absolute',duration: 0.3 });
  }

  function ResetControl(id)
  {

  // alert(document.getElementById(id).offsetTop);

    $('#'+id).animate({'top': 0},'slow');
    //new Effect.Move(id, { x: 0, y:0, mode: 'absolute',duration: 0 });
    
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
            alert(db_interviews_list_y);
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
    if($('#'+previous) != null)
      {
          $('#'+previous).removeClass('selected');
          $('#'+current).addClass('selected');

         //$(previous).removeClassName('selected');
      }

   $('#'+current).addClass('selected');
    //$(current).addClassName('selected');
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


function please_wait()
{

    document.getElementById('please_wait').style.display ="block";
}

function stop_wait()
{
     document.getElementById('please_wait').style.display ="none";
}
