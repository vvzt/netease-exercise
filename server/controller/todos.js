const wait = async (s) => {
  return new Promise(res => {
    setTimeout(() => res(), s*1000);
  })
}

module.exports = {
  async get(ctx) {
    await wait(1);
    ctx.body = {
      test: 'test',
    }
  },

  async add(ctx) {
    await wait(1);
    ctx.body = {
      test: 'test',
    }
  },

  async delete(ctx) {
    await wait(1);
    ctx.body = {
      test: 'test',
    }
  },

  async modify(ctx) {
    await wait(1);
    ctx.body = {
      test: 'test',
    }
  }
}