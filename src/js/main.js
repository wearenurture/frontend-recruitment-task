const button = document.getElementById("button");
const count = document.getElementById("count");
const popup = document.getElementById("popup");
const reset = document.getElementById("reset");
let counter = 1;

function clickCounter() {
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
  } else {
    localStorage.clickcount = 1;
  }
  count.innerText = ` ${localStorage.clickcount} times`;
}

const isBigger = () => {
  if (localStorage.clickcount >= 5) {
    reset.classList.remove("reset-closed");
    reset.classList.add("reset");
    console.log(reset);
  } else {
    reset.classList.remove("reset");
    reset.classList.add("reset-closed");
  }
};

const handleClick = (e) => {
  e.preventDefault();
  popup.classList.add("popup");
  clickCounter();
  isBigger();
};

const handleClose = (e) => {
  if (e.target.closest(".alert")) {
    return;
  }
  popup.classList.remove("popup");
};

const handleReset = (e) => {
  e.preventDefault();
  popup.classList.remove("popup");
  popup.classList.add("popup-closed");
  localStorage.clear();
};

button.addEventListener("click", handleClick);
popup.addEventListener("click", handleClose);
reset.addEventListener("click", handleReset);
