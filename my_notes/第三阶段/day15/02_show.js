var express = require('express');
var app = express();
app.listen(4000);
app.set('view engine','ejs');

var mongoClient = require('mongodb').MongoClient;

app.get('/',function(req,res){
   var url = 'mongodb://localhost:27017';
   mongoClient.connect(url,function(err,client){
      var coll = client.db('web1807').collection('student');
      coll.find({}).toArray(function(err,docs){
         if(err){
            console.log(err);
            res.send('读取失败');
         }else{
            console.log(docs);
            res.render('show',{stus:docs});
         }
         client.close();
      });
   })
});

