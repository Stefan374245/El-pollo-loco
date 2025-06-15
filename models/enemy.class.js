class Enemy extends MovableObject {
  width = 48;
  height = 48;
  currentImage = 0;
  isDying = false;
  hp = 1;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    const maxCanvasWidth = 2200;
    this.x = 200 + Math.random() * (maxCanvasWidth - 200 - this.width);
    this.speed = 0.5 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    this.movingInterval = setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.walkingInterval = setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }


  die() {
    this.isDying = true;
    this.currentImage = 0;

    clearInterval(this.movingInterval);
    clearInterval(this.walkingInterval);

    this.deathInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 100);

    setTimeout(() => {
      clearInterval(this.deathInterval);
      const index = this.world.level.enemies.indexOf(this);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }, 600);
  }
}
