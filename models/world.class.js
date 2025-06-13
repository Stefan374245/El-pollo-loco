class World {
  character = new Character();
  level = level1;
  canvas;
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
    this.setWorld(); // Setzt die Welt für die Charaktere und Objekte

    this.collisionHandler = new CollisionHandler(this);
    this.startCollisionCheck();
    this.draw(); // Startet die Zeichenfunktion (Animation)
  }

  setWorld() {
    this.character.world = this;

    this.initCoins();
    this.initBottles();

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
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); //BACK
    // ---- space for fixed objects ----
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.ctx.translate(this.camera_x, 0); //FORWARD

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.coins);

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

  createObjects(ClassRef, count, spacing, offset = 0) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const obj = new ClassRef();
      obj.x = offset + i * spacing;
      result.push(obj);
    }
    return result;
  }

  initCoins() {
    const createCoinSet = (xOffset) => {
      return this.createObjects(Coins, 5, (i, count) => ({
        x: xOffset + i * 40,
        y: 200 - Math.sin((i / (count - 1)) * Math.PI) * 64,
      }));
    };

    const set1 = createCoinSet(200);
    const set2 = createCoinSet(1000);

    this.coins = [...set1, ...set2];
    this.coins.forEach((c) => (c.world = this));
  }

  initBottles() {
    this.bottles = this.createObjects(Bottle, 6, () => ({
      x: 300 + Math.random() * 1500,
      y: 396,
    }));
    this.bottles.forEach((b) => (b.world = this));
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

  createObjects(ClassRef, count, position) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const obj = new ClassRef();
      const { x, y } = position(i, count);
      obj.x = x;
      obj.y = y;
      result.push(obj);
    }
    return result;
  }

  startCollisionCheck() {
    setInterval(() => {
      this.collisionHandler.checkAll();
    }, 100);
  }
}
