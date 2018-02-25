const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.title === undefined || body.author === undefined || body.url === undefined) {
      return response.status(400).json({error: 'Insufficient information'})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })

    const savedBlog = await blog.save()
    response.json(formatBlog(savedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({error: 'Something went wrong'})
  }
  
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
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