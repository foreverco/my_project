$(function () {
  //当文档加载完成才执行
  //获取屏幕宽度
  function resize() {
    var windowWidth = $(window).width();
    //判断屏幕属于大还是小
    var isSmallScreen = windowWidth < 768;
    //根据大小为界面上的每一张轮播图设置背景
    // $('#main_ad>.carousel-inner>.item')//获取到的是dom数组(多个元素)
    $('#main_ad>.carousel-inner>.item').each(function (i, item) {
      var $item = $(item); //因为拿到的是DOM对象 需要转换
      var imgSrc = $item.data(isSmallScreen ? 'img-xs' : 'img-lg');
      //设置背景图片
      $item.css('backgroundImage', "url('" + imgSrc + "')");
      //因为我们希望小图时 尺寸等比例变化 所以小图使用img方式
      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="">');
      } else {
        $item.html('');
      }
    })

    /* 
   控制标签页的标签宽度
  */
    var $ulContainer = $('.nav-tabs');
    //获取所有子元素的宽度和
    var width = 30; //因为原本ul上有padding-left
    //遍历子元素
    $ulContainer.children().each(function (index, elem) {
      width += elem.clientWidth;
    })
    //此时width等于所有li的总和
    //判断当前ul的宽是否超出屏幕,如果超出就显示横向滚动条
    if (width > $(window).width()) {
      $ulContainer.css('width', width).parent().css('overflow-x', 'scroll');
    } else {
      $ulContainer.css('width', 'auto').parent().css('overflow-x', '');
    }
  }
  $(window).on('resize', resize).trigger('resize');

  //初始化tooltips插件
  $('[data-toggle="tooltip"]').tooltip();

  //a点击注册事件
  var $newTitle = $('.news-title');
  $('#news .nav-pills a').on('click',function(){
    //获取当前点击的元素
    var $this = $(this);
    //获取对应的title值
    var title = $this.data('title');
    //讲title设置到相应的位置
    $newTitle.text(title);
  });

  //1.获取手指在轮播图元素上的一个滑动方向(左右)

  //手指触摸开始记录一下手指所在的坐标x
  //结束触摸一顺街,记录最后手指所在的坐标
  //获取界面上的轮播图容器
  var $carousels = $('.carousel');
  //注册滑动事件
  //开始触摸
  var startX;
  var offset = 50;
  $carousels.on('touchstart',function(e){
    startX = e.originalEvent.touches[0].pageX
    console.log(startX);
  })
//手指离开
  var endX;
  $carousels.on('touchmove',function(e){
    endX = e.originalEvent.touches[0].pageX;
  })

  $carousels.on('touchend',function(e){
    console.log(endX);
    // 控制精度
    //获取每次运动的距离,当距离大于一定值时认为有方向变化
    var distance = Math.abs(startX-endX);
   if(distance > offset){
      //2.根据获得到的方向选择上一张或者下一张
    //  console.log(startX>endX ?'左':'右');
    $(this).carousel(startX>endX ?'next':'prev');
   }
  })

});