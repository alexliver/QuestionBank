$(document).ready(function() {
	/////////////////////////////////basic rules//////////////////////////////////////////////
	$('div.pi_content_post div.pi_content_post_comment').hide();
	$('div.pi_content_diary div.pi_content_post_comment').show();
	$('div.pi_content_post').click(function() {
	$('div.pi_content_post div.pi_content_post_comment').hide();
	var a=$(this).children("div.pi_content_post div.pi_content_post_comment");
	  TweenLite.set(a, {display:"block",height:0});
	  TweenLite.to(a, 0.5, {height:"auto"});
	});
	/////////////////////////////////scroll control///////////////////////////////////////////
            $(document).scroll(function() {
                    	var b=$(document).scrollTop();
                    	var c=$('div.pi_content_diarys').offset().top;
                    	var d=$('div.pi_content_set').offset().top;
                    	var e=$('div.pi_content_shares').offset().top;
                        if (b<=380){  
                              $('div.pi_function ul>li').removeClass("active");
                              $('div.pi_function').css('position', 'relative').css("top","0");
                        };  
                    	if (b>380){
                    	     var a=b-185;
                             var a1=b-155;
                    	     $('div.pi_function ul>li:first').addClass("active");
            		     $('div.pi_function').css('position', 'absolute').css("top",a);
                             $('div.mypi_function').css('position', 'absolute').css("top",a1);
            		};
            		if (b<c&&b>=380){
            		      $('div.pi_function ul>li').removeClass("active");
                              $('div.pi_function ul>li').eq(0).addClass("active");
            		};
            		if (b>=c&&b<d){
            		      $('div.pi_function ul>li').removeClass("active");
                              $('div.pi_function ul>li').eq(1).addClass("active");
            		};
            		if (b>=d&&b<e){
            		      $('div.pi_function ul>li').removeClass("active");
                              $('div.pi_function ul>li').eq(2).addClass("active");
            		};
            		if (b>e){
            		      $('div.pi_function ul>li').removeClass("active");
                              $('div.pi_function ul>li').eq(4).addClass("active");
            		};		
            });        
	////////////////////////////////forward//////////////////////////////////////////////////
	$('div.pi_content_post div.option button.forward').click(function() {
		var a=$(this).parent().parent().children("span.pi_content_post_header").text();
		var b=$(this).parent().parent().children("p").text();
		$('div.modal-setdetail.forward>div.modal-setdetail-head>strong.username').html(a);
		$('div.modal-setdetail.forward>div.modal-setdetail-content>textarea').text("@myusername:"+a+b);
             piDialog.prototype.promote('forward','转发成功');
	});
	//////////////////////////////////////reply/////////////////////////////////////////////
	$('div.pi_content_post div.option button.reply').click(function() {
		var a=$(this).parent().parent().children("span.pi_content_post_header").text();
		var b=$(this).parent().parent().children("p").text();
		$('div.modal-setdetail.reply>div.modal-setdetail-head>strong.username').html(a);
		$('div.modal-setdetail.reply>div.modal-setdetail-content>p').html(a+":"+b);
		piDialog.prototype.promote('reply','回复成功');
	});
    //////////////////////////////////////////////ajax loadmore////////////////////////////////////
    $('a.pi_loadmore').toggle(function() {
       $(this).html('&#9650;点击收起内容');
    }, function() {
      $(this).html('&#9660;点击加载更多内容');
    });
    /////////////////////////////////////////////img gallery///////////////////////////////////////////
    $('div.img-drop-list a').click(function() {
      var a=$(this).children("img").attr("src");
      $(this).parent().parent().children("div.img-drop-show").children("img").attr('src', a);
    });
    $('div.pi_content_post_gallery>a').click(function() {
       var a=$(this).children("img").attr("src");
      $("div.img-drop-show").children("img").attr('src', a);
      $('div.img-gallery').fadeIn(200);
       $('div.img-drop').fadeIn(200);
    });
    $('div.img-drop').click(function() {
           $('div.img-gallery').hide();
       $('div.img-drop').hide();
    });
    
});
