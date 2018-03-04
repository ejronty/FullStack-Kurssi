import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpansion = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  
    if (!this.state.expanded) {
      return (
        <div style={blogStyle}>
          <div onClick={this.toggleExpansion}>{this.props.blog.title} {this.props.blog.author}</div>
        </div>
      )
    } else if (this.state.expanded) {
      return (
        <div style={blogStyle}>
          <div onClick={this.toggleExpansion}>{this.props.blog.title} {this.props.blog.author}</div>
          <div>{this.props.blog.url}</div>
          <div>{this.props.blog.likes} likes <button>Like</button></div>
          <div>Added by: {this.props.blog.user === undefined ? 'Unknown' : this.props.blog.user.name}</div>
        </div>
      )
    }
  
  }
}

export default Blog