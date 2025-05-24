import { GAMEPLAY } from '../constants/game.js';

export default class CollisionSystem {
    constructor(scene) {
        this.scene = scene;
        this.setupCollisions();
    }

    setupCollisions() {
        const { physics } = this.scene;

        // Colisões com plataformas
        physics.add.collider(this.scene.player, this.scene.platforms);
        physics.add.collider(this.scene.dogs, this.scene.platforms);
        physics.add.collider(this.scene.enemies, this.scene.platforms);
        physics.add.collider(this.scene.fires, this.scene.platforms);

        // Sobreposições para interações
        physics.add.overlap(
            this.scene.player,
            this.scene.dogs,
            this.handleDogCollision,
            null,
            this
        );

        physics.add.overlap(
            this.scene.player,
            this.scene.enemies,
            this.handleEnemyCollision,
            null,
            this
        );

        physics.add.overlap(
            this.scene.player,
            this.scene.fires,
            this.handleFireCollision,
            null,
            this
        );
    }

    handleDogCollision(player, dog) {
        dog.destroy();
        this.scene.savedDogs++;
        this.scene.hud.updateScore(this.scene.savedDogs, GAMEPLAY.REQUIRED_DOGS);
        this.createSaveEffect(dog.x, dog.y);
    }

    handleEnemyCollision(player, enemy) {
        if (player.body.velocity.y > 0 && player.y < enemy.y - enemy.height/2) {
            this.defeatEnemy(player, enemy);
        } else {
            this.damagePlayer(player);
        }
    }

    handleFireCollision(player, fire) {
        if (fire.scaleY < 0.5 && !player.isHurt) {
            return;
        }
        this.damagePlayer(player);
    }

    defeatEnemy(player, enemy) {
        player.setVelocityY(-200);
        this.createDefeatEffect(enemy.x, enemy.y);
        enemy.destroy();
    }

    damagePlayer(player) {
        if (!player.isHurt) {
            this.scene.timeLeft -= GAMEPLAY.PENALTIES.HIT_TIME_LOSS;
            this.scene.hud.updateTime(this.scene.timeLeft);
            
            player.isHurt = true;
            player.setTint(0xff0000);
            
            this.scene.time.delayedCall(GAMEPLAY.PENALTIES.INVULNERABLE_TIME, () => {
                player.clearTint();
                player.isHurt = false;
            });
        }
    }

    createDefeatEffect(x, y) {
        const effect = this.scene.add.circle(
            x, y,
            GAMEPLAY.EFFECTS.DEFEAT_RADIUS,
            GAMEPLAY.EFFECTS.DEFEAT_COLOR,
            GAMEPLAY.EFFECTS.DEFEAT_ALPHA
        );

        this.scene.tweens.add({
            targets: effect,
            alpha: 0,
            scale: GAMEPLAY.EFFECTS.DEFEAT_SCALE,
            duration: GAMEPLAY.EFFECTS.DEFEAT_DURATION,
            onComplete: () => effect.destroy()
        });
    }

    createSaveEffect(x, y) {
        this.createDefeatEffect(x, y); // Mesmo efeito visual por enquanto
    }
} 