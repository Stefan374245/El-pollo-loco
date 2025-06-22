let currentWorld = null;


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
  currentWorld = world;
}

function handleStart() {
  document.getElementById("background").classList.add("blur");

  const overlay = document.getElementById("startScreenOverlay");
  if (overlay) {
    overlay.classList.add("fade-out");
 AUDIO_START_BTN.play();
    setTimeout(() => {
       
      closeOverlay();
      startGame();
      fadeInCanvas();
    }, 500);
  }
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
  gameRunning = false;

  if (currentWorld) {
    
    currentWorld.level.AUDIO_STARTGAME.pause();
    currentWorld.level.AUDIO_WHISTLE.pause();
    currentWorld.level.AUDIO_SNORING.pause();
  }

  triggerEndScreen();
}

function triggerEndScreen() {
  const canvas = document.getElementById('canvas');
  canvas.style.filter = 'blur(5px)';

  const endScreen = document.getElementById('endScreen');
  endScreen.classList.add('active');
  
  endScreen.innerHTML = `
    <img id="ohNoImg" src="assets/img/9_intro_outro_screens/game_over/oh no you lost!.png" alt="Oh Nooo! You Lost">
  `;

  setTimeout(() => {
    endScreen.innerHTML = `
       <div class="game-over-container">
    <div id="restartContainer" class="restartContainer"></div>
    <img id="gameOverImg" src="assets/img/9_intro_outro_screens/game_over/game over!.png" alt="Game Over" class="stay-visible">
  </div>
    `;

    setTimeout(() => {
      const restart = document.getElementById('restartContainer');
      restart.innerHTML = getRestartSVG();
      restart.classList.add('slide-in');
      addRestartHandler();
    }, 100);
  }, 2000);
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
  console.log('Restarting game...');
  
  
  document.getElementById("startScreen").classList.add("active");
  document.getElementById("playScreen").classList.remove("active");
  document.getElementById("endScreen").classList.remove("active");



  showStartScreenOverlay();
  fadeInCanvas();
}