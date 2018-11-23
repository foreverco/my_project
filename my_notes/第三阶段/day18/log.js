var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.listen(4000);

app.use(cookieParser());

app.set('view engine','ejs');

app.get('/',function(req,res){
   //查询中是否有登录信息
   var cookies = req.cookies;
   if(cookies.username){
      res.send('欢迎你'+cookies.username);
   }else{
      res.render('log');
   }
})

app.get('/log',function(req,res){
   var username = req.query.username;
   var pwd = req.query.pwd;
   //判断用户名和密码是否正确
   if(username == 'curry' && pwd == '123456'){
      //用户名和密码正确，登录成功
      //保存登录信心
      res.cookie('username',username,{maxAge:90000000000000000});
      res.send('欢迎你'+username);
   }
   res.send('用户名和密码错误！');
})
