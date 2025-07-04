class Endboss extends Enemy {
  height = 400;
  width = 300;
  y = 72;

  animationPhase        = "alert";
  currentImage          = 0;
  frameCount            = 0;
  attackCount           = 0;
  phaseStep             = 0;

   onDeathComplete = null;
     deadAnimationComplete = false;

  aggressionLevel = 1;
  aggressionLevel1 = {
    speed: 16,
    hp: 100,
    maxHp: 100,
    spawnEnemiesOnAttack: false,
    alertDuration: 3000,
    damagePerHit: 20,
  };
  aggressionLevel2 = {
    speed: 24,
    hp: 140,
    maxHp: 140,
    spawnEnemiesOnAttack: true,
    alertDuration: 2000,
    damagePerHit: 20,
  };

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
    // Alle Animations-Bilder vorladen
    this.loadImage(this.animations.walk[0]);
    Object.values(this.animations).forEach(images => this.loadImages(images));

    this.x = 2200;
    this.applyAggressionLevel(aggressionLevel);

    this.alertTriggered = false;
  }

  applyAggressionLevel(level) {
    const cfg = level === 2 ? this.aggressionLevel2 : this.aggressionLevel1;
    this.aggressionLevel = level;
    this.speed          = cfg.speed;
    this.hp             = cfg.hp;
    this.maxHp          = cfg.maxHp;
    this.damagePerHit   = cfg.damagePerHit;
  }

  animate() {
    setInterval(() => {
      if (
        !this.world ||
        this.x + this.width / 2 >= -this.world.camera_x + this.world.canvas.width
      ) return;


      if (!this.alertTriggered && this.world.character.x >= this.x - 600) {
        this.alertTriggered = true;
        this.changePhase("alert");
        this.initializeStatusBar();
        this.world.character.audioManager?.play("endboss");
        this.world.character.audioManager?.stopAndReset("level1");
        this.world.character.audioManager?.stopAndReset("level2");
      }

 
      if (this.animationPhase === "walk") {
        this.moveLeft();
      }
      if (this.animationPhase === "alert" && !this.alertFinished) {
        this.alertFinished = true;
        setTimeout(
          () => this.changePhase("attack"),
          this.getCurrentAggressionSettings().alertDuration
        );
      }

  if (this.isDead()) {
      this.playAnimation(this.animations.dead);
      this.frameCount++;

      if (this.frameCount >= this.animations.dead.length && !this.deadAnimationComplete) {
        this.deadAnimationComplete = true;
        
        setTimeout(() => {
          if (typeof this.onDeathComplete === 'function') {
            this.onDeathComplete();
          }
        }, 2500);
      }
      return;
    }

      this.handleAnimation();
    }, 200);
  }

  initializeStatusBar() {
    if (!this.world?.statusBarEndboss) return;
    const pct = (this.hp / this.maxHp) * 100;
    this.world.statusBarEndboss.setPercentage(pct);
  }

  handleAnimation() {
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
        if (
          this.getCurrentAggressionSettings().spawnEnemiesOnAttack &&
          this.attackCount % 2 === 0
        ) {
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
    return this.aggressionLevel === 2
      ? this.aggressionLevel2
      : this.aggressionLevel1;
  }

  changePhase(newPhase) {
    this.previousPhase  = this.animationPhase;
    this.animationPhase = newPhase;
    this.frameCount     = 0;
    this.currentImage   = 0;
  }

  spawnEnemyBehind() {
    if (!this.world) return;
    const e = new Enemy2();
    e.x     = this.x + this.width - 70;
    e.y     = 390;
    e.world = this.world;
    e.speed = 3.5;
    this.world.level.enemies.push(e);
  }

  checkBottleHit(bottle) {
    const cfg = CollisionConfig.getOffsets();
    if (
      !this.isDead() &&
      CollisionConfig.isPreciseCollision(
        bottle,
        this,
        cfg.throwableBottle.hit,
        cfg.endboss.precise
      ) &&
      !bottle.hasHitGround
    ) {
      this.hitBoss();
      bottle.hasHitGround = true;
      bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
      audioManager.play("smashBottle");
    }
  }

  hit() {
    this.hitBoss();
  }

hitBoss() {
  if (this.animationPhase === "hurt" || this.isDead()) return;

  // Schaden anwenden
  this.hp = Math.max(
    0,
    this.hp - this.getCurrentAggressionSettings().damagePerHit
  );
  this.changePhase("hurt");
  this.world.statusBarEndboss.setPercentage((this.hp / this.maxHp) * 100);

  // Starte Dead-Phase
  if (this.hp === 0) {
    this.changePhase("dead");
    this.frameCount = 0; 
     if (audioManager && audioManager.play) {
      audioManager.play('win', false, 0.8);
    }
  }
}
  /**
   * Ruft GameManager.completeLevel() auf, um den Level-Complete-Screen
   * anzuzeigen und direkt anschließend Level 2 zu starten.
   */
  scheduleLevelComplete() {
    if (this.endLevelScheduled) return;
    this.endLevelScheduled = true;
    
    // Sicherstellen, dass gameManager existiert
    if (window.gameManager && typeof window.gameManager.completeLevel === 'function') {
      window.gameManager.completeLevel();
    } else {
      console.error('GameManager ist nicht verfügbar');
    }
  }
}
