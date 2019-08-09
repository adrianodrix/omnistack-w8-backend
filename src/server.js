require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
const Dev = require('./models/Dev')

let loggedDev = {}

io.on('connection', async socket => {
  const { user } = socket.handshake.query

  loggedDev = await Dev.findById(user)

  loggedDev.socket = socket.id
  await loggedDev.save()  
})

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true
})

app.use((req, res, next) => {
  req.io = io
  req.loggedDev = loggedDev

  return next()
})

app.use(cors())
app.use(express.json())

app.use(routes)

server.listen(process.env.PORT || 3001)