class NewLevelManager {
  /**
   * Erstellt Level 1 - entspricht der ursprünglichen level1.js Logik
   * @returns {Level} Level 1 Instanz
   */
  static createLevel1() {
    return new Level(
      [
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy2(),
        new Enemy2(),
        new Enemy2(),
        new Enemy2()
      ],
      new Endboss(1),
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
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 0),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 0),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 719),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 2),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 2),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 3),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719 * 3),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719 * 3),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719 * 3)
      ],
      null 
    );
  }

  /**
   * Erstellt Level 2 - Anspruchsvoller mit mehr Gegnern und Mini-Endbossen
   * @returns {Level} Level 2 Instanz mit Mini-Endbossen
   */
  static createLevel2() {
    return new Level(
      [
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy2(),
        new Enemy2(),
        new Enemy2(),
        new Enemy2(),
        new Enemy2(),
        new Enemy2()
      ],
      new Endboss(2), 
      [
        new Clouds(),
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
        
        new Coins(800, 220),
        new Coins(840, 190),
        new Coins(880, 160),
        new Coins(920, 190),
        new Coins(960, 220),
        
        new Coins(1300, 180),
        new Coins(1340, 150),
        new Coins(1380, 120),
        new Coins(1420, 150),
        new Coins(1460, 180),
        
        new Coins(1800, 200),
        new Coins(1840, 170),
        new Coins(1880, 140),
        new Coins(1920, 170),
        new Coins(1960, 200)
      ],
      [
        new BackgroundObject("assets/img/5_background/layers/air.png", -719),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", -719),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 0),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 0),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 719),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 2),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 2),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 3),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719 * 3),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719 * 3),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719 * 3),
        
        new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 4),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 719 * 4),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 719 * 4),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 4)
      ],
      [
        new MiniEndboss(1000),
        new MiniEndboss(1500),
        new MiniEndboss(2000)
      ]
    );
  }
}
