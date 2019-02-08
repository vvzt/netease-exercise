const Mongoose = require('mongoose')
const PATH = 'mongodb://localhost:27017/todos'

Mongoose.connect(PATH, { useNewUrlParser: true }, function(err) {
  if(err) {
    console.log('Mongo connection failed')
  } else {
    console.log('Mongo connection OK')
  }
})

const db = Mongoose.connection

db.on('error', console.error.bind(console, '连接失败 >'))

db.on('open', function() {
  console.log.bind(console, 'onopen')
})

module.exports = Mongoose