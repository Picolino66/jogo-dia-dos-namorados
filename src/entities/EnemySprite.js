import GameSprite from './GameSprite.js';
import { PHYSICS, COLORS, DIMENSIONS } from '../constants/game.js';

export default class EnemySprite extends GameSprite {
    constructor(scene, x, y) {
        // Usar o primeiro sprite do mendigo como textura inicial
        super(scene, x, y, 'ENEMY', { texture: 'enemy-1' });
        this.setupEnemy();
    }

    setupEnemy() {
        // Configurar física e comportamento
        this.setBounce(PHYSICS.BOUNCE);
        this.setCollideWorldBounds(true);
        this.setImmovable(false);
        
        // Configurar dimensões do corpo de colisão
        const { BODY, VISUAL } = DIMENSIONS.ENEMY;
        this.body.setSize(BODY.WIDTH+200, BODY.HEIGHT+300);
        this.setDisplaySize(70, 80); // Tamanho visual maior para o sprite
        
        // Ajustar origem para alinhar com o chão
        this.setOrigin(0.5, 1);
        
        // Configurar movimento
        this.moveSpeed = PHYSICS.ENEMY.MOVE_SPEED;
        this.patrolSpeed = PHYSICS.ENEMY.PATROL_SPEED;
        this.visionRange = PHYSICS.ENEMY.VISION_RANGE;
        this.patrolRange = PHYSICS.ENEMY.PATROL_RANGE;
        
        // Posição inicial para patrulha
        this.startPatrolX = this.x;
        this.direction = 1;
        this.isPatrolling = true;

        // Iniciar animação
        this.play('enemy-walk');
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

        // Atualizar direção do sprite
        if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        } else if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        }
    }

    chasePlayer(player) {
        const direction = player.x < this.x ? -1 : 1;
        this.setVelocityX(direction * this.moveSpeed);
        this.direction = direction;
    }

    patrol() {
        const distanceFromStart = this.x - this.startPatrolX;
        
        if (Math.abs(distanceFromStart) >= this.patrolRange || 
            (this.body.touching.left || this.body.touching.right)) {
            this.direction *= -1;
            this.x += this.direction * 5;
        }
        
        this.setVelocityX(this.direction * this.patrolSpeed);
    }
}