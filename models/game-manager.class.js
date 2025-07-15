/**
 * @fileoverview Game Manager for El Pollo Loco game.
 * Handles game state, levels, screen transitions, and overall game flow control.
 * @author Stefan Helldobler
 * @version 1.0.0
 */

const audioManager = new AudioManager();
let gameManager;

window.onload = () => {
  gameManager = new GameManager();
  window.gameManager = gameManager;

  setTimeout(() => updateMuteIcon(), 100);

  gameManager.showStartScreenOverlay();
};

/**
 * Main game manager that handles game state, levels, and screen transitions.
 * Controls the overall game flow including start screen, gameplay, and end screens.
 * @class GameManager
 */
class GameManager {
  /**
   * Creates a new GameManager instance.
   * Initializes game state and input handling.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering
   * @param {Object} keyboard - Keyboard input handler
   */
  constructor() {
    this.gameRunning   = false;
    this.currentWorld  = null;
    this.keyboard      = new KeyBoard();
    this.canvas        = document.getElementById("canvas");
    this.currentLevel  = 1;
  }

  /**
   * Checks if the current device supports touch (mobile/tablet).
   * @returns {boolean} True if touch is supported, false otherwise.
   */
  isTouchDevice() {
    return 'ontouchstart' in window;
  }

  /**
   * Shows the start screen overlay based on device type.
   * Hides footer on touch devices and loads the appropriate template.
   */
  showStartScreenOverlay() {
    this.clearWorld();
    this.prepareCanvas(false);

    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = this.isTouchDevice() ? "none" : "";
    }

    audioManager.playStartScreenMusic();

    const startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = this.isTouchDevice()
      ? getMobileStartScreenTemplate()
      : startScreenOverlayTemplate();
    startScreen.classList.add("active");
  }

  /**
   * Handles the start button click.
   * Pauses start screen music, hides overlay and starts the game.
   */
  handleStart() {
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";

    try {
      audioManager.tracks["startscreen"].pause();
    } catch (e) {
      console.warn('Audio error:', e);
    }

    setTimeout(() => {
      this.closeOverlay();
      this.startGame(this.currentLevel);
      this.fadeInCanvas();
    }, 500);
  }

  /**
   * Starts the game at the specified level.
   * Initializes world, UI, mobile controls and boss handler.
   * @param {number} [levelNumber=1] - The number of the level to start.
   */
  startGame(levelNumber = 1) {
    this.gameRunning  = true;
    this.currentLevel = levelNumber;

    audioManager.playLevelMusic(levelNumber);
    this.setupGameUI();
    this.setupMobileControls();
    this.initializeGameWorld(levelNumber);
    this.setupBossDeathHandler();
  }

  /**
   * Sets up UI elements for game start.
   * Hides start screen, shows play screen, and updates mute button.
   * If on mobile, shows mobile controls.
   */
  setupGameUI() {
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
  }

  /**
   * Shows/hides mobile controls and binds touch handlers.
   * Sets up touch controls if the device supports touch.
   * If not, removes mobile controls.
   */
  setupMobileControls() {
    const controls = document.getElementById("mobileControls");
    if (this.isTouchDevice()) {
      controls.classList.add("active");
      setupMobileTouchControls(this.keyboard);
    } else {
      controls.classList.remove("active");
    }
  }

  /**
   * Initializes the game world (MobileWorld or Desktop World).
   * Sets up the canvas, keyboard, and level based on the level number.
   * @param {number} levelNumber - The level number to initialize.
   */
  initializeGameWorld(levelNumber) {
    this.prepareCanvas(true);
    this.clearWorld();

    if (this.isTouchDevice()) {
      this.currentWorld = new MobileWorld(this.canvas, this.keyboard, levelNumber);
      window.mobileWorld = this.currentWorld;
    } else {
      this.currentWorld = new World(this.canvas, this.keyboard, levelNumber);
    }
  }

  /**
   * Binds the level complete handler to the boss.
   */
  setupBossDeathHandler() {
    const boss = this.currentWorld.level?.endboss;
    if (boss) {
      boss.onDeathComplete = () => this.completeLevel();
    }
  }

  /**
   * Prepares the canvas for display.
   * @param {*} visible - Canvas visibility state.
   */
  prepareCanvas(visible) {
    const style = this.canvas.style;
    style.display    = visible ? "block" : "none";
    style.opacity    = visible ? "1" : "0";
    style.visibility = visible ? "visible" : "hidden";
    style.zIndex     = "10";
  }

  /**
   * Shows the end screen overlay (win/lose).
   * @param {*} isWin - Win/lose state for the end screen.
   */
  triggerEndScreen(isWin) {
    this.stopGame();
    this.canvas.style.filter = "blur(5px)";
    const endScreen = document.getElementById("endScreen");
    endScreen.classList.add("active");
    endScreen.innerHTML = getFinalEndScreenTemplate(isWin);
    this.addRestartButton();
  }

  /**
   * Adds restart button and binds handler.
   */
  addRestartButton() {
    const container = document.getElementById("restartContainer");
    container.innerHTML = backToMenuSVG();
    container.classList.add("slide-in");
    this.addRestartHandler();
  }

  /**
   * Binds click handler to the restart SVG.
   */
  addRestartHandler() {
    const svg = document.querySelector("#gameOverSVG");
    if (svg) svg.addEventListener("click", () => this.handleRestart());
  }

  /**
   * Procedure for restarting the game.
   */
  handleRestart() {
    this.restartGame();
  }

  /**
   * Resets game state and shows start screen.
   * Clears the current world, stops all sounds, and resets canvas state.
   * Removes mobile controls if they were active.
   */
  restartGame() {
    this.stopGame();
    this.currentLevel = 1;
    this.showStartScreenOverlay();

    const startScreen = document.getElementById("startScreen");
    const playScreen  = document.getElementById("playScreen");
    const endScreen   = document.getElementById("endScreen");
    const controls    = document.getElementById("mobileControls");

    startScreen.classList.add("active");
    startScreen.style.display    = "flex";
    startScreen.style.visibility = "visible";

    playScreen.classList.remove("active");
    endScreen.classList.remove("active");
    this.prepareCanvas(false);
    controls.classList.remove("active");
    document.getElementById("background").classList.add("blur");
  }

  /**
   * Stops the running game and cleans up.
   * Clears the current world, stops all sounds, and resets canvas state.
   * Removes mobile controls if they were active.
   */
  stopGame() {
    this.gameRunning = false;
    this.stopAllSounds();
    if (this.currentWorld?.runInterval) {
      clearInterval(this.currentWorld.runInterval);
    }
    this.clearWorld();
    this.canvas.style.filter = "";
    document.getElementById("mobileControls").classList.remove("active");

    if (typeof hideDesktopMuteButton === 'function') {
      hideDesktopMuteButton();
    }
  }

  /**
   * Stops all audio tracks.
   */
  stopAllSounds() {
    audioManager.stopAll();
  }

  /**
   * Cleans up the current world (intervals, event listeners, etc.).
   * Removes all game objects from the level.
   * Clears all intervals and event listeners associated with the world.
   */
  clearWorld() {
    if (!this.currentWorld) return;
    clearInterval(this.currentWorld.collisionInterval);
    clearInterval(this.currentWorld.throwInterval);
    clearInterval(this.currentWorld.runInterval);
    
    const clearEntity = ent => ent && (clearInterval(ent.animationInterval), clearInterval(ent.moveInterval), clearInterval(ent.directionInterval));
    const lvl = this.currentWorld.level;
    lvl?.enemies?.forEach(clearEntity);
    clearEntity(lvl?.endboss);
    lvl?.miniEndbosses?.forEach(clearEntity);
    clearEntity(this.currentWorld.character);

    if (this.currentWorld.handleCanvasClick) {
      this.canvas.removeEventListener("click", this.currentWorld.handleCanvasClick);
    }
    if (this.currentWorld.handleCanvasMouseMove) {
      this.canvas.removeEventListener("mousemove", this.currentWorld.handleCanvasMouseMove);
    }

    this.currentWorld = null;
  }

  /**
   * Closes the start screen overlay.
   */
  closeOverlay() {
    document.getElementById("startScreen").innerHTML = "";
  }

  /**
   * Fades in the canvas (after fade-in).
   */
  fadeInCanvas() {
    this.canvas.style.opacity = "1";
  }

  /**
   * Completes the current level (win/lose).
   * Triggers level complete prompt or end screen based on level.
   * @param {number} levelNumber - The level number to complete.
   */
  completeLevel() {
    if (this.currentLevel === 1) {
      this.showLevelPrompt();
    } else {
      this.triggerEndScreen(true);
    }
  }

  /**
   * Shows the level complete prompt (question about next level).
   * Stops the game and displays the prompt.
   */
  showLevelPrompt() {
    this.stopGame();
    this.canvas.style.filter = "blur(5px)";
    const endScreen = document.getElementById("endScreen");
    endScreen.classList.add("active");
    audioManager.play("nextLvl", false, 0.5);
    endScreen.innerHTML = confirmNextlvl();
  }

  /**
   * Starts the next level after confirmation.
   * Sets up the level complete screen and transitions to the next level.
   * @param {number} levelNumber - The level number to start.
   */
  startNextLevel() {
    const endScreen = document.getElementById("endScreen");
    endScreen.innerHTML = getLevelCompleteTemplate();

    setTimeout(() => {
      this.canvas.style.filter = "";
      endScreen.classList.remove("active");
      this.currentLevel = 2;
      this.startGame(2);
    }, 3000);
  }
}

/**
 * Shows the settings overlay.
 */
function showSettings() {
  document.getElementById("startScreen").innerHTML = settingsOverlayTemplate();
}

/**
 * Shows the impressum overlay.
 */
function showImpressum() {
  document.getElementById("startScreen").innerHTML = impressumOverlayTemplate();
}

/**
 * Returns to the start screen and selects the appropriate template.
 * If on mobile, shows the mobile start screen template.
 * @param {boolean} [isMobile=false] - Whether to show mobile start screen.
 */
function backToStartScreen() {
  const startScreen = document.getElementById("startScreen");
  startScreen.innerHTML = gameManager.isTouchDevice()
    ? getMobileStartScreenTemplate()
    : startScreenOverlayTemplate();
}

/**
 * Handler for game over (loss).
 * Triggers the end screen with loss state.
 */
function handleGameOver() {
  gameManager.triggerEndScreen(false);
}
