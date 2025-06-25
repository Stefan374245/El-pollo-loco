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

  startGame() {
    this.clearWorld();
    this.gameRunning = true;

    document.getElementById("startScreen").classList.remove("active");
    document.getElementById("playScreen").classList.add("active");
    document.getElementById("endScreen").classList.remove("active");

    this.currentWorld = new World(this.canvas, this.keyboard);
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
