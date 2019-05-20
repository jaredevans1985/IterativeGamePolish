// These are the player and player bullet settings.
var playerSettings = {

    playerSize : 0.5,           // The bigger this is, the larger the player image will be, 1 is 100%
    moveSpeed: 50,              // How fast the player can move
    startingHealth: 2,          // How much health the player has to begin with
    collisionRadius: 50,        // How easy it is to collide with the player, turn DEBUG_MODE_ON to true in gamesettings to see this as a black circle

    // Bullet settings
    bulletSpeed: 40,            // How fast the bullets move
    bulletDamage: 1,            // How much damage bullets do
    bulletSize: 2,              // How big is the bullet image - the bigger this is, the larger the bullet will be
    fireRate: 2,                // How long in seconds between shots
    bulletCollisionRadius: 5,   // How easy it is to collide with a bullet, turn DEBUG_MODE_ON to true in gamesettings to see this as a black circle
	
	// Audio settings
	SFX: {
		shoot: 'click',
	},
	
	// Particle settings
}