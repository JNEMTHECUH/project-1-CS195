const cells = document.querySelectorAll('.cell');
const Message = document.getElementById('message'); // changed to match your references
const restartBtn = document.getElementById('reset');
const modeBtn = document.getElementById('mode');

// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let GameOver = false;
let vsComputer = false;

// event listeners for each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

// event listener for reset button
restartBtn.addEventListener('click', resetGame);
modeBtn.addEventListener('click', toggleMode);

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

    // Debugging logs
    console.log(`Player ${currentPlayer} clicked cell ${index}`);
    console.log('Current board:', board);

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

    if (vsComputer && currentPlayer === 'O' && !GameOver) {
        setTimeout(computerMove, 500); // slight delay for realism
    }
    // Debugging log for next turn
    console.log(`Next turn: Player ${currentPlayer}`);
}


function computerMove() {
    // Find all empty cells
    const emptyCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter(cell => cell !== null);

    if (emptyCells.length === 0) return; // no moves left

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    // Debugging logs
    console.log(`Computer placed O in cell ${randomIndex}`);
    console.log('Current board:', board);

    // Check for win
    if (checkWin("O")) {
        Message.textContent = `Computer (O) wins!`;
        GameOver = true;
        return;
    }
    // Check for draw
    if (board.every(cell => cell !== '')) {
        Message.textContent = "It's a draw!";
        GameOver = true;
        return;
    }
    // Switch back to player
    currentPlayer = 'X';
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

    // Debugging log for reset
    console.log('Game reset. Player X starts.');
}

function toggleMode() {
    vsComputer = !vsComputer;
    modeBtn.textContent = `Play vs Computer: ${vsComputer ? 'ON' : 'OFF'}`;
    resetGame();
}