import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  addVote = async (anecdote) => {

    await anecdoteService.update(anecdote.content, anecdote.id, (anecdote.votes + 1))

    this.props.voteFor(anecdote.id)
    this.props.newNotification(`You voted for '${anecdote.content}'`)
    setTimeout( () => {
      this.props.removeNotification()
    }, 5000)
  }

  
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesShown.map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}


const mapStateToProps = (state) => {
  return {
    anecdotesShown: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteFor,
  newNotification,
  removeNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
) (AnecdoteList)

export default ConnectedAnecdoteList
