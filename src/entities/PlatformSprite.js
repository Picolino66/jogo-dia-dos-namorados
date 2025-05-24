import { GAMEPLAY } from '../constants/game.js';

export default class PlatformSprite extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height = GAMEPLAY.PLATFORM.BASE_HEIGHT) {
        super(scene, x, y, width, height, GAMEPLAY.PLATFORM.COLOR);
        
        this.scene = scene;
        this.setupPlatform();
    }

    setupPlatform() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        
        this.setOrigin(0, 0);
        this.body.updateFromGameObject();
    }

    setDimensions(width, height) {
        this.width = width;
        this.height = height;
        this.body.updateFromGameObject();
    }

    destroy() {
        if (this.body) {
            this.body.destroy();
        }
        super.destroy();
    }
} 