function randomBoxIn (){ 
    var boxesTimeline = new TimelineMax();  
    var miniBoxes = $('a.setphotoviewitem'); 
    boxesTimeline.staggerFromTo(miniBoxes, 0.5, {height:0, rotation:200, autoAlpha:0}, 
      {height:"auto", transformOrigin:"bottom", rotation:0, autoAlpha:1, ease:Back.easeOut, immediateRender:true}, 0.1);
    }
function randomBoxOut (){ 
    var boxesTimeline = new TimelineMax();  
    var miniBoxes = $('a.setphotoviewitem'); 
    boxesTimeline.staggerFromTo(miniBoxes, 0.5,{height:"auto", transformOrigin:"bottom", rotation:0, autoAlpha:1, ease:Back.easeOut, immediateRender:true}, {height:0, rotation:Math.random()*200, autoAlpha:0}, 
       0.1);
    }
 $(document).ready(function() {
        randomBoxIn();
 				/////////////////////animate//////////////////////////////
 				$('div.do-problem-content>p>img').mouseenter(function(){
	    			TweenLite.to(this, .75, {css:{borderRadius:"50%"}});
				});			
				$('div.do-problem-content>p>img').mouseleave(function(){
	    			TweenLite.to(this, .75, {css:{borderRadius:"0%"}});
				});	


        // $('#header ul.animate').mouseenter(function() {
        //       TweenMax.fromTo(this,1, {opacity:0,rotationX:-150}, {opacity:1,rotationX:0,transformOrigin:"50% 0%", ease:Expo.easeOut})

        // });
        // $('#header ul.animate').mouseleave(function() {
        //       TweenMax.fromTo(this,1, {opacity:1,rotationX:0}, {opacity:0,rotationX:-150,transformOrigin:"50% 0%", ease:Expo.easeOut})

        // });
				// $('div.do-problem-drag-container>div.do-problem-container h5').mouseenter(function(){
	   			//  TweenLite.to($(this).parent().parent().parent(), .75, {css:{ boxShadow: "-10px -10px 10px rgba(0,0,0,0.7)"}});
				// });		
				// $('div.do-problem-drag-container>div.do-problem-container h5').mouseleave(function(){
	   		//TweenLite.to($(this).parent().parent().parent(), .75, {css:{ boxShadow: "none"}});
        //  TweenMax.fromTo($('div.modal-setdetail'), 2, {top: t,left: l,width:w,height:h,scaleY:-1},{
          // top:"10%",left:"50%",width: 560,height:539,scaleY:1,transformOrigin:"50% 50%", ease:  Expo.easeInOut})
				// });		
        $('a.setphotoviewitem').click(function() {
          var pos=$(this).offset();
          var t=pos.top;
          var l=pos.left;
          var w=$(this).width();
          var h=$(this).height();  
          var th=t-h;
          var lw=l+w;
          TweenLite.fromTo( $('div.modal-drop'), 0.5, {alpha:0}, {alpha:0.5,ease:Power0.easeIn})  
          TweenLite.fromTo($('div.modal-setdetail'), 0.5, {scale:0.2, alpha:0.5,top:th,left:lw,rotationX:120,transformPerspective:600}, {scale:1, alpha:1, top:"10%",left:"50%", rotationX:0,ease:Power2.easeIn}) 
           TweenLite.fromTo($('div.modal-back'), 0.5, {alpha:1,display:"block"}, {alpha:0,display:"none",ease:Power2.easeIn})                  
        // TweenLite.fromTo($('div.modal-setdetail'), 0.7, {skewtop:2000,opacity:0},{top:"10%",opacity:1,ease:Power2.easeInOut}) 
    //     TweenLite.from($('div.modal-setdetail'), 0.8, {css:{alpha:0, scale:3}, ease:Back.easeOut})
    // .to(question, 0.8, {css:{alpha:1, scale:1}, ease:Power1.easeIn}) 
    // TweenLite.fromTo($('div.modal-setdetail'), 0.5, {scale:0, alpha:0, top:60, rotation:-20}, {scale:1, alpha:1, top:"10%", rotation:0, ease:Back.easeOut, immediateRender:true}, 0.1)   
        }); 
        $('div.modal-drop').click(function() {
           TweenLite.fromTo( $('div.modal-drop'), 0.5, {alpha:0.5,display:"block"}, {alpha:0,display:"none",ease:Power0.easeIn},0.1)  
          TweenLite.fromTo($('div.modal-setdetail'), 0.5, {scale:1, alpha:1,rotationX:0,display:"block",transformPerspective:600}, {scale:0, alpha:0,rotationX:120,display:"none",ease:Power2.easeIn},0.01) 
        });
                ////////////////////drag & resize/////////////////////////
                $('div.drag-drop').hide();
                $('div.do-problem-drag-container').draggable({ handle: "h5" });
                $( "div.do-problem-drag-container" ).on( "dragstart", function( event, ui ) {
                  $('div.drag-drop').show();                  
                  $(this).addClass("active");
                  TweenMax.to(this, 1, {
    				boxShadow: "0px 0px 24px 6px white",
					})
                } );
                 $( "div.do-problem-drag-container" ).on( "dragstop", function( event, ui ) {
                  TweenMax.to(this, 0.5, {
    				boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.7)",
					})
                });
                 $('div.drag-drop').click(function() {
                   $(this).hide();
                   $( "div.do-problem-drag-container" ).removeClass("active").css("top","0").css("left","0").css("width","auto").css("height","auto").css("position","relative");
                   $('div.do-problem-container').removeClass("active");
                 });
                 // resize
                  $("div.do-problem-resize-container").resizable({ handles: "all"});
                  $("div.do-problem-resize-container").on( "resizestart", function( event, ui ) {
                     $('div.drag-drop').show();
                  $(this).addClass("active");
                  $(this).css("box-shadow","0px 0px 10px 4px #5bc0de");
                  TweenMax.fromTo(this, 0.3, {boxShadow: "0px 0px 0px 0px rgba(41, 128, 185,0.5)"},{
    					boxShadow: "0px 0px 24px 6px rgba(41, 128, 185,0.9)",
   						repeat: -1,
    					yoyo: true,
    					ease: Linear.easeNone
					})
              });
                    $("div.do-problem-resize-container").on( "resizestop", function( event, ui ) {
                    TweenMax.to(this, 0.1, {
	        css: {
	            boxShadow: "0px 0px 0px 0px #000"
	        }
	    })
              });
                  ////////////////////////////mode/////////////////////////////
                  $('.do-mode').click(function() {
                    $('div.do-problem-container').addClass("active");
                     $('div.drag-drop').show();
                  });
                 ////////////////////////////font size/////////////////////////
                 $('.font-tiny').click(function() {
                   $('div.do-problem-content>p').addClass("tiny");
                   $('div.do-problem-content>p').removeClass("big");
                   $('div.do-problem-content>p').removeClass("huge");
                    $('div.do-problem-content>p.question').addClass("tiny");
                   $('div.do-problem-content>p.question').removeClass("big");
                   $('div.do-problem-content>p.question').removeClass("huge");
                 });
                   $('.font-big').click(function() {
                   $('div.do-problem-content>p').addClass("big");
                   $('div.do-problem-content>p').removeClass("tiny");
                   $('div.do-problem-content>p').removeClass("huge");
                    $('div.do-problem-content>p.question').addClass("big");
                   $('div.do-problem-content>p.question').removeClass("tiny");
                   $('div.do-problem-content>p.question').removeClass("huge");
                 });
                     $('.font-huge').click(function() {
                   $('div.do-problem-content>p').addClass("huge");
                   $('div.do-problem-content>p').removeClass("big");
                   $('div.do-problem-content>p').removeClass("tiny");
                    $('div.do-problem-content>p.question').addClass("huge");
                   $('div.do-problem-content>p.question').removeClass("big");
                   $('div.do-problem-content>p.question').removeClass("tiny");
                 });
                       $('.font-normal').click(function() {
                   $('div.do-problem-content>p').removeClass("tiny");
                   $('div.do-problem-content>p').removeClass("big");
                   $('div.do-problem-content>p').removeClass("huge");
                    $('div.do-problem-content>p.question').removeClass("tiny");
                   $('div.do-problem-content>p.question').removeClass("big");
                   $('div.do-problem-content>p.question').removeClass("huge");
                 });

                 //////////////////////////////////////////////////////////////
                $('#backtotop').hide();
                $('div.problem-info').hide();
                                // fixed nav
                                 $('#header').scrollspy({
                                min: $('#header').offset().top,
                                max: 1000000,
                onEnter: function(element, position) {
                    $("#header>ul").addClass("fixed");
                     $('#backtotop').show();
                      $("nav").addClass("fixed");
                },
                onLeave: function(element, position) {
                    $("#header>ul").removeClass("fixed");
                     $('#backtotop').hide();
                      $("nav").removeClass("fixed");
                       $('div.problem-info').hide();
                       $('#qnav').html("导航");
                }
            });
                                $('div.do-problem-container').each(function(i) {
                                        var position = $(this).position();
                                        var b=$(this).index();                  
                                        var a=(b+1)/2;
                                        var c=(a-1)/6;
                                        var d=c.toFixed(2);
                                        var e=d*100;
                                        var f=e+15;
                                        var g=$(this).children("div.do-problem").attr("title");
                                        // console.log(position);
                                        // console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
                                        $(this).scrollspy({
                                                min: position.top,
                                                max: position.top + $(this).height(),
                                                onEnter: function(element, position) {
                                                				
                                                            $('#qnav').html(g);
                                                          $('div.problem-info .bar').css("width",e+"%");
                                                        $('div.problem-info>span').html("已完成"+e+"%，用时"+f+"分钟,您将做第"+a+"道，推荐用时15分钟")
                                                       $('div.problem-info').show(); 
                                                       TweenMax.fromTo($("div.problem-info"),2, {rotationX:-150}, {rotationX:0,transformOrigin:"50% 0%", ease:Elastic.easeOut, immediateRender:true})
                                                        setTimeout(function(){
                                                     $('div.problem-info').hide();
                                             },6000);
                                                },
                                                onLeave: function(element, position) {
                                                      $('div.problem-info').hide(); 
                                                }
                                        });
                                });
                      ///////////////////////////compatibility////////////////////////////////////
                      var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                      var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                      var deviceAgent = navigator.userAgent.toLowerCase();
                      var isiosdevice = deviceAgent.match(/(iphone|ipod|ipad)/);
                      if(isiosdevice){
                           $("div.do-problem-resize-container").resizable({ disabled: true});
                      };    

                        });