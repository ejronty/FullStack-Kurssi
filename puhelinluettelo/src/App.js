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
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (!namelist.includes(this.state.newName)) {

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
      if (window.confirm(`${personObject.name} on jo luettelossa. Korvataanko vanha numero uudella?`)){
        const henkilo = this.state.persons.find(p => p.name === this.state.newName)
        const changedPerson = {...henkilo, number: this.state.newNumber}
        
        personService
          .update(henkilo.id, personObject)
          .then(response => {
            this.setState({
              persons: this.state.persons.map(person => person.name !== this.state.newName ? person : changedPerson),
              newName: '',
              newNumber: ''
            })
          })
      }

    }
  }

  removePerson = (id) => {
    return () => {
      const henk = this.state.persons.find(p => p.id === id)
      if (window.confirm(`Poistetaanko ${henk.name}?`)){
        personService
          .deletePerson(id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(p => p.id !== id)
            })
          })
      }
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
        <Numerot tila={this.state} funktio={this.removePerson} />
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
        {naytettavat.map(person => <Person key={person.name} person={person} funktio={props.funktio} />)}
      </tbody>
    </table>
  )
}

const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
      <td><button onClick={props.funktio(props.person.id)}>Poista</button></td>
    </tr>
  )
}

export default App