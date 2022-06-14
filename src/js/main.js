 const clickBtn = document.querySelector('.section__aside-btn');
 const clickCounter = document.querySelector('#click');
 const popupInfo = document.querySelector('.popup');
 const popupShadow = document.querySelector('.popup__shadow');
 const popupCloseBtn = document.querySelector('.popup__close-btn');
 const resetBtn = document.querySelector('.popup__btn')
 let countBtn = 1;

 function counterClick() {
    if (localStorage.count) {
      localStorage.count = Number(localStorage.count) + 1;
    } else {
      localStorage.count = 1;
    }
    clickCounter.textContent = ` ${localStorage.count} times`;
  } 
  function borderCount () {
    if (localStorage.count >= 5) {
      resetBtn.classList.add("active");
    } else {
      resetBtn.classList.remove("active");
    }
  };
 const showPopup = (e) => {
    e.preventDefault();
    popupShadow.classList.add('active');
    popupInfo.classList.add('active');
    counterClick();
    borderCount();
}
const closePopup = () =>{
    popupShadow.classList.remove('active');
    popupInfo.classList.remove('active');
    clickCounter.textContent = count;
}
const resetPopup = () => {
    popupShadow.classList.remove('active');
    popupInfo.classList.remove('active');
    localStorage.clear();
}


clickBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupShadow.addEventListener('click', closePopup);
resetBtn.addEventListener('click', resetPopup);

