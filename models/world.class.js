class World {
  character = new Character();
  level = level1;
  canvas;
  bottle = new Bottle();
  ctx;
  keyboard;
  a;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();

  constructor(canvas, keyboard) {
    // Der Konstruktor wird beim Erstellen eines neuen World-Objekts aufgerufen
    this.ctx = canvas.getContext("2d"); // Holt sich den 2D-Zeichenkontext vom Canvas-Element
    this.canvas = canvas; // Speichert das Canvas-Element als Eigenschaft
    this.keyboard = keyboard; // Speichert die Tastatur-Objekt als Eigenschaft
    this.draw(); // Startet die Zeichenfunktion (Animation)
    this.setWorld(); // Setzt die Welt für die Charaktere und Objekte
    this.checkCollisions(); // Überprüft Kollisionen zwischen Objekten
  }

  setWorld() {
    this.character.world = this;

    this.bottle.world = this;

    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.level.clouds.forEach((clouds) => {
      clouds.world = this;
    });
    this.level.backgroundObject.forEach((background) => {
      background.world = this;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);

    
    this.ctx.translate(-this.camera_x, 0); //BACK
    // ---- space for fixed objects ----
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.ctx.translate(this.camera_x, 0); //FORWARD

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addToMap(this.bottle);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.hp);
        }
      });
    }, 200);
  }
}
