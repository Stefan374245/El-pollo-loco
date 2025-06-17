class CollisionHandler {
  constructor(world) {
    this.world = world;
  }

  checkAll() {
    this.checkEnemiesCollision();
    this.checkBottles();
    this.checkCoins();
    this.checkBottleHits();
  }

  checkEnemiesCollision() {
    const offsetX = 10;
    const offsetY = 10;

    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy, offsetX, offsetY) && !enemy.isDead()) {

        const isAbove = this.isAboveEnemy(this.world.character, enemy);

        if (isAbove) {
          enemy.hit();
          this.world.character.snapToGround();
          this.world.character.jump();
        } else {
          this.world.character.hit();
          this.world.statusBar.setPercentage(this.world.character.hp);
        }
      }
    });
  }

  isAboveEnemy(character, enemy) {
  return character.speedY > 0 &&
  character.y + character.height <= enemy.y + enemy.height;
  }

  checkBottleHits() {
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
        if (this.world.endboss && bottle.isColliding(this.world.endboss, offsetX, offsetY) && !this.world.endboss.isDead()) {
            this.world.endboss.hit();
            bottle.hasHitGround = true;
            this.world.statusBarEndboss.setPercentage(this.world.endboss.hp);
        }
    });
  }

  checkBottles() {
    const offsetX = 10
    const offsetY = 10;
    const maxBottles = 5;

    this.world.level.bottles = this.world.level.bottles.filter((bottle) => {
      const canPickUp = this.world.bottleCount < maxBottles;
      const isColliding = this.world.character.isColliding(bottle, offsetX, offsetY);

      if (isColliding && canPickUp) {
        this.world.bottleCount++;
        this.increaseBar(this.world.statusBarBottles, 100 / maxBottles);
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
        return false;
      }
      return true;
    });
  }

  increaseBar(bar, amount = 0) {
    bar.percentage = Math.min(bar.percentage + amount, 100);
    bar.setPercentage(bar.percentage);
  }
}
