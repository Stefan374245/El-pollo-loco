/**
 * @fileoverview Game control and input handling for El Pollo Loco game.
 * Manages keyboard controls, mobile touch controls, fullscreen functionality, and audio controls.
 * @author Your Name
 * @version 1.0.0
 */

let mobileControlsBound = false;

let desktopMuteBound = false;

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

function setupMobileTouchControls(kb) {
  if (mobileControlsBound) return;
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

  if (btnMute) {
    btnMute.addEventListener("touchstart", e => {
      e.preventDefault();
      console.log(">>> Mute Button pressed, currentLevel =", gameManager.currentLevel);
      audioManager.toggleGlobalMute();
      updateMuteButton();
    }, { passive: false });
  }

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

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

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

function updateFullscreenButton() {
  const btn = document.getElementById('btn-fullscreen');
  if (btn) {
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

function showDesktopMuteButton() {
  const desktopMuteContainer = document.getElementById("desktopMuteButton");
  if (desktopMuteContainer && !isMobileDevice()) {
    desktopMuteContainer.classList.remove("hidden");
    desktopMuteContainer.style.display = "block";
  }
}

function hideDesktopMuteButton() {
  const desktopMuteContainer = document.getElementById("desktopMuteButton");
  if (desktopMuteContainer) {
    desktopMuteContainer.classList.add("hidden");
    desktopMuteContainer.style.display = "none";
  }
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
