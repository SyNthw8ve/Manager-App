<template>
  <div id="app">
    <navbar></navbar>
    <chat></chat>
    <mainContent></mainContent>
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
    width:100%;
  }

  #app{

    width: 100%;
    height: 100%;

  }

  body {

    height: 100%;
    width: 100%;
    font-family: Roboto;
    background: #282828;
    margin: 0px;
    overflow: hidden;

  }

  .flex-container{

    display: flex;
    height: 100%;

  }

  ::-webkit-scrollbar
  {
    width: 5px;
    background-color:#212733;
  }

  ::-webkit-scrollbar-track
  {
  	background-color: #191919;
  }

  ::-webkit-scrollbar-thumb
  {
  	background-color: #00e7ff;
  }

  

</style>
