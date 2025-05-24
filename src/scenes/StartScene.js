export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        // Criar uma textura básica para aplicar cores
        this.createBaseTextures();
    }

    createBaseTextures() {
        // Criar uma textura de pixel branco
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFFFFFF);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('pixel', 32, 32);
    }

    create() {
        // Cor de fundo
        this.cameras.main.setBackgroundColor('#000033');
        
        // Título do jogo
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Pixel Love - A Jornada de Isaías por Helena', 
            { 
                fontSize: '32px', 
                fontFamily: 'Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
        
        // Botão de início
        const startButton = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            300, 
            80, 
            0x9966ff
        ).setInteractive();
        
        const startText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 50, 
            'Começar Jornada', 
            { 
                fontSize: '24px', 
                fontFamily: 'Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5);
        
        // Créditos
        this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height - 50, 
            'Feito por Isaías para Helena', 
            { 
                fontSize: '16px', 
                fontFamily: 'Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5);
        
        // Evento de clique no botão de início
        startButton.on('pointerdown', () => {
            this.scene.start('Dog1Scene');
        });
        
        // Adiciona efeito hover no botão
        startButton.on('pointerover', () => {
            startButton.fillColor = 0x7744dd;
        });
        
        startButton.on('pointerout', () => {
            startButton.fillColor = 0x9966ff;
        });
    }
} 