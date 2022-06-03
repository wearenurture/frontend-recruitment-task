// model

// view

class imageView {
  showModalButton = document.querySelector(".main__button");
  modal = document.querySelector(".modal");
  overlay = document.querySelector(".overlay");
  modalInfo = document.querySelector(".modal__info");
  resetButton = document.querySelector(".modal__reset");
  counter;
  constructor(counter) {
    this.counter = counter;
    this.showModal();
    this.hideModal();
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

  hideModal() {
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
}

new imageView(localStorage.getItem("counter") || 0);
