// === gameManager.class.js ===

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
    AUDIO_STARTSCREEN.loop = true;
    AUDIO_STARTSCREEN.volume = 0.5;
    AUDIO_STARTSCREEN.play().catch(e => {
      console.warn("Autoplay blockiert, klicke irgendwo aufs Fenster", e);
    });
  }

  showStartScreenOverlay() {
    document.getElementById("overlayContainer").innerHTML = startScreenOverlayTemplate();
  }

  handleStart() {
    AUDIO_STARTSCREEN.pause();
    AUDIO_START_BTN.currentTime = 0;
    AUDIO_START_BTN.volume = 0.6;
    AUDIO_START_BTN.play();

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
    const lvl = this.currentWorld?.level;
    [lvl?.AUDIO_STARTGAME, lvl?.AUDIO_SNORING, lvl?.AUDIO_WHISTLE, lvl?.AUDIO_JUMP, AUDIO_STARTSCREEN]
      .filter(Boolean)
      .forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
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
