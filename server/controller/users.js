const users = require('../model/users')

const wait = async (s) => {
  return new Promise(res => {
    setTimeout(() => res(), s*1000);
  })
}

module.exports = {

  async login(ctx) {
    await wait(1)
    let id = ctx.request.query.id
    let userModel = new users({ _id: id })
    try {
      let findRes = await users.findById(id, function(err, res) {
        ctx.body = {
          status: err ? 'Error' : 'OK',
          result: err ? err : {
            id
          },
        }
      })
      if(findRes === null) {
        await new Promise(resolve => userModel.save(function(err, res) {
          ctx.body = {
            status: err ? 'Error' : 'OK',
            result: err ? err : {
              id: res._id
            },
          }
          resolve()
        }))
      }
    } catch(err) {
      ctx.body = {
        status: 'Error',
        result: err,
      }
    }
  },

}