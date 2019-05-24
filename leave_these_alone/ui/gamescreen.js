class GameScreen extends ScreenBase
{
     constructor()
     {
        super();

        // Change the background color
        this._fillShape.visible = false;

        // Make a ui entry to track the number of clicks
        this.scoreUI = ui.makeText(this, app.score, app.SCREEN_WIDTH - 15, 25, ui.defaultFont.font, ui.defaultFont.color, "right");
     
        // Displays text in between waves
        this.waveText = ui.makeText(this, "", 400, 200, "50px " + polishSettings.font, "rgba(0, 0, 0, 255)", "center");
        this.waveText.alpha = 0;
        this.updateWaveText();

        ui.makeText(this, "COINS", app.SCREEN_WIDTH - 15, 45, "16px " + polishSettings.font, ui.defaultFont.color, "right");
     

        // Health bar
        var callback = function()
        {
            this.fill.scaleX = app.player.health / app.player.maxHealth ;
            this.text.text = app.player.health + " / " + app.player.maxHealth;
        };

        this.healthFill = ui.makeFillbar(this, 115, 25, 200, 25, polishSettings.colors.dark, polishSettings.colors.healthFill, "14px " + polishSettings.font, polishSettings.colors.fillbarText, callback );
        ui.makeText(this, "HEALTH", 15, 50, "16px " + polishSettings.font, ui.defaultFont.color, "left");

        var callback2 = function()
        {
            if(gameSettings.waveDefs[app.currentWave - 1].enemyList)            
            {
                this.fill.scaleX = app.enemiesKilledThisWave / gameSettings.waveDefs[app.currentWave - 1].enemyList.length ;
                this.text.text = app.enemiesKilledThisWave + " / " + gameSettings.waveDefs[app.currentWave - 1].enemyList.length;
            }
            else
            {
                console.log("ERROR: enemyList is not defined for the current list in waveDefs");
            }
        };
        this.waveFill = ui.makeFillbar(this, app.SCREEN_WIDTH / 2, app.SCREEN_HEIGHT - 30, 350, 30, polishSettings.colors.dark, polishSettings.colors.progressFill, "18px " + polishSettings.font, polishSettings.colors.fillbarText, callback2 );
        ui.makeText(this, "ENEMIES CLEARED", app.SCREEN_WIDTH / 2, app.SCREEN_HEIGHT - 55, "18px " + polishSettings.font, ui.defaultFont.color, "center");

        this.damageText = ui.makeText(this, "DAMAGE: +0", 15, 70, "14px " + polishSettings.font, ui.defaultFont.color, "left");
        this.healthText = ui.makeText(this, "HEALTH: +0", 15, 85, "14px " + polishSettings.font, ui.defaultFont.color, "left");
        this.speedText = ui.makeText(this, "SPEED: +0", 15, 100, "14px " + polishSettings.font, ui.defaultFont.color, "left");

        this.damageText.visible = false;
        this.healthText.visible = false;
        this.speedText.visible = false;

        this.damageBoosts = 0;
        this.speedBoosts = 0;
        this.healthBoosts = 0;
    }

    updateWaveText()
    {
        var waveText = "WAVE " + app.currentWave;
        if(gameSettings.waveDefs[app.currentWave - 1] && gameSettings.waveDefs[app.currentWave - 1].waveName)
        {
            if(gameSettings.waveDefs[app.currentWave - 1].waveName !== "default")
            {
                waveText = gameSettings.waveDefs[app.currentWave - 1].waveName;
            }
        }
        else if(!gameSettings.waveDefs[app.currentWave - 1].waveName)
        {
            console.log("WARNING: waveName not defined for current wave in waveDefs, default is being used");
        }

        this.waveText.text = waveText;
    }

    updatePlayerStats(increasedStat)
    {
        switch(increasedStat)
        {
            case "damage":
            this.damageBoosts++;
            break;
            case "speed":
            this.speedBoosts++;
            break;
            case "health":
            this.healthBoosts++;
            break;
        }

        this.damageText.text = "DAMAGE: +" + (app.player.bulletDamage - playerSettings.bulletDamage);
        if(!this.damageText.visible && this.damageBoosts > 0)
        {
            this.damageText.visible = true;
        }

        this.speedText.text = "SPEED: +" + (app.player.moveSpeed - playerSettings.moveSpeed);
        if(!this.speedText.visible && this.speedBoosts > 0)
        {
            this.speedText.visible = true;
        }

        this.healthText.text = "HEALTH: +" + (app.player.maxHealth - playerSettings.startingHealth);
        if(!this.healthText.visible && this.healthBoosts > 0)
        {
            this.healthText.visible = true;
        }
    }
}