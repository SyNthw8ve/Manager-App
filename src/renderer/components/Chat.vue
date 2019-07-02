<template>
  <div id="chat">
      <span class="open-slider" @click="openSlideMenu()">
        <div class="line"></div>
        <div class="line"></div>
      </span>

      <div id="chat-window">
        <ul>
          <li v-for="message in messages">
            <span>{{message}}</span>
          </li>
        </ul>
      </div>

      <div id="msg">
        <textarea @keypress.enter="post()"></textarea>
      </div>
    </div>
</template>

<script>

  import Watson from '../../main/watson.js'

  export default {

    name: 'chat',

    data() {

      return {

        messages: []

      }
    },

    created()
    {
      this.messages.push('Watson: ' + Watson.init());
    },

    methods: {

      openSlideMenu()
      {
        document.getElementById('chat').classList.toggle('active')
      },

      post()
      {
        let msg = document.querySelector('textarea').value;

        document.querySelector('textarea').value = ''

        this.messages.push('Me: ' + msg)

        this.messages.push('Watson: ' + Watson.response(msg))
      }
    }
  }
</script>

<style scoped>

#chat {

  width: 355px;
  height: 500px;
  position: absolute;
  background-color: #262626;
  border-left: 0px solid transparent;
  border-right: 0px solid transparent;
  border-top: 0px solid transparent;
  bottom: -500px;
  left: 980px;
  transition: .8s;
  z-index: 1000;

}

#chat.active {
  bottom: 0;
  border-top: 2px solid #00e7ff;
  border-left: 2px solid #00e7ff;
  border-right: 2px solid #00e7ff;
}

#chat .open-slider {

  position: absolute;
  padding: 7px 70px;
  border-top: 2px solid #00e7ff;
  border-left: 2px solid #00e7ff;
  border-right: 2px solid #00e7ff;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  display: block;
  background-color: #141414;
  left: 22%;
  bottom: 500px;
  
}

.line {

  border-top: 1px solid white;
  background-color: #fff;
  width: 55px;
  padding: 0px;
  margin-top: 3px;

}

#chat-window {

  background-color: #191919;
  margin: 20px 20px;
  height: 70%;
  overflow: auto;
  overflow-x: hidden;

}

#chat-window ul {

  list-style: none;
  margin: 0;
  padding: 0;

}

#chat-window li {

  margin-bottom: 5px;
  font-size: 18px;
  text-indent: 10px;

}

#chat-window li p {

  white-space: pre-wrap;
}

#msg {

  background-color: #191919;
  margin: 20px 20px;
  height: 13%;
  
}

#msg textarea {

  border: none;
  background-color: #191919;
  width: 100%;
  height: 100%;
  text-indent: 5px;
  font-size: 18px;
  font-weight: 200;
  color: azure;
}

#msg textarea:focus {

  outline: none;

}
  
</style>
