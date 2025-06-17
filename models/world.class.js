class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  bottleCount = 0;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  throwableObjects = [];
  collisionHandler = new CollisionHandler(this);
  canThrow = true;

  constructor(canvas, keyboard) {
    // Der Konstruktor wird beim Erstellen eines neuen World-Objekts aufgerufen
    this.ctx = canvas.getContext("2d"); // Holt sich den 2D-Zeichenkontext vom Canvas-Element
    this.canvas = canvas; // Speichert das Canvas-Element als Eigenschaft
    this.keyboard = keyboard; // Speichert die Tastatur-Objekt als Eigenschaft
    this.setWorld(); // Setzt die Welt für die Charaktere und Objekte

    this.startCollisionCheck();
    this.startThrowCheck();
    this.draw();
  }

  setWorld() {
    this.character.world = this;

    this.level.coins.forEach((coin) => {
      coin.world = this;
    });
    

    this.level.bottles.forEach((bottle) => {
      bottle.world = this;
    });

    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.level.clouds.forEach((clouds) => {
      clouds.world = this;
    });
    this.level.backgroundObjects.forEach((background) => {
      background.world = this;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); //BACK
    // ---- space for fixed objects ----
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.ctx.translate(this.camera_x, 0); //FORWARD

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

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


  startCollisionCheck() {
    setInterval(() => {
      this.collisionHandler.checkAll();
    }, 10);
  }

  checkThrowableObjects() {
    if (this.keyboard.F && this.bottleCount > 0 && this.canThrow) {
      const direction = this.character.otherDirection;

      const bottle = new ThrowableObject(
        this.character.x + this.character.width / 2,
        this.character.y + this.character.height / 2,
        direction
      );

      this.throwableObjects.push(bottle);

      this.bottleCount--;

      const maxBottles = 5;
      const percentage = (this.bottleCount / maxBottles) * 100;
      this.statusBarBottles.setPercentage(percentage);
      this.canThrow = false;
      setTimeout(() => {
        this.canThrow = true;
      }, 500);
    }
  }

  startThrowCheck() {
    this.throwInterval = setInterval(() => {
      this.checkThrowableObjects();
    }, 200);
  }
}
