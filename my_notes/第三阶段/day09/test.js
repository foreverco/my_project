var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var server = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  if(req.url == '/favicon'){
    return;
  }
  var pathname = url.parse(req.url).pathname;
  // console.log(pathname);
  if(req.url == '/'){
    //显示form页面
    fs.readFile('./form.html',function(err,data){
      if(err){
        console.log(err);//打印错误信息
        res.end('加载错误信息');//返回响应
        return;
      }
        res.end(data);//正确结果，返回数据
    })
  }else if(req.url == '/index'){//处理/提交的请求
    console.log(req.url);
    res.end('成功接收到请求数据');
  }else{
    //其他情况，不做处理，直接返回
    res.end('请求地址出错');
  }
});

server.listen(4000,'localhost');