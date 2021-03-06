const { Schema, model } = require('mongoose')

const DevSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  user: {
    type: String,
    required: true,
    unique: true
  },
  bio: String,
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }],
  socket: String,
}, {
  timestamps: true
})

module.exports = model('Dev', DevSchema)