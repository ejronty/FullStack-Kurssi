const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {_id: 1, username: 1, name: 1})
  response.json(blogs.map(Blog.format))
})

const getTokenFrom = (request) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return auth.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({error: 'Token missing or invalid'})
    }

    if (body.title === undefined || body.author === undefined || body.url === undefined) {
      return response.status(400).json({error: 'Insufficient information'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    }else {
      console.log(exception)
      response.status(500).json({ error: 'Something went wrong'})
    }
  }
  
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid'})
    }

    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    if (blog.user === null || JSON.stringify(blog.user) === JSON.stringify(user.id)) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }else {
      response.status(401).json({ error: 'Unauthorized request'})
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({error: 'Malformatted id'})
  }
})

blogRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  try {
    await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    res.status(200).end()
  } catch (exception) {
    console.log(exception)
    res.status(400).send({error: 'Malformatted id'})
  }
})

module.exports = blogRouter