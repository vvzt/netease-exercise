const Mongoose = require('../db/todos')

const todoSchema = new Mongoose.Schema({
  id: {
    type: Mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  completed: {
    type: Boolean,
    default: false, 
  },
  title: {
    type: String,
    default: '',
  },
})

module.exports = Mongoose.model('Todos', todoSchema)