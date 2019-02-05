const router = require('koa-router')()
const users = require('../controller/users')

router.prefix('/users')

router.get('/', users.login)

module.exports = router
