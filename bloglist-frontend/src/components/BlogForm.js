import React from 'react'

const BlogForm = ({ onSubmit, handleChange, title, author, url}) => {
  return (
    <div>
      <h2>Add a new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title
          <input
            value={title}
            onChange={handleChange}
            name='newTitle'
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={handleChange}
            name='newAuthor'
          />
        </div>
        <div>
          Url
          <input
            value={url}
            onChange={handleChange}
            name='newUrl'
          />
        </div>
        <button type='submit'>Add blog</button>
      </form>
    </div>
  )
}

export default BlogForm