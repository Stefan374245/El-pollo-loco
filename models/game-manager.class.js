// === game-manager.class.js ===
const audioManager = new AudioManager();
let gameManager;

window.onload = () => {
  gameManager = new GameManager();
  window.gameManager = gameManager; 
  gameManager.showStartScreenOverlay();
};

class GameManager {
  constructor() {
    this.gameRunning = false;
    this.currentWorld = null;
    this.keyboard = new KeyBoard();
    this.canvas = document.getElementById("canvas");
    this.currentLevel = 1;
  }

  showStartScreenOverlay() {

     this.clearWorld();
  
    this.prepareCanvas(false);
    const footer = document.querySelector("footer");
    if (this.isMobile() && footer) {
      footer.style.display = "none";
    } else if (footer) {
      footer.style.display = "";
    }
    if (this.isMobile()) {
      this.currentWorld = new MobileWorld(this.canvas, this.keyboard);
      window.mobileWorld = this.currentWorld;
    } else {
      const startScreen = document.getElementById("startScreen");
      startScreen.innerHTML = startScreenOverlayTemplate();
      startScreen.classList.add("active");
    }
  }

  handleStart() {
    const startscreen = audioManager.tracks["startscreen"];
    const startBtn = audioManager.tracks[`level${this.currentLevel}`];
     const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";

    try {
      startscreen.pause();
      startBtn.currentTime = 0;
      startBtn.volume = 0.6;
      startBtn.play().catch(error => {
        console.log('Audio autoplay prevented:', error);
      });
    } catch (error) {
      console.log('Audio error:', error);
    }

    setTimeout(() => {
      this.closeOverlay();
      this.startGame();
      this.fadeInCanvas();
    }, 500);
  }

  startGame(levelNumber = 1) {
    this.gameRunning = true;
    this.currentLevel = levelNumber;

    audioManager.playLevelMusic(levelNumber);

    const startScreen = document.getElementById("startScreen");
    startScreen.classList.remove("active");
    startScreen.innerHTML = "";
    startScreen.style.display = "none";

    document.getElementById("endScreen").classList.remove("active");
    document.getElementById("playScreen").classList.add("active");

    if (typeof showDesktopMuteButton === 'function') {
      showDesktopMuteButton();
      if (typeof updateMuteButton === 'function') {
        updateMuteButton();
      }
    }

      if (this.isMobile()) {
      document.getElementById("mobileControls").classList.add("active");
      setupMobileTouchControls(this.keyboard);
    } else {
      document.getElementById("mobileControls").classList.remove("active");
    }
    this.prepareCanvas(true);
    this.clearWorld();

    if (this.isMobile()) {
      this.currentWorld = new MobileWorld(
        this.canvas,
        this.keyboard,
        levelNumber
      );
      window.mobileWorld = this.currentWorld;
    } else {
      this.currentWorld = new World(
        this.canvas,
        this.keyboard,
        levelNumber
      );
    }

    const boss = this.currentWorld.level?.endboss;
    if (boss) {
      boss.onDeathComplete = () => {
        this.completeLevel();
      };
    }
  }

  prepareCanvas(visible) {
    this.canvas.style.display = visible ? "block" : "none";
    this.canvas.style.opacity = visible ? "1" : "0";
    this.canvas.style.visibility = visible ? "visible" : "hidden";
    this.canvas.style.zIndex = "10";
  }

  triggerEndScreen(isWin) {
    this.stopGame();
    const canvas = document.getElementById("canvas");
    const endScreen = document.getElementById("endScreen");

    canvas.style.filter = "blur(5px)";
    endScreen.classList.add("active");

   endScreen.innerHTML = getFinalEndScreenTemplate(isWin);
  this.addRestartButton();
}

  showFinalEndScreen(isWin) {
    const endScreen = document.getElementById("endScreen");
    endScreen.innerHTML = getFinalEndScreenTemplate(isWin);
    this.addRestartButton();
  }

  addRestartButton() {
    const restart = document.getElementById("restartContainer");
    restart.innerHTML = getRestartSVG();
    restart.classList.add("slide-in");
    this.addRestartHandler();
  }

  addRestartHandler() {
    const svgText = document.querySelector("#gameOverSVG");
    if (svgText) {
      svgText.addEventListener("click", () => this.handleRestart());
    }
  }

  handleRestart() {
    this.restartGame();
    this.showStartScreenOverlay();
    this.fadeInCanvas();
  }

  restartGame() {
    this.stopGame();
    this.showStartScreenOverlay();

    const startScreen = document.getElementById("startScreen");
    const playScreen = document.getElementById("playScreen");
    const endScreen = document.getElementById("endScreen");
    const controls = document.getElementById("mobileControls");

    startScreen.classList.add("active");
    startScreen.style.display = "flex";
    startScreen.style.visibility = "visible";

    playScreen.classList.remove("active");
    endScreen.classList.remove("active");
    this.prepareCanvas(false);
    controls.classList.remove("active");
    document.getElementById("background").classList.add("blur");
  }

  stopGame() {
    this.gameRunning = false;
    this.stopAllSounds();
      if (this.currentWorld) {
    if (this.currentWorld.runInterval) {
      clearInterval(this.currentWorld.runInterval);
    }
  }
    this.clearWorld();
    this.canvas.style.filter = "";
    document.getElementById("mobileControls").classList.remove("active");

    if (typeof hideDesktopMuteButton === 'function') {
      hideDesktopMuteButton();
    }
  }

  stopAllSounds() {
    audioManager.stopAll();
  }

clearWorld() {
  if (!this.currentWorld) return;

  clearInterval(this.currentWorld.collisionInterval);
  clearInterval(this.currentWorld.throwInterval);
  clearInterval(this.currentWorld.runInterval);


  const clearEntityIntervals = (entity) => {
    if (!entity) return;
    clearInterval(entity.animationInterval);
    clearInterval(entity.moveInterval);
    clearInterval(entity.directionInterval);
  };

  const level = this.currentWorld.level;
  if (level) {
    level.enemies?.forEach(clearEntityIntervals);
    clearEntityIntervals(level.endboss);
    level.miniEndbosses?.forEach(clearEntityIntervals);
  }
  
  clearEntityIntervals(this.currentWorld.character);

  if (this.currentWorld.handleCanvasClick) {
    this.canvas.removeEventListener("click", this.currentWorld.handleCanvasClick);
  }
  if (this.currentWorld.handleCanvasMouseMove) {
    this.canvas.removeEventListener("mousemove", this.currentWorld.handleCanvasMouseMove);
  }

  this.currentWorld = null;
}


  closeOverlay() {
    document.getElementById("startScreen").innerHTML = "";
  }


  fadeInCanvas() {
    this.canvas.style.opacity = 1;
  }

  completeLevel() {
    if (this.currentLevel === 1) {
      this.showLevelComplete();
    } else {
      this.triggerEndScreen(true);
    }
  }

  showLevelComplete() {
    this.stopGame();
    const canvas = document.getElementById("canvas");
    const endScreen = document.getElementById("endScreen");

    canvas.style.filter = "blur(5px)";
    endScreen.classList.add("active");
    audioManager.play("nextLvl", false, 0.5);
    endScreen.innerHTML = getLevelCompleteTemplate();

    setTimeout(() => {
      this.closeLevelComplete();
      this.startLevel2();
    }, 3000);
  }

  closeLevelComplete() {
    const canvas = document.getElementById("canvas");
    const endScreen = document.getElementById("endScreen");

    canvas.style.filter = "";
    endScreen.classList.remove("active");
  }

  startLevel2() {
    this.currentLevel = 2;
    this.startGame(2);
  }

  isMobile() {
    return (
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.userAgent.toLowerCase().includes("mobile")
    );
  }
}

function showSettings() {
  document.getElementById("startScreen").innerHTML = settingsOverlayTemplate();
}

function backToStartScreen() {
  const startScreen = document.getElementById("startScreen");
  if (gameManager && gameManager.isMobile()) {
    startScreen.innerHTML = getMobileStartScreenTemplate();
  } else {
    startScreen.innerHTML = startScreenOverlayTemplate();
  }
}

function handleGameOver() {
  gameManager.triggerEndScreen(false);
}
