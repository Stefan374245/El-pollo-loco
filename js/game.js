/**
 * @fileoverview Game control and input handling for El Pollo Loco game.
 * Manages keyboard controls, mobile touch controls, fullscreen functionality, and audio controls.
 * @author Stefan Helldobler
 * @version 1.0.0
 */

let mobileControlsBound = false;
let desktopMuteBound = false;

/**
 * Handles keyboard key down events for game controls.
 * Maps various keys to game actions like movement, jumping, and throwing.
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
      event.preventDefault();
      gameManager.keyboard.JUMP = true;
      break;
    case 'Enter':
      event.preventDefault();
      gameManager.keyboard.F = true;
      break;
    case 'KeyF':
      gameManager.keyboard.F = true;
      break;
  }
});

/**
 * Handles keyboard key up events for game controls.
 * Resets keyboard state when keys are released.
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
      event.preventDefault();
      gameManager.keyboard.JUMP = false;
      break;
    case 'Enter':
      event.preventDefault();
      gameManager.keyboard.F = false;
      break;
    case 'KeyF':
      gameManager.keyboard.F = false;
      break;
  }
});

/**
 * Checks if the device is in portrait orientation on a small screen.
 * @returns {boolean} True if screen width < 760px and height > width
 */
function isPortraitOnSmallDevice() {
  return window.innerWidth < 760 && window.innerHeight > window.innerWidth;
}

/**
 * Shows the rotate device overlay and prevents body scrolling.
 * Displays a message to rotate the device to landscape mode.
 */
function showRotateOverlay() {
  const overlay = document.getElementById('rotate-device-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Hides the rotate device overlay and restores body scrolling.
 * Removes the device rotation message from view.
 */
function hideRotateOverlay() {
  const overlay = document.getElementById('rotate-device-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

/**
 * Checks device orientation and shows/hides rotation overlay accordingly.
 * Ensures optimal game experience by promoting landscape orientation on mobile.
 */
function checkOrientation() {
  if (isPortraitOnSmallDevice()) {
    showRotateOverlay();
  } else {
    hideRotateOverlay();
  }
}

/**
 * Binds touch events to a button for mobile controls.
 * Handles both touchstart and touchend events for responsive control.
 * @param {HTMLElement} btn - The button element to bind events to
 * @param {string} keyName - The keyboard property name to control
 * @param {Object} keyboard - The keyboard object to modify
 */
function bindTouchControl(btn, keyName, keyboard) {
  if (!btn) return;
  
  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    keyboard[keyName] = true;
  }, { passive: false });
  
  btn.addEventListener("touchend", e => {
    e.preventDefault();
    keyboard[keyName] = false;
  });
}

/**
 * Sets up touch controls for the mobile mute button.
 * Toggles global audio muting and updates button visual state.
 * @param {HTMLElement} btnMute - The mute button element
 */
function setupMuteButtonControl(btnMute) {
  if (!btnMute) return;
  
  btnMute.addEventListener("touchstart", e => {
    e.preventDefault();
    console.log(">>> Mute Button pressed, currentLevel =", gameManager.currentLevel);
    audioManager.toggleGlobalMute();
    updateMuteButton();
  }, { passive: false });
}

/**
 * Sets up touch and click controls for the mobile fullscreen button.
 * Handles both touch and click events for maximum compatibility.
 * @param {HTMLElement} btnFullscreen - The fullscreen button element
 */
function setupFullscreenButtonControl(btnFullscreen) {
  if (!btnFullscreen) return;
  
  const handleFullscreenToggle = (e) => {
    e.preventDefault();
    toggleFullscreen();
  };
  
  btnFullscreen.addEventListener("touchstart", handleFullscreenToggle, { passive: false });
  btnFullscreen.addEventListener("click", handleFullscreenToggle);
}

/**
 * Sets up all mobile touch controls for the game.
 * Initializes touch event listeners for movement, jumping, throwing, mute, and fullscreen.
 * @param {Object} kb - The keyboard object to bind controls to
 */
function setupMobileTouchControls(kb) {
  if (mobileControlsBound) return;
  mobileControlsBound = true;

  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnThrow = document.getElementById("btn-throw");
  const btnJump = document.getElementById("btn-jump");
  const btnFullscreen = document.getElementById("btn-fullscreen");
  const btnMute = document.getElementById("btn-mute");

  bindTouchControl(btnLeft, "LEFT", kb);
  bindTouchControl(btnRight, "RIGHT", kb);
  bindTouchControl(btnJump, "JUMP", kb);
  bindTouchControl(btnThrow, "F", kb);
  
  setupMuteButtonControl(btnMute);
  setupFullscreenButtonControl(btnFullscreen);
}

/**
 * Sets up the desktop mute button with click event listener.
 * Prevents multiple bindings and handles audio toggle functionality.
 */
function setupDesktopMuteButton() {
  if (desktopMuteBound) return;
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
 * Uses user agent string and touch capabilities to identify mobile browsers.
 * @returns {boolean} True if device is mobile, false otherwise
 */
function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  const hasTouch = 'ontouchstart' in window;
  const screenWidth = window.innerWidth;
  
  const isTablet = /ipad|tablet|android(?!.*mobile)/i.test(userAgent);
  const isMobile = /mobi|android|iphone|ipod|windows phone/i.test(userAgent);
  
  return isMobile || isTablet || (hasTouch && screenWidth <= 1200);
}

/**
 * Exits fullscreen mode using cross-browser compatible methods.
 * Tries different browser-specific fullscreen exit methods.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Enters fullscreen mode using cross-browser compatible methods.
 * Tries different browser-specific fullscreen request methods.
 */
function enterFullscreen() {
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

/**
 * Checks if the browser is currently in fullscreen mode.
 * Uses cross-browser compatible fullscreen detection.
 * @returns {boolean} True if currently in fullscreen, false otherwise
 */
function isCurrentlyFullscreen() {
  return document.fullscreenElement ||
         document.webkitFullscreenElement ||
         document.mozFullScreenElement ||
         document.msFullscreenElement;
}

/**
 * Toggles fullscreen mode for mobile devices only.
 * Enters or exits fullscreen based on current state.
 */
function toggleFullscreen() {
  if (!isMobileDevice()) return;

  if (isCurrentlyFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
}

/**
 * Updates the fullscreen button appearance and visibility.
 * Hides button on desktop, updates icon based on fullscreen state on mobile.
 */
function updateFullscreenButton() {
  const btn = document.getElementById('btn-fullscreen');
  if (!btn) return;
  
  if (!isMobileDevice()) {
    btn.style.display = 'none';
    return;
  }
  
  btn.style.display = '';
  const isFullscreen = isCurrentlyFullscreen();
  btn.innerHTML = isFullscreen ? '⛶' : '▢';
}

/**
 * Updates the mute button icon based on current audio state.
 * Changes icon between mute and unmute based on global mute status.
 * @param {string} buttonId - The ID of the button element to update
 */
function updateMuteButtonIcon(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  
  const imgElement = btn.querySelector('img');
  if (imgElement) {
    imgElement.src = audioManager.globalMuted 
      ? "assets/icons/mute.svg" 
      : "assets/icons/unmute.svg";
  }
}

/**
 * Updates both mobile and desktop mute button icons.
 * Synchronizes visual state across all mute buttons.
 */
function updateMuteButton() {
  updateMuteButtonIcon('btn-mute');
  updateMuteButtonIcon('btn-mute-desktop');
}

/**
 * Toggles visibility of desktop mute button container.
 * Manages both CSS classes and display style properties.
 * @param {string} containerId - The ID of the container element
 * @param {boolean} shouldShow - Whether to show or hide the container
 */
function toggleDesktopMuteButtonVisibility(containerId, shouldShow) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (shouldShow) {
    container.classList.remove("hidden");
    container.style.display = "block";
  } else {
    container.classList.add("hidden");
    container.style.display = "none";
  }
}

/**
 * Shows the desktop mute button for non-mobile devices.
 * Only displays the button if not on a mobile device.
 */
function showDesktopMuteButton() {
  if (!isMobileDevice()) {
    toggleDesktopMuteButtonVisibility("desktopMuteButton", true);
  }
}

/**
 * Hides the desktop mute button from view.
 * Removes the button visibility regardless of device type.
 */
function hideDesktopMuteButton() {
  toggleDesktopMuteButtonVisibility("desktopMuteButton", false);
}

document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
document.addEventListener('mozfullscreenchange', updateFullscreenButton);
document.addEventListener('MSFullscreenChange', updateFullscreenButton);

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
document.addEventListener('DOMContentLoaded', checkOrientation);

document.addEventListener('DOMContentLoaded', () => {
  setupDesktopMuteButton();
  if (gameManager && gameManager.keyboard) {
    setupMobileTouchControls(gameManager.keyboard);
  }
});
