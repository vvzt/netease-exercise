const TodosModel = require('../model/todos')
const UsersModel = require('../model/users')

// const wait = async (s) => {
//   return new Promise(res => {
//     setTimeout(() => res(), s*1000);
//   })
// }

module.exports = {

  async get(ctx) {
    // await wait(1)
    let userId = ctx.params.userId
    try {
      // 查找 userId 的所有 todos 并以时间排序
      const result = await TodosModel.find({ author: userId }, null, { sort: { 'date': 1 } }).exec()
      if(result) {
        ctx.body = {
          status: 'OK',
          result: result.map(row => ({
            id: row._id,
            date: row.date,
            completed: row.completed,
            title: row.title,
          })),
        }
      }
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  },

  async add(ctx) {
    // await wait(1)
    let userId = ctx.params.userId
    let requestBody = ctx.request.body
    let todosModel = new TodosModel({
      ...requestBody,
      author: new UsersModel({ _id: userId })
    })
    try {
      await todosModel.save().then(res => {
        ctx.body = {
          status: 'OK',
          result: {
            id: res._id,
            title: res.title,
            completed: res.completed,
            date: res.date,
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

  async del(ctx) {
    // await wait(1)
    let requestParams = ctx.params
    try {
      const result = await TodosModel.findByIdAndDelete(requestParams.id).exec()
      if(result) {
        ctx.body = {
          status: 'OK'
        }
      }
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  },

  async modify(ctx) {
    // await wait(1)
    let requestParams = ctx.params
    let requestBody = ctx.request.body
    let completed = requestBody.completed || false
    try {
      const result = await TodosModel.findByIdAndUpdate(requestParams.id, { completed: completed }).exec()
      if(result) {
        ctx.body = {
          status: 'OK',
          result: {
            id: result._id,
            completed: completed,
          },
        }
      }
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
      console.log(err)
    }
  },

  async modifyAll(ctx) {
    // await wait(1)
    let requestParams = ctx.params
    let requestBody = ctx.request.body
    let completed = requestBody.completed || false
    try {
      const result = await TodosModel.updateMany({ author: requestParams.userId }, { completed: completed }).exec()
      if(result) {
        ctx.body = {
          status: 'OK',
          result: result
        }
      }
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  }
}