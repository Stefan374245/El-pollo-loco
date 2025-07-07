
/**
 * Represents a background object in the game world.
 * Background objects are static elements that create the visual environment.
 * @class BackgroundObject
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /** @type {number} Width of the background object */
  width = 720;
  
  /** @type {number} Height of the background object */
  height = 480;

  /**
   * Creates a new background object
   * @param {string} imagePath - Path to the image file for this background object
   * @param {number} x - X-coordinate position of the background object
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y =  480 - this.height;
  }
}
