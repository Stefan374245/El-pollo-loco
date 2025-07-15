/**
 * Represents the main character of the game.
 * Handles player movement, animations, and interactions with the game world.
 * @class Character
 * @extends MovableObject
 */
class Character extends MovableObject {
  height = 160;
  speed = 6;
  currentImage = 0;
  hp = 100;
  lastHit = 0;
  
  /** @type {string[]} Animation images for idle state */
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

  /** @type {string[]} Animation images for long idle state */
  IMAGES_IDLE_LONG = [
    'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
  ];

  /** @type {string[]} Animation images for walking state */
  IMAGES_WALKING = [
    'assets/img/2_character_pepe/2_walk/W-21.png',
    'assets/img/2_character_pepe/2_walk/W-22.png',
    'assets/img/2_character_pepe/2_walk/W-23.png',
    'assets/img/2_character_pepe/2_walk/W-24.png',
    'assets/img/2_character_pepe/2_walk/W-25.png',
    'assets/img/2_character_pepe/2_walk/W-26.png',
  ];

  /** @type {string[]} Animation images for jumping state */
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

  /** @type {string[]} Animation images for damage state */
  IMAGES_DAMAGE = [
    'assets/img/2_character_pepe/4_hurt/H-41.png',
    'assets/img/2_character_pepe/4_hurt/H-42.png',
    'assets/img/2_character_pepe/4_hurt/H-43.png',
  ];

  /** @type {string[]} Animation images for dead state */
  IMAGES_DEAD = [
    'assets/img/2_character_pepe/5_dead/D-51.png',
    'assets/img/2_character_pepe/5_dead/D-52.png',
    'assets/img/2_character_pepe/5_dead/D-53.png',
    'assets/img/2_character_pepe/5_dead/D-54.png',
    'assets/img/2_character_pepe/5_dead/D-55.png',
    'assets/img/2_character_pepe/5_dead/D-56.png',
    'assets/img/2_character_pepe/5_dead/D-57.png',
  ];  /**
   * Creates a new character instance
   * Initializes all animations, applies gravity and sets up properties
   */
  constructor() {
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

  /**
   * Initializes character properties including audio states and callbacks
   */
  initializeProperties() {
    this.lastActionTime = Date.now();
    this.jumpSoundPlayed = false;
    this.whistlePosition = 0;
    this.isWhistlePlaying = false;
    this.isSnoringPlaying = false;
    this.damageSoundPlaying = false;
    this.deathAnimationComplete = false;
      this.gameOverSoundPlayed = false; 

    this.onDeathComplete = () => {
      handleGameOver();
    };
    
    this.audioManager = null;
  }

  /**
   * Manages animation and movement of the character
   * Handles input processing and animation state changes
   */
  animate() {
    this.inputInterval = setInterval(() => {
      if (gameManager.gameRunning) this.handleInput();
    }, 1000 / 30);

    this.animationInterval = setInterval(() => {
      if (gameManager.gameRunning) this.handleAnimation();
    }, 100);
  }

  /**
   * Processes keyboard input and updates character movement
   * Handles movement restrictions and camera positioning
   */
  handleInput() {

    if (this.isDead()) {
      return;
    }

    if (this.world.isBossFightActive) {
      this.world.camera_x = -this.x + 100;
      return;
    }

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


  /**
   * Handles the character's animation state based on its current status and user input.
   * 
   * Animation states include death, hurt, jumping, walking, waking up, and idle (normal or long).
   * Also manages related audio playback and triggers callbacks when certain animations complete.
   * 
   * - Plays death animation and sound, and triggers `onDeathComplete` callback after animation.
   * - Plays hurt animation and sound, with cooldown to prevent repeated sound playback.
   * - Handles jump and walk animations based on keyboard input.
   * - Handles wake up action when the 'F' key is pressed.
   * - Switches between normal and long idle animations based on inactivity duration.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.stopAllAudio();
     if (this.audioManager && !this.gameOverSoundPlayed) {
      this.audioManager.play('gameOver', false, 0.8);
      this.gameOverSoundPlayed = true;
    }
      this.playAnimation(this.IMAGES_DEAD);
      
      if (!this.deathAnimationComplete && this.currentImage >= this.IMAGES_DEAD.length - 1) {
        this.deathAnimationComplete = true;
        
        setTimeout(() => {
          if (this.onDeathComplete) {
            this.onDeathComplete();
          }
        }, 2000);
      }
      
      return;
    }

    if (this.world.isBossFightActive) {
      this.playAnimation(this.IMAGES_IDLE);
      return;
    }

    if (this.isHurt()) {
      this.stopAllAudio();
      this.playAnimation(this.IMAGES_DAMAGE);
      
      if (this.audioManager && !this.damageSoundPlaying) {
        this.audioManager.play('damage');
        this.damageSoundPlaying = true;
        setTimeout(() => {
          this.damageSoundPlaying = false;
        }, 1000);
      }
      
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
  /**
   * Handles the animation for jumping state
   * Plays jump animation and sound effects
   */
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

  /**
   * Handles the animation for walking state
   * Plays walk animation and manages whistle sound
   */
  handleWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.stopSnoring();
    this.resumeWhistleFromPosition();
    this.jumpSoundPlayed = false;
    this.resetIdleTimer();
  }

  /**
   * Handles the wake up action animation
   * Stops all sounds and plays idle animation
   */
  handleWakeUpAction() {
    this.playAnimation(this.IMAGES_IDLE);
    this.stopSnoring();
    this.stopWhistle();
    this.jumpSoundPlayed = false;
    this.resetIdleTimer();
  }

  /**
   * Handles the long idle animation state
   * Plays long idle animation and starts snoring
   */
  handleLongIdleAnimation() {
    this.playAnimation(this.IMAGES_IDLE_LONG);
    this.stopWhistle();
    this.startSnoring();
    this.jumpSoundPlayed = false;
  }

  /**
   * Handles the normal idle animation state
   * Plays normal idle animation and stops sounds
   */
  handleNormalIdleAnimation() {
    this.playAnimation(this.IMAGES_IDLE);
    this.stopSnoring();
    this.stopWhistle();
    this.jumpSoundPlayed = false;  }
  
  /**
   * Pauses the whistle sound and saves the current playback position
   */
  pauseWhistleAndSavePosition() {
    if (this.audioManager) {
      if (this.audioManager.isPlaying('whistle')) {
        this.whistlePosition = this.audioManager.pauseAndGetPosition('whistle');
        this.isWhistlePlaying = false;
      }
    } else {
      console.warn('AudioManager nicht verfügbar für Whistle-Pause');
    }
  }
  
  /**
   * Resumes the whistle sound from the saved position
   */
  resumeWhistleFromPosition() {
    if (this.audioManager) {
      if (!this.audioManager.isPlaying('whistle')) {
        this.audioManager.playWithPosition('whistle', this.whistlePosition);
        this.isWhistlePlaying = true;
      }
    } else {
      console.warn('AudioManager nicht verfügbar für Whistle-Resume');
    }
  }
  
  /**
   * Stops the whistle sound and resets the position
   */
  stopWhistle() {
    if (this.audioManager) {
      this.audioManager.stopAndReset('whistle');
      this.whistlePosition = 0;
      this.isWhistlePlaying = false;
    }
  }
  
  /**
   * Starts playing the snoring sound effect
   */
  startSnoring() {
    if (this.audioManager) {
      if (!this.audioManager.isPlaying('snoring')) {
        this.audioManager.play('snoring');
        this.isSnoringPlaying = true;
      }
    } else {
      console.warn('AudioManager nicht verfügbar für Snoring');
    }
  }
  
  /**
   * Stops the snoring sound effect
   */
  stopSnoring() {
    if (this.audioManager) {
      this.audioManager.stopAndReset('snoring');
      this.isSnoringPlaying = false;
    }
  }

  /**
   * Stops all currently playing audio sounds
   */
  stopAllAudio() {
    this.stopWhistle();
    this.stopSnoring();
  }

  /**
   * Resets the idle timer to current timestamp
   */
  resetIdleTimer() {
    this.lastActionTime = Date.now();
  }

  /**
   * Sets the audio manager instance for sound management
   * @param {Object} audioManager - The audio manager instance
   */
  setAudioManager(audioManager) {
    this.audioManager = audioManager;
  }
}
