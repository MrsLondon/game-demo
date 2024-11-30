class KillerType {
    constructor(name, leftImageSrc, rightImageSrc, width, height, health, strength) {
        this.name = name;
        this.leftImageSrc = leftImageSrc;
        this.rightImageSrc = rightImageSrc;
        this.width = width;
        this.height = height;
        this.health = health;
        this.strength = strength;
    }
}

// Instantiate types of killers (for example, a "Slasher" and a "Stalker").
const slasherType = new KillerType("Slasher", "../images/scream-left.png",120, 150, 150, 25);
const stalkerType = new KillerType("Stalker", "../images/scream-right.png", 100, 120, 100, 20);

// Store killer types in an array for random generation.
const killerTypes = [slasherType, stalkerType];

// Store killer directions in an array for random selection.
const killerDirections = ["right", "left"];

class Killer {
    constructor(canvasWidth, platformYPosition) {
        // Randomly select a killer type and direction
        let randomKillerTypeIndex = Math.floor(Math.random() * killerTypes.length);
        let killerDirectionIndex = Math.floor(Math.random() * killerDirections.length);
        let killerXPosition;
        let killerImage = new Image();

        // Set direction-based image and starting X position.
        if(killerDirections[killerDirectionIndex] === 'right') {
            killerImage.src = killerTypes[randomKillerTypeIndex].rightImageSrc;
            killerXPosition = -400;  // Start off-screen to the left
        } else {
            killerImage.src = killerTypes[randomKillerTypeIndex].leftImageSrc;
            killerXPosition = canvasWidth + 400;  // Start off-screen to the right
        }

        // Killer object properties
        this.image = killerImage;
        this.xPosition = killerXPosition;
        this.yPosition = platformYPosition - killerTypes[randomKillerTypeIndex].height;
        this.width = killerTypes[randomKillerTypeIndex].width;
        this.height = killerTypes[randomKillerTypeIndex].height;
        this.type = killerTypes[randomKillerTypeIndex];
        this.direction = killerDirections[killerDirectionIndex];
        this.health = killerTypes[randomKillerTypeIndex].health;
        this.strength = killerTypes[randomKillerTypeIndex].strength;
        this.readyToAttack = true;
    }

    // Draw killer image on canvas
    draw() {
        ctx.drawImage(this.image, this.xPosition, this.yPosition, this.width, this.height);
    }

    // Draw health bar above the killer
    drawHealthBar() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.xPosition + 10, this.yPosition - 15, this.health, 8);
    }

    // Move the killer in the set direction
    move() {
        this.moveIntervalId = setInterval(() => {
            if (this.direction === "right") {
                this.xPosition += 0.5; // Move to the right
            } else {
                this.xPosition -= 0.5; // Move to the left
            }
        }, 1);
    }

    // Change direction based on player's position
    changeDirection(playerXPosition, playerWidth) {
        if (this.xPosition > playerXPosition + playerWidth) {
            this.direction = "left";
            this.image.src = this.type.leftImageSrc;
        } else if (this.xPosition < playerXPosition) {
            this.direction = "right";
            this.image.src = this.type.rightImageSrc;
        }
    }

    // Toggle the ability of the killer to attack
    toggleReadyToAttack() {
        return this.readyToAttack = !this.readyToAttack;
    }

    // Reduce the killer's health when it takes damage
    receiveAttack(strength) {
        return this.health -= strength;
    }

    // Attack the player (with the killer's strength)
    attack(player) {
        if (this.readyToAttack) {
            player.receiveDamage(this.strength);
            this.toggleReadyToAttack();
        }
    }
}
