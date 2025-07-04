class AudioManager {
  constructor() {
    this.soundMuted = false;
    this.musicMuted = false;
    this.globalMuted = false;
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
    };

    this.tracks = this.sounds;

    this.sounds.startscreen.loop = true;
    this.sounds.startscreen.volume = 0.3;

    this.sounds.level1.loop = true;
    this.sounds.level1.volume = 0.2;
    this.sounds.level2.volume = 0.2;
    this.sounds.level2.volume = 0.2;

    this.settings = {
      soundEnabled: true
    };
  }

  async play(soundName, loop = false, volume = 1) {
    if (this.globalMuted || !this.settings.soundEnabled) return;
    
    const audio = this.sounds[soundName];
    if (!audio) {
      console.warn(`Sound "${soundName}" not found`);
      return;
    }

    try {
      // Stoppe vorherige Wiedergabe sanft wenn sie läuft
      if (!audio.paused) {
        audio.pause();
      }
      
      // Reset audio position
      audio.currentTime = 0;
      audio.volume = volume;
      audio.loop = loop;
      
      // Kurze Verzögerung um Audio-Konflikte zu vermeiden
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      console.warn(`Audio playback error for ${soundName}:`, error);
    }
  }

    playLevelMusic(levelNumber) {
    // Stop all music first
    this.stopAll();
    
    // Play the correct level music
    const levelMusicName = `level${levelNumber}`;
    if (this.sounds[levelMusicName]) {
      this.play(levelMusicName, true, 0.6); // loop=true, volume=0.6
    } else {
      console.warn(`Level music "${levelMusicName}" not found`);
    }
  }

  playStartScreenMusic() {
    this.stopAll();
    this.play("startscreen", true, 0.3);
  }

  pause(name) {
    const audio = this.sounds[name];
    if (audio) audio.pause();
  }

  stopAll() {
    Object.values(this.sounds).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  muteAll() {
    this.globalMuted = true;
    this.stopAll();
  }

  unmuteAll() {
    this.globalMuted = false;
    if (!this.musicMuted) {
      if (typeof gameManager !== 'undefined' && gameManager.gameRunning) {
        this.sounds.level1.play();
      } else {
        this.sounds.startscreen.play();
      }
    }
  }

  toggleGlobalMute() {
    if (this.globalMuted) {
      this.unmuteAll();
    } else {
      this.muteAll();
    }
    return this.globalMuted;
  }

  playWithPosition(name, position = 0) {
    if (this.globalMuted) return;
    const audio = this.sounds[name];
    if (audio) {
      audio.currentTime = position;
      audio.play();
    }
  }

  pauseAndGetPosition(name) {
    const audio = this.sounds[name];
    if (audio && !audio.paused) {
      const position = audio.currentTime;
      audio.pause();
      return position;
    }
    return 0;
  }

  stopAndReset(name) {
    const audio = this.sounds[name];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  isPlaying(name) {
    const audio = this.sounds[name];
    return audio && !audio.paused;
  }

  getCurrentTime(name) {
    const audio = this.sounds[name];
    return audio ? audio.currentTime : 0;
  }

  setCurrentTime(name, time) {
    const audio = this.sounds[name];
    if (audio) {
      audio.currentTime = time;
    }
  }

  setupMuteButton(canvasWidth, canvasHeight) {
    this.buttonX = (canvasWidth - this.buttonWidth) / 2;
    this.buttonY = 20;
  }

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

  isButtonClicked(mouseX, mouseY) {
    return mouseX >= this.buttonX && mouseX <= this.buttonX + this.buttonWidth &&
           mouseY >= this.buttonY && mouseY <= this.buttonY + this.buttonHeight;
  }

  setButtonHovered(hovered) {
    this.isButtonHovered = hovered;
  }

  toggleMuteButton() {
    this.toggleGlobalMute();
    return this.globalMuted;
  }
}

function toggleGlobalMute() {
  audioManager.toggleGlobalMute();
  const icon = document.getElementById("music-toggle-icon");
  if (icon) {
    icon.src = audioManager.globalMuted
      ? "assets/icons/mute.svg"
      : "assets/icons/unmute.svg";
  }
}
