/**
 * Generiert das HTML für das Startscreen-Overlay
 * @returns {string} HTML-String
 */
function startScreenOverlayTemplate() {
  return `
    <div class="start-screen" id="startScreenOverlay">
      <div class="start-screen-card">
        <div class="task-header">
          <h1>Welcome to el pollo loco!</h1>
        </div>
        <div class="startscreen-content">
          <h2>2D - Jump & Run - Fun</h2>
          <div class="startscreen-buttons">
            <button onclick="gameManager.handleStart()"">Start game</button>
            <button onclick="showSettings()">Settings</button>
            <button class="mute-btn" id="muteBtn" onclick="toggleMusic()">
              <img class="mute-icon" id="music-toggle-icon" src="./assets/icons/unmute.svg" alt="Mute/Unmute" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function settingsOverlayTemplate() {
  return `
    <div class="setting-overlay start-screen-card" id="settingsOverlay">
      <div class="setting-card">
        
          <button class="back-btn" onclick="backToStartScreen()">
            <img class="icon back-icon" src="./assets/icons/back1.svg" alt="back" />
          </button>
          <h1>Movement</h1>
        
     
        <div class="setting-content">
          <ul class="key-list">
            <li><span class="label"><b>Move left/right</b></span><span class="key">A / D</span></li>
            <li><span class="label"><b>Jump</b></span><span class="key">Space</span></li>
            <li><span class="label"><b>Throw</b></span><span class="key">F</span></li>
            <li><span class="label"><b>Fullscreen</b></span><span class="key"><img class="icon" src="./assets/icons/fullscreen.svg" alt="Fullscreen Icon"></span></li>
            <li><span class="label"><b>Fullscreen off</b></span><span class="key"><img class="icon" src="./assets/icons/escape.svg" alt="Escape Icon"></span></li>
            <li>
              <span class="label"><b>Mute/unmute</b></span>
              <span class="key">
                <img class="icon" src="./assets/icons/mute.svg" alt="Mute Icon" /> /
                <img class="icon" src="./assets/icons/unmute.svg" alt="Unmute Icon" />
              </span>
            </li>
          </ul>
          <hr>
          <ul class="explanation">
            <h1>Game explanation</h1>
            <li>
              <span class="label">Collect coins & bottles</span>
              <span class="key">
                <img class="icon" src="./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png" alt="Bottle Icon" />
                <img class="icon" src="./assets/img/8_coin/coin_1.png" alt="Coin Icon" />
              </span>
            </li>
            <li>
              <span class="label">Jump or throw bottles on small chickens to kill them</span>
              <span class="key">
                <img class="icon" src="./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png" alt="Chicken Icon" />
              </span>
            </li>
            <li>
              <span class="label">Throw multiple bottles on endboss to kill him</span>
              <span class="key">
                <img class="icon" src="./assets/img/4_enemie_boss_chicken/1_walk/G1.png" alt="Endboss Icon" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function getRestartSVG() {
  return `
    <svg  id="gameOverSVG" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
      <text x="400" y="100" class="btn">▶️ Restart Game</text>
    </svg>
  `;
}

function getFirstEndScreenTemplate(isWin) {
  return `
    <div class="win-over-container">
      <img class="${isWin ? 'win-img' : 'lose-img'} stay-visible" src="${isWin
        ? 'assets/img/You won, you lost/You Win A.png'
        : 'assets/img/9_intro_outro_screens/game_over/oh no you lost!.png'}" 
        alt="${isWin ? 'You Win!' : 'Oh Nooo! You Lost'}">
    </div>
  `;
}

function getFinalEndScreenTemplate(isWin) {
  return `
    <div class="game-over-container">
      <div id="restartContainer" class="restart-container"></div>
      <img class="${isWin ? 'win-img' : 'lose-img'} stay-visible" src="${isWin
        ? 'assets/img/You won, you lost/You Won B.png'
        : 'assets/img/9_intro_outro_screens/game_over/game over!.png'}" 
        alt="${isWin ? 'Victory!' : 'Game Over'}">
    </div>
  `;
}