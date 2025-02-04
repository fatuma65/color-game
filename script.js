// define the colors to use in the game
const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFF5",
];

// get the dom elements we need
const colorBox = document.getElementById("colorBox");
const colorOptions = document.querySelector(".color-options");
const statusElement = document.getElementById("status");
const scoreElement = document.getElementById("score");
const newButton = document.getElementById("button");

// get the targetColor
let targetColor;
// get the user score
let score = 0;

function getRandomPosition(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j]
    arr[j] = temp;
  }
}

function startGame(resetScore = false) {
  if (resetScore) {
    score = 0;
    scoreElement.textContent = score;
  }

  let randomIndex = Math.floor(Math.random() * colors.length);
  targetColor = colors[randomIndex];

  colorBox.style.backgroundColor = "#808080";

  colorOptions.innerHTML = "";

  const colorChoices = [...colors];
  getRandomPosition(colorChoices);

  let prefferedColorsToShow = colorChoices.slice(0, 6);

  // If target color is NOT in the preferred colors, add it
  if (!prefferedColorsToShow.includes(targetColor)) {
    let randomPosition = Math.floor(
      Math.random() * prefferedColorsToShow.length
    );
    prefferedColorsToShow[randomPosition] = targetColor;
  }

  getRandomPosition(prefferedColorsToShow);

  // create buttons for each color choice
  prefferedColorsToShow.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.dataset.testid = "colorOption";
    button.addEventListener("click", () => handleGuess(color));
    colorOptions.appendChild(button);
  });

  statusElement.textContent = "Make your guess";
  statusElement.style.color = "black";
}

function handleGuess(guess) {
  // if the guess is correct, increment the score, update the status bar and the status message
  if (guess === targetColor) {
    colorBox.style.backgroundColor = targetColor;
    colorBox.classList.add("correct");
    statusElement.classList.add("correct");
    statusElement.classList.remove("wrong");
    score++;
    statusElement.textContent = "Correct! Keep playing!";
    scoreElement.textContent = score;

    // Find the clicked button and add animation
    const buttons = document.querySelectorAll(".color-options button");
    buttons.forEach((button) => {
      if (button.style.backgroundColor === guess) {
        button.classList.add("correct");
      }
    });

    setTimeout(() => {
      colorBox.classList.remove("correct");
      statusElement.classList.remove("correct");
      buttons.forEach((button) => button.classList.remove("correct"));
      startGame(false);
    }, 2000);
  } else {
    // if the guess is not correct, show the user the choice is not correct
    statusElement.classList.add("wrong");
    statusElement.classList.remove("correct");
    colorBox.classList.add("wrong");
    statusElement.textContent = "Oops, please try again";
    statusElement.style.color = "red";

    // Find the clicked button and add animation
    const buttons = document.querySelectorAll(".color-options button");
    buttons.forEach((button) => {
      if (button.style.backgroundColor === guess) {
        button.classList.add("wrong");
      }
    });

    setTimeout(() => {
      colorBox.classList.remove("wrong");
      statusElement.classList.remove("wrong");
      buttons.forEach((button) => button.classList.remove("wrong"));
      startGame(false);
    }, 1000);
  }
}

newButton.addEventListener("click", () => startGame(true));
startGame(true);
