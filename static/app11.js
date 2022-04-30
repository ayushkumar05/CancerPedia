window.addEventListener("resize", function () {
  addRequiredClass();
});

function addRequiredClass() {
  if (window.innerWidth < 860) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
}

window.onload = addRequiredClass;

let hamburger = document.querySelector(".hamburger");
let mobileNav = document.querySelector(".nav-list");

let bars = document.querySelectorAll(".hamburger span");

let isActive = false;

hamburger.addEventListener("click", function () {
  mobileNav.classList.toggle("open");
  if (!isActive) {
    bars[0].style.transform = "rotate(45deg)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(-45deg)";
    isActive = true;
  } else {
    bars[0].style.transform = "rotate(0deg)";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "rotate(0deg)";
    isActive = false;
  }
});

// CHATBOX

class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => this.toggleState(chatBox));

    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;

    // show or hides the box
    if (this.state) {
      chatbox.classList.add("chatbox--active");
    } else {
      chatbox.classList.remove("chatbox--active");
    }
  }

  onSendButton(chatbox) {
    var textField = chatbox.querySelector("input");
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "Sam", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item, index) {
        if (item.name === "Sam") {
          html +=
            '<div class="messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}

const chatbox = new Chatbox();
chatbox.display();
// CHATBOX Ends

// MODAL MODEL
const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const modal3 = document.querySelector(".modal3");
const overlay = document.querySelector(".overlay");
const btnCloseModal1 = document.querySelector(".close-modal1");
const btnCloseModal2 = document.querySelector(".close-modal2");
const btnCloseModal3 = document.querySelector(".close-modal3");
const btnOpenModal1 = document.querySelectorAll(".show-modal1");
const btnOpenModal2 = document.querySelectorAll(".show-modal2");
const btnOpenModal3 = document.querySelectorAll(".show-modal3");
console.log(btnOpenModal1);
console.log(btnOpenModal2);
console.log(btnOpenModal3);

const openModal1 = function () {
  modal1.classList.remove("hidden");
  //   overlay.classList.remove("hidden");
};
const openModal2 = function () {
  modal2.classList.remove("hidden");
  //   overlay.classList.remove("hidden");
};
const openModal3 = function () {
  modal3.classList.remove("hidden");
  //   overlay.classList.remove("hidden");
};

const closeModal1 = function () {
  modal1.classList.add("hidden");
  overlay.classList.add("hidden");
};
const closeModal2 = function () {
  modal2.classList.add("hidden");
  overlay.classList.add("hidden");
};
const closeModal3 = function () {
  modal3.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnOpenModal1.length; i++)
  btnOpenModal1[i].addEventListener("click", openModal1);
for (let i = 0; i < btnOpenModal2.length; i++)
  btnOpenModal2[i].addEventListener("click", openModal2);
for (let i = 0; i < btnOpenModal3.length; i++)
  btnOpenModal3[i].addEventListener("click", openModal3);

btnCloseModal1.addEventListener("click", closeModal1);
btnCloseModal2.addEventListener("click", closeModal2);
btnCloseModal3.addEventListener("click", closeModal3);

// overlay.addEventListener("click", closeModal);
