class World {
  character = new Character();

  level = level1;

  canvas;
  bottle = new Bottle();
  statusBar = new statusBar();
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    // Der Konstruktor wird beim Erstellen eines neuen World-Objekts aufgerufen
    this.ctx = canvas.getContext('2d'); // Holt sich den 2D-Zeichenkontext vom Canvas-Element
    this.canvas = canvas; // Speichert das Canvas-Element als Eigenschaft
    this.keyboard = keyboard; // Speichert die Tastatur-Objekt als Eigenschaft
    this.draw(); // Startet die Zeichenfunktion (Animation)
    this.setWorld(); // Setzt die Welt für die Charaktere und Objekte
  }

  setWorld() {
    this.character.world = this;

    this.bottle.world = this;
    this.statusBar.world = this;
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
    // Löscht das gesamte Canvas, um jedes Frame neu zu zeichnen

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);

    this.addToMap(this.character);
    this.addToMap(this.bottle);
    this.addToMap(this.statusBar);

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

    
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx); 

    if (mo.otherDirection) {
      this.flipImage(mo);
    }


    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

}
