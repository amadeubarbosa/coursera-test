var mongo = require("mongodb")
var assert = require("assert")

var url = 'mongodb://localhost:27017/test'
mongo.MongoClient.connect(url, function(err, db) {
  assert.equal(err, null)
  console.log("Connected to MongoDB server")

  var collection = db.collection("dishes")

  var documents = [
    { name: "Antiquadic", description: "Very old one"},
    { name: 'Uthapizza', description: 'Test' },
    { name: "Vadonut", description: "Jackass"} 
  ]

  var finder = function(err, docs) {
      assert.equal(err, null)
      console.log("Found:")
      console.log(docs)
    }
  var callback = function(err, result) {
    assert.equal(err, null)
    console.log("After Insert:")
    console.log(result.ops)
  }
  
  var updated = function(err, result) {
    assert.equal(err, null)
    console.log("Updated:" + result)
    // begining of the end
    collection.find({}).toArray(finder)
    db.dropCollection("dishes", function(err, result) {
      assert.equal(err, null)
      console.log("Drop them!")
      collection.find({}).toArray(finder)
      db.close()
    })
  }
  collection.insert(documents, callback)
  collection.updateOne(
    { name: "Vadonut"}, 
    { $set: {description: "Updated Zack"} }, 
    null, 
    updated)
})
