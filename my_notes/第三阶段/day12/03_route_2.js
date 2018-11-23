var express = require('express');
//引入路由模块
var route = require('./03_route_2_ext.js');
var route2 =require('./03_route_2_tec.js');
var app = express();
app.listen(4000);

app.get('/',function(req,res){
  res.send('这是app的/请求');
});

app.use('/student',route);

app.use('/teacher',route2);