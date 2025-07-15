/**
 * Represents a game level containing all objects and enemies.
 * Defines the structure and layout of a specific game level.
 * @class Level
 */
class Level {
  enemies;
  endboss;
  clouds;
  bottles;
  coins;
  backgroundObjects;
  miniEndbosses;
  level_end_point = 2200;
  
  /**
   * Creates a new level instance
   * @param {Enemy[]} enemies - Array of enemies
   * @param {Endboss} endboss - The main boss enemy
   * @param {Clouds[]} clouds - Array of cloud objects
   * @param {Bottle[]} bottles - Array of bottles
   * @param {Coins[]} coins - Array of coins
   * @param {BackgroundObject[]} backgroundObjects - Array of background objects
   * @param {MiniEndboss[]|null} [miniEndbosses=null] - Array of mini bosses (level 2 only)
   */
  constructor(
    enemies,
    endboss,
    clouds,
    bottles,
    coins,
    backgroundObjects,
    miniEndbosses = null
  ) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
  
    this.miniEndbosses = miniEndbosses;
  }
}
