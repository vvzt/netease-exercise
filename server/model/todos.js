const Mongoose = require('../db/todos')

const todoSchema = new Mongoose.Schema({
  test: {
    type: String,
    default: '123'
  },
})

module.exports = Mongoose.model('Todos', todoSchema)