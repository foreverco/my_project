var qs =require('qs');

var url = '/a/b/c?a=1&b=3&name=zhangsan';

//使用qs转换字符串为对象
var obj = qs.parse(url);
console.log(obj);
