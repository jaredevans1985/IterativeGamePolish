// This file contains the definitions for various enemy types. Feel free to tweak these and add your own entries.
// The names are used in the waveDefs section of the gamesettings.js file when you're deciding what enemies to add to your wave.
var enemySettings = {
    
    "basicEnemy" :              // This name is the name you use in the waveDefs array in gamesettings.js
    {           
        moveSpeed: 40,          // How fast this enemy moves
        health: 2,              // How much health does this enemy have
        collisionRadius: 15,    // How easy it is to collide with this enemy, turn DEBUG_MODE_ON to true in gamesettings to see this as a black circle
        enemySize: 25,          // How big this enemy's image is
        damage: 1,              // How much damage this enemy does when it touches the player
        color: "fuchsia",       // What color is this enemy? Other colors can be found here: https://www.quackit.com/css/css_color_codes.cfm
        numberOfSides: 5,       // How many sides does this enemy's shape have?
        droppedPickups: [       // What pickups does the enemy drop when it dies?
            {
                pickupName: "coin1",    // Which pickup from pickupSettings.js will be dropped
                dropChance: 1,          // How likely it is to drop, 0 to 1, 1 being 100% chance
            },
            {
                pickupName: "coin1",    // Which pickup from pickupSettings.js will be dropped
                dropChance: 0.66,       // How likely it is to drop, 0 to 1, 1 being 100% chance
            },
            {
                pickupName: "coin5",    // Which pickup from pickupSettings.js will be dropped
                dropChance: 0.33,       // How likely it is to drop, 0 to 1, 1 being 100% chance
            },
        ],
        bulletSettings : {          // If this enemy fires bullets, give those bullets settings
            fireRate: 0,            // How fast this enemy fires bullets. If 0, this enemy doesn't fire bullets
            damage: 0,              // How much damage each bullet does
            bulletSpeed: 0,         // How fast this enemy's bullets travel
            bulletSize: 0,          // How big are these bullets, this also affects the collision radius for the bullets
            color: "Plum"           // What color are they
        }
    },

    "healthpackEnemyThatShoots" :
    {            
        moveSpeed: 20,         
        health: 4,             
        collisionRadius: 30,    
        enemySize: 15,           
        damage: 3,  
        color: "crimson",
        numberOfSides: 3,
        droppedPickups: [       
            {
                pickupName: "healthpack",    
                dropChance: 1,          
            },

        ],
        bulletSettings : {          
            fireRate: 4,            
            damage: 1,        
            bulletSpeed: 30,         
            bulletSize: 20,          
            color: "Plum"      
        }
    },


    "bossEnemy" :
    {            
        moveSpeed: 10,        
        health: 50,             
        collisionRadius: 40,    
        enemySize: 40,           
        damage: 5,  
        color: "DarkMagenta",
        numberOfSides: 6,
        droppedPickups: [       
            {
                pickupName: "coin5",    
                dropChance: 1,         
            },
            {
                pickupName: "coin5",    
                dropChance: 1,         
            },
        ],
        bulletSettings : {          
            fireRate: 0,            
            damage: 0,        
            bulletSpeed: 0,         
            bulletSize: 0,          
            color: "Plum"      
        }         
    },
};