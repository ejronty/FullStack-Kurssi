

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content.content,id: action.content.id, votes: action.content.votes }]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInit = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}


export default anecdoteReducer