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
        const ENEMY_HEIGHT = 50;
        dogPositions.forEach((pos, index) => {
            const platTop = pos.y - /*altura da plataforma pos.height*/ 20;
            // Tamanho do cachorro
            const dogHeight = 20;
            
            // Criar o cachorro exatamente sobre a plataforma
            // Posição Y: topo da plataforma menos metade da altura do cachorro
            const dog = this.dogs.create(pos.x, pos.y - 10 - dogHeight/2, 'pixel');
            dog.setSize(20, dogHeight);
            dog.setDisplaySize(20, dogHeight);
            dog.setTint(0xD2B48C);
            dog.setBounce(0.2);
            dog.setCollideWorldBounds(true);
            dog.body.setAllowGravity(true);
            dog.dogId = index + 1;
            dogsCreated++;
            
            if (pos.protector === 'enemy') {
                const enemyX = pos.x - 70;
                const enemyY = platTop + ENEMY_HEIGHT/2;
        
                const enemy = this.enemies.create(enemyX, enemyY, 'pixel');
                enemy
                  .setSize(30, ENEMY_HEIGHT)
                  .setDisplaySize(30, ENEMY_HEIGHT)
                  .setTint(0x8B4513)
                  .setBounce(0.2)
                  .setCollideWorldBounds(true);
                enemy.body.setAllowGravity(true);
        
                enemy.isAggressive = false;
                enemy.visionRange   = 200;
                enemy.originalX     = enemyX;
              } else if (pos.protector === 'fire') {
                // Altura do fogo
                const fireHeight = 40;
                
                // Criar fogo à esquerda do cachorro, na plataforma
                // Posição Y: exata da plataforma, menos 1 pixel para garantir contato
                const fire = this.fires.create(pos.x - 70, pos.y - 11, 'pixel');
                fire.setSize(30, fireHeight);
                fire.setDisplaySize(30, fireHeight);
                fire.setTint(0xFF4500);
                fire.body.setAllowGravity(false);
                fire.setImmovable(true);
                fire.setOrigin(0.5, 1); // Importante: origem na base do fogo
                
                // Animação do fogo mais lenta (2000ms = 2 segundos para cada ciclo)
                // Crescer apenas para cima alterando a escalaY
                this.tweens.add({
                    targets: fire,
                    scaleY: 0.25, // Reduz para 1/4 da altura (cresce apenas para cima)
                    duration: 2000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });
        
        this.physics.add.collider(this.enemies, this.platforms);
