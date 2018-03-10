import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import PropTypes from 'prop-types'

class Filter extends React.Component {
  handleChange = (event) => {
    this.context.store.dispatch(filterChange(event.target.value))
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        Filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

Filter.contextTypes = {
  store: PropTypes.object
}

export default Filter