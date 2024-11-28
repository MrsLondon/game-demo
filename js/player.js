class Player {
    constructor(xPosition, yPosition) {
        // Initialize the player properties
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = 100;
        this.height = 100;
        this.health = 100;
        this.strength = 50;
        this.power = 100;
        this.direction = "left";

        // Initialize image
        this.image = new Image();
        this.image.src = './images/player-left.png'; // Default image
        this.imageLoaded = false;

        // When the image is loaded, set the flag to true
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    moveRight(canvasWidth) {
        if (this.xPosition + this.width < canvasWidth) {
            this.direction = "right";
            this.image.src = './images/player-right.png'; // Update image
            this.xPosition += 6; // Move player to the right
        }
    }

    moveLeft() {
        if (this.xPosition > 0) {
            this.direction = "left";
            this.image.src = './images/player-left.png'; // Update image
            this.xPosition -= 6; // Move player to the left
        }
    }

    // Collect item (weapon or shield)
    collect(item) {
        if (item.type === 'weapon') {
            this.power += 10; // Increase power
        } else if (item.type === 'shield') {
            this.isShieldActive = true; // Activate shield
        }
    }

    // Handle being hit by a knife or enemy
    hit(type) {
        if (type === 'knife' && !this.isShieldActive) {
            this.health -= 10; // Decrease health when hit by knife
        } else if (type === 'killer' && !this.isShieldActive) {
            this.health -= 20; // Decrease health more if hit by killer
        }

        if (this.health <= 0) {
            return true; // Game over if health is zero or below
        }
        return false;
    }

    // Update the status of the player (e.g., deactivate shield and power over time)
    update() {
        if (this.shieldDuration > 0) {
            this.shieldDuration -= 1; // Decrease shield duration
        } else {
            this.isShieldActive = false; // Deactivate shield when duration ends
        }

        if (this.weaponDuration > 0) {
            this.weaponDuration -= 1; // Decrease weapon duration
        } else {
            this.isWeaponActive = false; // Deactivate weapon when duration ends
        }
    }

    // Draw player on the canvas
    draw(ctx) {
        if (this.imageLoaded) {
            ctx.drawImage(this.image, this.xPosition, this.yPosition, this.width, this.height);
        } else {
            // Optionally, display a placeholder or message while the image loads
            ctx.fillStyle = "black";
            ctx.fillText("Loading player image...", this.xPosition, this.yPosition);
        }
    }

    // Update health bar (pass in context to draw on the canvas)
    updateHealthBar(ctx) {
        const healthBarWidth = (this.health / 100) * 168; // Health bar width based on health percentage
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(52, 35, healthBarWidth, 35); // Draw health bar
    }

    // Update power bar (pass in context to draw on the canvas)
    updatePowerBar(ctx) {
        const powerBarWidth = (this.power / 100) * 168; // Power bar width based on power percentage
        ctx.fillStyle = '#64a5d9';
        ctx.fillRect(52, 90, powerBarWidth, 35); // Draw power bar
    }
}

// Create the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create a new player
const player = new Player(canvas.width / 2 - 50, canvas.height - 120);

// Game loop to update and draw the player
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player status (e.g., shield and weapon duration)
    player.update();

    // Draw the player on the canvas
    player.draw(ctx);

    // Update health and power bars
    player.updateHealthBar(ctx);
    player.updatePowerBar(ctx);

    // Repeat the game loop
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
