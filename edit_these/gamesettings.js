
// Various game settings, including the definition of each wave
var gameSettings = {
    DEBUG_MODE_ON: true,   // Set this to true to see the collision radiuses around each game object as black circles

    waveStartDelay: 3,  // Before a wave starts, how much time is there for the intro?
    waveIsOverDelay: 3, // After a wave ends, how much time is there before we go to the next wave intro?

    victoryMessage: "ALL WAVES COMPLETED",  // The final text that appears on victory

    //define what happens in each wave, and how many waves there are total
    waveDefs: [
        {
            waveName: "default",    // If the name is "default" it will say "Wave" followed by the number, e.g. Wave 1, but if you put in other text it will display that
            spawnRate: 1,           // How long it takes, in seconds, before the next enemy appears
            spawnRateRandomizer: 3, // How much time, in seconds, might be added or substracted from the next spawn time, keep this shorter than your spawnrate
            enemyList: [            // What enemies will spawn this wave. Enemies will spawn in this order.
                "healthpackEnemyThatShoots",
				"basicEnemy", 
            ],
        },
        {
            waveName: "Final Wave", // On this wave, it will show Final Wave, rather than "Wave #", because "default" was not used
            spawnRate: 3,           
            spawnRateRandomizer: 2, 
            enemyList: [            
                "basicEnemy",
                "healthpackEnemyThatShoots",
                "healthpackEnemyThatShoots",
                "basicEnemy",
                "bossEnemy",
            ]
        }
    ],
}