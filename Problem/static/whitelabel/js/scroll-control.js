 $(document).ready(function() {
                ////////////////////drag & resize/////////////////////////
                $('div.drag-drop').hide();
                $('div.do-problem-drag-container').draggable({ handle: "h5" });
                $( "div.do-problem-drag-container" ).on( "dragstart", function( event, ui ) {
                  $('div.drag-drop').show();
                  $(this).addClass("active");
                } );
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
              });
                    $("div.do-problem-resize-container").on( "resizestop", function( event, ui ) {
                  $(this).css("box-shadow","none");
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
                      $('#content').addClass("fixed");
                },
                onLeave: function(element, position) {
                    $("#header>ul").removeClass("fixed");
                     $('#backtotop').hide();
                      $("nav").removeClass("fixed");
                       $('div.problem-info').hide();
                       $('#qnav').html("导航");
                         $('#content').removeClass("fixed");
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
                           $("div.do-problem-resize-container").resizable("destroy");
                             $("div.do-problem-resize-container").css("opacity","1");
                      };    

                        });