import GameFactory from './GameFactory.js';
import EnemySprite from '../entities/EnemySprite.js';
import DogSprite from '../entities/DogSprite.js';
import FireSprite from '../entities/FireSprite.js';
import { COLORS } from '../constants/game.js';

export default class EnemyFactory extends GameFactory {
    create(x, y, config = {}) {
        this.validatePosition(x, y);
        return new EnemySprite(this.scene, x, y);
    }

    createGroup() {
        return this.scene.add.group({
            classType: EnemySprite,
            runChildUpdate: true
        });
    }

    createDog(x, y) {
        this.validatePosition(x, y);
        return new DogSprite(this.scene, x, y);
    }

    createFire(x, y) {
        this.validatePosition(x, y);
        return new FireSprite(this.scene, x, y);
    }

    createPatrol(x, y, width, config = {}) {
        const enemy = this.create(x, y, config);
        enemy.setPatrolArea(width);
        return enemy;
    }
} 