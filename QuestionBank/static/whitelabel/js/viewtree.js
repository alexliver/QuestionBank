$(document).ready(function() {	
	$('.knowledgetree').jOrgChart({
	            chartElement : '#chart',
	            dragAndDrop  : false
       	 });
	$('span.node_progress').each(function(event) {
		var a=$(this).children('span').text();
		$(this).css('width', a);
	});
	$('.node').click(function(event) {
		var a=$(this).offset().top;
		var b=$(this).offset().left;
		if (b<900) {
			$('.node_info').css({
			top:a-10,
			left: b+90
			});
			$('.node_info_arrow').removeClass('arrowright');
			$('.node_info_arrow').addClass('arrowleft');
			$('.node_info_close').removeClass('closeleft');
			$('.node_info_close').addClass('closeright');		
		};
		if (b>=900) {
			$('.node_info').css({
			top:a-10,
			left: b-520
			});
			$('.node_info_arrow').removeClass('arrowleft');
			$('.node_info_arrow').addClass('arrowright');
			$('.node_info_close').removeClass('closeright');
			$('.node_info_close').addClass('closeleft');
		};
		var c=$(this).children('span:first-child').text();
		var d=$(this).children('span.node_progress').children('span').text();
		$('.node_info h3.ct_progress').text('完成进度:'+d);
		$('.node_info .progress .bar').css('width', d);
		$('.node_info h3.ct_title').text(c);
		$('<span>预计完成时间:</span><span>2013.06.15</span></h3>').appendTo('.node_info h3.ct_progress')
		$('<span>高中>数学>我的知识树1</span><span>难度:中等</span>').appendTo('.node_info h3.ct_title');
		$('.node_info').fadeIn(300);
		$('.img-drop').show();
		if ($(this).children('span.node_progress').hasClass('danger')) {
			$('.node_info .progress').removeClass('progress-info');
			$('.node_info .progress').removeClass('progress-danger');
			$('.node_info .progress').removeClass('progress-success');
			$('div.node_info_close').css('background', 'url(css/light/images/rx.png)');
			$('.node_info h3').removeClass('danger')
			$('.node_info h3').removeClass('success')
			   setTimeout(function(){
			   	$('.node_info .progress').addClass('progress-danger');
			   	$('.node_info h3').addClass('danger')
                                             },6);	
		}else if ($(this).children('span.node_progress').hasClass('success')) {
			$('.node_info .progress').removeClass('progress-info');
			$('.node_info .progress').removeClass('progress-danger');
			$('.node_info .progress').removeClass('progress-success');
			$('.node_info h3').removeClass('danger');
			$('.node_info h3').removeClass('success');
			$('div.node_info_close').css('background', 'url(css/light/images/gx.png)');
			   setTimeout(function(){
			   	$('.node_info .progress').addClass('progress-success');
			   	$('.node_info h3').addClass('success')
                                         },6);
		}else{
			$('.node_info .progress').removeClass('progress-info');
			$('.node_info .progress').removeClass('progress-danger');
			$('.node_info .progress').removeClass('progress-success');
			$('.node_info h3').removeClass('danger');
			$('.node_info h3').removeClass('success');
			$('div.node_info_close').css('background', 'url(css/light/images/bx.png)');
			   setTimeout(function(){
			   	$('.node_info .progress').addClass('progress-info');
                                         },6);
		}
		$('.node_info table').wl_Chart();
		$('.node_info div.legend>div').css('background', 'none');
	});
	$('.img-drop').click(function() {
		$('.node_info').fadeOut(300);
		$(this).hide();
	});
	$('div.node_info_close').click(function() {
		$('.node_info').fadeOut(300);
		$('.img-drop').hide();
	});
	ct_node_expand();
});
function ct_node_expand(){ 
	$('tr.contracted').children().children('div.node').append('<div class="nodetri" title="点击展开"></div>');   
	  $('div.nodetri').click(function(event) {
    	  event.stopPropagation();
               var $this = $(this).parent();
               var $tr = $this.closest("tr");
               if($tr.hasClass('contracted')){
                 $tr.removeClass('contracted').addClass('expanded');
                 $tr.nextAll("tr").css('visibility', '');
                 $tr.children().children('div.node').children('div.nodetri').hidden();
                 $node.removeClass('collapsed');
               }else{
                 $tr.removeClass('expanded').addClass('contracted');
                 $tr.nextAll("tr").css('visibility', 'hidden');
                 $node.addClass('collapsed');
               }
       	 });
}