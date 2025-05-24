export default class GameFactory {
    constructor(scene) {
        this.scene = scene;
    }

    create(x, y, config = {}) {
        throw new Error('Method create() must be implemented by child classes');
    }

    createGroup() {
        throw new Error('Method createGroup() must be implemented by child classes');
    }

    validatePosition(x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('Position coordinates must be numbers');
        }
    }
} 