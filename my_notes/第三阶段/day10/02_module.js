//引用a.js文件
var a = require('./a.js');

//调用属性
console.log('module中调用a.js的属性:'+a.attr);
console.log('module中调用a.js的方法:');
a.func();

