
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// splash_screen_bg
		const splash_screen_bg = this.add.image(320, 480, "splash-screen-bg");
		splash_screen_bg.scaleX = 0.604;
		splash_screen_bg.scaleY = 0.5;

		// progress
		const progress = this.add.text(320, 818, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontFamily": "ButterHaunted", "fontSize": "100px" });

		// logo
		const logo = this.add.image(320, 281, "logo");
		logo.scaleX = 0.6;
		logo.scaleY = 0.6;

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Home"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
