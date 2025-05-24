import GameSprite from './GameSprite.js';
import { COLORS } from '../constants/game.js';

export default class DogSprite extends GameSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'DOG');
        
        this.setupDog();
    }

    setupDog() {
        this.setTint(COLORS.DOG);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(true);
        
        // Manter a física original
        const originalWidth = this.width;
        const originalHeight = this.height;
        const originalBodyWidth = this.body.width+200;
        const originalBodyHeight = this.body.height+200;
        
        // Aplicar a animação
        this.play('dog-sad');
        
        // Restaurar as dimensões originais
        this.body.setSize(originalBodyWidth, originalBodyHeight);
        this.setDisplaySize(originalWidth, originalHeight);
    }
} 