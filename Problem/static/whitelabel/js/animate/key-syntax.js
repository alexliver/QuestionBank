// Two ways to define a tween
 function listBoxOut(item){  
 	// we can define a TweenLite or TimelineLite here
    TweenLite.to(item, 0.7,{scale:0.5, rotationX:70, autoAlpha:0, y:-300, z:-500, transformPerspective:600, display:"block"});
    }
 // and call the function later
 $('').click(function() {
 	listBoxOut($('...'));
 });
 // second approach
 //pause the tween initially, with out it, it will be played initially
var myTween = TweenLite.to(photo, 1.5, {width:100, paused:true}); 
//then later, resume
myTween.resume();

// delay,onComplete,ease
// Frankly, the most useful eases are all the Power eases, Back.easeOut, Elastic.easeOut, SlowMo.ease, Bounce.easeOut and sometimes Linear.easeNone.
//notice there's no "()" after the onComplete function because it's just a reference to the function itself (you don't want to call it yet)
TweenLite.to(photo, 1.5, {width:100, delay:0.5, onComplete:myFunction,ease:back./bounce./Power0/1/2/3/4.easeIn/easeOut/easeInOut});
// plug in
//CSSPlugin will intercept the "css" value...
TweenLite.to(photo, 1, {css:{scaleX:0.5, rotation:30}, ease:Power3.easeOut}); 
//ScrollToPlugin will intercept the "scrollTo" value (if it's loaded)...
TweenLite.to(window, 2, {scrollTo:{y:300}, ease:Bounce.easeOut});
// plugin keywords like scrollTo, raphael, easel, etc.)

// css properties
// 2D transforms like rotation, scaleX, scaleY, scale, skewX, skewY, x, and y 
// – one of the most convenient things about the CSSPlugin is that it
//  greatly simplifies transforms in the various browsers including IE
//  back through version 6! 
//use "deg" or "rad"
TweenLite.to(element, 2, {rotation:"1.25rad", skewX:"30deg"});
// Notes about 2D transforms:
// It is typically best to set the element’s position to “absolute” to avoid clipping (mostly for old versions of IE).
// You can use “scale” as a shortcut to control both the “scaleX” and “scaleY” properties identically.
// The order in which you declare the transform properties makes no difference.
// TweenLite has nothing to do with the rendering quality of the element in the browser. Some browsers seem to render transformed elements beautifully while others don’t handle anti-aliasing as well.
// 3D transforms
// work in almost all browsers, you can animate 3D properties too like rotationX, rotationY, rotationZ (identical to regular “rotation”), z
// To get your elements to have a true 3D visual perspective applied, you must either set the “perspective” property of the parent element or set the special “transformPerspective” of the element itself (common values range from around 200 to 1000, the lower the number the stronger the perspective distortion). The “transformPerspective” is like adding a perspective() directly inside the css “transform” style, like: transform:perspective(500px) rotateX(45deg) which only applies to that specific element whereas if you want to a group of elements share a common perspective (the same vanishing point), you should set the regular “perspective” property on the parent/container of those elements. For more information about perspective
//apply a perspective to the PARENT element (the container) to make the perspective apply to all child elements (typically best)
TweenLite.set(container, {perspective:500});
//or set a default perspective that will be applied to every individual element that you tween in 3D:
CSSPlugin.defaultTransformPerspective = 500;
//or apply perspective to a single element using "transformPerspective"
TweenLite.set(element, {transformPerspective:500});
//sample css:
.myClass {
    transform: scale(1.5, 1.5) rotateY(45deg) translate3d(10px, 0px, -200px)
}  
//corresponding GSAP transform (tweened over 2 seconds):
TweenLite.to(element, 2, {scale:1.5, rotationY:45, x:10, y:0, z:-200});
//sample css that uses a perspective():
.myClass {
    transform: perspective(500px) rotate(120deg) translateY(50px)
} 
//corresponding GSAP transform (set, not tweened):
TweenLite.set(element, {transformPerspective:500, rotation:120, y:50});
// center is the default
// rotate the element around a point in 3D space other than its center, use the transformOrigin property 
// Notes about 3D transforms:
// In browsers that don’t support 3D transforms, they’ll be ignored. For example, rotationX may not work, but rotation would. See http://caniuse.com/transforms3d for a chart of which browser versions support 3D transforms.
// All transforms are remembered, so you can tween individual properties without worrying that they’ll be lost. You don’t need to define all of the transform properties on every tween – only the ones you want to animate.
// TweenLite has nothing to do with the rendering quality of the element in the browser. Some browsers seem to render transformed elements beautifully while others don’t handle anti-aliasing as well.
// transformOrigin – Sets the origin around which all transforms occur. By default, it is in the center of the element ("50% 50%"). You can define the values using the keywords "top", "left", "right", or "bottom" or you can use percentages (bottom right corner would be "100% 100%") or pixels. If, for example, you want an object to spin around its top left corner you can do this:
//spins around the element's top left corner
TweenLite.to(element, 2, {rotation:360, transformOrigin:"left top"});
// The first value in the quotes refers to the x-axis and the second refers to the y-axis (you can optionally add a 3rd value to define a point in 3D space), so to make the object transform around exactly 50px in from its left edge and 20px from its top edge, you could do:
//spins/scales around a point offset from the top left by 50px, 20px
TweenLite.to(element, 2, {rotation:270, scale:0.5, transformOrigin:"50px 20px"});
// directionalRotation – tweens rotation in a particular direction which can be either clockwise ("_cw" suffix), counter-clockwise ("_ccw" suffix), or in the shortest direction ("_short" suffix) in which case the plugin chooses the direction for you based on the shortest path. For example, if the element’s rotation is currently 170 degrees and you want to tween it to -170 degrees, a normal rotation tween would travel a total of 340 degrees in the counter-clockwise direction, but if you use the “_short” suffix, it would travel 20 degrees in the clockwise direction instead. Example:
TweenLite.to(element, 2, {rotation:"-170_short"});
//or even use it on 3D rotations and use relative prefixes:
TweenLite.to(element, 2, {rotation:"-170_short", rotationX:"-=30_cw", rotationY:"1.5rad_ccw"});
// autoAlpha – the same thing as "opacity" except that when the value hits "0", 
// the "visibility" property will be set to "hidden" in order to improve browser
// rendering performance and prevent clicks/interactivity on the target.
// When the value is anything other than 0, "visibility" will be set to "visible". 
// className – allows you to morph between classes on an element. For example, let’s say myElement has a class of "class1" currently and you want to change to "class2" and animate the differences, you could do this:
TweenLite.to(myElement, 1, {className:"class2"});
// And if you want to ADD the class to the existing one,
// you can simply use the “+=” prefix. To remove a class,
// use the “-=” prefix like this:
TweenLite.to(myElement, 1, {className:"+=class2"});
// autoRound – By default, CSSPlugin will round pixel values and zIndex to the closest integer during the tween (the inbetween values) because it improves browser performance, but if you’d rather disable that behavior, pass autoRound:false in the css object. 
//using the static to() method...
var tween = TweenLite.to(element, 1, {width:"50%"}); 
//or use the object-oriented syntax...
var tween = new TweenLite(element, 1, {width:"50%"});
//pause
tween.pause();
 
//resume (honors direction - reversed or not)
tween.resume();
 
//reverse (always goes back towards the beginning)
tween.reverse();
 
//jump to exactly 0.5 seconds into the tween
tween.seek(0.5);
 
//make the tween go half-speed
tween.timeScale(0.5);
 
//make the tween go double-speed
tween.timeScale(2);
 
//immediately kill the tween and make it eligible for garbage collection
tween.kill();
TweenLite.killTweensOf(myElement);
// sequence
// Of course you could sequence tweens by using the “delay” special property on all your tweens,
// but that can get complicated when you build a long sequence and then later want to change 
// the timing of something early in the sequence (you’d have to adjust all the delay values 
// in tweens after that). Plus it would be a pain to control the whole sequence, like to 
// pause() or resume() or reverse() the group on-the-fly. Sequencing is much easier with
// TimelineLite and its big brother, TimelineMax.
//create a TimelineLite instance
var tl = new TimelineLite();
 
//append a to() tween
tl.to(element, 1, {width:"50%"});
 
//add another sequenced tween (by default, tweens are added to the end of the timeline which makes sequencing simple)
tl.to(element, 1, {height:"300px", ease:Elastic.easeOut});
 
//offset the next tween by 0.75 seconds so there's a gap between the end of the previous tween and this new one
tl.to(element, 1, {opacity:0.5}, "+=0.75");
 
//overlap the next tween with the previous one by 0.5 seconds (notice the negative offset at the end)
tl.to(element, 1, {backgroundColor:"#FF0000"}, "-=0.5");
 
//animate 3 elements (e1, e2, and e3) to a rotation of 60 degrees, and stagger their start times by 0.2 seconds
tl.staggerTo([e1, e2, e3], 1, {rotation:60}, 0.2);
 
//then call myFunction()
tl.call(myFunction);
 
//now we can control the entire sequence with the standard methods like these:
tl.pause();
tl.resume();
tl.restart();
tl.reverse();
tl.play();
 
//jump to exactly 2.5 seconds into the animation
tl.seek(2.5);
 
//slow down playback to 10% of the normal speed
tl.timeScale(0.1);
 
//add a label named "myLabel" at exactly 3 seconds:
tl.add("myLabel", 3);
 
//add a tween that starts at "myLabel"
tl.add( TweenLite.to(element, 1, {scale:0.5}), "myLabel");
 
//jump to "myLabel" and play from there:
tl.play("myLabel");

//repeat this tween 3 times (for a total of 4 cycles) and wait 0.5 seconds between each repeat
TweenMax.to(element, 1, {width:"50%", repeat:3, repeatDelay:0.5});
 
//fade the opacity up and down infinitely (a repeat of -1 means infinitely)
TweenMax.to(element, 1, {opacity:0, repeat:-1, yoyo:true});

var tl = new TimelineMax({repeat:3, yoyo:true, repeatDelay:1,
 onComplete:timelineDone, onCompleteParams:["test1", "test2"]});
tl.staggerTo([e1, e2, e3], 1, {opacity:0, rotation:360}, 0.2);
function timelineDone(p1, p2) {
    console.log("timeline done. params: " + p1 + " and " + p2);
}
// TimelineMax also offers repeat, yoyo, and repeatDelay as well as convenient methods like tweenTo(), currentLabel(), getLabelBefore() and getLabelAfter() and more.
//overwrites all tweens of myElement immediately
TweenLite.to(myElement, 1, {width:"50%", overwrite:"all"});
 
//doesn't overwrite anything (allows conflicts)
TweenLite.to(myElement, 1, {width:"50%", overwrite:"none"});
 
//overwrites only individual overlapping properties on concurrent tweens of myElement (this is the default, so you typically don't need to specify any overwrite in this scenario)
TweenLite.to(myElement, 1, {width:"50%", overwrite:"auto"});
 
//set the default overwrite mode to "all" instead of "auto"
TweenLite.defaultOverwrite = "all";


