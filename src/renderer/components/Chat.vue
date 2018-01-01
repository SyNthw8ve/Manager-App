<template>
  <section id="right-display">

        <div id="chat-display">

          <ul>
            <li></li>
          </ul>

        </div>

        <div id="chat-message">

          <i id="micro" class="fas fa-microphone"></i>

          <div id="vbar"></div>

          <form id="watson-form">

            <input type="text" name="msg" placeholder="Talk to Watson!">

          </form>

        </div>

    </section>
</template>

<script>
  export default {
    name: 'chat'
  }
</script>

<style scoped>
  #right-display{

    width: 26.3%;
    height: 635px;
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
    position: relative;
    top: -25px;
    margin-left: 15px;

  }

  #chat-display ul{

    list-style: none;
    margin: 0px;
    padding-left: 0px;
    margin-top: 30px;

  }

  .msg-wrapper{

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 40px 80px;;

  }

  #chat-display li{

    margin-bottom: 40px;

  }

  #watson-form{

    margin-left: 10px;
    padding: 23px 0px;

  }

  #chat-message input[type="text"]{

    background: #413B3B;
    border-style: none;
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
    margin-top: 15px;

  }

  #chat-message button{

    background: #413B3B;
    border: none;
    margin-top: 13px;
    margin-left: 6px;
    padding: 0px 0px;
    float: left;

  }

  #vbar{

    height: 40px;
    border-left: 1px solid #D1D1D1;
    margin-top: 13px;
    float: left;
    padding: 0px;

  }

  .fa-microphone{

    cursor: pointer;
    padding: 0px 12px;
    margin-left: 2px;
    overflow: hidden;
    color: #707070;
    margin-top: 16px;
    font-size: 32px;

  }

</style>
