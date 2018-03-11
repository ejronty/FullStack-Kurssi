import React from 'react'
import {Link} from 'react-router-dom'

class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        <td><Link to={`/users/${this.props.user.id}`}>{this.props.user.name}</Link></td>
        <td>{this.props.user.blogs.length}</td>
      </tr>
    )
  }
}

export default User