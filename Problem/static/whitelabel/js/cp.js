jQuery(document).ready(function($) {
	cp_newp_reset();
	 $('a.cp_newptosection').click(function() {
	 	 piDialog.prototype.promoteN('cp_addtonewsection');
	 }); 
	  piDialog.prototype.dialog($('a.cp_dropdown_delete'),'确定删除该题吗?','d124');
	  // d124 is the id of the dialog
});
///////////////////////////////////////////////reset////////////////////////////////////
function cp_newp_reset(){
	cp_newp_btn();
	cp_newp_option();
	cp_newp_newq();
	cp_newp_totype();	
	cp_newp_default();	
}
//////////////////////////////////////button grounp////////////////////////////////
function cp_newp_btn(){

	$('.cp_container div.do-btngroup a.cp_tag').click(function() {
		$('.cp_container div.do-btngroup a').removeClass("active");
		$(this).addClass("active");		
		$(this).parent().children("ul.do-dropdown").children("li").hide();
		$(this).parent().children("ul.do-dropdown").children("li.cp_dropdown_tag,li.divider").show();
		$(this).parent().children("ul.do-dropdown").slideDown();
	});
	$('.cp_container div.do-btngroup a.cp_type').click(function() {
		$('.cp_container div.do-btngroup a').removeClass("active");
		$(this).addClass("active");		
		$(this).parent().children("ul.do-dropdown").children("li").hide();
		$(this).parent().children("ul.do-dropdown").children("li.cp_dropdown_type,li.divider").show();
		$(this).parent().children("ul.do-dropdown").slideDown();
	});
	$('.cp_container div.do-btngroup a.cp_save').click(function() {
		$('.cp_container div.do-btngroup a').removeClass("active");
		$(this).addClass("active");
		$(this).parent().children("ul.do-dropdown").slideUp();
		$.msg("保存成功！",{live:3000});
	});
	$('.cp_container div.do-btngroup a.cp_done').click(function() {
		$('.cp_container div.do-btngroup a').removeClass("active");
		$(this).addClass("active");
		$(this).parent().children("ul.do-dropdown").slideUp();
		$.msg("创建成功！",{live:3000});
	});
	$('li.divider-text>a.cp_dropdown_cancle').click(function() {
		$(this).parent().parent().parent().children("a").removeClass("active");
		$(this).parent().parent().slideUp();
	});
	$('li.divider-text>a.cp_dropdown_addtag').click(function() {
		var a=$(this).parent().parent().children("li.cp_dropdown_tag").children("input").val();
		var b=$("<span/>");
		var c=$(this).parent().parent().parent().parent();
		var d=$("<span class='closemark'>×</span>");
		b.text(a);
		d.appendTo(b);
		if (a!="添加标签"&&a.length>0) {b.appendTo(c);};	
		$(this).parent().parent().slideUp();
		$('span.closemark').click(function() {
		$(this).parent().remove();
		});
	});
	$('span.closemark').click(function() {
		$(this).parent().remove();
	});
}	
//////////////////////////////////////////////option2////////////////////////////////
function cp_newp_option(){

	$('div.cp_option2_content').hide();
	$('div.cp_option2_content.cp_script_container').show();
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_hint').click(function() {
		// $('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a').removeClass("active");
		$(this).addClass("active");
		// $(this).parent().parent().children("div.cp_option2_content").slideUp();
		$(this).parent().parent().children("div.cp_hint_container").slideDown();
	});
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_explanation').click(function() {
		// $('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a').removeClass("active");
		$(this).addClass("active");
		// $(this).parent().parent().children("div.cp_option2_content").slideUp();
		$(this).parent().parent().children("div.cp_explanation_container").slideDown();
	});
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_save').click(function() {
		$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a').removeClass("active");
		$(this).addClass("active");
		$(this).parent().parent().children("div.cp_option2_content").slideUp();
	});
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_done').click(function() {
		$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a').removeClass("active");
		$(this).addClass("active");
		$(this).parent().parent().children("div.cp_option2_content").slideUp();
	});
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_addoption').click(function() {
		var a1=$("<input type='checkbox' class='checkbox'>");
		var a2=$("<input type='text' name='新选项内容' placeholder='新选项内容' class='g10'>");
		var a=$("<div/>").addClass("cp_choice");
		a1.appendTo(a);
		a2.appendTo(a);
		var b=$(this).parent().parent("div.cp_choice_container");
		if (b.children().length<11) {
			a.appendTo(b);
		};	
		$(this).parent().appendTo(b);
		$(this).parent().parent().children("div.cp_hint_container").appendTo(b);
		$(this).parent().parent().children("div.cp_explanation_container").appendTo(b);
		$(this).parent().parent().children("div.cp_choice").last().children("input.checkbox").checkbox();
	});
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_addradio').click(function() {
		var a1=$("<input type='radio' class='radio' name='required_radio'>");
		var a2=$("<input type='text' name='新选项内容' placeholder='新选项内容' class='g10'>");
		var a=$("<div/>").addClass("cp_choice");
		a1.appendTo(a);
		a2.appendTo(a);
		var b=$(this).parent().parent("div.cp_choice_container");
		if (b.children().length<11) {
			a.appendTo(b);
		};	
		$(this).parent().appendTo(b);
		$(this).parent().parent().children("div.cp_hint_container").appendTo(b);
		$(this).parent().parent().children("div.cp_explanation_container").appendTo(b);
		$(this).parent().parent().children("div.cp_choice").last().children("input.radio").checkbox();
	});
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_deleteoption').click(function() {
		$(this).parent().parent().children("div.cp_choice").last().remove();
	});
	$('.cp_container div.do-problem-content>div.cp_choice_container>div.do-btngroup>a.cp_deleteq').click(function() {
		$(this).parent().parent().remove();
	});
}
/////////////////////////////////////////////add new question//////////////////////////
function cp_newp_newq(){
	$('li.cp_dropdown_type_check>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$('div.cp_duplicate div.cp_multi_check').clone();
		var b=$(this).parent().parent().parent().parent().parent();
		a.appendTo(b);
		cp_newp_option();
	});
	$('li.cp_dropdown_type_radio>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$('div.cp_duplicate div.cp_multi_radio').clone();
		var b=$(this).parent().parent().parent().parent().parent();
		a.appendTo(b);
		cp_newp_option();
	});
	$('li.cp_dropdown_type_input>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$('div.cp_duplicate div.cp_multi_input').clone();
		var b=$(this).parent().parent().parent().parent().parent();
		a.appendTo(b);
		cp_newp_option();
	});
	$('li.cp_dropdown_type_textarea>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$('div.cp_duplicate div.cp_multi_textarea').clone();
		var b=$(this).parent().parent().parent().parent().parent();
		a.appendTo(b);
		cp_newp_option();
	});
}
function cp_newp_totype(){
	$('li.cp_dropdown_type_tocheck>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$(this).parent().parent().parent().parent().parent().children("div.cp_choice_container").children("div.cp_choice");
		a.show();
		a.children(".radio").remove();
		a.children(".checkbox").remove();
		var b=$("<input class='checkbox' type='checkbox'>");
		b.prependTo(a);
		a.children("input.checkbox").checkbox();
		var d=a.parent().children("div.cp_question");
		d.empty();
		$('<input type="text" name="添加习题" placeholder="添加习题" class="g10">').appendTo(d);	
	});
	$('li.cp_dropdown_type_toradio>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$(this).parent().parent().parent().parent().parent().children("div.cp_choice_container").children("div.cp_choice");
		a.show();
		a.children(".checkbox").remove();
		a.children(".radio").remove();
		var b=$("<input class='radio' type='radio' id='required_third_radio' name='required_radio'>");
		b.prependTo(a);
		a.children("input.radio").checkbox();
		var d=a.parent().children("div.cp_question");
		d.empty();
		$('<input type="text" name="添加习题" placeholder="添加习题" class="g10">').appendTo(d);
	});
	$('li.cp_dropdown_type_toinput>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$(this).parent().parent().parent().parent().parent().children("div.cp_choice_container").children("div.cp_choice");
		a.hide();
		var b=a.parent().children("div.cp_question");
		b.empty();
		b.children("input.g10").removeClass("g10").addClass("g8");
		var c=$("<input type='text' name='输入所需填空数量' placeholder='输入所需填空数量'' class='g2'>");
		c.prependTo(b);
		$('<input type="text" name="添加习题" placeholder="添加习题" class="g8">').appendTo(b);
	});
	$('li.cp_dropdown_type_totextarea>a').click(function() {
		$(this).parent().parent().parent().children("a.cp_type").removeClass("active");
		$(this).parent().parent().slideUp();
		var a=$(this).parent().parent().parent().parent().parent().children("div.cp_choice_container").children("div.cp_choice");
		a.hide();
		var b=a.parent().children("div.cp_question");
		b.empty();
		var c=$("<textarea cols='30' rows='10' placeholder='填写简答题题目' class='g10'></textarea>");
		c.prependTo(b);
	});
}
////////////////////////////////////////////////audio//////////////////////////////////
function cp_newp_default(){
	$('.cp_container.cp_audio div.uploader span.filename').text("无文件选中");
	$('.cp_container.cp_audio div.uploader span.action').text("音频文件");
	$('.cp_container.cp_reading div.uploader span.filename').text("无文件选中");
	$('.cp_container.cp_reading div.uploader span.action').text("上传图片");
	$('div.uploader span.action').css('font-style', 'normal');
	$('div.fileuploadui a').text("取消上传");
}


