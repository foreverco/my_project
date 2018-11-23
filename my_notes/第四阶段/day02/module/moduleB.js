//这是模块B
//引入moduleA.js
// import fun  from './moduleA.js'
import  * as obj from './moduleA.js';
// console.log(a);
let sum = obj.fun(100);
console.log(sum);

//注意: 在模块B中不要随意修改模块A中的接口

obj.fun1(564564);
obj.fun2(456);
obj.fun3(890);