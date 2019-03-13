const UsersModel = require('../model/users')

// const wait = async (s) => {
//   return new Promise(res => {
//     setTimeout(() => res(), s*1000);
//   })
// }

module.exports = {

  async checkToken(ctx) {
    // await wait(1)
    let id = ctx.request.query.id
    try {
      let findRes
      if(id) {
        // 有 query id 时查询用户是否存在
        await UsersModel.findById(id, function(err, res) {
          if(err) {
            findRes = err
            console.log('ERROR: ' + err)
          }
          else if(!res) {
            findRes = 404
            ctx.body = {
              status: 'Error',
              result: {
                message: 'Invalid user id',
              },
            }
          } else {
            findRes = res
            ctx.body = {
              status: 'OK',
              result: {
                id,
              },
            }
          }
        })
      } else {
        findRes = null
      }
      if(findRes === null) {
        // 未查询到用户时直接注册
        let userModel = new UsersModel({ _id: id })
        await userModel.save().then(res => {
          ctx.body = {
            status: 'OK',
            result: {
              id: res._id,
            },
          }
        })
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