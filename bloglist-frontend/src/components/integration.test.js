import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from './Blog'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<App />', () => {
  let app

  describe('When user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
      window.localStorage.clear
    })

    it('No blogs are initially shown', () => {
      app.update()
      console.log(app.debug())
      const blogComponent = app.find(Blog)
      console.log(blogComponent.debug())
      expect(blogComponent.length).toBe(0)
    })
  })

  describe('When user IS logged in', () => {
    beforeEach(() => {
      app = mount(<App />)

      const user = {
        username: 'testiHenkilo',
        token: '123456qwerty',
        name: 'Testi Henkilo'
      }

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    })

    it('Blogs are rendered', () => {
      app.update()
      console.log(app.debug())
      const blogComponent = app.find(Blog)
      console.log(blogComponent.debug())
      const testi = app.find('.blogit')
      console.log(testi.debug())
      expect(blogComponent.length).toEqual(blogService.blogs.length)
    })
  })
})