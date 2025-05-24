import GameFactory from './GameFactory.js';
import PlatformSprite from '../entities/PlatformSprite.js';
import { GAMEPLAY } from '../constants/game.js';

export default class PlatformFactory extends GameFactory {
    create(x, y, width, height = GAMEPLAY.PLATFORM.BASE_HEIGHT) {
        this.validatePosition(x, y);
        return new PlatformSprite(this.scene, x, y, width, height);
    }

    createGroup() {
        return this.scene.add.group({
            classType: PlatformSprite,
            runChildUpdate: false
        });
    }

    createBase() {
        return this.create(
            0,
            GAMEPLAY.PLATFORM.BASE_Y,
            GAMEPLAY.MAP_WIDTH,
            GAMEPLAY.PLATFORM.BASE_HEIGHT
        );
    }

    createFloating(x, y, width) {
        return this.create(x, y, width);
    }
} 