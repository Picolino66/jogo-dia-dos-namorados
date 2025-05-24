export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
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
        // Fundo com gradiente e animação
        this.createAnimatedBackground();
        
        // Título
        this.add.text(
            this.cameras.main.centerX, 
            100, 
            'Feliz Dia dos Namorados, Helena!', 
            { 
                fontSize: '32px', 
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#ffffff',
                stroke: '#ff66cc',
                strokeThickness: 3
            }
        ).setOrigin(0.5);
        
        // Mensagem do Isaías para Helena
        const message = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            'Do BH até Lavras, dos doguinhos aos touros,\ntudo vale a pena por você.\n\nEu te amo!', 
            { 
                fontSize: '22px', 
                fontFamily: 'Arial',
                fill: '#ffffff',
                align: 'center',
                lineSpacing: 10
            }
        ).setOrigin(0.5);
        
        // Adicionar um efeito de brilho pulsante no texto
        this.tweens.add({
            targets: message,
            alpha: 0.8,
            yoyo: true,
            repeat: -1,
            duration: 1500
        });
        
        // Coração pulsante
        const heart = this.add.graphics();
        heart.fillStyle(0xff0066, 1);
        
        // Desenhar um coração (com formas básicas)
        heart.fillCircle(this.cameras.main.centerX - 15, this.cameras.main.centerY + 120, 30);
        heart.fillCircle(this.cameras.main.centerX + 15, this.cameras.main.centerY + 120, 30);
        heart.fillTriangle(
            this.cameras.main.centerX - 40, this.cameras.main.centerY + 130, 
            this.cameras.main.centerX + 40, this.cameras.main.centerY + 130,
            this.cameras.main.centerX, this.cameras.main.centerY + 180
        );
        
        // Animação de pulsação do coração
        this.tweens.add({
            targets: heart,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
            repeat: -1,
            duration: 800
        });
        
        // Botão para reiniciar jogo
        const restartButton = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.height - 80,
            200, 
            50, 
            0x9966ff
        ).setInteractive();
        
        const restartText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height - 80, 
            'Jogar Novamente', 
            { 
                fontSize: '18px', 
                fontFamily: 'Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5);
        
        // Botão do QR Code (opcional - implementação básica)
        const qrButton = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.height - 20,
            200, 
            30, 
            0x33cc99
        ).setInteractive();
        
        const qrText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height - 20, 
            'Ver QR Code', 
            { 
                fontSize: '14px', 
                fontFamily: 'Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5);
        
        // Evento de clique no botão de reiniciar
        restartButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
        
        // Hover para botões
        this.setupButtonHover(restartButton, 0x9966ff, 0x7744dd);
        this.setupButtonHover(qrButton, 0x33cc99, 0x22aa77);
        
        // Evento de clique no botão QR Code (placeholder)
        qrButton.on('pointerdown', () => {
            // Aqui poderia abrir uma modal com o QR code
            const qrMessage = this.add.text(
                this.cameras.main.centerX, 
                this.cameras.main.centerY,
                'QR Code para jogar novamente\nou compartilhar!',
                {
                    fontSize: '20px',
                    fontFamily: 'Arial',
                    backgroundColor: '#000000',
                    padding: {
                        left: 15,
                        right: 15,
                        top: 10,
                        bottom: 10
                    },
                    fill: '#ffffff'
                }
            ).setOrigin(0.5);
            
            // Mostrar temporariamente
            this.time.delayedCall(3000, () => {
                qrMessage.destroy();
            });
        });
    }
    
    createAnimatedBackground() {
        // Camada de fundo gradiente
        const bg = this.add.graphics();
        
        // Gradiente do céu noturno romântico
        const colors = [0x220033, 0x330066, 0x550088, 0x2200aa];
        const colorStops = [0, 0.3, 0.6, 1];
        
        // Criar partículas para um efeito de estrelas
        const particles = this.add.particles(0, 0, 'pixel', {
            quantity: 1,
            frequency: 100,
            lifespan: 5000,
            gravityY: 0,
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            tint: [0xffffff, 0xffffaa, 0xaaaaff],
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(0, 0, 800, 600)
            }
        });
        
        // Desenhar o fundo
        const updateBackground = () => {
            bg.clear();
            bg.fillGradientStyle(
                colors[0], colors[1], colors[2], colors[3], 
                1, 1, 1, 1, 
                colorStops
            );
            bg.fillRect(0, 0, 800, 600);
            
            // Rotacionar cores para efeito gradiente animado
            colors.push(colors.shift());
        };
        
        updateBackground();
        
        // Atualizar gradiente a cada 2 segundos
        this.time.addEvent({
            delay: 2000,
            callback: updateBackground,
            callbackScope: this,
            loop: true
        });
    }
    
    setupButtonHover(button, defaultColor, hoverColor) {
        button.on('pointerover', () => {
            button.fillColor = hoverColor;
        });
        
        button.on('pointerout', () => {
            button.fillColor = defaultColor;
        });
    }
} 