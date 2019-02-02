const todos = require('../model/todos')

const wait = async (s) => {
  return new Promise(res => {
    setTimeout(() => res(), s*1000);
  })
}

module.exports = {
  async get(ctx) {
    await wait(1)
    let params = ctx.request.query
    let todosModel = new todos(params)
    todosModel.insertOne({
      
    })
    ctx.body = {
      test: 'get',
    }
  },

  async add(ctx) {c
    await wait(1)
    ctx.body = {
      test: 'add',
    }
  },

  async delete(ctx) {
    await wait(1)
    ctx.body = {
      test: 'delete',
    }
  },

  async modify(ctx) {
    await wait(1)
    ctx.body = {
      test: 'modify',
    }
  }
}