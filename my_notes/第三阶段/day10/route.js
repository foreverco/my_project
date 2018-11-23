/* function Way(){

}
Way.prototype.showIndex = function (){
  console.log('index');
}
Way.prototype.showInfo = function (){
  console.log('info');
}
Way.prototype.showError = function (){
  console.log('error');
}
module.exports = Way; */



function showIndex(req,res){
  res.write(req.url);
  res.end('这是首页');
}

function showInfo(req,res){
  res.write(req.url);
  res.end('这是信息页');
}

function showError(req,res){
  res.write(req.url);
  res.end('这是错误页');
}

exports.showIndex = showIndex;
exports.showInfo = showInfo;
exports.showError = showError;