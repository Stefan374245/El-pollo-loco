/**
 * @fileoverview HTML template functions for El Pollo Loco game.
 * Contains all template functions for generating game screens and overlays.
 * @author Stefan Helldobler
 * @version 1.0.0
 */

/**
 * Generates the HTML for the start screen overlay
 * @returns {string} HTML string for the start screen
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
            <button onclick="gameManager.handleStart()">Start game</button>
            <button onclick="showSettings()">Game-Info</button>
            <button class="mute-btn" id="muteBtn" onclick="toggleGlobalMute()">
              <img class="mute-icon" id="music-toggle-icon" src="./assets/icons/mute.svg" alt="Mute/Unmute" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML for the impressum overlay
 * @returns {string} HTML string for the impressum overlay
 */
function impressumOverlayTemplate() {
  return `
    <div class="start-screen-card setting-overlay">
      <div class="setting-header">
        <h1>Impressum</h1>
        <img onclick="backToStartScreen()" class="icon back-icon back-btn" src="./assets/icons/back1.svg" alt="back" />
      </div>
      <div class="setting-content">
        <h2>Angaben gemäß § 5 TMG</h2>
        <ul class="key-list">
          <li>
            <span class="label"><b>Name:</b></span>
            <span class="key">Stefan Helldobler</span>
          </li>
          <li>
            <span class="label"><b>Adresse:</b></span>
            <span class="key">Siedlerweg 5<br>46535 Dinslaken</span>
          </li>
        </ul>
        
        <hr>
        
        <h2>Kontakt</h2>
        <ul class="key-list">
          <li>
            <span class="label"><b>Telefon:</b></span>
            <span class="key">+49 173 2534290</span>
          </li>
          <li>
            <span class="label"><b>E-Mail:</b></span>
            <span class="key">shelldobler@gmx.de</span>
          </li>
        </ul>
        
        <hr>
        
        <h2>Urheberrecht</h2>
        <ul class="key-list">
          <li>
            <span class="label"><b>Bilder:</b></span>
            <span class="key">Developer Akademie</span>
          </li>
          <li>
            <span class="label"><b>Sounds:</b></span>
            <span class="key">freesound.org</span>
          </li>
          <li>
            <span class="label"><b>Icons:</b></span>
            <span class="key">Google Fonts</span>
          </li>
        </ul>
        
        <hr>
        
        <h2>Datenschutz</h2>
        <ul class="key-list">
          <li>
            <span class="label"><b>Cookies:</b></span>
            <span class="key">Keine verwendet</span>
          </li>
          <li>
            <span class="label"><b>Daten:</b></span>
            <span class="key">Nur lokale Speicherung</span>
          </li>
        </ul>
        
        <hr>
        
        <h2>Haftung</h2>
        <ul class="key-list">
          <li>
            <span class="label"><b>Inhalte:</b></span>
            <span class="key">Nach § 7 TMG</span>
          </li>
          <li>
            <span class="label"><b>Links:</b></span>
            <span class="key">Keine Haftung</span>
          </li>
        </ul>
      </div>
    </div>
  `;
}

function settingsOverlayTemplate() {
  return `
    <div class="start-screen-card setting-overlay">
      <div class="setting-header">
        <h1>Game Controls</h1>
        <img onclick="backToStartScreen()" class="icon back-icon back-btn" src="./assets/icons/back1.svg" alt="back" />
      </div>
      <div class="setting-content">
        <h2>Control-PC</h2>
        <ul class="key-list">
          <li><span class="label"><b>Move left/right:</b></span><span class="key">Tap A / Left <br>Tap D  / Right</span></li>
          <li><span class="label"><b>Jump:</b></span><span class="key">Tap space</span></li>
          <li><span class="label"><b>Throw:</b></span><span class="key">Press F</span></li>
          <li><span class="label"><b>Mute/unmute:</b></span>
            <span class="key">
              <img class="icon" src="./assets/icons/mute.svg" alt="Mute Icon" /> /
              <img class="icon" src="./assets/icons/unmute.svg" alt="Unmute Icon" />
            </span>
          </li>
          <li><span class="label"><b>Fullscreen:</b></span><span class="key">Tap on ⛶ <br>(only mobile)</span></li>
        </ul>
        <hr>
        <h2>Control-Mobile</h2>
        <ul class="key-list">
          <li><span class="label"><b>Move left/right:</b></span><span class="key">Tap ⬅️ / Left <br>Tap ➡️  / Right</span></li>
          <li><span class="label"><b>Jump:</b></span><span class="key">Tap ⬆️</span></li>
          <li><span class="label"><b>Throw:</b></span><span class="key">Press
            <div class="icon bottle-rotate"></div>
          </span></li>
          <li><span class="label"><b>Mute/unmute:</b></span>
            <span class="key">
              <img class="icon" src="./assets/icons/mute.svg" alt="Mute Icon" /> /
              <img class="icon" src="./assets/icons/unmute.svg" alt="Unmute Icon" />
            </span>
          </li>
          <li><span class="label"><b>Fullscreen:</b></span><span class="key">Tap on ⛶</span></li>
        </ul>
        <hr>
        <h2>Game-Info</h2>
        <ul class="explanation">
          <li>
            <span class="label">Collect coins & bottles</span>
            <span class="key">
              <div class="icon bottle-rotate"></div>
              <div class="icon coin-animate"></div>
            </span>
          </li>
          <li>
            <span class="label">Jump or throw bottles on small chickens to kill them</span>
            <span class="key">
              <div class="icon chicken-walk"></div>
            </span>
          </li>
          <li>
            <span class="label">Throw multiple bottles on endboss to kill him</span>
            <span class="key">
              <div class="icon endboss-walk"></div>
            </span>
          </li>
          <li>
            <span class="label">You can jump on mini-endboss to kill them</span>
            <span class="key">Finish level 1</span>
          </li>
        </ul>
      </div>
    </div>
  `;
}

function backToMenuSVG() {
  return `
    <svg  id="gameOverSVG" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
      <text x="400" y="100" class="btn">▶️ Back to Menu</text>
    </svg>
  `;
}

function getFinalEndScreenTemplate(isWin) {
  return `
    <div class="game-over-container">
      <div id="restartContainer" class="restart-container"></div>
      <img class="${isWin ? "win-img" : "lose-img"} stay-visible" src="${
    isWin
      ? "assets/img/You won, you lost/You Won B.png"
      : "assets/img/9_intro_outro_screens/game_over/game over!.png"
  }" 
        alt="${isWin ? "Victory!" : "Game Over"}">
    </div>
  `;
}

/**
 * Generates the HTML for the level complete prompt (before starting next level)
 * @returns {string} HTML string for the level complete prompt
 */
function confirmNextlvl() {
  return `
    <div class="level-complete-prompt-container">
      <div class="level-complete-prompt-content">
        <h1 class="level-complete-title">LEVEL 1 COMPLETE!</h1>
        <h2 class="level-complete-subtitle">Congratulations!</h2>
        <div class="level-complete-buttons">
          <button onclick="gameManager.startNextLevel()" class="next-level-btn">
            Next Level
          </button>
          <button onclick="gameManager.handleRestart()" class="restart-btn">
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML for the level complete overlay
 * @returns {string} HTML string for the level complete screen
 */
function getLevelCompleteTemplate() {
  return `
    <div class="level-complete-container">
      <div class="level-complete-content">
        <h1 class="level-complete-title">LEVEL 1 COMPLETE!</h1>
        <h2 class="level-complete-subtitle">Preparing Level 2...</h2>
        <div class="level-complete-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getMobileStartScreenTemplate() {
  return `
    <div class="start-screen-card">
      <h1 class="h1-no-margin">El Pollo Loco</h1>
      <div class="startscreen-content">
        <h2>2D - Jump & Run - Fun</h2>
        <div class="startscreen-buttons">
          <button onclick="gameManager.handleStart()">
            <span class="icon bottle-rotate"></span>
            Start Game
          </button>
          <button onclick="showSettings()">
            Game-Info
          </button>
          <button onclick="showImpressum()">
            Impressum
          </button>
        </div>
      </div>
    </div>
  `;
}