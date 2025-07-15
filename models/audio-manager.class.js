/**
 * Manages all audio functionality in the game including sound effects and background music.
 * Handles muting, volume control, and audio playback for various game events.
 * @class AudioManager
 */
class AudioManager {
  /**
   * Creates a new AudioManager instance
   * Initializes all audio files and sets up default audio settings
   */
  constructor() {
    this.soundMuted = false;
    this.musicMuted = false;
    this.globalMuted = this.loadMuteStateFromStorage();
    this.currentTrackIndex = 0;
    this.buttonX = 0;
    this.buttonY = 0;
    this.buttonWidth = 40;
    this.buttonHeight = 40;
    this.isButtonHovered = false;
    this.unmuteIcon = new Image();
    this.muteIcon = new Image();
    this.unmuteIcon.src = "assets/icons/unmute.svg";
    this.muteIcon.src = "assets/icons/mute.svg";
    
    /** @type {Object.<string, HTMLAudioElement>} Collection of sound effects and music tracks */
    this.sounds = {
      startscreen: new Audio("assets/audio/start-screen.mp3"),
      level1: new Audio("assets/audio/level1.mp3"),
      level2: new Audio("assets/audio/level2.mp3"),
      nextLvl: new Audio("assets/audio/next-level.mp3"),
      endboss: new Audio("assets/audio/endboss.mp3"),
      fullbar: new Audio("assets/audio/full-bottle-bar.mp3"),
      takeBottle: new Audio("assets/audio/take-bottle.mp3"),
      throwBottle: new Audio("assets/audio/throw-bottle.mp3"),
      smashBottle: new Audio("assets/audio/smash-bottle.mp3"),
      damage: new Audio("assets/audio/damage.mp3"),
      coins: new Audio("assets/audio/coins.mp3"), 
      snoring: new Audio("assets/audio/snoring.mp3"),
      whistle: new Audio("assets/audio/whistle.mp3"),
      jump: new Audio("assets/audio/jump.mp3"),
      jumpOnEnemy: new Audio("assets/audio/jump-on-enemy.mp3"),
      gameOver : new Audio("assets/audio/game-over.mp3"),
      win : new Audio("assets/audio/win.mp3"),
      endbossHit: new Audio("assets/audio/endboss-hit.mp3"),
    };

    this.tracks = this.sounds;

    this.sounds.startscreen.loop = true;
    this.sounds.startscreen.volume = 0.3;

    this.sounds.level1.loop = true;
    this.sounds.level1.volume = 0.2;
    this.sounds.level2.loop = true;
    this.sounds.level2.volume = 0.2;

    this.settings = {
      soundEnabled: true
    };
  }

  /**
   * Load music-specific settings from localStorage.
   * This method retrieves the mute state from localStorage and sets the globalMuted property.
   * @returns {boolean} The global mute state loaded from localStorage.
   * If no state is found, it defaults to false (unmuted).
   */
  loadMuteStateFromStorage() {
    const savedMuteState = localStorage.getItem('audioMuted');
    return savedMuteState === 'true';
  }

 
  /**
   * Saves the current global mute state to localStorage.
   * The mute state is stored as a string under the key 'audioMuted'.
   */
  saveMuteStateToStorage() {
    localStorage.setItem('audioMuted', this.globalMuted.toString());
  }

  /**
   * Plays a sound effect or music track
   * @param {string} soundName Name of the sound effect or music track to play
   * @param {boolean} [loop=false] Whether the track should loop
   * @param {number} [volume=1] Volume level from 0 to 1
   */
  async play(soundName, loop = false, volume = 1) {
    if (this.globalMuted || !this.settings.soundEnabled) return;
    
    const audio = this.sounds[soundName];
    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
    }

    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = loop;

    await new Promise(resolve => setTimeout(resolve, 10));
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      await playPromise;
    }
  }

  /**
   * Plays the music for a specific level
   * @param {number} levelNumber The level number
   */
  playLevelMusic(levelNumber) {
    if (this.globalMuted) return;
    
    this.stopAll();
    const levelMusicName = `level${levelNumber}`;
    this.play(levelMusicName, true, 0.6);
  }

  /**
   * Plays the start screen music
   */
  playStartScreenMusic() {
    if (this.globalMuted) return;
    
    this.stopAll();
    this.play("startscreen", true, 0.3);
  }

  /**
   * Pauses a sound effect or music track
   * @param {string} name Name of the sound effect or music track to pause
   */
  pause(name) {
    const audio = this.sounds[name];
    if (audio) audio.pause();
  }

  /**
   * Stops all audio playback and resets current time to 0
   */
  stopAll() {
    Object.values(this.sounds).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  /**
   * Mutes all audio globally
   */
  muteAll() {
    this.globalMuted = true;
    this.saveMuteStateToStorage();
    this.stopAll();
  }

  /**
   * Unmutes all audio globally
   */
  unmuteAll() {
     this.globalMuted = false;
     this.saveMuteStateToStorage();
  }

  /**
   * Toggles the global mute state
   * @returns {boolean} The new global mute state
   */
  toggleGlobalMute() {
    if (this.globalMuted) {
      
      this.unmuteAll();
    
      if (!this.musicMuted) {
        if (typeof gameManager !== 'undefined' && gameManager.gameRunning) {
          if (gameManager.currentWorld && gameManager.currentWorld.levelNumber) {
            this.playLevelMusic(gameManager.currentWorld.levelNumber);
          } else {
            this.playLevelMusic(gameManager.currentLevel || 1);
          }
        } else {
          this.play("startscreen", true, 0.3);
        }
      }
    } else {
      this.muteAll();
    }
    return this.globalMuted;
  }

  /**
   * Plays a sound effect or music track from a specific position
   * @param {string} name Name of the sound effect or music track
   * @param {number} position Position in seconds to start playback
   */
  playWithPosition(name, position = 0) {
    if (this.globalMuted) return;
    const audio = this.sounds[name];
    if (audio) {
      audio.currentTime = position;
      audio.play();
    }
  }

  /**
   * Pauses a sound effect or music track and returns its current position
   * @param {string} name Name of the sound effect or music track
   * @returns {number} Current position in seconds
   */
  pauseAndGetPosition(name) {
    const audio = this.sounds[name];
    if (audio && !audio.paused) {
      const position = audio.currentTime;
      audio.pause();
      return position;
    }
    return 0;
  }

  /**
   * Stops and resets a sound effect or music track
   * @param {string} name Name of the sound effect or music track
   */
  stopAndReset(name) {
    const audio = this.sounds[name];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  /**
   * Checks if a sound effect or music track is currently playing
   * @param {string} name Name of the sound effect or music track
   * @returns {boolean} True if playing, false otherwise
   */
  isPlaying(name) {
    const audio = this.sounds[name];
    return audio && !audio.paused;
  }

  /**
   * Gets the current playback time of a sound effect or music track
   * @param {string} name Name of the sound effect or music track
   * @returns {number} Current playback time in seconds
   */
  getCurrentTime(name) {
    const audio = this.sounds[name];
    return audio ? audio.currentTime : 0;
  }

  /**
   * Sets the playback time of a sound effect or music track
   * @param {string} name Name of the sound effect or music track
   * @param {number} time New playback time in seconds
   */
  setCurrentTime(name, time) {
    const audio = this.sounds[name];
    if (audio) {
      audio.currentTime = time;
    }
  }

  /**
   * Sets up the position of the mute button
   * @param {number} canvasWidth Width of the canvas
   */
  setupMuteButton(canvasWidth) {
    this.buttonX = (canvasWidth - this.buttonWidth) / 2;
    this.buttonY = 20;
  }

  /**
   * Draws the mute button on the screen
   * @param {CanvasRenderingContext2D} ctx The canvas rendering context
   */
  drawMuteButton(ctx) {
    ctx.save();
    ctx.fillStyle = this.isButtonHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(
      this.buttonX + this.buttonWidth / 2,
      this.buttonY + this.buttonHeight / 2,
      this.buttonWidth / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.strokeStyle = this.isButtonHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      this.buttonX + this.buttonWidth / 2,
      this.buttonY + this.buttonHeight / 2,
      this.buttonWidth / 2 - 1,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    const icon = this.globalMuted ? this.muteIcon : this.unmuteIcon;
    if (icon.complete) {
      const iconSize = this.buttonWidth * 0.6;
      const iconX = this.buttonX + (this.buttonWidth - iconSize) / 2;
      const iconY = this.buttonY + (this.buttonHeight - iconSize) / 2;
      ctx.drawImage(icon, iconX, iconY, iconSize, iconSize);
    }
    ctx.restore();
  }

  /**
   * Checks if the mute button was clicked based on mouse coordinates
   * @param {number} mouseX X coordinate of the mouse click
   * @param {number} mouseY Y coordinate of the mouse click
   * @returns {boolean} True if the button was clicked, false otherwise
   */
  isButtonClicked(mouseX, mouseY) {
    return mouseX >= this.buttonX && mouseX <= this.buttonX + this.buttonWidth &&
           mouseY >= this.buttonY && mouseY <= this.buttonY + this.buttonHeight;
  }

  /**
   * Sets the hover state of the mute button
   * @param {boolean} hovered True if hovered, false otherwise
   */
  setButtonHovered(hovered) {
    this.isButtonHovered = hovered;
  }

  /**
   * Toggles the mute state of the button and global audio
   * @returns {boolean} The new global mute state
   */
  toggleMuteButton() {
    this.toggleGlobalMute();
    return this.globalMuted;
  }
}

/**
 * Toggles the global mute state and updates the mute icon
 */
function toggleGlobalMute() {
  audioManager.toggleGlobalMute();
  updateMuteIcon();
}

/**
 * Updates the mute icon based on the current mute state
 */
function updateMuteIcon() {
  const icon = document.getElementById("music-toggle-icon");
  if (icon) {
    icon.src = audioManager.globalMuted
      ? "assets/icons/mute.svg"
      : "assets/icons/unmute.svg";
  }
}
