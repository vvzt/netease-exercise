const UsersModel = require('../model/users')

const wait = async (s) => {
  return new Promise(res => {
    setTimeout(() => res(), s*1000);
  })
}

module.exports = {

  async register(ctx) {
    await wait(1)
    let id = ctx.request.query.id
    try {
      let findRes = await UsersModel.findById(id, function(err, res) {
        if(err) console.log('ERROR: ' + err)
        ctx.body = {
          status: 'OK',
          result: {
            id
          },
        }
      })
      if(findRes === null) {
        let userModel = new UsersModel({ _id: id })
        await new Promise(resolve => userModel.save(function(err, res) {
          if(err) console.log('ERROR: ' + err)
          ctx.body = {
            status: 'OK',
            result: {
              id: res._id
            },
          }
          resolve()
        }))
      }
    } catch(err) {
      ctx.status = 500
      ctx.body = {
        status: 'Error',
        // result: err,
      }
    }
  },

}