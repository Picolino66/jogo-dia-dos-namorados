/**
 * Constantes de dimensões dos personagens e elementos do jogo
 */
export const DIMENSIONS = {
    PLAYER: {
        VISUAL: {
            WIDTH: 25,
            HEIGHT: 70
        },
        BODY: {
            WIDTH: 25,
            HEIGHT: 30
        }
    },
    ENEMY: {
        VISUAL: {
            WIDTH: 25,
            HEIGHT: 70
        },
        BODY: {
            WIDTH: 25,
            HEIGHT: 30
        },
        OFFSET: {
            HEIGHT: 0
        }
    },
    FIRE: {
        VISUAL: {
            WIDTH: 25,
            HEIGHT: 70
        },
        BODY: {
            WIDTH: 20,
            HEIGHT: 35
        },
        OFFSET: {
            HEIGHT: 0
        }
    },
    DOG: {
        VISUAL: {
            WIDTH: 20,
            HEIGHT: 25
        },
        BODY: {
            WIDTH: 20,
            HEIGHT: 25
        },
        OFFSET: {
            HEIGHT: 10
        }
    }
};

/**
 * Constantes de física do jogo
 */
export const PHYSICS = {
    GRAVITY: 300,
    BOUNCE: 0.2,
    PLAYER: {
        MOVE_SPEED: 160,
        JUMP_FORCE: -330
    },
    ENEMY: {
        MOVE_SPEED: 50,
        PATROL_SPEED: 30,
        VISION_RANGE: 200,
        VISION_HEIGHT: 100,
        PATROL_RANGE: 30
    }
};

/**
 * Constantes de gameplay
 */
export const GAMEPLAY = {
    TIME_LIMIT: 120,
    MAP_WIDTH: 6400,
    PLATFORM: {
        BASE_Y: 580,
        BASE_HEIGHT: 40,
        FLOATING_HEIGHT: 20,
        COLOR: 0x654321
    },
    PENALTIES: {
        HIT_TIME_LOSS: 5,
        INVULNERABLE_TIME: 1000
    },
    EFFECTS: {
        DEFEAT_RADIUS: 30,
        DEFEAT_COLOR: 0x00ff00,
        DEFEAT_ALPHA: 0.8,
        DEFEAT_SCALE: 2,
        DEFEAT_DURATION: 500
    },
    WIN_DELAY: 3000,
    REQUIRED_DOGS: 10
};

/**
 * Cores dos elementos do jogo
 */
export const COLORS = {
    PLAYER: 0x1E90FF,  // Azul
    ENEMY: 0x8B4513,   // Marrom
    DOG: 0xD2B48C,     // Bege
    FIRE: 0xFF4500,    // Laranja
    BACKGROUND: 0x3a7e4c, // Verde
    HURT: 0xff0000     // Vermelho
};

/**
 * Configurações de UI
 */
export const UI = {
    SCORE: {
        X: 16,
        Y: 16,
        FONT_SIZE: '18px',
        FONT_FAMILY: 'Arial',
        COLOR: '#ffffff'
    },
    TIME: {
        X: 16,
        Y: 50,
        FONT_SIZE: '18px',
        FONT_FAMILY: 'Arial',
        COLOR: '#ffffff'
    },
    MESSAGES: {
        WIN: 'Por você, até brigo com um mendigo...',
        GAME_OVER: 'Tempo esgotado!\nNão foram todos salvos...',
        RETRY: 'Tentar Novamente',
        FONT_SIZE: '24px',
        BUTTON_FONT_SIZE: '18px',
        FONT_FAMILY: 'Arial',
        COLOR: '#ffffff',
        BACKGROUND: '#000000',
        PADDING: {
            LEFT: 15,
            RIGHT: 15,
            TOP: 10,
            BOTTOM: 10
        }
    },
    BUTTON: {
        WIDTH: 200,
        HEIGHT: 50,
        COLOR: 0x9966ff,
        Y_OFFSET: 100
    }
}; 