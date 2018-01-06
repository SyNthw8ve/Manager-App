<template>

  <section id="right-display">

        <div ref="display" id="chat-display">

          <ul>

          </ul>

        </div>

        <div id="chat-message">

          <form v-on:submit.prevent="post()">

            <input ref="msg" type="text" name="msg" placeholder="Talk to Watson!">

          </form>

        </div>

    </section>

</template>

<script>
  import Watson from '../../main/watson.js'

  export default {

    name: 'chat',

    methods: {

      post: function () {

        let msg = this.$refs.msg.value;

        //let res = Watson.response(msg);

        let display = this.$refs.display.querySelector('ul');

        console.log(display);

        let msgToDisplay = document.createElement('span');
        let icon = document.createElement('img');
        let li = document.createElement('li');
        let div = document.createElement('div');

        div.setAttribute('class', 'msg');

        icon.setAttribute('src', 'src/renderer/assets/logo.png');
        icon.setAttribute('class', 'logo');

        //msgToDisplay.appendChild(icon);

        msgToDisplay.innerHTML = "Hello!"

        div.appendChild(msgToDisplay);

        li.appendChild(div);

        display.appendChild(li)

        //display.appendChild(res)

      }
    }
  }
</script>

<style scoped>

  #right-display{

    width: 23.3%;
    height: 640px;
    background-color: #4A4A4A;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    margin: 0px;

  }

  #chat-display{

    width: 95%;
    height: 76.3%;
    background: #413B3B;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    overflow-y: auto;
    margin-top: 15px;
    margin-left: 15px;

  }

  #chat-display ul{

    list-style: none;
    margin: 40px 0;
    padding-left: 0px;

  }

  #chat-display li{

    margin-bottom: 40px;

  }

  #chat-message input[type="text"]{

    background: #413B3B;
    border-style: none;
    padding: 5px 0px;
    margin-left: 10px;
    font-size: 18px;
    color: #fff;

  }

  #chat-message{

    background: #413B3B;
    display: flex;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    width: 95%;
    height: 10.0%;
    margin-left: 15px;
    margin-top: 35px;

  }

  #chat-message button{

    background: #413B3B;
    border: none;
    margin-top: 13px;
    margin-left: 6px;
    padding: 0px 0px;
    float: left;

  }

  #chat-message form{

    margin: auto;
    margin-left: 5px;
  }

  .msg {

    padding: 15px 100px;
    width: 100px;
    border-radius: 40px;
    background-color: #6E6B6B;
    margin-top: 10px;

  }

  .logo{

    height: 55px;
    width: 55px;
    background-color: #413B3B;
    position: relative;
    top: 25px;
    right: 100px;
    border-radius: 50%;
    border: 5px solid #413B3B;

  }

</style>
