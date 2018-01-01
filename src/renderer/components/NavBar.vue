<template>
  <header>
  <div id="wrapper">
    <a href="./index.html"><img id="logo" src="../assets/logo.png" /></a>
        <nav>
            <ul>
              <li>
                <a href="./index.html">
                  <i class="icon fas fa-home"></i>
                  <p>
                    Home
                  </p>
                </a>
              </li>
              <li class="dropdown">
                <a class="dropbtn">
                  <i class="icon fas fa-list-ul" ></i>
                  <p>
                    Manager
                  </p>
                </a>
                  <div class="dropdown-content">
                    <a href="./water.html">
                      <i class="fas fa-tint" ></i>
                      <p>Water</p>
                      <i class="next fas fa-chevron-right" ></i>
                    </a>
                    <a href="./elec.html">
                      <i class="fas fa-bolt" ></i>
                      <p>Electricity</p>
                      <i class="next fas fa-chevron-right" ></i>
                    </a>
                    <a>
                      <i class="fas fa-cloud" ></i>
                      <p>Gas</p>
                      <i class="next fas fa-chevron-right" ></i>
                    </a>
                  </div>
              </li>
              <li>
                <a href="./config.html">
                  <i class="icon fas fa-cog" ></i>
                  <p>
                    Config
                  </p>
                </a>
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
  export default {
    name: 'home',

    methods: {

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

padding-top: 15px;
padding-left: 23px;
padding-right: 23px;
width: 120px;

}

header nav li:hover{

border-top: 4px solid #00D8F0;

}

header nav a{

text-decoration: none;
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
    background: #303030;
    padding: 8px 0px;
    padding-left: 12px;
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
