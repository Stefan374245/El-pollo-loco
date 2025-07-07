/**
 * Represents a collectible coin object in the game.
 * Coins provide points when collected by the character.
 * @class Coins
 * @extends MovableObject
 */
class Coins extends MovableObject {
  /** @type {string[]} Animation images for coin rotation */
  IMAGES_ROTATING = ['assets/img/8_coin/coin_1.png', 'assets/img/8_coin/coin_2.png'];

  /** @type {number} Width of the coin */
  width = 72;
  /** @type {number} Height of the coin */
  height = 72;

  /**
   * Creates a new coin instance
   * @param {number} x - X-coordinate position of the coin
   * @param {number} y - Y-coordinate position of the coin
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.IMAGES_ROTATING[0]);  
    this.loadImages(this.IMAGES_ROTATING);
    this.animate();
  }

  /**
   * Starts the coin rotation animation
   * Alternates between coin images every 200ms
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATING);
    }, 200);
  }
}
