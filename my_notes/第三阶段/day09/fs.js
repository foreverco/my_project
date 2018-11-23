var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res){
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  if(req.url == '/favicon.ico'){
    return;
  }
  if(req.url == '/circle'){
    //读取圆形页面
    fs.readFile('./circle.html',function(err,data){
      if(err){
        res.end('读取页面出错');
      }else{//读取正常，返回数据
        res.end(data);
      }
    });
  }else if(req.url == '/square'){
    //读取方形页面
    fs.readFile('./square.html',function(err,data){
      if(err){
        res.end('读取页面出错');
        return;
      }
        res.end(data);
    });
  }else{
    res.end('地址错误');
  }
});
server.listen(4000, 'localhost');