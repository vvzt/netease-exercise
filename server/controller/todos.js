const todos = require('../model/todos')

const wait = async (s) => {
  return new Promise(res => {
    setTimeout(() => res(), s*1000);
  })
}

module.exports = {

  async get(ctx) {
    await wait(1)
    await todos.find({}, function(err, res) {
      ctx.body = {
        status: err ? 'Error' : 'OK',
        result: err ? err : res.map(row => ({
          id: row._id,
          date: row.date,
          completed: row.completed,
          title: row.title,
        }))
      }
    })
  },

  async add(ctx) {
    await wait(1)
    let requestBody = ctx.request.body
    let todosModel = new todos(requestBody)
    await new Promise(resolve => todosModel.save(function(err, res) {
      ctx.body = {
        status: err ? 'Error' : 'OK',
        result: err ? err : res
      }
      resolve()
    }))
  },

  async delete(ctx) {
    await wait(1)
    let requestBody = ctx.request.body
    let todosModel = new todos(requestBody)
    await todos.findByIdAndDelete(todosModel.id, function(err, res) {
      ctx.body = {
        status: err ? 'Error' : 'OK',
        result: err ? err : res
      }
    })
  },

  async modify(ctx) {
    await wait(1)
    let params = ctx.request.body
    let todosModel = new todos(params)
    await todos.findByIdAndUpdate(todosModel.id, {
      date: todosModel.date,
      completed: todosModel.completed,
      title: todosModel.title,
    }, function (err, res) {
      ctx.body = {
        status: err ? 'Error' : 'OK',
        result: err ? err : res
      }
    })
  },

}