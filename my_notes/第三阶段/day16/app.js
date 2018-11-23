var express = require('express');
var app = express();
var bdParser = require('body-parser');
var db = require('./db/db.js');
var fd = require('formidable');
var sd = require('silly-datetime');
app.listen(4000);

app.set('view engine','ejs');

app.use(bdParser.urlencoded({extended:true}));

// app.use(express.static('./public'));

app.get('/',function(req,res){
   db.findAll('message',function(err,docs){
         console.log(docs);
   res.render('index',{docs:docs});

   })

});


app.post('/tijiao',function(req,res){
   var username = req.body.username;
   var msg = req.body.msg;
   var time = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
   var json ={username:username,msg:msg,time:time};
   db.add('message',json,function(err,result){
      console.log(result);
   });
   res.redirect('/');
 })

