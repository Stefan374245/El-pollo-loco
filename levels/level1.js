const level1 = new Level(
    AUDIO_STARTSCREEN,
  AUDIO_STARTGAME,
  AUDIO_END_BOSS,
  AUDIO_FULLBAR,
  AUDIO_PICKUP,
  AUDIO_COIN,
  AUDIO_SNORING,
  AUDIO_WHISTLE,
  AUDIO_JUMP,
  [
    new Enemy(300),      // Position 300
    new Enemy(400),      // Position 400 (100px Abstand)
    new Enemy(500),      // Position 500 (100px Abstand)
    new Enemy(700),      // Position 700 (200px Abstand)
    new Enemy(900),      // Position 900 (200px Abstand)
    new Enemy(1200),     // Position 1200 (300px Abstand)
    new Enemy2(350),     // Position 350 (zwischen den anderen)
    new Enemy2(600),     // Position 600
    new Enemy2(800),     // Position 800
    new Enemy2(1100)     // Position 1100
  ],
  new Endboss(),
  [
    new Clouds(),
    new Clouds(),
    new Clouds()
  ],
  [
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle()
  ],
  [
    new Coins(200, 200),
    new Coins(240, 170),
    new Coins(280, 136),
    new Coins(320, 170),
    new Coins(360, 200),
    new Coins(1000, 200),
    new Coins(1040, 170),
    new Coins(1080, 136),
    new Coins(1120, 170),
    new Coins(1160, 200)
  ],
  [
    new BackgroundObject("assets/img/5_background/layers/air.png", -719),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/air.png", 719),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719 * 3)
  ],
);