const Mongoose = require('mongoose')
const DB_PATH = 'mongodb://localhost:27017/todos'

Mongoose.connect(DB_PATH, { useNewUrlParser: true }, function(err) {
  if(err) {
    console.log(`MongoDB connect failed > ${DB_PATH}`)
  } else {
    console.log(`MongoDB connected > ${DB_PATH}`)
  }
})

const db = Mongoose.connection

db.on('error', console.error.bind(console, '连接失败 >'))

db.on('open', function() {
  console.log.bind(console, 'onopen')
})

module.exports = Mongoose