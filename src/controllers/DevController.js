// index, show, store, update, delete

const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    const user = req.header('Content-User')       
    const loggedDev = await Dev.findById(user)

    if (!loggedDev) {
      return res.status(404).json({ error: 'Dev not exists'})
    }

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes }},
        { _id: { $nin: loggedDev.dislikes }}
      ]
    })

    return res.json(users)
  },

  async store (req, res) {
    const { username } = req.body

    const userExists = await Dev.findOne({ user: username })

    if (userExists) {
      return res.json(userExists)
    }

    const response = await axios.get(`https://api.github.com/users/${username}`)
    
    const { login: user, name, bio, avatar_url: avatar } = response.data

    const dev = await Dev.create({
      name,
      user,
      bio,
      avatar
    })

    return res.json(dev)
  }
}