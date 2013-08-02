$(window).load(function() {

	var featuresList = $("#featuresList"),
		featuresListItems = $("#featuresList li"),
		trans3DWrapper = $("#trans3DWrapper"),
		trans3DBoxes = $("#trans3DBoxes"),
		textShadowText = $("#textShadowWrapper span"),
		boxShadowWrapper = $("#boxShadowWrapper"),
		borderRadiusWrapper = $("#borderRadiusWrapper"),
		clipWrapper = $("#clipWrapper"),
		clipImage = $(".clipImage"),
		vendorsWrapper = $("#vendorsWrapper"),
		vendorsList = $("#vendorsList"),
		slider = $("#slider"),
		play_btn = $("#play_btn").button(),
		menu_timeline, controller_timeline;
		
	function initCSS() {
		TweenLite.set([$("#introSub"), $("#intro")], {transformPerspective:500});
		TweenLite.set(featuresList, {perspective:400});
		TweenLite.set(trans3DWrapper, {perspective:400});
		TweenLite.set(trans3DBoxes, {perspective:400, transformStyle:"preserve-3d"});
		TweenLite.set(featuresListItems, {alpha:0});
	}
	
	function buildMenuTimeline() {
		menu_timeline  = new TimelineMax({paused:true});
		menu_timeline.set([featuresList], {autoAlpha:1})
		featuresListItems.each(function(index, element){
			var listTimeline = new TimelineLite({});
			listTimeline.from(element, 2, {rotationX:-90,  transformOrigin:"50% 50% -225", ease:Linear.easeNone})
			.to(element, 1.7, {alpha:.5, ease:Power1.easeIn}, "-=2")
			.to(element, 0.1, {color:"#91e600", alpha:1, textShadow:"0px 0px 40px #00ff00", ease:Linear.easeNone}, "-=0.1")
			.to(element, 2, {rotationX:90, transformOrigin:"50% 50% -225", ease:Linear.easeNone}, 2)
			.to(element, 0.1, {color:"#fff", textShadow:"0px 0px 0px #000000", alpha:.5, ease:Linear.easeNone}, 2)
			.to(element, 1, {alpha:0.1, ease:Linear.easeNone}, 2.1)
			menu_timeline.add(listTimeline,  0.25 * index)
		});
	}
 	
    function getIntroTimeline() {
		var intro_timeline = new TimelineMax();
	 	intro_timeline.to($("#introLogo"), 0.5, {width:91, ease:Power2.easeIn})
   		.to($("#introHead"), 0.8, {backgroundPosition:"0px 0px"})
   		.fromTo($("#introSub"), 2, {rotationX:-90}, {rotationX:0, transformOrigin:"50% 0%", ease:Elastic.easeOut, immediateRender:true})
   		.to($("#intro"), 1, {rotationY:270, z:-800, autoAlpha:0, left:-400}, "introOut")
  		.to($("#featuresWrapper"), 1, {autoAlpha:1}, "introOut")	
		return intro_timeline;	
	};
		 	 
	function get3DTimeline(){
		var threeDTimeline = new TimelineLite();
		threeDTimeline.fromTo(trans3DWrapper, 0.5, {autoAlpha:0}, {autoAlpha:1, immediateRender:true})
		.to(trans3DBoxes, 0.3, {rotationY:30, rotationX:20});
		threeDTimeline.add("z", "+=0.2");
		$(".trans3Dbox").each(function (index, element) {
			threeDTimeline.to(element, 0.2, {z:getRandom(-50, 50)}, "z");
		})
	 	threeDTimeline.to(trans3DBoxes, 1, {rotationY:180, z:-180, ease:Power2.easeOut}, "+=0.2")
	   .to(trans3DBoxes, 1, {rotationX:180, z:-10});
		$(".trans3Dbox").each(function (index, element) {
			threeDTimeline.to(element, 1, {z:200, backgroundColor:Math.random() * 0xffffff, rotationX:getRandom(-360, 600), rotationY:getRandom(-360, -600), autoAlpha:0}, "explode");
		}) ;
		return threeDTimeline;
	}
	
	function getTextShadowTimeline(){
		var textShadow_timeline = new TimelineLite();
		textShadow_timeline.timeScale(1.5);
		textShadow_timeline.set(textShadowText, {scale:0.5})
		.fromTo($("#textShadowWrapper"), 0.8, {autoAlpha:0}, {autoAlpha:1, immediateRender:true})
		.to(textShadowText, 0.5, {scale:0.8, textShadow:"8px 8px 14px rgba(0, 0, 0, .7)"}, "+=0.5")
		.to(textShadowText, 0.5, {left:"+=50px", textShadow:"0px 8px 14px rgba(0, 0, 0, .7)"})
		.to(textShadowText, 0.5, {scale:1.1, top:"+=5px", textShadow:"-10px 20px 30px rgba(0, 0, 0, .4)"})
		.to($("#textShadowBg"), 0.5, {alpha:0}, "+=0.5")
		.set(textShadowText,  {textShadow:"0px 0px 0px #000000"}, "+=.01")
		.to(textShadowText, 0.5, {textShadow:"-2px 2px 10px #91e600"})
		.to(textShadowText, 0.5, {textShadow:"-2px 2px 100px rgba(145, 233, 0, .7)", color:"#91e900"}, "+=0.5")
		.to($("#textShadowWrapper"), 0.5, {alpha:0}, "+=1")
		return textShadow_timeline;
	}	
	
	function getBoxShadowTimeline(){
		var boxShadow_timeline = new TimelineLite();
		boxShadow_timeline.fromTo(boxShadowWrapper, 0.5, {autoAlpha:0}, {autoAlpha:1, immediateRender:true})
		.add(TweenMax.to($("#boxShadow1"), 0.2, {backgroundColor:"#91E600", boxShadow:"0px 0px 30px 5px #00Ff00", repeat:1, yoyo:true}))
		.add(TweenMax.to($("#boxShadow4"), 0.2, {backgroundColor:"#ee0000", boxShadow:"0px 0px 30px 5px #ff0000", repeat:1, yoyo:true}))
		.add(TweenMax.to($("#boxShadow3"), 0.2, {backgroundColor:"#00ccff", boxShadow:"0px 0px 30px 5px #00ffff", repeat:1, yoyo:true}))  
		.add(TweenMax.to($("#boxShadow2"), 0.2, {backgroundColor:"#eeee00", boxShadow:"0px 0px 30px 5px #ffff00", repeat:1, yoyo:true}))
		.to($(".boxShadowBox"), 0.5, {backgroundColor:"#91E600", boxShadow:"0px 0px 10px 5px #00Ff00"}, "+=0.1")
		.to($(".boxShadowBox"), 0.5, {backgroundColor:"#0000", boxShadow:"0px 0px 10px 5px #91e600"}, "+=0.1")
		.to($(".boxShadowBox"), 0.5, { boxShadow:"0px 0px 0px 0px #000000"}, "+=0.1")
		.to(boxShadowWrapper, 0.8, {rotation:360, scale:0}, "+=0.5");
		return boxShadow_timeline;
	}
	
	function getBorderRadiusTimeline(){
		var borderRadius_timeline = new TimelineLite();
		borderRadius_timeline.fromTo(borderRadiusWrapper, 0.5, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, immediateRender:true})
		.to($("#borderRadius1"), 0.5, {borderRadius:"55px"})
		.to($("#borderRadius2"), 0.5, {borderRadius:"18 40px"})
		.to($("#borderRadius3"), 0.5, {borderRadius:"40px 40px 0px 40px"})
		.to($("#borderRadius4"), 0.5, {borderRadius:"18px"})
		.to($(".borderRadiusBox"), 0.5, {borderRadius:"0px"}, "+=0.2")
		.to($(".borderRadiusBox"), 0.5, {borderRadius:"55px", borderColor:"#97ee17"})
		.set(borderRadiusWrapper, {transformPerspective:500})
		.to(borderRadiusWrapper, 0.5, {rotationY:180, autoAlpha:0, z:-500}, "+=0.5")
		return borderRadius_timeline;
	}
	
	function getClipTimeline() {
		var clip_timeline = new TimelineMax();
	 	clip_timeline.fromTo(clipWrapper, 0.5, {autoAlpha:0},{autoAlpha:1, immediateRender:true})
	 	.to(clipImage, 0.7, {clip:"rect(114px 230px 116px 0px)", autoAlpha:1})
	 	.to(clipImage, 0.7, {clip:"rect(0px 230px 230px 0px)"}, "+=0.2")
	 	.to(clipImage, 0.7, {clip:"rect(115px 115px 115px 115px)", alpha:0})
	  	.fromTo(clipImage, 0.5, {alpha:0, clip:"rect(0px 60px 60px 0px)" }, {alpha:1, clip:"rect(0px 230px 60px 170px)", ease:Power4.easIn}, "+=0.2")
	 	.to(clipImage, 0.5, {clip:"rect(170px 230px 230px 170px)", ease:Power3.easeOut})
	 	.to(clipImage, 0.5, {clip:"rect(88px 176px 148px 116px)"})
	 	.to(clipImage, 1.5, {clip:"rect(0px 230px 230px 0px)", ease:Bounce.easeOut})
	 	.to(clipImage, 1, {clip:"rect(230px 230px 230px 0px)", autoAlpha:0, ease:Power4.easeIn})
		return clip_timeline;	
	};	
		 
	function getVendorsTimeline() {
		var vendors_timeline  = new TimelineMax();
		var slowmo = new TimelineMax({paused:true});
		slowmo.fromTo($("#moz"), 4, {left:-370}, {left:600, immediateRender:true, ease:SlowMo.ease.config(0.3, 0.9)}, "vendors")
		.fromTo($("#webkit"), 4, {left:600}, {left:-400, immediateRender:true, ease:SlowMo.ease.config(0.4, 0.9)}, "vendors+=0.5")
		.fromTo($("#opera"), 4, {left:-535}, {left:600, immediateRender:true, ease:SlowMo.ease.config(0.3, 0.9)}, "vendors+=0.2")
		.fromTo($("#ms"), 4, {left:600}, {left:-400, immediateRender:true, ease:SlowMo.ease.config(0.2, 0.6)}, "vendors+=1")		
		var prefixList_timeline = new TimelineMax({paused:true});
		prefixList_timeline.to(vendorsList, 20, {backgroundPosition:"0px -1000px", ease:Linear.easeNone}, "vendors")	
		.to(vendorsList, 20, {backgroundPosition:"0px -1000px", ease:Linear.easeNone}, "vendors")	
		vendors_timeline.set(vendorsList, {alpha:0.6})
		.fromTo(vendorsWrapper, 1, {autoAlpha:0}, {autoAlpha:1, immediateRender:true}, "vendors")
		.to([prefixList_timeline], 5, {time:5, ease:Linear.easeNone}, "vendors")
		.to(slowmo, 3, {time:3, ease:Linear.easeNone}, "vendors+=2")
		.to(slowmo, 0.3, {progress:1}, "vendorsDone")
		.to(vendorsList, 0.1, {autoAlpha:0}, "vendorsDone")
		.fromTo($("#nomore"), 0.3, {scale:10, autoAlpha:0, rotationZ:-20}, {scale:1, rotationZ:-10, autoAlpha:1, ease:Bounce.easeOut, immediateRender:true},  "vendorsDone")
		.to($("#nomore"), 0.5, {scale:0.5, autoAlpha:0, ease:Power1.easeIn}, "+=.5")
		.fromTo($("#bloatHead"), 0.5, {autoAlpha:0, rotationX:-90}, {autoAlpha:1, rotationX:0, transformOrigin:"left top", immediateRender:true})
		.set($("#bloatCode"), {transformPerspective:200})
		.fromTo($("#bloatCode"), 0.5, {autoAlpha:0, rotationY:-20, z:-100}, {autoAlpha:1, rotationY:0, z:0, transformOrigin:"70% 50%", immediateRender:true})
		.set($("#love"), {autoAlpha:1})
		.add("bloatOut", "+=3")
		.to($("#bloatHead"), 0.5, {top:-100}, "bloatOut")
		.to($("#bloatCode"), 0.8, {top:350}, "bloatOut")
		return vendors_timeline;
	}		 
			
	function buildControllerTimeline() {
		controller_timeline = new TimelineMax({onUpdate:updateSlider, paused:true});
		buildMenuTimeline();
		controller_timeline.add(getIntroTimeline())
		.to(menu_timeline, 0.8, {time:2, ease:Power1.easeOut}, "-=1")
		.add(get3DTimeline())
		.to(menu_timeline, 0.2,  {time:2.25, ease:Power1.easeOut})	
		.add(getTextShadowTimeline(), "textShadow")
		.to(menu_timeline, 0.2, {time:2.5, ease:Power1.easeOut})
		.add(getBoxShadowTimeline(), "boxShadow")
		.to(menu_timeline, 0.2, {time:2.75, ease:Power1.easeOut}, "-=.5")
		.add(getBorderRadiusTimeline(), "borderRadius")
		.to(menu_timeline, 0.2, {time:3, ease:Power1.easeOut}, "-=.5")
		.add(getClipTimeline(), "clip")
		.to(menu_timeline, 1.5, {progress:1})
		.add(getVendorsTimeline(), "-=1.5")
	}
	
	function removeLoading() {
		var removeLoading_timeline = new TimelineMax();
		removeLoading_timeline.to($("#loading"), 0.2, {autoAlpha:0})
		.to($("#nav"), .5, {autoAlpha:1}, 0)
		.to($("#csspluginWrapper"), 0.5, {autoAlpha:1}, 0)
		.addCallback(startController, 1);
	}
	
	function startController() {
		controller_timeline.play();
	}
	
	// config slider and nav
		
	function updateSlider(){
		slider.slider("value", controller_timeline.progress() *100);
	}
	
	$( "#slider" ).slider({
            range: false,
            min: 0,
            max: 100,
			step:0.1,
            slide: function ( event, ui ) {
				controller_timeline.pause();
                controller_timeline.progress( ui.value/100 );
            }
     });	
		
	$("#play_btn").click(function(){
		if(controller_timeline.progress()==1){
			controller_timeline.restart();
		}else{
			controller_timeline.play(); 
		}
	}) 
	
	// helper functions
	
	function getRandom(max, min){
		return Math.floor(Math.random() * (1 + max - min) + min);
	}	
	
	// init app
	
	initCSS();
	buildControllerTimeline();
	removeLoading();



	//3D transformPerspective Demo
	//Compare 3 variances of transformPerspective: none, 100 and 800

	var $tranRunsformPerspectiveNone = $("#transformPerspectiveNone"),
	    $transformPerspective200 = $("#transformPerspective200"),
	    $transformPerspective600 = $("#transformPerspective600"),
	    $boxes = $(".box"),
	    tween, tp_slider,
		tp_play_btn = $("#tp_play_btn").button();

	//set transformPerspective on 2nd and 3rd box (1st box has no transformPerspective by default)

	TweenLite.set($transformPerspective200, {css:{transformPerspective:200}});
	TweenLite.set($transformPerspective600, {css:{transformPerspective:600}});

	tween = TweenMax.to($boxes, 2, {css:{rotationY:360}, ease:Linear.easeNone, onUpdate:update_tp_slider, paused:true});

	tp_slider = $("#tp_slider").slider({
	    range: false,
	    min: 0,
	    max: 100,
	    step: 0.1,
	    slide: function(event, ui) {
	        tween.pause();
	        tween.progress(ui.value / 100);
	    }
	});

	function update_tp_slider() {
	    tp_slider.slider( "value", tween.progress() *100 );
	}


	$("#tp_play_btn").click(function(){
		if(tween.progress()===1){
			tween.restart();
			}else{
				tween.play();
			}
	});

	//3D transformPerspective vs perspective


	var $perspective = $("#perspective"),
	    $transformPerspectiveBoxes = $("#transformPerspective").find(".tpvp_box"),
	    $boxes = $(".tpvp_box"),
	    tpvp_tween, tpvp_slider,
		tpvp_play_btn = $("#tpvp_play_btn").button();

	//set transformPerspective on each box
	TweenLite.to($transformPerspectiveBoxes, 0.2, {css:{transformPerspective:300}});

	//set perspective on parent div of all the boxes
	TweenLite.set($perspective, {css:{perspective:300}});

	tpvp_tween = TweenMax.to($boxes, 2, {css:{rotationY:360}, ease:Linear.easeNone, onUpdate:update_tpvp_slider, paused:true});

	tpvp_slider = $("#tpvp_slider").slider({
	    range: false,
	    min: 0,
	    max: 100,
	    step: 0.1,
	    slide: function(event, ui) {
	        tpvp_tween.pause();
	        tpvp_tween.progress(ui.value / 100);
	    }
	});

	function update_tpvp_slider() {
	    tpvp_slider.slider( "value", tpvp_tween.progress() *100 );
	}

	$("#tpvp_play_btn").click(function(){
		if(tpvp_tween.progress()===1){
			tpvp_tween.restart();
		} else {
			tpvp_tween.play();
		}
	});

	//transform origin
	var box1 = $("#box1"),
	    box2 = $("#box2"),
	    to_play_btn = $("#to_play_btn").button(),
	    to_tween, to_slider;

	TweenLite.set([box1, box2], {css:{transformPerspective:300}});
	to_tween = new TimelineMax({onUpdate:update_to_slider, paused:true});
	to_tween.to(box1,  3, {css:{rotationY:360, transformOrigin:"left top"}})
	    .to(box2,  3, {css:{rotationY:360, transformOrigin:"50% 50% -200"}}, 0, 0);



	to_slider = $("#to_slider").slider({
	    range: false,
	    min: 0,
	    max: 100,
	    step: 0.1,
	    slide: function(event, ui) {
	        to_tween.pause();
	        to_tween.progress(ui.value / 100);
	    }
	});

	function update_to_slider() {
	    to_slider.slider( "value", to_tween.progress() * 100 );
	}

	to_play_btn.click(function(){
		if (to_tween.progress()===1){
			to_tween.restart();
		} else {
			to_tween.play();
		}
	});
	/**/

	//textShadow

	var text1 = $("#text1"),
	    text2 = $("#text2"),
	    text3 = $("#text3");

	text1.data('code', $('#text1Code'));
	text2.data('code', $('#text2Code'));
	text3.data('code', $('#text3Code'));


	var t1Tween = TweenLite.to(text1, 0.2, {css:{textShadow:"2px 2px 15px rgba(145, 233, 0, 1)", color:"#91ff00"}, paused:true}),
		t2Tween = TweenLite.to(text2, 0.2, {css:{textShadow:"1px 1px 1px rgba(255, 255, 255, .5)", color:"#000"}, paused:true}),
		t3Tween = TweenLite.to(text3, 0.2, {css:{textShadow:"0px 0px 15px white", color:"transparent"}, paused:true});

	function showHideCode(elem){
	    TweenLite.set(elem, {css:{autoAlpha:1}});
	    TweenLite.set(elem.siblings(), {css:{autoAlpha:0}});
	}

	text1.mouseenter(function(){
	    t1Tween.play();
	    showHideCode($(this).data('code'));
	});

	text1.mouseleave(function(){
	    t1Tween.reverse();
	});

	text2.mouseenter(function(){
	    t2Tween.play();
	    showHideCode($(this).data('code'));
	}) ;
	text2.mouseleave(function(){
	    t2Tween.reverse();
	});

	text3.mouseenter(function(){
	    t3Tween.play();
	    showHideCode($(this).data('code'));
	}) ;
	text3.mouseleave(function(){
	    t3Tween.reverse();
	});

	//borderRadiues


	var br1 = $("#br1"),
	    br2 = $("#br2"),
	    br3 = $("#br3"),
	    br4 = $("#br4"),
	    br5 = $("#br5"),
	    br6 = $("#br6"),
	    box = $("#borderRadiusBigBox");


	    TweenLite.set(br1, {css:{borderRadius:"25%"}});
	    TweenLite.set(br2, {css:{borderRadius:"50%"}});
	    TweenLite.set(br3, {css:{borderRadius:"0% 20%"}});
	    TweenLite.set(br4, {css:{borderRadius:"0% 20% 50%"}});
	    TweenLite.set(br5, {css:{borderRadius:"0% 20% 50% 50%"}});
	    TweenLite.set(br6, {css:{borderRadius:"50% 50% 50% 0%"}});


	br1.data('code', $('#br1Code'));
	br2.data('code', $('#br2Code'));
	br3.data('code', $('#br3Code'));
	br4.data('code', $('#br4Code'));
	br5.data('code', $('#br5Code'));
	br6.data('code', $('#br6Code'));




	br1.mouseenter(function(){
	    TweenLite.to(box, .75, {css:{borderRadius:"25px"}});
	    showHideCode($(this).data('code'));
	});

	br2.mouseenter(function(){
	    TweenLite.to(box, .75, {css:{borderRadius:"50%"}});
	    showHideCode($(this).data('code'));
	});

	br3.mouseenter(function(){
	    TweenLite.to(box, .75, {css:{borderRadius:"0px 20px"}});
	    showHideCode($(this).data('code'));
	});

	br4.mouseenter(function(){
	    TweenLite.to(box, .75, {css:{borderRadius:"0px 20px 50px"}});
	    showHideCode($(this).data('code'));
	});

	br5.mouseenter(function(){
	    TweenLite.to(box, .75, {css:{borderRadius:"0px 20px 50px 50px"}});
	    showHideCode($(this).data('code'));
	});

	br6.mouseenter(function(){
	    TweenLite.to(box, .75, {css:{borderRadius:"50px 50px 50px 0px"}});
	    showHideCode($(this).data('code'));
	});






	/*clip */
	var box1 = $("#clip1"),
	    box2 = $("#clip2"),
	    box3 = $("#clip3"),
	    box4 = $("#clip4");

	box1.data('code', $('#clipCode1'));
	box2.data('code', $('#clipCode2'));
	box3.data('code', $('#clipCode3'));
	box4.data('code', $('#clipCode4'));

	clipTween1 = TweenLite.from(box1, 1, {css:{clip:"rect(50px 100px 50px 0px)"}, paused:true});
	clipTween2 = TweenLite.from(box2, 1, {css:{clip:"rect(100px 0px 100px 0px)"}, paused:true});
	clipTween3 = TweenLite.from(box3, 1, {css:{clip:"rect(50px 50px 50px 50px)"}, paused:true});
	clipTween4 = TweenLite.from(box4, 1, {css:{clip:"rect(0px 100px 100px 100px)"}, paused:true});





	box1.parent().mouseenter(function() {
	    clipTween1.play();
	    showHideCode($(this).children(":first").data('code'));
	    });


	box1.parent().mouseleave(function() {
	    clipTween1.reverse();
	});


	box2.parent().mouseenter(function() {
	    clipTween2.play();
	    showHideCode($(this).children(":first").data('code'));
	    });


	box2.parent().mouseleave(function() {
	    clipTween2.reverse();

	    });

	box3.parent().mouseenter(function() {
	    clipTween3.play();
	    showHideCode($(this).children(":first").data('code'));

	    });


	box3.parent().mouseleave(function() {
	    clipTween3.reverse();
	    });

	box4.parent().mouseenter(function() {
	    clipTween4.play();
	    showHideCode($(this).children(":first").data('code'));
	    });


	box4.parent().mouseleave(function() {
	    clipTween4.reverse();
	});

	// boxShadow
	var bsBox1 = $("#bsBox1"),
	    bsBox2 = $("#bsBox2"),
	    bsBox3 = $("#bsBox3"),
	    bsBox4 = $("#bsBox4"),
	    bsBox5 = $("#bsBox5"),
	    bsBox6 = $("#bsBox6"),
	    bsTween1, bsTween2, bsTween3, bsTween4, bsTween5, bsTween6, duration = .3;

	bsBox1.data('code', $('#bsCode1'));
	bsBox2.data('code', $('#bsCode2'));
	bsBox3.data('code', $('#bsCode3'));
	bsBox4.data('code', $('#bsCode4'));
	bsBox5.data('code', $('#bsCode5'));
	bsBox6.data('code', $('#bsCode6'));

	bsTween1 = TweenLite.to(bsBox1, duration, {
	    css: {
	        boxShadow: "10px 10px"
	    },
	    paused: true
	});
	bsTween2 = TweenLite.to(bsBox2, duration, {
	    css: {
	        boxShadow: "10px 10px 10px",
	        backgroundColor:"black"
	    },
	    paused: true
	});
	bsTween3 = TweenLite.to(bsBox3, duration, {
	    css: {
	        boxShadow: "0px 0px 10px 6px black",
	        backgroundColor:"black"
	    },
	    paused: true
	});

	bsTween4 = TweenLite.to(bsBox4, duration, {
	    css: {
	        boxShadow: "0px 0px 10px 4px #f60",
	        backgroundColor:"#f60",
	        borderColor:"#f60"
	    },
	    paused: true
	});

	bsTween6 = TweenLite.to(bsBox6, duration, {
	    css: {
	        boxShadow: "0px 0px 24px 6px white",
	        backgroundColor:"white",
	        color:"#999"
	    },
	    paused: true
	});





	bsBox1.mouseenter(function() {
	    bsTween1.play();
	    showHideCode($(this).data('code'));
	});


	bsBox1.mouseleave(function() {
	    bsTween1.reverse();
	});

	bsBox2.mouseenter(function() {
	    bsTween2.play();
	    showHideCode($(this).data('code'));
	});


	bsBox2.mouseleave(function() {
	    bsTween2.reverse();
	});

	bsBox3.mouseenter(function() {
	    bsTween3.play();
	    showHideCode($(this).data('code'));
	});


	bsBox3.mouseleave(function() {
	    bsTween3.reverse();
	});

	bsBox4.mouseenter(function() {
	    bsTween4.play();
	    showHideCode($(this).data('code'));
	});


	bsBox4.mouseleave(function() {
	    bsTween4.reverse();
	});


	bsBox5.mouseenter(function() {
	    TweenMax.fromTo(bsBox5, 0.7, {css:{boxShadow:"0px 0px 0px 0px rgba(0,255,0,0.3)"}}, {
	        css: {
	            boxShadow: "0px 0px 20px 10px rgba(0,255,0,0.7)",
	        },
	        repeat: -1,
	        yoyo: true,
	        ease:Linear.easeNone
	    });
	    TweenMax.to(bsBox5, 0.5, {css:{backgroundColor:"black"}});

	    showHideCode($(this).data('code'));
	});


	bsBox5.mouseleave(function() {

	    TweenMax.to(bsBox5, duration, {
	        css: {
	            boxShadow: "0px 0px 0px 0px #000"
	        }
	    });
	    TweenMax.to(bsBox5, 0.5, {css:{backgroundColor:"#555"}});
	});

	bsBox6.mouseenter(function() {
	    bsTween6.play();
	    showHideCode($(this).data('code'));
	});


	bsBox6.mouseleave(function() {
	    bsTween6.reverse();
	});

	function showHideCode(elem) {
	    TweenLite.set(elem, {
	        css: {
	            autoAlpha: 1
	        }
	    });
	    TweenLite.set(elem.siblings(), {
	        css: {
	            autoAlpha: 0
	        }
	    });
	}


});
	