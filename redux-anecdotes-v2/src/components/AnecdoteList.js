import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  addVote = async (anecdote) => {
    this.props.voteFor(anecdote)
    this.props.notify(`You voted for '${anecdote.content}'`, 5)
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
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
) (AnecdoteList)

export default ConnectedAnecdoteList
