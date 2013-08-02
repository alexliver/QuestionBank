/**
 * ...
 * @author Dominique Wong
 */

function ZensoriumTour() {
	
	// def
	var win;
	var doc;
	
	var sectionLength = [];
	var sectionIndex = [
			0 //home
			,.5 //color
			,1.5 //feature
			,2.7 //cardio
			,3.5 //index
			,4.5 //less is more
			,7.5 //share
			,8.5 //mobile
			,10 //mobility
		];
		
	// vars
	var that = this;
	var contentHeight;
	var contentWidth;
	var currentIndex = 0;
	var currentScroll;
	var currentScrollPercent;
	
	var tinkeColorIndex = 3;
	var paraContentIndex = -1;
	
	var productTween;
	var runningTween;
	var runningHeartTween;
	var runningCircleTween;
	
	var paraTweens = [];
	
	var index_arc;
	
	var logoOver = false;
	var navTopShown = true;
	var navBtmShown = true;
	
	var indexVitaShown = false;
	var indexZenShown = false;
	
	var numBadges;
	
	var runningMan;
	var isRunningMan = true;
	
	// divs
	var div_product;
	
	// tinke
	var div_tinke_light;
	var div_tinke_whole;
	var div_tinke_outline;
	
	var div_tinke_parts;
	var div_tinke_parts_cap_top;
	var div_tinke_parts_cap_btm;
	var div_tinke_parts_body;
	
	var div_hand;
	var div_colorselector;
	var div_featurehand;
	var div_featurehandthumb;
	var div_iphoneholder;
	var div_iphonescreens;
	
	var div_btm_nav;
	var div_logo;
	var div_top_nav;
	
	var div_para;
	var div_para_navs;
	var div_para_content;
	var div_para_wrapper;
	var div_para_scrollwrapper;
	var div_para_arrow_next;
	var div_para_arrow_prev;
	var div_para_close;
	
	var div_share_badges;
	var div_share_nodes;
	
	var div_running_man;
	var div_running_heart;
	
	var div_side_nav;
	var div_side_nav_btn;
	
	var div_index_vita;
	var div_index_vita_btn;
	
	var div_index_zenIndex;
	var div_index_zenIndex_btn;
	
	// functions
	var resetCSS;
	var resetTween;
	var getTweenPercent;
	var setTinkeColor;
	
	var openPara;
	var nextPara;
	var prevPara;
	var scrollParaTo;
	var checkParaArrow;
	var closePara;
	var closeParaComplete;
	
	var initParaTween;
	var startParaTween;
	var stopParaTween;
	
	
	var updateDialValue;
	
	var showTopNav;
	var hideTopNav;
	var showBtmNav;
	var hideBtmNav;
	
	var initIndex;
	var initBadges;
	var initLess;
	
	var updateSideNav;
	var resetSideNav;
	
	var getSectionScroll;
	
	var toggleIndexVita;
	
	var showRunningMan;
	var hideRunningMan;
	var runningGraphTweenComplete;
	
	var nextBtns;
	
	var infoTitle = ["heart rate", "blood oxygen level", "respiratory rate", "heart rate variability"];
	
	
	this.init = function () {
		//console.log('init');
		
		
		doc = $(document);
		
		win = $(window);
		win.bind('scroll', this.onWindowScroll );
		win.resize( this.onWindowResize );
		
		
		
		
		div_hand = $('#splash .hand_1');
		div_product = $('#product');
		div_iphoneholder = $('#iphone_wrapper');
		div_iphonescreens = $('#iphone .screen img');
		div_colorselector = $('#colorselector');
		div_featurehand = $('#featurehand');
		div_featurehandthumb = $('#featurehandthumb');
		
		nextBtns = $("a.btn_next_section");
		nextBtns.click(nextSection);
		nextBtns.css({cursor:"pointer"});
		
		div_tinke_light = $('#tinke_light');
		div_tinke_whole = $('#tinke_whole');
		div_tinke_outline = $('#tinke_outline');
		div_tinke_parts = $('#tinke_parts');
		
		div_tinke_parts_cap_top = $('#tinke_cap_top');
		div_tinke_parts_cap_btm = $('#tinke_cap_btm');
		div_tinke_parts_body = $('#tinke_body');
		
		
		div_para = $('#para');
		div_para_navs = $('#para a.btn');
		div_para_content = $('#para_content');
		div_para_wrapper = $('#para_content #wrapper');
		div_para_scrollwrapper = $('#para_content .scroll_wrapper');
		div_para_arrow_next = $('#para_content #arrow_next');
		div_para_arrow_prev = $('#para_content #arrow_prev');
		div_para_close = $('#para_content .btn_close');
		
		div_logo = $('#logowrapper');
		div_btm_nav = $('#bottomnavwrapper');
		div_top_nav = $('#topnav');
		
		div_share_badges = $('#share .badges');
		div_share_nodes = $('#share .nodes');
		
		
		div_running_man = $('#cardio .running #man ul');
		div_running_heart = $('#cardio .top .heart');
		div_running_circle = $('#cardio .top .circle');
		
		div_side_nav = $('#sidenav');
		div_side_nav_btn = $('#sidenav .indicator');
		
		div_index_vita = $('#indexes #vita_content');
		div_index_vita_btn = $('#indexes #vita .btn_more');
		
		div_index_zenIndex = $('#indexes #zen_content');
		div_index_zenIndex_btn = $('#indexes #zen .btn_more');
		
		div_index_vita_btn.css('cursor', 'pointer');
		div_index_vita_btn.click( function() { toggleIndexVita(); });
		div_index_zenIndex_btn.css('cursor', 'pointer');
		div_index_zenIndex_btn.click( function() { toggleIndexZen(); });
		
		
		//nav
		div_top_nav.click( function() { logoOver = true; showTopNav(); } );
		div_top_nav.mouseover( function() { logoOver = true; showTopNav(); } );
		div_top_nav.mouseout( function() { logoOver = false; hideTopNav(.5); } );
		div_logo.click( function() { logoOver = true; showTopNav(); } );
		div_logo.mouseover( function() { logoOver = true; showTopNav(); } );
		div_logo.mouseout( function() { logoOver = false; hideTopNav(.5); } );
		
		$('#splash .btn_down').css('cursor', 'pointer');
		$('#splash .btn_down').click( function() { that.scrollToSection(1); return false; } );
		/*
		div_side_nav_btn.each(
			function(index, item) {
				var jItem = $(item);
				//console.log(jItem);
				jItem.css('cursor', 'pointer');
				jItem.click(function() {
					scrollToSection(index);
					return false;
				});
			} 
		);
		*/
		$('.wrapper_sidenav').each(
			function(index, item) {
				var jItem = $(item);
				var btn = jItem.find('.indicator');
				var text = jItem.find('.text');
				
				text.css('opacity',0);
				text.css('visibility', 'hidden');
				text.css('display','none');
				btn.css('cursor', 'pointer');
				btn.click(function() {
					that.scrollToSection(index);
					return false;
				});
				btn.mouseover(function() {
						text.css('display','block');
						TweenMax.to(text, .5, { css:{autoAlpha:.8}, ease:Cubic.easeInOut });
				});
				btn.mouseout(function() {
						text.css('display','none');
						TweenMax.to(text, .5, { css:{autoAlpha:0}, ease:Cubic.easeInOut });
				});
				
			}
		);
		
		
		// para
		initParaTween();
		
		// indexes
		initIndex();
		
		// less is more
		initLess();
		
		// color selector
		div_colorselector.children().each(
			function(index, item) {
				var jItem = $(item);
				//console.log(jItem);
				jItem.click(function() {
					setTinkeColor(index);
					return false;
				});
			} 
		);
		
		
		
		//para
		div_para_close.click(
			function() {
				closePara();
				return false;
			}
		);
		div_para_navs.each(
			function(index, item) {
				var jItem = $(item);
				//console.log(jItem);
				jItem.click(function() {
					openPara(index);
					
					return false;
				});
			} 
		);
		div_para_arrow_next.click(
			function() {
				nextPara();
				return false;
			}
		);
		div_para_arrow_prev.click(
			function() {
				prevPara();
				return false;
			}
		);
		
		
		// running man
		runningMan = {};
		runningMan.myFrame = 0;
		runningMan.setFrame = function(val) {
			runningMan.myFrame = val;
			div_running_man.css('top', -Math.floor(val) * 325);
		}
		runningMan.getFrame = function() {
			return runningMan.myFrame;
		}
		
		runningTween = TweenMax.to(runningMan, 1, { setFrame:14, ease:Linear.easeNone, repeat:-1, useFrame:true }); 
		runningHeartTween = TweenMax.to(div_running_heart, .2, { css:{scaleX:.8, scaleY:.8}, ease:Cubic.easeInOut, yoyo:true, repeat:-1 }); 
		runningCircleTween = TweenMax.to(div_running_circle, 3, { css:{rotation:360}, ease:Linear.easeNone, repeat:-1 }); 
		hideRunningMan();
		
		$('body,html').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
		 if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
		  $("html,body").stop();
			TweenMax.killTweensOf($('html,body'));
		 }
		})
		
		this.onWindowResize();
	}
	showRunningMan = function() {
		if(isRunningMan) { return; }
		isRunningMan = true;
		//console.log('showRunningMan');
		runningTween.play();
		runningHeartTween.play();
		runningCircleTween.play();
		
		
		$('#cardio .bottom .graphs').children().each(
			function(index, item) {
				var jItem = $(item);
				runningGraphTweenComplete(jItem);
			}
		);
		
	}
	hideRunningMan = function() {
		if(!isRunningMan) { return; }
		isRunningMan = false;
		//console.log('hideRunningMan');
		runningTween.pause();
		runningHeartTween.pause();
		runningCircleTween.pause();
		
		
		$('#cardio .bottom .graphs').children().each(
			function(index, item) {
				var jItem = $(item);
				TweenMax.killTweensOf(jItem);
			}
		);
		
	}
	runningGraphTweenComplete = function(item) {
		var tarHeight = Math.random()*30;
		var duration = Math.abs(tarHeight-item.height())/50;
		TweenMax.to(item, duration, { css:{height:tarHeight},ease:Cubic.easeInOut, onComplete:runningGraphTweenComplete, onCompleteParams:[item] } );
	}
	
	this.onWindowScroll = function () {
		//console.log('onWindowScroll');
		
		currentScroll = win.scrollTop();
		
		if(currentScroll != 0) {
			hideTopNav(0);
			//showBtnNav();
		} else {
			showTopNav();
			//hideBtnNav(0);
		}
		updateBottomNav();
		// maxscroll = contentHeight * number of 100% content + footerheight(220) + paraheight(1000) - screenHeight
		var maxScroll = contentHeight*4 + 220 + 1000 - contentHeight;
		currentScrollPercent = currentScroll/maxScroll;
		//console.log(contentHeight + ' : ' + currentScroll + ' : ' + currentScroll/maxScroll);
		
		//productTween.seek(currentScrollPercent*6);
		var seek = getTweenPercent(currentScroll)
		/*
		console.log('seek ' + seek);
		console.log("currentScroll " + currentScroll);
		*/
		productTween.seek(seek);
		productTween.pause();
		
		
		updateSideNav(seek);
		
		if(currentIndex < 2 || currentIndex > 3) {
			hideRunningMan();
		} else {
			showRunningMan();
		}
		
		if(contentWidth < 960) {
			var setLeft = -(960-contentWidth)*.5
			$('#toplayer').css('left', -$(window).scrollLeft());
		}
		
		
	}
	this.onWindowResize = function () {
		contentHeight = win.height();
		contentWidth = win.width();
		
		
		//console.log('width : ' + contentWidth + "    ::    height :" + contentHeight);
		initBadges();
		
		resetCSS();
		
		resetTween();
		
		if(contentWidth < 960) {
			div_logo.css('left', 480);
		} else {
			div_logo.css('left', '50%');
			$('#toplayer').css('left', 0);
		}
		
		that.onWindowScroll();
	}
	
	
	updateSideNav = function (seek) {
		resetSideNav();
		var n = sectionIndex.length;
		for (var i=0;i<n-1;i++) {
			if(seek >= sectionIndex[i] && seek < sectionIndex[i+1]) {
				$(div_side_nav_btn[i]).addClass('active');
				return;
			}
		}
		
		$(div_side_nav_btn[n-1]).addClass('active');
	}
	resetSideNav = function() {
		div_side_nav_btn.each(
			function(index, item) {
				var jItem = $(item);
				jItem.removeClass('active');
			}
		);
	}
	initIndex = function () {
		var archtype = Raphael("polar", 222, 222);
		archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
			var alpha = 360 / total * value,
				a = (90 - alpha) * Math.PI / 180,
				x = xloc + R * Math.cos(a),
				y = yloc - R * Math.sin(a),
				path;
			if (total == value) {
				path = [
					["M", xloc, yloc - R],
					["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
				];
			} else {
				path = [
					["M", xloc, yloc - R],
					["A", R, R, 0, +(alpha > 180), 1, x, y]
				];
			}
			return {
				path: path
			};
		};
		index_arc = archtype.path().attr({
			"stroke": "#00aad2",
			"stroke-width": 21,
			arc: [110, 110, 0, 100, 100]
		});
		
		
		$('#indexes h4').html('0');
		index_arc.setArc = function(val) {
			index_arc.myArc = val;
			index_arc.attr({arc: [110, 110, val, 100, 100]});
			$('#indexes h4').html(Math.round(val));
		}
		index_arc.getArc = function() {
			return index_arc.myArc;
		}
	}
	
	//share badges
	initBadges = function () {
		var divWidth = contentWidth < 960 ? 960 : contentWidth;
		numBadges = Math.floor(divWidth*.5/60);
		
		div_share_badges.html('');
		
		var curIconIndex = 0;
		
		for (var i=0; i<numBadges; i++) {
			curIconIndex = i%5;
			div_share_badges.append('<img src="img/tour/share/badge_' + curIconIndex + '.png">');
		}
	}
	
	
	//less is more
	initLess = function() {
		var rollover = $('#design .less_rollover');
		
		rollover.each(
			function(index, item) {
				var jItem = $(item);
				var text = jItem.find('.less_text');
				var btn = jItem.find('.btn_more');
				
				text.css('opacity', 0);
				text.css('visibility','hidden');
				jItem.css('cursor', 'pointer');
				
				jItem.mouseover(
					function() {
						TweenMax.to(text, .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut });
						TweenMax.to(btn, .5, { css:{autoAlpha:0}, ease:Cubic.easeInOut });
					}
				);
				jItem.mouseout(
					function() {
						TweenMax.to(text, .5, { css:{autoAlpha:0}, ease:Cubic.easeInOut });
						TweenMax.to(btn, .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut });
					}
				);
			}
		);
	}
	
	
	// nav
	 function scrollToSection (index) {
		//console.log('scrollToSection ' + getSectionScroll(index));
		var duration = Math.abs(currentScroll - getSectionScroll(index))/300;
		duration = duration < 2 ? 2 : duration > 10 ? 10 : duration;
		TweenMax.to($('html,body'), duration, { scrollTop:getSectionScroll(index), ease:Cubic.easeOut, overwrite:'all' });
	}
	this.scrollToSection = scrollToSection;
	
	this.scrollToPosition = function(ypox) {
		var duration = Math.abs(currentScroll - ypox)/300;
		duration = duration < 2 ? 2 : duration > 10 ? 10 : duration;
		TweenMax.to($('html,body'), duration, { scrollTop:ypox, ease:Cubic.easeOut, overwrite:'all' });
	}
	showTopNav = function() {
		if(navTopShown) { return; }
		navTopShown = true;
		//TweenMax.to(div_top_nav, .5, { css:{ top:0 }, ease:Cubic.easeInOut, overwrite:'all' } );
		TweenMax.to(div_top_nav, .5, { css:{ height:173 }, ease:Cubic.easeInOut, overwrite:'all' } );
	}
	
	hideTopNav = function(delay) {
		if(!navTopShown) { return; }
		if(logoOver) { return; }
		if(currentScroll == 0) { return; }
		navTopShown = false;
		
		//TweenMax.to(div_top_nav, .5, { css:{ top:-45 }, ease:Cubic.easeInOut, delay:delay } );
		TweenMax.to(div_top_nav, .5, { css:{ height:.2 }, ease:Cubic.easeInOut, delay:delay } );
		
	}
	showBtmNav = function () {
		if(navBtmShown) { return; }
		navBtmShown = true;
		TweenMax.to(div_btm_nav, .5, { css:{ top:0 }, ease:Cubic.easeInOut, overwrite:'all' } );
	}
	hideBtmNav = function (delay) {
		if(!navBtmShown) { return; }
		navBtmShown = false;
		TweenMax.to(div_btm_nav, .5, { css:{ top:45 }, ease:Cubic.easeInOut, delay:delay } );
	}
	var updateBottomNav = function (tpos){
		var tlimit = $("#footer").offset().top  - $(window).height()  ;
		if (currentScroll >=tlimit) {
			 $("#bottomnav").css({bottom: currentScroll-tlimit-1 });
			// $("#toplayer").css({top: -(currentScroll-tlimit-1) });
			 $("#sidenav").css({top: -(currentScroll-tlimit-1) + contentHeight*.5});
		} else {
			$("#bottomnav").css({bottom: 0 });
			//$("#toplayer").css({top: 0 });
			 $("#sidenav").css({top:0 + contentHeight*.5});
		}
	}
	
	
	
	
	
	
	
	
	
	// para content
	
	openPara = function(setIndex) {
		console.log ("openPara", setIndex);
		paraContentIndex = setIndex;
		checkParaArrow();
		//console.log('openPara ' + setIndex );
		div_para.css('z-index', 100);
		div_para_content.css('z-index', 995);
		var tarLeft = -(setIndex) * contentWidth;
		
		div_para_scrollwrapper.css('left', tarLeft);
		paraTweens[setIndex].play();
		//div_para_scrollwrapper.click(function() { closePara() } );
		//TweenMax.to(div_para_scrollwrapper, 1, { css:{left:tarLeft}, ease:Cubic.easeInOut } )
		//var duration = contentWidth/1200;
		TweenMax.to(div_para_wrapper, 1, { css:{left:0}, ease:Cubic.easeInOut } )
		//infoTitle
		_gaq.push(["_trackEvent", "home", "view", infoTitle[setIndex], 1, true]);
	}
	closePara = function () {
		_gaq.push(["_trackEvent", "home", "close", infoTitle[paraContentIndex], 0, true]);
		paraTweens[paraContentIndex].pause();
		paraContentIndex = -1;
		//TweenMax.to(div_para_scrollwrapper, 1, { css:{left:contentWidth}, ease:Cubic.easeInOut, onComplete:closeParaComplete } )
		TweenMax.to(div_para_wrapper, 1, { css:{left:contentWidth}, ease:Cubic.easeInOut, onComplete:closeParaComplete } )
	}
	nextPara = function () {
		if(paraContentIndex >= 3) {
			return;
		}
		paraTweens[paraContentIndex].pause();
		scrollParaTo(paraContentIndex+1);
	}
	prevPara = function () {
		if(paraContentIndex <= 0) {
			closePara();
			return;
		}
		paraTweens[paraContentIndex].pause();
		scrollParaTo(paraContentIndex-1);
	}
	checkParaArrow = function () {
		if(paraContentIndex>=3) {
			div_para_arrow_next.css('visibility', 'hidden');
		} else {
			div_para_arrow_next.css('visibility', 'visible');
		}
	}
	scrollParaTo = function (setIndex) {
		paraContentIndex = setIndex;
		checkParaArrow();
		var tarLeft = -(setIndex) * contentWidth;
		paraTweens[setIndex].play();
		//var duration = Math.abs(div_para_scrollwrapper.position().left-tarLeft)/1200;
		TweenMax.to(div_para_scrollwrapper, 1, { css:{left:tarLeft}, ease:Cubic.easeInOut } )
		_gaq.push(["_trackEvent", "home", "view", infoTitle[setIndex], 1, true]);
	}
	closeParaComplete = function() {
		
		
		div_para.css('z-index', 100);
		div_para_content.css('z-index', 50);
		div_para_wrapper.css('left', contentWidth);
		div_para_scrollwrapper.css('left', contentWidth);
	}
	
	
	
	
	initParaTween = function() {
		paraTweens = [];
		
		var item;
		var mytween;
		
		
		//heart rate
		mytween = new TimelineMax({ pause:true, repeat:-1 });
		item = $('#para_content .img_hr .line_wrapper');
		mytween.insert( TweenMax.to(item, 0, { css:{width:0, left:345} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{width:274} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{width:0, left:345+274 } } ), 2 );
		
		item = $('#para_content .img_hr .line_wrapper2');
		mytween.insert( TweenMax.to(item, 0, { css:{left:0} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{left:-274 } } ), 2 );
		
		item = $('#para_content .img_hr .heart');
		mytween.insert( TweenMax.to(item, .2, { css:{scaleX:1, scaleY:1} } ), .8 );
		mytween.insert( TweenMax.to(item, .2, { css:{scaleX:.8, scaleY:.8} } ), 1 );
		mytween.insert( TweenMax.to(item, .2, { css:{scaleX:1, scaleY:1} } ), 1.8 );
		mytween.insert( TweenMax.to(item, .2, { css:{scaleX:.8, scaleY:.8} } ), 2 );
		mytween.insert( TweenMax.to(item, .2, { css:{scaleX:1, scaleY:1} } ), 2.8 );
		mytween.insert( TweenMax.to(item, .2, { css:{scaleX:.8, scaleY:.8} } ), 0 );
		
		mytween.pause();
		
		paraTweens.push(mytween);
		
		//blood oxygen level
		mytween = new TimelineMax({ pause:true, repeat:-1 });
		
		item = $('#para_content .img_oxy .pink');
		mytween.insert( TweenMax.to(item, 0, { css:{height:50} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:30} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:40} } ), 1 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:20} } ), 2 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:50} } ), 3 );
		
		item = $('#para_content .img_oxy .blue');
		mytween.insert( TweenMax.to(item, 0, { css:{height:35} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:55} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:25} } ), 1 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:45} } ), 2 );
		mytween.insert( TweenMax.to(item, 1, { css:{height:35} } ), 3 );
		
		mytween.pause();
		
		paraTweens.push(mytween);
		
		//respiratory rate
		mytween = new TimelineMax({ pause:true, repeat:-1 });
		
		item = $('#para_content .img_res .line_wrapper');
		mytween.insert( TweenMax.to(item, 0, { css:{width:0, left:332} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{width:274} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{width:0, left:332+278 } } ), 2 );
		
		item = $('#para_content .img_res .line_wrapper2');
		mytween.insert( TweenMax.to(item, 0, { css:{left:0} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{left:-278 } } ), 2 );
		
		item = $('#para_content .img_res .arrow_1');
		mytween.insert( TweenMax.to(item, 0, { css:{autoAlpha:0} } ), 0 );
		mytween.insert( TweenMax.to(item, 1.5, { css:{autoAlpha:1} } ), 0 );
		mytween.insert( TweenMax.to(item, 1.5, { css:{autoAlpha:0 } } ), 1.5 );
		item = $('#para_content .img_res .arrow_2');
		mytween.insert( TweenMax.to(item, 0, { css:{autoAlpha:1} } ), 0 );
		mytween.insert( TweenMax.to(item, 1.5, { css:{autoAlpha:0} } ), 0 );
		mytween.insert( TweenMax.to(item, 1.5, { css:{autoAlpha:1 } } ), 1.5 );
		
		mytween.pause();
		
		paraTweens.push(mytween);
		
		//heart rate variability
		mytween = new TimelineMax({ pause:true, repeat:-1 });
		
		item = $('#para_content .img_hrv .line_wrapper');
		mytween.insert( TweenMax.to(item, 0, { css:{width:0, left:332} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{width:274} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{width:0, left:332+278 } } ), 2 );
		
		item = $('#para_content .img_hrv .line_wrapper2');
		mytween.insert( TweenMax.to(item, 0, { css:{left:0} } ), 0 );
		mytween.insert( TweenMax.to(item, 1, { css:{left:-278 } } ), 2 );
		
		mytween.pause();
		
		paraTweens.push(mytween);
	}
	
	
	startParaTween = function(index) {
		
	}
	stopParaTween = function(index) {
		
	}
	
	
	
	
	
	
	// tinke color
	
	setTinkeColor = function(setIndex) {
		//console.log('setTinkeColor ' + setIndex );
		
		div_tinke_whole.children().each(
			function(index, item) {
				var jItem = $(item);
				if(index > 3) {
					jItem.css('z-index', 1);
					} else if(index == setIndex) {
					jItem.css('z-index', 20);
					TweenMax.to(jItem, .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } )
					} else {
					jItem.css('z-index', index+10);
					TweenMax.to(jItem, .5, { css:{autoAlpha:0}, ease:Cubic.easeInOut } )
				}
			} 
		);
		div_tinke_parts_cap_top.children().each(
			function(index, item) {
				var jItem = $(item);
				if(index > 3) {
					jItem.css('z-index', 1);
					} else if(index == setIndex) {
					jItem.css('z-index', 20);
					TweenMax.to(jItem, 0, { css:{autoAlpha:1}, ease:Cubic.easeInOut } )
					} else {
					jItem.css('z-index', index+10);
					TweenMax.to(jItem, 0, { css:{autoAlpha:0}, ease:Cubic.easeInOut } )
				}
			} 
		);
		div_tinke_parts_cap_btm.children().each(
			function(index, item) {
				var jItem = $(item);
				if(index > 3) {
					jItem.css('z-index', 1);
					} else if(index == setIndex) {
					jItem.css('z-index', 20);
					TweenMax.to(jItem, 0, { css:{autoAlpha:1}, ease:Cubic.easeInOut } )
					} else {
					jItem.css('z-index', index+10);
					TweenMax.to(jItem, 0, { css:{autoAlpha:0}, ease:Cubic.easeInOut } )
				}
			} 
		);
		div_tinke_parts_body.children().each(
			function(index, item) {
				var jItem = $(item);
				if(index > 3) {
					jItem.css('z-index', 1);
					} else if(index == setIndex) {
					jItem.css('z-index', 20);
					TweenMax.to(jItem, 0, { css:{autoAlpha:1}, ease:Cubic.easeInOut } )
					} else {
					jItem.css('z-index', index+10);
					TweenMax.to(jItem, 0, { css:{autoAlpha:0}, ease:Cubic.easeInOut } )
				}
			} 
		);
		
	}
	
	
	
	
	
	
	
	
	
	
	// indexes
	toggleIndexVita = function() {
		if(indexVitaShown) {
			indexVitaShown = false;
			TweenMax.to(div_index_vita, 1, { css:{height:55}, ease:Cubic.easeInOut } );
			div_index_vita_btn.css('background-image','url("img/common/btn_more_white.png")');
			_gaq.push(["_trackEvent", "home", "view", "vita index", 1, true ]);
			//console.log(div_index_vita_btn.offset().top);
		} else {
			indexVitaShown = true;
			TweenMax.to(div_index_vita, 1, { css:{height:180}, ease:Cubic.easeInOut } );
			div_index_vita_btn.css('background-image','url("img/common/btn_less.png")');
			_gaq.push(["_trackEvent", "home", "close", "vita index", 0, true]);
			
			//console.log((div_index_vita_btn.offset().top + 115) - (currentScroll+contentHeight));
			var offset = (div_index_vita_btn.offset().top + 115 + 100) - (currentScroll+contentHeight)
			if(offset > 0 ){
				that.scrollToPosition(currentScroll + offset);
			}
		}
	}
	
	toggleIndexZen = function() {
		if(indexZenShown) {
			indexZenShown = false;
			TweenMax.to(div_index_zenIndex, 1, { css:{height:65}, ease:Cubic.easeInOut } );
			div_index_zenIndex_btn.css('background-image','url("img/common/btn_more_white.png")');
			_gaq.push(["_trackEvent", "home", "view", "zen index", 1, true]);
			//console.log(div_index_vita_btn.offset().top);
		} else {
			indexZenShown = true;
			TweenMax.to(div_index_zenIndex, 1, { css:{height:245}, ease:Cubic.easeInOut } );
			div_index_zenIndex_btn.css('background-image','url("img/common/btn_less.png")');
			_gaq.push(["_trackEvent", "home", "close", "zen index", 0, true]);
			
			//console.log((div_index_vita_btn.offset().top + 115) - (currentScroll+contentHeight));
			var offset = (div_index_zenIndex_btn.offset().top + 115 + 100) - (currentScroll+contentHeight)
			if(offset > 0 ){
				that.scrollToPosition(currentScroll + offset);
			}
		}
	}
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	// tween
	
	resetCSS = function () {
		index_arc.setArc(0);
		
		div_featurehand.css('top', contentHeight+50);
		div_featurehandthumb.css('top', contentHeight+50);
		
		div_product.css('opacity', '1');
		div_product.css('visibility', 'visible');
		div_product.css('left', '128px');
		div_product.css('top', '245px');
		
		TweenMax.to(div_product, 0, { css:{scaleX:1, scaleY:1} } );
		
		div_colorselector.css('opacity', 0);
		
		div_iphoneholder.css('top', '-610px');
		div_iphoneholder.css('left', '600px');
		
		div_tinke_outline.css('opacity', 0);
		div_tinke_outline.css('visibility', 'hidden');
		
		div_tinke_light.css('opacity', 0);
		div_tinke_light.css('visibility', 'hidden');
		
		div_tinke_whole.css('opacity', '1');
		div_tinke_whole.css('visibility', 'visible');
		
		
		div_tinke_parts.css('opacity', 0);
		div_tinke_parts.css('visibility', 'hidden');
		
		div_tinke_parts_body.css('opacity', '1');
		div_tinke_parts_body.css('visibility', 'visible');
		
		div_tinke_parts_cap_top.css('top', '1px');
		div_tinke_parts_cap_top.css('opacity', '1');
		div_tinke_parts_cap_top.css('visibility', 'visible');
		
		div_tinke_parts_cap_btm.css('top', '300px');
		div_tinke_parts_cap_btm.css('opacity', 0);
		div_tinke_parts_cap_btm.css('visibility', 'hidden');
		
		div_side_nav.css('opacity', 0);
		div_side_nav.css('visibility', 'hidden');
		
		div_para_content.css('top', div_para.position().top);
		div_para_scrollwrapper.css('width', 4*contentWidth);
		
		div_hand.css('left', '0px');
		
		
		div_btm_nav.css('top', '45px');
		
		var tarLeft = -paraContentIndex * contentWidth;
		TweenMax.killTweensOf(div_para_scrollwrapper);
		if(paraContentIndex == -1) {
			closeParaComplete();
		}
		div_para_scrollwrapper.css('left', tarLeft);
		
		
		div_share_nodes.css('opacity', 0);
		div_share_nodes.css('visibility', 'hidden');
		
		div_share_badges.children().each(
			function(index, item) {
				var jItem = $(item);
				jItem.css('visibility', 'hidden');
				jItem.css('opacity', 0);
				TweenMax.to(jItem, 0, { css:{rotation:181}});
			}
		);
		
		div_iphonescreens.each(
			function(index, item) {
				var jItem = $(item);
				jItem.css('visibility', 'hidden');
				if(index == 0) {
				jItem.css('opacity', '1');
				} else {
				jItem.css('opacity', '0');
				}
			}
		);
		
	}
	
	resetTween = function () {
		
		
		productTween = new TimelineMax({ pause:true });
		// 0 home 
		productTween.insert('home', 0);
		productTween.insert('colorselectorshow', .5);
		// 1 color
		productTween.insert('color', 1);
		productTween.insert('colorselectorhide', 1.2);
		productTween.insert('featurehandshow', 1.5);
		productTween.insert('feature', 1.5);
		// 2 feature (fixed)
		productTween.insert('featurehandhide', 2);
		productTween.insert('showrunningman', 2);
		//productTween.insert('featurehandhide', 2.2);
		
		// 3 cardio
		// 4 index (fixed)
		
		var offset = contentHeight > 1000 ? 0 : (1000-contentHeight)*.5;
		
		productTween.insert('index', getTweenPercent(getSectionScroll(4))-.4);
		productTween.insert('lesspreinit', 4.4);
		productTween.insert('lessinit', 4.5);
		productTween.insert('lessstart', 4.6);
		
		// 5 transition
		productTween.insert('hiderunningman', 5);
		productTween.insert('captopoff', 5);
		productTween.insert('captopfade', 5.3);
		productTween.insert('capbtmfade', 5.7);
		productTween.insert('capbtmon', 5.5);
		
		// 6 transition (fixed)
		productTween.insert('lessalign', 6);
		productTween.insert('lessconnect', 6.4);
		productTween.insert('lesslight', 6.8);
		productTween.insert('lessup', 6.93);
		
		// 7 less is more (fixed)
		productTween.insert('lessright', 7.4);
		productTween.insert('sharedown', 7.6);
		
		// 8 share
		productTween.insert('softwareright', 8.5);
		// 9 transition
		productTween.insert('softwaredown', 9);
		// 10 mobile
		productTween.insert('sofwareup', 10.6);
		// 11 transition
		productTween.insert('phoneout', 11);
		// 12 transition (fixed)
		productTween.insert('cap2btmoff', 12-.5);
		productTween.insert('cap2btmfade', 12.3-.5);
		productTween.insert('cap2topfade', 12.7-.5);
		productTween.insert('cap2topon', 12.5-.5);
		// 13 mobility
		productTween.insert('pocketdown', 12.8);
		
		var colorShowY = contentHeight*.5-117;
		var featureHandStart = contentHeight+50;
		var featureHandEnd = -540 - 74// contentHeight+400;
		var shareEnd = contentHeight*.5 - 50;
		var softwareRight = 165;
		var softwareDown = 680; //contentHeight*.5 + 400;
		var softwareUp = 200; //contentHeight*.5 + 400;
		var pocketDown = 300; //contentHeight*.5 + 400;
		
		
		productTween.insert( TweenMax.to(div_btm_nav, .1, { css:{top:'0px'} } ), 'home' );
		productTween.insert( TweenMax.to(div_side_nav, .5, { css:{autoAlpha:1} } ), 'colorselectorshow' );
		
		//productTween.insert( TweenMax.to(div_hand, .5, { css:{left:'-800px', autoAlpha:0} } ), 'home' );
		productTween.insert( TweenMax.to(div_product, .5, { css:{left:'128px'} } ), 'home' );
		productTween.insert( TweenMax.to(div_product, 1, { css:{top:colorShowY}, ease:Cubic.easeInOut } ), 'home' );
		productTween.insert( TweenMax.to(div_product, .5, { css:{left:'128px'} } ), 'color' );
		//productTween.insert( TweenMax.to(div_product, .5, { css:{left:'415px'}, ease:Cubic.easeInOut } ), 'feature' );
		productTween.insert( TweenMax.to(div_product, .5, { css:{left:'402px', top:384-74, scaleX:.8, scaleY:.8 }, ease:Cubic.easeInOut } ), 'feature' );
		productTween.insert( TweenMax.to(div_tinke_outline, .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'feature' );
		productTween.insert( TweenMax.to(div_tinke_whole, .5, { css:{autoAlpha:0}, ease:Cubic.easeInOut } ), 'feature' );
		productTween.insert( TweenMax.to(div_product, 1, { css:{left:'402px', top:featureHandEnd-76}, ease:Linear.easeNone } ), 'featurehandhide' );
		
		productTween.insert( TweenMax.to(div_product, .1, { css:{left:'100px', autoAlpha:0, scaleX:1, scaleY:1}, ease:Cubic.easeInOut } ), 'lesspreinit' );
		productTween.insert( TweenMax.to(div_product, .1, { css:{top:contentHeight}, ease:Cubic.easeInOut } ), 'lessinit' );
		productTween.insert( TweenMax.to(div_tinke_outline, .1, {css:{autoAlpha:0}, ease:Cubic.easeInOut } ), 'lessinit' );
		productTween.insert( TweenMax.to(div_tinke_parts, .1, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'lessinit' );
		//productTween.insert( TweenMax.to(div_product, .1, { css:{left:'100px'}, ease:Cubic.easeInOut } ), 'lessinit' );
		productTween.insert( TweenMax.to(div_product, .01, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'lessstart' );
		productTween.insert( TweenMax.to(div_product, .4, { css:{top:'250px'}, ease:Cubic.easeInOut } ), 'lessstart' );
		productTween.insert( TweenMax.to(div_product, .4, { css:{left:'383px'}, ease:Cubic.easeInOut } ), 'lessalign' );
		productTween.insert( TweenMax.to(div_product, .4, { css:{top:'135px'}, ease:Cubic.easeInOut } ), 'lessconnect' );
		productTween.insert( TweenMax.to(div_tinke_light, .05, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'lesslight' );
		productTween.insert( TweenMax.to(div_product, .5, { css:{top:'-365px'}, ease:Linear.easeNone } ), 'lessup' );
		
		productTween.insert( TweenMax.to(div_product, .1, { css:{left:'583px'}, ease:Cubic.easeInOut } ), 'lessright' );
		productTween.insert( TweenMax.to(div_product, .4, { css:{top:shareEnd}, ease:Cubic.easeInOut } ), 'sharedown' );
		
		productTween.insert( TweenMax.to(div_product, .5, { css:{left:softwareRight}, ease:Cubic.easeInOut } ), 'softwareright' );
		productTween.insert( TweenMax.to(div_product, .5, { css:{top:softwareDown}, ease:Cubic.easeInOut } ), 'softwaredown' );
		
		productTween.insert( TweenMax.to(div_product, .4, { css:{top:softwareUp}, ease:Cubic.easeInOut } ), 'sofwareup' );
		productTween.insert( TweenMax.to(div_tinke_light, .05, { css:{autoAlpha:0}, ease:Cubic.easeInOut } ), 'phoneout' );
		
		productTween.insert( TweenMax.to(div_product, .3, { css:{top:pocketDown}, ease:Cubic.easeInOut } ), 'pocketdown' );
		productTween.insert( TweenMax.to(div_product, 1, { css:{top:'-750px'}, ease:Linear.easeNone } ), 13.2 );
		
		
		productTween.insert( TweenMax.to(div_tinke_parts_cap_top, .5, { css:{ top:'-100px'}, ease:Cubic.easeIn } ), 'captopoff' );
		productTween.insert( TweenMax.to(div_tinke_parts_cap_btm, .5, { css:{ top:'207px'}, ease:Cubic.easeOut } ), 'capbtmon' );
		
		productTween.insert( TweenMax.to(div_tinke_parts_cap_top, .2, { css:{ autoAlpha:0}, ease:Cubic.easeInOut } ), 'captopfade' );
		productTween.insert( TweenMax.to(div_tinke_parts_cap_btm, .2, { css:{ autoAlpha:1}, ease:Cubic.easeInOut } ), 'capbtmon' );
		
		
		productTween.insert( TweenMax.to(div_tinke_parts_cap_top, .5, { css:{ top:'1px'}, ease:Cubic.easeIn } ), 'cap2topon' );
		productTween.insert( TweenMax.to(div_tinke_parts_cap_btm, .5, { css:{ top:'300px'}, ease:Cubic.easeOut } ), 'cap2btmoff' );
		
		productTween.insert( TweenMax.to(div_tinke_parts_cap_top, .2, { css:{ autoAlpha:1}, ease:Cubic.easeInOut } ), 'cap2topfade' );
		productTween.insert( TweenMax.to(div_tinke_parts_cap_btm, .2, { css:{ autoAlpha:0}, ease:Cubic.easeInOut } ), 'cap2btmfade' );
		
		
		productTween.insert( TweenMax.to(index_arc, .4, { setArc:75, ease:Cubic.easeInOut } ), 'index' );
		
		
		
		
		
		productTween.insert( TweenMax.to(div_colorselector, .1, { css:{autoAlpha:0} } ), 'home' );
		productTween.insert( TweenMax.to(div_colorselector, .1, { css:{autoAlpha:1} } ), 'colorselectorshow' );
		productTween.insert( TweenMax.to(div_colorselector, .1, { css:{autoAlpha:0} } ), 'colorselectorhide' );
		
		
		productTween.insert( TweenMax.to(div_featurehand, .5, { css:{top:featureHandStart} } ), 'home' );
		productTween.insert( TweenMax.to(div_featurehand, .5, { css:{top:featureHandStart}, ease:Cubic.easeInOut } ), 'color' );
		productTween.insert( TweenMax.to(div_featurehand, .5, { css:{top:460-74}, ease:Cubic.easeInOut } ), 'featurehandshow' );
		productTween.insert( TweenMax.to(div_featurehand, 1, { css:{top:featureHandEnd}, ease:Linear.easeNone } ), 'featurehandhide' );
		
		productTween.insert( TweenMax.to(div_featurehandthumb, .5, { css:{top:featureHandStart} } ), 'home' );
		productTween.insert( TweenMax.to(div_featurehandthumb, .5, { css:{top:featureHandStart}, ease:Cubic.easeInOut } ), 'color' );
		productTween.insert( TweenMax.to(div_featurehandthumb, .5, { css:{top:460-74}, ease:Cubic.easeInOut } ), 'featurehandshow' );
		productTween.insert( TweenMax.to(div_featurehandthumb, 1, { css:{top:featureHandEnd}, ease:Linear.easeNone } ), 'featurehandhide' );
		
		
		
		
		productTween.insert( TweenMax.to(div_iphoneholder, .4, { css:{top:'-400px'}, ease:Cubic.easeInOut } ), 'lessstart' );
		productTween.insert( TweenMax.to(div_iphoneholder, .4, { css:{left:'320px'}, ease:Cubic.easeInOut } ), 'lessalign' );
		productTween.insert( TweenMax.to(div_iphoneholder, .5, { css:{top:'-900px'}, ease:Linear.easeNone } ), 'lessup' );
		
		productTween.insert( TweenMax.to(div_iphoneholder, .1, { css:{left:'520px'}, ease:Cubic.easeInOut } ), 'lessright' );
		productTween.insert( TweenMax.to(div_iphoneholder, .4, { css:{top:shareEnd-535}, ease:Cubic.easeInOut } ), 'sharedown' );
		
		productTween.insert( TweenMax.to(div_iphoneholder, .5, { css:{left:softwareRight-63}, ease:Cubic.easeInOut } ), 'softwareright' );
		productTween.insert( TweenMax.to(div_iphoneholder, .5, { css:{top:softwareDown-535}, ease:Cubic.easeInOut } ), 'softwaredown' );
		
		productTween.insert( TweenMax.to(div_iphoneholder, .4, { css:{top:softwareUp-535}, ease:Cubic.easeInOut } ), 'sofwareup' );
		productTween.insert( TweenMax.to(div_iphoneholder, .5, { css:{top:-900}, ease:Cubic.easeInOut } ), 'phoneout' );
		
		//productTween.insert( TweenMax.to(div_iphonescreens[0], .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'download' );
		//productTween.insert( TweenMax.to(div_iphonescreens[1], .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 0 );
		productTween.insert( TweenMax.to(div_iphonescreens[2], .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 0 );
		productTween.insert( TweenMax.to(div_iphonescreens[3], .1, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'lesslight' );
		productTween.insert( TweenMax.to(div_iphonescreens[4], .3, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'lessright' );
		
		
		productTween.insert( TweenMax.to(div_share_nodes, .3, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 7.8 );
		div_share_badges.children().each(
			function(index, item) {
				var jItem = $(item);
				productTween.insert( TweenMax.to(jItem, .1, { css:{rotation:0, autoAlpha:1}, shortRotation:true, ease:Cubic.easeOut } ), 7.9-(numBadges-index)*.02 );
		
			}
		);
		
		
		
		
		
		
	}
	
	
	
	getSectionScroll = function(index) {
		switch(index) {
			case 0: //home
				return 0;
				break;
			case 1: // color selector
				return contentHeight;
				break;
			case 2: // feature (para)
				var offset = contentHeight > 1000 ? 0 : (1000-contentHeight)*.5;
				return contentHeight*2  + offset;
				break;
			case 3: // cardio
				return contentHeight*2  + 1000;
				break;
			case 4: // index
				var offset = contentHeight > 1000 ? 0 : (1000-contentHeight)*.5;
				//var offset = contentHeight*.5;
				return contentHeight*3  + 1000 + offset;
				break;
			case 5: // less
				var offset = contentHeight > 1000 ? 0 : (1000-contentHeight)*.5;
				return contentHeight*4  + 3000 + offset;
				break;
			case 6: // share
				return contentHeight*4  + 4000// + contentHeight*.1 ;
				break;
			case 7: // mobile
				return contentHeight*5  + 4000 + contentHeight*.6 ;
				break;
			case 8: // mobility
				var offset = contentHeight > 1000 ? 0 : (1000-contentHeight);
				return contentHeight*8 + 5000 + 200;
				break;
		}
		return 0;
	}
	
	getTweenPercent = function (currentScroll) {
		
		sectionLength = [
			contentHeight //home
			,contentHeight //color
			,1000 //feature
			,contentHeight //cardio
			,1000 //index
			,contentHeight //transition
			,1000 //transition fix
			,1000 //less is more
			,contentHeight //share
			,contentHeight //transition
			,contentHeight //mobile
			,contentHeight //transition
			,1000 //transitionfix
			,1000 //mobility
		];
		
		
		
		
		var curLength = 0;
		var curSpace = 0;
		var chkLimit = 0;
		
		var n = sectionLength.length;
		for (var i = 0; i < n; i++) {
			
			curLength = chkLimit;
			curSpace = sectionLength[i];
			chkLimit = curLength + curSpace;
			if(currentScroll < chkLimit) {
				currentIndex = i;
				return (currentScroll - curLength)/curSpace + i;
			}
			
		}
		
		return 0;
		
	}
	
	function nextSection (e) {
		e.preventDefault();
		var index = nextBtns.index(this);
		//console.log("next", this, index);
		scrollToSection(index+2);
	}
	
	
}