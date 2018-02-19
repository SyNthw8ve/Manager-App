<template>
  <div id="chat">
      <span class="open-slider" @click="openSlideMenu()">
        <div class="line"></div>
        <div class="line"></div>
      </span>

      <div id="chat-window"></div>

      <div id="msg"></div>
    </div>
</template>

<script>

  import Watson from '../../main/watson.js'

  export default {

    name: 'chat',

    methods: {

      openSlideMenu()
      {
        document.getElementById('chat').classList.toggle('active')
      },
      
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
}

#msg {

  background-color: #191919;
  margin: 20px 20px;
  height: 13%;
}
  
</style>
