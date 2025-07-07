/**
 * @fileoverview Game control and input handling for El Pollo Loco game.
 * Manages keyboard controls, mobile touch controls, fullscreen functionality, and audio controls.
 * @author Your Name
 * @version 1.0.0
 */

/**
 * Flag to prevent multiple bindings of mobile control event listeners.
 * @type {boolean}
 */
let mobileControlsBound = false;

/**
 * Flag to prevent multiple bindings of desktop mute button event listeners.
 * @type {boolean}
 */
let desktopMuteBound = false;

/**
 * Event listener for keyboard key press events.
 * Handles movement, jumping, and throwing controls for desktop gameplay.
 * @param {KeyboardEvent} event - The keyboard event object
 */
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowRight':
    case 'KeyD':
      gameManager.keyboard.RIGHT = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      gameManager.keyboard.LEFT = true;
      break;
    case 'Space':
      event.preventDefault(); // Prevents button trigger by spacebar
      gameManager.keyboard.JUMP = true;
      break;
    case 'Enter':
      event.preventDefault(); // Prevents button trigger by Enter
      gameManager.keyboard.F = true; // Enter also throws
      break;
    case 'KeyF':
      gameManager.keyboard.F = true; // F throws
      break;
  }
});

/**
 * Event listener for keyboard key release events.
 * Resets the corresponding keyboard state when keys are released.
 * @param {KeyboardEvent} event - The keyboard event object
 */
document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowRight':
    case 'KeyD':
      gameManager.keyboard.RIGHT = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      gameManager.keyboard.LEFT = false;
      break;
    case 'Space':
      event.preventDefault(); // Prevents button trigger by spacebar
      gameManager.keyboard.JUMP = false;
      break;
    case 'Enter':
      event.preventDefault(); // Prevents button trigger by Enter
      gameManager.keyboard.F = false; // Release Enter
      break;
    case 'KeyF':
      gameManager.keyboard.F = false; // Release F
      break;
  }
});

/**
 * Checks device orientation and shows/hides rotation overlay for mobile devices.
 * Forces landscape orientation for optimal gameplay experience on mobile.
 * Shows overlay when device is in portrait mode and width < 760px.
 */
function checkOrientation() {
  const overlay = document.getElementById('rotate-device-overlay');
  if (
    window.innerWidth < 760 &&
    window.innerHeight > window.innerWidth
  ) {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

/**
 * Sets up touch controls for mobile devices.
 * Binds touch event listeners to mobile control buttons only once to prevent duplicates.
 * @param {Keyboard} kb - Instance of the Keyboard class for managing input states
 */
function setupMobileTouchControls(kb) {
  if (mobileControlsBound) return;   // Guard: only execute once
  mobileControlsBound = true;

  const btnLeft       = document.getElementById("btn-left");
  const btnRight      = document.getElementById("btn-right");
  const btnThrow      = document.getElementById("btn-throw");
  const btnJump       = document.getElementById("btn-jump");
  const btnFullscreen = document.getElementById("btn-fullscreen");
  const btnMute       = document.getElementById("btn-mute");

  function bindTouch(btn, keyName) {
    if (!btn) return;
    btn.addEventListener("touchstart", e => {
      e.preventDefault();
      kb[keyName] = true;
    }, { passive: false });
    btn.addEventListener("touchend",   e => {
      e.preventDefault();
      kb[keyName] = false;
    });
  }

  bindTouch(btnLeft,  "LEFT");
  bindTouch(btnRight, "RIGHT");
  bindTouch(btnJump,  "JUMP");
  bindTouch(btnThrow, "F");

  // Mute Button (Mobile)
  if (btnMute) {
    btnMute.addEventListener("touchstart", e => {
      e.preventDefault();
      console.log(">>> Mute Button pressed, currentLevel =", gameManager.currentLevel);
      audioManager.toggleGlobalMute();
      updateMuteButton();
    }, { passive: false });
  }

  // Fullscreen Button (Mobile)
  if (btnFullscreen) {
    btnFullscreen.addEventListener("touchstart", e => {
      e.preventDefault();
      toggleFullscreen();
    }, { passive: false });
    btnFullscreen.addEventListener("click", e => {
      e.preventDefault();
      toggleFullscreen();
    });
  }
}

/**
 * Sets up desktop mute button functionality.
 * Binds click event listener to desktop mute button only once to prevent duplicates.
 */
function setupDesktopMuteButton() {
  if (desktopMuteBound) return;  // Guard: only execute once
  desktopMuteBound = true;

  const btn = document.getElementById("btn-mute-desktop");
  if (btn) {
    btn.addEventListener("click", e => {
      e.preventDefault();
      console.log(">>> Desktop Mute Button pressed, currentLevel =", gameManager.currentLevel);
      audioManager.toggleGlobalMute();
      updateMuteButton();
    });
  }
}

/**
 * Detects if the current device is a mobile device.
 * Uses user agent string to determine device type.
 * @returns {boolean} True if device is mobile, false otherwise
 */
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

/**
 * Toggles fullscreen mode for mobile devices only.
 * Handles cross-browser compatibility for fullscreen API.
 * Enters fullscreen if not in fullscreen, exits if already in fullscreen.
 */
function toggleFullscreen() {
  if (!isMobileDevice()) return;

  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
 
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}

/**
 * Updates the fullscreen button appearance based on current fullscreen state.
 * Changes button icon between fullscreen and windowed mode indicators.
 * Hides button on non-mobile devices.
 */
function updateFullscreenButton() {
  const btn = document.getElementById('btn-fullscreen');
  if (btn) {
    // Only show on mobile, otherwise hide
    if (!isMobileDevice()) {
      btn.style.display = 'none';
      return;
    } else {
      btn.style.display = '';
    }
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    btn.innerHTML = isFullscreen ? '⛶' : '▢';
  }
}

/**
 * Updates the mute button icons for both mobile and desktop versions.
 * Changes button images based on current audio mute state from audioManager.
 */
function updateMuteButton() {
  const btnMute = document.getElementById('btn-mute');
  const btnMuteDesktop = document.getElementById('btn-mute-desktop');
  
  if (btnMute) {
    const imgElement = btnMute.querySelector('img');
    if (imgElement) {
      imgElement.src = audioManager.globalMuted 
        ? "assets/icons/mute.svg" 
        : "assets/icons/unmute.svg";
    }
  }
  if (btnMuteDesktop) {
    const imgElement = btnMuteDesktop.querySelector('img');
    if (imgElement) {
      imgElement.src = audioManager.globalMuted 
        ? "assets/icons/mute.svg" 
        : "assets/icons/unmute.svg";
    }
  }
}

/**
 * Shows the desktop mute button during gameplay.
 * Only displays on non-mobile devices by checking device type.
 */
function showDesktopMuteButton() {
  const desktopMuteContainer = document.getElementById("desktopMuteButton");
  if (desktopMuteContainer && !isMobileDevice()) {
    desktopMuteContainer.classList.remove("hidden");
    desktopMuteContainer.style.display = "block";
  }
}

/**
 * Hides the desktop mute button.
 * Typically called when not in gameplay state or on mobile devices.
 */
function hideDesktopMuteButton() {
  const desktopMuteContainer = document.getElementById("desktopMuteButton");
  if (desktopMuteContainer) {
    desktopMuteContainer.classList.add("hidden");
    desktopMuteContainer.style.display = "none";
  }
}


// Event listeners for fullscreen state changes across different browsers
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
document.addEventListener('mozfullscreenchange', updateFullscreenButton);
document.addEventListener('MSFullscreenChange', updateFullscreenButton);

// Event listeners for orientation and resize changes
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
document.addEventListener('DOMContentLoaded', checkOrientation);

/**
 * Initialize controls when DOM is loaded.
 * Sets up desktop mute button and mobile touch controls.
 */
document.addEventListener('DOMContentLoaded', () => {
  setupDesktopMuteButton();
  if (gameManager && gameManager.keyboard) {
    setupMobileTouchControls(gameManager.keyboard);
  }
});