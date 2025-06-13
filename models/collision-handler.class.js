class CollisionHandler {
  constructor(world) {
    this.world = world;
  }

  checkAll() {
    this.checkEnemies();
    this.checkBottles();
    this.checkCoins();
  }

  checkEnemies() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.hp);
      }
    });
  }

  checkBottles() {
    this.world.bottles = this.world.bottles.filter((bottle) => {
      if (this.world.character.isColliding(bottle)) {
        this.increaseBar(this.world.statusBarBottles);
        return false;
      }
      return true;
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

  increaseBar(bar, amount = 10) {
    bar.percentage = Math.min(bar.percentage + amount, 100);
    bar.setPercentage(bar.percentage);
  }
}
