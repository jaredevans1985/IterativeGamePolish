class HelpScreen extends ScreenBase
{
     constructor()
     {
        super();

        // Make a title
        var tText = uiSettings.HELP_TITLE ? uiSettings.HELP_TITLE : "WARNING: no HELP_TITLE in uisettings"
        ui.makeText(this, tText, app.SCREEN_WIDTH / 2, 100, ui.titleFont.font, ui.titleFont.color);

        // Instructions
        if(uiSettings.HELP_LINES)
        {
            for(var i = 0; i < uiSettings.HELP_LINES.length; i++)
            {
                ui.makeText(this, uiSettings.HELP_LINES[i], app.SCREEN_WIDTH / 2, 245 + 65 * i - (45 * (uiSettings.HELP_LINES.length - 1) / 2), ui.defaultFont.font, ui.defaultFont.color);
            }
        }
        else
        {
            console.log("ERROR: No HELP_LINES array defined in uisettings");
        }
        

        // Make a back button
        var textInfo = { text: "BACK" };
        this.playButton = ui.makeSimpleButton(this, app.SCREEN_WIDTH / 2, 450, 200, 50, textInfo);
        this.playButton.callback = function(evt) {
            app.gotoScreen("menus");
        }
     }
}

