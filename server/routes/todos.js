const router = require('koa-router')()
const todos = require('../controller/todos')

router.prefix('/todos')

router.get('/', todos.get)

router.put('/', todos.add)

router.delete('/', todos.delete)

router.post('/', todos.modify)

module.exports = router
