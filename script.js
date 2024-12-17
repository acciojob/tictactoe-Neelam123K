//your JS code here. If required.
function handleCellClick(cell, index) {
  if (board[index] || checkWinner()) return;

  board[index] = getSymbol(currentPlayer);
  cell.textContent = board[index];

  if (checkWinner()) {
    updateMessage(`${currentPlayer} wins!`);
    highlightWinningCells();
    endGame();
  } else if (board.every(cell => cell !== null)) {
    updateMessage("It's a draw!");
    endGame();
  } else {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage(`${currentPlayer}'s turn`);
  }
}
