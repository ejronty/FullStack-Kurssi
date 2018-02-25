const mongoose = require('mongoose')

const mongoUrl = 'mongodb://<user>:<pwd>@ds149138.mlab.com:49138/elmonblogit'

mongoose.connect(mongoUrl)

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog