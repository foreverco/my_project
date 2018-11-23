var express = require('express');
var session = require('express-session');

var app = express();
app.listen(4000);

app.set('view engine','ejs');

app.use(session({
   secret: 'keyboard cat',//通过字符串获取一个hash值，用于生成一个sessionID
   resave: false,
   //resave: 是否强制自动保存，即使数据在请求期间没有被修改
   saveUninitialized: true,
   cookies:{maxAge:3650000000}
}));

app.get('/',function(req,res){
   //判断session中有没有保存登录的讯息username
   console.log(req.session);
   if(req.session.username){
      //找到了登录信息，说明已经登录
      res.send('欢迎你'+req.session.username+'<a href="/logout">退出登录</a>');
   }else{
      //没找到登录信息
      res.render('log');
   }
})

app.get('/log',function(req,res){
   var username = req.query.username;
   var pwd = req.query.pwd;
   // console.log(pwd);
   // console.log(username);
   if(username == 'zhangsan' && pwd == '123456'){
      //登录成功
      //保存登录信息
      req.session.username = username;
      console.log(req.session);
      //跳转页面
      res.send('欢迎你'+username+'<a href="/logout">退出登录</a>');

   }else{
      res.send('用户名或密码错误');
   }

})

//处理logout请求
app.get('/logout',function(req,res){
   //删除session
   req.session.destroy(function(err){
      if(err){
         res.send('退出失败');
      }else{
         res.send('退出成功');
      }
   });
})