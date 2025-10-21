const cells = document.querySelectorAll('.cell');
const Message = document.getElementById('message'); // changed to match your references
const restartBtn = document.getElementById('reset');

// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let GameOver = false;

// event listeners for each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

// event listener for reset button
restartBtn.addEventListener('click', resetGame);

startGame();

// Sets up a new game state
function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    GameOver = false;
    cells.forEach(cell => (cell.textContent = ''));
    Message.textContent = `Player ${currentPlayer}'s turn`;
}

// Handles logic when a cell is clicked
function handleCellClick(cell, index) {
    
    // Ignore click if cell is filled or game is over
    if (board[index] || GameOver) return;

    // Update board state
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    // Check for win
    if (checkWin()) {
        // Ignore click if cell already filled or game is over
        Message.textContent = `Player ${currentPlayer} wins!`;
        GameOver = true;
        return;
    }

    // Check for draw
    if (board.every(cell => cell !== '')) {
        Message.textContent = "It's a draw!";
        GameOver = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    Message.textContent = `Player ${currentPlayer}'s turn`;
}

// Determines if the current player has a winning combination
function checkWin() {
    const winConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal from top left
        [2, 4, 6]  // diagonal from top right
    ];

    // Check if any win condition is met
    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

// Resets the game to initial state
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    GameOver = false;

    cells.forEach(cell => (cell.textContent = ''));
    Message.textContent = `Player ${currentPlayer}'s turn`;
}
