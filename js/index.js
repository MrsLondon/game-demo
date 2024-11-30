document.addEventListener("DOMContentLoaded", () => {
    // Select the HTML elements
    const canvas = document.querySelector("#gameCanvas");
    const startScreen = document.querySelector("#start-screen");
    const gameScreen = document.querySelector("#game-screen");
    const gameOverScreen = document.querySelector("#game-over");
    const displayFinalScore = document.querySelector("#finalScore");
    const displayHighestScore = document.querySelector("#highestScore");
    const musicBtn = document.querySelector("#music-toggle");
    const startGameBtn = document.querySelector("#start-button");
    const game = new Game(
        canvas,
        startScreen,
        gameScreen,
        gameOverScreen,
        displayFinalScore,
        displayHighestScore,
        startGameBtn,
        musicBtn
      );
  
    // Keep your start button logic
    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('start-screen').style.display = 'none';
        const gameScreen = document.getElementById('game-screen');
        gameScreen.style.display = 'block';
        
        game.start();
    });

    // Create an instance of the Game class

    // Handle restarting the game
    document.querySelector("#restart-button").addEventListener("click", () => {
        game.score = 0; // Reset score
        game.player = new Player(canvas.width, canvas.height); // Create a new player instance
        game.enemies = []; // Clear enemies
        game.items = []; // Clear items
        game.isGameOver = false; // Reset game-over state
        game.start(); // Restart the game
    });

    // Display the highest score on page load (if saved in localStorage)
    const highestScore = localStorage.getItem("highestScore") || 0;
    displayHighestScore.textContent = `Highest Score: ${highestScore}`;

    // Override the game over method to save the highest score
    const originalGameOver = game.gameOver.bind(game);
    game.gameOver = function () {
        originalGameOver();
        const newHighestScore = Math.max(this.score, highestScore);
        localStorage.setItem("highestScore", newHighestScore);
        displayHighestScore.textContent = `Highest Score: ${newHighestScore}`;
    };

});




