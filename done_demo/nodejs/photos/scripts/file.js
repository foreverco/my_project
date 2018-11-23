//处理数据层面的代码，负责数据的查询以及上传等操作
var fs = require('fs');
var rf = require('rimraf');//用于删除非空文件夹

//1.查询uploads文件夹下的所有文件夹，并将其返回给调用者
exports.getDirs = function(callback){
      //不使用同步方法，使用回调的方式解决异步的问题
      //callback:回调函数,当该方法全部执行完毕后吗，才让调用者继续执行
      fs.readdir('./uploads',function(err,files){
        //无论读取的结果是正确还是错误，都通过回调函数返回给调用者
        callback(err,files);
      });

   // return ['a','b','c'];
      //读取uploads文件夹下的内容

      //同步方法：
      /* 
        var result = fs.readdirSync('./uploads');
      console.log(result);
      return result; 
      */
}

//2.读取某个文件夹中的图片
/* 
  *dirName:将要读取的文件夹的名称
  *callback:回调函数，当读取图片的操作完成之后，告诉调用者继续执行后续操作，同时返回调用者所需的数据

*/
exports.getPics = function(dirName,callback){
  fs.readdir('./uploads/'+dirName,function(err,files){
    //回调
    callback(err,files);
  })
}

//保存图片
/**
 * oldPath:旧路径
 * newPath:新路径
 * callback:
 */
exports.save = function (oldPath,newPath,callback){
  fs.rename(oldPath,newPath,function(err){
    callback(err);
  });
}

//创建指定名称的文件夹
/**
 * dirName:创建的文件夹的名称
 * callback
 */
exports.createDir = function(dirName,callback){
  fs.mkdir('./uploads/'+dirName,function(err){
    callback(err);
  });
}

//删除文件夹
/**
 * 
*/
exports.del = function(dirName,callback){
  rf(dirName,function(err){
   callback(err);
  })
}