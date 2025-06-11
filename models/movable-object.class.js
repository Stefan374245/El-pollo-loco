class MovableObject {
  x = 40;
  y = 390;
  img;
  height = 100;
  width = 100;
  availableImages = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  hp = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isJumping() || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.accelaration;
      }
    }, 1000 / 25);
  }

  isJumping() {
    return this.y < 280 - 5; // Überprüft, ob der Charakter über dem Boden ist
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;

    // Fehlerbehebung: Überprüfen, ob das Bild geladen wurde
    this.img.onload = () => {
      console.log(`Bild erfolgreich geladen: ${path}`);
    };

    this.img.onerror = () => {
      console.error(`Fehler beim Laden des Bildes: ${path}`);
    };
  }
  /**
 * 
 * @param {*} imageArray  Array of image paths to be loaded
 
 */
  loadImages(imageArray) {
    imageArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.availableImages[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

drawFrame(ctx) {
  if (this instanceof Character) {
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  } else if (this instanceof Enemy) {
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'red';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
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
    let i = this.currentImage % this.IMAGES_WALKING.length; // Use modulo to cycle through images let = i = 7 % 6 ; =>  1, Rest 1 -- > i = 0 , 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 ...
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
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  } 
  
  hit() {
    this.hp -= 5;
    if(this.hp < 0 ) {
      this.hp = 0;
    }
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
