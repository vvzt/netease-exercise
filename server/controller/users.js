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
      if(id) {
        // 有 query id 时查询用户是否存在
        let result = await UsersModel.findById(id).exec()
        if(result) {
          ctx.body = {
            status: 'OK',
            result: {
              id,
            },
          }
        }
      } else {
        // 没带id请求时，直接注册
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