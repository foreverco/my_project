/**移动端轮播
 *  1.自动轮播(定时器+C3-位移 + 过渡,无缝衔接-过渡结束 + 定位)
 *  2.点要跟随轮播改变样式
 *  3.可以滑动轮播图(touch事件)
 * */

/* 面向对象的方式重构代码 */
//单利模式
var mySwiper = {
  banner: null,
  baWidth: null,
  imgBox: null,
  pointBox: null,
  points: null,
  imgs: null,
  startX: 0,
  moveX: 0,
  distanceX: 0,
  ISMOVE: false,
  index: 1,
  timer: null,

  initSwiper: function () {
    this.banner = document.querySelector('.jd_banner');
    this.baWidth = this.banner.offsetWidth;
    this.imgBox = this.banner.children[0];
    this.imgs = this.imgBox.querySelectorAll('li');
    this.pointBox = this.banner.children[1];
    this.points = this.pointBox.querySelectorAll('li');
    //调用setTimer 启动定时器
    this.setTimer();
    //添加页面可见事件 visibilitychange
    document.addEventListener('visibilitychange',function(e){
      if(document.hidden){
        clearInterval(self.timer);
        self.timer = null;
      }else{
        self.setTimer();
      }
    })
    var self = this;
    self.imgBox.addEventListener('webkitTransitionEnd', function () {
      //处理过渡事件结束的业务逻辑
      if (self.index >= self.imgs.length - 1) {
        self.index = 1;
        self.clearTransition();
        //调用位移
        self.addTranslate(-self.baWidth * self.index);
      } else if (self.index <= 0) {
        self.index = 8;
        self.clearTransition();
        self.addTranslate(-self.index * self.baWidth);
      }
      //调用setpoint
      self.setPoint();
    })

    this.imgBox.addEventListener('touchstart', function (e) {
      e.preventDefault();
      //停止轮播 关闭计时器
      clearInterval(self.timer);
      self.timer = null;
      //记录startX
      self.startX = e.touches[0].pageX;
    });
    this.imgBox.addEventListener('touchmove', function (e) {
      e.preventDefault();
      self.ISMOVE = true; //表示滑动
      self.moveX = e.touches[0].pageX;
      // console.log(moveX);
      self.distanceX = self.moveX - self.startX;
      //重新定位
      self.clearTransition(); //清除过渡
      self.addTranslate(-self.index * self.baWidth + self.distanceX);
    });
    this.imgBox.addEventListener('touchend', function (e) {
      e.preventDefault();
      if (!self.ISMOVE) { //判断ISMOVE  即是否滑动过
        return;
      }
      //Math.abs() 取绝对值
      if (Math.abs(self.distanceX) > self.baWidth / 3) { //表示滑动有效
        //判断右滑(上一张)还是左滑(下一张)
        if (self.distanceX > 0) { //上一张
          self.index--;
        } else { //下一张
          self.index++;
        }
        //调用位移和过渡方法
        self.addTransition();
        self.addTranslate(-self.index * self.baWidth);
      } else { //滑动无效
        //吸附回去
        self.addTransition();
        self.addTranslate(-self.index * self.baWidth);
      }
      //重新初始化全局参数,放置对下一次滑动有影响
      self.startX = 0,
        self.moveX = 0,
        self.distanceX = 0,
        self.ISMOVE = false;
      //再次开始计时器
      self.setTimer();
    });
  },

  addTransition: function () {
    this.imgBox.style.transition = 'all .3s ease-out';
    this.imgBox.style.webkitTransition = 'all .3s ease-out';
  },
  addTranslate: function (x) {
    this.imgBox.style.transform = 'translateX(' + x + 'px)';
    this.imgBox.style.webkitTransform = 'translateX(' + x + 'px)';
  },
  clearTransition: function () {
    this.imgBox.style.transition = 'none';
    this.imgBox.style.webkitTransition = 'none';
  },
  setTimer: function () {
    var self = this;
    self.timer = setInterval(function () {
      self.index++;
      //调用 定位 过渡
      self.addTransition();
      self.addTranslate(-self.baWidth * self.index);
      console.log(123);
    }, 1000)
  },
  setPoint: function () {
    for (key in this.points) {
      this.points[key].className = '';
    }
    this.points[this.index - 1].className = 'now';
  }
};

window.onload = function () {
  mySwiper.initSwiper();
}