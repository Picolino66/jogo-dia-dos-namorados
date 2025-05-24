import GameSprite from './GameSprite.js';
import { COLORS } from '../constants/game.js';

export default class FireSprite extends GameSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'FIRE');
        
        this.setupFire();
    }

    setupFire() {
        this.setTint(COLORS.FIRE);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
    }
} 