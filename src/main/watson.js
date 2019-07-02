const RiveScript = require('rivescript')
const bot = new RiveScript()

export default {

  response: function (msg) {
    return msg
  },

  init: function () {
    bot.loadFile('src/main/watson.rive', this.fileRead, this.fileError)

    return 'Loaded and ready for service!'
  },

  fileRead: function () {
    console.log('Read successful')
    bot.sortReplies()
  },

  fileError: function (error) {
    console.log(error)
  }
}
