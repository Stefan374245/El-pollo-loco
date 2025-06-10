class Enemy extends MovableObject {
  width = 48;
  height = 48;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    const maxCanvasWidth = 720;
    this.x = 200 + Math.random() * (maxCanvasWidth - 200 - this.width);
    this.y = 387;
    this.speed = 0.1 + Math.random() * 0.2;
    this.animate();
  }
  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
