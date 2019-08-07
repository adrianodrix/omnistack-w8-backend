require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const server = express()

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true
})

server.use(cors())
server.use(express.json())

server.use(routes)

server.listen(process.env.PORT || 3001)