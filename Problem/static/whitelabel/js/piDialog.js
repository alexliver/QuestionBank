//////////////////////////////////////////pi_dialog////////////////////////////////////////////////////
var piDialog = function () {
    $.extend(this, piDialog.defaultOptions);
};
piDialog.prototype={
   fillIn: function(link,p,t,fid){
            var a=$('<div/>').addClass('pi_dialog pi_modal fill');
            var b=$('<div/>').addClass('modal-setdetail-head');
            var c=$('<strong>'+t+'</strong>');
            var d=$('<hr>');
            var e=$('<div/>').addClass('modal-setdetail-footer');
            var g=$('<button class="pi_dialog_yes">提交</button>');
            var i=$('<form><textarea name="" id="" cols="30" rows="10"></textarea></form>');
            a.attr('id', fid);
            c.appendTo(b);
            g.appendTo(e);
            c.appendTo(b);
            b.appendTo(a);
            e.appendTo(a);
            d.appendTo(b);
            i.appendTo(b);  
            a.appendTo('body');
            piDialog.prototype.dr();
            link.click(function() {
                          i.find('textarea').val('').attr('placeholder', p);
                          var thislink=$(this);
                          piDialog.prototype.dr();
                          $('div.pi_modal.fill#'+fid).show();
                          $('div.pi_drop').show();
                          piDialog.prototype.drop();
                          piDialog.prototype.specialFill(fid,c,g,i,thislink,a);
            });
   },
   dialog: function(link,t,did){
                        var a=$('<div/>').addClass('pi_dialog pi_modal').attr('id', did);;
                        var b=$('<div/>').addClass('modal-setdetail-head');
                        var c=$('<strong>请确认</strong>');
                        var d=$('<hr>');
                        var e=$('<div/>').addClass('modal-setdetail-footer');
                        var g=$('<button class="pi_dialog_yes">确认</button>');
                        var h=$('<button class="pi_dialog_no">取消</button>');
                        var p=$('</p>');
                        p.text(t);
                        h.appendTo(e);
                        g.appendTo(e);
                        c.appendTo(b);
                        d.appendTo(b);
                        p.appendTo(b);
                        b.appendTo(a);
                        e.appendTo(a);
                        a.appendTo('body');
                         link.click(function() {
                                      var thislink=$(this);
                                      piDialog.prototype.dr();
                                      $('div.pi_dialog#'+did).show();
                                      $('div.pi_drop').show();
                                      piDialog.prototype.drop();
                                      piDialog.prototype.specialDialog(did,$(this),g,h,p,thislink,a);
                        });
   },
   specialFill:function(fid,c,g,i,thislink,a){

   },
   specialDialog:function(did,t,g,h,p,thislink,a){
    //define types here
  //d124:delete create problem
  //d55 subscribe question set
    if (did=='d13') { 
          g.click(function() {
          piDialog.prototype.hidden();
          });
          h.click(function() {
          piDialog.prototype.hidden();
          });
      };
      if (did=='d55') { 
          g.click(function() {
          piDialog.prototype.hidden();
          });
        h.click(function() {
        piDialog.prototype.hidden();
        });
      };
      	if (did=='d124') { 
             var thatp=t.parent().parent().parent().parent().parent();
             g.click(function() {
      		thatp.remove();
      		piDialog.prototype.hidden();
      		});
		h.click(function() {
		piDialog.prototype.hidden();
		});
      	};
	if (did=='d125') { 
		p.text('确定离开该知识树进入"'+thislink.text()+'"知识树？'+'    '+'如需保存,请先点击保存,然后点确认');
		$('<button class="pi_dialog_save">保存</button>').appendTo(a.children('.modal-setdetail-footer'));
	};
	if (did=='d126') { 
		g.click(function() {
		Dajaxice.Problem.delete_event(event_callback,{'event':$('#id_event_id').val()}); 
		piDialog.prototype.hidden();
		});
		h.click(function() {
		piDialog.prototype.hidden();
		});	
      	};
},
ddrop:function(){
             $('div.pi_drop').click(function() {
                 $("div.pi_modal").hide();
                 $('div.pi_drop').hide();
            });
             $('div.pi_dialog button').click(function(event) {
                  $("div.pi_modal").hide();
                 $('div.pi_drop').hide();
             });
},
     promoteN: function(type){
            piDialog.prototype.pop(type);
            piDialog.prototype.drop();
            piDialog.prototype.buttonN(type);
   },
   promote: function(type,message){
            piDialog.prototype.pop(type);
            piDialog.prototype.drop();
            piDialog.prototype.button(type,message);
   },
   pop: function (type) {
           $("div.pi_modal."+type).show();
           $('div.pi_drop').show();
  },
  bpop: function (type) {
          $("div.pi_modal."+type).show();
           $('div.pi_drop').show();
           $('section#content,header,div.topline,footer,nav').addClass('blurbg')
  },
  hidden:function(){
        $("div.pi_modal").hide();
     $('div.pi_drop').hide();
  },
  drop: function () {
    $('div.pi_drop').click(function() {
     $("div.pi_modal").hide();
     $('div.pi_drop').hide();
     $('section#content,header,div.topline,footer,nav').removeClass('blurbg');
    });
  },
  button: function(type,message){
      $('div.pi_modal.'+type+'>div.modal-setdetail-footer>button').click(function(type) {
      $("div.pi_modal").hide();
      $('div.pi_drop').hide();
       $('section#content,header,div.topline,footer,nav').removeClass('blurbg');
        informSys.dialog.dialogSysN(message,5000);
        $(this).unbind('click');
     });
    },
     buttonN: function(type){
      $('div.pi_modal.'+type+'>div.modal-setdetail-footer>button').click(function(type) {
      $("div.pi_modal").hide();
      $('div.pi_drop').hide();
       $('section#content,header,div.topline,footer,nav').removeClass('blurbg');
     });
    },
    aIn:  function(type){
     $('div.pi_drop').show();
    TweenLite.set(type, {scale:0.5, rotationX:70, autoAlpha:0, y:-300, z:-500, transformPerspective:600, display:"block"});
    TweenLite.to(type, 0.05, {autoAlpha:1, scale:1, ease:Back.easeOut.config(1.5), delay:0.01});
    TweenLite.to(type, 0.6, {rotationX:0, y:0, z:0, ease:Back.easeOut.config(1), delay:0.05, clearProps:"transform"});
    },
    aOut: function(type){  
       $('div.pi_drop').click(function(type) {
        TweenLite.to(type, 0.5,{scale:0.5, rotationX:70, autoAlpha:0, y:-300, z:-500, ease:Power2.easeIn, transformPerspective:600, display:"block"});
        $('div.pi_drop').hide();
        $('section#content,header,div.topline,footer,nav').removeClass('blurbg');
      });
     },
    aItemIn: function (item){
        TweenLite.fromTo(item, 0.6, {rotationX:90, transformPerspective:1000, opacity:0, transformOrigin:"50% 50% -100px"}, {rotationX:0, opacity:1, ease:Power2.easeInOut, clearProps:"transform", immediateRender:true}, 0.01);
      },
    aItemOut: function (item){
          TweenLite.fromTo(item, 0.6, {rotationX:0, opacity:1, transformPerspective:1000, transformOrigin:"50% 50% -100px"}, {rotationX:-90, opacity:0,display:"none", ease:Power2.easeInOut, clearProps:"transform", immediateRender:true}, 0.01);
    },
    dr: function(){
            $('div.pi_modal').draggable({ handle: ".modal-setdetail-head" });
            $('div.pi_modal').resizable({ handles: "e" });
    },
    d: function(){
             $('div.pi_modal').draggable({ handle: ".modal-setdetail-head" });
    },
    r: function(){
             $('div.pi_modal').resizable({ handles: "e" });
    }
}
piDialog.defaultOptions = {
    pi:$("div.pi_modal"),
    droper:  $('div.pi_drop'),
    blurObj: $('section#content,header,div.topline,footer,nav'),
    type: 'pi',
    trigger:''
};
