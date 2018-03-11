import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { Alert, Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const Menu = () => (
  <div style={menuStyle}>    
    <NavLink exact to='/' activeStyle={aMenuStyle}>Anecdotes</NavLink> &nbsp;
    <NavLink exact to='/create' activeStyle={aMenuStyle}>CreateNew</NavLink> &nbsp;
    <NavLink exact to='/about' activeStyle={aMenuStyle}>About</NavLink>&nbsp;
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

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>  
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>Has {anecdote.votes} votes</div>
      <div>For more info see <a href={`${anecdote.info}`}>{anecdote.info}</a></div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <Grid>
      <Row>
        <Col xs={6} md={4}>
          <div>
            <p>According to Wikipedia:</p>
        
            <em>An anecdote is a brief, revealing account of an individual person or an incident. 
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
              An anecdote is "a story with a point."</em>

            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
          </div>
        </Col>
        <Col xs={6} md={4}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/f/f5/Turing-statue-Bletchley_14.jpg' alt='Statue of Alan Turing' height='378' width='250' />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')

  }

  render() {
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Content:</ControlLabel>
            <FormControl type='text' name='content' value={this.state.content} onChange={this.handleChange} />
            <ControlLabel>Author:</ControlLabel>
            <FormControl type='text' name='author' value={this.state.author} onChange={this.handleChange} />
            <ControlLabel>Url for more info:</ControlLabel>
            <FormControl type='text' name='info' value={this.state.info} onChange={this.handleChange} />
            <Button bsStyle='success' type='submit'>Create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

const Notification = ({message}) => {
  return (
    <div>
      {(message && 
        <Alert color='lightgreen'>
          {message}
        </Alert>
      )}
    </div>
  )
}

const notifStyle = {
  padding: 10,
  fontColor: 'green',
  fontStyle: 'italic'
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `A new anecdote '${anecdote.content}' successfully created!`
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }


  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <div>
              <Menu />
            </div>
            <div style={notifStyle}>
              <Notification message={this.state.notification}/>
            </div>
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path='/anecdotes/:id' render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} /> }
            />
            <Route path='/create' render={({history}) => <CreateNew addNew={this.addNew} history={history} />} />
            <Route path='/about' render={() => <About />} />
          </div>
        </Router>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
