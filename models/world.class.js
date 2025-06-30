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

  constructor(canvas, keyboard, levelNumber = 1) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.levelNumber = levelNumber;

    this.init();
    this.setWorld();
    this.initAudio();
    this.startCollisionCheck();
    this.startThrowCheck();
    this.setupMuteButton();
    this.draw();
  }


  init() {
    if (this.levelNumber === 2) {
      this.level = NewLevelManager.createLevel2();
    } else {
      this.level = NewLevelManager.createLevel1();
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
  }

  setupMuteButton() {
    audioManager.setupMuteButton(this.canvas.width, this.canvas.height);
    
    this.canvas.removeEventListener('click', this.handleCanvasClick);
    this.canvas.removeEventListener('mousemove', this.handleCanvasMouseMove);
    
    this.handleCanvasClick = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (audioManager.isButtonClicked(mouseX, mouseY)) {
        audioManager.toggleGlobalMute();

        const icon = document.getElementById("music-toggle-icon");
        if (icon) {
          icon.src = audioManager.globalMuted
            ? "assets/icons/mute.svg"
            : "assets/icons/unmute.svg";
        }
      }
    };
    
    this.handleCanvasMouseMove = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      const isHovered = audioManager.isButtonClicked(mouseX, mouseY);
      audioManager.setButtonHovered(isHovered);
      
      this.canvas.style.cursor = isHovered ? 'pointer' : 'default';
    };
    
    this.canvas.addEventListener('click', this.handleCanvasClick);
    this.canvas.addEventListener('mousemove', this.handleCanvasMouseMove);
  }
  initAudio() {
    if (!audioManager.globalMuted) {
      audioManager.pause('startscreen');
      audioManager.play('startgame', true, 0.5);
    } else {
      audioManager.unmuteAll();
      
      const icon = document.getElementById("music-toggle-icon");
      if (icon) {
        icon.src = audioManager.globalMuted
          ? "assets/icons/mute.svg"
          : "assets/icons/unmute.svg";
      }
    }
  }
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

    const initialPercentage = (this.level.endboss.hp / this.level.endboss.maxHp) * 100;
    this.statusBarEndboss.setPercentage(initialPercentage);

    if (this.level.miniEndbosses) {
      this.level.miniEndbosses.forEach((miniEndboss, index) => {
        miniEndboss.world = this;
        miniEndboss.id = `miniEndboss_${index}_${Date.now()}`;
        miniEndboss.animate();
      });
    }
  }

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
    
    if (this.character.x + this.character.width >= this.level.endboss.x - 500) {
      this.addToMap(this.statusBarEndboss);
    }
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    
    audioManager.drawMuteButton(this.ctx);

      if (gameManager.gameRunning)  {
      requestAnimationFrame(() => {
        this.draw();
      });
    }
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
  if (this.collisionInterval) {
    clearInterval(this.collisionInterval);
  }
  this.collisionInterval = setInterval(() => {
     if (gameManager.gameRunning) {
      this.collisionHandler.checkAll();
    }
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

      audioManager.play('throwBottle');

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
  if (this.throwInterval) {
    clearInterval(this.throwInterval);
  }
  this.throwInterval = setInterval(() => {
     if (gameManager.gameRunning)  {
      this.checkThrowableObjects();
    }
  }, 200);
}
}
