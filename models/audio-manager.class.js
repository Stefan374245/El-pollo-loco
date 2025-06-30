class AudioManager {
  constructor() {
    this.soundMuted = false;
    this.musicMuted = false;
    this.globalMuted = true;
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

    this.tracks = {
      startscreen: new Audio("assets/audio/start-screen.mp3"),
      startgame: new Audio("assets/audio/start-game.mp3"),
      startBtn: new Audio("assets/audio/start-btn.mp3"),
      endboss: new Audio("assets/audio/endboss.mp3"),
      fullbar: new Audio("assets/audio/full-bottle-bar.mp3"),
      takeBottle: new Audio("assets/audio/take-bottle.mp3"),
      throwBottle: new Audio("assets/audio/throw-bottle.mp3"),
      smashBottle: new Audio("assets/audio/smash-bottle.mp3"),
      damage: new Audio("assets/audio/damage.mp3"),
      coin: new Audio("assets/audio/coins.mp3"), 
      snoring: new Audio("assets/audio/snoring.mp3"),
      whistle: new Audio("assets/audio/whistle.mp3"),
      jump: new Audio("assets/audio/jump.mp3"),
      jumpOnEnemy: new Audio("assets/audio/jump-on-enemy.mp3"),
    };

    this.tracks.startscreen.loop = true;
    this.tracks.startscreen.volume = 0.3;

    this.tracks.startgame.loop = true;
    this.tracks.startgame.volume = 0.2;
}

  play(name, loop = false, volume = 1) {
    if (this.globalMuted) return;
    const audio = this.tracks[name];
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.loop = loop;
      audio.play();
    }
  }

  pause(name) {
    const audio = this.tracks[name];
    if (audio) audio.pause();
  }

  stopAll() {
    Object.values(this.tracks).forEach(audio => audio.pause());
  }

  muteAll() {
    this.globalMuted = true;
    this.stopAll();
  }

  unmuteAll() {
    this.globalMuted = false;
    if (!this.musicMuted) {
      if (typeof gameManager !== 'undefined' && gameManager.gameRunning) {
        this.tracks.startgame.play();
      } else {
        this.tracks.startscreen.play();
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
    const audio = this.tracks[name];
    if (audio) {
      audio.currentTime = position;
      audio.play();
    }
  }

  pauseAndGetPosition(name) {
    const audio = this.tracks[name];
    if (audio && !audio.paused) {
      const position = audio.currentTime;
      audio.pause();
      return position;
    }
    return 0;
  }

  stopAndReset(name) {
    const audio = this.tracks[name];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  isPlaying(name) {
    const audio = this.tracks[name];
    return audio && !audio.paused;
  }

  getCurrentTime(name) {
    const audio = this.tracks[name];
    return audio ? audio.currentTime : 0;
  }

  setCurrentTime(name, time) {
    const audio = this.tracks[name];
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
