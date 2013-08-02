$(document).ready(function() {
      // sections
      $('form.do-problem-form').hide();
       setTimeout(function(){
               $('form.do-problem-form.section1').show();
         },5);
      $('div.sections.do-btngroup>a').click(function() {
         $('div.sections.do-btngroup>a').removeClass("active");
         $(this).addClass("active");
         var a=$(this).index()+1;
         var b="section"+a;
         $('form.do-problem-form').hide();
         setTimeout(function(){        
               $('form.do-problem-form.'+b).fadeIn(500);
         },5);
      });
      // code
            $('code').addClass('prettyprint linenums');
           prettyPrint();
	// audio
	audiojs.events.ready(function() {
      	audiojs.createAll();
       });
	// note
	 TweenLite.set($('div.do-problem-note.do'), {rotation:90,left:-170});
	     $('div.do-problem-note.do').mouseenter(function(){
            TweenLite.to(this, .75, {rotation:0,left:-4});
        });     
        $('div.do-problem-note.do').mouseleave(function(){
            TweenLite.to(this, .75, {rotation:90,left:-170});
         //    $.msg("已自动保存！",{live:3000});
        }); 
         $('div.do-problem-note.do>a#note-save').click(function() {
            Dajaxice.Problem.save_note(note_saved,{'qs_id':$("#qsid").val(),"note_body":$('#notebody').val(), 'note_id':$('#noteid').val()});      
         });
          $('div.do-problem-note.do>a#note-new').click(function() {
           	$('div.do-problem-note.do>textarea').val('');
		$('#noteid').val('0');
         });
});
