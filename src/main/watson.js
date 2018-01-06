const RiveScript = require('rivescript');
const bot = new RiveScript();

export default{

  response: function (msg) {

    let msgToDisplay = document.createElement('p');

    msgToDisplay.innerHTML = "Hello!";

    return msgToDisplay

  },

  init: function () {

    bot.loadFile('src/main/watson.rive', this.fileRead, this.fileError );

  },

  fileRead: function(){

    console.log("Read successful");
    bot.sortReplies();

  },

  fileError: function(error){

    console.log(error)

  }
}
