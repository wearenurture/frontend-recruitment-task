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

    return section;

}
