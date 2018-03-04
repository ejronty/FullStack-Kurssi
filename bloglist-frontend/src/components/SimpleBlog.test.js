import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('Renders title, author and likes', () => {
    const blog = {
      title: 'Tämä on testiblogi',
      author: 'Kirjoittaja',
      likes: 17
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.title')
    const likeDiv = blogComponent.find('.likes')

    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)
    expect(likeDiv.text()).toContain(blog.likes)
  })

  it('Clicking on like-button twice calls event handler twice', () => {
    const blog = {
      title: 'Tämä on testiblogi',
      author: 'Kirjoittaja',
      likes: 17
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow (
      <SimpleBlog 
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})