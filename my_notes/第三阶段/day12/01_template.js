//使用express框架创建服务器
var express=require('express');
var app = express();
app.listen(4000);

//设置视图模板引擎
app.set('view engine','ejs');

app.get('/',function(req,res){
  //处理的请求路径忽略大小写
  //忽略参数
  // console.log(req._parsedUrl);
  // res.send('服务器返回的数据');
  //模拟数据
  var data = {stus:[
    {id:1,name:'张三',sex:'M',age:23},
    {id:2,name:'李四',sex:'M',age:25},
    {id:3,name:'王五',sex:'M',age:21},
    {id:4,name:'赵六',sex:'M',age:29}
  ]};
  res.render('01_template',data);
});