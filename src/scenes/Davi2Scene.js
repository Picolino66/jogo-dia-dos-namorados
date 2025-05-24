export default class Davi2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Davi2Scene' });
        this.score = 0;
        this.health = 3;
        this.wave = 1;
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
        // Configuração inicial da fase
        this.cameras.main.setBackgroundColor('#3a567e');
        
        // Informações na tela (HUD)
        this.scoreText = this.add.text(16, 16, 'Palavras ouvidas: 0', { 
            fontSize: '18px', 
            fontFamily: 'Arial',
            fill: '#ffffff' 
        });
        
        this.healthText = this.add.text(16, 50, 'Vidas: 3', { 
            fontSize: '18px', 
            fontFamily: 'Arial',
            fill: '#ffffff' 
        });
        
        this.waveText = this.add.text(16, 84, 'Onda: 1', { 
            fontSize: '18px', 
            fontFamily: 'Arial',
            fill: '#ffffff' 
        });
        
        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        
        // Plataforma base (chão)
        this.platforms.add(this.add.rectangle(400, 580, 800, 40, 0x654321).setOrigin(0.5));
        
        // Criar o personagem (Isaías)
        this.player = this.physics.add.sprite(100, 450, 'pixel');
        this.player.setSize(30, 60);
        this.player.setDisplaySize(30, 60);
        this.player.setTint(0x1E90FF);  // Azul brilhante para o protagonista
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        // Colisão entre o jogador e as plataformas
        this.physics.add.collider(this.player, this.platforms);
        
        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Criação de inimigos (Davi Brito)
        this.enemies = this.physics.add.group();
        
        // Colisões
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Sobreposições para pular na cabeça dos inimigos
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        
        // Iniciar a primeira onda
        this.spawnWave();
    }

    update() {
        // Movimento do jogador
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }
        
        // Pulo
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        
        // Movimento dos inimigos - perseguir o jogador lentamente
        this.enemies.getChildren().forEach(enemy => {
            const distanceX = this.player.x - enemy.x;
            
            // Se estiver próximo, mostrar a fala "de gue?"
            if (Math.abs(distanceX) < 150 && !enemy.hasSpoken) {
                enemy.hasSpoken = true;
                this.showSpeechBubble(enemy, 'de gue?');
            }
            
            // Mover em direção ao jogador
            if (distanceX > 0) {
                enemy.setVelocityX(50);
            } else {
                enemy.setVelocityX(-50);
            }
        });
        
        // Verificação para a próxima onda
        if (this.enemies.getChildren().length === 0 && this.wave < 5) {
            this.wave++;
            this.waveText.setText('Onda: ' + this.wave);
            this.spawnWave();
        }
        
        // Verificações de fim de jogo
        if (this.health <= 0) {
            this.gameOver();
        }
        
        if (this.wave >= 5 && this.enemies.getChildren().length === 0) {
            this.gameWin();
        }
    }
    
    spawnWave() {
        // Número de inimigos baseado na onda atual
        for (let i = 0; i < this.wave; i++) {
            const x = Phaser.Math.Between(100, 700);
            
            const enemy = this.enemies.create(x, 0, 'pixel');
            enemy.setSize(30, 50);
            enemy.setDisplaySize(30, 50);
            enemy.setTint(0xFFD700);  // Dourado para Davi (referência ao cabelo)
            enemy.setBounce(0.2);
            enemy.setCollideWorldBounds(true);
            enemy.hasSpoken = false;
            
            // Propriedade para verificar se o jogador está pulando nele
            enemy.canBeJumpedOn = true;
        }
    }
    
    hitEnemy(player, enemy) {
        // Verificar se o jogador está caindo (pulando) sobre o inimigo
        if (player.body.velocity.y > 0 && player.y < enemy.y - enemy.height/2) {
            if (enemy.canBeJumpedOn) {
                enemy.canBeJumpedOn = false;
                player.setVelocityY(-250);  // Pequeno salto ao derrotar um inimigo
                this.defeatEnemy(enemy);
            }
        } else {
            // Colisão lateral - jogador perde vida
            if (!player.isInvulnerable) {
                this.playerHit();
            }
        }
    }
    
    defeatEnemy(enemy) {
        this.score++;
        this.scoreText.setText('Palavras ouvidas: ' + this.score);
        
        // Efeito visual
        const defeatEffect = this.add.circle(enemy.x, enemy.y, 30, 0x00ff00, 0.8);
        this.tweens.add({
            targets: defeatEffect,
            alpha: 0,
            scale: 2,
            duration: 500,
            onComplete: () => {
                defeatEffect.destroy();
            }
        });
        
        // Destruir o inimigo
        enemy.destroy();
    }
    
    playerHit() {
        this.health--;
        this.healthText.setText('Vidas: ' + this.health);
        
        // Tornar o jogador invulnerável por um curto período
        this.player.isInvulnerable = true;
        this.player.alpha = 0.5;
        
        // Efeito visual
        this.player.setTint(0xff0000);
        
        // Restaurar após 1 segundo
        this.time.delayedCall(1000, () => {
            this.player.isInvulnerable = false;
            this.player.alpha = 1;
            this.player.clearTint();
        });
    }
    
    showSpeechBubble(character, text) {
        // Criar uma "bolha de fala" simples
        const bubble = this.add.graphics();
        bubble.fillStyle(0xffffff, 0.8);
        bubble.fillRoundedRect(character.x - 40, character.y - 60, 80, 30, 10);
        
        const speech = this.add.text(character.x, character.y - 45, text, {
            fontSize: '14px',
            fontFamily: 'Arial',
            fill: '#000000'
        }).setOrigin(0.5);
        
        // Fazer a bolha desaparecer após um tempo
        this.time.delayedCall(1500, () => {
            bubble.destroy();
            speech.destroy();
        });
    }
    
    gameWin() {
        // Texto de vitória
        const winText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            'Nem o Davi me impediu de te amar, Helena.', 
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
        
        // Pausa antes de ir para a próxima fase
        this.time.delayedCall(3000, () => {
            this.scene.start('Bull3Scene');
        });
    }
    
    gameOver() {
        // Texto de derrota
        const gameOverText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            'Game Over\nDemais "de gue" para você!', 
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
                },
                align: 'center'
            }
        ).setOrigin(0.5);
        
        // Botão para tentar novamente
        const retryButton = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            200, 
            50, 
            0x9966ff
        ).setInteractive();
        
        const retryText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 100, 
            'Tentar Novamente', 
            { 
                fontSize: '18px', 
                fontFamily: 'Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5);
        
        retryButton.on('pointerdown', () => {
            this.scene.restart();
        });
    }
} 