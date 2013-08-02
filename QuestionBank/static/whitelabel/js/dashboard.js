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
});