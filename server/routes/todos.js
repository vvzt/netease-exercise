const router = require('koa-router')()
const todos = require('../controller/todos')
const UsersModel = require('../model/users')

router.prefix('/users/:userId/todos')

router.param('userId', async (id, ctx, next) => {
  try {
    let user = await UsersModel.findById(id).then(res => {
      if(!res) ctx.status = 404
      return res
    })
    if(user) await next()
  } catch(err) {
    ctx.status = 500
    ctx.body = err ? err : 'Something error'
  }
})

router.get('/', todos.get)

router.put('/', todos.add)

router.delete('/:id', todos.del)

router.post('/:id', todos.modify)

module.exports = router
