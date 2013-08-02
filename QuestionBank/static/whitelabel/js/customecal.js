$(document).ready(function() {
	customcalEventCreate()	;
	createCalEventDetails();
	$('div.caldetails').draggable({ handle: "span.caltype-mark" });	
	$('span.calitem-content>input.date').wl_Date();	
	$('span.calitem-content>input.time').wl_Time();
	$('a.createnewset').click(function() {
		$('div.caldetails.caledit').fadeIn(300);
		$('div.caldetails-drop').show();
	});
	$('div.caldetails-drop').click(function() {
		$('div.caldetails').hide();
		$(this).hide();
	});
});
function customcalEventCreate(){
	 //////////////////////////cal/////////////////////////////////////////////////
		/* initialize the external events
		-----------------------------------------------------------------*/
		$('#external-events span.external-event').each(function() {
		
			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
			var eventObject = {
				title: $.trim($(this).text()),// use the element's text as the event title
				color: $.trim($(this).css("background-color")) 
			};
			
			// store the Event Object in the DOM element so we can get to it later
			$(this).data('eventObject', eventObject);
			
			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
			
		});
		$('div.selecttime').hide();
		$('button.confirm-cal').click(function() {
			$('div.selecttime').hide();
			 $.msg("安排成功！系统将提醒你按时完成",{live:3000});
		});
	
		/* initialize the calendar
		-----------------------------------------------------------------*/
		
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		$('div.drag-calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			eventSources: [

				{
					url: '/qb/events/0/', // Exercise
					color: 'yellow',    // an option!
					textColor: 'black'  // an option!
				},
				{
					url: '/qb/events/1/', // Quiz
					backgroundColor: 'rgb(185, 74, 72)',	
					borderColor:'rgb(185, 74, 72)'	
				},
				{
					url: '/qb/events/2/', // Study
					backgroundColor: '#468847',
					borderColor:'#468847'
				},
				{
					url: '/qb/events/3/', // Normal

				},
				{
					url: '/qb/events/4/', // Emergency
					backgroundColor: '#f89406',	
					borderColor:'#f89406'	
				},

			    ],
			editable: true,
			dropAccept: 'span.external-event,div.fc-event',
			droppable: true, // this allows things to be dropped onto the calendar !!!
			drop: function(date, allDay) { // this function is called when something is dropped
			
				// retrieve the dropped element's stored Event Object
				var originalEventObject = $(this).data('eventObject');
				
				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $.extend({}, originalEventObject);
				
				// assign it the date that was reported
				copiedEventObject.start = date;
				copiedEventObject.allDay = allDay;
				$(this).css("background",copiedEventObject.color);
				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('div.drag-calendar').fullCalendar('renderEvent', copiedEventObject, true);
				var a=$('div.drag-calendar').offset().top;
				var b=$('div.drag-calendar').offset().left;
				$('div.caldetails.caledit>span.caltype-mark').css("background-color",copiedEventObject.color);
				$('div.caldetails.caledit').css({
					top: a,
					left: b
				});
				var c=$.fullCalendar.formatDate(copiedEventObject.start, 'dd/MMM/yyyy' );
				var d=$.fullCalendar.formatDate(copiedEventObject.start, 'H:mm' );
				$('div.caldetails.caledit').find('span.caledit-start-time>input.date').val(c);
				$('div.caldetails.caledit').find('span.caledit-start-time>input.time').val(d);
				$('div.caldetails.caledit').show();
				 $('div.caldetails-drop').show();
				  $('div.caldetails-drop').click(function() {
					$(this).hide();
					$('div.caldetails.caledit').hide();
				});
				// is the "remove after drop" checkbox checked?
					// if so, remove the element from the "Draggable Events" list
					// $(this).remove();	
						
			},
			selectable:true,
			select:function( startDate, endDate, allDay, jsEvent, view ){
				var create=$('div.caldetails.caledit');
				create.show();
				create.css({
				 	top: jsEvent.pageY-100,
				 	left: jsEvent.pageX
				 });
				$('div.caldetails-drop').show();
				var b=$.fullCalendar.formatDate(startDate, 'dd/MMM/yyyy' );
				var c=$.fullCalendar.formatDate(endDate, 'dd/MMM/yyyy' );
				var d=$.fullCalendar.formatDate(startDate, 'H:mm' );
				var e=$.fullCalendar.formatDate(endDate, 'H:mm' );
				create.find('span.caledit-start-time>input.date').val(b);
				create.find('span.caledit-end-time>input.date').val(c);
				create.find('span.caledit-start-time>input.time').val(d);
				create.find('span.caledit-end-time>input.time').val(e);
				 $('div.caldetails-drop').click(function() {
					$(this).hide();
					$('div.caldetails.caledit').hide();
				});
			},
			 eventClick: function(calEvent, jsEvent, view) {
			 	var detail=$('div.caldetails.calevent');
				 detail.children('span.caltitle').text(calEvent.title);
				 detail.css({
				 	top: jsEvent.pageY+15,
				 	left: jsEvent.pageX
				 });
				 var color=$(this).css("background-color");
				  //$(this).css('box-shadow', 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 15px '+color);
 				 detail.children('span.caltype-mark').css('background-color', color);
				 detail.fadeIn(100);
				 $('div.caldetails-drop').show();
				 $('div.caldetails-drop').click(function(e) {
					$(this).hide();
					$('div.caldetails.calevent').hide();
					$('div.caldetails.caledit').hide();
				});
			},
			 eventMouseover: function(calEvent, jsEvent, view) {
			 	var note=$('div.do-problem-note.notes');
			 	 var color=$(this).css("background-color");
			 	  if ($(this).css("background-color")=='rgb(188, 232, 241)') {
			 	 	 note.css("background","url(images/note5.png)");
			 	 };
			 	 if ($(this).css("background-color")=='rgb(58, 135, 173)') {
			 	 	 note.css("background","url(images/note5.png)");
			 	 };
			 	  if ($(this).css("background-color")=='rgb(70, 136, 71)') {
			 	 	 note.css("background","url(images/note1.png)");
			 	 };
			 	   if ($(this).css("background-color")=='rgb(185, 74, 72)') {
			 	 	 note.css("background","url(images/note4.png)");
			 	 };
			 	   if ($(this).css("background-color")=='rgb(248, 148, 6)') {
			 	 	 note.css("background","url(images/note3.png)");
			 	 };
			 	   if ($(this).css("background-color")=='rgb(153, 153, 153)') {
			 	 	 note.css("background","url(images/note0.png)");
			 	 };
				  $(this).css('box-shadow', 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 3px 2px 10px 0px '+color);
				   note.css({
				 	top: jsEvent.pageY,
				 	left: jsEvent.pageX
				 });
				   var a=$.fullCalendar.formatDate(calEvent.start, 'dd/MMM/yyyy H:mm' );
				   var b=$.fullCalendar.formatDate(calEvent.end, 'dd/MMM/yyyy H:mm' );
				   var c=$.fullCalendar.formatDate(calEvent.start, 'dd/MMM/yyyy' );
				   var d=$.fullCalendar.formatDate(calEvent.end, 'dd/MMM/yyyy' );
				   note.children('h4').text(calEvent.title);
				   if (calEvent.end===null) {
				   	note.children('h6').text(a);
				   };
				   if (calEvent.end!==null) {
				   	note.children('h6').text(a+'~'+b);
				   };	
				   if (calEvent.allDay) {
				   	note.children('h6').text(a);
				   };   
				   if (calEvent.allDay&&calEvent.end===null) {
				   	note.children('h6').text(c);
				   };    
				    if (calEvent.allDay&&calEvent.end!==null) {
				   	note.children('h6').text(c+'~'+d);
				   };    
				  note.fadeIn(200);
			 },
			 eventMouseout: function(calEvent, jsEvent, view) {
				  $(this).css('box-shadow', 'none');
				  $('div.do-problem-note.notes').hide();
			 }
		});
}
function createCalEventDetails(){
	// from info
	$('div.caldetails.calevent>button').click(function() {
	var a=$(this).parent().css('top');
	var b=$(this).parent().css('left');
	var c=$('div.caldetails>span.caltitle').text();
	var d=$('div.caldetails>span.caltype-mark').css("background-color");
	$('div.caldetails.caledit').css({
		top: a,
		left: b
	});
	$('div.caldetails.caledit').find('span.caledit-name input').val(c);
	$('div.caldetails.caledit').find('span.caltype-mark').css('background-color', d);
	$(this).parent().slideUp(100);
	$('div.caldetails.caledit').slideDown(100);
	});
	// Repeat
	$('.caledit-end-repeating-time').hide();
	$('span.caledit-repeating-time>input').bind('focus', function() {
		$(this).parent().children('ul.do-dropdown').slideDown();
	});
	$('span.caledit-repeating-time>input').bind('blur', function() {
		$(this).parent().children('ul.do-dropdown').slideUp();
	});
	$('span.caledit-repeating-time>ul.do-dropdown a').click(function() {
		var a=$(this).text();
		$(this).parent().parent().parent().children('input').val(a);
		$('.caledit-end-repeating-time').show();
	});
	$('span.caledit-repeating-time>ul.do-dropdown a.calno-repeat').click(function() {
		$('.caledit-end-repeating-time').hide();
	});
	// remider
	$('.calremind2').hide();
	$('span.calremind>input,span.calremind2>input').bind('focus', function() {
		$(this).parent().children('ul.do-dropdown').slideDown();
	});
	$('span.calremind>input,span.calremind2>input').bind('blur', function() {
		$(this).parent().children('ul.do-dropdown').slideUp();
	});
	$('span.calremind>ul.do-dropdown a').click(function() {
		var a=$(this).text();
		$(this).parent().parent().parent().children('input').val(a);
		$('.calremind2').show();
	});
	$('span.calremind>ul.do-dropdown a.calno-reminder').click(function() {
		$('.calremind2').hide();
	});
	$('span.calremind2>ul.do-dropdown a').click(function() {
		var a=$(this).text();
		$(this).parent().parent().parent().children('input').val(a);
	});
	$('div.caldetails.caledit>button.calallday').toggle(function() {
		$('div.caldetails.caledit input.time').hide();
		$(this).text("全天: 否");
	}, function() {
		$('div.caldetails.caledit input.time').show();
		$(this).text("全天: 是");
	});
	// type
	$('span.caledit-type>input').bind('focus', function() {
		$(this).parent().children('ul.do-dropdown').slideDown();
	});
	$('span.caledit-type>input').bind('blur', function() {
		$(this).parent().children('ul.do-dropdown').slideUp();
	});
	$('span.caledit-type>ul.do-dropdown a').click(function() {
		var a=$(this).text();
		$(this).parent().parent().parent().children('input').val(a);
		var b=$(this).css('background-color');
		$(this).parent().parent().parent().parent().children('span.caltype-mark').css('background-color', b);
	});
	$('div.caldetails.caledit>button.calnew').click(function(){
		$(this).parent().fadeOut(200);
	});
}
