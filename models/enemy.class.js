/**
 * Represents a basic enemy in the game.
 * Handles enemy movement, animation, and basic behavior patterns.
 * @class Enemy
 * @extends MovableObject
 */
class Enemy extends MovableObject {
  /** @type {number} Width of the enemy */
  width = 48;
  /** @type {number} Height of the enemy */
  height = 48;
  /** @type {number} Current image index for animation */
  currentImage = 0;
  /** @type {boolean} Whether the enemy is currently dying */
  isDying = false;
  /** @type {number} Health points of the enemy */
  hp = 1;
  /** @type {boolean} Whether the enemy can jump */
  canJump = true;
  /** @type {boolean} Whether the enemy has started moving */
  hasStartedMoving = false;
  /** @type {number[]} Array of available spawn positions */
  static availablePositions = [];

  /** @type {string[]} Walking animation images */
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  /** @type {string[]} Death animation images */
  IMAGES_DEAD = ['assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  /**
   * Creates a new enemy instance
   * Randomly positions the enemy and starts animations
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    if (Enemy.availablePositions.length === 0) {
      const maxSpawnX = 2200 - 600 - this.width;
      for (let x = 650; x <= maxSpawnX; x += 70) {
        Enemy.availablePositions.push(x);
      }
    }

    const randomIndex = Math.floor(Math.random() * Enemy.availablePositions.length);
    this.x = Enemy.availablePositions[randomIndex];
    Enemy.availablePositions.splice(randomIndex, 1);

    this.speed = 0.5 + Math.random() * 0.25;
    this.y = 390;

    this.animate();
  }

  /**
   * Handles the enemy's animation and movement
   * Starts intervals for moving and walking animations
   */
  animate() {
    this.movingInterval = setInterval(() => {
      if (!this.isDead() && this.shouldStartMoving()) {
        this.hasStartedMoving = true;
      }
      
      if (!this.isDead() && this.hasStartedMoving) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.walkingInterval = setInterval(() => {
      if (!this.isDead() && this.hasStartedMoving) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  /**
   * Determines if the enemy should start moving
   * @returns {boolean} Whether the enemy should start moving
   */
  shouldStartMoving() {
    if (this.hasStartedMoving) return true;
    
    if (this.world && this.world.character) {
      const distance = Math.abs(this.world.character.x - this.x);
      return distance < 650;
    }
    return false;
  }

  /**
   * Handles the enemy's death
   * Stops all animations and removes the enemy from the level after a delay
   */
  die() {
    this.isDying = true;
    this.currentImage = 0;

    clearInterval(this.movingInterval);
    clearInterval(this.walkingInterval);

    this.deathInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 100);

    setTimeout(() => {
      clearInterval(this.deathInterval);
      const index = this.world.level.enemies.indexOf(this);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }, 600);
  }
}
