//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);

let player1, player2;
let currentPlayer;
let player1Symbol = "X";
let player2Symbol = "O";
let board = Array(9).fill(null);

function startGame() {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";
  currentPlayer = player1;

  document.getElementById("input-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  document.getElementById("reset").style.display = "block";
  updateMessage(`${currentPlayer} (${getSymbol(currentPlayer)}), it's your turn!`);

  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.textContent = "";
    cell.className = "cell"; // Reset cell styling
    cell.addEventListener("click", () => handleCellClick(cell, index));
  });
}

function handleCellClick(cell, index) {
  if (board[index] || checkWinner()) return;

  board[index] = getSymbol(currentPlayer);
  cell.textContent = board[index];

  if (checkWinner()) {
    const winner = currentPlayer;
    updateMessage(`${winner} wins!`);
    highlightWinningCells();
    endGame();
  } else if (board.every(cell => cell !== null)) {
    updateMessage("It's a draw!");
  } else {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage(`${currentPlayer} (${getSymbol(currentPlayer)}), it's your turn!`);
  }
}

function updateMessage(message) {
  document.querySelector(".message").textContent = message;
}

function getSymbol(player) {
  return player === player1 ? player1Symbol : player2Symbol;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  return null;
}

function highlightWinningCells() {
  const winningCombination = checkWinner();
  if (winningCombination) {
    winningCombination.forEach(index => {
      document.querySelectorAll(".cell")[index].classList.add("winner");
    });
  }
}

function endGame() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.removeEventListener("click", handleCellClick);
  });
}

document.getElementById("reset").addEventListener("click", resetGame);

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = player1;
  document.getElementById("input-section").style.display = "block";
  document.getElementById("game-section").style.display = "none";
  document.getElementById("reset").style.display = "none";
  updateMessage("");
}
