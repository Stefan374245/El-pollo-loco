/**
 * Represents the endboss status bar for the user interface.
 * Displays the health of the current endboss.
 * @class StatusBarEndboss
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {
  /** @type {string[]} Array of endboss health bar images */
  IMAGES_HP_BAR = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  percentage = 100;
  maxHp = 100;
  currentHp = 100;

  /**
   * Creates a new endboss status bar instance
   * @param {number} [maxHp=100] - Maximum health points of the endboss
   */
  constructor(maxHp = 100) {
    super();
    this.loadImages(this.IMAGES_HP_BAR);
    this.x = 500;
    this.y = 20;
    this.width = 200;
    this.height = 48;
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.setPercentage(100);
  }

  /**
   * Sets the maximum health points and resets to full health
   * @param {number} maxHp - The new maximum health value
   */
  setMaxHp(maxHp) {
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage and updates the display
   * @param {number} percentage - The new percentage value (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;

    if (this.percentage < 0) this.percentage = 0;
    if (this.percentage > 100) this.percentage = 100;

    let path = this.IMAGES_HP_BAR[this.resolveImageIndex()];
    this.img = this.availableImages[path];

    const currentHp = Math.round((this.percentage / 100) * this.maxHp);
  }

  /**
   * Resolves the correct image index based on remaining hits needed
   * @returns {number} The index of the image to display
   */
  resolveImageIndex() {
    const currentHp = Math.round((this.percentage / 100) * this.maxHp);
    const hitsRemaining = Math.ceil(currentHp / 20);

    if (this.maxHp === 140) {
      if (hitsRemaining <= 0) return 0;
      if (hitsRemaining <= 1) return 1;
      if (hitsRemaining <= 2) return 2;
      if (hitsRemaining <= 4) return 3;
      if (hitsRemaining <= 6) return 4;
      return 5;
    }
    /**
     * Resolves image index for endboss with 100 HP
     */
    if (this.maxHp === 100)
      if (hitsRemaining <= 0) return 0;
    if (hitsRemaining <= 1) return 1;
    if (hitsRemaining <= 2) return 2;
    if (hitsRemaining <= 3) return 3;
    if (hitsRemaining <= 4) return 4;
    return 5;
  }

  /**
   * Gets detailed health information
   * @returns {Object} Object containing current HP, max HP, percentage, and hits remaining
   */
  getHealthInfo() {
    const currentHp = Math.round((this.percentage / 100) * this.maxHp);
    return {
      currentHp: currentHp,
      maxHp: this.maxHp,
      percentage: Math.round(this.percentage),
      hitsRemaining: Math.ceil(currentHp / 20),
    };
  }

  /**
   * Updates the status bar from current and max HP values
   * @param {number} currentHp - Current health points
   * @param {number} maxHp - Maximum health points
   */
  updateFromHpValues(currentHp, maxHp) {
    this.maxHp = maxHp;
    this.currentHp = currentHp;
    const percentage = (currentHp / maxHp) * 100;
    this.setPercentage(percentage);
  }
}
