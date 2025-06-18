const level1 = new Level(
  new Audio("assets/audio/start-screen.mp3"),
  new Audio("assets/audio/start-game.mp3"),
  new Audio("assets/audio/endboss.mp3"),
  new Audio("assets/audio//full-bottle-bar.mp3"),

  new Audio('assets/audio/take-bottle.mp3'),
  new Audio('assets/audio/coins.mp3'),
  new Audio('assets/audio/snoring.mp3'),
  new Audio('assets/audio/whistle.mp3'),
  new Audio('assets/audio/jump.mp3'),

  [new Enemy(),new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy2(), new Enemy2(), new Enemy2(), new Enemy2()],
  new Endboss(),

  [new Clouds(), new Clouds(), new Clouds()],

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
    new Bottle(),
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
    new Coins(1160, 200),
  ],
  [
    new BackgroundObject("assets/img/5_background/layers/air.png", -719),
    new BackgroundObject(
      "assets/img/5_background/layers/3_third_layer/2.png",
      -719
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/2_second_layer/2.png",
      -719
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/2.png",
      -719
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/2.png",
      -719
    ),

    new BackgroundObject("assets/img/5_background/layers/air.png", 0),
    new BackgroundObject(
      "assets/img/5_background/layers/3_third_layer/1.png",
      0
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/2_second_layer/1.png",
      0
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/1.png",
      0
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/1.png",
      0
    ),

    new BackgroundObject("assets/img/5_background/layers/air.png", 719),
    new BackgroundObject(
      "assets/img/5_background/layers/3_third_layer/2.png",
      719
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/2_second_layer/2.png",
      719
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/2.png",
      719
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/2.png",
      719
    ),

    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "assets/img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),

    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "assets/img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "assets/img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
  ]
);
