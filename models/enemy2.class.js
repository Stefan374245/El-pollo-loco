class Enemy2 extends Enemy {


      IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
      ];

      IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
      ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    
    this.hp = 1;
    this.hasStartedMoving = false;
  }

  animate() {
    this.movingInterval = setInterval(() => {
      if (!this.isDead() && this.shouldStartMoving()) {
        this.hasStartedMoving = true;
      }
      
      if (!this.isDead() && this.hasStartedMoving) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.walkingInterval = setInterval(() => {
      if (!this.isDead() && this.hasStartedMoving) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}