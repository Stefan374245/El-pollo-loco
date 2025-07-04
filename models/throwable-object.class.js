class ThrowableObject extends MovableObject {
  IMAGE_BOTTLE_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGE_BOTTLE_SPLASH = [
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  hasHitGround = false;

  constructor(x, y, otherDirection = false) {
    super();
    this.loadImages(this.IMAGE_BOTTLE_ROTATION);
    this.loadImages(this.IMAGE_BOTTLE_SPLASH);
    this.img = this.availableImages[this.IMAGE_BOTTLE_ROTATION[0]];

    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.otherDirection = otherDirection;

    this.throw();
  }

  throw() {
    this.speedY = -30;
    this.applyGravity();
    this.startRotation();
    this.bottleHitGround();

    this.moveInterval = setInterval(() => {
      if (!this.hasHitGround) {
        this.x += this.otherDirection ? -8 : 8;
      }
    }, 25);
  }

  startRotation() {
    this.rotationInterval = setInterval(() => {
      if (!this.hasHitGround) {
        this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
      }
    }, 50);
  }

  bottleHitGround() {
    this.groundCheck = setInterval(() => {
      if (this.y >= 396 && !this.hasHitGround) {
        this.hitGround();
        clearInterval(this.groundCheck);
      }
    }, 25);
  }

  hitGround() {
    this.hasHitGround = true;
    this.speedY = 0;
    this.y = 396;

    clearInterval(this.moveInterval);
    clearInterval(this.rotationInterval);

    this.playAnimation(this.IMAGE_BOTTLE_SPLASH);

    if (audioManager && audioManager.play) {
      audioManager.play('smashBottle');
    }
    setTimeout(() => {
      if (this.world) {
        const index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
          this.world.throwableObjects.splice(index, 1);
        }
      }
    }, 600);
  }
  
  isCollidingInner(mo, offsetX = 0, offsetY = 0) {
    return (
      this.x + this.width - offsetX > mo.x + offsetX &&
      this.y + this.height - offsetY > mo.y + offsetY &&
      this.x + offsetX < mo.x + mo.width - offsetX &&
      this.y + offsetY < mo.y + mo.height - offsetY
    );
  }
}
