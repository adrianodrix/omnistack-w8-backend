const Dev = require('../models/Dev')

module.exports = {
  async store (req, res) {
    const user = req.header('Content-User')
    const { id } = req.params
    
    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(id)

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists'})
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = loggedDev.socket
      const targetSocket = targetDev.socket

      if (loggedSocket) req.io.to(loggedSocket).emit('match', targetDev)
      if (targetSocket) req.io.to(targetSocket).emit('match', loggedDev)
    }

    loggedDev.likes.push(targetDev._id)
    await loggedDev.save()

    return res.json(loggedDev)
  }
}