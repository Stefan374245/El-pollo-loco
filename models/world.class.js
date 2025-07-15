/**
 * Main class for the game world that manages all game objects and their interactions
 * Handles rendering, collision detection, and game state management
 * @class World
 */
class World {
  character;
  level;
  canvas;
  ctx;
  keyboard;
  bottleCount;
  camera_x;
  statusBar;
  statusBarCoins;
  statusBarBottles;
  statusBarEndboss;
  throwableObjects;
  collisionHandler;
  canThrow;

  /**
   * Creates a new game world instance
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering
   * @param {Object} keyboard - Keyboard input handler
   * @param {number} [levelNumber=1] - The number of the level to load
   */
  constructor(canvas, keyboard, levelNumber = 1) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.levelNumber = levelNumber;

    this.init();
    this.setWorld();
    this.startCollisionCheck();
    this.startThrowCheck();
    this.draw();
  }

  /**
   * Initializes the game world with all required objects
   * Loads the appropriate level and creates all game objects
   */
  init() {
    if (this.levelNumber === 2) {
      this.level = NewLevelManager.createLevel2();
      this.level.level_end_point = 3500;
    } else {
      this.level = NewLevelManager.createLevel1();
      this.level.level_end_point = 2500;
    }

    this.character = new Character();
    this.statusBar = new StatusBar();
    this.statusBarCoins = new StatusBarCoins();
    this.statusBarBottles = new StatusBarBottles();

    const endbossMaxHp = this.level.endboss.maxHp;
    this.statusBarEndboss = new StatusBarEndboss(endbossMaxHp);

    this.throwableObjects = [];
    this.collisionHandler = new CollisionHandler(this);
    this.bottleCount = 0;
    this.camera_x = 0;
    this.canThrow = true;

    this.bossOverlay = new TextOverlay(
      "BOSS FIGHT!",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.isBossFightActive = false;
  }

  /**
   * Links all game objects with the world and starts their animations
   * Sets the world reference for all level objects
   */
  setWorld() {
    this.character.world = this;
    this.character.setAudioManager(audioManager);
    this.character.animate();

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

    this.level.endboss.world = this;
    this.level.endboss.animate();

    this.initializeMiniEndbosses();

    this.initializeStatusBars();
  }

  /**
   * Main drawing loop - renders all game objects to the canvas
   * Uses requestAnimationFrame for smooth animation
   */
  draw() {
    if (!gameManager.gameRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    if (this.level.miniEndbosses) {
      this.addObjectsToMap(this.level.miniEndbosses);
    }

    this.ctx.translate(-this.camera_x, 0);

    if (this.isBossFightActive) {
      this.addToMap(this.bossOverlay);
    }

    if (this.character.x + this.character.width >= this.level.endboss.x - 400) {
      this.addToMap(this.statusBarEndboss);
    }
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);

    if (gameManager.gameRunning) {
      requestAnimationFrame(() => {
        this.draw();
      });
    }
  }

  /**
   * Adds an array of objects to the drawing queue
   * @param {MovableObject[]} objects - Array of objects to be drawn
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object to the canvas
   * Handles mirroring for objects with otherDirection flag
   * @param {MovableObject} mo - The movable object to be drawn
   */
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

  /**
   * Mirrors an image horizontally for display
   * @param {MovableObject} mo - The object to be mirrored
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the original image orientation
   * @param {MovableObject} mo - The object whose mirroring is to be undone
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Starts the regular collision checking
   * Clears previous intervals and creates a new one every 10ms
   */
  startCollisionCheck() {
    if (this.collisionInterval) {
      clearInterval(this.collisionInterval);
    }
    this.collisionInterval = setInterval(() => {
      if (gameManager.gameRunning) {
        this.collisionHandler.checkAll();
      }
    }, 10);
  }

  /**
   * Checks if the player wants to throw a bottle and can do so
   * Creates new ThrowableObject instance on valid input
   * Only throws once per key press using canThrow flag
   */
  checkThrowableObjects() {
    if (this.isBossFightActive) {
      return;
    }

    if (this.keyboard.F && this.bottleCount > 0 && this.canThrow) {
      const direction = this.character.otherDirection;

      const bottle = new ThrowableObject(
        this.character.x + this.character.width / 2,
        this.character.y + this.character.height / 2,
        direction
      );

      this.throwableObjects.push(bottle);

      audioManager.play("throwBottle");

      this.bottleCount--;

      const maxBottles = 5;
      const percentage = (this.bottleCount / maxBottles) * 100;
      this.statusBarBottles.setPercentage(percentage);

      this.canThrow = false;
    }

    if (!this.keyboard.F) {
      this.canThrow = true;
    }
  }

  /**
   * Starts the regular checking for throwable objects
   * Clears previous intervals and creates a new one every 200ms
   */
  startThrowCheck() {
    if (this.throwInterval) {
      clearInterval(this.throwInterval);
    }
    this.throwInterval = setInterval(() => {
      if (gameManager.gameRunning) {
        this.checkThrowableObjects();
      }
    }, 200);
  }

  /**
   * Initializes all mini endbosses in the level
   * Sets world reference, unique IDs and starts animations
   */
  initializeMiniEndbosses() {
    if (this.level.miniEndbosses) {
      this.level.miniEndbosses.forEach((miniEndboss, index) => {
        miniEndboss.world = this;
        miniEndboss.id = `miniEndboss_${index}_${Date.now()}`;
        miniEndboss.animate();
      });
    }
  }

  /**
   * Initializes all status bars with current values
   * Sets initial HP values for endboss status bar
   */
  initializeStatusBars() {
    if (this.statusBarEndboss.updateFromHpValues) {
      this.statusBarEndboss.updateFromHpValues(
        this.level.endboss.hp,
        this.level.endboss.maxHp
      );
    } else {
      const initialPercentage =
        (this.level.endboss.hp / this.level.endboss.maxHp) * 100;
      this.statusBarEndboss.setPercentage(initialPercentage);
    }
  }
}
