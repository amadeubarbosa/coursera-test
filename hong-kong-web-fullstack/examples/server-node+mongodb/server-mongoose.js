var mongoose = require('mongoose')
var Dishes = require("./model/dishes")

var url = 'mongodb://localhost:27017/test'
mongoose.connect(url)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to server')
  var dish = Dishes({ name: "Antiquadic", description: "Very old one"})
  dish.save((err) => {
    if (err) throw err

    console.log('Dish created!')
    Dishes.find({}, function(err, docs) {
      if (err) throw err
      console.log(docs)
      //cleanup
      db.collection('dishes').drop(() => db.close())
    })
  })
})
