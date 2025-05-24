export default class AnimationSystem {
    constructor(scene) {
        this.scene = scene;
    }

    createFireAnimation(fire) {
        this.scene.tweens.add({
            targets: fire,
            scaleY: 0.25,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
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