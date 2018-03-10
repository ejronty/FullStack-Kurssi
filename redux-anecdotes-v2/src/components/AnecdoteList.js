import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe( () => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addVote = (anecdote) => {
    this.context.store.dispatch(voteFor(anecdote.id))
    this.context.store.dispatch(newNotification(`You voted for '${anecdote.content}'`))
    setTimeout( () => {
      this.context.store.dispatch(removeNotification())
    }, 5000)
  }

  
  render() {
    const anecdotes = this.context.store.getState().anecdotes.filter(a => a.content.includes(this.context.store.getState().filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                this.addVote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
