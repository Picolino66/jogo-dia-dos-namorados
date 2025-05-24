import GameFactory from './GameFactory.js';
import PlayerSprite from '../entities/PlayerSprite.js';

export default class PlayerFactory extends GameFactory {
    create(x, y, config = {}) {
        this.validatePosition(x, y);
        return new PlayerSprite(this.scene, x, y);
    }

    createGroup() {
        return this.scene.add.group({
            classType: PlayerSprite,
            runChildUpdate: true
        });
    }
} 