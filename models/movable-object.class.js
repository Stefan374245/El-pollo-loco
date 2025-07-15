/**
 * Base class for all objects that can move and interact in the game world.
 * Provides physics, collision detection, animation, and basic movement functionality.
 * @class MovableObject
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  speedX = 0;
  accelaration = 2.5;
  hp = 100;

  /**
   * Applies gravity to the object and handles physics
   * Updates position based on speed and applies friction
   */
  applyGravity() {
    setInterval(() => {
      if (this.isJumping() || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.accelaration;
      }
      
      if (this.speedX !== 0) {
        const newX = this.x + this.speedX;
        if (newX >= 0) {
          this.x = newX;
        } else {
          this.x = 0;
          this.speedX = 0;
        }
        
        this.speedX *= 0.9;
        if (Math.abs(this.speedX) < 0.1) {
          this.speedX = 0;
        }
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is currently jumping or falling
   * @returns {boolean} True if the object is in the air
   */
  isJumping() {
    if(this instanceof ThrowableObject) {
      return true;  
    }
    return this.y < 280;
  }
 
  /**
   * Moves the object to the right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left
   */
  moveLeft() {
    this.x -= this.speed;
  }
  
  /**
   * Makes the object jump by setting upward velocity
   */
  jump() {
    this.speedY = -25;
  }

  /**
   * Applies knockback effect to the object
   * @param {MovableObject} [attacker=null] - The object causing the knockback
   */
  knockback(attacker = null) {
    let knockbackDirection = -1;
    
    if (attacker) {
      if (attacker.x < this.x) {
        knockbackDirection = 1;
      }
      else {
        knockbackDirection = -1;
      }
    }
    
    this.speedX = 8 * knockbackDirection;
    this.speedY = -5;
    
    this.knockbackUntil = Date.now() + 400;
  }

  /**
   * Snaps the object to the ground at the specified Y position
   * @param {number} [targetY=280] - The Y coordinate to snap to
   */
  snapToGround(targetY = 280) {
    this.y = targetY;
    this.speedY = 0;
  }

  /**
   * Plays an animation by cycling through the provided images
   * @param {string[]} images - Array of image paths for the animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.availableImages[path];
    this.currentImage++;
  }

  /**
   * Checks if this object is colliding with another object
   * @param {MovableObject} mo - The other object to check collision with
   * @param {number} [offsetX=0] - X offset to adjust collision box
   * @param {number} [offsetY=0] - Y offset to adjust collision box
   * @returns {boolean} True if objects are colliding
   */
  isColliding(mo, offsetX = 0, offsetY = 0) {
    return (
        this.x + this.width - offsetX > mo.x + offsetX &&
        this.y + this.height - offsetY > mo.y + offsetY &&
        this.x + offsetX < mo.x + mo.width - offsetX &&
        this.y + offsetY < mo.y + mo.height - offsetY
    );
  }

  /**
   * Deals damage to this object
   * Calls die() method if health reaches zero
   */
  hit() {
    this.hp -= 10;
    if (this.hp < 0) this.hp = 0;

    if (this.isDead() && this.die) {
      this.die();
    }
  }

  /**
   * Deals damage with cooldown period to prevent spam damage
   * @param {MovableObject} [attacker=null] - The attacking object
   */
  hitWithCooldown(attacker = null) {
    const now = Date.now();
    const timePassed = now - this.lastHit;
    const cooldown = 500;

    if (timePassed > cooldown && this.hp > 0) {
      this.hp -= 20;
      if (this.hp < 0) this.hp = 0;

      this.knockback(attacker);

      if (this.isDead() && this.die) {
        this.die();
      } else {
        this.lastHit = now;
      }
    }
  }

  /**
   * Checks if the object is currently hurt (recently took damage)
   * @returns {boolean} True if hurt state is active
   */
  isHurt() {
    const timePassed = Date.now() - this.lastHit;
    return timePassed < 500;
  }

  /**
   * Checks if the object is dead (health at zero)
   * @returns {boolean} True if the object is dead
   */
  isDead() {
    return this.hp == 0;
  }

  /**
   * Checks if the object is idle (no input detected)
   * @returns {boolean} True if the object is idle
   */
  isIdle() {
    return (
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.JUMP &&
      !this.isJumping() &&
      !this.isDead()
    );
  }
}
