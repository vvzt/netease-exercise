const router = require('koa-router')()
const users = require('../controller/users')

router.prefix('/users')

router.get('/', users.checkToken)

module.exports = router
