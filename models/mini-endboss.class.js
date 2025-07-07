/**
 * Represents a smaller variant of the main boss enemy.
 * Inherits from Endboss but with reduced size and simplified behavior.
 * @class MiniEndboss
 * @extends Endboss
 */
class MiniEndboss extends Endboss {
  /** @type {number} Width of the mini endboss */
  width = 80;
  /** @type {number} Height of the mini endboss */
  height = 120;
  /** @type {number} Health points of the mini endboss */
  hp = 60;
  /** @type {number} Maximum health points */
  maxHp = 60;
  /** @type {number} Movement speed */
  speed = 4.0;
  /** @type {number} Damage dealt per hit */
  damagePerHit = 20;

  /**
   * Creates a new MiniEndboss instance
   * @param {number} [x=1200] - X-coordinate position
   */
  constructor(x = 1200) {
    super(1);
    this.x = x;
    this.y = 320;
    this.animationPhase = "walk";
    this.otherDirection = false;
    this.deadAnimationComplete = false;
    this.frameCount = 0;
    this.id = null;

    this.hp = 60;
    this.maxHp = 60;
  }

  /**
   * Updates the direction of the mini endboss based on character position
   * Moves towards the character
   */
  updateDirection() {
    if (
      this.world &&
      this.world.character &&
      !this.isDead() &&
      this.animationPhase !== "hurt"
    ) {
      const characterX = this.world.character.x;
      const bossX = this.x;

      this.otherDirection = characterX > bossX;

      if (characterX > bossX) {
        this.moveRight();
      } else if (characterX < bossX) {
        this.moveLeft();
      }
    }
  }

  /**
   * Animates the mini endboss by updating the animation phase
   * and handling the animation timing
   */
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
      if (!this.isDead() && this.animationPhase !== "hurt") {
        this.updateDirection();
      }
    }, 100);
  }

  /**
   * Handles the animation phases of the mini endboss
   * Plays the corresponding animation based on the current phase
   */
  handleAnimation() {
    if (this.isDead() || this.animationPhase === "dead") {
      this.playAnimation(this.animations.dead);

      if (
        this.frameCount >= this.animations.dead.length - 1 &&
        !this.deadAnimationComplete
      ) {
        this.deadAnimationComplete = true;
        console.log(`Mini-Endboss ${this.id} Dead-Animation abgeschlossen`);
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

  /**
   * Handles the transition between different animation phases
   * Defines the behavior and timing of each phase
   */
  handlePhaseTransition() {
    this.frameCount = 0;

    switch (this.animationPhase) {
      case "alert":
        break;

      case "attack":
        this.attackCount++;
        this.phaseStep++;
        this.changePhase("walk");
        break;

      case "walk":
        const walkDuration = 1500;
        setTimeout(() => {
          this.phaseStep++;
          this.changePhase("attack");
        }, walkDuration);
        break;

      case "hurt":
        setTimeout(() => {
          if (this.animationPhase === "hurt") {
            this.changePhase(this.previousPhase || "attack");
          }
        }, 1000);
        break;
    }
  }

  /**
   * Checks if a bottle hit the mini endboss using precise collision detection
   * @param {Object} bottle - The bottle object to check collision with
   */
  checkBottleHit(bottle) {
    const config = CollisionConfig.getOffsets();
    const hitOffsets = config.miniEndboss.precise;

    if (
      !this.isDead() &&
      CollisionConfig.isPreciseCollision(
        bottle,
        this,
        config.throwableBottle.hit,
        hitOffsets
      ) &&
      !bottle.hasHitGround
    ) {
      console.log("Mini-Endboss hit! HP before:", this.hp);
      this.hitMiniEndboss();
      bottle.hasHitGround = true;
      bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
      console.log("Mini-Endboss HP after hit:", this.hp);
    }
  }

  /**
   * Custom hit method for mini endbosses
   * Applies damage and handles the hurt and death phases
   */
  hitMiniEndboss() {
    if (this.animationPhase === "hurt" || this.isDead()) return;

    const damage = 20;
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;

    this.lastHit = new Date().getTime();
    this.changePhase("hurt");

    console.log(
      `Mini-Endboss Hit! HP: ${this.hp}/${this.maxHp} (Schaden: ${damage})`
    );

    if (this.hp === 0) {
      this.changePhase("dead");
      this.deathProcessed = false;
    }
  }

  /**
   * Custom death logic for the mini endboss
   * Stops movement and plays the death animation
   */
  die() {
    console.log(`Mini-Endboss ${this.id} stirbt`);
    this.dead = true;
    this.changePhase("dead");
    this.frameCount = 0;

    if (this.directionInterval) {
      clearInterval(this.directionInterval);
    }
  }

  /**
   * Prevents enemy spawning behind the mini endboss
   * Overrides the spawnEnemyBehind method from Endboss
   */
  spawnEnemyBehind() {
  }

  /**
   * Removes this mini endboss instance from the world
   * Overrides the removeSelfFromWorld method from Endboss
   */
  removeSelfFromWorld() {
    if (this.world && this.world.level && this.world.level.miniEndbosses) {
      const index = this.world.level.miniEndbosses.indexOf(this);
      if (index > -1) {
        this.world.level.miniEndbosses.splice(index, 1);
        console.log(
          `Mini-Endboss ${this.id} erfolgreich aus Array entfernt. Verbleibende: ${this.world.level.miniEndbosses.length}`
        );
      }
    }
  }
}
