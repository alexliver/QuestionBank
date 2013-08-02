$(document).ready(function() {
	info_section();
	info_btn();
	$('button.addsection').click(function(event) {
		 piDialog.prototype.promoteN('addsection');
	});
	$('.addsection button').click(function(event) {
		var a=$('input.info_new_section_title').val();
		var b=$('textarea.info_new_section_intro').val();
		var c=$('<ul><h5><span>'+a+'</span><input type="text" placeholder="'+a+'"class="g2 info_title"><button class="small editinfo icon i_cog right">编辑</button><button class="small addinfo icon i_cog right">添加</button><input type="text" id="text_placeholder" name="text_placeholder" placeholder="通过链接快速添加" class="placeholder g3 right addinfo"></h5></ul>');
		var d=$('<div class="info-section"><span>'+b+'</span></div>');
		var e=$('<textarea cols="30" rows="10" class="clearall"></textarea>');
		e.appendTo(d);
		d.appendTo(c);
		c.appendTo('.problem-general');
		$('button.addsection').appendTo('.problem-general');
		 info_btn();
		 info_section();
	});
	$('.problem-general button.addinfo').click(function(event) {
		var a=$(this).parent().parent().find('li').eq(2).clone();
		a.appendTo($(this).parent().parent());
		info_section();
	});
});
// load when creating a new question and a new section
function info_section(){
	$('.problem-general ul li').draggable({
		zIndex: 999,
		revert: true,     
		revertDuration: 0,
		drag: function( event, ui ) {
			var that=$(this);
			$( ".problem-general ul" ).droppable({
			// accept: '.problem-general ul li',
			drop: function( event, draggable ) {
				that.appendTo($(this));
			}
			});			
		}
	});
	$('button.deleteinfo').click(function() {
		$(this).parent().hide(100);
	});
}
//load when the new section comes
function info_btn(){
		$('button.editinfo').toggle(function() {
		$(this).html("完成");
		var a=$(this).parent().parent().children('div.info-section').children('span');
		a.hide();
		$(this).parent().children("input.info_title").val($(this).parent().children("span").text());
		$(this).parent().parent().children('div.info-section').children('textarea').attr('placeholder','在这里编辑: '+a.text()).val(a.text()).show();
		$(this).parent().children("span").hide();
		$(this).parent().children("button.addinfo").show(100);
		$(this).parent().children("input").show(100);
		$(this).parent().parent().children("li").children("button.deleteinfo").show(100);
		}, function() {
		$(this).html("编辑");
		$(this).parent().children("span").text($(this).parent().children("input.info_title").val());
		var b=$(this).parent().parent().children('div.info-section').children('textarea');
		b.hide();
		var a=$(this).parent().parent().children('div.info-section').children('span').text(b.val());
		var a=$(this).parent().parent().children('div.info-section').children('span').show();
		$(this).parent().children("span").show();
		$(this).parent().children("button.addinfo").hide(100);
		$(this).parent().children("input").hide(100);
		$(this).parent().parent().children("li").children("button.deleteinfo").hide(100);
		});
}		
