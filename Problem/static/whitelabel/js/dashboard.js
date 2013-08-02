jQuery(document).ready(function() {
	/////////////////////////////////////////////add pic///////////////////////////////////////////////
	$('div.myinfo.dashboard>div>div span.pi_btn>button.addpic').click(function() {
		//   $('input#file_upload_manual').wl_File();
		// $('div.modal-setdetail.state-addpic span.action').html("选择文件");
		// $('div.modal-setdetail.state-addpic span.filename').html("无文件选中");
		piDialog.prototype.promote('state-addpic','上传图片成功');
	});
	/////////////////////////////////////////////add set///////////////////////////////////////////////
	$('div.myinfo.dashboard>div>div span.pi_btn>button.addset').click(function() {
		$('#multiselect').wl_Multiselect()
		piDialog.prototype.promote('state-addset','添加题集成功');
	});
	/////////////////////////////////////////////alarm///////////////////////////////////////////////
	$('div.myinfo.dashboard>div>div span.pi_btn>button.alarm').click(function() {
		$('div.modal-setdetail.state-alarm input.date').wl_Date();
		$('div.modal-setdetail.state-alarm input.time').wl_Time();
		piDialog.prototype.promote('state-alarm','设置提醒');
	});
	//////////////////////////////////////////////////editor////////////////////////////////////////////
	$('div.myinfo.dashboard div.state4 button.editor').click(function() {	
		piDialog.prototype.promote('state-editor','发表成功');
		$('div.modal-setdetail.state-editor #textarea_wysiwyg').wl_Editor();	
      	});
	///////////////////////////////////////////////////////state/////////////////////////////////////////////
	  $('div.myinfo.dashboard>div>div.state').hide();
       setTimeout(function(){
               $('div.myinfo.dashboard>div>div.state1').show();
         },5);
      $('div.myinfo.dashboard>div>ul li a').click(function() {
         $('div.myinfo.dashboard>div>ul li').removeClass("active");
         $(this).parent().addClass("active");
         var a=$(this).parent().index()+1;
         var b="state"+a;
         $('div.myinfo.dashboard>div>div.state').hide();   
        $('div.myinfo.dashboard>div>div.'+b+">div.state_btn").hide();
        setTimeout(function(){
			 $('div.myinfo.dashboard>div>div.'+b+">div.state_btn").show();		
		},350);
         TweenLite.fromTo($('div.myinfo.dashboard>div>div.'+b), 0.35, {alpha:0,width:0,display:"block"}, {alpha:1,width:"100%",ease:Power0.easeIn},0.05);    
      });
      ////////////////////////////////////////////////////////fullscreen//////////////////////////////////////////
      $('a.fullscreen').click(function(event) {
      	if ($(this).parent().parent().hasClass('collapsed')) {
      		$(this).parent().parent().children('div').show();
      	};
      	$(this).parent().parent().addClass('fullscreen');
      	$(this).parent().parent().children('h3').hide();	
      	$(window).trigger('resize');
      	$('.img-drop').fadeIn(100);   
      	var a=$(this).parent().parent().height();
      	$(this).parent().parent().css('margin-top', -a*0.5).css('z-index', '1040');
      	if ($(this).parent().parent().attr('id')=='calendar_widget') {
                  $('div.calsetcontainer span').removeClass('small');
      		$(this).parent().parent().css('margin-top', 0);
      		$(this).parent().parent().css('top', 50);
      	};
      });
      $('.widget-drop').click(function(event) {
         $('div.calsetcontainer span').addClass('small');
      	$('.widget.fullscreen h3').show();
      	if ($('.widget.fullscreen').hasClass('collapsed')) {
      		$('.widget.fullscreen').children('div').hide();
      	};
      	$('.widget.fullscreen').css('margin-top', 0);
      	$('.widget.fullscreen').removeClass('fullscreen');
      	$(window).trigger('resize');
      	$(this).fadeOut(100);
      });
});