import GameFactory from './GameFactory.js';
import FireSprite from '../entities/FireSprite.js';

export default class FireFactory extends GameFactory {
    create(x, y, config = {}) {
        this.validatePosition(x, y);
        return new FireSprite(this.scene, x, y);
    }

    createGroup() {
        return this.scene.add.group({
            classType: FireSprite,
            runChildUpdate: false
        });
    }
} 