// audio-manager.class.js
class AudioManager {
  constructor() {
    this.soundMuted = false;
    this.musicMuted = false;
    this.currentTrackIndex = 0;

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

  play(name) {
    if (this.soundMuted) return;
    const audio = this.tracks[name];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  pause(name) {
    const audio = this.tracks[name];
    if (audio) audio.pause();
  }

  toggleBackgroundMusic() {
    const audio = this.tracks.startscreen;
    if (this.musicMuted) {
      audio.play();
    } else {
      audio.pause();
    }
    this.musicMuted = !this.musicMuted;
  }

  stopAll() {
    Object.values(this.tracks).forEach(audio => audio.pause());
  }

  muteAll() {
    this.soundMuted = true;
    this.stopAll();
  }

  unmuteAll() {
    this.soundMuted = false;
  }

  // Erweiterte Funktionen für Character-Audio-Management
  playWithPosition(name, position = 0) {
    if (this.soundMuted) return;
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
}

function toggleMusic() {
  audioManager.toggleBackgroundMusic();

  const icon = document.getElementById("music-toggle-icon");
  if (icon) {
    icon.src = audioManager.musicMuted
      ? "assets/icons/mute.svg"
      : "assets/icons/unmute.svg";
  }
}