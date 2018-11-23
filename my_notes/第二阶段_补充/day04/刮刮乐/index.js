'use strict';
/**
 * 对象封装一个ggl 对象
 * 一般情况下,初始化值:
 * Str:''
 * Number:0
 * Object:null ||{}
 * Array:[]
 * Boolean : false/true
 * */

var ggl = {
  c1: null, //获取画布元素
  ctx: null, //获取画布对象
  c1_width: 376,
  c1_height: 82,
  ismousedown: false, //判断当前鼠标是否按下
  IS_OK: false, //判断是否刮去一半面积以上
  num: 1, //当前刮的次数
  //初始化方法
  init: function () {
    //初始化画布
    this.c1 = document.getElementById('canvas1');
    this.ctx = this.c1.getContext('2d');
    this.c1.width = this.c1_width;
    this.c1.height = this.c1_height;
    //绘制画布
    this.initCanvas();
    //调用mouse事件的封装
    eventMouse.addMouse.call(this, this.c1, this.mouseDown, this.mouseMove, this.mouseUp);
    //调用initnum
    this.initNum();
    
  },
  initCanvas: function () {
    //此方法绘制画布矩形
    this.ctx.globalCompositeOperation = 'source-over';
    //0.globalCompositeOperation
    //1.设置画布颜色 #797979
    this.ctx.fillStyle = '#797979';
    //2.绘制矩形
    this.ctx.rect(0, 0, this.c1_width, this.c1_height);
    this.ctx.fill();
    //3.绘制文字 30px bold #ddd '刮一刮' '居中对齐'
    this.ctx.font = 'bold 30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#ddd';
    this.ctx.fillText("刮一刮", this.c1_width / 2, this.c1_height / 2 + 10);
    this.ctx.globalCompositeOperation = 'destination-out';
  },
  mouseDown: function (e) {
    /* ismousedown设为true */
    this.ismousedown = true;
    //把之前内存中的事件清除
    e.preventDefault();
  },
  mouseMove: function (e) {
    e.preventDefault();
    //判断鼠标是否按下
    if (!this.ismousedown) {
      return;
    }
    //绘制圆
    //计算id为top的盒子的偏移值
    var left = document.querySelector('#top').offsetLeft,
      topY = document.querySelector('#top').offsetTop;
    var x = e.points.dx - left,
      y = e.points.dy - topY;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 15, 0, Math.PI * 2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
  },
  mouseUp: function (e) {
    e.preventDefault();
    /* 得到canvas画布的整个像素数据 
      ctx.getImageData() 获取画布像素
      像素: rgba 值
    */
    var a = this.ctx.getImageData(0, 0, this.c1_width, this.c1_height);
    console.log(a);
    //遍历a.data 像素数据
    for (var i = 0, j = 0; i < a.data.length; i += 4) {
      if (a.data[i] === 0) {
        j++; //记录像素为空的次数
      }
    }
    console.log(j);
    //当被刮开的区域大于一半时则可以处理结果
    if (j > a.data.length / 8) {
      this.IS_OK = true;
      $('.btn').css('zIndex',10);
    };
    //判断IS_OK
    if (this.IS_OK) {
      //没刮完的自动去除
      this.ctx.clearRect(0, 0, this.c1_width, this.c1_height);
    }
    //把ismousedown射回false
    this.ismousedown = false;
  },
  initNum:function(){
    //把btn的zindex设置为1
    $('.btn').css('zIndex',1);
    $('.btn').css('display','none');

    $('.num1').html(3 - this.num);
    //获取随机数
    var randomNum = function(a,b){
      return Math.floor(Math.random()*(b-a)+a);
    };
    var r = randomNum(0,100);
    //控制中奖概率
    if(33*this.num>r){
      //中奖了
      $('#ok').css('display','block');
      $('#prompt').html('恭喜你中奖了!');
    }else{
      //未中奖
      $('#prompt').html('很遗憾,未中奖!');
      $('#no').css('display','block');
    }
    var self = this;
    //解绑事件
    $('#no').unbind();
    $('#no').on('click',function(){
      self.next();
    })
    //初始化IS_OK
    this.IS_OK = false;
  },
  next:function(){
    if(this.num>=3){
      alert('您的次数用完了!')
    }else{
      this.num ++;
      //初始化按钮
      $('.btn').css('display','none');
      this.initCanvas();
      this.initNum();
    }
  }
};
//当页面加载时
window.onload = function () {
  ggl.init();
}