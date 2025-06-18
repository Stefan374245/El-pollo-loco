class Level {
  enemies;
  endboss;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_point = 2200;

  constructor(
    audioStartscreen,
    audioStartgame,
    audioEndboss,
    audioFullbar,
    audioPickup,
    audioCoin,
    audioSnoring,
    audioWhistle,
    audioJump,
    enemies,
    endboss,
    clouds,
    bottles,
    coins,
    backgroundObjects
  ) {
    this.AUDIO_STARTSCREEN = audioStartscreen;
    this.AUDIO_STARTGAME = audioStartgame;
    this.AUDIO_END_BOSS = audioEndboss;
    this.AUDIO_FULLBAR = audioFullbar;
    this.AUDIO_PICKUP = audioPickup;
    this.AUDIO_COIN = audioCoin;
    this.AUDIO_SNORING = audioSnoring;
    this.AUDIO_WHISTLE = audioWhistle;
    this.AUDIO_JUMP = audioJump;
    
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.bottles = bottles;
    this.coins = coins;

    this.backgroundObjects = backgroundObjects;
  }
}
