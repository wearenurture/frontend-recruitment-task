const button = document.getElementById("button");
const count = document.getElementById("count");
const popup = document.getElementById("popup");
let counter = 1;

function clickCounter() {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount)+1;
    } else {
      localStorage.clickcount = 1;
    }
    count.innerText = ` ${localStorage.clickcount} times`;  }

const handleClick = (e) => {
  e.preventDefault();
  popup.classList.add("popup");
    clickCounter();

};

const handleClose = (e) => {
  if (e.target.closest(".alert")) {
    return;
  }
  popup.classList.remove("popup");
};

button.addEventListener("click", handleClick);
popup.addEventListener("click", handleClose);
