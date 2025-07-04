class CollisionHandler {
  constructor(world) {
    this.world = world;
    this.offsets = CollisionConfig.getOffsets();
    this.barIsScaling = false;
  }

  checkAll() {
    this.checkEnemiesCollision();
    this.checkBottles();
    this.checkCoins();
    this.checkBottleHitEnemy();
    this.checkCharacterHP(this.world.character);
    this.checkEndBossHP(this.world.level.endboss);
    this.checkMiniEndbossHP();
  }

  checkEnemiesCollision() {
    const jumpAttackHappened = this.checkJumpAttacks();
    if (!jumpAttackHappened) {
      this.checkNormalCollisions();
    }
    this.checkCharacterHP(this.world.character);
  }

  checkJumpAttacks() {
    const now = Date.now();
    let jumpAttackHappened = false;

    this.world.level.enemies.forEach((enemy) => {
      const enemyType = enemy instanceof Enemy2 ? 'enemy2' : 'enemy';
      const jumpOffsets = this.offsets[enemyType].precise;

      const hasCollision = CollisionConfig.isPreciseCollision(
        this.world.character, 
        enemy, 
        this.offsets.character.jump, 
        jumpOffsets
      );

      if (hasCollision && !enemy.isDead()) {
        const isAbove = CollisionConfig.isReallyAboveEnemy(this.world.character, enemy, jumpOffsets);
        const isImmuneToThisEnemy = enemy.immuneUntil && now < enemy.immuneUntil;

        if (isAbove && !isImmuneToThisEnemy) {
          enemy.immuneUntil = Date.now() + 200;
          jumpAttackHappened = true;

          enemy.hit();

          this.world.character.y = 280;
          this.world.character.speedY = 0;
          this.world.character.jump();

          if (audioManager && audioManager.play) {
            audioManager.play("jumpOnEnemy");
          }
        }
      }
    });

    if (this.world.level.miniEndbosses) {
      this.world.level.miniEndbosses.forEach((miniEndboss) => {
        const jumpOffsets = this.offsets.miniEndboss.jump;

        if (
          CollisionConfig.isPreciseCollision(
            this.world.character,
            miniEndboss,
            this.offsets.character.jump,
            jumpOffsets
          ) &&
          !miniEndboss.isDead()
        ) {
          const isAbove = CollisionConfig.isReallyAboveEnemy(this.world.character, miniEndboss, jumpOffsets);
          const isImmuneToThisEnemy = miniEndboss.immuneUntil && now < miniEndboss.immuneUntil;

          if (isAbove && !isImmuneToThisEnemy) {
            miniEndboss.immuneUntil = Date.now() + 200;
            jumpAttackHappened = true;

            miniEndboss.hitMiniEndboss();

            const miniEndbossTopWithOffset = miniEndboss.y + jumpOffsets.y;
            this.world.character.y = miniEndbossTopWithOffset - this.world.character.height;
            this.world.character.speedY = -25;

            const landingCheck = setInterval(() => {
              if (this.world.character.y >= 280) {
                this.world.character.snapToGround();
                clearInterval(landingCheck);
              }
            }, 1000 / 60);

            if (audioManager && audioManager.play) {
              audioManager.play("jumpOnEnemy");
            }
          }
        }
      });
    }

    const boss = this.world.level.endboss;
    const bossJumpOffsets = this.offsets.endboss.jump;

    if (
      CollisionConfig.isPreciseCollision(
        this.world.character,
        boss,
        this.offsets.character.jump,
        bossJumpOffsets
      ) &&
      !boss.isDead()
    ) {
      const isAbove = CollisionConfig.isReallyAboveEnemy(this.world.character, boss, bossJumpOffsets);
      const isImmuneToThisEnemy = boss.immuneUntil && now < boss.immuneUntil;

      if (isAbove && !isImmuneToThisEnemy) {
        boss.immuneUntil = Date.now() + 200;
        jumpAttackHappened = true;

        boss.hitBoss();

        this.world.character.y = 280;
        this.world.character.speedY = 0;
        this.world.character.jump();

        if (audioManager && audioManager.play) {
          audioManager.play("jumpOnEnemy");
        }
      }
    }

    return jumpAttackHappened;
  }

  checkNormalCollisions() {
    const now = Date.now();

    this.world.level.enemies.forEach((enemy) => {
      const enemyType = enemy instanceof Enemy2 ? 'enemy2' : 'enemy';
      const enemyOffsets = this.offsets[enemyType].normal;

      if (
        CollisionConfig.isPreciseCollision(
          this.world.character,
          enemy,
          this.offsets.character.normal,
          enemyOffsets
        ) &&
        !enemy.isDead()
      ) {
        const isAbove = CollisionConfig.isReallyAboveEnemy(this.world.character, enemy, enemyOffsets);
        const isImmuneToThisEnemy = enemy.immuneUntil && now < enemy.immuneUntil;

        if (!isAbove && !isImmuneToThisEnemy) {
          this.world.character.hitWithCooldown(enemy);
          this.world.statusBar.setPercentage(this.world.character.hp);
        }
      }
    });

    if (this.world.level.miniEndbosses) {
      this.world.level.miniEndbosses.forEach((miniEndboss) => {
        if (
          CollisionConfig.isPreciseCollision(
            this.world.character,
            miniEndboss,
            this.offsets.character.normal,
            this.offsets.miniEndboss.normal
          ) &&
          !miniEndboss.isDead()
        ) {
          const isAbove = CollisionConfig.isReallyAboveEnemy(this.world.character, miniEndboss, this.offsets.miniEndboss.normal);
          const isImmuneToThisEnemy = miniEndboss.immuneUntil && now < miniEndboss.immuneUntil;

          if (!isAbove && !isImmuneToThisEnemy) {
            this.world.character.hitWithCooldown(miniEndboss);
            this.world.statusBar.setPercentage(this.world.character.hp);
          }
        }
      });
    }

    const boss = this.world.level.endboss;
    if (
      CollisionConfig.isPreciseCollision(
        this.world.character,
        boss,
        this.offsets.character.normal,
        this.offsets.endboss.normal
      ) &&
      !boss.isDead()
    ) {
      const isAbove = CollisionConfig.isReallyAboveEnemy(this.world.character, boss, this.offsets.endboss.normal);
      const isImmuneToThisEnemy = boss.immuneUntil && now < boss.immuneUntil;

      if (!isAbove && !isImmuneToThisEnemy) {
        this.world.character.hitWithCooldown(boss);
        this.world.statusBar.setPercentage(this.world.character.hp);
      }
    }
  }

  checkCharacterHP(character) {
    if (character.hp <= 0 && !character.dead) {
      character.dead = true;
      gameManager.triggerEndScreen(false);
    }
  }

checkEndBossHP(endboss) {
  if (endboss.hp <= 0 && !endboss.dead) {
    endboss.dead = true;
  }
}

  checkMiniEndbossHP() {
    if (this.world.level.miniEndbosses) {
      const miniEndbossesToCheck = [...this.world.level.miniEndbosses];

      for (let i = 0; i < miniEndbossesToCheck.length; i++) {
        const miniEndboss = miniEndbossesToCheck[i];

        if (this.world.level.miniEndbosses.includes(miniEndboss) && 
            miniEndboss.hp <= 0 && !miniEndboss.dead) {
          miniEndboss.die();
        }
      }
    }
  }

  checkBottleHitEnemy() {
    this.world.throwableObjects.forEach((bottle) => {
      if (this.world.level.miniEndbosses) {
        this.world.level.miniEndbosses.forEach((miniEndboss) => {
          if (!miniEndboss.isDead()) {
            miniEndboss.checkBottleHit(bottle);
          }
        });
      }

      this.world.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && !bottle.hasHitGround) {
          const hasCollision = bottle.isColliding(enemy, 5, 5);

          if (hasCollision) {
            enemy.hit();
            bottle.hasHitGround = true;
            bottle.playAnimation(bottle.IMAGE_BOTTLE_SPLASH);

            if (audioManager && audioManager.play) {
              audioManager.play('smashBottle');
            }
          }
        }
      });

      if (!this.world.level.endboss.isDead()) {
        this.world.level.endboss.checkBottleHit(bottle);
      }
    });
  }

  checkBottles() {
    const maxBottles = 5;

    this.world.level.bottles = this.world.level.bottles.filter((bottle) => {
      const canPickUp = this.world.bottleCount < maxBottles;
      const isColliding = this.world.character.isColliding(bottle, 10, 10);

      if (isColliding && canPickUp) {
        this.world.bottleCount++;
        this.increaseBar(this.world.statusBarBottles, 100 / maxBottles);

        if (audioManager && audioManager.play) {
          audioManager.play("takeBottle");
          if (this.world.bottleCount === maxBottles) {
            audioManager.play("fullbar");
          }
        }

        this.animateBarScale(this.world.statusBarBottles);
        return false;
      }

      return true;
    });
  }

  checkCoins() {
    this.world.level.coins = this.world.level.coins.filter((coin) => {
      const hasCollision = CollisionConfig.isPreciseCollision(
        this.world.character,
        coin,
        this.offsets.character.coin,
        this.offsets.coins.collect
      );

      if (hasCollision) {
        this.increaseBar(this.world.statusBarCoins, 10);
        if (audioManager && audioManager.play) {
          audioManager.play("coins");
        }
        this.animateBarScale(this.world.statusBarCoins);
        return false;
      }
      return true;
    });
  }

  increaseBar(bar, amount = 0) {
    bar.percentage = Math.min(bar.percentage + amount, 100);
    bar.setPercentage(bar.percentage);
  }

  animateBarScale(bar) {
    if (this.barIsScaling) return;

    this.barIsScaling = true;

    const originalWidth = bar.width;
    const originalHeight = bar.height;
    const scaleUp = 1.15;

    bar.width = originalWidth * scaleUp;
    bar.height = originalHeight * scaleUp;

    setTimeout(() => {
      bar.width = originalWidth;
      bar.height = originalHeight;
      this.barIsScaling = false;
    }, 150);
  }
}
