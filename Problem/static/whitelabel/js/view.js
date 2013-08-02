$(document).ready(function() {
	// modal
	//draggable
	$('div.modal-setdetail').draggable({ handle: ".modal-setdetail-head" });
	$('div.modal-setdetail').resizable({ handles: "e" });
	///////////////////////////////
	$('div.modal-drop').click(function() {
		$('div.modal-setdetail').hide();
		$(this).hide();
		$('div.set-btngroup>div.addset>div.addtosetcontainer').hide();
	});
	$('div.problemlist-problem').hide();
	$('a.problemlist-link').click(function() {
		var a=$(this).parent().index()+1;
		var b=(a+1)/2-1;
		$('div.problemlist-problem').eq(b).slideDown();
	});
	// $('div.problemsetprogress').hide();
	$('div.problemsetreview').hide();
	$('table.setprogress').wl_Chart();
	$('div.problemlist').hide();
	$('#problemlist').click(function() {
				setTimeout(function(){
		$('.knowleagedistribution').wl_Chart();
		$('.difficultydistribution').wl_Chart();
	},5);
		$('div.problemlist').show();
		// $('div.problemsetprogress').hide();
		// $('div.problemsetreview').hide();
		$(this).parent( ).addClass("active");
		$('#problemsetreview').parent( ).removeClass("active");
		$('#problemsetprogress').parent( ).removeClass("active");
	});
	$('#problemsetreview').click(function() {
		setTimeout(function(){
		$('.reviewdistribution').wl_Chart();
		},5);
		// $('div.problemlist').hide();
		// $('div.problemsetprogress').hide();
		$('div.problemsetreview').show();
		$(this).parent( ).addClass("active");
		$('#problemlist').parent( ).removeClass("active");
		$('#problemsetprogress').parent( ).removeClass("active");
	});
	$('#problemsetprogress').click(function() {
		setTimeout(function(){
		$('table.setprogress').wl_Chart();
		},5);
		
		// $('div.problemlist').hide();
		$('div.problemsetprogress').show();
		// $('div.problemsetreview').hide();
		$(this).parent( ).addClass("active");
		$('#problemsetreview').parent( ).removeClass("active");
		$('#problemlist').parent( ).removeClass("active");
	});
	// to start the modal
	$('div.modal-setdetail').hide();
	$('div.modal-drop').hide();
	$('div.result-info>button').click(function() {
		$('div.modal-setdetail').show();
		$('div.modal-setdetail-edit').hide();
	$('div.modal-drop').show();
	});
	// to start the modal for the photo view
	// to start the modal
	$('div.setphotoview>div.halfcol>div.halfcol>a.setphotoviewitem').click(function() {
		$('div.modal-setdetail').show();
		$('div.modal-drop').show();
		var a=$(this).children().children("img").attr("src");
		$('div.modal-setdetail-head>img').attr("src",a);
		$('div.modal-setdetail-edit').hide();
		setTimeout(function(){
		$('table.setprogress').wl_Chart();
		},5);
	});
	// list view
	$('a.listviewcover').click(function() {
		setTimeout(function(){
		$('.knowleagedistribution').wl_Chart();
		$('.difficultydistribution').wl_Chart();
	},5);
		$('div.problemlist').show();
		$('div.problemsetprogress').hide();
		$('div.problemsetreview').hide();
		$("#problemlist").parent( ).addClass("active");
		$('#problemsetreview').parent( ).removeClass("active");
		$('#problemsetprogress').parent( ).removeClass("active");
		// outside modal
		$('div.modal-setdetail').show();
		$('div.modal-drop').show();
		var a=$(this).children("img").attr("src");
		$('div.modal-setdetail-head>img').attr("src",a);
		$('div.modal-setdetail-edit').hide();
	});
	$('a.checkreview').click(function() {
		$('div.modal-setdetail').show();
		$('div.modal-drop').show();
		var a=$('a.listviewcover').children("img").attr("src");
		$('div.modal-setdetail-head>img').attr("src",a);
		$('div.modal-setdetail-edit').hide();
		// inside modal
		setTimeout(function(){
		$('.reviewdistribution').wl_Chart();
		},5);
		$('div.problemlist').hide();
		$('div.problemsetprogress').hide();
		$('div.problemsetreview').show();
		$("#problemsetreview").parent( ).addClass("active");
		$('#problemlist').parent( ).removeClass("active");
		$('#problemsetprogress').parent( ).removeClass("active");
	});
	$('button.checktree').click(function() {
		$('div.modal-setdetail').show();
		$('div.modal-drop').show();
		var a=$('a.listviewcover').children("img").attr("src");
		$('div.modal-setdetail-head>img').attr("src",a);
		$('div.modal-setdetail-edit').hide();
		// inside modal
		$('table.setprogress').wl_Chart();
		$('div.problemlist').hide();
		$('div.problemsetprogress').show();
		$('div.problemsetreview').hide();
		$("#problemsetprogress").parent( ).addClass("active");
		$('#problemsetreview').parent( ).removeClass("active");
		$('#problemlist').parent( ).removeClass("active");
	});
	// view mode
	// $('div.setlistview').hide();
	// $('#photoview').click(function() {
	// 	$('div.setlistview').hide();
	// 	$('div.setpicview').show();
	// 	$(this).addClass("active");
	// 	$('#listview').removeClass("active");		
	// });
	// $('#listview').click(function() {
	// 	$('div.setlistview').show();
	// 	$('div.setpicview').hide();
	// 	$(this).addClass("active");
	// 	$('#photoview').removeClass("active");	
	// });
	$('div.setlistview').hide();
	$('#photoview').click(function() {
		 randomBoxIn();
		$('div.setlistview').hide();
		$('div.setpicview').show();
		$(this).addClass("active");
		$('#listview').removeClass("active");		
	});
	$('#listview').click(function() {
		 randomBoxOut();		
		 $(this).addClass("active");
		$('#photoview').removeClass("active");
		setTimeout(function(){
		$('div.setlistview').show();
		$('div.setpicview').hide();		
		},1200);	
	});
	// edit
	$('button.editset').click(function() {

		setTimeout(function(){
		$('button.edit-save').show();
		$('div.modal-edit-drop').show();
		$('div.modal-setdetail-edit').show();
		$('.modal-setdetail-details').hide();
		$('.modal-setdetail-body').hide();
		$('div.modal-drop').hide();
		$('.modal-setdetail').show();
	},5);
	});
	$('button.edit-save').hide();
	// edit
	$('.modal-edit').click(function() {
		$('button.edit-save').show();
		$('div.modal-edit-drop').show();
		$('div.modal-setdetail-edit').show();
		$('.modal-setdetail-details').hide();
		$('.modal-setdetail-body').hide();
		$('div.modal-drop').hide();
	});
	$('div.modal-edit-drop ').hide();
	$('div.modal-edit-drop ').click(function() {
		$('button.create-new').hide();
		$('button.edit-save').hide();
		$('div.modal-setdetail').hide();
		$('div.modal-edit-drop').hide();
		$('div.modal-drop').hide();
		$('.modal-setdetail-details').show();
		$('.modal-setdetail-body').show();
		$('div.modal-setdetail-head>span').show();
	});
	$('button.edit-save').click(function() {
		$(this).hide();
		$('.modal-setdetail-details').show();
		$('.modal-setdetail-body').show();
		$('.modal-setdetail-edit').hide();
	});
	// share
	$('div.modal-setdetail-body>div.shareset').hide();
	$('.modal-share').toggle(function() {
		$('div.modal-setdetail-body').css('height', '86px');
		$('div.modal-setdetail-body>div.shareset').show();		
	}, function() {	
		$('div.modal-setdetail-body').css('height', '44px');
		$('div.modal-setdetail-body>div.shareset').hide();
	});
	//createnewset
	$('button.create-new').hide();
	$('a.createnewset').click(function() {
		var a=Math.floor(Math.random()*36)+1;
		$('div.modal-setdetail-head>img').attr("src","images/cover/cover"+a+".png");
		$('div.modal-edit-drop').show();
		$('div.modal-setdetail-edit').show();
		$('.modal-setdetail-details').hide();
		$('.modal-setdetail-body').hide();
		$('div.modal-drop').hide();
		$('.modal-setdetail').show();
		$('button.create-new').show();
		$('div.modal-setdetail-head>span').hide();
	});
	$('button.create-new').click(function() {
		$('button.create-new').hide();
		$('button.edit-save').hide();
		$('div.modal-setdetail').hide();
		$('div.modal-edit-drop').hide();
		$('div.modal-drop').hide();
		$('.modal-setdetail-details').show();
		$('.modal-setdetail-body').show();
		$('div.modal-setdetail-head>span').show();
	});
	$('.addtosetbtn').click(function(event) {
		event.stopPropagation();
	});
	piDialog.prototype.dialog($('.addtosetbtn'),'确认加入我的题集?','d55');
});