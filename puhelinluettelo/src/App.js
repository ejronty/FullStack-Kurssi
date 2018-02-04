import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({newName: event.target.value})
  }

  addName = (event) => {
    event.preventDefault()

    const namelist = this.state.persons.map(person => person.name)

    if (!namelist.includes(this.state.newName)) {
      const personObject = {
        name: this.state.newName
      }
  
      const persons = this.state.persons.concat(personObject)
  
      this.setState({
        persons: persons,
        newName: ''
      })
    } else {
      alert('Nimi löytyy jo luettelosta!')
      this.setState({
        newName: ''
      })
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleInputChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => <Person key={person.name} name={person.name} />)}
      </div>
    )
  }
}

const Person = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

export default App