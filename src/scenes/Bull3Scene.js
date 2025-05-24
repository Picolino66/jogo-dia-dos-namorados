export default class Bull3Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Bull3Scene' });
        this.attempts = 0;
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
        // Configuração inicial da fase - estilo arena
        this.cameras.main.setBackgroundColor('#8B4513');  // Marrom (terra da arena)
        
        // Criar a arena
        this.createArena();
        
        // Informações na tela (HUD)
        this.attemptsText = this.add.text(16, 16, 'Tentativas: 0', { 
            fontSize: '18px', 
            fontFamily: 'Arial',
            fill: '#ffffff' 
        });
        
        // Criar o personagem (Isaías) - visão de cima
        this.player = this.physics.add.sprite(400, 550, 'pixel');
        this.player.setSize(30, 30);
        this.player.setDisplaySize(30, 30);
        this.player.setTint(0x1E90FF);  // Azul brilhante para o protagonista
        this.player.setCollideWorldBounds(true);
        
        // Desativar a gravidade (é um jogo top-down)
        this.player.body.setAllowGravity(false);
        
        // Criar o objetivo (Helena) no centro
        this.helena = this.physics.add.sprite(400, 120, 'pixel');
        this.helena.setSize(30, 30);
        this.helena.setDisplaySize(30, 30);
        this.helena.setTint(0xFF1493);  // Rosa forte/pink para Helena
        this.helena.body.setAllowGravity(false);
        this.helena.setImmovable(true);
        
        // Colisões com as bordas da arena
        this.physics.add.collider(this.player, this.walls);
        
        // Touros
        this.bulls = this.physics.add.group();
        
        // Timer para gerar touros
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnBull,
            callbackScope: this,
            loop: true
        });
        
        // Sobreposições
        this.physics.add.overlap(this.player, this.helena, this.reachHelena, null, this);
        this.physics.add.overlap(this.player, this.bulls, this.hitByBull, null, this);
        
        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Movimento do jogador (4 direções)
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }
        
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        } else {
            this.player.setVelocityY(0);
        }
        
        // Atualizar o movimento dos touros
        this.bulls.getChildren().forEach(bull => {
            // Rotacionar o touro para olhar na direção do movimento
            if (bull.body.velocity.x !== 0 || bull.body.velocity.y !== 0) {
                bull.rotation = Math.atan2(bull.body.velocity.y, bull.body.velocity.x);
            }
            
            // Remover touros que saíram da tela
            if (bull.x < -50 || bull.x > 850 || bull.y < -50 || bull.y > 650) {
                bull.destroy();
            }
        });
    }
    
    createArena() {
        // Criar paredes da arena
        this.walls = this.physics.add.staticGroup();
        
        // Bordas
        const borderThickness = 20;
        
        // Borda superior
        this.walls.add(this.add.rectangle(400, borderThickness/2, 800, borderThickness, 0x964B00)
            .setOrigin(0.5));
        
        // Borda inferior
        this.walls.add(this.add.rectangle(400, 600 - borderThickness/2, 800, borderThickness, 0x964B00)
            .setOrigin(0.5));
        
        // Borda esquerda
        this.walls.add(this.add.rectangle(borderThickness/2, 300, borderThickness, 600, 0x964B00)
            .setOrigin(0.5));
        
        // Borda direita
        this.walls.add(this.add.rectangle(800 - borderThickness/2, 300, borderThickness, 600, 0x964B00)
            .setOrigin(0.5));
        
        // Alguns obstáculos na arena
        this.walls.add(this.add.rectangle(200, 200, 80, 80, 0x964B00).setOrigin(0.5));
        this.walls.add(this.add.rectangle(600, 200, 80, 80, 0x964B00).setOrigin(0.5));
        this.walls.add(this.add.rectangle(400, 350, 120, 40, 0x964B00).setOrigin(0.5));
    }
    
    spawnBull() {
        // Posições para spawn de touros (nas bordas)
        const spawnPositions = [
            { x: Phaser.Math.Between(50, 750), y: -30 },  // Topo
            { x: Phaser.Math.Between(50, 750), y: 630 },  // Base
            { x: -30, y: Phaser.Math.Between(50, 550) },  // Esquerda
            { x: 830, y: Phaser.Math.Between(50, 550) }   // Direita
        ];
        
        const pos = Phaser.Utils.Array.GetRandom(spawnPositions);
        
        const bull = this.bulls.create(pos.x, pos.y, 'pixel');
        bull.setSize(40, 40);
        bull.setDisplaySize(40, 40);
        bull.setTint(0x4B0082);  // Púrpura escuro (touro "raivoso")
        bull.body.setAllowGravity(false);
        
        // Determinar a velocidade baseada na direção para o jogador
        const angle = Phaser.Math.Angle.Between(bull.x, bull.y, this.player.x, this.player.y);
        const speed = 200;
        
        bull.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
    }
    
    hitByBull(player, bull) {
        // Efeito visual
        const hitEffect = this.add.circle(player.x, player.y, 40, 0xff0000, 0.7);
        this.tweens.add({
            targets: hitEffect,
            alpha: 0,
            scale: 2,
            duration: 500,
            onComplete: () => {
                hitEffect.destroy();
            }
        });
        
        // Aumentar contagem de tentativas
        this.attempts++;
        this.attemptsText.setText('Tentativas: ' + this.attempts);
        
        // Resetar posição do jogador
        player.setPosition(400, 550);
        player.setVelocity(0, 0);
        
        // Remover o touro que atingiu
        bull.destroy();
    }
    
    reachHelena(player, helena) {
        // Texto de vitória
        const winText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            'Helena, você aceita namorar comigo?', 
            { 
                fontSize: '24px', 
                fontFamily: 'Arial',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }
        ).setOrigin(0.5);
        
        // Pausa antes de ir para a cena final
        this.time.delayedCall(3000, () => {
            this.scene.start('EndScene');
        });
        
        // Remover o jogador para que a função não seja chamada novamente
        player.destroy();
        
        // Parar spawn de touros
        this.time.removeAllEvents();
        
        // Limpar touros existentes
        this.bulls.clear(true, true);
    }
} 