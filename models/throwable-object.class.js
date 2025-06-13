class ThrowableObject extends MovableObject {
  IMAGE_BOTTLE = ["img/6_salsa_bottle/salsa_bottle.png"];
  constructor(x, y, otherDirection = false) {
    super();
    this.loadImage(this.IMAGE_BOTTLE);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.otherDirection = otherDirection;
    this.throw(x, y);
  }

  throw() {
   
    this.speedY = -30;
    this.applyGravity();

    setInterval(() => {
      this.x += this.otherDirection ? -8 : 8;
      
    },25);
  }
}
