import { COLORS, GAMEPLAY } from '../constants/game.js';
import HUDSystem from '../systems/HUDSystem.js';
import CollisionSystem from '../systems/CollisionSystem.js';
import AnimationSystem from '../systems/AnimationSystem.js';
import GameSystem from '../systems/GameSystem.js';

import PlayerFactory from '../factories/PlayerFactory.js';
import EnemyFactory from '../factories/EnemyFactory.js';
import DogFactory from '../factories/DogFactory.js';
import FireFactory from '../factories/FireFactory.js';
import PlatformFactory from '../factories/PlatformFactory.js';

export default class Dog1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Dog1Scene' });
    }

    preload() {
        this.createBaseTextures();
        
        // Carregar os sprites do cachorro triste com o caminho correto
        for (let i = 1; i <= 6; i++) {
            this.load.image(`dog-sad-${i}`, `src/assets/sprites/dog/triste/${i}.png`);
        }
    }

    createBaseTextures() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFFFFFF);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('pixel', 32, 32);
    }

    create() {
        this.initializeScene();
        this.createSystems();
        this.createAnimations();
        this.createFactories();
        this.createGameObjects();
        this.setupCamera();
        this.setupControls();
    }

    initializeScene() {
        this.cameras.main.setBackgroundColor(COLORS.BACKGROUND);
        this.physics.world.setBounds(0, 0, GAMEPLAY.MAP_WIDTH, 600);
    }

    createSystems() {
        this.hud = new HUDSystem(this);
        this.gameSystem = new GameSystem(this);
        this.animationSystem = new AnimationSystem(this);
    }

    createAnimations() {
        // Animação do cachorro triste
        this.anims.create({
            key: 'dog-sad',
            frames: [
                { key: 'dog-sad-1' },
                { key: 'dog-sad-2' },
                { key: 'dog-sad-3' },
                { key: 'dog-sad-4' },
                { key: 'dog-sad-5' },
                { key: 'dog-sad-6' }
            ],
            frameRate: 8,
            repeat: -1
        });
    }

    createFactories() {
        this.platformFactory = new PlatformFactory(this);
        this.playerFactory = new PlayerFactory(this);
        this.enemyFactory = new EnemyFactory(this);
        this.dogFactory = new DogFactory(this);
        this.fireFactory = new FireFactory(this);
    }

    createGameObjects() {
        this.createGroups();
        this.createPlatforms();
        this.createPlayer();
        this.createDogsAndProtectors();
        
        // Criar sistema de colisões por último, após todos os objetos existirem
        this.collisionSystem = new CollisionSystem(this);
    }

    createGroups() {
        this.platforms = this.physics.add.staticGroup();
        this.dogs = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.fires = this.physics.add.group();
    }

    setupCamera() {
        this.cameras.main.setBounds(0, 0, GAMEPLAY.MAP_WIDTH, 600);
        this.cameras.main.startFollow(this.player);
    }

    setupControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createPlatforms() {
        // Plataforma base
        const basePlatform = this.platformFactory.createBase();
        this.platforms.add(basePlatform);

        // Plataformas flutuantes
        const platforms = [
            { x: 300, y: 450 },
            { x: 800, y: 380 },
            { x: 1300, y: 300 },
            { x: 1800, y: 420 },
            { x: 2300, y: 340 },
            { x: 2800, y: 250 },
            { x: 3300, y: 420 },
            { x: 3800, y: 340 },
            { x: 4300, y: 270 },
            { x: 4800, y: 370 },
            { x: 5300, y: 300 },
            { x: 5800, y: 400 }
        ];

        platforms.forEach(plat => {
            const platform = this.platformFactory.createFloating(plat.x, plat.y, 200);
            this.platforms.add(platform);
        });

        // Atualizar corpos estáticos
        this.platforms.getChildren().forEach(p => p.body.updateFromGameObject());
    }

    createPlayer() {
        this.player = this.playerFactory.create(100, GAMEPLAY.PLATFORM.BASE_Y);
    }

    createDogsAndProtectors() {
        const positions = [
            { x: 370, y: 400, protector: 'fire' },
            { x: 900, y: 380, protector: 'enemy' },
            { x: 1370, y: 300, protector: 'fire' },
            { x: 1900, y: 420, protector: 'enemy' },
            { x: 2370, y: 340, protector: 'fire' },
            { x: 2900, y: 250, protector: 'enemy' },
            { x: 3370, y: 420, protector: 'fire' },
            { x: 3900, y: 340, protector: 'enemy' },
            { x: 4370, y: 270, protector: 'fire' },
            { x: 4900, y: 370, protector: 'enemy' }
        ];

        positions.forEach(pos => {
            // Criar cachorro
            const dog = this.dogFactory.create(pos.x, pos.y);
            this.dogs.add(dog);

            // Criar protetor
            if (pos.protector === 'enemy') {
                const enemy = this.enemyFactory.create(pos.x - 70, pos.y);
                this.enemies.add(enemy);
            } else {
                const fire = this.fireFactory.create(pos.x - 50, pos.y);
                this.fires.add(fire);
                this.animationSystem.createFireAnimation(fire);
            }
        });
    }

    update() {
        this.handlePlayerMovement();
        this.player.update(); // Adicione esta linha
        this.updateEnemies();
        this.gameSystem.checkWinCondition();
    }

    handlePlayerMovement() {
        if (this.cursors.left.isDown) {
            this.player.move(-1);
        } else if (this.cursors.right.isDown) {
            this.player.move(1);
        } else {
            this.player.move(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.jump();
        }
    }

    updateEnemies() {
        this.enemies.getChildren().forEach(enemy => {
            enemy.update(this.player);
        });
    }
} 