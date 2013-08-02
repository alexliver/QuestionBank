$(document).ready(function() {
  signin_scroll();
  course_cal();
         $(".cs_college_search").keypress(function() {
          $('.searchexpand').slideDown();
      });
        $(".cs_college_search").blur(function() {
          $('.searchexpand').slideUp();
       });
});
function signin_scroll(){     
  $('.fulltree').click(function(event) {
        $('.orgChart').appendTo('.tree-drop');
        $('.tree-drop').show();
      });
     $('.tree-drop').click(function(event) {
       $('.orgChart').appendTo('.cs_course_tree');
         $('.tree-drop').hide();
     });
   $(document).scroll(function() {
                    var base =$('.cs_course_content').offset().top-20;
                      var b=$(document).scrollTop();
                        var a=$(window).height()*0.3;
                      var c=$('#cs_link1').offset().top-a;
                          var d=$('#cs_link2').offset().top-a;
                           var e=$('#cs_link3').offset().top-a;
                            var f=$('#cs_link4').offset().top-a;
                             var g=$('#cs_link5').offset().top-a;
                        if (b<=base){  
                              $('.cs_signin_topbg').removeClass('fixed');
                              $('.cs_signin_info ul li a').removeClass('active');   
                                 $('.cs_signin_topbg').css('top', 0);     
                        };  
                      if (b>base){
                        $('.cs_signin_topbg').addClass('fixed');    
                                 $('.cs_signin_topbg').css('top', b-290);     
                      };
                      if (b<=d&&b>c){
                        $('.cs_signin_info ul li a').removeClass('active');     
                        $('a.cs_link1').addClass('active');     
                      };
                         if (b<=e&&b>d){
                            $('.cs_signin_info ul li a').removeClass('active');     
                            $('a.cs_link2').addClass('active');         
                        };
                            if (b<=f&&b>e){
                            $('.cs_signin_info ul li a').removeClass('active');     
                            $('a.cs_link3').addClass('active');         
                        };  
                            if (b<=g&&b>f){
                            $('.cs_signin_info ul li a').removeClass('active');     
                            $('a.cs_link4').addClass('active');         
                        };
                            if (b>g){
                            $('.cs_signin_info ul li a').removeClass('active');     
                            $('a.cs_link5').addClass('active');         
                        };
            });        
}
function course_cal(){
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
       events: [
        {
          title: '知识树更新',
          backgroundColor: '#468847',
          borderColor:'#468847',
           textColor:'#fff',
           url: '#cs_link4',
          start: new Date(y, m, 1)
        },
        {
          title: '通知：请同学们下周五前完成练习5',
          // backgroundColor: #468847,
          start: new Date(y, m, d-5,8,0),
          end: new Date(y, m, d-2,12,0),
          allDay: false,
           url: '#cs_link2',
          textColor:'#fff'
        },
        {
          id: 999,
          title: '课时一：something to learn',
          start: new Date(y, m, d-3, 16, 0),
           url: '#cs_link3',
          allDay: false,
          backgroundColor: '#468847',
          borderColor:'#468847',
          textColor:'#fff'
        },
        {
          id: 999,
          title: '课时二：something to learn',
          start: new Date(y, m, d+4, 16, 0),
           url: '#cs_link3',
            backgroundColor: '#468847',
          borderColor:'#468847',
          allDay: false,
          textColor:'#fff'
        },
        {
          title: '测试：习题集一',
          start: new Date(y, m, d, 10, 30),
          allDay: false,
           url: '#cs_link5',
          backgroundColor: 'rgb(185, 74, 72)',  
          borderColor:'rgb(185, 74, 72)'  ,
          textColor:'#fff'
        },
        {
          title: '紧急：下周老师不在',
          start: new Date(y, m, d, 12, 0),
          end: new Date(y, m, d, 14, 0),
          allDay: false,
           url: '#cs_link2',
          backgroundColor: '#f89406', 
          borderColor:'#f89406' ,
          textColor:'#fff'
        },
        {
          title: '通知：balabala',
          start: new Date(y, m, d+1, 19, 0),
          end: new Date(y, m, d+1, 22, 30),
          allDay: false,
          textColor:'#fff'
        }
      ],  
       eventMouseover: function(calEvent, jsEvent, view) {
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
      },
       eventMouseout: function(calEvent, jsEvent, view) {
          $(this).css('box-shadow', 'none');
          $('div.do-problem-note.notes').hide();
          $('div.caldetails.calevent').fadeOut(100);
       }
    });
}