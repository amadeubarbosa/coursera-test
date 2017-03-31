var mongoose = require('mongoose')
var Dishes = require("./model/dishes")

var url = 'mongodb://localhost:27017/test'
mongoose.connect(url)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to server')
  Dishes.create({ name: "Antiquadic", description: "Very old one"}, function(err, doc) {
    if (err) throw err

    console.log('Dish created!')
    console.log(doc)

    console.log("Waiting a little while...")
    var id = doc._id
    setTimeout(function() {
        Dishes.findByIdAndUpdate(id, 
          {
            $set: { description: 'Not so old one' }
          },{ 
            new: true 
          })
          // Mongoose promise
          .exec(function(err, dish) {
            if (err) throw err
            console.log('Updated Dish!')
            console.log(dish)

            dish.comments.push({
              rating: 5,
              comment: 'This exercise is messy!',
              author: 'Atuhen Kassizov'
            })
            dish.save(function(err, doc) {
              console.log("A new comment was added!")           
              console.log(doc)
                
              //cleanup
              db.collection('dishes').drop(() => db.close())
            })
          })
     }, 3000)
  })
})
