$(document).ready(function() {
	$('.informbtn').click(function(event) {
		informIn()
	});
	$('.informsys_trigger').mouseenter(function(event) {
		informIn()
	});
	$('.informsys_trigger').mouseleave(function(event) {
		informOut()
	});
	$('.informsys_trigger').click(function(event) {
		 informOut()
	});
	$('.informsys').click(function(event) {
		event.stopPropagation();
	});
      $('a.informsys_section_link').click(function(event) {
        $('a.informsys_section_link').removeClass('active')
        $(this).addClass('active')
          var a=$(this).index()+1;
          for (var i = 1; i < 4; i++) {
                 $('.informsys_section'+i).hide();
          };
          $('.informsys_section'+a).fadeIn(200);
      });
	// list of msg  
             informSys.dialog.dialogSys($('a.info-save'),'已保存',5000);
             informSys.dialog.dialogSys($('button.create-new'),'创建成功！快分享给大家吧',5000);
             informSys.dialog.dialogSys($('button.edit-save'),'保存成功',5000);
             informSys.dialog.dialogSys( $("div.do-problem-note.notes>a#note-save"),'已保存',5000);
             informSys.dialog.dialogSys( $("div.do-problem-note.notes>a#note-new"),'可以开始编辑！',5000);
             informSys.dialog.dialogSys($('.vocab.explanation>span.notadd'),'加入生词本成功！',5000);
             informSys.dialog.dialogSys($('.do-vocab.addtovocab'),'加入生词本成功！',5000);
             informSys.dialog.dialogSys($('.cp_container div.do-btngroup a.cp_done'),'已保存',5000);
             informSys.dialog.dialogSys($('.cp_container div.do-btngroup a.cp_save'),'创建成功！',5000);
             informSys.dialog.dialogSys($('button.createnewset'),'创建成功，并已将题目加入新题集！',5000);
             informSys.dialog.dialogSys($('a.addtoexsitingset'),'已将题目加入题集！',5000);
	informSys.dialog.dialogSys($('.caldetails.caledit a.cusbtn.green'),'创建日程安排成功！',5000);
});
function informIn(){
	// TweenLite.to( $('.informsys'), 0.5, {opacity:1})  	
	$('section#content,header,div.topline,footer,nav').addClass('blurbg');
	$('.informsys_trigger').addClass('active');
	//  TweenLite.fromTo( $('.informsys_link:nth-child(even) .informsys_event'), 0.5, {opacity:0,right:-560}, {right:0,opacity:1,ease:Power1.easeOut})  	
	// TweenLite.fromTo( $('.informsys_link:nth-child(odd) .informsys_event'), 0.5, {opacity:0,left:-560}, {left:0,opacity:1,ease:Power1.easeOut})  	 
}
function informOut(){
	// TweenLite.to( $('.informsys'), 0.5, {opacity:0})  	
	// TweenLite.fromTo( $('.informsys_link:nth-child(even) .informsys_event'), 0.5, {opacity:0,right:0}, {right:-560,opacity:1,ease:Power1.easeOut})  	
	// TweenLite.fromTo( $('.informsys_link:nth-child(odd) .informsys_event'), 0.5, {opacity:0,left:0}, {left:-560,opacity:1,ease:Power1.easeOut})  
	$('section#content,header,div.topline,footer,nav').removeClass('blurbg');
	$('.informsys_trigger').removeClass('active');	 	
}
////////////////////////////////////////////////////////////////////////inform sys///////////////////////////////////////////////////////////////////////////////////////
var informSys = function () {
    $.extend(this, informSys.defaultOptions);
};
informSys.dialog={
      dialogSysN:function(msg,livetime){
            var a=informSys.dialog.createDialog(msg,'sys');
            a.appendTo($('body'));
            a.click(function(event) {
                informIn();
                $(this).remove();
            });
            informSys.dialog.informDialogIn(a);
            informSys.dialog.removeDialog(livetime,a);
    },
     dialogSysOne:function(link,msg,livetime){
      link.click(function(event) {
        var a=informSys.dialog.createDialog(msg,'sys');
        a.appendTo($('body'));
        a.click(function(event) {
          informIn();
          $(this).remove();
        });
        informSys.dialog.informDialogIn(a);
        informSys.dialog.removeDialog(livetime,a);
             });
        $(this).unbind('click');    //shows only when first clicked
    },
    dialogSys:function(link,msg,livetime){
    	link.click(function(event) {
    		var a=informSys.dialog.createDialog(msg,'sys');
    		a.appendTo($('body'));
    		a.click(function(event) {
    			informIn();
    			$(this).remove();
    		});
    		informSys.dialog.informDialogIn(a);
    		informSys.dialog.removeDialog(livetime,a);
             });
    },
    dialogCal:function(link,msg,color,livetime){
    	link.click(function(event) {
    		var a=informSys.dialog.createDialog(msg,'cal');
    		$('informsys_event').addClass(color);
    		a.appendTo($('body'));
    		a.click(function(event) {
    			informIn();
    			$(this).remove();
    		});
    		informSys.dialog.informDialogIn(a);
    		informSys.dialog.removeDialog(livetime,a);
    	});
    },
    createDialog:function(msg,type){
            // <div class="inform_dialog_rope"></div><div class="inform_dialog_rope2"></div>
    	var a=$('<div class="informsys_dialog" title="点击打开通知中心"></div>');
    	var b=$('<div class="informsys_event"></div>');
    	var c=$('<p></p>');
    	var d=informSys.dialog.dialogType(type,msg);
    	informSys.dialog.assignColor(type,b);
    	d.appendTo(c);
    	c.appendTo(b);
    	b.appendTo(a);
      informSys.dialog.pushDialog(msg);
   	return a;
    },
    pushDialog:function(msg){
        var a=$('<a class="informsys_link" href=""></a>');
        var b=$('<div class="informsys_event blue"></div>');
        var c=$('<p>'+msg+'</p>');
        var d=$('<span class="right" title="点击查看">查看</span>');
        var e=$('<span>'+ informSys.dialog.systime()+'</span> ');
        d.appendTo(c);
        e.prependTo(c);
        c.appendTo(b);
        b.appendTo(a);
        a.prependTo($('.informsys_section3 .informsys_sys'));
        $('.informsys_section3 .informsys_sys .informsys_title').prependTo($('.informsys_section3 .informsys_sys'))
    },
    dialogType:function(type,msg){
    	if (type=='cal') {
    	     var a=$('<span class="inform_icon"><i class="icon-calendar"></i></span> <span> 2013.07.06 20:00~21:30 紧急 </span>参加某某生日派对<span class="right">20:00 系统提醒</span>')	
                 return a
    	};
    	if (type=='sys') {
    	     var a=$('<span class="inform_icon"><i class="icon-cogs"></i></span> <span>系统—'+informSys.dialog.systime()+' </span>'+msg+'<span class="right">打开通知中心</span>')	
    	     return a
    	};
    },
    removeDialog:function(livetime,item){
    	setTimeout(function(){
		item.remove();	
	},livetime);
    },
    assignColor:function(type,item){
    	if (type='sys') {
    		item.addClass('blue');
    	};
    },
     informDialogIn:function(item){
	 var tl = new TimelineMax(); 
	 $('.informsys_dialog').hide();
             tl.fromTo(item,0.5,{display:'block',top:-20,scale:0,opacity:0,ease:Power1.easeOut},{top:0,scale:1,opacity:1,ease:Power1.easeIn})
	 // tl.to(item,1,{display:'block',top:200,ease:Power1.easeOut}).to(item,0.2,{top:0,ease:Power1.easeIn});                                       
    },
    informDialogOut:function(item){
            
    },
    systime:function(){
    	 var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate()
	var year = currentTime.getFullYear()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
            var displayDate =(" "+month + ". " + day +" "+hours+": "+minutes);
            return displayDate
    }
}
informSys.defaultOptions = {

};