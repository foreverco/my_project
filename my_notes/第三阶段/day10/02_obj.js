//引入
var stu = require('./Student.js');

//创建对象
var s1 = new stu('李四','40');
console.log('属性:'+s1.name+','+s1.age);
s1.study();
s1.sayHi();