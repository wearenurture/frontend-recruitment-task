const openBtn = document.querySelector('.section_button');
const closeBtn = document.querySelector('.popup_closeBtn')
const alertPopup = document.querySelector('.popup');
const alertShadow = document.querySelector('.section_shadow');


const clickCounter = document.querySelector('#clicknmb');


let clickBtnNumb = 0;
var browserStorage = JSON.parse(window.localStorage.getItem('click'));
let resetBtn = document.createElement('button');
let addButtonFlag = true;

openBtn.addEventListener('click', () => {
    alertPopup.classList.add('active');
    alertShadow.classList.add('active');
    clickBtnNumb++;
    window.localStorage.setItem('click', `${browserStorage}`);
    clickCounter.textContent = ++browserStorage;

    if (browserStorage >= 5) {
        if (addButtonFlag = true) {
            alertPopup.appendChild(resetBtn);
            resetBtn.textContent = "Reset Click Number";
            resetBtn.classList.add('popup_resetBtn');
            addButtonFlag = false;
        }
        resetBtn.addEventListener('click', () => {
            clickBtnNumb = 0;
            browserStorage = 0;
            window.localStorage.setItem('click', `${browserStorage}`);
            clickCounter.textContent = 0;
            alertPopup.removeChild(resetBtn);
        })


    };
});

closeBtn.addEventListener('click', closePopup);

alertShadow.addEventListener('click', closePopup)

function closePopup() {
    alertPopup.classList.remove('active');
    alertShadow.classList.remove('active');
}
