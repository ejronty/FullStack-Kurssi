import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
      error: null
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

  handleTitleChange = (event) => {
    this.setState({ newTitle: event.target.value })
  }

  handleAuthorChange = (event) => {
    this.setState({ newAuthor: event.target.value})
  }

  handleUrlChange = (event) => {
    this.setState({ newUrl: event.target.value})
  }

  handleBlogFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {

    const loginForm = () => (
      <div>
        <h2>Login</h2>

        <form onSubmit={this.login}>
          <div>
            Username
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Password
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>Add a new blog</h2>

        <form onSubmit={this.addBlog}>
          <div>
            Title
            <input
              type='text'
              name='newTitle'
              value={this.state.newTitle}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Author
            <input
              type='text'
              name='newAuthor'
              value={this.state.newAuthor}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Url
            <input
              type='text'
              name='newUrl'
              value={this.state.newUrl}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type='submit'>Add blog</button>
        </form>
      </div>
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
            <div>
              {logoutForm()}

              {blogForm()}
            </div>
            <div>
              <p>
                {this.state.blogs.map(blog => 
                  <Blog key={blog._id} blog={blog}/>
                )}
              </p>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
