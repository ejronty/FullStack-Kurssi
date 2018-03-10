import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'

class AnecdoteForm extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe( () => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.context.store.dispatch(anecdoteCreation(content))
  }

   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
