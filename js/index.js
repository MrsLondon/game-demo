// Select HTML elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('main-game-container');
const gameOverScreen = document.getElementById('game-over-container');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highscore');

// Show Game Screen when Start button is clicked
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Hide start screen
    gameScreen.style.display = 'block'; // Show the game screen
    startGame(); // Call your game-start function
});

// Show Start Screen when Restart button is clicked
restartButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none'; // Hide the game over screen
    startScreen.style.display = 'block'; // Show the start screen again
    resetGame(); // Call your reset game function (reset score, etc.)
});

// Function to show Game Over Screen
function showGameOver(score) {
    gameScreen.style.display = 'none'; // Hide the game screen
    gameOverScreen.style.display = 'block'; // Show the game over screen
    scoreElement.textContent = score; // Update the score in the game over screen
    // Optionally, update high score here if needed
    // highScoreElement.textContent = getHighScore(); 
}

// Example function to start the game
function startGame() {
    // Initialize game state: reset player position, enemies, score, etc.
    console.log("Game Started");
    // Start game loop here (e.g., using requestAnimationFrame or setInterval)
}

// Example function to reset the game
function resetGame() {
    // Reset the game state: reset score, player position, etc.
    console.log("Game Reset");
    scoreElement.textContent = '000000'; // Reset score
    // Reset any other game states or variables
}

// Example of calling showGameOver at some point in your game (for demo)
// You can replace this with actual game over detection logic
// showGameOver(100); // Call this function when the game ends with the final score
