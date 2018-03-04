import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      username: '',
      password: '',
      user: null,
      error: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newTitle: '',
          newAuthor: '',
          newUrl: ''
        })
      })
  }

  updateBlog = async (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: (blog.user === undefined ? null : blog.user._id)
    }
    try {
      await blogService.update(blog.id, blogObject)
      this.setState({ blogs: await blogService.getAll()})
    } catch (exception) {
      console.log(exception)
    }
  }

  removeBlog = async (blog) => {
    try {
      if (window.confirm(`Are you sure you want to delete '${blog.title}' by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        this.setState({ blogs: await blogService.getAll()})
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({username: '', password: '', user})
    } catch (exception) {
      this.setState({
        error: 'Incorrect username or password.'
      })
      setTimeout(() => {
        this.setState({ error: null})
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      this.setState({user: null})
    }catch (exception) {
      console.log(exception)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  sortByLikes = (a, b) => {
    return b.likes - a.likes
  }


  render() {

    const loginForm = () => (
      <Togglable buttonLabel='Login'>
        <LoginForm
          visible={this.state.loginVisible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    const blogForm = () => (
      <Togglable buttonLabel='Add a blog' ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          handleChange={this.handleFieldChange}
          title={this.newTitle}
          author={this.newAuthor}
          url={this.newUrl}
        />
      </Togglable>
    )

    const logoutForm = () => (
      <div>
        <p>{this.state.user.name} logged in.</p>
        <button type='button' onClick={this.logout}>Logout</button>
      </div>
    )


    return (
      <div>
        <h1>Super Awesome Blogs!!!</h1>

        {this.state.user === null ?
          loginForm() :
          <div>
            <div className='userIn'>
              {logoutForm()}

              {blogForm()}
            </div>
            <div>
              <div className='blogit'>
                {this.state.blogs.sort(this.sortByLikes).map(blog => 
                  <Blog key={blog.id} blog={blog} handler={this.updateBlog} remover={this.removeBlog}/>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
