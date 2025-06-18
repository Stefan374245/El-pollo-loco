class Endboss extends Enemy {
  height = 400;
  width = 300;
  y = 72;

  animationPhase = "alert";
  currentImage = 0;
  enemySpawned = false;
  frameCount = 0;
  speed = 8;
  hp = 100;

  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_DAMAGE = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DAMAGE);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
  }

  
animate() {
  setInterval(() => {
    if (
      this.world &&
      this.x + this.width / 2 <
        -this.world.camera_x + this.world.canvas.width
    ) {
      this.handleAnimation();
    }
  }, 200);
}

  handleAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      return;
    }

    switch (this.animationPhase) {
      case "hurt":
        this.playAnimation(this.IMAGES_DAMAGE);
        this.frameCount++;
        if (this.frameCount >= this.IMAGES_DAMAGE.length) {
          this.changePhase(this.previousPhase || "walk");
        }
        break;

      case "alert":
        this.playAnimation(this.IMAGES_ALERT);
        this.frameCount++;
        if (this.frameCount >= this.IMAGES_ALERT.length) {
          this.changePhase("walk");
        }
        break;

      case "walk":
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
        this.frameCount++;
        if (this.frameCount >= this.IMAGES_WALKING.length) {
          this.changePhase("attack");
        }
        break;

      case "attack":
        this.playAnimation(this.IMAGES_ATTACK);
        this.frameCount++;
        if (this.frameCount >= this.IMAGES_ATTACK.length) {
          this.spawnEnemyBehind();
          this.changePhase("walk");
        }
        break;
    }
  }

  changePhase(newPhase) {
    this.previousPhase = this.animationPhase;
    this.animationPhase = newPhase;
    this.frameCount = 0;
    this.currentImage = 0;
  }

  spawnEnemyBehind() {
    if (!this.world) return;

    const newEnemy = new Enemy2();
    newEnemy.x = this.x + this.width - 70;
    newEnemy.y = 390;
    newEnemy.world = this.world;

    this.world.level.enemies.push(newEnemy);
  }


  checkBottleHit(bottle) {
    const offsetX = 40;
    const offsetY = 40;

    if (
      !this.isDead() &&
      bottle.isCollidingInner(this, offsetX, offsetY) &&
      !bottle.hasHitGround
    ) {
      this.hitBoss();
      bottle.hasHitGround = true;
      bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
    }
  }


  hitBoss() {
    if (this.animationPhase === "hurt" || this.isDead()) return;

    this.hp -= 20;
    if (this.hp < 0) this.hp = 0;

    this.lastHit = new Date().getTime();
    this.animationPhase = "hurt";

    this.world.statusBarEndboss.setPercentage(this.hp);

    if (this.hp === 0 && this.die) {
      this.die();
    } else {
      setTimeout(() => {
        if (this.animationPhase === "hurt") {
          this.changePhase("walk"); 
        }
      }, 500);
    }
  }
}
