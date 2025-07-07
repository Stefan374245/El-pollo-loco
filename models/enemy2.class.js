/**
 * Represents a smaller variant of the basic enemy.
 * Inherits from Enemy but uses different sprites.
 * @class Enemy2
 * @extends Enemy
 */
class Enemy2 extends Enemy {

  /** @type {string[]} Walking animation images for small chicken */
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  /** @type {string[]} Death animation images for small chicken */
  IMAGES_DEAD = [
    'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
  ];

  /**
   * Creates a new Enemy2 instance
   * Loads specific images for small chicken variant
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    
    this.hp = 1;
    this.hasStartedMoving = false;
  }

  /**
   * Handles the enemy's animation and movement
   * Inherited behavior from parent class
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
}