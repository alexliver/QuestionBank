$(document).ready(function() {
	$('#registration_form a.submit').click(function() {
	$('#registration_form').submit();
	});
	$('#regform a.submit').click(function() {
	  $('#regform').submit();
	});

	// modified
	$('body#login form section a.reg').click(function(event) {
		var reg=$('body#login #content.login.reg');
		var log=$('body#login #content.login.log');
		TweenMax.set(reg,{rotationY:-180,opacity:0,display:"block"});
		TweenMax.to(log, 1, {rotationY:180, transformOrigin:"left 50% 500",opacity:0,display:"none",transformPerspective:2000})
		TweenMax.to(reg, 1, {rotationY:0, transformOrigin:"left 50% 500",opacity:1,display:"block",transformPerspective:2000})
	});
	$('body#login form section a.log').click(function(event) {
		var reg=$('body#login #content.login.reg');
		var log=$('body#login #content.login.log');
		TweenMax.to(log, 1, {rotationY:0, transformOrigin:"left 50% 500",display:"block",opacity:1,transformPerspective:2000})
		TweenMax.to(reg, 1, {rotationY:-180, transformOrigin:"left 50% 500",display:"none",opacity:0,transformPerspective:2000})
	});					   
	// end of modified					   
	var $body = $('body'),
		$content = $('#content'),
		$form = $content.find('#loginform');
	
		
		//IE doen't like that fadein
		if(!$.browser.msie) $body.fadeTo(0,0.0).delay(500).fadeTo(1000, 1);
		
		
		$("input").uniform();
		

		$form.wl_Form({
			status:false,
			onBeforeSubmit: function(data){
				$form.wl_Form('set','sent',false);
				if(data.username || data.password){
					location.href="dashboard.html";
				}else{
					$.wl_Alert('Please provide something!','info','#content');
				}
				return false;

			}							  
		});
		
		
});

