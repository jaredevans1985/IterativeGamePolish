class EndScreen extends ScreenBase
{
     constructor(playerIsAlive)
     {
        super();

		// Add a background
		if(playerIsAlive)
		{
			if(polishSettings.endScreenVictoryImage)
			{	
				this.addChild(new createjs.Bitmap(assets.getResult(polishSettings.endScreenVictoryImage)));
			}	
		}
		else
		{
			if(polishSettings.endScreenLossImage)
			{	
				this.addChild(new createjs.Bitmap(assets.getResult(polishSettings.endScreenLossImage)));
			}
		}
		
        // Make a title
        ui.makeText(this, "GAME OVER", app.SCREEN_WIDTH / 2, 100, ui.titleFont.font, ui.titleFont.color);

        // Show num clicks again
        ui.makeText(this, "TOTAL COINS\n\n" + app.score, app.SCREEN_WIDTH / 2, 250, ui.defaultFont.font, ui.defaultFont.color);

        ui.makeText(this, "WAVES SURVIVED\n\n" + (app.currentWave - 1), app.SCREEN_WIDTH / 5, 250, ui.defaultFont.font, ui.defaultFont.color);

        ui.makeText(this, "ENEMIES KILLED\n\n" + app.enemiesKilledThisGame, (app.SCREEN_WIDTH / 5) * 4, 250, ui.defaultFont.font, ui.defaultFont.color);

        // Make a replay button
        var textInfo = { text: "PLAY AGAIN" };
        this.playButton = ui.makeSimpleButton(this, app.SCREEN_WIDTH / 2, 400, 200, 50, textInfo);
        this.playButton.callback = function(evt) {
            app.gotoScreen("wavestart");
        }
     }
}

