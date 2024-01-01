
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {

	constructor() {
		super("Home");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// splash_screen_bg
		const splash_screen_bg = this.add.image(320, 480, "splash-screen-bg");
		splash_screen_bg.scaleX = 0.604;
		splash_screen_bg.scaleY = 0.5;

		// play_button
		const play_button = this.add.image(320, 818, "play-button");
		play_button.setInteractive(this.input.makePixelPerfect());
		play_button.scaleX = 0.5;
		play_button.scaleY = 0.5;

		// witch
		const witch = this.add.image(-60, 95, "witch");
		witch.scaleX = 0.8;
		witch.scaleY = 0.8;

		// logo
		const logo = new Logo(this, 304, 254);
		this.add.existing(logo);

		this.play_button = play_button;
		this.witch = witch;
		this.logo = logo;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	play_button;
	/** @type {Phaser.GameObjects.Image} */
	witch;
	/** @type {Logo} */
	logo;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.aWitchPosition = [701, 95];
		this.logoAnimation();
		this.witchAnimation();
		this.play_button.setInteractive();
		this.play_button.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			this.buttonAnimation();
		});
		this.play_button.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			this.play_button.setAngle(0);
			this.buttonTween.stop();
		});
		this.play_button.on('pointerdown', () => {
			this.play_button.disableInteractive();
			this.clickAnimation();
		})
	}
	logoAnimation = () => {
		this.tweens.add({
			targets: [this.logo.inactiveClock_face, this.logo.inactiveClock_hand],
			angle: 360,
			duration: 800,
			repeat: -1
		});

	}
	witchAnimation = () => {
		this.witchTween = this.tweens.add({
			targets: this.witch,
			x: 701,
			y: Phaser.Math.Between(0, 150),
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
	clickAnimation = () => {
		this.tweens.add({
			targets: this.play_button,
			scale: 0.4,
			ease: 'linear',
			duration: 200,
			yoyo: true,
			onComplete: () => {
				this.scene.stop("Home");
				this.scene.start("Level");
			}
		})
	}
	buttonAnimation = () => {
		this.buttonTween = this.tweens.add({
			targets: this.play_button,
			angle: "+=10",
			duration: 100,
			yoyo: true,
			repeat: -1
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
