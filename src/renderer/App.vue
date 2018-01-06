<template>
  <div id="app">
    <navbar></navbar>
    <div class="flex-container">
      <mainContent></mainContent>
      <chat></chat>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'

  import Chat from './components/Chat.vue'

  import MainContent from './components/MainContent.vue'

  export default {

    components: {
      'navbar': NavBar,
      'chat': Chat,
      'mainContent': MainContent
    },
    
    name: 'watson-vue'

  }
</script>

<style >

  html{

    height: 100%;
  }

  #app{

    width: 100%;
    max-height: 700px;

  }

  body {

      background: #404040;
      height: 100%;
      font-family: Roboto;
      margin: 0;
      overflow: hidden;
      }

  .flex-container{

    display: flex;
    height: 100%;

  }

  ::-webkit-scrollbar
  {
      width: 10px;
      background-color:#4F4F4F;
      border-radius: 10px;
  }

  ::-webkit-scrollbar-track
  {
  	border-radius: 10px;
  	background-color: #4F4F4F;
  }

  ::-webkit-scrollbar-thumb
  {
  	border-radius: 10px;
  	background-color: #212733;
  }

</style>
