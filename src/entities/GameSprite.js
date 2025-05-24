import { DIMENSIONS } from '../constants/game.js';

export default class GameSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type, config = {}) {
        super(scene, x, y, config.texture || 'pixel');
        
        this.scene = scene;
        this.type = type;
        this.dimensions = DIMENSIONS[type];
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setupPhysics();
        this.setupVisuals();
    }

    setupPhysics() {
        const { WIDTH, HEIGHT } = this.dimensions.BODY;
        
        this.setOrigin(0, 1);
        this.body.setSize(WIDTH, HEIGHT);
        this.body.setOffset(0, 0);
    }

    setupVisuals() {
        const { WIDTH, HEIGHT } = this.dimensions.VISUAL;
        this.setDisplaySize(WIDTH, HEIGHT);
    }

    destroy() {
        if (this.body) {
            this.body.destroy();
        }
        super.destroy();
    }
} 