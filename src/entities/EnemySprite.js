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
        this.setImmovable(false); // Mudamos para false para permitir colisões
        
        this.moveSpeed = PHYSICS.ENEMY.MOVE_SPEED;
        this.patrolSpeed = PHYSICS.ENEMY.PATROL_SPEED;
        this.visionRange = PHYSICS.ENEMY.VISION_RANGE;
        this.patrolRange = PHYSICS.ENEMY.PATROL_RANGE;
        
        // Posição inicial para patrulha
        this.startPatrolX = this.x;
        this.direction = 1;
        this.isPatrolling = true;
    }

    update(player) {
        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.x, this.y,
            player.x, player.y
        );

        if (distanceToPlayer <= this.visionRange) {
            this.chasePlayer(player);
            this.isPatrolling = false;
        } else {
            this.patrol();
            this.isPatrolling = true;
        }
    }

    chasePlayer(player) {
        const direction = player.x < this.x ? -1 : 1;
        this.setVelocityX(direction * this.moveSpeed);
        this.direction = direction;
    }

    patrol() {
        // Verifica se está dentro da área de patrulha
        const distanceFromStart = this.x - this.startPatrolX;
        
        // Inverte a direção se atingir o limite da patrulha ou se colidir
        if (Math.abs(distanceFromStart) >= this.patrolRange || 
            (this.body.touching.left || this.body.touching.right)) {
            this.direction *= -1;
            // Ajusta a posição levemente para evitar travamento
            this.x += this.direction * 5;
        }
        
        // Move na direção atual com velocidade de patrulha
        this.setVelocityX(this.direction * this.patrolSpeed);
    }
}