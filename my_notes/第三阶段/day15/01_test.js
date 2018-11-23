var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'web1807';
var collection = 'student';

mongoClient.connect(url,function(err,client){
   if(err){
      console.log(err);
      return;
   }
   var db =client.db(dbName);
   var coll = db.collection(collection);
   coll.insertOne({id:4,name:'赤木',age:18},function(err,result){
      if(err){
         console.log(err);
         return;
      }
      console.log(result);
      client.close();
   })


});
