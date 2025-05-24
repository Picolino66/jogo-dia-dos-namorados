import { GAMEPLAY } from '../constants/game.js';

export default class GameSystem {
    constructor(scene) {
        this.scene = scene;
        this.setupGame();
    }

    setupGame() {
        this.scene.savedDogs = 0;
        this.scene.timeLeft = GAMEPLAY.TIME_LIMIT;
        
        this.timeEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.scene.timeLeft--;
        this.scene.hud.updateTime(this.scene.timeLeft);
        
        if (this.scene.timeLeft <= 0) {
            this.gameOver();
        }
    }

    checkWinCondition() {
        if (this.scene.savedDogs >= GAMEPLAY.REQUIRED_DOGS) {
            this.gameWin();
        }
    }

    gameWin() {
        this.timeEvent.remove();
        this.scene.hud.showWinMessage();
        
        this.scene.time.delayedCall(GAMEPLAY.WIN_DELAY, () => {
            this.scene.scene.start('Davi2Scene');
        });
    }

    gameOver() {
        this.timeEvent.remove();
        this.scene.hud.showGameOverMessage();
    }

    destroy() {
        if (this.timeEvent) {
            this.timeEvent.remove();
        }
    }
} 