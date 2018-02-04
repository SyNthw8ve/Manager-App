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

       

      }
    }
  }
</script>

<style scoped>

  #right-display{

    width: 23.3%;
    height: 91%;
    background-color: #4A4A4A;
    margin: 0px;
    overflow-y: auto;

  }

  #chat-display{

    width: 95%;
    height: 76.3%;
    background: #282828;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
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

    background: #282828;
    border-style: none;
    padding: 5px 0px;
    margin-left: 10px;
    font-size: 18px;
    color: #fff;

  }

  #chat-message input[type="text"]:focus{

    outline: none;

  }

  #chat-message{

    background: #282828;;
    display: flex;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
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
