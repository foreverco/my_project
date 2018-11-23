var express = require('express');
var app = express();
app.listen(4000);

var bdParser = require('body-parser');

var mongoClient = require('mongodb').MongoClient;

app.set('view engine','ejs');

app.use(bdParser.urlencoded({extended:true}));

app.get('/',function(req,res){
   res.render('login');
})

app.post('/login',function(req,res){
   var params = req.body;

   var username = params.username;
   var pwd = params.password;

   var json ={name:username,pwd:pwd};

   var url = 'mongodb://localhost:27017';
   mongoClient.connect(url,{useNewUrlParser:true},function(err,client){
      if(err){
         console.log(err);
         res.send('连接服务器失败');
         return;
      }
      var coll = client.db('web1807').collection('student');
      coll.find(json).toArray(function(err,result){
         if(err){
            console.log(err);
            res.send('登录失败');
         }else{
            if(result.length>0){
               console.log(result);
               res.send('登录成功');
            }else{
               res.send('登录失败，用户名密码错误');
            }
         }
         client.close();
      })
   })
})
