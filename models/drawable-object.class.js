/**
 * Base class for all drawable objects in the game.
 * Provides basic drawing functionality and image loading capabilities.
 * @class DrawableObject
 */
class DrawableObject {
  /** @type {number} X-coordinate position */
  x = 40;
  /** @type {number} Y-coordinate position */
  y = 280;
  /** @type {number} Height of the object */
  height = 100;
  /** @type {number} Width of the object */
  width = 100;
  /** @type {Image} Current image to display */
  img;
  /** @type {Object} Collection of loaded images */
  availableImages = {};
  /** @type {number} Current animation frame index */
  currentImage = 0;

  /**
   * Loads a single image from the given path
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images for animation
   * @param {string[]} imageArray - Array of image paths to be loaded
   */
  loadImages(imageArray) {
    imageArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.availableImages[path] = img;
    });
  }

  /**
   * Draws the object on the canvas
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws collision frame around the object (currently disabled)
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   * @param {number} [offsetX=0] - X offset for the frame
   * @param {number} [offsetY=0] - Y offset for the frame
   */
  drawFrame(ctx, offsetX = 0, offsetY = 0) {
    // Frames are now invisible - all drawing operations commented out
    /*
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "green";
      ctx.rect(
        this.x + offsetX,
        this.y + offsetY,
        this.width - offsetX * 2,
        this.height - offsetY * 2
      );
      ctx.stroke();
    } else if (this instanceof Enemy) {
   
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + offsetX,
        this.y + offsetY,
        this.width - offsetX * 2,
        this.height - offsetY * 2
      );
      ctx.stroke();


      if (this instanceof Endboss) {
        this.drawInnerFrame(ctx, offsetX * 2, offsetY * 2);
      }
    }
    */
  }
}
