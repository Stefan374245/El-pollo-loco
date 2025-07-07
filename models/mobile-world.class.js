/**
 * Extends World class for mobile devices.
 * Provides mobile-specific interface and touch controls.
 * @class MobileWorld
 * @extends World
 */
class MobileWorld extends World {
  /**
   * Creates a new MobileWorld instance
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering
   * @param {Object} keyboard - Keyboard input handler
   * @param {number} [levelNumber=1] - The number of the level to load
   */
  constructor(canvas, keyboard, levelNumber = 1) {
    super(canvas, keyboard, levelNumber);
    this.isInMobileMenu = true;
    this.showMobileStartScreen();
  }

  /**
   * Shows the mobile start screen with appropriate mobile interface
   */
  showMobileStartScreen() {
    document.getElementById("background").classList.add("blur");
    const startScreen = document.getElementById("startScreen");
    startScreen.classList.add("active");
    startScreen.innerHTML = getMobileStartScreenTemplate();
  }

  /**
   * Shows mobile information screen with game instructions
   */
  showMobileInfo() {
    const startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = getMobileInfoTemplate();
  }

  /**
   * Returns to the mobile start screen from other mobile screens
   */
  backToStartScreen() {
    this.showMobileStartScreen();
  }
}
