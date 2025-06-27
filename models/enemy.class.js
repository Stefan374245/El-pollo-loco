class Enemy extends MovableObject {
  width = 48;
  height = 48;
  currentImage = 0;
  isDying = false;
  hp = 1;
  canJump = true;
  hasStartedMoving = false;
  static availablePositions = [];

  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    if (Enemy.availablePositions.length === 0) {
      for (let x = 650; x <= 2200 - this.width; x += 70) {
        Enemy.availablePositions.push(x);
      }
    }

    const randomIndex = Math.floor(Math.random() * Enemy.availablePositions.length);
    this.x = Enemy.availablePositions[randomIndex];
    Enemy.availablePositions.splice(randomIndex, 1);

    this.speed = 0.5 + Math.random() * 0.25;
    this.y = 390;

    this.animate();
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

  shouldStartMoving() {
    if (this.hasStartedMoving) return true;
    
    if (this.world && this.world.character) {
      const distance = Math.abs(this.world.character.x - this.x);
      return distance < 650;
    }
    return false;
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
