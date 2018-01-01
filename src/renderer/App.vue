<template>
  <div>
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
body {

    background: #404040;
    font-family: Roboto;
    margin: 0;
    }

.flex-container{

  display: flex;

}

</style>
