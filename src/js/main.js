const button = document.getElementById("button");
const count = document.getElementById("count");
const popup = document.getElementById("popup");
let counter = 0;



const handleClick = () => {
    counter++;
    popup.classList.add("popup")
    count.innerText = `${counter} times`;
}

const handleClose = (e) => {
 if(e.target.closest(".alert")){
    return;
 }
    popup.classList.remove("popup")
}

button.addEventListener("click",handleClick);
popup.addEventListener("click",handleClose);

