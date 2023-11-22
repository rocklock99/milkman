// function that returns a producer object
function createProducer(name, price, bottlesPerProducer) {
  const producer = {
    name: name,
    price: price,
    quantity: 0,
    bottlesPerProducer: bottlesPerProducer,
    isHidden: true,
  };
  return producer;
}

// function renders producerArray's object values to the display
function render() {
  const milkQty = document.querySelector("#milk-quantity");
  milkQty.textContent = `${milkBottles}`;
  const sellMilk = document.querySelector("#milk-price");
  sellMilk.textContent = `${(milkBottles * milkPrice).toFixed(2)}`;
  const moneyQty = document.querySelector("#money-quantity");
  moneyQty.textContent = `${money.toFixed(2)}`;
  for (let producer of producerArray) {
    const producerQty = document.querySelector(`#${producer.name}-quantity`);
    producerQty.textContent = producer.quantity;
    const producerRate = document.querySelector(`#${producer.name}-rate`);
    producerRate.textContent = producer.quantity * producer.bottlesPerProducer;
    let buttonToReveal = document.querySelector(`#${producer.name}-button`);
    let producerContainer = document.querySelector(
      `#${producer.name}-container`
    );
    if (producer.isHidden === false) {
      buttonToReveal.classList.remove("hidden");
    } else {
      buttonToReveal.classList.add("hidden");
    }
    if (producer.quantity >= 1) {
      producerContainer.classList.remove("hidden");
    }
  }
}

// function that calculates total milk bottles after each second
function calculateNewMilkBottles() {
  let bottlesPerSecond = 0;
  for (let producer of producerArray) {
    bottlesPerSecond += producer.quantity * producer.bottlesPerProducer;
  }
  milkBottles += bottlesPerSecond;
  render();
}

// function that checks isHidden properties to see if there's enough money to reveal
function checkIfButtonsRevealed() {
  for (let producer of producerArray) {
    if (money >= producer.price) {
      producer.isHidden = false;
      render();
    } else {
      producer.isHidden = true;
      render();
    }
  }
}

// add event listener to the cow button
const cowButtonContainer = document.querySelector("#main-cow-button-container");
cowButtonContainer.addEventListener("click", function () {
  milkBottles += 1;
  render();
});

// add event listener to the sell milk button
const sellMilk = document.querySelector("#sell-milk-button");
sellMilk.addEventListener("click", function () {
  money += milkBottles * milkPrice;
  milkBottles = 0;
  render();
});

// add event listener to hire worker button
const workerButton = document.querySelector("#worker-button");
workerButton.addEventListener("click", function () {
  producerArray[0].quantity += 1;
  money -= producerArray[0].price;
  render();
});

// add event listener to buy cow button
const cowButton = document.querySelector("#cow-button");
cowButton.addEventListener("click", function () {
  producerArray[1].quantity += 1;
  money -= producerArray[1].price;
  render();
});

// add event listener to hire veterinarian button
const vetButton = document.querySelector("#vet-button");
vetButton.addEventListener("click", function () {
  producerArray[2].quantity += 1;
  money -= producerArray[2].price;
  render();
});

// add event listener to hire distributor button
const distButton = document.querySelector("#dist-button");
distButton.addEventListener("click", function () {
  producerArray[3].quantity += 1;
  money -= producerArray[3].price;
  render();
});

// add event listener to hire lobbyist button
const lobbyButton = document.querySelector("#lobby-button");
lobbyButton.addEventListener("click", function () {
  producerArray[4].quantity += 1;
  money -= producerArray[4].price;
  render();
});

// add event listener to buy politician button
const polButton = document.querySelector("#pol-button");
polButton.addEventListener("click", function () {
  producerArray[5].quantity += 1;
  money -= producerArray[5].price;
  render();
});

// global variable that tracks money on hand, starts at 0
let money = 0;

// global variable that tracks milk bottle inventory, starts at 0
let milkBottles = 0;

// global variable that controls price per milk bottle
let milkPrice = 0.5;

// global array that contains all the producers
const producerArray = [];

// create producer objects and push them to producerArray
producerArray.push(createProducer("worker", 25, 5));
producerArray.push(createProducer("cow", 40, 12));
producerArray.push(createProducer("vet", 150, 50));
producerArray.push(createProducer("dist", 500, 100));
producerArray.push(createProducer("lobby", 1000, 200));
producerArray.push(createProducer("pol", 3000, 500));

// initially render the display
render();

// every one second milkBottles gets recalculated and rendered
let gameInterval = setInterval(function () {
  calculateNewMilkBottles();
  checkIfButtonsRevealed();
}, 1000);
