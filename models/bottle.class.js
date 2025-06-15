class Bottle extends MovableObject {
  IMAGE_BOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];


  y = 396;
  width = 40;
  height = 40;
  currentImage = 0;

  constructor() {
    super();
    this.x = 300 + Math.random() * 1500;
    this.loadImage(this.IMAGE_BOTTLE[this.currentImage]); 
    this.loadImages(this.IMAGE_BOTTLE);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.IMAGE_BOTTLE.length;
      this.img = this.availableImages[this.IMAGE_BOTTLE[this.currentImage]];
    }, 300);
  }
}