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
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy) && !enemy.isDead()) {
        
        if (this.isStomping(enemy)) {
          enemy.hit();
          d
          this.world.character.jump();
        } else {
          this.world.character.hit();
          this.world.statusBar.setPercentage(this.world.character.hp);
        }
      }
    });
  }

  isStomping(enemy) {
    return (
      this.world.character.speedY > 0 &&
      this.world.character.y + this.world.character.height / 2 <
        enemy.y + enemy.height / 2
    );
  }

  checkBottleHits() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && bottle.isColliding(enemy)) {
          enemy.hit();
          bottle.hasHitGround = true;
          bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);
        }
      });
    });
  }

  checkBottles() {
    const maxBottles = 5;

    this.world.level.bottles = this.world.level.bottles.filter((bottle) => {
      const canPickUp = this.world.bottleCount < maxBottles;
      const isColliding = this.world.character.isColliding(bottle);

      if (isColliding && canPickUp) {
        this.world.bottleCount++;
        this.increaseBar(this.world.statusBarBottles, 100 / maxBottles);
        return false;
      }

      return true;
    });
  }

  checkCoins() {
    this.world.level.coins = this.world.level.coins.filter((coin) => {
      if (this.world.character.isColliding(coin)) {
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
