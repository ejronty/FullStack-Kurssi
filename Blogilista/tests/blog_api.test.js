const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {format, initialBlogs, nonExistingId, blogsInDb} = require('./test_helper')


describe('Some blogs initially in database', async () => {
  beforeAll(async () => {
    await Blog.remove({})
  
    for (i = 0; i < initialBlogs.length; i++) {
      let blogObject = new Blog(initialBlogs[i])
      await blogObject.save()
    }
  })
  

  test('All blogs are returned as JSON', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedBlogs = response.body.map(b => b.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedBlogs).toContain(blog.title)
    })
  })
  
  
  test('There is a blog about tests', async () => {
    const response = await blogsInDb()
  
    const contents = response.map(blog => blog.title)
    expect(contents).toContain('First class tests')
  })
  

  test('Adding new blogs works as it should', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Paras blogi ikinä',
      author: 'Minä',
      url: 'Jossain päin maailmaa',
      likes: '73'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await blogsInDb()
  
    const titles = blogsAfterAddition.map(blog => blog.title)
  
    expect(blogsAfterAddition.length).toBe(blogsAtStart.length + 1)
    expect(titles).toContain('Paras blogi ikinä')
  })
  
  test('Blog without title or url cannot be added', async () => {
    const newBlog = {
      author: 'jee',
      url: 'jeejee',
    }
  
    const anotherBlog = {
      title: 'Osoitteeton blogi',
      author: 'Joku kaveri'
    }
  
    const initBlogs = await blogsInDb()
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    await api
      .post('/api/blogs')
      .send(anotherBlog)
      .expect(400)
  
    const response = await blogsInDb()
  
    expect(response.length).toBe(initBlogs.length)
  })
  
  test('If likes undefined, they are initiated to 0', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Tästä ei tykätä',
      author: 'Kirjoittaja',
      url: 'osoite'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
  
    const response = await blogsInDb()
    
    expect(response.length).toBe(blogsAtStart.length + 1)
    const blog = response.find(b => b.title === 'Tästä ei tykätä')
    expect(blog.likes).toBe(0)
  })
  
  afterAll( () => {
    server.close()
  })
})