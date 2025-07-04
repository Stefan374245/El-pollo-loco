class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  speedX = 0;
  accelaration = 2.5;
  hp = 100;

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

    snapToGround(targetY = 280) {
    this.y      = targetY;
    this.speedY = 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.availableImages[path];
    this.currentImage++;
  }

  isColliding(mo, offsetX = 0, offsetY = 0) {
    return (
        this.x + this.width - offsetX > mo.x + offsetX &&
        this.y + this.height - offsetY > mo.y + offsetY &&
        this.x + offsetX < mo.x + mo.width - offsetX &&
        this.y + offsetY < mo.y + mo.height - offsetY
    );
}


hit() {
  this.hp -= 10;
  if (this.hp < 0) this.hp = 0;

  if (this.isDead() && this.die) {
    this.die();
  }
}

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

  isHurt() {
  const timePassed = Date.now() - this.lastHit;
  return timePassed < 500;
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
