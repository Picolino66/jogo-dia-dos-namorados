export default class Dog1Scene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Dog1Scene' });
        this.savedDogs = 0;
        this.timeLeft = 120; // Mais tempo para um mapa maior
        this.mapWidth = 6400; // Mapa muito mais largo para espalhar os personagens
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
        this.cameras.main.setBackgroundColor('#3a7e4c');
        
        // Definir os limites do mundo físico (crucial para permitir andar todo o mapa)
        this.physics.world.setBounds(0, 0, this.mapWidth, 600);
        
        // Configurar câmera para seguir o jogador
        this.cameras.main.setBounds(0, 0, this.mapWidth, 600);
        
        // Informações na tela (HUD) - fixas na câmera
        this.scoreText = this.add.text(16, 16, 'Cachorros salvos: 0/10', { 
            fontSize: '18px', 
            fontFamily: 'Arial',
            fill: '#ffffff' 
        }).setScrollFactor(0);
        
        this.timeText = this.add.text(16, 50, 'Tempo: ' + this.timeLeft, { 
            fontSize: '18px', 
            fontFamily: 'Arial',
            fill: '#ffffff' 
        }).setScrollFactor(0);
        
        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        
        // Criar plataformas ao longo do mapa
        this.createPlatforms();
        
        // Ativar o debug visual para as plataformas
        this.addDebugVisual();
        
       // Criar o personagem (Isaías) - com os pés exatamente na plataforma
        const PLAYER_HEIGHT       = 32; // Altura visual posição
        const PLAYER_VISUAL_WIDTH = 25; // Largura visual
        const PLAYER_VISUAL_HEIGHT = 70; // Largura visual
        const PLAYER_BODY_WIDTH   = PLAYER_VISUAL_WIDTH; // Largura do hitbox
        const PLAYER_BODY_HEIGHT  = 30; // Corpo rosa
        const BASE_PLATFORM_Y = 580; // y central da plataforma do chão
        const BASE_PLATFORM_H = 400;  // altura da plataforma do chão
        const basePlatformTop = BASE_PLATFORM_Y - BASE_PLATFORM_H / 2;

        this.player = this.physics.add
        .sprite(100, basePlatformTop, 'pixel')
        .setOrigin(0, 1) // pivô na base
        .setSize(PLAYER_VISUAL_WIDTH, PLAYER_BODY_HEIGHT);

        // Alinha o corpo (hitbox) no centro e na base do sprite:
        const playerOffsetX = (PLAYER_VISUAL_WIDTH - PLAYER_BODY_WIDTH) / 2;
        const playerOffsetY = PLAYER_HEIGHT - PLAYER_BODY_HEIGHT;
        this.player.body.setOffset(playerOffsetX, playerOffsetY);


        this.player
        .setDisplaySize(PLAYER_VISUAL_WIDTH, PLAYER_VISUAL_HEIGHT)
        this.player
        .setTint(0x1E90FF)
        .setBounce(0.2)
        .setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);
        this.cameras.main.startFollow(this.player);

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Cachorros
        this.dogs = this.physics.add.group();
        
        // Mendigos
        this.enemies = this.physics.add.group();
        
        // Fogos
        this.fires = this.physics.add.group();
        
        // Criar os 10 cachorros e seus protetores (5 mendigos e 5 fogos)
        this.createDogsAndProtectors();
        
        // Adicionar colisões - MUITO IMPORTANTE!
        this.physics.add.collider(this.dogs, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.fires, this.platforms); // Adicionar collider para o fogo
        
        // Sobreposições
        this.physics.add.overlap(this.player, this.dogs, this.saveDog, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.fires, this.hitFire, null, this);
        
        // Timer
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
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
        
        // Atualizar comportamento dos mendigos
        this.updateEnemies();
        
        // Verificações de fim de jogo
        if (this.savedDogs >= 10) {
            this.gameWin();
        }
        
        if (this.timeLeft <= 0) {
            this.gameOver();
        }
        
        // Debugging - mostrar posição do jogador (para verificar limites do mapa)
        if (this.frameCounter === undefined) this.frameCounter = 0;
        this.frameCounter++;
        
        if (this.frameCounter % 60 === 0) { // A cada segundo aproximadamente
            console.log(`Posição do jogador: x=${Math.floor(this.player.x)}, y=${Math.floor(this.player.y)}`);
        }
    }
    
    createPlatforms() {
        // Plataforma base (chão) ao longo de todo o mapa
        const basePlatform = this.add.rectangle(this.mapWidth/2, 580, this.mapWidth, 40, 0x654321).setOrigin(0.5);
        this.platforms.add(basePlatform);
        
        // Plataformas distribuídas ao longo do mapa - com diferenças de altura mais significativas
        const platforms = [
            { x: 300, y: 450, width: 200, height: 20 },  // Plataforma 1
            { x: 800, y: 380, width: 200, height: 20 },  // Plataforma 2 - mais baixa
            { x: 1300, y: 300, width: 200, height: 20 }, // Plataforma 3 - mais alta
            { x: 1800, y: 420, width: 200, height: 20 }, // Plataforma 4 - mais baixa
            { x: 2300, y: 340, width: 200, height: 20 }, // Plataforma 5 - média altura
            { x: 2800, y: 250, width: 200, height: 20 }, // Plataforma 6 - mais alta
            { x: 3300, y: 420, width: 200, height: 20 }, // Plataforma 7 - mais baixa
            { x: 3800, y: 340, width: 200, height: 20 }, // Plataforma 8 - média altura
            { x: 4300, y: 270, width: 200, height: 20 }, // Plataforma 9 - alta
            { x: 4800, y: 370, width: 200, height: 20 }, // Plataforma 10 - média baixa
            { x: 5300, y: 300, width: 200, height: 20 }, // Plataforma 11 - média
            { x: 5800, y: 400, width: 200, height: 20 }  // Plataforma 12 - baixa
        ];
        
        platforms.forEach(plat => {
            const platform = this.add.rectangle(plat.x, plat.y, plat.width, plat.height, 0x654321).setOrigin(0.5);
            this.platforms.add(platform);
        });
        
        // Atualizar corpos estáticos corretamente (não usar refresh)
        this.platforms.getChildren().forEach(p => p.body.updateFromGameObject());
    }
    
    createDogsAndProtectors() {
        // Usar as alturas corretas para corresponder exatamente às plataformas
        const dogPositions = [
            { x: 300, y: 450, protector: 'fire' },   // Plataforma em y=450
            { x: 800, y: 380, protector: 'enemy' },  // Plataforma em y=380
            { x: 1300, y: 300, protector: 'fire' },  // Plataforma em y=300
            { x: 1800, y: 420, protector: 'enemy' }, // Plataforma em y=420
            { x: 2300, y: 340, protector: 'fire' },  // Plataforma em y=340
            { x: 2800, y: 250, protector: 'enemy' }, // Plataforma em y=250
            { x: 3300, y: 420, protector: 'fire' },  // Plataforma em y=420
            { x: 3800, y: 340, protector: 'enemy' }, // Plataforma em y=340
            { x: 4300, y: 270, protector: 'fire' },  // Plataforma em y=270
            { x: 4800, y: 370, protector: 'enemy' }  // Plataforma em y=370
        ];


        // Criar os 10 cachorros com seus respectivos protetores
        let dogsCreated = 0;
        const ENEMY_HEIGHT = 0; // Altura visual aumentada
        const ENEMY_VISUAL_WIDTH = 25; // Largura visual diminuída
        const ENEMY_VISUA_HEIGHT = 70; // ALtura visual diminuída
        const ENEMY_BODY_WIDTH = ENEMY_VISUAL_WIDTH;
        const ENEMY_BODY_HEIGHT = 30;
        
        const DOG_HEIGHT = 25; // Altura visual aumentada
        const DOG_VISUAL_WIDTH = 20; // Largura visual diminuída
        const DOG_VISUA_HEIGHT = 10; // ALtura visual diminuída
        const DOG_BODY_WIDTH = 20;
        const DOG_BODY_HEIGHT = 25;
        
        const FIRE_HEIGHT = 70; // Altura visual aumentada
        const FIRE_VISUAL_WIDTH = 25; // Largura visual diminuída
        const FIRE_VISUAL_HEIGHT = 0; // ALtura visual diminuída
        const FIRE_BODY_WIDTH = 20;
        const FIRE_BODY_HEIGHT = 35;
        
        const PLATFORM_HEIGHT = 20;
        
        dogPositions.forEach((pos, index) => {
            // Calcular posições precisas
            const platTop = pos.y - PLATFORM_HEIGHT/2; // Topo da plataforma
            
            // Criar o cachorro exatamente sobre a plataforma
            const dog = this.dogs.create(pos.x, platTop, 'pixel');
            dog.setOrigin(0.5, 1) // Origem na base do cachorro
                .setDisplaySize(DOG_VISUAL_WIDTH, DOG_HEIGHT)
                .setSize(DOG_BODY_WIDTH, DOG_BODY_HEIGHT)
                .setTint(0xD2B48C)
                .setBounce(0.2)
                .setCollideWorldBounds(true);
            
            // Calcular offset conforme erro1.md - com sinal negativo para offsetY
            const dogOffsetX = (DOG_VISUAL_WIDTH - DOG_BODY_WIDTH)/2;
            dog.body.setOffset(dogOffsetX, DOG_VISUA_HEIGHT);
            
            dog.body.setAllowGravity(true);
            dog.dogId = index + 1;
            dogsCreated++;
            
            if (pos.protector === 'enemy') {
                // Mendigo: posicionado ao lado do cachorro com pés na plataforma
                const enemyX = pos.x - 70;
                
                const enemy = this.enemies.create(enemyX, platTop, 'pixel');
                enemy.setOrigin(0, 1) // Origem na base do inimigo
                    .setDisplaySize(ENEMY_VISUAL_WIDTH, ENEMY_VISUA_HEIGHT)
                    .setSize(ENEMY_BODY_WIDTH, ENEMY_BODY_HEIGHT)
                    .setTint(0x8B4513)
                    .setBounce(0.2)
                    .setCollideWorldBounds(true);
                
                // Calcular offset conforme erro1.md - com sinal negativo para offsetY
                const enemyOffsetX = (ENEMY_VISUAL_WIDTH - ENEMY_BODY_WIDTH)/2;
                enemy.body.setOffset(enemyOffsetX, ENEMY_HEIGHT);
                
                enemy.body.setAllowGravity(true);
                enemy.isAggressive = false;
                enemy.visionRange = 200;
                enemy.originalX = enemyX;
            } else if (pos.protector === 'fire') {
                // Fogo: posicionado na frente do cachorro com base fixada na plataforma
                const fireX = pos.x-50;
                
                const fire = this.fires.create(fireX, platTop, 'pixel')
                .setOrigin(0, 1) // Mesmo princípio do player
                .setSize(FIRE_BODY_WIDTH, FIRE_BODY_HEIGHT);
                
                const fireOffsetX = (FIRE_VISUAL_WIDTH - FIRE_BODY_WIDTH) / 2;
                const fireOffsetY = FIRE_VISUAL_HEIGHT;
                fire.body.setOffset(fireOffsetX, fireOffsetY);

                fire
                    .setDisplaySize(FIRE_VISUAL_WIDTH, FIRE_HEIGHT)
                    .setTint(0xFF4500)
                    .setImmovable(true);
                    
                
                fire.body.setAllowGravity(false);
                
                // Animação: apenas escala Y para crescer para cima
                this.tweens.add({
                    targets: fire,
                    scaleY: 0.25,
                    duration: 2000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });
        
        this.physics.add.collider(this.enemies, this.platforms);
        console.log(`Total de cachorros criados: ${dogsCreated}`);
    }
    
    updateEnemies() {
        this.enemies.getChildren().forEach(enemy => {
            // Verificar se o jogador está no campo de visão
            const distanceX = Math.abs(this.player.x - enemy.x);
            const distanceY = Math.abs(this.player.y - enemy.y);
            
            if (distanceX < enemy.visionRange && distanceY < 100) {
                // Jogador detectado - ficar agressivo
                enemy.isAggressive = true;
            }
            
            if (enemy.isAggressive) {
                // Perseguir o jogador
                const direction = this.player.x < enemy.x ? -1 : 1;
                enemy.setVelocityX(50 * direction);
            } else {
                // Ficar parado ou andar um pouco ao redor do ponto inicial
                const distFromStart = Math.abs(enemy.x - enemy.originalX);
                
                if (distFromStart > 30) {
                    // Voltar para posição original
                    const direction = enemy.originalX < enemy.x ? -1 : 1;
                    enemy.setVelocityX(30 * direction);
                } else {
                    // Movimento aleatório pequeno
                    if (Phaser.Math.Between(0, 100) < 2) {
                        enemy.setVelocityX(Phaser.Math.Between(-20, 20));
                    }
                }
            }
        });
    }
    
    hitEnemy(player, enemy) {
        // Verificar se o jogador está pulando em cima do inimigo
        if (player.body.velocity.y > 0 && player.y < enemy.y - enemy.height/2) {
            // Pulo bem sucedido - derrotar o inimigo
            player.setVelocityY(-200); // Pequeno salto após derrotar
            
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
            
            // Remover o inimigo
            enemy.destroy();
        } else {
            // Colisão lateral - jogador perde tempo
            if (!player.isHurt) {
                this.timeLeft -= 5; // Penalidade de tempo
                this.timeText.setText('Tempo: ' + this.timeLeft);
                
                // Efeito visual e invulnerabilidade temporária
                player.isHurt = true;
                player.setTint(0xff0000);
                
                this.time.delayedCall(1000, () => {
                    player.clearTint();
                    player.isHurt = false;
                });
            }
        }
    }
    
    hitFire(player, fire) {
        // Verificar se o fogo está na fase "baixa" da animação
        if (fire.scaleY < 0.5 && !player.isHurt) {
            // Fogo baixo - seguro passar
            return;
        }
        
        // Fogo alto - jogador perde tempo
        if (!player.isHurt) {
            this.timeLeft -= 5; // Penalidade de tempo
            this.timeText.setText('Tempo: ' + this.timeLeft);
            
            // Efeito visual e invulnerabilidade temporária
            player.isHurt = true;
            player.setTint(0xff0000);
            
            this.time.delayedCall(1000, () => {
                player.clearTint();
                player.isHurt = false;
            });
        }
    }
    
    saveDog(player, dog) {
        dog.destroy();
        this.savedDogs++;
        this.scoreText.setText('Cachorros salvos: ' + this.savedDogs + '/10');
        
        // Criar um efeito visual de resgate
        const savedEffect = this.add.circle(dog.x, dog.y, 30, 0x00ff00, 0.8);
        this.tweens.add({
            targets: savedEffect,
            alpha: 0,
            scale: 2,
            duration: 500,
            onComplete: () => {
                savedEffect.destroy();
            }
        });
    }
    
    updateTimer() {
        this.timeLeft--;
        this.timeText.setText('Tempo: ' + this.timeLeft);
    }
    
    gameWin() {
        this.timeEvent.remove();
        
        // Texto de vitória
        const winText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            'Por você, até brigo com um mendigo...', 
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
        ).setOrigin(0.5).setScrollFactor(0);
        
        // Pausa antes de ir para a próxima fase
        this.time.delayedCall(3000, () => {
            this.scene.start('Davi2Scene');
        });
    }
    
    gameOver() {
        this.timeEvent.remove();
        
        // Texto de derrota
        const gameOverText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            'Tempo esgotado!\nNão foram todos salvos...', 
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
        ).setOrigin(0.5).setScrollFactor(0);
        
        // Botão para tentar novamente
        const retryButton = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            200, 
            50, 
            0x9966ff
        ).setInteractive().setScrollFactor(0);
        
        const retryText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 100, 
            'Tentar Novamente', 
            { 
                fontSize: '18px', 
                fontFamily: 'Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5).setScrollFactor(0);
        
        retryButton.on('pointerdown', () => {
            this.scene.restart();
        });
    }

    // Adicionar método para ajudar no debug visual
    addDebugVisual() {
        // Adicionar linhas nas plataformas para visualizar melhor
        this.platforms.getChildren().forEach(platform => {
            const line = this.add.line(
                platform.x, 
                platform.y - platform.height/2, 
                0, 0, 
                platform.width, 0, 
                0xFF0000
            ).setOrigin(0.5, 0);
            line.setLineWidth(2);
        });
    }
} 