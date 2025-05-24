import GameSprite from './GameSprite.js';
import { COLORS } from '../constants/game.js';

export default class DogSprite extends GameSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'DOG');
        
        // Propriedades para controle do estado
        this.isHappy = false;
        
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

    // Método para tornar o cachorro feliz
    makeHappy() {
        if (!this.isHappy) {
            this.isHappy = true;
            this.play('dog-happy');
        }
    }

    // Verifica proximidade do jogador (para todos os cachorros)
    checkPlayerProximity(player) {
        if (!this.isHappy) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
            if (distance < 80) {
                this.makeHappy();
            }
        }
    }
} 