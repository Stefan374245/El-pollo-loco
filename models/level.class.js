class Level {
  enemies;
  endboss;
  clouds;
  bottles;
  coins;
  backgroundObjects;
  miniEndbosses; // Für Level 2 Mini-Endbosse
  level_end_point = 2200;
  
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
