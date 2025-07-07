/**
 * Represents the bottle status bar for the user interface.
 * Displays the number of bottles available for throwing.
 * @class StatusBarBottles
 * @extends DrawableObject
 */
class StatusBarBottles extends DrawableObject {
  /** @type {string[]} Array of bottle status bar images */
  IMAGES_BOTTLES = [
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  /** @type {number} Current percentage of bottles */
  percentage = 100;

  /**
   * Creates a new bottle status bar instance
   * Initializes position and loads images
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 20;
    this.y = 80;
    this.width = 160;
    this.height = 48;
    this.setPercentage(0);
  }

  /**
   * Sets the bottle percentage and updates the display
   * @param {number} percentage - The new percentage value (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
    this.img = this.availableImages[path];
  }

  /**
   * Resolves the correct image index based on current percentage
   * @returns {number} The index of the image to display
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
