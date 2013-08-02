// here are some flaws or further improvements
// 1. it needs passing id in order to delete the list view item when check on the card view, it is better to do via ajax since the server need to have a record about it.
$(document).ready(function() {	
	$('.va-container ul li').each(function(event) {
   	var t=$(this).index()*2+1;
   	var z=109-$(this).index();
   	TweenMax.set($(this), {boxShadow: "none",top:t ,zIndex:z});
   	});
   	$('.va-container ul li').mouseenter(function(event) {
   		$(this).find('a').show();
   	});
    $('.va-container ul li').mouseleave(function(event) {
      $(this).find('a').hide();
    });
   	$('a.checkvocab').mouseenter(function(event) {
   		$(this).children('i').removeClass('icon-check-empty').addClass('icon-check');
   	});
   	$('a.checkvocab').mouseleave(function(event) {
   		$(this).children('i').removeClass('icon-check').addClass('icon-check-empty');
   	});
    $('.va-container ul li').click(function(event) {
           $('.va-container>span.on').trigger('click');
          var item=$(this).parent();
          var num=$(this).index();
          createCard(item,num);
         $('.img-drop').fadeIn(200);
          TweenMax.fromTo($('.va-card'), 0.6,{top:-1000,opacity:0}, {top:'50%', opacity:1,ease:Back.easeOut});
            bindActions();
    });
        $('.img-drop').click(function(event) {
            $(this).fadeOut(500);
            $(this).empty();
     });
   	$('.va-container ul li a').click(function(event) {
             event.stopPropagation();
   		var l=$(this).parent().parent();
                   var i=l.index();
   		l.css('z-index', '111');
   		TweenMax.to(l, 0.5 , {rotation:70,opacity:0,display:'none',transformOrigin:'top right',immediateRender:true}, 0.1);
                   var d=$(this).parent().parent().parent().find('li');
                   d.each(function(event) {
                     var t=$(this).index();
                     if (t>i) {
                             $(this).animate({
                         top: '-=65'
                       }, 500)};
                     });
                     setTimeout(function(){
                                 l.remove();
                      },600);
                     var h=d.length*65;
                     $(this).parent().parent().parent().parent().css('height', h);
                     if (d.length==1) {
                          $(this).parent().parent().parent().parent().remove();
                     };
   	});
      $('.va-container > span').click(function(event) {
                if ($(this).hasClass('on')){
                    var a=$(this).parent().children('ul').children('li');
                    $(this).parent().removeClass('va-active');
                    $(this).parent().css('height', 'auto');
                    vocabOut (a);
                    $(this).removeClass('on');
                }else{
                    var a=$(this).parent().children('ul').children('li');
                    $(this).parent().addClass('va-active');
                    var h=$(this).parent().find('li').length*65+65;
                    $(this).parent().css('height', h);
                    vocabIn (a);  
                    $(this).addClass('on');
                }
      });
})
function vocabIn (vocab){ 
   var time=0.1;
   vocab.each(function(event) {
   	var t=$(this).index()*65+65;
   	TweenMax.to($(this), time, {boxShadow: "0 1px 1px rgba(0,0,0,0.1)",top:t, ease:Back.easeOut, immediateRender:true});
    	  time += 0.1;
   });
}
function vocabOut (vocab){ 
   var time=0.1;
   vocab.each(function(event) {
   	var t=$(this).index()*2+1;
   	var z=109-$(this).index();
   	TweenMax.to($(this), time, {boxShadow: "none",top:t ,zIndex:z, ease:Back.easeOut, immediateRender:true});
    	  time += 0.1;
   });
}
function cardCheck(item){
       TweenMax.to(item, 1, {rotation:70,top:0, opacity:0, transformOrigin:'bottom right',ease:Back.easeOut, immediateRender:true});
}
function cardSwitch(checker){
      if (checker==1) {
             setTimeout(function(){
                                 var againcount = parseInt($("#hiddenVal").val());   
                                 againcount -=1;
                                  $("#hiddenVal").val(againcount);
                      },810);
      };
      var cardTimeline1 = new TimelineMax(); 
      var cardTimeline2 = new TimelineMax(); 
     cardTimeline1.to($('.va-card.past'), 0.3, {rotation:10,top:'-=200',opacity:0.95, transformOrigin:'bottom right'}).to($('.va-card.past'), 0.5, {opacity:1,rotation:0, zIndex:$("#hiddenVal").val()-1, top:'+=200', transformOrigin:'bottom right'})  
     cardTimeline2.to($('.va-card.active'), 0.3, {rotation:-10,top:'+=100', opacity:0.95, transformOrigin:'bottom right'}).to($('.va-card.active'), 0.5, { opacity:1,rotation:0, top:'-=100', transformOrigin:'bottom right'}) 
}
function createCard(item,num){
   var c=item.parent().attr('class');
    item.children('li').each(function(event) {
           var a=$(this).find('.va-word').text();
           var b=$(this).find('.va-expan').text();
            var d=$('<a  title="点击从生词本中移除" class="checkvocab"><i class="icon-check-empty"></i></a>');
            var e=$('<span><a href="">'+a+'</a></span>');
            var f=$('<p>'+b+'</p>');
            var g=$('<span><a class="next">NEXT <i class="icon-forward"></i></a></span>');
            var card=$('<div class="va-card active"></div>').addClass(c).removeClass('va-container');
            d.appendTo(card);
            e.appendTo(card);
            f.appendTo(card);
            g.appendTo(card);
            card.prependTo('.card-drop');
    });
    $('<div  class="va-card active"><span><a href="">THIS IS THE LAST CARD</a></span><span><a class="again">PLAY AGAIN <i class="icon-play"></i></a></span>').addClass(c).removeClass('va-container').prependTo('.card-drop');
    for (var i = 0; i < num; i++) {
              $('.va-card').last().prependTo('.card-drop')
    }; 
}
function bindActions(){
      $('.va-card').click(function(event) {
             event.stopPropagation();
     });
       $('.va-card a.checkvocab').click(function(event) {
         var b=$(this).parent();
         cardCheck(b);
            setTimeout(function(){
                    b.remove();  
                    if ($('.va-card').length==1) {
                      $('.card-drop').fadeOut(500);
                      $('.card-drop').empty();
                   };
        },1100);  
     });
     $('.va-card span a.next').click(function(event) {
      $('.va-card').removeClass('past');
          $('.va-card').addClass('active');
       $(this).parent().parent().addClass('past');
        $(this).parent().parent().removeClass('active');
        cardSwitch(0);
     });
        $('.va-card span a.again').click(function(event) {
      $('.va-card').removeClass('past');
          $('.va-card').addClass('active');
       $(this).parent().parent().addClass('past');
        $(this).parent().parent().removeClass('active');
        cardSwitch(1);
       });
          $('a.checkvocab').mouseenter(function(event) {
      $(this).children('i').removeClass('icon-check-empty').addClass('icon-check');
    });
    $('a.checkvocab').mouseleave(function(event) {
      $(this).children('i').removeClass('icon-check').addClass('icon-check-empty');
    });
}
// another animation, use hidden input as the counter
// function cardOut(){
//           var time=0.1;   
//           var r=90/$('.va-card').length;
//          $('.va-card').each(function(event) {  
//           var t=$(this).index();
//           var z=109-$(this).index();
//           TweenMax.set($(this), {zIndex:z});
//           TweenMax.to($(this), time, {rotation:r*t,opacity:1-0.05*t, transformOrigin:'bottom right',ease:Back.easeOut, immediateRender:true});
//               time += 0.1;
//         });
//          $('.va-card').click(function(event) {
//                 var i=$(this).attr('name');
//                $('.va-card').each(function(event) { 
//                         if ($(this).attr('name')>i) {
//                               var na=$(this).attr('name');
//                              $(this).attr('name',na-i); 
//                               TweenMax.to($(this), time, {rotation:"-="+i*r,opacity:"+="+0.05*i, transformOrigin:'bottom right',ease:Back.easeOut, immediateRender:true});
//                         };
//                           if ($(this).attr('name')<i) { 
//                               $(this).attr('name','0');
//                               TweenMax.to($(this), time, {rotation:-90, opacity:0, transformOrigin:'bottom right',ease:Back.easeOut, immediateRender:true});
//                         };
//                            if ($(this).attr('name')==i) {
//                               $(this).attr('name','1');
//                               TweenMax.to($(this), time, {rotation:0, opacity:1, transformOrigin:'bottom right',ease:Back.easeOut, immediateRender:true});
//                         };
//                  });
//          });
// }
