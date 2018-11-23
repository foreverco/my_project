var express =require('express');
var session = require('express-session')
var app = express();
app.listen(4000);

app.use(session({
   secret: 'keyboard cat',//通过字符串获取一个hash值，用于生成一个sessionID
   resave: false,
   //resave: 是否强制自动保存，即使数据在请求期间没有被修改
   saveUninitialized: true
   //强制保存未初始化的session
}))

app.get('/',function(req,res){
   res.send('index');
})

//设置session
app.get('/setSession',function(req,res){
   //session是通过req来设置的
   req.session.username = 'zhangsan';
   res.end('set');

})

//获取session
app.get('/getSession',function(req,res){
   //session是通过req来获取的
   var username = req.session.username;
   var age = req.session.age;//查看未设置的值
   console.log(username);
   console.log(age);
   res.end('get');
})