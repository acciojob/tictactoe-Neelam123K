const startButton = document.getElementById('start-game');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const gameBoard = document.getElementById('game-board');
const playerForm = document.getElementById('player-form');
const messageDisplay = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let currentPlayer = '';
let player1 = '';
let player2 = '';
let moves = 0;

// Start the game
startButton.addEventListener('click', () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    playerForm.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    currentPlayer = player1;
    messageDisplay.textContent = `${currentPlayer}, you're up!`;
  } else {
    alert('Please enter names for both players.');
  }
});

// Game logic for handling cell clicks
cells.forEach(cell => {
  cell.addEventListener('click', function () {
    if (!this.textContent && !messageDisplay.textContent.includes('won')) {
      this.textContent = currentPlayer === player1 ? 'X' : 'O';
      moves++;

      if (checkWin()) {
        messageDisplay.textContent = `${currentPlayer} congratulations, you won!`;
      } else if (moves === 9) {
        messageDisplay.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        messageDisplay.textContent = `${currentPlayer}, you're up!`;
      }
    }
  });
});

// Check win function
function checkWin() {
  const winningCombinations = [
    ['cell-1', 'cell-2', 'cell-3'],
    ['cell-4', 'cell-5', 'cell-6'],
    ['cell-7', 'cell-8', 'cell-9'],
    ['cell-1', 'cell-4', 'cell-7'],
    ['cell-2', 'cell-5', 'cell-8'],
    ['cell-3', 'cell-6', 'cell-9'],
    ['cell-1', 'cell-5', 'cell-9'],
    ['cell-3', 'cell-5', 'cell-7']
  ];

  return winningCombinations.some(combination => {
    return combination.every(cellId => {
      return document.getElementById(cellId).textContent === (currentPlayer === player1 ? 'X' : 'O');
    });
  });
}