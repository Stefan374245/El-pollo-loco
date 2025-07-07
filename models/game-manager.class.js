/**
 * @fileoverview Game Manager for El Pollo Loco game.
 * Handles game state, levels, screen transitions, and overall game flow control.
 * @author Your Name
 * @version 1.0.0
 */

const audioManager = new AudioManager();
let gameManager;

window.onload = () => {
  gameManager = new GameManager();
  window.gameManager = gameManager; 
  gameManager.showStartScreenOverlay();
};

/**
 * Main game manager that handles game state, levels, and screen transitions.
 * Controls the overall game flow including start screen, gameplay, and end screens.
 * @class GameManager
 */
class GameManager {
  /**
   * Creates a new GameManager instance
   * Initializes game state and input handling
   */
  constructor() {
    this.gameRunning = false;
    this.currentWorld = null;
    this.keyboard = new KeyBoard();
    this.canvas = document.getElementById("canvas");
    this.currentLevel = 1;
  }

  /**
   * Shows the start screen overlay based on device type
   * Handles mobile and desktop start screen display
   */
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

  /**
   * Handles the start button click
   * Manages audio playback and transitions to the game screen
   */
  handleStart() {
    const startscreen = audioManager.tracks["startscreen"];
    const startBtn = audioManager.tracks[`level${this.currentLevel}`];
     const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";

    try {
      startscreen.pause();
    } catch (error) {
      console.log('Audio error:', error);
    }

    setTimeout(() => {
      this.closeOverlay();
      this.startGame(this.currentLevel);
      this.fadeInCanvas();
    }, 500);
  }

  /**
   * Starts the game at the specified level
   * Initializes game world, audio, and screen elements
   * @param {number} levelNumber - The level number to start the game at
   */
  startGame(levelNumber = 1) {
    this.gameRunning = true;
    this.currentLevel = levelNumber;
    
    audioManager.playLevelMusic(levelNumber);
    this.setupGameUI();
    this.setupMobileControls();
    this.initializeGameWorld(levelNumber);
    this.setupBossDeathHandler();
  }

  /**
   * Sets up the game UI elements when starting a game
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
   * Sets up mobile controls if on a mobile device
   */
  setupMobileControls() {
    if (this.isMobile()) {
      document.getElementById("mobileControls").classList.add("active");
      setupMobileTouchControls(this.keyboard);
    } else {
      document.getElementById("mobileControls").classList.remove("active");
    }
  }

  /**
   * Initializes the game world based on device type
   * @param {number} levelNumber - The level number to initialize
   */
  initializeGameWorld(levelNumber) {
    this.prepareCanvas(true);
    this.clearWorld();

    if (this.isMobile()) {
      this.currentWorld = new MobileWorld(this.canvas, this.keyboard, levelNumber);
      window.mobileWorld = this.currentWorld;
    } else {
      this.currentWorld = new World(this.canvas, this.keyboard, levelNumber);
    }
  }

  /**
   * Sets up the boss death handler for level completion
   */
  setupBossDeathHandler() {
    const boss = this.currentWorld.level?.endboss;
    if (boss) {
      boss.onDeathComplete = () => {
        this.completeLevel();
      };
    }
  }

  /**
   * Prepares the canvas element for display
   * Sets visibility, opacity, and z-index styles
   * @param {boolean} visible - Whether the canvas should be visible
   */
  prepareCanvas(visible) {
    this.canvas.style.display = visible ? "block" : "none";
    this.canvas.style.opacity = visible ? "1" : "0";
    this.canvas.style.visibility = visible ? "visible" : "hidden";
    this.canvas.style.zIndex = "10";
  }

  /**
   * Triggers the end screen display
   * Shows win or lose screen based on game state
   * @param {boolean} isWin - Whether the player won the game
   */
  triggerEndScreen(isWin) {
    this.stopGame();
    const canvas = document.getElementById("canvas");
    const endScreen = document.getElementById("endScreen");

    canvas.style.filter = "blur(5px)";
    endScreen.classList.add("active");

   endScreen.innerHTML = getFinalEndScreenTemplate(isWin);
  this.addRestartButton();
}

  /**
   * Shows the final end screen with restart option
   * @param {boolean} isWin - Whether the player won the game
   */
  showFinalEndScreen(isWin) {
    const endScreen = document.getElementById("endScreen");
    endScreen.innerHTML = getFinalEndScreenTemplate(isWin);
    this.addRestartButton();
  }

  /**
   * Adds the restart button to the end screen
   * Includes animation and click handler for restarting the game
   */
  addRestartButton() {
    const restart = document.getElementById("restartContainer");
    restart.innerHTML = getRestartSVG();
    restart.classList.add("slide-in");
    this.addRestartHandler();
  }

  /**
   * Adds click handler to the restart button SVG element
   * Restarts the game when the button is clicked
   */
  addRestartHandler() {
    const svgText = document.querySelector("#gameOverSVG");
    if (svgText) {
      svgText.addEventListener("click", () => this.handleRestart());
    }
  }

  /**
   * Handles the game restart process
   * Resets game state and shows the start screen overlay
   */
  handleRestart() {
    this.restartGame();
    this.showStartScreenOverlay();
    this.fadeInCanvas();
  }

  /**
   * Restarts the game from level 1
   * Resets game state and clears the current world
   */
  restartGame() {
    this.stopGame();
    this.currentLevel = 1;
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

  /**
   * Stops the game and cleans up the game world
   * Resets game state and hides game elements
   */
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

  /**
   * Stops all audio playback in the game
   * Used when transitioning between game states
   */
  stopAllSounds() {
    audioManager.stopAll();
  }

  /**
   * Clears the current game world
   * Stops all intervals and removes event listeners
   * Resets the current world to null
   */
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


  /**
   * Closes the start screen overlay
   * Called when starting the game or restarting
   */
  closeOverlay() {
    document.getElementById("startScreen").innerHTML = "";
  }


  /**
   * Fades in the canvas element
   * Used when starting the game or transitioning between screens
   */
  fadeInCanvas() {
    this.canvas.style.opacity = 1;
  }

  /**
   * Completes the current level
   * Triggers level completion actions and transitions
   */
  completeLevel() {
    if (this.currentLevel === 1) {
      this.showLevelComplete();
    } else {
      this.triggerEndScreen(true);
    }
  }

  /**
   * Shows the level complete screen for level 1
   * Triggers audio and transitions to level 2 after a delay
   */
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

  /**
   * Closes the level complete screen
   * Resets canvas filter and hides the end screen
   */
  closeLevelComplete() {
    const canvas = document.getElementById("canvas");
    const endScreen = document.getElementById("endScreen");

    canvas.style.filter = "";
    endScreen.classList.remove("active");
  }

  /**
   * Starts the game at level 2
   * Called when completing level 1
   */
  startLevel2() {
    this.currentLevel = 2;
    this.startGame(2);
  }

  /**
   * Checks if the current device is mobile
   * @returns {boolean} - True if the device is mobile, false otherwise
   */
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
