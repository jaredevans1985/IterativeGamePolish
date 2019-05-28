// An object that will manage our audio needs
// TODO:
//  -Store all of our registered sounds so that we can loop through them
//  -When SFX is toggled off, turn off any currently playing sounds
var audio = {

    // Booleans to track the state of our sound effects and musics
    sfxCanPlay : true,
    musicPlaying : true,
	
	// What is the current music track
	musicID: "",

    // Play the sound with the given id
    playSound : function(id)
    {
        // Only play if we're allowed to
        if(this.sfxCanPlay)
        {
            createjs.Sound.play( id );
        }
    },

    // Stop the sound with the given id
    stopSound : function(id)
    {
        createjs.Sound.stop( id );
    },

    // Toggle whether sfx can play or not
    toggleSFX : function()
    {
        this.sfxCanPlay = !this.sfxCanPlay;

        // TODO: Turn off any sounds that are currently playing
    },

	// Start Wave Music
	startWaveMusic : function(waveNum)
	{
		// Stop music if currently playing
		if(this.musicID != "")
		{
			createjs.Sound.stop(this.musicID);
		}
		
		// Find and set new music id
		for(var i = 0; i < polishSettings.waveMusic.length; i++)
		{
			if(polishSettings.waveMusic[i].waveNumber == waveNum)
			{
				this.musicID = polishSettings.waveMusic[i].musicID;
			}
		}
		
		// Start new music
		if(this.musicID != "")
		{
			createjs.Sound.play(this.musicID, {loop:-1});
			this.musicPlaying = true;
		}
	},
	
	// Start final music
	startFinalMusic: function(playerWon)
	{
		if(playerWon)
		{
			if(polishSettings.victoryMusic)
			{
				// Stop music if currently playing
				if(this.musicID !== "")
				{
					createjs.Sound.stop(this.musicID);
				}
				
				this.musicID = polishSettings.victoryMusic;
				createjs.Sound.play(this.musicID, {loop:-1});
				this.musicPlaying = true;
			}
		}
		else
		{
			if(polishSettings.lossMusic)
			{
				// Stop music if currently playing
				if(this.musicID !== "")
				{
					createjs.Sound.stop(this.musicID);
				}
				
				this.musicID = polishSettings.lossMusic;
				createjs.Sound.play(this.musicID, {loop:-1});
				this.musicPlaying = true;
			}
		}
	},

    // Toggle the music on and off
    toggleMusic : function(forceStart = false)
    {
        // If toggleOn is true, force the music to start
        if(forceStart && this.sfxCanPlay)
        {
            createjs.Sound.play(musicID, {loop:-1});
            this.musicPlaying = true;
        }
        // Otherwise swap the state
        else 
        {
            if(this.musicPlaying && this.sfxCanPlay)
            {
                createjs.Sound.stop(musicID);
                this.musicPlaying = false;
                //console.log("stopped music");
            }
            else
            {
                createjs.Sound.play(musicID, {loop:-1});
                this.musicPlaying = true;
                //console.log("started music");
            }
        }
        
    },
	
	// Start the menu music
	startMenuMusic : function()
	{
		this.musicID = polishSettings.menuMusic;
		createjs.Sound.play(this.musicID, {loop:-1});
		this.musicPlaying = true;
	},

};