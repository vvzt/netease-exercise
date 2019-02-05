const Mongoose = require('../db/todos')

const todoSchema = new Mongoose.Schema({
  id: {
    type: Mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false, 
  },
  title: {
    type: String,
    default: '',
  },
  author: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }
})

module.exports = Mongoose.model('Todos', todoSchema)