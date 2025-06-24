class CollisionHandler {
  constructor(world) {
    this.world = world;
  }

  checkAll() {
    this.checkEnemiesCollision();
    this.checkBottles();
    this.checkCoins();
    this.checkBottleHitEnemy();
    this.checkCharacterHP(this.world.character);
    this.checkEndBossHP(this.world.level.endboss); 
  }

  checkEnemiesCollision() {
    const offsetX = 10;
    const offsetY = 10;

    this.world.level.enemies.forEach((enemy) => {
      if (
        this.world.character.isColliding(enemy, offsetX, offsetY) &&
        !enemy.isDead()
      ) {
        const isAbove = this.isAboveEnemy(this.world.character, enemy);

        if (isAbove) {
          enemy.hit();
          this.world.character.snapToGround();
          this.world.character.jump();
        } else {
          this.world.character.hitWithCooldown();
          this.world.statusBar.setPercentage(this.world.character.hp);
        }
      }
    });
    const boss = this.world.level.endboss;
    if (
      this.world.character.isColliding(boss, offsetX, offsetY) &&
      !boss.isDead()
    ) {
      this.world.character.hitWithCooldown();
      this.world.statusBar.setPercentage(this.world.character.hp);
    }
    this.checkCharacterHP(this.world.character);
  }

  checkCharacterHP(character) {
    if (character.hp <= 0 && !character.dead) {
      character.dead = true;
      gameManager.triggerEndScreen(false);
    }
  }

  checkEndBossHP(endboss) {
    if (endboss.hp <= 0 && !endboss.dead) {
      endboss.dead = true;
     gameManager.triggerEndScreen(true);
    }
  }

  isAboveEnemy(character, enemy) {
    return (
      character.speedY > 0 &&
      character.y + character.height <= enemy.y + enemy.height
    );
  }

  checkBottleHitEnemy() {
    const offsetX = 5;
    const offsetY = 5;

    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && bottle.isColliding(enemy, offsetX, offsetY)) {
          enemy.hit();
          bottle.hasHitGround = true;
          bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
        }
      });
      this.world.level.endboss.checkBottleHit(bottle);
    });
  }

  checkBottles() {
    const offsetX = 10;
    const offsetY = 10;
    const maxBottles = 5;

    this.world.level.bottles = this.world.level.bottles.filter((bottle) => {
      const canPickUp = this.world.bottleCount < maxBottles;
      const isColliding = this.world.character.isColliding(
        bottle,
        offsetX,
        offsetY
      );

      if (isColliding && canPickUp) {
        this.world.bottleCount++;
        this.increaseBar(this.world.statusBarBottles, 100 / maxBottles);

        this.world.level.AUDIO_PICKUP.play();
        if (this.world.bottleCount === maxBottles) {
          this.world.level.AUDIO_FULLBAR.play();
        }

        this.animateBarScale(this.world.statusBarBottles);
        return false;
      }

      return true;
    });
  }

  checkCoins() {
    const offsetX = 8;
    const offsetY = 8;

    this.world.level.coins = this.world.level.coins.filter((coin) => {
      if (this.world.character.isColliding(coin, offsetX, offsetY)) {
        this.increaseBar(this.world.statusBarCoins, 10);
        this.world.level.AUDIO_COIN.play();
        this.animateBarScale(this.world.statusBarCoins);
        return false;
      }
      return true;
    });
  }

  increaseBar(bar, amount = 0) {
    bar.percentage = Math.min(bar.percentage + amount, 100);
    bar.setPercentage(bar.percentage);
  }

  animateBarScale(bar) {
    if (this.barIsScaling) return;

    this.barIsScaling = true;

    const originalWidth = bar.width;
    const originalHeight = bar.height;
    const scaleUp = 1.15;

    bar.width = originalWidth * scaleUp;
    bar.height = originalHeight * scaleUp;

    setTimeout(() => {
      bar.width = originalWidth;
      bar.height = originalHeight;
      this.barIsScaling = false;
    }, 150);
  }

  /**
   * character.is
   * @param {*} mo MovableObject to check for collision
   * Checks if this object is colliding with another movable object
   * @returns
   */
  isColliding(mo, offsetX = 0, offsetY = 0) {
    return (
      this.x + this.width - offsetX > mo.x + offsetX &&
      this.y + this.height - offsetY > mo.y + offsetY &&
      this.x + offsetX < mo.x + mo.width - offsetX &&
      this.y + offsetY < mo.y + mo.height - offsetY
    );
  }
}
