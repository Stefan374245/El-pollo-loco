let canvas;

function init() {
  canvas = document.getElementById('canvas');
   gameManager.canvas = canvas;
  gameManager.gameRunning = true;
  gameManager.currentWorld = new World(canvas, gameManager.keyboard);

}

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
      gameManager.keyboard.JUMP = true;
      break;
    case 'Enter':
      gameManager.keyboard.F = true; // Enter wirft auch
      break;
    case 'KeyF':
      gameManager.keyboard.F = true; // F wirft
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
      gameManager.keyboard.JUMP = false;
      break;
    case 'Enter':
      gameManager.keyboard.F = false; // Enter loslassen
      break;
    case 'KeyF':
      gameManager.keyboard.F = false; // F loslassen
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

/**
 * Richtet nur Touch-Controls für Mobile ein.
 * @param {Keyboard} kb – Instanz deiner Keyboard-Klasse.
 */
function setupMobileTouchControls(kb) {
  const btnLeft  = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnThrow = document.getElementById("btn-throw");
  const btnJump  = document.getElementById("btn-jump");
    const btnFullscreen = document.getElementById("btn-fullscreen");


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



function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

function toggleFullscreen() {
  if (!isMobileDevice()) return; // Nur auf Handy erlauben

  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    // Exit fullscreen
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
    // Enter fullscreen
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

// Event Listener für alle Browser
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
document.addEventListener('mozfullscreenchange', updateFullscreenButton);
document.addEventListener('MSFullscreenChange', updateFullscreenButton);

function updateFullscreenButton() {
  const btn = document.getElementById('btn-fullscreen');
  if (btn) {
    // Nur auf Handy anzeigen, sonst verstecken
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

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
document.addEventListener('DOMContentLoaded', checkOrientation);