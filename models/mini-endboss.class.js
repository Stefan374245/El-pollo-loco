class MiniEndboss extends Endboss {
  width = 80;   // Deutlich kleiner als vorher (100)
  height = 120; // Deutlich kleiner als vorher (150)
  hp = 60;      // Angepasst für 3 Hits bei 20 Schaden
  maxHp = 60;
  speed = 4.0; // Erhöht von 2.5 auf 4.0 für mehr Geschwindigkeit
  damagePerHit = 20;

  constructor(x = 1200) {
    super(1); // Mini-Endboss hat immer Aggressionslevel 1
    this.x = x;
    this.y = 320;
    this.animationPhase = "walk";
    this.otherDirection = false; // Für das flipImage System
    this.deadAnimationComplete = false;
    this.frameCount = 0;
    this.id = null; // Wird in setWorld() gesetzt
    
    // Mini-Endboss überschreibt HP-Werte
    this.hp = 60;     // 60 HP für 3 Hits bei 20 Schaden
    this.maxHp = 60;
  }

  // Erweiterte Richtungslogik mit Bewegung
  updateDirection() {
    // Keine Bewegung während Hurt-Animation oder wenn tot
    if (this.world && this.world.character && !this.isDead() && this.animationPhase !== "hurt") {
      const characterX = this.world.character.x;
      const bossX = this.x;
      
      // Flippe nur wenn Character rechts vom Boss steht (character.x > miniendboss.x)
      this.otherDirection = characterX > bossX;
      
      // Bewege sich zum Character hin
      if (characterX > bossX) {
        this.moveRight(); // Character ist rechts - bewege nach rechts
      } else if (characterX < bossX) {
        this.moveLeft(); // Character ist links - bewege nach links
      }
    }
  }

  // Überschreibt die animate-Methode um Richtungsupdate hinzuzufügen
  animate() {
    setInterval(() => {
      if (
        this.world &&
        this.x + this.width / 2 < -this.world.camera_x + this.world.canvas.width
      ) {
        this.handleAnimation();
      }
    }, 200);
    
    this.directionInterval = setInterval(() => {
      // Keine Bewegung während Hurt-Animation oder wenn tot
      if (!this.isDead() && this.animationPhase !== "hurt") {
        this.updateDirection();
      }
    }, 100);
  }

  handleAnimation() {
    if (this.isDead() || this.animationPhase === "dead") {
      this.playAnimation(this.animations.dead);
      
      // Prüfe ob Dead-Animation komplett abgespielt wurde (1000ms anhalten)
      if (this.frameCount >= this.animations.dead.length - 1 && !this.deadAnimationComplete) {
        this.deadAnimationComplete = true;
        console.log(`Mini-Endboss ${this.id} Dead-Animation abgeschlossen`);
        // Warte 1000ms bevor entfernt wird
        setTimeout(() => {
          this.removeSelfFromWorld();
        }, 1000);
      }
      this.frameCount++;
      return;
    }

    this.playAnimation(this.animations[this.animationPhase]);
    this.frameCount++;

    if (this.frameCount >= this.animations[this.animationPhase].length) {
      this.handlePhaseTransition();
    }
  }

  // Überschreibt handlePhaseTransition um kein Enemy-Spawning zu haben
  handlePhaseTransition() {
    this.frameCount = 0; // Reset frameCount bei jedem Phasenwechsel
    
    switch (this.animationPhase) {
      case "alert":
        break;

      case "attack":
        this.attackCount++;
        // Mini-Endboss spawnt KEINE Enemies
        this.phaseStep++;
        this.changePhase("walk");
        break;

      case "walk":
        const walkDuration = 1500; // Kurze Walk-Phase für Mini-Endboss
        setTimeout(() => {
          this.phaseStep++;
          this.changePhase("attack");
        }, walkDuration);
        break;

      case "hurt":
        // Längere Pause nach hurt-Animation (1000ms wie gewünscht)
        setTimeout(() => {
          if (this.animationPhase === "hurt") {
            this.changePhase(this.previousPhase || "attack");
          }
        }, 1000); // 1000ms Hurt-Animation wie gewünscht
        break;
    }
  }

  // Überschreibt checkBottleHit mit angepassten Offsets für kleinere Größe
  checkBottleHit(bottle) {
    const offsetX = 20; // Kleinere Offsets für Mini-Endboss
    const offsetY = 20;

    if (
      !this.isDead() &&
      bottle.isCollidingInner(this, offsetX, offsetY) &&
      !bottle.hasHitGround
    ) {
      console.log('Mini-Endboss hit! HP before:', this.hp);
      this.hitMiniEndboss(); // Eigene Methode für Mini-Endboss
      bottle.hasHitGround = true;
      bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
      console.log('Mini-Endboss HP after hit:', this.hp);
    }
  }

  // Eigene Hit-Methode für Mini-Endbosse (beeinflusst nicht die Endboss-Statusbar)
  hitMiniEndboss() {
    if (this.animationPhase === "hurt" || this.isDead()) return;

    const damage = 20; // Mini-Endboss hat 60 HP und soll in 3 Treffern sterben (60÷20=3)
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;

    this.lastHit = new Date().getTime();
    this.changePhase("hurt");

    console.log(`Mini-Endboss Hit! HP: ${this.hp}/${this.maxHp} (Schaden: ${damage})`);

    // Mini-Endbosse beeinflussen NICHT die Endboss-Statusbar

    if (this.hp === 0) {
      this.changePhase("dead");
      this.deathProcessed = false;
    }
  }

  // Überschreibt die Sterbe-Logik
  die() {
    console.log(`Mini-Endboss ${this.id} stirbt`);
    this.dead = true;
    this.changePhase("dead");
    this.frameCount = 0; // Reset für Dead-Animation
    
    if (this.directionInterval) {
      clearInterval(this.directionInterval);
    }
  }

  // Deaktiviert Enemy-Spawning
  spawnEnemyBehind() {
    // Mini-Endboss spawnt keine zusätzlichen Enemies
  }

  // Entfernt diesen Mini-Endboss direkt aus dem World-Array
  removeSelfFromWorld() {
    if (this.world && this.world.level && this.world.level.miniEndbosses) {
      const index = this.world.level.miniEndbosses.indexOf(this);
      if (index > -1) {
        this.world.level.miniEndbosses.splice(index, 1);
        console.log(`Mini-Endboss ${this.id} erfolgreich aus Array entfernt. Verbleibende: ${this.world.level.miniEndbosses.length}`);
      }
    }
  }
}
