import GameSprite from './GameSprite.js';
import { PHYSICS, COLORS } from '../constants/game.js';

export default class PlayerSprite extends GameSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'PLAYER');
        
        this.setupPlayer();
    }

    setupPlayer() {
        this.setTint(COLORS.PLAYER);
        this.setBounce(PHYSICS.BOUNCE);
        this.setCollideWorldBounds(true);
        
        this.moveSpeed = PHYSICS.PLAYER.MOVE_SPEED;
        this.jumpForce = PHYSICS.PLAYER.JUMP_FORCE;
        this.isJumping = false;
    }

    move(direction) {
        this.setVelocityX(direction * this.moveSpeed);
    }

    jump() {
        if (this.body.touching.down && !this.isJumping) {
            this.setVelocityY(this.jumpForce);
            this.isJumping = true;
        }
    }

    update() {
        if (this.body.touching.down) {
            this.isJumping = false;
        }
    }
} 