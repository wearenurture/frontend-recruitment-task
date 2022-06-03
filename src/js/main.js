// model

// view

class imageView {
  main = document.querySelector(".main");
  showModalButton;
  modal;
  overlay;
  counter;
  modalInfo;
  resetButton;
  imageUrl;
  constructor(counter, imageUrl) {
    this.imageUrl = imageUrl;
    this.createMarkup();

    this.showModalButton = document.querySelector(".main__button");
    this.modal = document.querySelector(".modal");
    this.overlay = document.querySelector(".overlay");
    this.modalInfo = document.querySelector(".modal__info");
    this.resetButton = document.querySelector(".modal__reset");

    this.counter = counter;
    this.showModal();
    this.onOverlayClick();
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
    this.main.insertAdjacentHTML(
      "afterbegin",

      `
       <img
          class="main__image"
          alt="ocean image"
          src=${this.imageUrl}
        /> <div class="main__description">
          <h1 class="main__description--header">Lorem Ipsum</h1>
          <p class="main__description--paragraph">
            Infinitely scalable, feature-rich and cloud-native data management
            and protection for modern and legacy infrastructures and SaaS
            platforms, managed via a single app with no hardware required.
          </p>
        </div>
        <button class="main__button">Button</button>
      </div>
      <div class="overlay hidden"></div>

      <div class="modal hidden">
        <h2 class="modal__alert">Alert!</h2>
        <div class="modal__box">
          <div class="modal__vector">
            <div class="modal__vector--1"></div>
            <div class="modal__vector--2"></div>
          </div>
        </div>

        <p class="modal__info"></p>

        <button class="modal__reset">Reset</button>`
    );
  }
}

new imageView(
  localStorage.getItem("counter") || 0,
  "./images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg"
);
