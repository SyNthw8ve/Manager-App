<template>
  <header>
  <div id="wrapper">
    <router-link to="/"><img id="logo" src="../assets/logo.png" /></router-link>
        <nav>
            <ul>
              <li>
                <router-link to="/">
                  <i class="icon fas fa-home"></i>
                  <p>
                    Home
                  </p>
                </router-link>
              </li>
              <li class="dropdown">
                <a class="dropbtn">
                  <i class="icon fas fa-chart-area"></i>
                  <p>
                    Manager
                  </p>
                </a>
                  <div class="dropdown-content">

                    <router-link to="/water">
                      <i class="fas fa-tint" ></i>
                      <p>Water</p>
                      <i class="next fas fa-chevron-right" ></i>
                    </router-link>

                    <router-link to="/elec">
                      <i class="fas fa-bolt" ></i>
                      <p>Electricity</p>
                      <i class="next fas fa-chevron-right" ></i>
                    </router-link>

                    <router-link to="/gas">
                      <i class="fas fa-fire"></i>
                      <p>Gas</p>
                      <i class="next fas fa-chevron-right" ></i>
                    </router-link>

                  </div>
              </li>
              <li >
                <router-link to="/">
                  <i ref="cog" class="icon fas fa-cog" ></i>
                  <p>
                    Config
                  </p>
                </router-link>
              </li>
            </ul>
        </nav>
        <form>
          <input type="text" name="search" placeholder="Search">
        </form>
  </div>
  </header>
</template>

<script>

  import { bus } from '../main'

  export default {

    name: 'home',

    methods: {

      spin: function (event) {

        let cog = this.$refs.cog;

        if(event){

          cog.classList.add('fa-spin');

        } else {

          cog.classList.remove('fa-spin');
        }
      }

    }
  }
</script>

<style scoped>

/* Navbar */

  .wrapper{

  width: 100%;
  margin: 0;

  }

  header{

  background: #303030;

  }

  header nav{

  float: left;

  }

  header p{

  display: inline-block;
  font-size: 20px;
  margin: 0px;

  }

  header:after {

  content: "";
  display: block;
  clear: both;

  }

  header nav ul{

  list-style: none;
  display: flex;
  margin: 0px 0px;

  }

  header nav li{

  padding-top: 11px;
  padding-left: 23px;
  padding-right: 23px;
  cursor: pointer;
  border-top: 4px solid transparent;
  width: 120px;

  }

  header nav li:hover{

  border-top: 4px solid #00D8F0;

  }

  header nav a{

  text-decoration: none;
  font-weight: 300;
  color: #fff;

  }

  #logo{

  height: 55px;
  width: 55px;
  float: left;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;

  }

  header form{

  float: right;
  margin-right: 70px;
  margin-bottom: 0px;
  margin-top: 10px;

  }

  header input[type="text"]{

  background: url(../assets/search.png) right no-repeat;
  background-size: 25px 25px;
  background-color: #303030;

  border-bottom: 1px solid #fff;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;

  padding-top: 10px;
  margin-top: 5px;

  font-size: 18px;
  color: #fff;

  }

  .icon{

  font-size: 25px;
  margin-right: 10px;
  margin-top: 5px;
  display: inline-block;

  }

  /* dropdown-menu */

  .dropbtn {

    display: inline-block;
    font-size: 20px;
    color: white;
    text-decoration: none;
    margin-bottom: 18px;
    cursor: pointer;

  }


  li.dropdown {

    display: inline-block;
    cursor: pointer;

  }

  .dropdown-content {

    display: none;
    position: absolute;
    border-bottom-right-radius: 20px;
    background-color: #f9f9f9;
    min-width: 160px;
    width: 230px;
    z-index: 1;

  }

  .dropdown-content a {

    color: white;
    border: 1px solid #707070;
    border-left: 4px solid #707070;
    background: #303030;
    padding: 6px 0px;
    padding-left: 8px;
    cursor: pointer;
    text-decoration: none;
    display: block;

  }

  .dropdown-content a:last-child {

    border-bottom-right-radius: 20px;
      

  }

  .dropdown-content a:hover {

    border-left: 4px solid #00D8F0;

  }

  .dropdown-content a:hover .next {

    font-size: 25px;

  }

  .dropdown:hover .dropdown-content {

      display: block;

  }

  .dropdown-content .fas{

    font-size: 25px;
    margin-top: 2px;
    margin-right: 10px;

  }

  dropdown-content p{

    font-size: 18px;
    display: inline-block;

  }

  .next{

    margin-top: 2px;
    margin-right: 5px;
    font-size: 0px;
    float: right;

  }
</style>
