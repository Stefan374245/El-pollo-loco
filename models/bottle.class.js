class Bottle extends MovableObject {
  IMAGE_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  y = 396;
  width = 40;
  height = 40;

    constructor() {
    super();
    this.loadImages(this.IMAGE_BOTTLE);
    this.x = Math.random() * 500;

    this.currentImage = Math.floor(Math.random() * this.IMAGE_BOTTLE.length);
    this.loadImage(this.IMAGE_BOTTLE[this.currentImage]); // 👈 das ist sauber
  }
}
