$(document).ready(function(){


   var pagingWidth = $('#paging').width()/2;
   // console.log('pagingWidth : ' + pagingWidth);
   //컨트롤버튼 위치
   $('.control').css({'marginLeft': pagingWidth-8})

   var list = $('.totalWidth'); //ul
   var show_num = 1; //보여질 이미지갯수&복제할이미지갯수
   var li_width = $('#show .totalWidth li div img').width(); //보여질 크기
   var total = $('.totalWidth>li').length; //이미지 갯수
   var num = 0;

   //pagin 초기화
   for(var i = 0; i < total ; i++){
      $('#paging').append('<li><a href="#">'+ (i + 1) +'</a></li>');
      //paging 첫번째일때
      if(i==0){
         $('#paging li a').addClass('active');
      }
   }

   //이전/다음버튼 초기화
   // var arrow = $('#buttons .right');

   //복제하는 변수
   var copyObj = $('.totalWidth li:lt(' + show_num + ')').clone();
   //copy한 거 붙여넣기
   list.append(copyObj)

   //슬라이드 기능
   function slide(){
      //이미지 마지막일때 처음으로 돌아가기
      if(num == total){
         num = 0;
         list.css({'margin-left':0});
      }
      //num 하나씩 증가시켜서 옆으로 넘기기
      num++;
      list.stop().animate({marginLeft: -li_width * num})

      //paging active 클라스 제거
      $('#paging li a').removeClass('active');
      //page 넘어가는거에 맞는 paging에 active 클라스 추가
      $('#paging li a').eq(num).addClass('active');
      //마지막 페이지까지 갔으면 첫번째로 바꿔주기
      if(num == total){
         $('#paging li a').eq(0).addClass('active');
      }
      // console.log('setInterval Num: ' + num);
      return false;
   }
   //슬라이드 셋인터벌로 반복시키기
   play = setInterval(slide,2000);

   //갤러리 정지
   function stop(){
      $('.control .pause').hide();
      $('.control .play').css({'display':'block'});
      clearInterval(play);
   }

   //정지버튼 클릭시
   $('.control .pause').click(function(e){
      e.preventDefault();
      stop();
   })

   // 재생버튼 클릭시
   $('.control .play').click(function(e){
      e.preventDefault();
      //재생버튼 누르면 무조건 다음 이미지로 롤링
      // arrow = $('#buttons .right');
      $(this).hide();
      $('.control .pause').show();
      //자동재생되는 상태가 계속 유지되고 있을 경우
       clearInterval(play);
       play = setInterval(slide, 2000);
   })



   //다음 버튼 클릭시
   $('.right').on('click',function(){
      stop();
      if(num == total){
         num = 0;
         list.css({'margin-left':0});
      }
      num ++;
      list.stop().animate({marginLeft: -(li_width * num)})
      console.log('num:' + num);

      //페이징 활성화
      $('#paging li a').removeClass('active');
      $('#paging li a').eq(num).addClass('active');
      if(num == total){
         $('#paging li a').eq(0).addClass('active');
      }
      // console.log('num: ' + num);
      return false;
   })

   //이전 버튼 클릭시
   $('.left').on('click',function(){
      stop();
      if(num == 0){
         num = total;
         list.css({'margin-left':li_width * -total});
      }
      num--;
      list.stop().animate({marginLeft: -(li_width * num)})
      console.log('num:' + num);

      //페이징 활성화
      $('#paging li a').removeClass('active');
      $('#paging li a').eq(num).addClass('active');
      if(num == total){
         $('#paging li a').eq(0).addClass('active');
      }
      return false;
   })

   //페이징버튼 클릭시
   $('#paging').on('click','a',function(){
      //console.log(this);//클릭한 a 태그
      //ex) <a href="#" class>2</a>
      stop();
      var pagingIndex = $('#paging li a').index(this);
      //console.log('pagingIndex:' + pagingIndex);
      //this의 인덱스값

      //활성화 초기화시키기
      $('#paging li a').removeClass('active');

      //클릭한 페이징버튼 활성화
      $('#paging a').eq(pagingIndex).addClass('active');

      list.stop().css({'margin-left': -(pagingIndex*li_width)},3000);
      //console.log(-pagingIndex*li_width);
      num = pagingIndex;
      return false;
   })
});
