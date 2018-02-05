import React from 'react'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  addPerson = (event) => {
    event.preventDefault()

    const namelist = this.state.persons.map(person => person.name)

    if (!namelist.includes(this.state.newName)) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }


      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: ''
          })
        })
  
    } else {
      alert('Nimi löytyy jo luettelosta!')
      this.setState({
        newName: '',
        newNumber: ''
      })
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({persons})
      })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          Rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Numerot tila={this.state} />
      </div>
    )
  }
}

const Numerot = (props) => {
  const naytettavat = 
    props.tila.filter === '' ?
      props.tila.persons : 
      props.tila.persons.filter(person => person.name.includes(props.tila.filter))

  return (
    <table>
      <tbody>
        {naytettavat.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
      </tbody>
    </table>
  )
}

const Person = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
    </tr>
  )
}

export default App