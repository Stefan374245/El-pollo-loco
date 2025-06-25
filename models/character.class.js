class Character extends MovableObject {
  height = 160;
  speed = 6;
  currentImage = 0;
  hp = 100;
lastHit = 0;
  
  IMAGES_IDLE = [
    'assets/img/2_character_pepe/1_idle/idle/I-1.png',
    'assets/img/2_character_pepe/1_idle/idle/I-2.png',
    'assets/img/2_character_pepe/1_idle/idle/I-3.png',
    'assets/img/2_character_pepe/1_idle/idle/I-4.png',
    'assets/img/2_character_pepe/1_idle/idle/I-5.png',
    'assets/img/2_character_pepe/1_idle/idle/I-6.png',
    'assets/img/2_character_pepe/1_idle/idle/I-7.png',
    'assets/img/2_character_pepe/1_idle/idle/I-8.png',
    'assets/img/2_character_pepe/1_idle/idle/I-9.png',
    'assets/img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_IDLE_LONG = [
    'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
  ];

  IMAGES_WALKING = [
    'assets/img/2_character_pepe/2_walk/W-21.png',
    'assets/img/2_character_pepe/2_walk/W-22.png',
    'assets/img/2_character_pepe/2_walk/W-23.png',
    'assets/img/2_character_pepe/2_walk/W-24.png',
    'assets/img/2_character_pepe/2_walk/W-25.png',
    'assets/img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'assets/img/2_character_pepe/3_jump/J-31.png',
    'assets/img/2_character_pepe/3_jump/J-32.png',
    'assets/img/2_character_pepe/3_jump/J-33.png',
    'assets/img/2_character_pepe/3_jump/J-34.png',
    'assets/img/2_character_pepe/3_jump/J-35.png',
    'assets/img/2_character_pepe/3_jump/J-36.png',
    'assets/img/2_character_pepe/3_jump/J-37.png',
    'assets/img/2_character_pepe/3_jump/J-38.png',
    'assets/img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DAMAGE = [
    'assets/img/2_character_pepe/4_hurt/H-41.png',
    'assets/img/2_character_pepe/4_hurt/H-42.png',
    'assets/img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_DEAD = [
    'assets/img/2_character_pepe/5_dead/D-51.png',
    'assets/img/2_character_pepe/5_dead/D-52.png',
    'assets/img/2_character_pepe/5_dead/D-53.png',
    'assets/img/2_character_pepe/5_dead/D-54.png',
    'assets/img/2_character_pepe/5_dead/D-55.png',
    'assets/img/2_character_pepe/5_dead/D-56.png',
    'assets/img/2_character_pepe/5_dead/D-57.png',
  ];  constructor() {
    super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DAMAGE);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.initializeProperties();
  }

  initializeProperties() {
    this.lastActionTime = Date.now();
    this.jumpSoundPlayed = false;
    this.whistlePosition = 0;
    this.isWhistlePlaying = false;
    this.isSnoringPlaying = false;
    
    this.audioManager = null;
  }

animate() {
  this.inputInterval = setInterval(() => {
    if (gameManager.gameRunning) this.handleInput();
  }, 1000 / 30);

  this.animationInterval = setInterval(() => {
    if (gameManager.gameRunning) this.handleAnimation();
  }, 100);
}

  handleInput() {

    const now = Date.now();
    const isInKnockback = this.knockbackUntil && now < this.knockbackUntil;
    
    if (isInKnockback) {
      this.world.camera_x = -this.x + 100;
      return;
    }
    
    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_point
    ) {
      this.moveRight();
      this.otherDirection = false;
      this.lastActionTime = Date.now();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.lastActionTime = Date.now();
    }
    if (this.world.keyboard.JUMP && !this.isJumping()) {
      this.jump();
      this.lastActionTime = Date.now();
    }

    this.world.camera_x = -this.x + 100;
  }


  handleAnimation() {
    if (this.isDead()) {
      this.stopAllAudio();
      this.playAnimation(this.IMAGES_DEAD);
      return;
    }


    if (this.isHurt()) {
      this.stopAllAudio();
      this.playAnimation(this.IMAGES_DAMAGE);
      this.resetIdleTimer();
      return;
    }

    if (this.isJumping()) {
      this.handleJumpAnimation();
      return;
    }

    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.handleWalkAnimation();
      return;
    }

    if (this.world.keyboard.F) {
      this.handleWakeUpAction();
      return;
    }

    const idleTime = Date.now() - this.lastActionTime;

    if (idleTime > 4000) {
      this.handleLongIdleAnimation();
    } else {
      this.handleNormalIdleAnimation();
    }
  }
  handleJumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.pauseWhistleAndSavePosition();
    this.stopSnoring();
    
    if (!this.jumpSoundPlayed) {
      if (this.audioManager) {
        this.audioManager.play('jump');
      } else {
        console.warn('AudioManager nicht verfügbar für Jump-Sound');
      }
      this.jumpSoundPlayed = true;
    }
  }

  handleWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.stopSnoring();
    this.resumeWhistleFromPosition();
    this.jumpSoundPlayed = false;
    this.resetIdleTimer();
  }

  // 11. Hilfsfunktion: Aufwach-Aktion verwalten
  handleWakeUpAction() {
    this.playAnimation(this.IMAGES_IDLE);
    this.stopSnoring();
    this.stopWhistle();
    this.jumpSoundPlayed = false;
    this.resetIdleTimer();
  }

  // 12. Hilfsfunktion: Long-Idle-Animation verwalten
  handleLongIdleAnimation() {
    this.playAnimation(this.IMAGES_IDLE_LONG);
    this.stopWhistle();
    this.startSnoring();
    this.jumpSoundPlayed = false;
  }

  // 13. Hilfsfunktion: Normal-Idle-Animation verwalten
  handleNormalIdleAnimation() {
    this.playAnimation(this.IMAGES_IDLE);
    this.stopSnoring();
    this.stopWhistle();
    this.jumpSoundPlayed = false;  }
  
  // 14. Hilfsfunktionen für Audio-Verwaltung mit AudioManager
  pauseWhistleAndSavePosition() {
    if (this.audioManager) {
      if (this.audioManager.isPlaying('whistle')) {
        this.whistlePosition = this.audioManager.pauseAndGetPosition('whistle');
        this.isWhistlePlaying = false;
      }
    } else {
      console.warn('AudioManager nicht verfügbar für Whistle-Pause');
    }
  }  resumeWhistleFromPosition() {
    if (this.audioManager) {
      if (!this.audioManager.isPlaying('whistle')) {
        this.audioManager.playWithPosition('whistle', this.whistlePosition);
        this.isWhistlePlaying = true;
      }
    } else {
      console.warn('AudioManager nicht verfügbar für Whistle-Resume');
    }
  }
  stopWhistle() {
    if (this.audioManager) {
      this.audioManager.stopAndReset('whistle');
      this.whistlePosition = 0;
      this.isWhistlePlaying = false;
    }
  }  startSnoring() {
    if (this.audioManager) {
      if (!this.audioManager.isPlaying('snoring')) {
        this.audioManager.play('snoring');
        this.isSnoringPlaying = true;
      }
    } else {
      console.warn('AudioManager nicht verfügbar für Snoring');
    }
  }
  stopSnoring() {
    if (this.audioManager) {
      this.audioManager.stopAndReset('snoring');
      this.isSnoringPlaying = false;
    }
  }

  stopAllAudio() {
    this.stopWhistle();
    this.stopSnoring();
  }

  resetIdleTimer() {
    this.lastActionTime = Date.now();
  }

  // Methode um AudioManager zu setzen (wird von der World-Klasse aufgerufen)
  setAudioManager(audioManager) {
    this.audioManager = audioManager;
  }
}
