const Mongoose = require('../db/todos')

const todoSchema = new Mongoose.Schema({
  // id: {
  //   type: Mongoose.Schema.Types.ObjectId,
  // },
})

module.exports = Mongoose.model('Users', todoSchema)