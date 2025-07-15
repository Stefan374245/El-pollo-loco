/**
 * Represents a cloud object that moves across the background.
 * Clouds provide atmospheric background decoration and movement.
 * @class Clouds
 * @extends MovableObject
 */
class Clouds extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  speed = 0.4;

  /**
   * Creates a new cloud instance
   * Sets random position and starts movement animation
   */
  constructor() {
    super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 2400;
    this.animate();
  }
  
  /**
   * Starts the cloud movement animation
   * Moves the cloud continuously to the left
   */
   animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 30);
  }
}
