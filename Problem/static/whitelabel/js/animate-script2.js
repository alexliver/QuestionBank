$(document).ready(function() {
	///////////////////////////compatibility//////////////////////////
	 var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                      var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                      var deviceAgent = navigator.userAgent.toLowerCase();
                      var isiosdevice = deviceAgent.match(/(iphone|ipod|ipad)/);
                      if(isiosdevice){
                          $('div.modal-setdetail').resizable("destroy");
                             $('div.modal-setdetail').css("opacity","1");

                      };    
	// to be remove
	// var newcoverpic=Math.floor(Math.random()*36)+1;
	// $('div.info-setdetail-head img').attr("src","images/cover/cover"+newcoverpic+".png");
		
	// modified
	$('.treetable2').hide();
	$('table.info-reviewdistribution').wl_Chart();
	$('table.info-difficultydistribution').wl_Chart();
	$('table.info-knowleagedistribution').wl_Chart();
	// $('div.addset').draggable();
	// addtoset
	$('.addtosetbtn').click(function() {
		$.confirm('确认加入我的题集?');
		setTimeout(function(){
			$(this).parent().parent().children("div.resultlistitem").slideDown();		
		},5);
	});
	$('a.info-save').click(function() {
		$.confirm('确认保存?');
	});
		$('.deletequestion').click(function() {
		$.confirm('确认删除该题?');
	});
	$('a.modal-add').click(function() {
		$.confirm('确认添加题集?');
	});
	$('a.create-new').click(function() {
		$.confirm('确认创建题集?');
	});
	$('a.create-save').click(function() {
				$.msg("已保存！",{live:3000});
	});
		// addset
	$('.addtosetcontainer').hide();
	$('a.addsetbutton').click(function() {
	$('.addtosetcontainer').show(300);
	});
	// add set to modal
	$('a.modal-addto').click(function() {
		$('div.addset').appendTo("div.set-btngroup");
		$('div.set-btngroup>div.addset>div.addtosetcontainer').show(300);
	});
	//add set info
	$('a.info-addto').click(function() {
		$('div.addset').appendTo("div.info-btngroup");
		$('div.info-btngroup>div.addset>div.addtosetcontainer').show(300);
	});
	$('button.hideaddtoset').click(function() {
		$('div.choosesetoption').slideUp();
		$('.addtosetcontainer').hide(300);
		$("a.addtonew").html("+");
		$("a.addtonew").css("font-size","65px").css("padding","0 0 0 0")
	});
	$('div.choosesetoption').hide();
	$('a.addtonew').click(function() {
		$(this).html("填写新题集基本信息");
		$(this).css("font-size","16px").css("padding","30px 5px 0 5px")
		$('div.choosesetoption').slideDown();
	});
	$('button.canclenewset').click(function( ) {
			$('div.choosesetoption').slideUp();
			$("a.addtonew").html("+");
		$("a.addtonew").css("font-size","65px").css("padding","0 0 0 0")
	});
	$('button.createnewset').click(function() {
		$('div.choosesetoption').slideUp();
		$('.addtosetcontainer').hide(300);
		$("a.addtonew").html("+");
		$("a.addtonew").css("font-size","65px").css("padding","0 0 0 0")
		$.msg("创建成功，并已将题目加入新题集！",{live:3000});
	});
	$('a.addtoexsitingset').click(function() {
		$('div.choosesetoption').slideUp();
		$("a.addtonew").html("+");
		$("a.addtonew").css("font-size","65px").css("padding","0 0 0 0")
		$('.addtosetcontainer').hide(300);
		$.msg("已将题目加入题集！",{live:3000});

	});
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
		$('div.problemsetprogress').show().css("visibility","visiable");
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
		$('div.problemlist').css("opacity","1");
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
		$.msg("保存成功！",{live:3000});
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
		$.msg("创建成功！快分享给大家吧",{live:3000});
	});
	$('div.resultitemhandle').toggle(function() {
		$(this).parent().children("div.resultlistitem").slideUp();
			}, function() {
		$(this).parent().children("div.resultlistitem").slideDown();
	});
	
	// calendar
// 	setTimeout(function(){
// 	$('.fc-view>div ').attr("class","caleventcontainer");
// },50);
	$( "div.calsetcontainer>span" ).draggable();
    $( "table.weektable td" ).droppable({
      drop: function( event, ui ) {
      $.msg("安排成功！系统将提醒你按时完成",{live:3000});
      }
    });
    //   $( ".fc-border-separate td>div" ).droppable({
    //   drop: function( event, ui ) {
    //   $.msg("创建成功！快分享给大家吧",{live:3000});
    //   }
    // });
 
	// info-tree-clue
	$('div.alertaterdetail').hide();
	$('div.clue-tree').hide();
	$('a.clue-tree-link').click(function() {
		$('div.clue-tree-link-container').addClass("fadeOutUp");
 		 setTimeout(function(){
 		$("div.clue-tree-link-container").hide();
 		$('div.alertaterdetail').show();
         $('div.clue-tree-link-container').removeClass("fadeOutUp");},700);
         $('div.clue-tree').show();
	});
	//info-problem-clue
	$('div.clue-problemlist').hide();
	$('a.clue-problemlist-link').click(function() {
		$('div.clue-problemlist-link-container').addClass("fadeOutUp");
 		 setTimeout(function(){
 		$("div.clue-problemlist-link-container").hide();
 		$('div.alertaterdetail').show();
         $('#informme').removeClass("fadeOutUp");},700);
         $('div.clue-problemlist').show();
	});
	$('div.problem-detail').hide();
	$('a.clue-problem-details.imcomplete').click(function() {
		$('div.problem-detail').show();
		$(this).addClass("active");
	});
	// info-clue-review
	$('div.clue-review').hide();
	$('a.clue-review-link').click(function() {
		$('div.clue-review-link-container').addClass("fadeOutUp");
 		 setTimeout(function(){
 		$("div.clue-review-link-container").hide();
 		$('div.alertaterdetail').show();
         $('div.clue-review-link-container').removeClass("fadeOutUp");},700);
         $('div.clue-review').show();
	});
	// night mode
	$('a.nightmode').toggle(function() {
		$('#themestyle').attr("href","css/dark/modified-theme.css");
		$(this).html("正常模式")
	}, function() {
		$('#themestyle').attr("href","css/light/modified-theme.css");
		$(this).html("夜间模式")
	});


	////////////////////////////////////////////////////////////////////////////
	var $content = $('#content');
	
		/*----------------------------------------------------------------------*/
		/* preload images
		/*----------------------------------------------------------------------*/
		
		//$.preload();
		
		/*----------------------------------------------------------------------*/
		/* Widgets
		/*----------------------------------------------------------------------*/
		
		$content.find('div.widgets').wl_Widget();
		/*----------------------------------------------------------------------*/
		/* All Form Plugins
		/*----------------------------------------------------------------------*/
		
		//Integers and decimals
		$content.find('input[type=number].integer').wl_Number();
		$content.find('input[type=number].decimal').wl_Number({decimals:2,step:0.5});
		
		//Date and Time fields
		$content.find('input.date, div.date').wl_Date();
		$content.find('input.time').wl_Time();
		
		//Autocompletes (source is required)
		$content.find('input.autocomplete').wl_Autocomplete({
			source: ["ActionScript","AppleScript","Asp","BASIC","C","C++","Clojure","COBOL","ColdFusion","Erlang","Fortran","Groovy","Haskell","Java","JavaScript","Lisp","Perl","PHP","Python","Ruby","Scala","Scheme"]
		});
		
		//Elastic textareas (autogrow)
		$content.find('textarea[data-autogrow]').elastic();
		//WYSIWYG Editor
		$content.find('textarea.html').wl_Editor();
		
		//Validation
		$content.find('input[data-regex]').wl_Valid();
		$content.find('input[type=email]').wl_Mail();
		$content.find('input[type=url]').wl_URL();

		//File Upload
		$content.find('input[type=file]').wl_File();

		//Password and Color
		$content.find('input[type=password]').wl_Password();
		$content.find('input.color').wl_Color();
		
		//Sliders
		$content.find('div.slider').wl_Slider();
		
		//Multiselects
		$content.find('select[multiple]').wl_Multiselect();
		
		//The Form is called for the demo with options on line 497
		//$content.find('form').wl_Form();
		
		/*----------------------------------------------------------------------*/
		/* Alert boxes
		/*----------------------------------------------------------------------*/
		
		$content.find('div.alert').wl_Alert();
		
		/*----------------------------------------------------------------------*/
		/* Breadcrumb
		/*----------------------------------------------------------------------*/
		
		$content.find('ul.breadcrumb').wl_Breadcrumb();
		
		/*----------------------------------------------------------------------*/
		/* datatable plugin
		/*----------------------------------------------------------------------*/
		
		$content.find("table.datatable").dataTable({
			"sPaginationType": "full_numbers"
		});
		
		/*----------------------------------------------------------------------*/
		/* uniform plugin && checkbox plugin (since 1.3.2)
		/* uniform plugin causes some issues on checkboxes and radios
		/*----------------------------------------------------------------------*/
		
		$("select, input[type=file]").not('select[multiple]').uniform();
		$('input:checkbox, input:radio').checkbox();
		
		/*----------------------------------------------------------------------*/
		/* Charts modified
		/*----------------------------------------------------------------------*/

		$content.find('table.treetable1').wl_Chart({
			onClick: function(value, legend, label, id){
				$(".progresstree").wl_Breadcrumb("next");
				$('.treename1').html(label);
				$('.progresshandle').text(label);
				// $(this).attr("class","chart treetable2");
				// changedata
				//for 几何
				if (label=="几何") {
				$content.find('table.treetable1').wl_Chart({
				xlabels:['Sin', 'Cos', 'Tan', 'Cot', 'Sinh', 'Cosh'],
				data:[{
	label:'完成',
	data:[[0,18],[1,73],[2,75],[3,35],[4,21],[5,53]]
},{
	label:'未完成',
	data:[[0,82],[1,27],[2,25],[3,65],[4,79],[5,47]]
}]
});
				};
				//for 高数
				if (label=="高数") {
				$content.find('table.treetable1').wl_Chart({
				xlabels:['高数啥说啥', '高数啥说啥', '高数啥说啥', '高数啥说啥', '高数啥说啥', '高数啥说啥'],
				data:[{
	label:'完成',
	data:[[0,18],[1,73],[2,75],[3,35],[4,21],[5,53]]
},{
	label:'未完成',
	data:[[0,82],[1,27],[2,25],[3,65],[4,79],[5,47]]
}]
});
				};

				// $.msg("value is "+value+" from "+legend+" at "+label+" ("+id+")",{header:'Custom Callback'});
			}
		});
		// advanced tree modified
		$content.find('table.atreetable1').wl_Chart({
			onClick: function(value, legend, label, id){
				$(".aprogresstree").wl_Breadcrumb("next");
				$('.atreename1').html(label);
				$("table.atreetable2").wl_Chart();				
				// $(this).attr("class","chart treetable2");
				// $.msg("value is "+value+" from "+legend+" at "+label+" ("+id+")",{header:'Custom Callback'});
			}
		});
		$('.treetab2').click(function() {
			$('ul.progressgroupbutton>li>button').attr("class","treetab2");
			$(this).attr("class","active treetab2");
			$content.find('table.atreetable2').wl_Chart({
				xlabels:['高数啥说啥', '高数啥说啥', '高数啥说啥', '高数啥说啥', '高数啥说啥', '高数啥说啥'],
				data:[{
	label:'完成',
	data:[[0,18],[1,73],[2,75],[3,35],[4,21],[5,53]]
},{
	label:'未完成',
	data:[[0,82],[1,27],[2,25],[3,65],[4,79],[5,47]]
}]
});
		});
		//english
		$content.find('table.treetable1e').wl_Chart({
			onClick: function(value, legend, label, id){
				$(".progresstreee").wl_Breadcrumb("next");
				$('.treename1e').html(label);
				$('.progresshandle').text(label);
				if (label=="单词") {
				$content.find('table.treetable1e').wl_Chart({
				xlabels:['Sin', 'Cos', 'Tan', 'Cot', 'Sinh', 'Cosh'],
				data:[{
	label:'完成',
	data:[[0,18],[1,73],[2,75],[3,35],[4,21],[5,53]]
},{
	label:'未完成',
	data:[[0,82],[1,27],[2,25],[3,65],[4,79],[5,47]]
}]
});
				};
				//for 语法
				if (label=="语法") {
				$content.find('table.treetable1e').wl_Chart({
				xlabels:['语法啥说啥', '语法啥说啥', '语法啥说啥', '语法啥说啥', '语法啥说啥', '语法啥说啥'],
				data:[{
	label:'完成',
	data:[[0,18],[1,73],[2,75],[3,35],[4,21],[5,53]]
},{
	label:'未完成',
	data:[[0,82],[1,27],[2,25],[3,65],[4,79],[5,47]]
}]
});
				};

				// $.msg("value is "+value+" from "+legend+" at "+label+" ("+id+")",{header:'Custom Callback'});
			}
		});
		// advanced tree modified
		$content.find('table.atreetable1e').wl_Chart({
			onClick: function(value, legend, label, id){
				$(".aprogresstreee").wl_Breadcrumb("next");
				$('.atreename1e').html(label);
				$("table.atreetable2e").wl_Chart();				
				// $(this).attr("class","chart treetable2");
				// $.msg("value is "+value+" from "+legend+" at "+label+" ("+id+")",{header:'Custom Callback'});
			}
		});
		$('.treetab2e').click(function() {
			$('ul.progressgroupbutton>li>button').attr("class","treetab2e");
			$(this).attr("class","active treetab2e");
			$content.find('table.atreetable2e').wl_Chart({
				xlabels:['单词', '单词', '单词', '单词', '单词', '单词'],
				data:[{
	label:'完成',
	data:[[0,18],[1,73],[2,75],[3,35],[4,21],[5,53]]
},{
	label:'未完成',
	data:[[0,82],[1,27],[2,25],[3,65],[4,79],[5,47]]
}]
});
		});
		/*----------------------------------------------------------------------*/
		/* Fileexplorer
		/*----------------------------------------------------------------------*/

		$content.find('div.fileexplorer').wl_Fileexplorer();
		
		/*----------------------------------------------------------------------*/
		/* Calendar (read http://arshaw.com/fullcalendar/docs/ for more info!)
		/*----------------------------------------------------------------------*/
		
		$content.find('div.calendar').wl_Calendar({
			eventSources: [
					{
						url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic'
					},{
						events: [ // put the array in the `events` property
							{
								title  : 'Fixed Event',
								start  : '2012-02-01'
							},
							{
								title  : 'long fixed Event',
								start  : '2012-02-06',
								end    : '2012-02-14'
							}
						],
						color: '#f0a8a8',     // an option!
						textColor: '#ffffff' // an option!
					},{
						events: [ // put the array in the `events` property
							{
								title  : 'Editable',
								start  : '2012-02-09 12:30:00'
							}
						],
						editable:true,
						color: '#a2e8a2',     // an option!
						textColor: '#ffffff' // an option!
					}		
					// any other event sources...
			
				]
			});
		
		/*----------------------------------------------------------------------*/
		/* Gallery
		/*----------------------------------------------------------------------*/
		
		//defined for the demo on line 518
		//$content.find('ul.gallery').wl_Gallery();
		
		
		/*----------------------------------------------------------------------*/
		/* Tipsy Tooltip
		/*----------------------------------------------------------------------*/
		
		
		$content.find('input[title]').tipsy({
			gravity: function(){return ($(this).data('tooltip-gravity') || config.tooltip.gravity); },
			fade: config.tooltip.fade,
			opacity: config.tooltip.opacity,
			color: config.tooltip.color,
			offset: config.tooltip.offset
		});
		
		
		/*----------------------------------------------------------------------*/
		/* Accordions
		/*----------------------------------------------------------------------*/
		
		$content.find('div.accordion').accordion({
				collapsible:true,
				autoHeight:false
		});
		
		/*----------------------------------------------------------------------*/
		/* Tabs
		/*----------------------------------------------------------------------*/
		
		$content.find('div.tab').tabs({
				fx: {
					opacity: 'toggle',
					duration: 'fast'
				}	  
		});
		
		/*----------------------------------------------------------------------*/
		/* Navigation Stuff
		/*----------------------------------------------------------------------*/
		
		
		//Top Pageoptions
		$('#wl_config').click(function(){
			var $pageoptions = $('#pageoptions');
			if($pageoptions.height() < 200){
				$pageoptions.animate({'height':200});
				$(this).addClass('active');
			}else{
				$pageoptions.animate({'height':20});
				$(this).removeClass('active');
			}
			return false;
		});
		
		
		//Header navigation for smaller screens
		var $headernav = $('ul#headernav');
		
		$headernav.bind('click',function(){
			//if(window.innerWidth > 800) return false;
			var ul = $headernav.find('ul').eq(0);
			(ul.is(':hidden')) ? ul.addClass('shown') : ul.removeClass('shown');
		});
		
		$headernav.find('ul > li').bind('click',function(event){
			event.stopPropagation();
			var children = $(this).children('ul');
			
			if(children.length){
				(children.is(':hidden')) ? children.addClass('shown') : children.removeClass('shown');
				return false;
			}
		});
		
		//Search Field Stuff		
		var $searchform = $('#searchform'),
			$searchfield = $('#search'),
			livesearch = true;
		
		$searchfield
			.bind({
				'focus.wl': function(){
		   			$searchfield.select().parent().animate({width: '150px'},100);
				},
				'blur.wl': function(){
	   				$searchfield.parent().animate({width: '90px'},100);
					if(livesearch)$searchboxresult.fadeOut();
				}
		});
			
		//livesearch is active
		if(livesearch){
			
			$searchfield.attr('placeholder','搜索题集');
			
			var $searchboxresult = $('#searchboxresult'),
				searchdelay = 800,  //delay of search in milliseconds (prevent flooding)
				searchminimum = 3, //minimum of letter when search should start
				searchtimeout, searchterm, resulttitle;
			
			//insert the container if missing
			if(!$searchboxresult.length) $searchboxresult = $('<div id="searchboxresult"></div>').insertAfter('#searchbox');
			
			//bind the key event
			$searchfield
				.bind({
					'keyup.wl': function(event){
						
						//do nothing if the term hasn't change
						if(searchterm == $searchfield.val()) return false;
						
						//the current search value
						searchterm = $searchfield.val();
						
						//clear the old timeout and start a new one
						clearTimeout(searchtimeout);
						
						//stop if term is too short
						if(searchterm.length < searchminimum){
							$searchboxresult.fadeOut();
							$searchfield.removeClass('load');
							return false;
						}
						
	
						searchtimeout = setTimeout(function(){
							$searchfield.addClass('load');
							
							//get results with ajax
							$.post("search.php", { term: searchterm },
							 function(data){
								$searchfield.removeClass('load');
								//search value don't has to be too short
								if(searchterm.length < searchminimum){
									$searchboxresult.fadeOut();
									return false;
								}
								
								var count = data.length, html = '';
								
								//we have results
								if(count){
									for(var i = 0; i< count; i++){
										resulttitle = '';
										if(data[i].text.length > 105){
											resulttitle = 'title="'+data[i].text+'"';
											data[i].text = $.trim(data[i].text.substr(0,100))+'&hellip;';
										}
										html += '<li><a href="'+data[i].href+'" '+resulttitle+'>';
										if(data[i].img) html += '<img src="'+data[i].img+'" width="50">';
										html += ''+data[i].text+'</a></li>';
									}	
								//no result to this search term
								}else{
									html += '<li><a class="noresult">Nothing found for<br>"'+searchterm+'"</a></li>';
								}
								
								//insert it and show
								$searchboxresult.html(html).fadeIn();
								
							}, "json");
	
						},searchdelay);
					}
				});
		}
			
		$searchform
			.bind('submit.wl',function(){
				//do something on submit				
				var query = $searchfield.val();
			});
			
		
			
		
		//Main Navigation		
		var $nav = $('#nav');
			
		$nav.delegate('li','click.wl', function(event){
			var _this = $(this),
				_parent = _this.parent(),
				a = _parent.find('a');
			_parent.find('ul').slideUp('fast');
			a.removeClass('active');
			_this.find('ul:hidden').slideDown('fast');
			_this.find('a').eq(0).addClass('active');
			event.stopPropagation();
		});
		
		/*----------------------------------------------------------------------*/
		/* Helpers
		/*----------------------------------------------------------------------*/
		
		//placholder in inputs is not implemented well in all browsers, so we need to trick this		
		$("[placeholder]").bind('focus.placeholder',function() {
			var el = $(this);
			if (el.val() == el.attr("placeholder") && !el.data('uservalue')) {
				el.val("");
				el.removeClass("placeholder");
			}
		}).bind('blur.placeholder',function() {
			var el = $(this);
			if (el.val() == "" || el.val() == el.attr("placeholder") && !el.data('uservalue')) {
				el.addClass("placeholder");
				el.val(el.attr("placeholder"));
				el.data("uservalue",false);
			}else{
			
			}
		}).bind('keyup.placeholder',function() {
			var el = $(this);
			if (el.val() == "") {
				el.data("uservalue",false);
			}else{
				el.data("uservalue",true);
			}
		}).trigger('blur.placeholder');

		
		
/*-----------------------------------------------------------------------------------------------------------------------------*/
/* 		Following code is for the Demonstration only!
/*		Get inspired and use it further or just remove it!
/*-----------------------------------------------------------------------------------------------------------------------------*/
		
		
		
		
		/*----------------------------------------------------------------------*/
		/* Callback for Slider
		/*----------------------------------------------------------------------*/
			$content.find('div.slider#slider_callback').wl_Slider({
				onSlide:function(value){
					$('#slider_callback_bar').width(value+'%').text(value);
				}													  
			});
		
		/*----------------------------------------------------------------------*/
		
		
		
		/*----------------------------------------------------------------------*/
		/* Rangeslider area how to
		/* http://revaxarts-themes.com/whitelabel/doc-sliders.html
		/*----------------------------------------------------------------------*/
		
			$content.find('div.slider#slider_mousewheel').wl_Slider({
				onSlide:function(values){
					var _this = $('#slider_mousewheel'),
						_handler = _this.find('a');
						_h1 = _handler.eq(0).offset(),
						_h2 = _handler.eq(1).offset(),
						value = _h1.left+(_h2.left-_h1.left)/2-_this.offset().left+5;
					$('#slider_mousewheel_left').width(value);
					$('#slider_mousewheel_right').width(_this.width()-value);
				}													  
			});
			$('#slider_mousewheel_left, #slider_mousewheel_right').bind('mousewheel',function(event,delta){
				event.preventDefault();
				$.alert('Use the Slider above!\nThis is just for visualisation');														
			});
		
		/*----------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		/* Button to clear localStorage
		/* http://revaxarts-themes.com/whitelabel/widgets.html
		/*----------------------------------------------------------------------*/
		
			$content.find('.clearLocalStorage').bind('click',function(){
				var wl_Store = new $.wl_Store();
				if(wl_Store.flush()){
					$.msg("LocalStorage as been cleared!");
				};
				return false;
			});
		
		/*----------------------------------------------------------------------*/
		
		/*----------------------------------------------------------------------*/
		/* needed for the Store Documentation
		/* http://revaxarts-themes.com/whitelabel/doc-store.html
		/*----------------------------------------------------------------------*/
			
			$content.find('#save_store').bind('click',function(){
				$.prompt('Storing some values?','This text is for the storage',function(value){
					var wl_Store = new $.wl_Store('doc-store');
					if(wl_Store.save('testvalue', value)){
						$.msg('Your data has been saved!. You can reload the page now!',{live:10000});
					}else{
						$.msg('Sorry, but a problem while storing your data occurs! Maybe your browser isn\'t supported!',{live:10000});
					}
				});
			});
			
			$content.find('#restore_store').bind('click',function(){
				var wl_Store = new $.wl_Store('doc-store');
				var value = wl_Store.get('testvalue');
				if(value){
					$.alert('your value is:\n'+value);
				}else{
					$.alert('No value is set!');
				}
			});
		
		/*----------------------------------------------------------------------*/
		
		/*----------------------------------------------------------------------*/
		/* Confirm Box for the Form Filler
		/* http://revaxarts-themes.com/whitelabel/form.html
		/*----------------------------------------------------------------------*/
		
			$('#formfiller').click(function(){
				var _this = this;
				$.confirm('To fill a form with your data you have to add a query string to the location.\nhttp://domain.tld/path?key=value&key2=value2',function(){
					window.location.href = _this.href;
				});
				return false;
			});
			
		/*----------------------------------------------------------------------*/
		/* Toggle to nativ/ajax submit
		/* http://revaxarts-themes.com/whitelabel/form.html
		/*----------------------------------------------------------------------*/
		
			$('#formsubmitswitcher').click(function(){
				var _this = $(this);
				if(_this.text() == 'send form natively'){
					$content.find('form').wl_Form('set','ajax',false);
					$.msg('The form will now use the browser native submit method');
					_this.text('send form with ajax');
				}else{
					$content.find('form').wl_Form('set','ajax',true);
					$.msg('The form will now be sent with an ajax request');
					_this.text('send form natively');
				}
				return false;
			});
					
		/*----------------------------------------------------------------------*/


		/*----------------------------------------------------------------------*/
		/* add some Callbacks to the Form
		/* http://revaxarts-themes.com/whitelabel/form.html
		/*----------------------------------------------------------------------*/
			
			$content.find('form').wl_Form({
				onSuccess: function(data, status){
					if(window.console){
						console.log(status);
						console.log(data);
					};
					$.msg("Custom Callback on success\nDevelopers! Check your Console!");
				},
				onError: function(status, error, jqXHR){
					$.msg("Callback on Error\nError Status: "+status+"\nError Msg: "+error);
				}
			});
		
		
		
		/*----------------------------------------------------------------------*/
		/* Gallery with some custom callbacks
		/* http://revaxarts-themes.com/whitelabel/gallery.html
		/*----------------------------------------------------------------------*/
		
			$content.find('ul.gallery').wl_Gallery({
				onEdit: function(el, href, title){
					if(href){
						$.confirm('For demonstration I use pixlr to edit images.\nDo you like to continue?',function(){
							window.open('http://pixlr.com/editor/?referrer=whitelabel&image='+escape(href)+'&title='+escape(title)+'');
						});
					}
				},									   
				onDelete: function(el, href, title){
					if(href){
						$.confirm('Do you really like to delete this?',function(){
							el.fadeOut();
						});
					}
				},									   
				onMove: function(el, href, title, newOrder){
				}									   
			
			});
		
		/*----------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		/* Message trigger buttons
		/* http://revaxarts-themes.com/whitelabel/dialogs_and_buttons.html
		/*----------------------------------------------------------------------*/
		
			$('#message').click(function(){
				$.msg("This is a simple Message");
			});
			$('#message_sticky').click(function(){
				$.msg("This Message will stay until you click the cross",{sticky:true});
			});
			$('#message_header').click(function(){
				$.msg("This is with a custom Header",{header:'Custom Header'});
			});
			$('#message_delay').click(function(){
				$.msg("This stays exactly 10 seconds",{live:10000});
			});
			$('#message_methods').click(function(){
				var m = $.msg("This message can be accessed via public methods",{sticky:true});
				
				//do some action with a delay
				setTimeout(function(){
					if(m)m.setHeader('Set a Header');				
				},3000);
				setTimeout(function(){
					if(m)m.setBody('Set a custom Body');				
				},5000);
				setTimeout(function(){
					if(m)m.setBody('..and close it with an optional callback function');				
				},8000);
				setTimeout(function(){
					if(m)m.close(function(){
						$.alert('This is the Callback function');				  
					});
				},12000);
			});
			

		/*----------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		/* Dialog trigger buttons
		/* http://revaxarts-themes.com/whitelabel/dialogs_and_buttons.html
		/*----------------------------------------------------------------------*/
		
			
			$('#dialog').click(function(){
				$.alert("This is a simple Message");
			});
			$('#dialog_confirm').click(function(){
				$.confirm("Do you really like to confirm this?",
				function(){
					$.msg("confirmed!");
				},
				function(){
					$.msg("You clicked cancel!");
				});
			});
			$('#dialog_prompt').click(function(){
				$.prompt("What do you really like?","Pizza",
				function(value){
					$.msg("So, you like '"+value+"'?");
				},
				function(){
					$.msg("You clicked cancel!");
				});
			});
			$('#dialog_switch').click(function(){
				if($.alert.defaults.nativ){
					$(this).text('switch to nativ dialogs');
				}else{
					$(this).text('switch to jQuery Dialogs');
				}
				$.alert.defaults.nativ = !$.alert.defaults.nativ;
			});
			$('#dialog_methods').click(function(){
				var a = $.alert("This message can be accessed via public methods");
				
				//do some action with a delay
				setTimeout(function(){
					if(a)a.setHeader('Set a Header');				
				},3000);
				setTimeout(function(){
					if(a)a.setBody('Set a custom Body');				
				},5000);
				setTimeout(function(){
					if(a)a.setBody('..and close it with an optional callback function');				
				},8000);
				setTimeout(function(){
					if(a)a.close(function(){
						$.msg('This is the Callback function');				  
					});
				},12000);
			});
			
		/*----------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		/* Breadcrumb Demos
		/* http://revaxarts-themes.com/whitelabel/breadcrumb.html
		/*----------------------------------------------------------------------*/
		
			$('#enablebreadcrumb').click(function(){
				$('ul.breadcrumb').eq(4).wl_Breadcrumb('enable');
				$.msg('enabled!');
			});
			$('#disablebreadcrumb').click(function(){
				$('ul.breadcrumb').eq(4).wl_Breadcrumb('disable');
				$.msg('disabled!');
			});
			
			$('ul.breadcrumb').eq(5).wl_Breadcrumb({
				onChange:function(element,id){
					$.msg(element.text()+' with id '+id);
				}
			});
		
		/*----------------------------------------------------------------------*/
	
		/*----------------------------------------------------------------------*/
		/* Helps to make current section active in the Mainbar
		/*----------------------------------------------------------------------*/
			
			var loc = location.pathname.replace(/\/([^.]+)\//g,'');
			var current = $nav.find('a[href="'+loc+'"]');
			
			if(current.parent().parent().is('#nav')){
				current.addClass('active');
			}else{
				current.parent().parent().parent().find('a').eq(0).addClass('active').next().show();
				current.addClass('active');
	
			}


		
		/*----------------------------------------------------------------------*/

});


/*----------------------------------------------------------------------*/
/* Autocomplete Function must be available befor wl_Autocomplete is called
/*----------------------------------------------------------------------*/

window.myAutocompleteFunction = function(){
	return ['Lorem ipsum dolor','sit amet consectetur adipiscing','elit Nulla et justo','est Vestibulum libero','enim adipiscing in','porta mollis sem','Duis lacinia','velit et est rhoncus','mattis Aliquam at','diam eu ipsum','rutrum tincidunt Etiam','nec porta erat Pellentesque','et elit sed sem','bibendum posuere Curabitur id','purus erat vel pretium','erat Ut ultricies semper','quam eu dignissim Cras sed','sapien arcu Phasellus sit amet','venenatis sapien Nulla facilisi','Curabitur ut','bibendum odio Fusce','vitae velit hendrerit','dui convallis tristique','eget nec leo','Vestibulum fermentum leo','ac rutrum interdum mauris','felis sodales arcu','non vehicula odio magna sed','tortor Etiam enim leo','interdum vitae elementum id','laoreet at massa Curabitur nisi dui','lobortis ut rutrum','quis gravida ut velit','Phasellus augue quam gravida non','vulputate vel tempus sit amet','nunc Proin convallis tristique purus'];
};

