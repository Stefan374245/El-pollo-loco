/**
 * Represents a collectible bottle object in the game.
 * Bottles can be picked up by the character and used as throwable objects.
 * @class Bottle
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /** @type {string[]} Array of image paths for bottle animation */
  IMAGE_BOTTLE = [
    'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  /** @type {number} Y-coordinate position of the bottle */
  y = 396;
  /** @type {number} Width of the bottle */
  width = 40;
  /** @type {number} Height of the bottle */
  height = 40;
  /** @type {number} Current image index for animation */
  currentImage = 0;

  /**
   * Creates a new bottle instance
   * Sets random position and starts animation
   */
  constructor() {
    super();
    this.x = 300 + Math.random() * 1500;
    this.loadImage(this.IMAGE_BOTTLE[this.currentImage]); 
    this.loadImages(this.IMAGE_BOTTLE);
    this.animate();
  }

  /**
   * Starts the bottle animation cycle
   * Alternates between bottle images every 300ms
   */
  animate() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.IMAGE_BOTTLE.length;
      this.img = this.availableImages[this.IMAGE_BOTTLE[this.currentImage]];
    }, 300);
  }
}