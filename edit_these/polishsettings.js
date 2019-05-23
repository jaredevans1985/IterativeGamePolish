var polishSettings = {
	
	lossMessage: "YOU HAVE DIED", // Message seen when the player is killed
	
	// Audio settings
	playerSounds: {
		shoot: 'click',
		hurt: 'click',
		die: 'click',
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
	
	waveMusic: [
		{
			waveNumber: 1,
			musicID: "music",
		},
	],
	
	// Player Particle settings
	// If you don't want one of these enabled, comment out the line
	// imageID is only required for image particle effects
	// if no imageID is specified, you won't get an error, but if you're using an effect that requires an image, you won't see anything
	playerShootParticle: { particleID: "basicBurst" },	// Effect when player fires
	playerTrailParticle: { particleID: "basicImageStream", imageID: "particle"},	// A trail of particles that follows the player (use a stream)
	playerDeathParticle: { particleID: "basicImageBurst", imageID: "particle" }, // particle effect for when the player dies
	playerHurtParticle: {particleID: "basicBurst"},	// effect when player is hit by something
	
	// Enemy Particle Settings
	enemyParticles: {
		"basicEnemy": {
			hurtParticle: { particleID: "basicBurst" },
			deathParticle: { particleID: "basicImageBurst", imageID: "particle" },
			trailParticle: { particleID: "basicStream" },
		},
		"healthpackEnemyThatShoots": {
			hurtParticle: { particleID: "basicImageBurst", imageID: "particle" },
			deathParticle: { particleID: "basicBurst" },
			shootParticle: { particleID: "basicBurst" },
		},
	},
	
	
}