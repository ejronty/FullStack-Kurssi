import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('renders title', () => {
    const blog = {
      title: 'Tämä on testiblogi',
      author: 'Kirjoittaja',
      url: 'osoite'
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    console.log(blogComponent.debug())

    const titleDiv = blogComponent.find('.title')
    console.log(titleDiv.debug())

    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)
    expect(blogComponent.text()).not.toContain(blog.url)
  })

  it('Clicking on title expands blog', () => {
    const blog = {
      title: 'Tämä on testiblogi',
      author: 'Kirjoittaja',
      url: 'osoite'
    }

    const blogComponent = shallow(
      <Blog blog={blog} />
    )

    const clickable = blogComponent.find('.title')
    clickable.simulate('click')

    const urlDiv = blogComponent.find('.url')
    console.log(urlDiv.debug())

    expect(urlDiv.text()).toContain(blog.url)
  })
})