const todos = require('../model/todos')

const wait = async (s) => {
  return new Promise(res => {
    setTimeout(() => res(), s*1000);
  })
}

module.exports = {

  async get(ctx) {
    await wait(1)
    try {
      await todos.find({}, function(err, res) {
        ctx.body = {
          status: err ? 'Error' : 'OK',
          result: err ? err : res.map(row => ({
            id: row._id,
            date: row.date,
            completed: row.completed,
            title: row.title,
          })),
        }
      })
    } catch(err) {
      ctx.body = {
        status: 'Error',
        result: err,
      }
    }
  },

  async add(ctx) {
    await wait(1)
    let requestBody = ctx.request.body
    let todosModel = new todos(requestBody)
    try {
      await new Promise(resolve => todosModel.save(function(err, res) {
        ctx.body = {
          status: err ? 'Error' : 'OK',
          result: err ? err : res,
        }
        resolve()
      }))
    } catch(err) {
      ctx.body = {
        status: 'Error',
        result: err,
      }
    }
  },

  async delete(ctx) {
    await wait(1)
    let requestParams = ctx.request.query
    try {
      await todos.findByIdAndDelete(requestParams.id, function(err, res) {
        ctx.body = {
          status: err ? 'Error' : 'OK',
          result: err ? err : {
            id: res._id,
          },
        }
      })
    } catch(err) {
      ctx.body = {
        status: 'Error',
        result: err,
      }
    }
  },

  async modify(ctx) {
    await wait(1)
    let requestParams = ctx.request.query
    let requestBody = ctx.request.body
    let completed = requestBody.completed || false
    try {
      await todos.findByIdAndUpdate(requestParams.id, {
        completed: completed,
      }, function (err, res) {
        ctx.body = {
          status: err ? 'Error' : 'OK',
          result: err ? err : {
            id: res._id,
            completed: res.completed,
          },
        }
      })
    } catch(err) {
      ctx.body = {
        status: 'Error',
        result: err,
      }
    }
  },

}