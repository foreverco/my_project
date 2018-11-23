//1.自动轮播
function mySwiper() {
  //轮播的盒子
  var banner = document.querySelector('.jd_banner');
  //图片宽度
  var baWidth = banner.offsetWidth;
  //图片的盒子
  var imgBox = banner.children[0];

  var imgs = imgBox.querySelectorAll('li');
  //点的盒子
  var pointBox = banner.children[1];
  //获取所有的点 的集合
  var points = pointBox.querySelectorAll('li');

  //定义过渡方法
  var addTransition = function () {
    imgBox.style.transition = 'all .3s ease-out';
    //兼容写法
    imgBox.style.webkitTransition = 'all .3s ease-out';
  }
  //定义位移方法
  var addTranslate = function (x) {
    imgBox.style.transform = 'translateX(' + x + 'px)';
    imgBox.style.webkitTransform = 'translateX(' + x + 'px)';
  };
  //定义出清过渡方法
  var clearTransition = function () {
    imgBox.style.transition = 'none';
    imgBox.style.webkitTransition = 'none';
  };
  var index = 1;
  //定义定时器,实现自动轮播setInterval()
  var timer = setInterval(function () {
    index++;
    //调用 定位 过渡
    addTransition();
    addTranslate(-baWidth * index);
    console.log(123);
  }, 1000);
  //绑定过渡结束事件,重新定位到第一张图片
  imgBox.addEventListener('webkitTransitionEnd', function () {
    //处理过渡事件结束的业务逻辑
    if (index >= imgs.length - 1) {
      index = 1;
      clearTransition();
      //调用位移
      addTranslate(-baWidth * index);
    } else if (index <= 0) {
      index = 8;
      clearTransition();
      addTranslate(-index * baWidth);
    }

    //调用setpoint
    setPoint();
  })

  //点需要跟随滚动 改变当前li的样式
  function setPoint() {
    for (key in points) {
      points[key].className = '';
      // points[key].classList.remove('now');
    }
    points[index - 1].className = 'now';
    // points[index-1].classList.add('now');
  }

  /** 绑定touch事件,滑动图片
   * 需要初始化的变量:
   * startX
   * moveX
   * distanceX
   * ISMOVE
   */
  var startX = 0, //记录开始触摸的X轴坐标
    moveX = 0, //记录滑动的X轴的坐标
    distanceX = 0, //记录滑动的距离 moveX-startX
    ISMOVE = false; //表示是否滑动过
  // 绑定touchstart事件
  imgBox.addEventListener('touchstart', function (e) {
    e.preventDefault();
    //停止轮播 关闭计时器
    clearInterval(timer);
    timer = null;
    //记录startX
    startX = e.touches[0].pageX;
    console.log(startX);
  })
  //绑定toucheMove
  imgBox.addEventListener('touchmove', function (e) {
    e.preventDefault();
    ISMOVE = true; //表示滑动
    moveX = e.touches[0].pageX;
    // console.log(moveX);
    distanceX = moveX - startX;
    console.log(distanceX);
    //重新定位
    clearTransition(); //清除过渡
    addTranslate(-index * baWidth + distanceX);
  })
  //绑定touchend事件
  //当滑动距离不超过图片的1/3时,当前滑动无效,当滑动无效,吸附回去
  //当滑动距离超过图片的1/3时,当前滑动生效,切换下一张或上一张
  imgBox.addEventListener('touchend', function (e) {
    e.preventDefault();
    if (!ISMOVE) { //判断ISMOVE  即是否滑动过
      return;
    }
    //Math.abs() 取绝对值
    if (Math.abs(distanceX) > baWidth / 3) { //表示滑动有效
      //判断右滑(上一张)还是左滑(下一张)
      if (distanceX > 0) { //上一张
        index--;
      } else { //下一张
        index++;
      }
      //调用位移和过渡方法
      addTransition();
      addTranslate(-index * baWidth);
    } else { //滑动无效
      //吸附回去
      addTransition();
      addTranslate(-index * baWidth);
    }
    //重新初始化全局参数,放置对下一次滑动有影响
    startX = 0,
      moveX = 0,
      distanceX = 0,
      ISMOVE = false;

    //再次开始计时器
    timer = setInterval(function () {
      index++;
      addTransition();
      addTranslate(-index * baWidth);
    }, 1000)
  });
}