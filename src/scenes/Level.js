
// You can write more code here
let gameOptions = {
	gridSize: 40, // 40
	levelWidth: 8, // 8
	levelHeight: 8, // 8
	ballSpeed: 600, // 600
	startingLevel: 0
}
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// game_screen_bg
		const game_screen_bg = this.add.image(320, 480, "game-screen-bg");
		game_screen_bg.scaleX = 0.6;
		game_screen_bg.scaleY = 0.5;

		// level_base
		const level_base = this.add.image(320, 0, "level-base");
		level_base.scaleX = 0.5;
		level_base.scaleY = 0.5;
		level_base.setOrigin(0.5, 0);

		// txt_level
		const txt_level = this.add.text(320, 46.75, "", {});
		txt_level.setOrigin(0.5, 0.5);
		txt_level.text = " LEVEL 1 ";
		txt_level.setStyle({ "align": "center", "fontFamily": "ButterHaunted", "fontSize": "42px" });

		// container_particles
		const container_particles = this.add.container(0, 0);

		// witch
		const witch = this.add.image(-60, 163, "witch");
		witch.scaleX = 0.8;
		witch.scaleY = 0.8;

		// blast
		const blast = this.add.sprite(271, 333, "blast-1");
		blast.scaleX = 0.2;
		blast.scaleY = 0.2;
		blast.visible = false;

		// glow
		const glow = this.add.image(165, 615, "glow");
		glow.scaleX = 0.8;
		glow.scaleY = 0.8;
		glow.visible = false;

		this.level_base = level_base;
		this.txt_level = txt_level;
		this.container_particles = container_particles;
		this.witch = witch;
		this.blast = blast;
		this.glow = glow;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	level_base;
	/** @type {Phaser.GameObjects.Text} */
	txt_level;
	/** @type {Phaser.GameObjects.Container} */
	container_particles;
	/** @type {Phaser.GameObjects.Image} */
	witch;
	/** @type {Phaser.GameObjects.Sprite} */
	blast;
	/** @type {Phaser.GameObjects.Image} */
	glow;

	/* START-USER-CODE */

	// Write your code here
	witchAnimation = () => {
		this.witchTween = this.tweens.add({
			targets: this.witch,
			x: 701,
			y: Phaser.Math.Between(90, 300),
			ease: 'linear',
			duration: 3000,
			yoyo: true,
			onYoyo: () => {
				this.witch.setFlipX(true);
			},
			onComplete: () => {
				this.witch.setFlipX(false);
				this.witchAnimation();
			}
		});
	}
	create() {

		this.editorCreate();
		this.oGameManager = new GameManager(this);
		this.input.on("pointermove", () => {
			if (this.input.x > 0 && this.input.x < 640 && this.input.y > 0 && this.input.y < 960) {
				this.input.setDefaultCursor('pointer');
			}
			else {
				this.input.setDefaultCursor('default');
			}
		});
		this.witchAnimation();
		this.aLevels = this.oGameManager.aLevels;
		this.oGameOptions = this.oGameManager.oGameOptions;
		this.isThrowable = true;
		this.canFire = true;
		this.clocksReached = 1;
		this.totalClocks = 0;
		this.clocksArray = [];
		this.handGroup = this.physics.add.group();
		this.clockGroup = this.physics.add.group();
		this.faceGroup = this.physics.add.group();
		this.txt_level.setText(" LEVEL " + (gameOptions.startingLevel + 1));
		for (let i = 0; i < this.aLevels[gameOptions.startingLevel].tiledOutput.length; i++) {
			switch (this.aLevels[gameOptions.startingLevel].tiledOutput[i]) {
				case 1:
					this.clocksArray.push(this.placeClock(new Phaser.Math.Vector2(i % gameOptions.levelWidth * 2 + 1, Math.floor(i / gameOptions.levelHeight) * 2 + 1), "inactiveClock-", 0.3));
					break;
				case 2:
					this.clocksArray.push(this.placeClock(new Phaser.Math.Vector2(i % gameOptions.levelWidth * 2 + 2, Math.floor(i / gameOptions.levelHeight) * 2), "inactiveClock-", 0.6));
					break;
				case 3:
					this.clocksArray.push(this.placeClock(new Phaser.Math.Vector2(i % gameOptions.levelWidth * 2 + 1, Math.floor(i / gameOptions.levelHeight) * 2), "inactiveClock-", 0.2));
					break;
			}
		}
		this.activeClock = Phaser.Utils.Array.GetRandom(this.clocksArray);
		this.activeClock.setTexture('active-clock');
		this.activeClock.face.setTexture("activeClock-face").setOrigin(0.5, 0.5);
		this.activeClock.face.visible = true;
		this.activeClock.hand.tintFill = true;
		this.ball = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "activeClock-face").setScale(0.2);
		this.ball.body.setCircle(70);
		this.ball.visible = false;
		this.ball.body.collideWorldBounds = true;
		this.ball.body.onWorldBounds = true;
		this.physics.world.on("worldbounds", () => {
			this.scene.start("Level");
		}, this);
		this.input.on("pointerdown", () => {
			if (this.isThrowable) {
				this.throwBall();
			}
		}, this);
		this.physics.add.overlap(this.ball, this.clockGroup, this.handleOverlap, null, this);
	}
	placeClock(clockCoordinates, prefix, scale) {
		const clockSprite = this.clockGroup.create((clockCoordinates.x * gameOptions.gridSize) + 0, (clockCoordinates.y * gameOptions.gridSize) + 200, "clock").setScale(scale);
		scale == 0.6 ? clockSprite.body.setCircle(scale * 210) : clockSprite.body.setCircle(scale * 405);
		if (scale == 0.6) clockSprite.body.setCircle(scale * 210);
		if (scale == 0.3) clockSprite.body.setCircle(scale * 410);
		if (scale == 0.2) clockSprite.body.setCircle(scale * 620);
		const handSprite = this.handGroup.create(clockSprite.x, clockSprite.y, prefix + "hand").setScale(scale).setOrigin(0.5, 1);
		handSprite.rotation = Phaser.Math.Angle.Random();
		handSprite.body.angularVelocity = Phaser.Math.RND.between(this.aLevels[gameOptions.startingLevel].clockSpeed[0], this.aLevels[gameOptions.startingLevel].clockSpeed[1]) * Phaser.Math.RND.sign();
		clockSprite.hand = handSprite;
		const faceSprite = this.faceGroup.create(clockSprite.x, clockSprite.y, prefix + "face").setScale(scale).setOrigin(0.5, 0.485);
		faceSprite.rotation = handSprite.rotation;
		faceSprite.body.angularVelocity = handSprite.body.angularVelocity;
		clockSprite.face = faceSprite;
		this.totalClocks++;
		return clockSprite;
	}
	throwBall() {
		if (this.canFire) {
			this.canFire = false;
			this.isThrowable = false;
			let handAngle = this.activeClock.hand.rotation + 30;
			this.ball.x = this.activeClock.x;
			this.ball.y = this.activeClock.y;
			this.ball.visible = true;
			let ballVelocity = this.physics.velocityFromRotation(handAngle, gameOptions.ballSpeed);
			this.ball.body.setVelocity(ballVelocity.x, ballVelocity.y);
			this.activeClock.hand.destroy();
			this.activeClock.face.destroy();
			this.activeClock.destroy();
		}
	}
	handleOverlap(ball, clock) {
		if (!this.canFire) {
			clock.setTexture("active-clock");
			clock.face.setTexture("activeClock-face").setOrigin(0.5, 0.5);
			clock.hand.tintFill = true;
			clock.setVisible(false);
			clock.face.setVisible(false);
			clock.hand.setVisible(false);
			this.activeClock = clock;
			this.ball.visible = false;
			this.ball.setVelocity(0, 0);
			this.clocksReached++;
			this.setBlast(clock);
			if (this.clocksReached < this.totalClocks) {
				this.canFire = true;
			}
			else {
				this.ball.destroy();
				this.activeClock.destroy();
				this.activeClock.hand.destroy();
				this.activeClock.face.destroy();
				gameOptions.startingLevel = (gameOptions.startingLevel + 1) % this.aLevels.length;
				this.time.addEvent({
					delay: 1000,
					callbackScope: this,
					callback: () => {
						this.scene.start("Level");
					}
				});
			}
		}
	}
	setBlast = (clock) => {
		this.blast.setPosition(this.activeClock.x, this.activeClock.y);
		this.blast.setVisible(true);
		this.glow.setPosition(this.activeClock.x, this.activeClock.y);
		this.glow.setVisible(true);
		this.tweens.add({
			targets: this.blast,
			alpha: 0,
			duration: 300,
		})
		this.blast.anims.play("blastAnimation", true).once('animationcomplete', () => {
			this.blast.setVisible(false);
			this.blast.setAlpha(1);
			this.glow.setVisible(false);
			clock.setVisible(true);
			clock.face.setVisible(true);
			clock.hand.setVisible(true);
			this.isThrowable = true;
		})
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
