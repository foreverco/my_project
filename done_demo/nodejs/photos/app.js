//服务器启动文件
var express = require('express');
var route = require('./scripts/route.js');//引用路由
var bdParser = require('body-parser');//设置post请求的解析方式，方便获取post请求的参数
var app = express();
app.listen(4000);

//设置视图模板引擎
app.set('view engine','ejs');

//设置根目录
app.use(express.static('./public'));
app.use(express.static('./uploads'));

//设置请求消息头 application/x-form-urlencoded
app.use(bdParser.urlencoded({extended:true}));

//处理/请求，显示首页内容
app.get('/',route.showIndex);

//处理/toupload请求，跳转到上传图片的表单页面
app.get('/toUpload',route.toUpload);

//处理post的/doupload请求
app.post('/doupload',route.doUpload);

//处理get方式的/newDir请求，跳转到新建相册页面
app.get('/newDir',route.newDir);

//处理post方式的/newDir请求，新建相册
app.post('/newDir',route.doCreate);

//处理get的/del请求，删除相册
app.get('/del',route.del);

//处理/show/*的请求,显示某个文件夹中的图片
app.get('/show/:dirName',route.showPics);