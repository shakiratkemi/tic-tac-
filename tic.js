const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

const gameContainer = document.querySelector(".game-container");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameActive = true;
const winnerElement = document.querySelector(".winner");

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    updateBoard();
    switchPlayer();
    checkForWin();
    return;
  }
}

function updateBoard() {
  cells.forEach((cell, index) => {
    if (gameBoard[index] !== "") {
      cell.textContent = gameBoard[index];
    }
  });
}

function checkForWin() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      showWinner(gameBoard[a]);
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function showWinner(winner) {
  if (winner === "X" || winner === "O") {
    winnerElement.textContent = `Player ${winner} has won!`;
  } else if (winner === "") {
    winnerElement.textContent = "It's a draw!";
  } else {
    winnerElement.textContent = "None wins";
  }
}

function resetBoard() {
  console.log("game restart");
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  updateBoard();
  currentPlayer = "X";
  gameActive = true;
  console.log("reset");
}

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetBoard);
