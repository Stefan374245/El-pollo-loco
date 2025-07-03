// === game-manager.class.js ===
const audioManager = new AudioManager();
let gameManager;

window.onload = () => {
  gameManager = new GameManager();
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

    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";

    this.prepareCanvas(false);

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
    const startBtn = audioManager.tracks["startgame"];

    startscreen.pause();
    startBtn.currentTime = 0;
    startBtn.volume = 0.6;
    startBtn.play();

    setTimeout(() => {
      this.closeOverlay();
      this.startGame();
      this.fadeInCanvas();
    }, 500);
  }

startGame(levelNumber = 1) {
  this.gameRunning = true;
  this.currentLevel = levelNumber;

  const startScreen = document.getElementById("startScreen");
  startScreen.classList.remove("active");
  startScreen.innerHTML = "";
  startScreen.style.display = "none";

  document.getElementById("endScreen").classList.remove("active");
  document.getElementById("playScreen").classList.add("active");
  document.getElementById("mobileControls").classList.add("active");

  setupMobileTouchControls(this.keyboard);

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
    this.currentWorld = new World(this.canvas, this.keyboard, levelNumber);
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
    endScreen.innerHTML = getFirstEndScreenTemplate(isWin);

    setTimeout(() => {
      this.showFinalEndScreen(isWin);
    }, 3000);
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
    this.clearWorld();
    this.canvas.style.filter = "";
    document.getElementById("mobileControls").classList.remove("active");
  }

  stopAllSounds() {
    audioManager.stopAll();
  }

  clearWorld() {
    if (this.currentWorld) {
      clearInterval(this.currentWorld.collisionInterval);
      clearInterval(this.currentWorld.throwInterval);

      if (this.currentWorld.handleCanvasClick) {
        this.canvas.removeEventListener(
          "click",
          this.currentWorld.handleCanvasClick
        );
      }
      if (this.currentWorld.handleCanvasMouseMove) {
        this.canvas.removeEventListener(
          "mousemove",
          this.currentWorld.handleCanvasMouseMove
        );
      }

      this.currentWorld = null;
    }
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
  document.getElementById("startScreen").innerHTML =
    startScreenOverlayTemplate();
}

function handleGameOver() {
  gameManager.triggerEndScreen(false);
}
