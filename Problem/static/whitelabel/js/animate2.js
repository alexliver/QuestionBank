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
      // new
    function listBoxIn(item){
    TweenLite.set(item, {scale:0.5, rotationX:70, autoAlpha:0, y:-300, z:-500, transformPerspective:600, display:"block"});
    TweenLite.to(item, 0.05, {autoAlpha:1, scale:1, ease:Back.easeOut.config(1.5), delay:0.01});
    TweenLite.to(item, 0.6, {rotationX:0, y:0, z:0, ease:Back.easeOut.config(1), delay:0.05, clearProps:"transform"});
    }
     function listBoxOut(item){  
    TweenLite.to(item, 0.5,{scale:0.5, rotationX:70, autoAlpha:0, y:-300, z:-500, ease:Power2.easeIn, transformPerspective:600, display:"block"});
    }
      function listItemIn(item){
        TweenLite.fromTo(item, 0.6, {rotationX:90, transformPerspective:1000, opacity:0, transformOrigin:"50% 50% -100px"}, {rotationX:0, opacity:1, ease:Power2.easeInOut, clearProps:"transform", immediateRender:true}, 0.01);
      }
    function listItemOut(item){
          TweenLite.fromTo(item, 0.6, {rotationX:0, opacity:1, transformPerspective:1000, transformOrigin:"50% 50% -100px"}, {rotationX:-90, opacity:0,display:"none", ease:Power2.easeInOut, clearProps:"transform", immediateRender:true}, 0.01);
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
        $('a.setphotoviewitem').click(function() {
            listBoxIn($('div.modal-setdetail'));
          });
        $('a.listviewcover').click(function() {
          listBoxIn($('div.modal-setdetail'));
        });
        $('div.modal-drop').click(function() {
            listBoxOut($('div.modal-setdetail'));
        });
        $('a#problemsetprogress').click(function() {
          listItemIn($('div.problemsetprogress'));
           listItemOut($('div.problemsetreview'));
             listItemOut($('div.problemlist'));
        });
           $('a#problemlist').click(function() {
          listItemIn($('div.problemlist'));
           listItemOut($('div.problemsetprogress'));
            listItemOut($('div.problemsetreview'));
        });
              $('a#problemsetreview').click(function() {
          listItemIn($('div.problemsetreview'));
           listItemOut($('div.problemsetprogress'));
             listItemOut($('div.problemlist'));
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