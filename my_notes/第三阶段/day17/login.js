var express = require('express');
var app = express();
app.listen(4000);

app.set('view engine','ejs');

app.get('/',function(req,res){
   res.render('login');
})

app.get('/login',function(req,res){
   var username =req.query.username;
   var pwd =req.query.pwd;
   console.log(username);
   console.log(pwd);
   if(username == 'zhangsan'&& pwd == '123'){
      res.cookie('username',username);
      res.cookie('pwd',pwd);
      res.send('登录成功');
   }else{
      res.send('登录失败');
   }
})