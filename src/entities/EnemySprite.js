import GameSprite from './GameSprite.js';
import { PHYSICS, COLORS } from '../constants/game.js';

export default class EnemySprite extends GameSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ENEMY');
        
        this.setupEnemy();
    }

    setupEnemy() {
        this.setTint(COLORS.ENEMY);
        this.setBounce(PHYSICS.BOUNCE);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        
        this.moveSpeed = PHYSICS.ENEMY.MOVE_SPEED;
        this.visionRange = PHYSICS.ENEMY.VISION_RANGE;
        this.direction = 1;
    }

    update(player) {
        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.x, this.y,
            player.x, player.y
        );

        if (distanceToPlayer <= this.visionRange) {
            this.chasePlayer(player);
        } else {
            this.patrol();
        }
    }

    chasePlayer(player) {
        const direction = player.x < this.x ? -1 : 1;
        this.setVelocityX(direction * this.moveSpeed);
        this.direction = direction;
    }

    patrol() {
        this.setVelocityX(this.direction * (this.moveSpeed * 0.5));
        
        if (this.body.touching.right) {
            this.direction = -1;
        } else if (this.body.touching.left) {
            this.direction = 1;
        }
    }
} 