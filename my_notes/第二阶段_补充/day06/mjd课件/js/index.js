/**移动端轮播
 *  1.自动轮播(定时器+C3-位移 + 过渡,无缝衔接-过渡结束 + 定位)
 *  2.点要跟随轮播改变样式
 *  3.可以滑动轮播图(touch事件)
 * */
window.onload = function () {
  mySwiper();
  search();
  downTime();
}


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

//2.搜索区域滚动效果

function search() {
  /**
   * 1.颜色随着页面滚动,逐渐加深(变的不透明)
   * 2.当滚动的距离超过轮播图高度的时候,颜色保持不变
   *  浏览器滚动事件  window.onscroll
   *    监听滚动高度 document.body.scrollTop
   */

  //获取搜索盒子
  var searchBox = document.querySelector('.jd_header_box');
  var banner = document.querySelector('.jd_banner');
  var baHeight = banner.offsetHeight;
  /* var changeColor = function (y) {
    search.style.background = 'rgba(201,21,35,255)';
  }; */
  //监听滚动事件
  /* searchBox.addEventListener('onscroll',function(){
    alert(123);
  }) */
  window.onscroll = function () {
    var top = document.documentElement.scrollTop;
    console.log(top);
    var opacity = 0;
    if (top < baHeight) {
      //设置透明度
      opacity = top / baHeight;
      searchBox.style.background = 'rgba(201,21,35,' + opacity + ')'
    } else {
      opacity = 1;
    }
  }
}

function downTime() {
  function Get() {
    var time = new Date().getTime();
    var end = new Date('2018-10-30 00:00:00').getTime();
    var down = end - time;
    var ms = down % 1000;
    var s = ((down - ms) / 1000) % 60;
    s < 10 ? s = '0' + s : s;
    var ss = String(s);
    var sss = ss.split('');
    var m = (((down - ms) / 1000 - s) / 60) % 60;
    m < 10 ? m = '0' + m : m;
    var mm = String(m);
    var mmm = mm.split('');
    var h = ((((down - ms) / 1000 - s) / 60 - m) / 60) % 60;
    h < 10 ? h = '0' + h : h;
    var hh = String(h);
    var hhh = hh.split('');
    var a = document.querySelectorAll('.sk_time span');
    a[0].innerHTML = hhh[0];
    a[1].innerHTML = hhh[1];
    a[3].innerHTML = mmm[0];
    a[4].innerHTML = mmm[1];
    a[6].innerHTML = sss[0];
    a[7].innerHTML = sss[1];
  }
  Get();
  setInterval(Get,1000)
}