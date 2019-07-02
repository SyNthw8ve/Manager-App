<template>
<div>
    <div class="calendar">
        <div class="day">
            <slot name="form"></slot>
        </div>
        <div class="day">
            <span>Monday <i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
            <ul>
                <li v-for="affair in weekAffairs.monday.affairs"> 
                    <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                        <i @click="remove('monday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                    </span> 
                </li>
            </ul>    
            </div>
        </div>
        <div class="day">
            <span>Thuesday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
            <ul>
                <li v-for="affair in weekAffairs.thuesday.affairs"> 
                    <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                        <i @click="remove('thuesday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                    </span> 
                </li>
            </ul>    
            </div>
        </div>
        <div class="day">
            <span>Wednesday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
            <ul>
                <li v-for="affair in weekAffairs.wednesday.affairs"> 
                    <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                        <i @click="remove('wednesday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                    </span> 
                </li>
            </ul>    
            </div>
        </div>
        <div class="day">
            <span>Thursday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
            <ul>
                <li v-for="affair in weekAffairs.thursday.affairs"> 
                    <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                        <i @click="remove('thursday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                    </span> 
                </li>
            </ul>    
            </div>
        </div>
        <div class="day">
            <span>Friday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
            <ul>
                <li v-for="affair in weekAffairs.friday.affairs"> 
                    <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                        <i @click="remove('friday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                    </span> 
                </li>
            </ul>    
            </div>
        </div>
        <div class="day">
            <span>Saturday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
            <ul>
                <li v-for="affair in weekAffairs.saturday.affairs"> 
                    <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                        <i @click="remove('saturday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                    </span> 
                </li>
            </ul>    
            </div>
        </div>
        <div class="day">
            <span>Sunday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
            <ul>
                <li v-for="affair in weekAffairs.sunday.affairs"> 
                    <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                        <i @click="remove('sunday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                    </span> 
                </li>
            </ul>    
            </div>
        </div>
        </div>
        <modal :activeData="activeData"></modal>
    </div>
</template>

<script>

import Modal from './Modals/Modal.vue'

export default {

    data() {

        return {

            activeData: {

                active: '',

                type: this.active.comp
                
            },

        }
    },

    components: {

        'modal': Modal
    },

    mounted() {

        document.querySelector('.icon').style.color = this.active.color

        let red = parseInt(this.active.color.substring(1,3), 16)
        let green = parseInt(this.active.color.substring(3,5), 16)
        let blue = parseInt(this.active.color.substring(5,7), 16)

        document.querySelectorAll('.calendar .day i.remove-btn:hover').forEach(element => {

            element.style.color = this.active.color
        })

        document.querySelectorAll('.day span').forEach(element => {

            element.style.boxShadow =  "2px 2px 5px 1px rgba(" + red + ", " + green + ", " + blue + ", 0.75)"
        })

    },

    props: ['weekAffairs', 'active'],

    methods: {

        add(e) {

            this.activeData.active = e.target.parentElement.innerText

            this.$store.dispatch('showModal', {modal: true});

        },

        remove(day, affair) {

            this.$store.dispatch('removeAffair', {type: this.active, day: day, affair: affair})

        },
    }   
}

</script>

<style scoped>

.calendar {

    width: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 265px);
    grid-gap: 10px 0px;
    justify-items: center;

  }

  .day {

    background-color: #191919;
    width: 85%;
    height: 90%;
    padding: 10px;
    text-align: center;
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);

  }

  .affairs {

    overflow: auto;
    height: 150px;
    margin-top: 5px;
  }

  .day span {

    background-color: #282828;
    box-shadow: 2px 2px 5px 1px rgba(0, 231, 255, 0.75);
    display: block;
    color: #ccc ;
    font-weight: 300;
    margin: 0;
    padding: 5px;
    
  }

  .day i.add {

    float: right;
    cursor: pointer;
    position: relative;
    top: 0px;
    left: 0px;

  }

  .day ul {

    list-style: none;
    margin-top: 5px;
    padding: 0;
    text-align: left;
    
  }

  .day li {

    margin-bottom: 5px;
    color: white;
    font-weight: 300;
  }
  

  .calendar .day span.affair-info {

    display: block;
    width: 95%;
    box-shadow: 0px 0px 0px 0px;
  }

  .calendar .day i.remove-btn {

    position: static;
    float: right;
    cursor: pointer;

  }

  .calendar .day i.remove-btn:hover {

    color: #ff0000;

  }

  .day input {

    padding: 10px 40px;
    margin: auto;
    color: white;
    font-size: 14px;
    display: block;
    background-color: #282828;
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
    border: none;
    box-sizing: border-box;

  }

  .day form input:focus {

    outline: none;
    
  }

  .day form {

    display: block;

  }

  .fas, .far {

    position: relative;
    top: -28px;
    right: 98px;
    margin: 0;
    color: #a5a5a5;
    font-size: 20px;
    padding-right: 8px;

  }

  .icon {

    position: static;
    margin: 15px auto;
    text-align: center;
    display: block;
    font-size: 40px;
    color: #00e7ff;
    
  }
  
  #submit {

    color: #a5a5a5;
    cursor: pointer;
    box-shadow: 9px 11px 14px 0px rgba(0,0,0,0.75);

  }

  #submit:hover {

    background-color: #191919;

  }


</style>
