import React from 'react'


class SingleUser extends React.Component {
  constructor(props) {
    super(props)
  }
  
  

  render() {

    return (
      <div>
        <h2>{this.props.user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {this.props.user.blogs.map(blog =>
            <li key={blog._id}>
              {blog.title}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default SingleUser