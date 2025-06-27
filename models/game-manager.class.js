// === gameManager.class.js ===
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
    this.canvas = document.getElementById('canvas');
    this.currentLevel = 1; // Level-Tracking hinzufügen
    this.playStartScreenAudio();
  }

playStartScreenAudio() {
  const startscreen = audioManager.tracks['startscreen'];
  startscreen.loop = true;
  startscreen.volume = 0.5;
  startscreen.play().catch(e => {
    console.warn("Autoplay blockiert, klicke irgendwo aufs Fenster", e);
  });
}

  showStartScreenOverlay() {
    document.getElementById("overlayContainer").innerHTML = startScreenOverlayTemplate();
  }

handleStart() {
  const startscreen = audioManager.tracks['startscreen'];
  const startBtn = audioManager.tracks['startgame']; // oder: audioManager.tracks['startbtn'] wenn du getrennte hast

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
    this.clearWorld();
    this.gameRunning = true;
    this.currentLevel = levelNumber;

    document.getElementById("startScreen").classList.remove("active");
    document.getElementById("playScreen").classList.add("active");
    document.getElementById("endScreen").classList.remove("active");

    this.currentWorld = new World(this.canvas, this.keyboard, levelNumber);
  }

  triggerEndScreen(isWin) {
    this.stopGame();

    const canvas = document.getElementById('canvas');
    const endScreen = document.getElementById('endScreen');

    canvas.style.filter = 'blur(5px)';
    endScreen.classList.add('active');
    endScreen.innerHTML = getFirstEndScreenTemplate(isWin);

    setTimeout(() => {
      this.showFinalEndScreen(isWin);
    }, 3000);
  }

  showFinalEndScreen(isWin) {
    const endScreen = document.getElementById('endScreen');
    endScreen.innerHTML = getFinalEndScreenTemplate(isWin);
    this.addRestartButton();
  }

  addRestartButton() {
    const restart = document.getElementById('restartContainer');
    restart.innerHTML = getRestartSVG();
    restart.classList.add('slide-in');
    this.addRestartHandler();
  }

  addRestartHandler() {
    const svgText = document.querySelector('#gameOverSVG');
    if (svgText) {
      svgText.addEventListener('click', () => this.handleRestart());
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

    document.getElementById("startScreen").classList.add("active");
    document.getElementById("playScreen").classList.remove("active");
    document.getElementById("endScreen").classList.remove("active");
  }

  stopGame() {
    this.gameRunning = false;
    this.stopAllSounds();
    this.clearWorld();

    const canvas = document.getElementById('canvas');
    canvas.style.filter = '';
  }

stopAllSounds() {
  audioManager.stopAll();
}

  clearWorld() {
    if (this.currentWorld) {
      clearInterval(this.currentWorld.collisionInterval);
      clearInterval(this.currentWorld.throwInterval);
      this.currentWorld = null;
    }
  }

  closeOverlay() {
    document.getElementById("overlayContainer").innerHTML = "";
  }

  fadeInCanvas() {
    document.getElementById("canvas").style.opacity = 1;
  }

  /**
   * Behandelt Level-Abschluss
   */
  completeLevel() {
    if (this.currentLevel === 1) {
      // Nach Level 1 kommt Level 2
      this.showLevelComplete();
    } else {
      // Nach Level 2 ist das Spiel gewonnen
      this.triggerEndScreen(true);
    }
  }

  /**
   * Zeigt Level-Complete-Screen
   */
  showLevelComplete() {
    this.stopGame();
    
    const canvas = document.getElementById('canvas');
    const endScreen = document.getElementById('endScreen');

    canvas.style.filter = 'blur(5px)';
    endScreen.classList.add('active');
    endScreen.innerHTML = getLevelCompleteTemplate();

    // Level 2 nach 3 Sekunden starten
    setTimeout(() => {
      this.closeLevelComplete();
      this.startLevel2();
    }, 3000);
  }

  /**
   * Schließt Level-Complete-Screen
   */
  closeLevelComplete() {
    const canvas = document.getElementById('canvas');
    const endScreen = document.getElementById('endScreen');
    
    canvas.style.filter = '';
    endScreen.classList.remove('active');
  }

  /**
   * Startet Level 2
   */
  startLevel2() {
    this.currentLevel = 2;
    this.startGame(2);
  }
}

// === Globale Funktionen ===
function showSettings() {
  document.getElementById("overlayContainer").innerHTML = settingsOverlayTemplate();
}

function backToStartScreen() {
  document.getElementById("overlayContainer").innerHTML = startScreenOverlayTemplate();
}

function handleGameOver() {
  gameManager.triggerEndScreen(false);
}
