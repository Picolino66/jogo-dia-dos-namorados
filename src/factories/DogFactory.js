import GameFactory from './GameFactory.js';
import DogSprite from '../entities/DogSprite.js';

export default class DogFactory extends GameFactory {
    create(x, y, config = {}) {
        this.validatePosition(x, y);
        return new DogSprite(this.scene, x, y);
    }

    createGroup() {
        return this.scene.add.group({
            classType: DogSprite,
            runChildUpdate: true
        });
    }
} 