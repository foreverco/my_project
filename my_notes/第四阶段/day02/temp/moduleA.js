"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//这是模块A
var a = 20;
//把 a 输出出去

var fun = function fun(y) {
  var x = 10;
  return x + y + a;
};

//当输出的接口只有一个时,就可以用default
//default 在一个模块中,只能用一次
// export default fun;


/* export {
  //直接写方法名
  fun
}; */

//例子3
var fun1 = function fun1(aa) {
  console.log(aa);
};
var fun2 = function fun2(bb) {
  console.log(bb);
};
var fun3 = function fun3(cc) {
  console.log(cc);
};

exports.fun = fun;
exports.fun1 = fun1;
exports.fun2 = fun2;
exports.fun3 = fun3;