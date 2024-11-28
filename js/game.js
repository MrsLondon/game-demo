class Game {
    constructor(canvas, startScreen, gameScreen, gameOverScreen, displayFinalScore, displayHighestScore, startGameBtn, musicBtn) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startScreen = startScreen;
        this.gameScreen = gameScreen;
        this.gameOverScreen = gameOverScreen;
        this.displayFinalScore = displayFinalScore;
        this.displayHighestScore = displayHighestScore;
        this.startGameBtn = startGameBtn;
        this.musicBtn = musicBtn;

        // Game variables
        this.score = 0;
        this.player = new Player(canvas.width, canvas.height);
        this.enemies = [];
        this.items = [];
        this.isGameOver = false;

        // Audio for background music
        this.themeAudio = new Audio('assets/music/theme.mp3');

        // Bind event listeners
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.startGameBtn.addEventListener('click', () => this.start());
    }

    

    // Start the game
    start() {
        this.isGameOver = false;
        this.score = 0;
        this.enemies = [];
        this.items = [];

        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameOverScreen.style.display = 'none';

        // Start music (ensure autoplay restrictions are respected)
        this.themeAudio.currentTime = 0;
        this.themeAudio.play().catch((err) => console.warn("Audio autoplay prevented:", err));

        this.gameLoop();
    }

    // Handle keyboard inputs for player movement
    handleKeyPress(e) {
        if (e.key === 'ArrowLeft') {
            this.player.move('left');
        } else if (e.key === 'ArrowRight') {
            this.player.move('right');
        }
    }

    // Update game state
    update() {
        this.player.update(); // Update player status (e.g., deactivate shield if active)

        // Generate enemies and items at random intervals
        if (Math.random() < 0.02) this.enemies.push(new Enemy('killer', this.canvas.width));
        if (Math.random() < 0.02) this.enemies.push(new Enemy('knife', this.canvas.width));
        if (Math.random() < 0.03) this.items.push(new Item('weapon', this.canvas.width));
        if (Math.random() < 0.03) this.items.push(new Item('shield', this.canvas.width));

        // Move enemies and check for player damage
        this.enemies.forEach((enemy, index) => {
            enemy.move();

            // Check for collision with player
            if (enemy.collidesWith(this.player)) {
                enemy.attack(this.player);

                // Remove enemy if it's a knife after hitting the player
                if (enemy.type === 'knife') this.enemies.splice(index, 1);
            }
        });

        // Move items and check for player collection
        this.items.forEach((item, index) => {
            item.fall();

            // Check if player collects the item
            if (item.collidesWith(this.player)) {
                this.player.collect(item);
                this.items.splice(index, 1); // Remove collected item
            }
        });

        // End game if player's life bar reaches zero
        if (this.player.lifeBar <= 0) {
            this.gameOver();
        }
    }

    // Draw game elements
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
        this.player.draw(this.ctx);

        // Draw enemies
        this.enemies.forEach((enemy) => enemy.draw(this.ctx));

        // Draw items
        this.items.forEach((item) => item.draw(this.ctx));
    }

    // Main game loop
    gameLoop() {
        if (this.isGameOver) return;

        this.update(); // Update game state
        this.draw(); // Draw elements

        requestAnimationFrame(() => this.gameLoop()); // Repeat the loop
    }

    // End the game
    gameOver() {
        this.isGameOver = true;

        // Stop music
        this.themeAudio.pause();

        // Show game over screen
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'block';

        // Display final score and save the highest score
        this.displayFinalScore.innerText = `Final Score: ${this.score}`;
        const highestScore = Math.max(this.score, localStorage.getItem('highestScore') || 0);
        localStorage.setItem('highestScore', highestScore);
        this.displayHighestScore.innerText = `Highest Score: ${highestScore}`;
    }
}
const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
