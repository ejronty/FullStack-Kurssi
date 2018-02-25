const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult
  }
}

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(formatUser))
})

userRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds) 

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult === undefined ? false : body.adult
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({error: 'Something went (terribly) wrong..'})
  }
})

module.exports = userRouter