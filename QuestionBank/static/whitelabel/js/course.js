$(document).ready(function() {
	cs_scroll();
        $(".cs_college_search").keypress(function() {
          $('.searchexpand').slideDown();
      });
        $(".cs_college_search").blur(function() {
          $('.searchexpand').slideUp();
       });
});  
function cs_scroll(){
	$('div.cs_nav .cs_logo').hide();
	 $(document).scroll(function() {
                    var base =$('.cs_banner').height();
                    	var b=$(document).scrollTop();
                        var a=$(window).height()*0.5;
                    	var c=$('#cs_link1').offset().top-a;
                          var d=$('#cs_link2').offset().top-a;
                           var e=$('#cs_link3').offset().top-a;
                            var f=$('#cs_link4').offset().top-a;
                             var g=$('#cs_link5').offset().top-a;
                            $('span.tri').hide();
                        if (b<=base){  
                             	$('div.cs_nav').removeClass('fixed');
                             	$('div.cs_topline').show();
                             	$('div.cs_nav .cs_logo').hide();
                             	$('ul.cs_nav li a').removeClass('active');   
                                      $('span.tri').hide();
                        };  
                    	if (b>base){
                    		$('div.cs_nav').addClass('fixed');
                    		$('div.cs_nav .cs_logo').show();
                    		$('div.cs_topline').hide();   
                                         $('span.tri').show();         		
                    	};
                    	if (b<=d&&b>c){
                    		$('ul.cs_nav li a').removeClass('active');     
                    		$('a.cs_link1').addClass('active');  		
                    	};
                         if (b<=e&&b>d){
                            $('ul.cs_nav li a').removeClass('active');     
                            $('a.cs_link2').addClass('active');         
                        };
                            if (b<=f&&b>e){
                            $('ul.cs_nav li a').removeClass('active');     
                            $('a.cs_link3').addClass('active');         
                        };	
                            if (b<=g&&b>f){
                            $('ul.cs_nav li a').removeClass('active');     
                            $('a.cs_link4').addClass('active');         
                        };
                            if (b>g){
                            $('ul.cs_nav li a').removeClass('active');     
                            $('a.cs_link5').addClass('active');         
                        };
            });        
}
