/**
 * Represents a throwable bottle object in the game.
 * Handles bottle physics, rotation animation, and collision with ground and enemies.
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /** @type {string[]} Array of bottle rotation animation images */
  IMAGE_BOTTLE_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  /** @type {string[]} Array of bottle splash animation images */
  IMAGE_BOTTLE_SPLASH = [
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  /** @type {boolean} Whether the bottle has hit the ground */
  hasHitGround = false;

  /**
   * Creates a new throwable bottle instance
   * @param {number} x - X-coordinate starting position
   * @param {number} y - Y-coordinate starting position
   * @param {boolean} [otherDirection=false] - Whether to throw in opposite direction
   */
  constructor(x, y, otherDirection = false) {
    super();
    this.loadImages(this.IMAGE_BOTTLE_ROTATION);
    this.loadImages(this.IMAGE_BOTTLE_SPLASH);
    this.img = this.availableImages[this.IMAGE_BOTTLE_ROTATION[0]];

    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.otherDirection = otherDirection;

    this.throw();
  }

  /**
   * Initiates the throwing mechanics
   * Sets initial velocity, applies gravity, and starts animations
   */
  throw() {
    this.speedY = -30;
    this.applyGravity();
    this.startRotation();
    this.bottleHitGround();

    this.moveInterval = setInterval(() => {
      if (!this.hasHitGround) {
        this.x += this.otherDirection ? -8 : 8;
      }
    }, 25);
  }

  /**
   * Starts the bottle rotation animation while airborne
   */
  startRotation() {
    this.rotationInterval = setInterval(() => {
      if (!this.hasHitGround) {
        this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
      }
    }, 50);
  }

  /**
   * Monitors for ground collision
   */
  bottleHitGround() {
    this.groundCheck = setInterval(() => {
      if (this.y >= 396 && !this.hasHitGround) {
        this.hitGround();
        clearInterval(this.groundCheck);
      }
    }, 25);
  }

  /**
   * Handles bottle collision with ground
   * Plays splash animation and removes bottle after delay
   */
  hitGround() {
    this.hasHitGround = true;
    this.speedY = 0;
    this.y = 396;

    clearInterval(this.moveInterval);
    clearInterval(this.rotationInterval);

    this.playAnimation(this.IMAGE_BOTTLE_SPLASH);

    if (audioManager && audioManager.play) {
      audioManager.play('smashBottle');
    }
    setTimeout(() => {
      if (this.world) {
        const index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
          this.world.throwableObjects.splice(index, 1);
        }
      }
    }, 600);
  }
  
  /**
   * Checks collision with another object using inner collision detection
   * @param {MovableObject} mo - The object to check collision with
   * @param {number} [offsetX=0] - X offset for collision box
   * @param {number} [offsetY=0] - Y offset for collision box
   * @returns {boolean} True if objects are colliding
   */
  isCollidingInner(mo, offsetX = 0, offsetY = 0) {
    return (
      this.x + this.width - offsetX > mo.x + offsetX &&
      this.y + this.height - offsetY > mo.y + offsetY &&
      this.x + offsetX < mo.x + mo.width - offsetX &&
      this.y + offsetY < mo.y + mo.height - offsetY
    );
  }
}
