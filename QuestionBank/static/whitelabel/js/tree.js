$(document).ready(function() {
	kTree.ct.toChoosed();
	kTree.ct.info();
	$(".knowledgetree").jOrgChart({
	            chartElement : '#chart',
	            dragAndDrop  : true
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
	  piDialog.prototype.dialog($('.jOrgChart .node a'),'','d125');
}
var kTree = function () {
    $.extend(this, kTree.defaultOptions);
};
kTree.ct={
	toChoosed:function(){
		$('.ct_info span').toggle(function() {
			$(this).addClass('choosed');
		}, function() {
			$(this).removeClass('choosed');
		});
		
	},
	info:function(){
		$('a.ct_info_link').click(function() {
			$('.ct_info_submit').show();
			TweenMax.fromTo($('.ct_info'),1, {opacity:0,rotationX:-210,display:'block',height:'auto'}, {opacity:1,rotationX:0,transformOrigin:"0% 0%", ease:Power2.easeOut})
			$('div.img-drop').show();
			$('.ct_info_submit').text('点击提交');
		});
		$('div.img-drop').click(function() {
			TweenMax.fromTo($('.ct_info'),1,{opacity:1,rotationX:0,transformOrigin:"0% 0%", ease:Power2.easeOut}, {opacity:0,rotationX:-210,height:'auto',display:'none'})
			$('.ct_info_submit').text('还未提交');
			$(this).hide();	
		});
		$('.ct_info_submit').click(function() {
			$('.ct_info').hide();
			$(this).text('已经提交');
		});
		$('.ct_info div.do-btngroup a').click(function() {
			var a=$(this).text();
			$('a.ct_info_level').text(a);
		});
		$('#nodename input').on('blur',function(){
			var a=$(this).val();
			$('a.ct_info_name').text(a);
			if (a=='命名') {
				$('a.ct_info_name').text('未命名');
			};
		});
	},
	clickTo:function(){
		$('.ct_unchoosed .ct_node>span').click(function() {
			var a=$(this).parent().parent().parent().children('.ct_choosed').children('.ct_node');
			$(this).appendTo(a);
			kTree.ct.clickBack();
			kTree.ct.dragBack();
		});
	},
	clickBack:function(){
		$('.ct_choosed .ct_node>span').click(function() {
			var a=$(this).parent().parent().parent().children('.ct_unchoosed').children('.ct_node');
			$(this).appendTo(a);
			kTree.ct.clickTo();
			kTree.ct.dragTo();
		});
	},
	dragTo:function(){
		$('.ct_unchoosed .ct_node>span').draggable({
				zIndex: 999,
				revert: true,     
				revertDuration: 0,
				drag: function( event, ui ) {
					$(this).unbind('click');
					var that=$(this);
					var thatid=$(this).attr("id");
					$( ".ct_choosed .ct_node" ).droppable({
					   accept: '.ct_unchoosed .ct_node>span',
					  drop: function( event, ui ) {
					   	that.remove();
					   	$('<span id='+thatid+'>'+that.text()+'</span>').appendTo($(this));
					   	kTree.ct.dragBack();	
					   	kTree.ct.clickBack();
					   }
					});
				}
		});			
	},
	dragBack:function(){
		$('.ct_choosed .ct_node>span').draggable({
				zIndex: 999,
				revert: true,     
				revertDuration: 0,
				drag: function( event, ui ) {
					$(this).unbind('click');
					var that=$(this);
					var thatid=$(this).attr("id");
					$( ".ct_unchoosed .ct_node" ).droppable({
					  	accept: '.ct_choosed .ct_node>span',
					 	drop: function( event, ui ) {
					   	that.remove();
					   	$('<span id='+thatid+'>'+that.text()+'</span>').appendTo($(this));	
						kTree.ct.dragTo();
						kTree.ct.clickTo();	
					}
				});
			}
		});	
	}
}
kTree.defaultOptions = {
};