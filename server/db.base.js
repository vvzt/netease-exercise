const Mongoose = require('mongoose')
const ADDRESS = 'mongodb://localhost:27017'
const COLLECTION = 'todos'

const db = Mongoose.createConnection(ADDRESS, COLLECTION)

db.on('error', console.error.bind(console, '连接失败 >'))

db.on('once', function() {
  console.log.bind(console, 'connect once')
})

module.exports = db