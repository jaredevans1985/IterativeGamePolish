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
	}
	
	// Particle settings
}