//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);

let player1, player2;
let currentPlayer;
let board = Array(9).fill(null);

function startGame() {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";
  currentPlayer = player1;

  document.getElementById("input-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  updateMessage(`${currentPlayer}, you're up!`);

  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", handleCellClick);
    cell.textContent = "";
  });
}

function handleCellClick(e) {
  const cellIndex = e.target.id - 1;

  if (board[cellIndex] || checkWinner()) return;

  board[cellIndex] = currentPlayer === player1 ? "X" : "O";
  e.target.textContent = board[cellIndex];

  if (checkWinner()) {
    updateMessage(`${currentPlayer}, congratulations you won!`);
    endGame();
  } else if (board.every(cell => cell !== null)) {
    updateMessage("It's a draw!");
  } else {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage(`${currentPlayer}, you're up!`);
  }
}

function updateMessage(message) {
  document.querySelector(".message").textContent = message;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function endGame() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.removeEventListener("click", handleCellClick);
  });
}
