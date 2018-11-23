var request = require('request');
var app = require('express')();
app.listen(4000);

app.get('/',function(req,res){
   var url = 'https://www.baidu.com';
   request(url,function(err,response,body){
      res.send(body);
   })
})