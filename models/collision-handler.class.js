class CollisionHandler {
  constructor(world) {
    this.world = world;
  }

  checkAll() {
    this.checkEnemies();
    this.checkBottles();
    this.checkCoins();
    this.checkHitEnemies();
  }

checkEnemies() {
  this.world.level.enemies.forEach((enemy) => {
    if (this.world.character.isColliding(enemy) && !enemy.isDead()) {
      const isAbove = this.world.character.speedY > 0;

      if (isAbove) {
        enemy.hit();
        this.world.character.jump(); // immer wieder springen erlaubt
      } else {
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.hp);
      }
    }
  });
}


checkHitEnemies() {
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
      const percentage = (this.world.bottleCount / maxBottles) * 100;
      this.world.statusBarBottles.setPercentage(percentage);
      return false; // Bottle wird entfernt (eingesammelt)
    }

    return true; // bleibt auf der Map
  });
}

  checkCoins() {
    this.world.coins = this.world.coins.filter((coin) => {
      if (this.world.character.isColliding(coin)) {
        this.increaseBar(this.world.statusBarCoins);
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