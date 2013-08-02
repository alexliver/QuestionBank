/**
 * ...
 * @author Dominique Wong
 */


function ZensoriumStart() {
	
	// def
	var win;
	var doc;
	
	
	// vars
	var that = this;
	var contentHeight;
	var contentWidth;
	var currentIndex = 0;
	var currentScroll;
	var currentScrollPercent;
	
	var productTween;
	var iconTween;
	
	var isIconTween = true;
	
	var logoOver = false;
	var navTopShown = true;
	var navBtmShown = true;
	
	var sectionLength = [];
	var sectionIndex = [
			0 //title
			,.5 //download
			,2 //register
			,4 //plugin
			,5.5 //tinkeit
		];
	
	
	// divs
	//var div_toplayer;
	var div_product;
	var div_textcontent;
	
	/*
	var div_download;
	var div_register;
	var div_plugin;
	var div_tinkeit;
	*/
	
	// tinke
	var div_tinke_light;
	
	var div_tinke_parts;
	var div_tinke_parts_cap_btm;
	var div_tinke_parts_body;
	var div_featurehand;
	var div_featurehandthumb;
	
	var div_iphoneholder;
	var div_rate;
	
	var div_iphonescreens;
	
	var div_btm_nav;
	var div_logo;
	var div_top_nav;
	
	var div_side_nav;
	var div_side_nav_btn;
	var div_tinkeit_blurp;
	
	var div_app_icon;
	
	// functions
	var resetCSS;
	var resetTween;
	var getTweenPercent;
	
	var showTopNav;
	var hideTopNav;
	var showBtmNav;
	var hideBtmNav;
	
	var updateSideNav;
	var resetSideNav;
	
	var getSectionScroll;
	var scrollToSection;
	
	var initIconTween;
	var startIconTween;
	var stopIconTween;
	
	this.init = function () {
		//console.log('init');
		
		doc = $(document);
		win = $(window);
		win.bind('scroll', this.onWindowScroll );
		win.resize( this.onWindowResize );
		
		//div_toplayer = $('#toplayer');
		div_product = $('#product');
		div_iphoneholder = $('#iphone_wrapper');
		div_iphonescreens = $('#iphone .screen img');
		
		div_featurehand = $('#featurehand');
		div_featurehandthumb = $('#featurehandthumb');
		
		
		div_tinke_light = $('#tinke_light');
		div_tinke_parts = $('#tinke_parts');
		
		div_tinke_parts_cap_btm = $('#tinke_cap_btm');
		div_tinke_parts_body = $('#tinke_body');
		
		
		div_textcontent = $('#textcontent');
		div_rate = $('.rate');
		
		div_logo = $('#logowrapper');
		div_btm_nav = $('#bottomnavwrapper');
		div_top_nav = $('#topnav');
		
		div_side_nav = $('#sidenav');
		div_side_nav_btn = $('#sidenav .indicator');
		
		div_tinkeit_blurp = $('#texttinkeit .blurp');
		
		div_app_icon = $('#toplayer .app_icon');
		
		//nav
		div_top_nav.click( function() { logoOver = true; showTopNav(); } );
		div_top_nav.mouseover( function() { logoOver = true; showTopNav(); } );
		div_top_nav.mouseout( function() { logoOver = false; hideTopNav(.5); } );
		div_logo.click( function() { logoOver = true; showTopNav(); } );
		div_logo.mouseover( function() { logoOver = true; showTopNav(); } );
		div_logo.mouseout( function() { logoOver = false; hideTopNav(.5); } );
		
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
					scrollToSection(index);
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
		
		$('#texttitle .btn_down').css('cursor','pointer');
		$('#textdownload .btn_next').css('cursor','pointer');
		$('#textregister .btn_next_white').css('cursor','pointer');
		$('#textplugin .btn_next').css('cursor','pointer');
		
		$('#texttitle .btn_down').click( function() { scrollToSection(1); return false; } );
		$('#textdownload .btn_next').click( function() { scrollToSection(2); return false; } );
		$('#textregister .btn_next_white').click( function() { scrollToSection(3); return false; } );
		$('#textplugin .btn_next').click( function() { scrollToSection(4); return false; } );
		
		$('body,html').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
		 if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
		  $("html,body").stop();
			TweenMax.killTweensOf($('html,body'));
		 }
		})
		
		initIconTween();
		
		this.onWindowResize();
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
		
		//productTween.seek(currentScrollPercent*6);
		var seek = getTweenPercent(currentScroll);
		
		//console.log(seek);
		
		productTween.seek(seek);
		productTween.pause();
		
		
		updateSideNav(seek);

		
		if(currentIndex < 1) {
			startIconTween();
		} else {
			stopIconTween();
		}
		
		if(contentWidth < 960) {
			var setLeft = -(960-contentWidth)*.5
			$('#toplayer').css('left', -$(window).scrollLeft());
		}
	}
	this.onWindowResize = function () {
		contentHeight = win.height();
		contentWidth = win.width();
		
		
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
	
	
	
	
	
	
	
	
	// nav
	scrollToSection = function(index) {
		//console.log('scrollToSection ' + getSectionScroll(index));
		var duration = Math.abs(currentScroll - getSectionScroll(index))/200;
		duration = duration < 3 ? 3 : duration > 10 ? 10 : duration;
		TweenMax.to($('html,body'), duration, { scrollTop:getSectionScroll(index), ease:Cubic.easeOut, overwrite:'all' });
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
			 $("#toplayer").css({top: -(currentScroll-tlimit-1) });
		} else {
			$("#bottomnav").css({bottom: 0 });
			$("#toplayer").css({top: 0 });
		}
	}
	
	
	
	
	
	
	// icon
	initIconTween = function() {
		iconTween = new TimelineMax({ repeat:-1 });
		
		
		var item = $('#texttitle .pop_hr');
		iconTween.insert( TweenMax.to(item, 0, { css:{autoAlpha:0} } ), 0 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:1} } ), 0 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:0} } ), 2 );
		
		var item = $('#texttitle .pop_oxy');
		iconTween.insert( TweenMax.to(item, 0, { css:{autoAlpha:0} } ), 0 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:1} } ), 2 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:0} } ), 4 );
		
		var item = $('#texttitle .pop_res');
		iconTween.insert( TweenMax.to(item, 0, { css:{autoAlpha:0} } ), 0 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:1} } ), 4 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:0} } ), 6 );
		
		var item = $('#texttitle .pop_hrv');
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:0} } ), 0 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:1} } ), 6 );
		iconTween.insert( TweenMax.to(item, 1, { css:{autoAlpha:1} } ), 7 );
		
		
		iconTween.play();
	}
	startIconTween = function() {
		if(isIconTween) { return; }
		isIconTween = true;
		iconTween.play();
	}
	
	stopIconTween = function() {
		if(!isIconTween) { return; }
		isIconTween = false;
		iconTween.pause();
	}
	
	
	
	
	
	
	
	// tween
	
	resetCSS = function () {
		
		// 320x610
		var tarTop = contentHeight*.5 - 610*.5;
		div_iphoneholder.css('top', contentHeight);
		div_iphoneholder.css('left', '320px');
		
		div_tinke_light.css('opacity', 0);
		div_tinke_light.css('visibility', 'hidden');
		
		div_tinkeit_blurp.css('opacity', 0);
		div_tinkeit_blurp.css('visibility', 'hidden');
		
		//194x205
		div_product.css('opacity', '1');
		div_product.css('visibility', 'visible');
		div_product.css('top', contentHeight);
		div_product.css('left', '383px');
		
		div_tinke_parts.css('visibility', 'visible');
		div_tinke_parts.css('opacity', '1');
		
		div_tinke_parts_cap_btm.css('top', '300px');
		div_tinke_parts_cap_btm.css('opacity', '1');
		div_tinke_parts_cap_btm.css('visibility', 'visible');
		
		
		div_btm_nav.css('top', '45px');
		
		
		div_side_nav.css('opacity', 0);
		div_side_nav.css('visibility', 'hidden');
		
		div_textcontent.css('top', '0px');
		
		div_featurehand.css('top', contentHeight + 'px');
		div_featurehandthumb.css('top', contentHeight + 'px');
		div_featurehand.css('left', 250 + 'px');
		div_featurehandthumb.css('left', 250 + 'px');
		
		div_app_icon.css('top', contentHeight*.5+10);
		div_app_icon.css('left', 700);
		div_app_icon.css('opacity', 0);
		div_app_icon.css('visibility', 'hidden');
		
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
		
		div_textcontent.children().each(
			function(index, item) {
				var jItem = $(item);
				jItem.css('height', contentHeight);
			}
		);
		
		var productMiddleY = contentHeight*.5 - 100// - 300*.5;
		div_rate.css('top', productMiddleY+150);
		div_rate.css('opacity', '0');
		div_rate.css('visibility', 'hidden');
		
		
		
		
	}
	
	resetTween = function () {
		
		
		productTween = new TimelineMax();
		// 0 title 
		productTween.insert('iphoneIn', .5);
		productTween.insert('iphoneUp', 1);
		// 1 download 
		productTween.insert('download', .5);
		productTween.insert('logoIn', .8);
		productTween.insert('logoOut', 1);
		// 2 arrow start
		// 3 register
		productTween.insert('register', 2.3);
		// 4 arrow stop
		// 5 plugin
		productTween.insert('plugin', 4);
		productTween.insert('plugintinke', 4.5);
		productTween.insert('pluginlight', 4.9);
		// 6 tinkeit
		productTween.insert('tinkeit', 5.5);
		productTween.insert('tinkeithandup', 5.7);
		productTween.insert('tinkeitinstruction', 6.5);
		
		// 7 transition
		productTween.insert('tinkeitrate', 7);
		productTween.insert('tinkeitscreen', 7.4);
		// 8 transition
		//productTween.insert('tinkeitend', 8);
		
		var iphoneMiddleY = contentHeight*.5 - 610*.5;
		
		productTween.insert( TweenMax.to(div_btm_nav, .1, { css:{top:'0px'} } ), 0 );
		productTween.insert( TweenMax.to(div_side_nav, .5, { css:{autoAlpha:1} } ), 'iphoneIn' );
		
		productTween.insert( TweenMax.to(div_iphoneholder, .5, { css:{top:iphoneMiddleY+50}, ease:Quart.easeOut } ), 'iphoneIn' );
		productTween.insert( TweenMax.to(div_iphoneholder, 3, { css:{top:iphoneMiddleY}, ease:Linear.easeNone } ), 'iphoneUp' );
		
		productTween.insert( TweenMax.to(div_textcontent, .5, { css:{top:-contentHeight*1*1}, ease:Cubic.easeIn } ), 0 );
		productTween.insert( TweenMax.to(div_textcontent, 1, { css:{top:-contentHeight*2*1-contentHeight}, ease:SlowMo.ease.config(0,.8) } ), 'download'  );
		productTween.insert( TweenMax.to(div_textcontent, 1.5, { css:{top:-contentHeight*2*2-contentHeight}, ease:SlowMo.ease.config(0,.8) } ), 'register' );
		productTween.insert( TweenMax.to(div_textcontent, 1.5, { css:{top:-contentHeight*2*3-contentHeight}, ease:SlowMo.ease.config(0,.8) } ), 'plugin' );
		productTween.insert( TweenMax.to(div_textcontent, .5, { css:{top:contentHeight-contentHeight*2*4-contentHeight}, ease:Quart.easeOut } ), 'tinkeit' );
		
		var productMiddleY = contentHeight*.5 - 100// - 300*.5;
		productTween.insert( TweenMax.to(div_iphoneholder, 1, { css:{top:productMiddleY-530}, ease:Quad.easeInOut } ), 'plugin' );
		productTween.insert( TweenMax.to(div_product, .5, { css:{top:productMiddleY}, ease:Quad.easeOut } ), 'plugintinke' );
		productTween.insert( TweenMax.to(div_tinke_parts_cap_btm, .5, { css:{top:'207px'}, ease:Quad.easeOut } ), 'plugintinke' );
		productTween.insert( TweenMax.to(div_tinke_light, .01, { css:{autoAlpha:1}, ease:Linear.easeNone } ), 'pluginlight' );
		
		productTween.insert( TweenMax.to(div_app_icon, .4, { css:{left:600}, ease:SlowMo.ease.config(0,.8) } ), 'logoIn' );
		productTween.insert( TweenMax.to(div_app_icon, .2, { css:{autoAlpha:1}, ease:Cubic.easeOut } ), 'logoIn' );
		productTween.insert( TweenMax.to(div_app_icon, .2, { css:{autoAlpha:0}, ease:Cubic.easeIn } ), 'logoOut' );
		
		productTween.insert( TweenMax.to(div_featurehand, .5, { css:{top:productMiddleY+80}, ease:Quart.easeOut } ), 'tinkeithandup' );
		productTween.insert( TweenMax.to(div_featurehandthumb, .5, { css:{top:productMiddleY+80}, ease:Quart.easeOut } ), 'tinkeithandup' );
		
		productTween.insert( TweenMax.to(div_tinkeit_blurp, .5, { css:{autoAlpha:1} } ), 'tinkeitinstruction' );
		productTween.insert( TweenMax.to(div_tinkeit_blurp, .2, { css:{autoAlpha:0} } ), 'tinkeitrate' );
		
		productTween.insert( TweenMax.to(div_iphonescreens[0], .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'download' );
		productTween.insert( TweenMax.to(div_iphonescreens[1], .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'register' );
		productTween.insert( TweenMax.to(div_iphonescreens[2], .5, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'plugin' );
		productTween.insert( TweenMax.to(div_iphonescreens[3], .1, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'pluginlight' );
		productTween.insert( TweenMax.to(div_iphonescreens[4], .3, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'tinkeitscreen' );
		
		productTween.insert( TweenMax.to(div_rate, .4, { css:{autoAlpha:1}, ease:Cubic.easeInOut } ), 'tinkeitrate' );
		
		//productTween.insert( TweenMax.to(div_toplayer, .5, { css:{top:-275}, ease:Quart.easeOut } ), 'tinkeitend' );
		
		//productTween.insert( TweenMax.to(div_download, 1, { css:{top:'10%'}, ease:SlowMo.ease.config(0,1.4) } ), 'download' );
		
		//productTween.insert( TweenMax.to(div_register, 1, { css:{top:'10%'}, ease:SlowMo.ease.config(0,1.4) } ), 'register' );
		var tarTop = 2000-contentHeight*.5
		//productTween.insert( TweenMax.to(div_plugin, 1, { css:{top:tarTop}, ease:SlowMo.ease.config(0,.2) } ), 'plugin' );
		
		//productTween.insert( TweenMax.to(div_tinkeit, 1, { css:{top:'10%'}, ease:SlowMo.ease.config(0,1.4) } ), 'tinkeit' );
		
	}
	
	getSectionScroll = function(index) {
		switch(index) {
			case 0: //title
				return 0;
				break;
			case 1: // download
				return contentHeight;
				break;
			case 2: // register
				//var offset = contentHeight > 1000 ? 0 : (1000-contentHeight)*.5
				return contentHeight*2 +311;
				break;
			case 3: // plugin
				return contentHeight*3 +311 +311;
				break;
			case 4: // tinkeit
				return contentHeight*5 +311 +311 + 2000;
				break;
		}
		return 0;
	}
	getTweenPercent = function (currentScroll) {
		
		
		sectionLength = [
		contentHeight // title
		,contentHeight // download
		,311 // arrow start
		,contentHeight // register
		,311 // arrow stop
		,2000 // plugin
		,contentHeight // tinkeit
		,contentHeight // transition
		,contentHeight // transition
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
}