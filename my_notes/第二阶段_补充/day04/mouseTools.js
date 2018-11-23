'use strict'
/* 创建对象 */
var eventMouse = {
  /**
   * 添加一个方法
   * 绑定事件:addEventListener(事件名,处理函数,boolean)
   * 参数:
   * elem : 绑定事件的DOM对象
   */
  addMouse: function (elem, mDown, mMove, mUp) {
    if(elem && typeof elem !=='object'){
      return;
    }
    //留住this
    var self = this;
    /* 绑定mousedown */
    elem.addEventListener('mousedown', function (e) {
      //调用getPoint方法,获取坐标值
      e.points = getPoint(e);
      //内部调用mDown 方法
      mDown && mDown.call(self,e); //逻辑判断
    });
    //绑定mousemove
    elem.addEventListener('mousemove', function (e) {
      e.points = getPoint(e);
      mMove && mMove.call(self,e);
    });
    //绑定mouseup
    elem.addEventListener('mouseup', function (e) {
      e.points = getPoint(e);
      mUp && mUp.call(self,e);
    });
    /**
     *  获取鼠标的x,y轴坐标 
     * 参数: 
     * e : event对象
     * elem : DOM元素
     */
    function getPoint(e) {
      // event对象记录了坐标值 pageX,pageY
      var x = e.pageX - elem.offsetLeft,y = e.pageY - elem.offsetTop;
      return {
        dx:x,
        dy:y
      }
    }
  },


}