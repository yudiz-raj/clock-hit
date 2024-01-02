import Level from './Level';

describe('Level', () => {
    let level;
    const gameOptions = {
        ballSpeed: 10 // Replace with the actual value
    };
    beforeEach(() => {
        level = new Level();
        level.sys = {
            game: {
                config: {
                    resolution: 1 // Add this line
                }
            }
        };
        level.add = {
            image: jest.fn().mockReturnValue({
                scaleX: 0,
                scaleY: 0,
                setOrigin: jest.fn(),
                __proto__: Phaser.GameObjects.Image.prototype
            }),
            text: jest.fn().mockReturnValue({
                setOrigin: jest.fn(),
                setX: jest.fn(),
                setY: jest.fn(),
                setStyle: jest.fn(),
                text: "",
                __proto__: Phaser.GameObjects.Text.prototype
            }),
            container: jest.fn().mockReturnValue({
                setOrigin: jest.fn(),
                setX: jest.fn(),
                setY: jest.fn(),
                setScale: jest.fn(),
                setVisible: jest.fn(),
                setAlpha: jest.fn(),
                __proto__: Phaser.GameObjects.Container.prototype
            }),
            sprite: jest.fn().mockReturnValue({
                setOrigin: jest.fn(),
                setX: jest.fn(),
                setY: jest.fn(),
                setScale: jest.fn(),
                setVisible: jest.fn(),
                setAlpha: jest.fn(),
                __proto__: Phaser.GameObjects.Sprite.prototype
            }),
            group: jest.fn().mockReturnValue({
                setOrigin: jest.fn(),
                setX: jest.fn(),
                setY: jest.fn(),
                setScale: jest.fn(),
                setVisible: jest.fn(),
                setAlpha: jest.fn(),
            }),
            tween: jest.fn().mockReturnValue({
                to: jest.fn(),
                start: jest.fn(),
            }),
            anims: jest.fn().mockReturnValue({
                play: jest.fn(),
                once: jest.fn(),
            }),
            physics: jest.fn().mockReturnValue({
                add: jest.fn(),
                overlap: jest.fn(),
                velocityFromRotation: jest.fn().mockReturnValue({
                    x: 10, // Replace with the actual value
                    y: 10  // Replace with the actual value
                }),
            }),
        };
        level.ball = {
            x: 0,
            y: 0,
            visible: false,
            body: {
                setVelocity: jest.fn()
            }
        };
        level.events = {
            emit: jest.fn()
        };
        level.activeClock = {
            hand: {
                destroy: jest.fn()
            },
            face: {
                destroy: jest.fn()
            },
            destroy: jest.fn()
        };
        level.editorCreate();
    });

    afterEach(() => {
        level = null;
    });

    it('should create game_screen_bg', () => {
        expect(level.level_base).toBeDefined();
        expect(level.level_base).toBeInstanceOf(Phaser.GameObjects.Image);
    });

    it('should create level_base', () => {
        expect(level.level_base).toBeDefined();
        expect(level.level_base).toBeInstanceOf(Phaser.GameObjects.Image);
    });

    it('should create txt_level', () => {
        expect(level.txt_level).toBeDefined();
        expect(level.txt_level).toBeInstanceOf(Phaser.GameObjects.Text);
    });

    it('should create container_particles', () => {
        expect(level.container_particles).toBeDefined();
        expect(level.container_particles).toBeInstanceOf(Phaser.GameObjects.Container);
    });

    it('should create witch', () => {
        expect(level.witch).toBeDefined();
        expect(level.witch).toBeInstanceOf(Phaser.GameObjects.Image);
    });

    it('should create blast', () => {
        expect(level.blast).toBeDefined();
        expect(level.blast).toBeInstanceOf(Phaser.GameObjects.Sprite);
    });

    it('should create glow', () => {
        expect(level.glow).toBeDefined();
        expect(level.glow).toBeInstanceOf(Phaser.GameObjects.Image);
    });

    it('should have witchAnimation method', () => {
        expect(level.witchAnimation).toBeDefined();
        expect(typeof level.witchAnimation).toBe('function');
    });

    it('should have create method', () => {
        expect(level.create).toBeDefined();
        expect(typeof level.create).toBe('function');
    });

    it('should have placeClock method', () => {
        expect(level.placeClock).toBeDefined();
        expect(typeof level.placeClock).toBe('function');
    });

    it('should have throwBall method', () => {
        expect(level.throwBall).toBeDefined();
        expect(typeof level.throwBall).toBe('function');
    });

    it('should have handleOverlap method', () => {
        expect(level.handleOverlap).toBeDefined();
        expect(typeof level.handleOverlap).toBe('function');
    });

    it('should have setBlast method', () => {
        expect(level.setBlast).toBeDefined();
        expect(typeof level.setBlast).toBe('function');
    });
    it('should throw the ball when canFire is true', () => {
        // Arrange
        level.canFire = true;
        level.isThrowable = true;
        level.activeClock = {
            hand: {
                rotation: 0
            },
            x: 100,
            y: 200,
            face: {
                destroy: jest.fn()
            },
            destroy: jest.fn()
        };
        level.ball = {
            x: 0,
            y: 0,
            visible: false,
            body: {
                setVelocity: jest.fn()
            }
        };
        const expectedBallVelocity = {
            x: Math.cos(30 * Math.PI / 180) * gameOptions.ballSpeed,
            y: Math.sin(30 * Math.PI / 180) * gameOptions.ballSpeed
        };

        // Act
        level.throwBall();

        // Assert
        expect(level.canFire).toBe(false);
        expect(level.isThrowable).toBe(false);
        expect(level.ball.x).toBe(level.activeClock.x);
        expect(level.ball.y).toBe(level.activeClock.y);
        expect(level.ball.visible).toBe(true);
        expect(level.ball.body.setVelocity).toHaveBeenCalledWith(expectedBallVelocity.x, expectedBallVelocity.y);
        expect(level.activeClock.hand.destroy).toHaveBeenCalled();
        expect(level.activeClock.face.destroy).toHaveBeenCalled();
        expect(level.activeClock.destroy).toHaveBeenCalled();
    });

    it('should not throw the ball when canFire is false', () => {
        // Arrange
        level.canFire = false;
        level.isThrowable = true;

        // Act
        level.throwBall();

        // Assert
        // Ensure that no changes are made when canFire is false
        expect(level.canFire).toBe(false);
        expect(level.isThrowable).toBe(true);
        // Ensure that no methods are called
        expect(level.ball.x).toBe(0);
        expect(level.ball.y).toBe(0);
        expect(level.ball.visible).toBe(false);
        expect(level.ball.body.setVelocity).not.toHaveBeenCalled();
        expect(level.activeClock.hand.destroy).not.toHaveBeenCalled();
        expect(level.activeClock.face.destroy).not.toHaveBeenCalled();
        expect(level.activeClock.destroy).not.toHaveBeenCalled();
    });
});
