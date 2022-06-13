 const clickBtn = document.querySelector('.section__aside-btn');
 const clickCounter = document.querySelector('#click');
 const  popupInfo = document.querySelector('.popup');
 const  popupShadow = document.querySelector('.popup__shadow');
 const  popupCloseBtn = document.querySelector('.popup__close-btn');
 
 let countBtn = 0;

 const showPopup = () => {
    popupShadow.classList.add('active');
    popupInfo.classList.add('active')
    countBtn++;
    clickCounter.textContent = countBtn + " times";
}

const closePopup = () => {
    popupShadow.classList.remove('active');
    popupInfo.classList.remove('active');
    countBtn = 0;
    clickCounter.textContent = 0;
}

clickBtn.addEventListener('click',showPopup);
popupCloseBtn.addEventListener('click',closePopup);