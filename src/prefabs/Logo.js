
// You can write more code here

/* START OF COMPILED CODE */

class Logo extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? -16, y ?? -27);

		// logo
		const logo = scene.add.image(16, 27, "logo");
		logo.scaleX = 0.6;
		logo.scaleY = 0.6;
		this.add(logo);

		// clock
		const clock = scene.add.image(-5, -68, "clock");
		clock.scaleX = 0.4;
		clock.scaleY = 0.41;
		this.add(clock);

		// inactiveClock_hand
		const inactiveClock_hand = scene.add.image(-5, -68, "inactiveClock-hand");
		inactiveClock_hand.scaleX = 0.4;
		inactiveClock_hand.scaleY = 0.4;
		inactiveClock_hand.setOrigin(0.5, 1);
		this.add(inactiveClock_hand);

		// inactiveClock_face
		const inactiveClock_face = scene.add.image(-5, -68, "inactiveClock-face");
		inactiveClock_face.scaleX = 0.4;
		inactiveClock_face.scaleY = 0.4;
		this.add(inactiveClock_face);

		this.inactiveClock_hand = inactiveClock_hand;
		this.inactiveClock_face = inactiveClock_face;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	inactiveClock_hand;
	/** @type {Phaser.GameObjects.Image} */
	inactiveClock_face;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
