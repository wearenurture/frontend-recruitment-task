import MicroModal from '../../node_modules/micromodal/dist/micromodal.es.js';

//popup modal

const createModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal-1');
    modal.setAttribute('aria-hidden', true);

    const modal_overlay = document.createElement('div');
    modal_overlay.classList.add('modal__overlay');
    modal_overlay.setAttribute('tabindex', -1);
    modal_overlay.setAttribute('data-micromodal-close', true);

    const modal_container = document.createElement('div');
    modal_container.classList.add('modal__container');
    modal_container.setAttribute('role', 'dialog');
    modal_container.setAttribute('aria-modal', true);
    modal_container.setAttribute('aria-labelledby', 'modal-1-title');

    const button_close = document.createElement('button');
    button_close.classList.add('modal__close');
    button_close.setAttribute('aria-label', 'Close modal');
    button_close.setAttribute('data-micromodal-close', true);

    const header = document.createElement('header');

    const h2 = document.createElement('h2');
    h2.classList.add('modal__title');
    h2.setAttribute('id', 'modal-1-title');
    h2.innerText = 'Alert!';

    const content = document.createElement('div');
    content.classList.add('modal__content');
    content.setAttribute('id', 'modal-1-content');

    const button_clear = document.createElement('button');
    button_clear.classList.add('modal__clear');

    header.appendChild(h2);
    modal_container.appendChild(button_close);
    modal_container.appendChild(header);
    modal_container.appendChild(content);
    modal_container.appendChild(button_clear);
    button_clear.innerText = "Wyzeruj licznik"
    modal_overlay.appendChild(modal_container);
    modal.appendChild(modal_overlay);

    return modal;
}

const clearButtonHandler = () => {
    localStorage.setItem('numberOfClicks', 0);
    let content = document.querySelector('.modal__content');
    content.innerHTML = `You have clicked <span>${localStorage.getItem('numberOfClicks')} times</span> to related button.`;
}

// const setCounterInSpan = (counter) => {

//     let content = document.querySelector('.modal__content');

//     if (!counter || Number(counter) === 0) {
//         content.innerHTML = `You have clicked <span>1 time</span> to related button.`;
//     } else {
//         content.innerHTML = `You have clicked <span>${current_number} times</span> to related button.`;
//     }

// }

const checkAndWriteClickToLocalStorage = () => {
    let current_number = localStorage.getItem('numberOfClicks');
    let content = document.querySelector('.modal__content');
    const button_clear = document.querySelector('.modal__clear');
    button_clear.classList.add('hidden');


    if (!current_number || Number(current_number) === 0) {
        localStorage.setItem('numberOfClicks', 1);
        content.innerHTML = `You have clicked <span>1 time</span> to related button.`;
    } else {
        current_number++;
        localStorage.setItem('numberOfClicks', current_number);
        content.innerHTML = `You have clicked <span>${current_number} times</span> to related button.`;
    }
    
    if (Number(current_number) >= 5) {
        button_clear.classList.remove('hidden');
        button_clear.addEventListener('click', () => clearButtonHandler());
    }
}

const onClickHandler = () => {
    MicroModal.show('modal-1');
    checkAndWriteClickToLocalStorage();
}


//modal - section

const createContainer = () => {
    const container = document.createElement("div");

    return container;  
}

const createImage = (alt, title) => {
    const img = new Image();
    alt ? img.alt = alt : img.alt = "";
    title ? img.title = title : "";

    return img;
}

const createTitle = (text) => {
    const title = document.createElement('h1');

    title.innerText = text ? text : "";

    return title;
}

const createContentText = (text) => {
    const content = document.createElement("p");

    content.innerText = text ? text : "";

    return content;
}

const createButton = () => {
    const button = document.createElement("button");
    button.innerText = "Button";
    button.addEventListener('click', () => onClickHandler())

    return button;
}

//function create section
//@param class_name of created section
//@param title to section
//@param content to section
//@param img_alt
//@param img_title

export const createSection = (class_name, title, content, img_alt, img_title) => {
    const section = document.createElement("section");
    section.classList.add(class_name);
    

    //create left container
    const left_container = createContainer();
    left_container.classList.add('left_container');
   
    const img = createImage(img_alt, img_title);

    //create right container

    const right_container = createContainer();
    right_container.classList.add('right_container');

    const header = title ? createTitle(title) : createTitle("");
    const text = content ? createContentText(content) : createContentText("");
    const button = createButton();

    left_container.appendChild(img);
    right_container.appendChild(header);
    right_container.appendChild(text);
    right_container.appendChild(button);


    section.appendChild(left_container);
    section.appendChild(right_container);

    const isModalPresent = document.querySelector('.modal');
    if (!isModalPresent) {
        document.body.appendChild(createModal());
    }

    return section;

}
