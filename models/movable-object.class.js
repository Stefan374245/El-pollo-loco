class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  hp = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isJumping() || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.accelaration;
      }
    }, 1000 / 25);
  }

  isJumping() {
    if(this instanceof ThrowableObject) {
      return true;  
    }
    return this.y < 280 - 5; // Überprüft, ob der Charakter über dem Boden ist
  }


  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = -25;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // Use modulo to cycle through images let = i = 7 % 6 ; =>  1, Rest 1 -- > i = 0 , 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 ...
    let path = images[i];
    this.img = this.availableImages[path];
    this.currentImage++;
  }

  /**
   * character.is
   * @param {*} mo MovableObject to check for collision
   * Checks if this object is colliding with another movable object
   * @returns
   */
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.hp -= 5;
    if (this.hp < 0) {
      this.hp = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.hp == 0;
  }

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
