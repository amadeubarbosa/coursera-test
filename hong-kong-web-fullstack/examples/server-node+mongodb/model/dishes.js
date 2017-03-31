var mongoose = require('mongoose')

var commentschema = new mongoose.Schema({
  rating: {type: Number, min:1, max: 5, required:true},
  comment: {type: String, required: true},
  author: {type: String, required: true}}, {timestamps:true})

var dishschema = new mongoose.Schema({
  name: { type: String, required:true, unique:true},
  description: {type: String, required:true},
  comments:[commentschema]}, {timestamps:true})

module.exports = mongoose.model('Dish', dishschema)
