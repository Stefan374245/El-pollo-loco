class Bottle extends MovableObject {
  y = 396;
  width = 40;
  height = 40;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");

    this.x = Math.random() * 500;
  }
}

