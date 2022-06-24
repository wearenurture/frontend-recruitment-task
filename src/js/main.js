//constants
const title = "Lorem ipsum";
const text = "Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required."
const desktop_img = "./dist/img/desktop.webp";
const mobile_img = "./dist/img/mobile.webp";
const url = "https://jsonplaceholder.typicode.com/users";

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

    const button_close = document.createElement('img');
    button_close.classList.add('modal__close');
    button_close.setAttribute('aria-label', 'Close modal');
    button_close.setAttribute('data-micromodal-close', true);
    button_close.src = './dist/img/x-icon.png';
    button_close.alt = "close popup"

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

const createImage = (alt, title, desktop_img, mobile_img) => {

    const img = new Image();
    
    const img1 = document.createElement('img');
    const img2 = document.createElement('img');

    img1.src = desktop_img;
    img2.src = mobile_img;

    alt ? img.alt = alt : img.alt = "";
    title ? img.title = title : "";

    img.srcset = `${mobile_img} 480w, ${desktop_img} 784w`;
    img.sizes = `(max-width: 1000px) 480px, 784px`;
    img.src = mobile_img;

    return img;
}

const createTitle = (text, class_name) => {
    const title = document.createElement('h1');

    title.setAttribute('aria-description', 'Nagłówek')
    title.innerText = text ? text : "";
    title.classList.add(`${class_name}__title`)

    return title;
}

const createContentText = (text, class_name) => {
    const content = document.createElement("p");

    content.setAttribute('aria-description', 'Zawartość paragrafu')
    content.innerText = text ? text : "";
    content.classList.add(`${class_name}__content`)

    return content;
}

const createButton = (class_name) => {
    const button = document.createElement("button");
    button.innerText = "Button";
    button.classList.add(`${class_name}__button`)
    button.setAttribute('aria-description', 'kliknij przycisk by otworzyć popup');
    button.addEventListener('click', () => onClickHandler())

    return button;
}

//function create section
//@param class_name of created section
//@param title to section
//@param content to section
//@param img_alt
//@param img_title

const createSection = (class_name, title, content, img_alt, img_title, desktop_img, mobile_img) => {
    const section = document.createElement("section");
    section.classList.add(class_name);
    

    //create left container
    const left_container = createContainer();
    left_container.classList.add(`${class_name}__left_container`);
   
    const img = createImage(img_alt, img_title, desktop_img, mobile_img);

    //create right container

    const right_container = createContainer();
    right_container.classList.add(`${class_name}__right_container`);

    const header = title ? createTitle(title, class_name) : createTitle("", class_name);
    const text = content ? createContentText(content, class_name) : createContentText("", class_name);
    const button = createButton(class_name);

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

const module = createSection("module", title, text, "alternatywny tekst", "tytuł obrazka", desktop_img, mobile_img);


document.body.appendChild(module);


//additional-task creating table with fetched data

const placeForTable = document.querySelector('.modal__container');

const createTable = (data) => {

    const table = document.createElement('table');
    const thaed = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thaed.innerHTML =
        `
        <tr>
            <th>
                Imię i nazwisko
            </th>
            <th>
                Email
            </th>
            <th>
                Adres
            </th>
            <th>
                Telefon
            </th>
            <th>
                Nazwa firmy
            </th>
        </tr>
        `

    data.map(row => {
        const line = document.createElement('tr');
        line.innerHTML =
        `<tr>
            <td>${row?.name}</td>
            <td>${row?.email}</td>
            <td>${row?.address?.city}, ${row?.address?.street}, ${row?.address?.suite}</td>
            <td>${row?.phone}</td>
            <td>${row?.company?.name}</td>
        </tr>`

        tbody.appendChild(line);
    });        
    
    table.appendChild(thaed);
    table.appendChild(tbody);

    return table;
}
  

const getDataFromEndpointAndAddTable = () => {
    try {
            fetch(url)
            .then(response => response.json())
            .then(data => createTable(data))
            .then(table => placeForTable.appendChild(table))
        } catch (error) {
            console.log(error)
        }
}
    
getDataFromEndpointAndAddTable();

