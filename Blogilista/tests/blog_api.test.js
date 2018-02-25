const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeAll(async () => {
  await Blog.remove({})

  for (i = 0; i < initialBlogs.length; i++) {
    let blogObject = new Blog(initialBlogs[i])
    await blogObject.save()
  }
})

test('Blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('There is a blog about tests', async () => {
  const response = await api
    .get('/api/blogs')

  const contents = response.body.map(blog => blog.title)
  expect(contents).toContain('First class tests')
})

test('Adding new blogs works as it should', async () => {
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

  const response = await api
    .get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
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

  const initBlogs = await api
    .get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(anotherBlog)
    .expect(400)

  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(initBlogs.body.length)
})

test('If likes undefined, they are initiated to 0', async () => {
  const newBlog = {
    title: 'Tästä ei tykätä',
    author: 'Kirjoittaja',
    url: 'osoite'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api
    .get('/api/blogs')
  
  const blog = response.body.find(b => b.title === 'Tästä ei tykätä')
  expect(blog.likes).toBe(0)
})

afterAll( () => {
  server.close()
})