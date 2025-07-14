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

/**
 * Represents a text overlay for displaying messages on screen
 * @class TextOverlay
 * @extends DrawableObject
 */
class TextOverlay extends DrawableObject {
  /** @type {string} The text to display */
  text = "";
  /** @type {string} Font style for the text */
  font = "bold 64px 'Fredericka the Great'";
  /** @type {string} Text color */
  color = "#FFD700";
  /** @type {string} Stroke color */
  strokeColor = "#000000";
  /** @type {number} Stroke width */
  strokeWidth = 4;
  /** @type {boolean} Whether the overlay is visible */
  visible = false;
  /** @type {number} Opacity for fade effects */
  opacity = 1;

  /**
   * Creates a new text overlay
   * @param {string} text - The text to display
   * @param {number} x - X position (default: center)
   * @param {number} y - Y position (default: center)
   */
  constructor(text, x = 360, y = 240) {
    super();
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
  }

  /**
   * Draws the text overlay on the canvas
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  draw(ctx) {
    if (!this.visible) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeText(this.text, this.x, this.y);

    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);

    ctx.restore();
  }

  /**
   * Shows the text overlay
   */
  show() {
    this.visible = true;
    this.opacity = 1;
  }

  /**
   * Hides the text overlay
   */
  hide() {
    this.visible = false;
  }

  /**
   * Sets the text content
   * @param {string} text - The new text to display
   */
  setText(text) {
    this.text = text;
  }

  /**
   * Sets the position of the text
   * @param {number} x - X position
   * @param {number} y - Y position
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the opacity of the text
   * @param {number} opacity - Opacity value (0-1)
   */
  setOpacity(opacity) {
    this.opacity = Math.max(0, Math.min(1, opacity));
  }
}
