import { UI } from '../constants/game.js';

export default class HUDSystem {
    constructor(scene) {
        this.scene = scene;
        this.createHUD();
    }

    createHUD() {
        this.scoreText = this.scene.add.text(
            UI.SCORE.X,
            UI.SCORE.Y,
            'Cachorros salvos: 0/10',
            {
                fontSize: UI.SCORE.FONT_SIZE,
                fontFamily: UI.SCORE.FONT_FAMILY,
                fill: UI.SCORE.COLOR
            }
        ).setScrollFactor(0);

        this.timeText = this.scene.add.text(
            UI.TIME.X,
            UI.TIME.Y,
            'Tempo: 120',
            {
                fontSize: UI.TIME.FONT_SIZE,
                fontFamily: UI.TIME.FONT_FAMILY,
                fill: UI.TIME.COLOR
            }
        ).setScrollFactor(0);
    }

    updateScore(saved, total) {
        this.scoreText.setText(`Cachorros salvos: ${saved}/${total}`);
    }

    updateTime(time) {
        this.timeText.setText(`Tempo: ${time}`);
    }

    showWinMessage() {
        return this.showMessage(UI.MESSAGES.WIN);
    }

    showGameOverMessage() {
        const container = this.showMessage(UI.MESSAGES.GAME_OVER);
        this.addRetryButton(container);
        return container;
    }

    showMessage(text) {
        const container = this.scene.add.container(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY
        ).setScrollFactor(0);

        const message = this.scene.add.text(
            0,
            0,
            text,
            {
                fontSize: UI.MESSAGES.FONT_SIZE,
                fontFamily: UI.MESSAGES.FONT_FAMILY,
                fill: UI.MESSAGES.COLOR,
                backgroundColor: UI.MESSAGES.BACKGROUND,
                padding: UI.MESSAGES.PADDING,
                align: 'center'
            }
        ).setOrigin(0.5);

        container.add(message);
        return container;
    }

    addRetryButton(container) {
        const button = this.scene.add.rectangle(
            0,
            UI.BUTTON.Y_OFFSET,
            UI.BUTTON.WIDTH,
            UI.BUTTON.HEIGHT,
            UI.BUTTON.COLOR
        ).setInteractive();

        const text = this.scene.add.text(
            0,
            UI.BUTTON.Y_OFFSET,
            UI.MESSAGES.RETRY,
            {
                fontSize: UI.MESSAGES.BUTTON_FONT_SIZE,
                fontFamily: UI.MESSAGES.FONT_FAMILY,
                fill: UI.MESSAGES.COLOR
            }
        ).setOrigin(0.5);

        button.on('pointerdown', () => {
            this.scene.scene.restart();
        });

        container.add([button, text]);
    }
} 