document.addEventListener("DOMContentLoaded", () => {
    // Select the HTML elements
    const canvas = document.querySelector("#gameCanvas");
    const startScreen = document.querySelector("#start-screen");
    const gameScreen = document.querySelector("#game-screen");
    const gameOverScreen = document.querySelector("#game-over");
    const displayFinalScore = document.querySelector("#finalScore");
    const displayHighestScore = document.querySelector("#highestScore");
    const startGameBtn = document.querySelector("#start-button"); // Corrected ID
    const musicBtn = document.querySelector("#music-toggle"); // Corrected ID
  
    // Create an instance of the Game class
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

    // Event listener for the Start Game button
    startGameBtn.addEventListener("click", () => {
      game.start();
    });
  
    // Event listener for the Music toggle button
    musicBtn.addEventListener("click", () => {
      if (game.themeAudio.paused) {
        game.themeAudio.play();
        musicBtn.innerText = "Mute Music";
      } else {
        game.themeAudio.pause();
        musicBtn.innerText = "Play Music";
      }
    });
  
    // Handle restarting the game
    document.querySelector("#restart-button").addEventListener("click", () => { // Corrected ID
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

    window.onload = () => {
        // Display only splash screen
        startGameScreen.style.display = "flex";
        mainGameScreen.style.display = "none";
        gameOverScreen.style.display = "none";
        canvas.style.display = "none";
    
        // Play start screen music on button click
        musicBtn.addEventListener('click', playSoundOnStartScreen);
    
        // When start game btn click, hide splash screen and go to main game screen
        startGameBtn.forEach(item => {
            item.addEventListener('click', event => {
                resetGame();
                updateGame();
            });
        });
    };
    
});
