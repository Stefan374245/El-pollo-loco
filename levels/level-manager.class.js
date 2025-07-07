/**
 * @fileoverview Level Manager for El Pollo Loco game.
 * Handles creation and configuration of game levels with enemies, items, and backgrounds.
 * @author Your Name
 * @version 1.0.0
 */

class NewLevelManager {
  /**
   * Creates Level 1 - corresponds to the original level1.js logic
   * @returns {Level} Level 1 instance
   */
  static createLevel1() {
     const level1Endboss = new Endboss(1, 2200);
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
      level1Endboss,
      [
        new Clouds(),
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
        new Bottle()
      ],
      [
       new Coins(200, 200),
      new Coins(300, 180),
      new Coins(400, 156),
      new Coins(500, 170),
      new Coins(600, 200),
      new Coins(800, 156),
      new Coins(900, 180),
      new Coins(1000, 200),
      new Coins(1100, 170),
      new Coins(1200, 156)
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
   * Creates Level 2 - More challenging with more enemies and mini-endbosses
   * @returns {Level} Level 2 instance with mini-endbosses
   */
  static createLevel2() {
    const level2Endboss = new Endboss(2, 3000);
    return new Level(
      [
      new Enemy(),
      new Enemy(),
      new Enemy(),
    
    
      new Enemy2(),
      new Enemy2(),
      new Enemy2(),
      new Enemy2()
      ],
      level2Endboss, 
      [
      new Clouds(),
      new Clouds(),
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
      new Coins(200, 156),
      new Coins(300, 156),
      new Coins(400, 156),
      new Coins(500, 156),
      new Coins(600, 156),

      new Coins(800, 180),
      new Coins(900, 170),
      new Coins(1000, 156),
      new Coins(1100, 170),
      new Coins(1200, 180),

      new Coins(1400, 156),
      new Coins(1500, 156),
      new Coins(1600, 156),
      new Coins(1700, 156),
      new Coins(1800, 156),

      new Coins(2000, 200),
      new Coins(2100, 180),
      new Coins(2200, 156),
      new Coins(2300, 180),
      new Coins(2400, 200)
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
      new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 4),

      new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 719 * 5),
      new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 719 * 5),
      new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 5)
      ],
      [
      new MiniEndboss(1000),
      new MiniEndboss(1700),
      new MiniEndboss(2300)
      ]
    );
  }
}
