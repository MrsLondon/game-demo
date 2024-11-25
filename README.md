 ScreamGane

[Click here to see deployed game](http://github.com)

## Description

The main objective of the game is to protect yourself from killers, grab weapons 🔪 that will be thrown from the sky and use them to kill 6 assassins.

## MVP

_Implement basic controls to allow the victim to move left and right._
_Create a system that spawns weapons and shields falling from the top of the screen at regular intervals._
_Set a 10-second time limit for the player to collect these items before they disappear._
_Implement a system that allows the player to use collected weapons to "kill" killers._
_Create a weapon bar that increases as the player collects weapons, allowing them to use them for 5 seconds to eliminate killers._
_Implement a shield system that can be activated for 5 seconds after collection, protecting against attacks._
_Create a health bar that can withstand up to 6 knife damage and 3 direct damage from killers._
_Include a scoring system that tracks when a killer is eliminated._
_Set a victory condition for when the player eliminates 6 killers._
_Provide visual feedback to players about the health bar, available weapons, and shield usage._

## Backlog

_Add difficulty levels that increase the speed and number of enemies._
_Introduce new types of weapons and shields with different effects._
_Special items that grant temporary abilities._
_Add background music and sound effects for weapons and collectibles._
_End-of-game screen with statistics such as time played, number of items collected, among others._

## Data structure

Class 'Player':

_Attributes:_
_position: Current position of the player (left/right)._
_lifeBar: Amount of life remaining._
_weaponBar: Time available for using the weapon._

_Methods:_
_move(direction): Move the character left or right._
_collect(item): Collect and activate an item from the sky._
_hit(type): Reduce health based on the type of hit received._

Class 'Enemy':

_Attributes:_
_position: Current position on the screen._
_type: Type of enemy (assassin or knife)._

_Methods:_
_move(): Move the enemy towards the character._
_attack(player): Perform an attack against the player._

Class 'Item':

_Attributes:_
_position: Current position on the screen._
_type: Type of item (weapon or shield)._

_Methods:_
_fall(): Make the item fall towards the character._

Class 'Game':

_Attributes:_
_score: Player's current score._
_enemies: List of active enemies._
_items: List of current dropping items._

_Methods:_
_start(): Start the game._
_update(): Update the game state (player/enemy movement, item collection, etc.)_
_checkVictory(): Check if the player has met the victory conditions._

## States y States Transitions

_Start Screen_
_Game Screen_
_Game Over Screm_

## Task

_1. Create Basic HTML/CSS Structure: Static game interface._
_2. Implement Character Movement: Controls to move the player._
_3. Item Dropping and Collection System: Logic for items dropping and being picked up._
_4. Enemy Confrontation Logic: Implement basic enemy interactions with the player._
_5. State and Health Management: Implement health bar and updates as damage is received/dealt._
_6. Implement State Transitions: Create logic to change between states such as Menu (start scream), Game (game scream), Game Over (scream)._
_7. Final Adjustments and Testing: Refactor the code, fix bugs and optimize the game experience._