var fd = require('formitable');
var sd = require('silly-datetime');

exports.showIndex = function(req,res){
   res.render('index');
}

exports.upload = function(req,res){
  console.log(req.body.username)
}