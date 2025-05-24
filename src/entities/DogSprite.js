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
    }
} 