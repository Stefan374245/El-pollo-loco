class Endboss extends Enemy {
  height = 400;
  width = 300;
  y = 72;

  animationPhase = "alert";
  currentImage = 0;
  enemySpawned = false;
  frameCount = 0;
  
  aggressionLevel = 1;
  
  aggressionLevel1 = {
    speed: 20,
    hp: 100,
    maxHp: 100,
    spawnEnemiesOnAttack: false,
    alertDuration: 3000,
    damagePerHit: 20
  };
  
  aggressionLevel2 = {
    speed: 30,
    hp: 140,
    maxHp: 140,
    spawnEnemiesOnAttack: true,
    alertDuration: 1700,
    damagePerHit: 20
  };

  attackCount = 0;
  phaseStep = 0;

  animations = {
    walk: [
      "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
      "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
      "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
      "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ],
    alert: [
      "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
      "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
      "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
      "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
      "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
      "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
      "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
      "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ],
    attack: [
      "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
      "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
      "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
      "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
      "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
      "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
      "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
      "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ],
    hurt: [
      "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
      "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
      "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ],
    dead: [
      "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
      "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
      "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ],
  };

  constructor(aggressionLevel = 1) {
    super();
    this.loadImage(this.animations.walk[0]);
    Object.values(this.animations).forEach((images) => this.loadImages(images));
    this.x = 2200;
    this.aggressionLevel = aggressionLevel;
    this.applyAggressionLevel(aggressionLevel);
    this.alertTriggered = false;
  }

  applyAggressionLevel(level) {
    if (level === 2) {
      this.speed = this.aggressionLevel2.speed;
      this.hp = this.aggressionLevel2.hp;
      this.maxHp = this.aggressionLevel2.maxHp;
      this.damagePerHit = this.aggressionLevel2.damagePerHit;
    } else {
      this.speed = this.aggressionLevel1.speed;
      this.hp = this.aggressionLevel1.hp;
      this.maxHp = this.aggressionLevel1.maxHp;
      this.damagePerHit = this.aggressionLevel1.damagePerHit;
    }
  }

animate() {
  setInterval(() => {
    if (
      this.world &&
      this.x + this.width / 2 < -this.world.camera_x + this.world.canvas.width
    ) {
      if (!this.alertTriggered && this.world.character.x >= this.x - 600) {
        this.alertTriggered = true;
        this.changePhase("alert");
        this.initializeStatusBar();
        if (this.world.character.audioManager) {
          this.world.character.audioManager.play('endboss');
          this.world.character.audioManager.stopAndReset('startgame');
        }
      }
      
      if (this.animationPhase === "walk") {
        this.moveLeft();
      }
      if (this.animationPhase === "alert" && !this.alertFinished) {
        this.alertFinished = true;
        setTimeout(() => {
          this.changePhase("attack");
        }, this.getCurrentAggressionSettings().alertDuration);
      }

      this.handleAnimation();
    }
  }, 200);
}

  initializeStatusBar() {
    if (this.world && this.world.statusBarEndboss) {
      const percentage = (this.hp / this.maxHp) * 100;
      this.world.statusBarEndboss.setPercentage(percentage);
      console.log(`StatusBar initialisiert: ${this.hp}/${this.maxHp} (${Math.round(percentage)}%) - Level ${this.aggressionLevel}`);
    }
  }

  handleAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.animations.dead);
      return;
    }

    this.playAnimation(this.animations[this.animationPhase]);
    this.frameCount++;

    if (this.frameCount >= this.animations[this.animationPhase].length) {
      this.handlePhaseTransition();
    }
  }

handlePhaseTransition() {
  switch (this.animationPhase) {
    case "alert":
      break;

    case "attack":
      this.attackCount++;
      if (this.getCurrentAggressionSettings().spawnEnemiesOnAttack && this.attackCount % 2 === 0) {
        this.spawnEnemyBehind();
      }
      this.phaseStep++;
      this.changePhase("walk");
      break;

    case "walk":
      setTimeout(() => {
        this.phaseStep++;
        this.changePhase("attack");
      }, 2000);
      break;

    case "hurt":
      this.changePhase(this.previousPhase || "attack");
      break;
  }
}

  getCurrentAggressionSettings() {
    return this.aggressionLevel === 2 ? this.aggressionLevel2 : this.aggressionLevel1;
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
  newEnemy.speed = 3.5;
  this.world.level.enemies.push(newEnemy);
}


  checkBottleHit(bottle) {
    const config = CollisionConfig.getOffsets();
    const endbossOffsets = config.endboss.precise;
    const bottleOffsets = config.throwableBottle.hit;

    if (
      !this.isDead() &&
      CollisionConfig.isPreciseCollision(
        bottle,
        this,
        bottleOffsets,
        endbossOffsets
      ) &&
      !bottle.hasHitGround
    ) {
      console.log('Endboss hit by bottle!');
      this.hitBoss();
      bottle.hasHitGround = true;
      bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
      
      audioManager.play('smashBottle');
    }
  }

  hit() {
    this.hitBoss();
  }

  hitBoss() {
    if (this.animationPhase === "hurt" || this.isDead()) return;
    const damage = 20;
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
    this.lastHit = new Date().getTime();
    this.changePhase("hurt");
    const percentage = (this.hp / this.maxHp) * 100;
    this.world.statusBarEndboss.setPercentage(percentage);
    if (this.hp === 0) {
      this.changePhase("dead");
      this.deathProcessed = false;
    }
  }
}
