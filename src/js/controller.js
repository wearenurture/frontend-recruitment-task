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
  constructor() {
    this.showModal();
  }

  showModal() {
    this.showModalButton.addEventListener("click", () => {
      console.log("Hey");
    });
  }
}

const imageViewInstance = new imageView();

// controller
