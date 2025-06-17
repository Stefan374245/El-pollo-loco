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
    return this.y < 280;
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

  snapToGround() {
  const groundLevel = 280;
  this.y = groundLevel;
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
  isColliding(mo, offsetX = 0, offsetY = 0) {
    return (
        this.x + this.width - offsetX > mo.x + offsetX &&
        this.y + this.height - offsetY > mo.y + offsetY &&
        this.x + offsetX < mo.x + mo.width - offsetX &&
        this.y + offsetY < mo.y + mo.height - offsetY
    );
}

hit() {
  this.hp -= 5;
  if (this.hp < 0) this.hp = 0;

  if (this.isDead() && this.die) {
    this.die();
  } else {
    this.lastHit = new Date().getTime();
  }
}

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
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
