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
    this.img = new Image(); // this.img = document.getElementbyId("image")    <img id= 'image' src>
    this.img.src = path;
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
    ctx.beginPath();
    ctx.lineWidth = '5';
 
    if (this instanceof Enemy) {
      ctx.strokeStyle = 'red';

    } else if (this instanceof Character) {
      ctx.strokeStyle = 'blue';
      
    } else {
      ctx.strokeStyle = 'black';
    }
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1); 
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore(); 
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
}
