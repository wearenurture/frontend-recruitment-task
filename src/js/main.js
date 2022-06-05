const description =
  " Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.";

// view

class imageView {
  container;
  showModalButton;
  closeModalButton;
  modal;
  overlay;
  counter;
  modalInfo;
  resetButton;
  title;
  imageUrl;
  alt;
  description;
  constructor(counter, imageUrl, container, alt, description, title) {
    this.container = container;
    this.title = title;
    this.imageUrl = imageUrl;
    this.alt = alt;
    this.description = description;
    this.createMarkup();

    this.showModalButton = document.querySelector(".main__button");
    this.modal = document.querySelector(".modal");
    this.overlay = document.querySelector(".overlay");
    this.modalInfo = document.querySelector(".modal__content__info");
    this.resetButton = document.querySelector(".modal__reset");
    this.closeModalButton = document.querySelector(".modal__close");
    this.counter = counter;
    this.showModal();
    this.onOverlayClick();
    this.onCloseButton();
    this.cacheCounter();
    this.reset();
  }

  showModal() {
    this.showModalButton.addEventListener("click", () => {
      this.counter++;
      this.cacheCounter();
      this.toggleModal();
      this.updateText();
      this.checkCounterIsFive();
    });
  }

  onOverlayClick() {
    this.overlay.addEventListener("click", () => {
      this.toggleModal();
    });
  }

  onCloseButton() {
    this.closeModalButton.addEventListener("click", () => {
      this.toggleModal();
    });
  }

  toggleModal() {
    this.overlay.classList.toggle("hidden");
    this.modal.classList.toggle("hidden");
  }

  cacheCounter() {
    localStorage.setItem("counter", this.counter);
  }

  updateText() {
    this.modalInfo.textContent = `You have clicked ${this.counter} times to related button`;
  }

  reset() {
    this.resetButton.addEventListener("click", () => {
      this.counter = 0;
      this.cacheCounter();
      this.updateText();
      this.checkCounterIsFive();
    });
  }

  checkCounterIsFive() {
    if (this.counter < 5) this.resetButton.classList.add("hidden");
    if (this.counter >= 5) this.resetButton.classList.remove("hidden");
  }

  createMarkup() {
    this.container.insertAdjacentHTML(
      "afterbegin",
      `
      
       <img
          class="main__image"
          alt=${this.alt}
          src=${this.imageUrl}
        /> <div class="main__description">
          <h1 class="main__description--header">${this.title}</h1>
          <p class="main__description--paragraph">
           ${this.description}
          </p>
          <button class="main__button">Button</button>
        </div>
        
      </div>
      <div class="overlay hidden"></div>
      <div class="modal hidden">
      <div class="modal__close">
            <div class="modal__close--1"></div>
            <div class="modal__close--2"></div>
        </div>
      <div class="modal__content">
        <h2 class="modal__content__alert">Alert!</h2>
        <p class="modal__content__info"></p>
      </div>
        <button class="modal__reset">Reset</button>`
    );
  }
}

new imageView(
  localStorage.getItem("counter") || 0,
  "./images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg",
  document.querySelector(".main"),
  "ocean image",
  description,
  "Lorem Ipsum"
);
