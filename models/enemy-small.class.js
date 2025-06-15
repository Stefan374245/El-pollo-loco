class SmallChicken extends Enemy {
  constructor() {
    super();
    this.width = 36;
    this.height = 36;
    this.hp = 1;

    this.IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    this.IMAGES_DEAD = [
      "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }
}