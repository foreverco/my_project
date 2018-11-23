var express = require('express');
var app = express();
var request = require('request');
var sd = require('silly-datetime');
app.listen(4000);

app.set('view engine','ejs');

app.use(express.static('./public'));
app.use(express.static('./scripts'));

//处理/请求，显示首页
app.get('/',function(req,res){
   res.render('index');
})

//处理angular路由发生的/index请求
app.get('/index',function(req,res){
   res.render('list');//返回页面视图给路由
   
})

//处理控制器index使用$http发送的请求
app.get('/getIndexData',function(req,res){
   var date = sd.format(new Date(),'YYYY-MM-DD');
   //使用request模块向豆瓣一刻服务器获取数据
   var url = 'https://moment.douban.com/api/stream/date/'+date+'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
   request(url,function(err,response,body){
      if(err){
         console.log(err);
         //返回错误信息，为了区别错误信息与正确信息，将返回数据简单封装一下，
         //status值为NO的，表示错误信息，为OK的表示正确的信息，方便控制器区分返回的信息是否正常
         res.send({status:'NO',data:'请求豆瓣一刻的数据出错'});
         return;
      }
      //没有出错，将得到的数据(body)原封不动的返回给控制器
      res.send({status:"OK",data:body});
   })
})

app.get('/older',function(req,res){
   var date = sd.format(new Date(new Date-365*24*60*60*1000),'YYYY-MM-DD');
   res.render('older',{date:date});
})

app.get('/getOld',function(req,res){
   var date = sd.format(new Date(new Date-2*365*24*60*60*1000),'YYYY-MM-DD');
   var url = 'https://moment.douban.com/api/stream/date/'+date+'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
   request(url,function(err,response,body){
      if(err){
         console.log(err);
         res.send({status:'NO',data:'请求往期内容数据出错'});
         return;
      }
      res.send({status:'OK',data:body});
   })
})

//处理路由发送的 /author请求
app.get('/author',function(req,res){
   var url = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
   request(url,function(err,response,body){
      if(err){
         console.log(err);
         res.render('test',{data:'请求作者的数据出错'});
         return;
      }
      res.render('author',{data:JSON.parse(body).authors});
   })
})