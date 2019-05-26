// Welcome to the monster! =)
// This file includes settings for sounds, particles, font style, UI color, and images
// Use the comments for help and ask questions when needed
var polishSettings = {
	
	// The name of the font you want to use
	// Must be from the google fonts api
	// Fonts can found here: https://fonts.google.com/ 
	font: "Titan One",
	fontColor: '#362868',	// hex, html and rgba colors should work here
	
	// Set up some default color values
	// Used by things like buttons and other UI elements
    colors : {
        default : '#957bf2',	// normal button color
        dark : '#362868',	// fillbarBackground, button pressed color
        light : '#dad1f9',	// highlight color for buttons
        background : '#fff291',	// default background color of UI screens
		fillbarText: 'white',	// text color of text in fillbars
		pickupTimerFillbarText: "SaddleBrown", // color of the text in pickup life timer bar
		healthFill: 'rgba(255, 0, 0, 255)',	// color of the fill for player health bar
		enemyHealthFill: 'rgba(255, 0, 0, 255)',	// color of the fill for enemy health bar
		pickupTimeFill: 'orange',	// color of the fill for pickup life timer
		progressFill: 'teal',	// color of the fill for the progress bar
    },
	
	// If the text in the middle of your fillbars is off,
	// add a positive or negative offset to adjust it up or down
	fillbarCenterOffset: -1,
	
	// Message seen when the player is killed
	lossMessage: "YOU HAVE DIED",
	
	// Audio settings
	// The sound name must correspond to an id listed in the mediamanifest
	playerSounds: {
		shoot: 'click',	// When the player shoots
		hurt: 'click',	// When the player is hurt
		die: 'click',	// When the player dies
	},
	
	enemySounds: {
		// All sounds for enemies are optional
		//"name_of_enemy": {
		//	spawn: "id",
		//	die: "id",
		//	shoot: "id",
		//	hurt: "id",
		//}
		"basicEnemy": {
			spawn: "click",
			die: "click",
			hurt: "click",
		},
		"healthpackEnemyThatShoots": {
			spawn: "click",
			die: "click",
			shoot: "click",
			hurt: "click",
		},
	},
	
	pickupSounds: {
		// All sounds for pickups are optional
		//"name_of_enemy": {
		//	spawn: "id",
		//	pickup: "id",
		//	timeout: "id"
		//}
		"healthpack": {
			spawn: "click",
			pickup: "click",
			timeout: "click",
		},
	},
	
	// Different music that can start at each wave specified
	waveMusic: [
		{
			waveNumber: 1,
			musicID: "music",
		},
	],
	
	victoryMusic: "music",	// music that plays if you win (all waves completed)
	lossMusic: "music",	// music that plays if you lose
	
	
	// Particle settings
	// All particle ids must correspond to a function name in particleEffects.js
	
	// Player Particle settings
	// If you don't want one of these enabled, comment out the line
	// imageID is only required for image particle effects
	// if no imageID is specified, you won't get an error, but if you're using an effect that requires an image, you won't see anything
	playerShootParticle: { particleID: "basicBurst" },	// Effect when player fires
	playerTrailParticle: { particleID: "basicImageStream", imageID: "particle"},	// A trail of particles that follows the player (use a stream)
	playerDeathParticle: { particleID: "basicImageBurst", imageID: "particle" }, // particle effect for when the player dies
	playerHurtParticle: {particleID: "basicBurst"},	// effect when player is hit by something
	playerBulletHitParticle: { particleID: "basicImageBurst", imageID: "particle" },	// effect when player's bullet hits something
	
	// Enemy Particle Settings
	enemyParticles: {
		// "enemyname": {
			// hurtParticle: { particleID: "basicBurst" },	// When the enemy is hit
			// deathParticle: { particleID: "basicImageBurst", imageID: "particle" },	// When the enemy dies
			// trailParticle: { particleID: "basicStream" },	// An ambient trail that follows the enemy
		// },
		"basicEnemy": {
			hurtParticle: { particleID: "basicBurst" },	// When the enemy is hit
			deathParticle: { particleID: "basicImageBurst", imageID: "particle" },	// When the enemy dies
			trailParticle: { particleID: "basicStream" },	// An ambient trail that follows the enemy
		},
		"healthpackEnemyThatShoots": {
			hurtParticle: { particleID: "basicImageBurst", imageID: "particle" },
			deathParticle: { particleID: "basicBurst" },
			shootParticle: { particleID: "basicBurst" },	// An effect when the enemy shoots
			bulletHitParticle: {particleID: "basicBurst"},	// The effect when an enemy bullet hits something
		},
	},
	
	// Pickup Particle Settings
	pickupParticles: {
		// "pickupname": {
			// spawnParticle: { particleID: "basicBurst" },	// When this pickup spawns
			// ambientParticle: { particleID: "basicStream" },	// An ambient particle while it exists
			// pickupParticle: { particleID: "basicImageBurst", imageID: "particle" },	// An effect when it's collected
		// },
		"coin1": {
			spawnParticle: { particleID: "basicBurst" },	// When this pickup spawns
			ambientParticle: { particleID: "basicStream" },	// An ambient particle while it exists
			pickupParticle: { particleID: "basicImageBurst", imageID: "particle" },	// An effect when it's collected
		},
	},
	
	// Image Settings
	// For images, the text must correspond to the ID listed in the mediamanifest
	
	// An image to appear on various screens
	// Should be 800 x 600
	mainMenuSplash: "splashscreen",
	endScreenVictoryImage: "splashscreen",
	endScreenLossImage: "bg1",
	
	
	// Wave Backgrounds
	waveImages: [
		{
			waveNumber: 1,
			imageID: "bg1",
		},
		{
			waveNumber: 2,
			imageID: "bg2",
		},
	],
	
	// Player image
	playerImage: "player",
	
	// Enemy images
	enemyImages: {
		"basicEnemy": "tallenemy",
		"healthpackEnemyThatShoots": "shootyenemy",
	},
	
	// Bullet images
	// Rotation rate is how fast the bullet image spins while in flight
	bulletImages: {
		"player" : { imageID: "playerbullet", rotationRate: 0 },
		"healthpackEnemyThatShoots": { imageID: "enemybullet", rotationRate: 10 },
	},
	
	// Pickup images
	pickupImages: {
		"coin1": "pickup",
	},
	
}