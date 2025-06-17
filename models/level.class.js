class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_point = 2200;
    
    constructor(enemies, endboss, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
         this.bottles = bottles;
        this.coins = coins;
       
        this.backgroundObjects = backgroundObjects;
        
        
    }
}