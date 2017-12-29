let micro = document.getElementById("micro");

let watsonForm = document.forms['watson-form'];

let display = document.querySelector("#chat-display");

let chatList = document.querySelector("#chat-display ul");

watsonForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const value = watsonForm.querySelector('input[type="text"]').value;

  const li = document.createElement('li');
  const msg = document.createElement('span');

  msg.textContent = value;
  msg.classList.add('message');

  li.appendChild(msg);
  chatList.appendChild(li);

})

micro.addEventListener("click", (e) => {

  if(e.target.classList.contains('fa-microphone-slash')){

    e.target.classList.remove('fa-microphone-slash');

  } else {

    e.target.classList.add('fa-microphone-slash');

  }

})
