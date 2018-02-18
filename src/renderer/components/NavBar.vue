<template>
  <header>
    <div id="side-menu" class="side-nav">
      <span class="open-slider" @click="openSlideMenu()">
        <i class="fas fa-bars"></i>
      </span>
      <span class="marks">Landing</span>
      <ul>
        <li>
          <router-link to="/" @click="active()">
            <p>Home</p>
          </router-link>
        </li>
        <li>
          <router-link to="#" @click="active()">
            <p>About Us</p>
          </router-link>
        </li>
      </ul>
      <span class="marks">Management</span>
      <ul>
        <li>
          <router-link to="/overview" @click="active()">
            <p>Overview</p>
          </router-link>
        </li>
        <li>
          <router-link to="/water" @click="active()">
            <p>Water</p>
          </router-link>
        </li>
        <li>
          <router-link to="/elec" @click="active()">
            <p>Electricity</p>
          </router-link>
        </li>
        <li>
          <router-link to="/gas" @click="active()">
            <p>Gas</p>
          </router-link>
        </li>
        <li>
          <router-link to="/gas" @click="active()">
            <p>Add State</p>
            <i class="fas fa-plus-circle"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>

  import { bus } from '../main'

  export default {

    name: 'home',

    methods: {

      openSlideMenu()
      {
        document.getElementById('side-menu').classList.toggle('active')
        document.querySelector('.fa-bars').classList.toggle('fa-times-circle')

        bus.$emit('slideOn');
      },

    }
  }
</script>

<style scoped>

* {

  margin: 0;
  padding: 0;
}

header{

  width: 100%;
  margin: 0;
}

.fas, p {

  display: inline-block;
  margin: 0;
}

.fa-bars {

  font-size: 30px;
  color: #fff;
}

.fa-plus-circle {

  font-size: 22px;
  color: #ddd;
  float: right;
}

.marks {
  margin-top: 10px;
  margin-bottom: 5px;
  color: #727171;
  padding: 10px;
  display: block;
}

#side-menu {

  width: 250px;
  height: 100%;
  position: absolute;
  background-color: #191919;
  left: -250px;
  transition: .4s;
}

#side-menu.active {

  left: 0;
}
  
#side-menu a {

  text-decoration: none;
  color: #ddd;
  display: block;
  padding: 15px 24px;
  border-left: 4px solid transparent;
  font-size: 16px;
  font-weight: 300;
}

#side-menu a:hover {

  border-left: 4px solid #00D8F0;
  background-color: #000;
}

#side-menu .open-slider {

  position: absolute;
  top: 30px;
  left: 280px;
}

</style>
