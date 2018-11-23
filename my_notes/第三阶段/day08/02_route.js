//1)
var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
  // res.end('sencond node!');
  /* 
    因为NodeJs没有根目录，所以无法通过localhost:3000/02_route.html来访问该文件中的内容可以使用fs模块来实现这个功能
  */

  //使用fs来读取02——route.html的内容，并将读取到的数据，作为响应内容，返回给页面
  fs.readFile('./02_route.html',function(err,data){
    if(err){
      //读取文件出错了
      console.log(err);//打印错误信息
      res.end('read file error!');//返回信息
    }else{
      //读取文件成功
      console.log(data.toString());
      res.end(data);//返回读取的数据
    }
  });
});
server.listen(3000,'localhost');