var http = require('http');
var fs = require('fs');
//引用formidable模块
var fd = require('formidable');
var sd = require('silly-datetime');

var server = http.createServer(function(req,res){
  if(req.url == '/favicon.ico'){return;}
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  if(req.url == '/'){
    fs.readFile('./01_form.html',function(err,data){
      if(err){
        console.log(err);
        res.end('页面出错');
        return;
      }
      res.end(data);
    });  
  }else if(req.url == '/tijiao' && req.method.toUpperCase()=='POST'){
    //POST的/tijiao请求
    //使用formidable模块处理请求
    // var form = new fd.IncomingForm();
    var form = fd.IncomingForm();
    //设置上传文件保存的路径
    form.uploadDir = './upload';
    //解析请求对象
    //err:解析出错的错误信息
    //fields:解析得到的文本域的参数值
    //files:解析得到的文件
    form.parse(req,function(err,fields,files){
      if(err){
        console.log(err);
        res.end('请求失败');
        return;
      }
      console.log('===============fields=======================');
      console.log(fields);
      console.log('================files================');
      console.log(files);
      //对文件改名
      // 获取旧路径
      var oldPath = files.pic.path;
      //设置新路径
      var oldName = files.pic.name;//获取名称
      var arr = oldName.split('.');
      var ext =arr[arr.length-1]//获取后缀名
      //设置名称
      var name = sd.format(new Date(),'YYYYMMDDHHmmss');
       //上传文件的新名称
       var newName = name+'.'+ext;
       //新路径
      var newPath = './upload/'+newName;
      fs.rename(oldPath,newPath,function(err){
        // 设置新路径
        if(err){
          console.log(err);
          res.end('重命名失败');
        }
        res.end('请求成功');
      });
    })
  }else{
    res.end('地址错误');
  }
});
server.listen(4000,'localhost');