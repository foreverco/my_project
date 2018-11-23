var fs = require('fs');

var start = new Date();
// console.log(1);
/* 
  fs.readFile('./day09.txt','utf-8',function(err,data){
    console.log(2);
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
  }); 
*/
// console.log(3);
//同步的读取文件
var result = fs.readFileSync('../../../第二阶段课前素材/软件/VSCodeUserSetup-ia32-1.26.1.exe');
var end = new Date();

console.log('程序执行用过花了'+(end-start)+'ms');