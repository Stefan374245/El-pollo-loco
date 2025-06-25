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
      
      // Horizontale Bewegung für Knockback
      if (this.speedX !== 0) {
        const newX = this.x + this.speedX;
        // Sicherstellen, dass das Objekt nicht über den linken Rand hinausgeht
        // Berücksichtigung des Objekts mit seiner Breite
        if (newX >= 0) {
          this.x = newX;
        } else {
          this.x = 0;
          this.speedX = 0; // Stoppen bei Bildschirmrand
        }
        
        // Reibung anwenden - speedX langsam reduzieren
        this.speedX *= 0.9;
        // Stoppen wenn speedX sehr klein wird
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
    // Standardmäßig nach links kicken
    let knockbackDirection = -1;
    
    // Wenn ein Angreifer übergeben wird, bestimme die Richtung basierend auf der Position
    if (attacker) {
      // Wenn der Angreifer links vom Character ist, kicke nach rechts
      if (attacker.x < this.x) {
        knockbackDirection = 1;
      }
      // Wenn der Angreifer rechts vom Character ist, kicke nach links
      else {
        knockbackDirection = -1;
      }
    }
    
    this.speedX = 8 * knockbackDirection; // Horizontaler Knockback
    this.speedY = -5;  // Leicht nach oben
    
    // Bewegung für 400ms blockieren (etwas länger als Knockback-Physik)
    this.knockbackUntil = Date.now() + 400;
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

    // Knockback-Effekt anwenden mit Richtungserkennung
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
