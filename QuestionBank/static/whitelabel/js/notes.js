$(document).ready(function() {
	 $('div.note-info').hide();
	 $("div.do-problem-note.notes>textarea").prop("disabled", true);
	 $("div.do-problem-note.notes>a#note-new").click(function() {
	 	 $(this).parent().children("textarea").prop("disabled", false);
	 	  var a =  $(this).parent().children("textarea");
   		 a.data('placeholder', a.attr('placeholder'))
         .focus(function(){a.val(a.attr('placeholder'));});        
	 	  $.msg("可以开始编辑！",{live:3000});
	 });
	  $("div.do-problem-note.notes>a#note-save").click(function() {
	  	 $(this).parent().children("textarea").prop("disabled", true);
	 	  var a =  $(this).parent().children("textarea");
	  	  a.attr('placeholder', a.val());
	  	   $.msg("已保存！",{live:3000});
	  });
	  // animation
	  $('div.do-problem-note.notes').each(function() {
	  	var a=Math.random()*40-20;
	  	var b=Math.floor(Math.random()*6);
		//Modified
	  	$(this).css("background","url(/static/whitelabel/css/images/notes/note"+b+".png)");
	  	TweenLite.set($(this), {position:"absolute",top:0,left:0,rotation:a});
	  });
	  TweenLite.set($('div.do-problem-note.notes.last'), {position:"absolute",rotation:0});
	     $('div.do-problem-note.notes.last>a#note-check').click(function(){
	     	$(this).parent().parent().removeClass("tiny");
	     	$(this).parent().parent().children("div.note-info").show();
	     	$(this).parent().hide();
	     	var a=$(this).parent().parent().children("div.do-problem-note.notes");
            TweenLite.to( a, .75, {position:"relative",rotation:0});         
        });     
        $('div.note-info button').click(function(){
        	$(this).parent().parent().parent().addClass("tiny");
        	$(this).parent().parent().hide();
        	var b=$(this).parent().parent().parent().children('div.do-problem-note.notes');
        	b.each(function() {
	  			var a=Math.random()*40-20;
	  			TweenLite.set($(this), {position:"absolute",top:0,left:0,rotation:a});
	  		});
	  		var c=$(this).parent().parent().parent().children('div.do-problem-note.notes.last');
	  		TweenLite.set(c, {position:"absolute",rotation:0,display:"block"});
        }); 
});
