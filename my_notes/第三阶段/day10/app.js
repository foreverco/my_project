var app = require('./route.js');
var fs = require('fs');
// var url = require('url');
var http = require('http');

http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return;
  }
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  if(req.url=='/'){
   app.showIndex(req,res);
  }else if(req.url=='/info'){
   app.showInfo(req,res);
  }else{
    app.showError(req,res);
  }
}).listen(4000,'localhost');