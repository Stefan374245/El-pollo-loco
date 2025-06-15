class Level {
    enemies;
    clouds;
    backgroundObject;
    bottles;
    level_end_point = 2200;
    
    constructor(enemies, clouds, bottles, backgroundObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.bottles = bottles;
    }
}