let micro = document.getElementById("micro");

micro.addEventListener("click", () => {

  if(micro.classList.contains('fa-microphone-slash')){

    micro.classList.remove('fa-microphone-slash');

  } else {

    micro.classList.add('fa-microphone-slash');

  }

})
