import StartScene from './scenes/StartScene.js';
import Dog1Scene from './scenes/Dog1Scene.js';
import Davi2Scene from './scenes/Davi2Scene.js';
import Bull3Scene from './scenes/Bull3Scene.js';
import EndScene from './scenes/EndScene.js';

// Configuração do jogo
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [StartScene, Dog1Scene, Davi2Scene, Bull3Scene, EndScene],
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Inicialização do jogo
const game = new Phaser.Game(config); 