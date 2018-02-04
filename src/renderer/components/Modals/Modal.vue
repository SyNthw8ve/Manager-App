<template>
    <transition name="modal">
        <div class="modal-mask" v-show="modal">
            <div class="modal-container">
                <span>{{activeData.active}}</span>
                <i @click="close()" class="fas fa-times"></i>
                <div class="form-wrapper">
                    <form>
                        <input v-model="data.action" type="text" name="action" placeholder="Action">
                        <input v-model="data.duration" type="number" name="time" placeholder="Time of usage">
                        <input v-model="data.times" type="number" name="number" placeholder="Nº of times per day">
                        <input @click.prevent="submit()" id="submit" type="submit" name="submit" value="Add">
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

  export default {
    components: {

    },

    props: ['activeData'],

    data () {

      return {

          data: {

            action: null,

            duration: null,

            times: null 
          }

      }
    },

    methods: {

        close() {

            this.$store.dispatch('showModal', {modal: false});

            this.data = {

                action: null,

                duration: null,

                times: null }
        },

        submit() {

            const payload = {

                type: this.activeData.type,
                day: this.activeData.active.toLowerCase(),
                data: this.data
            }

            this.$store.dispatch('addAffair', payload)

            this.data = {

                action: null,

                duration: null,

                times: null }
            
        }
    },

    computed: {

        modal(){

            return this.$store.state.showModal
        }
    },

    name: 'modal',

  }
</script>

<style scoped>

.form-wrapper input {

    margin: 20px auto;
    padding: 10px 50px;
    width: 200px;
    color: white;
    font-size: 14px;
    display: block;
    background-color: #282828;
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
    border: none;

  }

  

  .form-wrapper form input:focus {

    outline: none;
    
  }

  .form-wrapper {

    background-color: #191919;
    display: flex;
    align-content: center;
    width: 45%;
    height: 40%;

  }

  .modal-mask {

    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;

  }

  #submit:hover {

      cursor: pointer;
      background-color: #191919;
      
  }

 .modal-container {

    width: 300px;
    margin: 150px auto;
    padding: 20px 30px;
    background-color: #191919;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}

.modal-container span {

    color: #fff;
    font-size: 30px;
}

.modal-container > i {

    font-size: 30px;
    color: #fff;
    cursor: pointer;
    float: right;
    
}

.modal-container > i:hover {

    color: #600000;
}

 
.modal-enter {
opacity: 0;
}

.modal-leave-active {

opacity: 0;

}

.modal-enter .modal-container,
.modal-leave-active .modal-container {

transform: scale(1.1);
}


</style>

