/**
 * Generiert das HTML für das Startscreen-Overlay
 * @returns {string} HTML-String
 */
function startScreenOverlayTemplate() {
  return `
    <div class="start-screen" id="startScreenOverlay">
      <div class="start-screen-card startscreen-card">
        <div class="task-header">
          <h1>El Pollo Loco</h1>
          
        </div>

        <div class="startscreen-content">
          <p>Welcome to El pollo loco!</p>
          <div class="startscreen-buttons">
            <button class="start-game-btn" onclick="handleStart()">Start game</button>
            <button class="show-settings-btn" onclick="showSettings()">Settings</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function settingsOverlayTemplate() {
  return `
    <div class="setting-overlay" id="settingsOverlay">
      <div class="setting-card">
        <div class="setting-header">
          <h1>Movement</h1>
          <button class="back-btn" onclick="backToStartScreen()">
            <img src="./assets/img/icons/close.svg" alt="back" />
          </button>
        </div>

        <div class="setting-content">
          <ul class="key-list">
            <li><b>Move left/right </b> -  A / D </b></li>
            <li><b>Jump</b> – Space</li>
            <li><b>Throw</b> – F</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function getRestartSVG() {
  return `
    <svg  onclick="handleRestart()" id="gameOverSVG" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
      <text x="400" y="100" class="btn" onclick="handleRestart()">▶️ Restart Game</text>
    </svg>
  `;;
}