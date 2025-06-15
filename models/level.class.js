class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    level_end_point = 2200;
    
    constructor(enemies, clouds, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}