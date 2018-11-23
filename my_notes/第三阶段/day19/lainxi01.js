var express = require('express');
var cookie = require('cookie-parser');
var app = express();
app.listen(4000);

app.use(cookie());

app.use(function(req,res,next){
   if(req.url == '/favicon.ico'){
      return;
   }
   //从cookie中获取count值,将其装换为数字
   var count = req.cookies.count;//上一次次数
   if(count){//判断cookie中是否包含count
      //找到了数据，不是第一次访问，可以自增
      count++;//本次访问+1
   }else{
      //第一次访问时
      count = 1;
   }
   //将最新count重新保存进cookie
   res.cookie('count',count);
   // console.log(req.cookies);
   res.write('you have visited this site '+count+' times\n');
   next();
});
app.get('/',function(req,res){
   res.end('index');
});
app.get('/a',function(req,res){
   res.end('aaa');
});
app.get('/b',function(req,res){
   res.end('bbb');
});

//处理错误地址
app.use(function(req,res){

   res.end('error');
})