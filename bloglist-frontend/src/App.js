import React from 'react'
import Blog from './components/Blog'
import User from './components/user'
import SingleUser from './components/SingleUser'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Togglable from './components/togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'

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
      loginVisible: true,
      users: []
    }
  }

  componentDidMount = async () => {
    const blogit = await blogService.getAll()
    const kayttajat = await userService.getAll()

    this.setState({
      blogs: blogit,
      users: kayttajat
    })


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

  userById = (id) => 
    this.state.users.find(u => u.id === id)
  

  render() {

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

    const Menu = () => (
      <div style={menuStyle}>
        <NavLink exact to='/' activeStyle={aMenuStyle}>Blogs</NavLink> &nbsp;
        <NavLink exact to='/users' activeStyle={aMenuStyle}>Users</NavLink> &nbsp;
        {this.state.user === null
          ? <NavLink exact to='/login' activeStyle={aMenuStyle}>Login</NavLink>
          : <em>{this.state.user.name} logged in <button onClick={this.logout}>Log Out</button></em>
        }
      </div>
    )
    
    const menuStyle = {
      padding: 10,
      border: 'solid',
      borderWidth: 1,
      backgroundColor: 'lightblue'
    }
    
    const aMenuStyle = {
      backgroundColor: 'lightgreen'
    }

    const appStyle = {
      padding: 15
    }

    return (
      <div style={appStyle}>
        <h1>Super Awesome Blogs!!!</h1>

            <div>
              <Router>
                <div>
                  <div>
                    <Menu />
                  </div>
                  <Route exact path='/' render={() =>
                    this.state.user
                      ? <div>
                          {blogForm()}
                          <h3>Existing blogs</h3>
                          <div className='blogit'>
                            {this.state.blogs.sort(this.sortByLikes).map(blog => 
                              <Blog key={blog.id} blog={blog} handler={this.updateBlog} remover={this.removeBlog}/>
                            )}
                          </div>
                        </div>
                      : <Redirect to='/login' />
                  } />
                  <Route exact path='/users' render={() => 
                    this.state.user
                      ? <div>
                          <h3>Users</h3>
                          <table>
                            <tbody>
                              <tr>
                                <th>Name</th>
                                <th>Blogs added</th>
                              </tr>
                              {this.state.users.map(u => 
                                <User key={u.id} user={u} />
                              )}
                            </tbody>
                          </table>
                        </div>
                      : <Redirect to='/login' />
                   }/>
                  <Route exact path='/users/:id' render={({match}) =>
                    <SingleUser user={this.userById(match.params.id)} />
                  } />
                  <Route path='/login' render={() => 
                    this.state.user
                      ? <Redirect to='/' />
                      : <LoginForm
                          handleSubmit={this.login}
                          handleChange={this.handleFieldChange}
                          username={this.state.username}
                          password={this.state.password}
                        />
                  }/>
              </div>
              </Router>

            </div>
          </div>
    );
  }
}

export default App;
