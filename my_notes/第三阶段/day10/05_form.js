var http = require('http');
var fs = require('fs');
var qs = require('querystring')


var server = http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return;
  }
    //localhost:4000打开form表单页面
    if(req.url == '/'){
      fs.readFile('./05_form.html',function(err,data){
        if(err){
          console.log(err);
          res.end('加载页面失败');
          return;
        }
        //读取成功，将读取到的数据加载到显示页面上
        res.end(data);
      })
    }
    if(req.url == '/tijiao' && req.method.toLowerCase() == 'post'){
      // 因为nodejs是单线程非I/O阻塞，为了追求效率，效率是一小段一小段上传
      //这样就会产生2中状态：正在接收，接收完成
      // res.end('aaa');
      //提前声明一个变量，用于保存每一次得到的一小段数据
      var allData = '';

      //data:表示正在接收数据的状态
      //chunk:表示每次接收一小段的数据
      //addListener方法与on方法功能一样
      req.addListener('data',function(chunk){
          //拼接每次得到的一小段数据
          allData += chunk;
      });
      // end:表示接收完成的状态，当数据全部接收完毕，进入该状态
      req.addListener('end',function(){
        //进入接收完成状态，说明数据已经接收完毕
        console.log(allData);
        //将字符串的参数，通过querystring模块转换为querystring类型
        var obj = qs.parse(allData);
        console.log(obj);
        res.end();//返回响应
      });
    }
  
}).listen(4000,'localhost');