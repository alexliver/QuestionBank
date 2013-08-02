function my_callback(data){
    if(data.message=='save'){
		$.msg('已保存',{live:3000});
	}else if(data.message == 'delete'){
		$.msg('已删除',{live:3000});
	}else if(data.message == 'addword'){
		$.msg("加入生词本成功！",{live:3000});
		$('#'+data.word_id).removeClass('notadd');
        $('#'+data.word_id).children('i').attr('class', 'icon-ok-circle');
        $('#'+data.word_id).unbind('click');
	}
	else{
    	$.msg(data.message,{live:3000});
	}
}

function note_saved(data){ 
	if(data.message=='save'){
		$.msg('已保存',{live:3000});
	}else{
		$.msg('Error',{live:3000});
	}
	$('#noteid').val(data.note_id);
}

function redirect_callback(data){
	if(data.message=='200'){
		$.msg('转跳',{live:3000});
		window.location.href=data.redirect+'/';
	}else if(data.message=='300'){
		$.msg('已保存,转跳',{live:3000});
		window.location.href=data.redirect+'/';
	}else{
		$.msg(data.message,{live:3000});
	}

}

function event_callback(data){
	my_callback(data);
	$('div.drag-calendar').fullCalendar( 'refetchEvents' );
}

function submitquestion(){
	document.getElementById("questionform").submit();
}

function confirmNewSubset(){
	$('div.modal-setdetail.addsection').hide();
	$('div.modal-drop.addsection').hide();
	Dajaxice.Problem.new_subset(Dajax.process,{'subsetform':$('#newsubset').serialize(true)});			
}
