// model

const state = {
  counter: 0,
};

const addCounterOnClick = () => {
  state.counter++;
};

// view

class imageView {
  showModalButton = document.querySelector(".main__button");
  modal = document.querySelector(".modal");
  constructor() {
    this.showModal();
  }

  showModal() {
    this.showModalButton.addEventListener("click", () => {
      this.modal.classList.toggle("hidden");
    });
  }
}

const imageViewInstance = new imageView();

// controller
