class LevelManager {
  static createLevel1() {
    return new Level(
      [
        new Enemy(), new Enemy(), new Enemy(), new Enemy(),
        new Enemy(), new Enemy(), new Enemy2(), new Enemy2(),
        new Enemy2(), new Enemy2()
      ],
      new Endboss(),
      [ new Clouds(), new Clouds(), new Clouds() ],
      [
        new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
        new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()
      ],
      [
        new Coins(200, 200), new Coins(240, 170), new Coins(280, 136),
        new Coins(320, 170), new Coins(360, 200), new Coins(1000, 200),
        new Coins(1040, 170), new Coins(1080, 136), new Coins(1120, 170),
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
      ]
    );
  }
}