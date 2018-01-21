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
    background: #404040;
    margin: 0px;
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

  .to-animate {

    animation: downscale 0.5s ease 0s 1 normal forwards;

  }

  .to-animate:hover {

    animation: upscale 0.5s ease 0s 1 normal forwards;

  }

  @keyframes downscale {

    from {transform: scale(1.1)}

    to {transform: scale(1)}
    
  }

  @keyframes upscale {

    from {transform: scale(1)}

    to {transform: scale(1.1)}
    
  }

</style>
