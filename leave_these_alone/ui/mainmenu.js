class MainMenu extends ScreenBase
{
     constructor()
     {
        super();

		// Add a background
		if(polishSettings.mainMenuSplash)
		{	
			this.addChild(new createjs.Bitmap(assets.getResult(polishSettings.mainMenuSplash)));
		}
		
        // Make a title
        var tText = uiSettings.TITLE_TEXT ? uiSettings.TITLE_TEXT : "WARNING: no TITLE_TEXT in uisettings"

        ui.makeText(this, tText, app.SCREEN_WIDTH / 2, 100, ui.titleFont.font, ui.titleFont.color);
		
        // Make a play button
        var textInfo = { text: "PLAY" };
        this.playButton = ui.makeSimpleButton(this, app.SCREEN_WIDTH / 2, 375, 200, 50, textInfo);
        this.playButton.callback = function(evt) {
            app.gotoScreen("wavestart");
        }

        // Make a help button
        var textInfo = { text: "HELP" };
        this.playButton = ui.makeSimpleButton(this, app.SCREEN_WIDTH / 2, 450, 200, 50, textInfo);
        this.playButton.callback = function(evt) {
            app.gotoScreen("help");
        }
     }
}

