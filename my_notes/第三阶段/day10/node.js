fs = require('fs');
var http = require('http');
var url = require('url');



/* fs.mkdir('./project',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
});

fs.mkdir('./project/css',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
});

fs.mkdir('./project/js',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
});

fs.mkdir('./project/img',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
});

fs.writeFile('./project/index.html',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
});

fs.writeFile('./project/css/index.css','backgroud:red;',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
});

fs.writeFile('./project/js/index.js','var num = 1;',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
});

fs.writeFile('./project/img/1.jpg',function(err){
  if(err){
    console.log('创建失败');
  }else{
    console.log('创建成功');
  }
}); */

var server = http.createServer(function(req,res){
  if(req.url == '/faviicon.ico'){
    return;
  }
  // res.writeHead(200,'Content-Type':'text/html;charset=utf-8')
  //使用url模块将字符串格式的请求地址转换为对象，
  //并获取其中的pathname(请求路径)属性
  var pathname = url.parse(req.url).pathname;
  console.log(pathname);
  //如果是/请求 将pathname重新复制为/index.html
  if(pathname == '/'){
    pathname ='/index.html';
  }
  //根据pathname来读取project文件夹下的内容
  fs.readFile('./project'+pathname,function(err,data){
    if(err){
      console.log(err);
      return
    }
    res.end(data);
  })
  
});
server.listen(4000,'localhost');