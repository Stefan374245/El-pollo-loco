class Level {
    enemmies;
    clouds;
    backgroundObject;
    level_end_point = 2200;
    
    constructor(enemies, clouds, backgroundObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
    }
}