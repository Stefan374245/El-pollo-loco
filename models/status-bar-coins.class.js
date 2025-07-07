/**
 * Represents the coin status bar for the user interface.
 * Displays the number of coins collected by the player.
 * @class StatusBarCoins
 * @extends DrawableObject
 */
class StatusBarCoins extends DrawableObject {

/** @type {string[]} Array of coin status bar images */
IMAGES_COINS = [
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
];

  /** @type {number} Current percentage of coins collected */
  percentage = 100;

  /**
   * Creates a new coin status bar instance
   * Initializes position and loads images
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COINS);
    this.x = 20;
    this.y = 40;
    this.width = 160;
    this.height = 48;
    this.setPercentage(0);
  }

  /**
   * Sets the coin percentage and updates the display
   * @param {number} percentage - The new percentage value (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COINS[this.resolveImageIndex()];
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
