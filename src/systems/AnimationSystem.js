export default class AnimationSystem {
    constructor(scene) {
        this.scene = scene;
    }

    createFireAnimation(fire) {
        // Configurar o fogo para iniciar na escala normal
        fire.setScale(1, 1);

        this.scene.tweens.add({
            targets: fire,
            scaleY: 0.25, // Reduz para 1/4 da altura
            duration: 500, // 0.5 segundos para descer
            ease: 'Sine.easeOut',
            onComplete: () => {
                // Pausa de 1 segundo na posição baixa
                this.scene.time.delayedCall(1000, () => {
                    // Depois sobe de volta
                    this.scene.tweens.add({
                        targets: fire,
                        scaleY: 1, // Volta ao tamanho original
                        duration: 500, // 0.5 segundos para subir
                        ease: 'Sine.easeIn',
                        onComplete: () => {
                            // Reinicia o ciclo
                            this.createFireAnimation(fire);
                        }
                    });
                });
            }
        });
    }

    createFadeEffect(target, config = {}) {
        return this.scene.tweens.add({
            targets: target,
            alpha: config.alpha ?? 0,
            scale: config.scale ?? 1,
            duration: config.duration ?? 500,
            ease: config.ease ?? 'Linear',
            onComplete: config.onComplete
        });
    }

    stopAnimation(target) {
        this.scene.tweens.killTweensOf(target);
    }

    pauseAllAnimations() {
        this.scene.tweens.pauseAll();
    }

    resumeAllAnimations() {
        this.scene.tweens.resumeAll();
    }
} 