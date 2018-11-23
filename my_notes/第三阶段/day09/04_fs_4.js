var fs = require('fs');

//异步方法
fs.readdir('./',function(err,files){
  if(err){
    console.log(err);
  }else{
    console.log(files);
  }
});

//同步方法
var result = fs.readdirSync('./');
console.log(result);