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

    handleEnemyCollision(player, enemy) {
        // Verificar se o jogador está caindo (velocidade Y positiva)
        if (player.body.velocity.y > 0) {
            // Verificar se o jogador está acima do inimigo
            // Usamos uma verificação mais simples baseada apenas na posição Y
            if (player.y < enemy.y - 30) { // Margem de 30 pixels para facilitar o acerto
                // Jogador matou o inimigo
                player.setVelocityY(-300);
                enemy.destroy();
                this.createDefeatEffect(enemy.x, enemy.y);
                return;
            }
        }
        
        // Se não matou o inimigo e não está invulnerável, toma dano
        if (!player.isHurt) {
            this.damagePlayer(player);
        }
    }

    handleDogCollision(player, dog) {
        if (!player.isHurt) {
            dog.checkPlayerProximity(player);
        }
    }

    handleFireCollision(player, fire) {
        if (fire.scaleY < 0.5 && !player.isHurt) {
            return;
        }
        this.damagePlayer(player);
    }

    damagePlayer(player) {
        if (player.isHurt) return;
        
        player.isHurt = true;
        player.setTint(0xff0000);
        
        this.scene.time.delayedCall(1000, () => {
            player.isHurt = false;
            player.clearTint();
        });
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
        this.createDefeatEffect(x, y);
    }
} 