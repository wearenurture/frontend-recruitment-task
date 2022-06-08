const clickCounter = () => {
    if (parseInt(localStorage.getItem("clickcount")) >= 1 && localStorage.getItem("clickcount") < 5) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else if (parseInt(localStorage.getItem("clickcount")) >= 5) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
        document.querySelector(".reset").classList.add("reset__acive");
    } else {
        localStorage.clickcount = 1;
    }
    document.querySelector(".display").innerHTML = localStorage.clickcount;
}
export default clickCounter;