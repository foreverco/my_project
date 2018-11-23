var express = require('express');
var app = express();
app.listen(4000);

//访问/ 请求 服务器生成cookie发送给浏览器
// 浏览器保存cookie
app.get('/',function(req,res){
   //设置cookie
   //属性名为 username,值为Stephen curry
   res.cookie('username','Stephen curry');
   //可以设置多个cookie，但是属性名不能一样
   res.cookie('age','29');
   res.cookie('sex','male');
   //如果属性名一样，后面的值会覆盖前面的
   res.cookie('username','kobe byant');


   res.send('访问/请求');
})