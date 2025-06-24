const gameManager = new GameManager();

function showStartScreenOverlay() {
  document.getElementById("overlayContainer").innerHTML = startScreenOverlayTemplate();

  document.addEventListener(
    "click",
    () => {
      if (AUDIO_STARTSCREEN.paused) {
        AUDIO_STARTSCREEN.play().catch(e => {
          console.warn("Autoplay wurde blockiert:", e);
        });
      }
    },
    { once: true }
  );
}

function showSettings() {
  document.getElementById("overlayContainer").innerHTML =
    settingsOverlayTemplate();
}

function startGame() {
  document.getElementById("startScreen").classList.remove("active");
  document.getElementById("playScreen").classList.add("active");
  document.getElementById("endScreen").classList.remove("active");
  
  init();
}

function handleStart() {
closeOverlay();
  startGame();
  fadeInCanvas();
}

function closeOverlay() {
  const container = document.getElementById("overlayContainer");
  container.innerHTML = "";
}

function fadeInCanvas() {
  const canvas = document.getElementById("canvas");
  canvas.style.opacity = 1;
}

function backToStartScreen() {
  const container = document.getElementById("overlayContainer");
  container.innerHTML = startScreenOverlayTemplate();
}

function handleGameOver() {
 gameManager.triggerEndScreen(false); 
}

function showFinalEndScreen(isWin) {
  const endScreen = document.getElementById('endScreen');
  endScreen.innerHTML = getFinalEndScreenTemplate(isWin);
  addRestartButton(); // jetzt sauber mittig platzieren
}

function addRestartButton() {
  const restart = document.getElementById('restartContainer');
  restart.innerHTML = getRestartSVG();
  restart.classList.add('slide-in');
  addRestartHandler();
}


function addRestartHandler() {
  const svgText = document.querySelector('#gameOverSVG');
  console.log('svgText found:', svgText);
  
  if (svgText) {
    console.log('Adding click event listener to svgText');
    svgText.addEventListener('click', handleRestart);
  }
}

function handleRestart() {
gameManager.restartGame(); 

  showStartScreenOverlay();
  fadeInCanvas();
}
