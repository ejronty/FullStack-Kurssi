const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, num) => {
    return sum + num
  }
  return blogs.length === 0 ? 0 : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let suosituin = ''
  
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      suosituin = blog
    }
  })

  return (
    {
      "title": suosituin.title,
      "author": suosituin.author,
      "likes": suosituin.likes
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}