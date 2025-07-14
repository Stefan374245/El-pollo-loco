/**
 * Provides collision detection configuration and utility methods for game objects.
 * Defines offset values and collision detection algorithms for different object types.
 * @class CollisionConfig
 */
class CollisionConfig {
    /**
     * Returns collision offset configurations for all game object types
     * @returns {Object} Configuration object with offsets for each object type
     */
    static getOffsets() {
        return {
            character: {
                normal: { x: 15, y: 20 },
                precise: { x: 25, y: 30 },
                jump: { x: 10, y: 15 },
                coin: { x: 40, y: 80, width: -80, height: -80 },
                bottle: { x: 30, y: 30 },
            },
            enemy: {
                normal: { x: 8, y: 10 },
                precise: { x: 8, y: 8 },
                attackThreshold: 0.33,
            },
            enemy2: {
                normal: { x: 6, y: 8 },
                precise: { x: 6, y: 6 },
                attackThreshold: 0.33,
            },
            miniEndboss: {
                normal: { x: 12, y: 15 },
                precise: { x: 8, y: 10 },
                jump: { x: 8, y: 12 },
                attackThreshold: 0.33,
            },
            endboss: {
                normal: { x: 30, y: 40 },
                precise: { x: 35, y: 35 },
                jump: { x: 25, y: 30 },
            },
            bottles: {
                collect: { x: 20, y: 20},
            },
            coins: {
                collect: { x: 5, y: 5, width: -10, height: -10 },
            },
            throwableBottle: {
                hit: { x: 10, y: 10 },
            },
        };
    }

    /**
     * Checks if character is really above an enemy for jump attacks
     * @param {Character} character - The character object
     * @param {Enemy} enemy - The enemy object
     * @param {Object} [enemyOffsets=null] - Custom offsets for the enemy
     * @returns {boolean} True if character is above enemy
     */
    static isReallyAboveEnemy(character, enemy, enemyOffsets = null) {
        const cfg = this.getOffsets();
        if (!enemyOffsets) {
            if      (enemy instanceof MiniEndboss) enemyOffsets = cfg.miniEndboss.precise;
            else if (enemy instanceof Enemy2)      enemyOffsets = cfg.enemy2.precise;
            else                                   enemyOffsets = cfg.enemy.precise;
        }
        const charBottom = character.y + character.height;
        const charCenter = character.y + character.height / 2;
        const enemyTop = enemy.y;
        const enemyCenter = enemy.y + enemy.height / 2;
        const isAbove = charCenter < enemyCenter &&
                                        charBottom > enemyTop &&
                                        character.speedY >= 0;
        const charCenterX = character.x + character.width / 2;
        const enemyCenterX = enemy.x + enemy.width / 2;
        const horizontalDistance = Math.abs(charCenterX - enemyCenterX);
        const maxHorizontalDistance = (enemy.width * 0.4);
        const isCentered = horizontalDistance < maxHorizontalDistance;
        return isAbove && isCentered;
    }

    /**
     * Calculates the landing position when jumping on an enemy
     * @param {Character} character - The character object
     * @param {Enemy} enemy - The enemy object
     * @param {Object} enemyOffsets - Collision offsets for the enemy
     * @returns {number} Y-coordinate for landing position
     */
    static getJumpLandingPosition(character, enemy, enemyOffsets) {
        const groundLevel = 280;
        const enemyTopWithOffset = enemy.y + enemyOffsets.y;
        const landingOnEnemyY    = enemyTopWithOffset - character.height;
        return Math.min(groundLevel, landingOnEnemyY);
    }

    /**
     * Performs precise collision detection between two objects
     * @param {MovableObject} obj1 - First object to check
     * @param {MovableObject} obj2 - Second object to check
     * @param {Object} offsets1 - Collision offsets for first object
     * @param {Object} [offsets2=null] - Collision offsets for second object
     * @returns {boolean} True if objects are colliding
     */
    static isPreciseCollision(obj1, obj2, offsets1, offsets2 = null) {
        if (!offsets1) offsets1 = { x: 0, y: 0 };
        if (!offsets2) offsets2 = { x: 0, y: 0 };
        const obj1Left = obj1.x + offsets1.x;
        const obj1Right = obj1.x + obj1.width - offsets1.x;
        const obj1Top = obj1.y + offsets1.y;
        const obj1Bottom = obj1.y + obj1.height - offsets1.y;
        const obj2Left = obj2.x + offsets2.x;
        const obj2Right = obj2.x + obj2.width - offsets2.x;
        const obj2Top = obj2.y + offsets2.y;
        const obj2Bottom = obj2.y + obj2.height - offsets2.y;
        return (
            obj1Right > obj2Left &&
            obj1Left < obj2Right &&
            obj1Bottom > obj2Top &&
            obj1Top < obj2Bottom
        );
    }
}
