var mongodbClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'web1807';
var collection = 'student';

mongodbClient.connect(url,function(err,client){
   if(err){
      console.log(err);
      return;
   }
   var db = client.db(dbName);
   var coll = db.collection(collection);

   /* coll.updateMany({id:4},{$set:{name:'宫城'}},function(err,result){
      if(err){
         console.log(err);
         return;
      }
      console.log(result);
      client.close();
   }) */

   coll.find({id:4}).toArray(function(err,result){
      if(err){
         console.log(err);
         return;
      }
      console.log(result);
      // callback(result);
   })
})