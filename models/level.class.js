class Level {
  constructor(
    enemies,
    endboss,
    clouds,
    bottles,
    coins,
    backgroundObjects,
    audioStartscreen = null,
    audioStartgame = null,
    audioEndboss = null,
    audioFullbar = null,
    audioPickup = null,
    audioCoin = null,
    audioSnoring = null,
    audioWhistle = null,
    audioJump = null
  ) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;

    this.AUDIO_STARTSCREEN = audioStartscreen;
    this.AUDIO_STARTGAME = audioStartgame;
    this.AUDIO_END_BOSS = audioEndboss;
    this.AUDIO_FULLBAR = audioFullbar;
    this.AUDIO_PICKUP = audioPickup;
    this.AUDIO_COIN = audioCoin;
    this.AUDIO_SNORING = audioSnoring;
    this.AUDIO_WHISTLE = audioWhistle;
    this.AUDIO_JUMP = audioJump;

    this.level_end_point = 2200;
  }
}
