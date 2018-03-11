const notificationReducer = (state = 'Initial notification', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}


export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: message
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, (time * 1000))
  }
}

export default notificationReducer