const TodosModel = require('../model/todos')
const UsersModel = require('../model/users')

const wait = async (s) => {
  return new Promise(res => {
    setTimeout(() => res(), s*1000);
  })
}

module.exports = {

  async get(ctx) {
    await wait(1)
    let userId = ctx.params.userId
    try {
      // 查找 userId 的所有 todos 并以时间倒序排序
      await TodosModel.find({ author: userId }, null, { sort: { 'date': -1 } }, function(err, res) {
        if(err) console.log('ERROR: ' + err)
        else ctx.body = {
          status: 'OK',
          result: res.map(row => ({
            id: row._id,
            date: row.date,
            completed: row.completed,
            title: row.title,
          })),
        }
      })
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  },

  async add(ctx) {
    await wait(1)
    let userId = ctx.params.userId
    let requestBody = ctx.request.body
    let todosModel = new TodosModel({
      ...requestBody,
      author: new UsersModel({ _id: userId })
    })
    try {  
      await todosModel.save().then(res => {
        ctx.body = { status: 'OK' }
      })
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  },

  async del(ctx) {
    await wait(1)
    let requestParams = ctx.params
    try {
      await TodosModel.findByIdAndDelete(requestParams.id, function(err, res) {
        if(err) console.log('ERROR: ' + err)
        else if(res === null) {
          ctx.status = 404
        } else {
          ctx.body = {
            status: 'OK'
          }
        }
      })
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  },

  async modify(ctx) {
    await wait(1)
    let requestParams = ctx.params
    let requestBody = ctx.request.body
    let completed = requestBody.completed || false
    try {
      await TodosModel.findByIdAndUpdate(requestParams.id, {
        completed: completed,
      }, function (err, res) {
        if(err) console.log('ERROR: ' + err)
        else if(res === null) {
          ctx.status = 404
        } else {
          ctx.body = {
            status: 'OK',
            result: {
              id: res._id,
              completed: completed,
            },
          }
        }
      })
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  },

}