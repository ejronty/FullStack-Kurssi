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
