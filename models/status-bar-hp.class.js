/**
 * Represents the character health status bar for the user interface.
 * Displays the current health points of the main character.
 * @class StatusBar
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {string[]} Array of health status bar images */
  IMAGES_HP_BAR = [
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
  ];

  /** @type {number} Current percentage of health */
  percentage = 100;

  /**
   * Creates a new character health status bar instance
   * Initializes position and loads images
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HP_BAR);
    this.x = 20;
    this.y = 0;
    this.width = 160;
    this.height = 48;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage and updates the display
   * @param {number} percentage - The new percentage value (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HP_BAR[this.resolveImageIndex()];
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
