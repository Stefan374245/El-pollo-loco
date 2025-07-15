/**
 * Represents a smaller variant of the main boss enemy.
 * Inherits from Endboss but with reduced size and simplified behavior.
 * @class MiniEndboss
 * @extends Endboss
 */
class MiniEndboss extends Endboss {
  width = 80;
  height = 120;
  hp = 60;
  maxHp = 60;
  speed = 4.0;
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
    if (!this.animationInterval) {
      this.animationInterval = setInterval(() => {
        this.handleAnimation();
      }, 200);
    }

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
    if (!this.isVisible()) return;

    if (this.isDead() || this.animationPhase === "dead") {
      this.handleDeathAnimation();
      return;
    }

    this.playAnimation(this.animations[this.animationPhase]);
    this.frameCount++;

    if (this.frameCount >= this.animations[this.animationPhase].length) {
      this.handlePhaseTransition();
    }
  }

  /**
   * Checks if the mini endboss is visible on screen
   * @returns {boolean} True if visible, false otherwise
   */
  isVisible() {
    return this.world && 
           this.x + this.width / 2 < -this.world.camera_x + this.world.canvas.width;
  }

  /**
   * Handles the death animation of the mini endboss
   */
  handleDeathAnimation() {
    this.playAnimation(this.animations.dead);
    this.frameCount++;

    if (
      this.frameCount >= this.animations.dead.length - 1 &&
      !this.deadAnimationComplete
    ) {
      this.deadAnimationComplete = true;
      setTimeout(() => {
        this.removeSelfFromWorld();
      }, 1000);
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
            this.changePhase(this.previousPhase || "walk");
          }
        }, 500);
        break;
    }
  }

  /**
   * Changes the animation phase of the mini endboss
   * @param {string} newPhase - The new animation phase to set
   */
  changePhase(newPhase) {
    this.previousPhase = this.animationPhase;
    this.animationPhase = newPhase;
    this.frameCount = 0;
    this.currentImage = 0;
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
      this.hitMiniEndboss();
      bottle.hasHitGround = true;
      bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
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
      }
    }
  }
}
