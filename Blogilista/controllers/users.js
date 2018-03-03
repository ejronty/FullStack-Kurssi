const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', {_id: 1, likes: 1, author: 1, title: 1, url: 1})
  
  res.json(users.map(User.format))
})

userRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    const existingUser = await User.find({username: body.username})
    if (existingUser.length > 0) {
      return res.status(400).json({error: 'Username must be unique'})
    }

    if (body.password.length < 3) {
      return res.status(400).json({error: 'Password must be at least 3 characters long'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds) 

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult === undefined ? true : body.adult
    })

    const savedUser = await user.save()

    res.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    res.status(500).json({error: 'Something went (terribly) wrong..'})
  }
})

module.exports = userRouter