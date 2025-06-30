class CollisionConfig {
    static getOffsets() {
        return {
            character: {
                normal: { x: 15, y: 20 },
                precise: { x: 25, y: 30 },
                jump: { x: 10, y: 15 },
                coin: { x: 40, y: 80, width: -80, height: -80 }
            },
            enemy: {
                normal: { x: 8, y: 10 },
                precise: { x: 8, y: 8 }
            },
            enemy2: {
                normal: { x: 6, y: 8 },
                precise: { x: 6, y: 6 }
            },
            miniEndboss: {
                normal: { x: 12, y: 15 },
                precise: { x: 8, y: 10 },
                jump: { x: 8, y: 12 }
            },
            endboss: {
                normal: { x: 30, y: 40 },
                precise: { x: 35, y: 35 },
                jump: { x: 25, y: 30 }
            },
            bottles: {
                collect: { x: 10, y: 10 }
            },
            coins: {
                collect: { x: 5, y: 5, width: -10, height: -10 }
            },
            throwableBottle: {
                hit: { x: 10, y: 10 }
            }
        };
    }

    static isReallyAboveEnemy(character, enemy, enemyOffsets = null) {
        if (!enemyOffsets) {
            if (enemy instanceof MiniEndboss) {
                enemyOffsets = this.getOffsets().miniEndboss.jump;
            } else if (enemy instanceof Endboss) {
                enemyOffsets = this.getOffsets().endboss.jump;
            } else if (enemy instanceof Enemy2) {
                enemyOffsets = this.getOffsets().enemy2.precise;
            } else {
                enemyOffsets = this.getOffsets().enemy.precise;
            }
        }

        const characterBottom = character.y + character.height;
        const enemyTop = enemy.y + enemyOffsets.y;
        const isFalling = character.speedY > 0;
        const isAbove = characterBottom <= enemyTop + 25;
        const characterCenterX = character.x + character.width / 2;
        const enemyCenterX = enemy.x + enemy.width / 2;
        const horizontalDistance = Math.abs(characterCenterX - enemyCenterX);
        const maxDistance = (enemy.width / 2) + (character.width / 2) - enemyOffsets.x;
        const horizontalOverlap = horizontalDistance < maxDistance;
        return isFalling && isAbove && horizontalOverlap;
    }

    static getJumpLandingPosition(character, enemy, enemyOffsets) {
        const groundLevel = 280;
        const enemyTopWithOffset = enemy.y + enemyOffsets.y;
        const landingY = Math.min(groundLevel, enemyTopWithOffset - character.height);
        return Math.max(landingY, groundLevel);
    }

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
