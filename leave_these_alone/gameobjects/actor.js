class Actor {
    constructor(parent, name = "actor", x = 0, y = 0, scale = 1, rotation = 0)
    {
		// Set the position and rotation
        this._position = {x: x, y: y};
        this._rotation = rotation;
		
		// Create the player trail
		effects.tryParticle(polishSettings, "playerTrailParticle", this);
		
        // create and parent the image
        this._container = new createjs.Container();
		parent.addChild(this._container);
		
        this._image = null;
		
		if(polishSettings.playerImage)
		{
			this._image = new createjs.Bitmap(assets.getResult(polishSettings.playerImage));
			this._container.addChild(this._image);
		}
		else
		{	
			this._image = new createjs.Shape();
			this._image.graphics.beginFill("teal").dr(0, 0, 50, 50);
			this._container.addChild(this._image);

			// make a gun
			var gun = new createjs.Shape();
			gun.graphics.beginFill('gray').dr(-7.5, 10, 15, 35);
			this._container.addChild(gun);
			
			// Set a bounds
			this._image.setBounds(0, 0, 50, 50);
		}
		
		// Set a central reg x point
		this._image.regX = this._image.getBounds().width/2;
		this._image.regY = this._image.getBounds().height/2;
		
        // Set the name
        this._name = name;

        // Set the attributes of the container
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.scale = scale;
        this._container.rotation = this._rotation;    // degrees

        this._radius = 25;
        if(playerSettings.collisionRadius)
        {
            this._radius = playerSettings.collisionRadius;
        }
        else
        {
            console.log("ERROR: playerSettings.collisionRadius is not defined");
        }

        this.health = 5;
        if(playerSettings.startingHealth)
        {
            this.health = playerSettings.startingHealth;
        }
        else
        {
            console.log("ERROR: playerSettings.startingHealth is not defined");
        }

        this.maxHealth = 5;
        if(playerSettings.startingHealth)
        {
            this.maxHealth = playerSettings.startingHealth;
        }

        this.bulletDamage = 1;
        if(playerSettings.bulletDamage)
        {
            this.bulletDamage = playerSettings.bulletDamage;
        }
        else
        {
            console.log("ERROR: playerSettings.bulletDamage is not defined");
        }

        this.moveSpeed = 50;
        if(playerSettings.moveSpeed)
        {
            this.moveSpeed = playerSettings.moveSpeed;
        }
        else
        {
            console.log("ERROR: playerSettings.moveSpeed is not defined");
        }

        if(gameSettings.DEBUG_MODE_ON)
        {
            this.debugShape = new createjs.Shape();
            this.debugShape.graphics.beginStroke("black").drawCircle(0,0, this._radius / this._container.scale);
            this._container.addChild(this.debugShape);
        }
    }

    get container() { return this._container; }
    set container(c) { this._container = c; }

    get image() { return this._image; }
    set image(i) { this._image = i; }

    get name() { return this._name; }
    set name(n) { this._name = n; }

    get position() { return this._position; }
    set position(p) { this._position = p; }

    get radius() { return this._radius; }
    set radius(r) { this._radius = r; }

    addPosition(x, y)
    {
        this._position.x += x;
        this._position.y += y;

        if(this._position.x < 0)    this.position.x = 0;
        if(this._position.x > app.SCREEN_WIDTH)    this.position.x = app.SCREEN_WIDTH;
        if(this._position.y < 0)    this.position.y = 0;
        if(this._position.y > app.SCREEN_HEIGHT)    this.position.y = app.SCREEN_HEIGHT;
    }

    setScale(scaleX, scaleY)
    {
        this._image.scaleX = scaleX;
        this._image.scaleY = scaleY;
    }
    
    get rotation() { return this._rotation; }
    set rotation(r) { this._rotation = r; }

    changeHealth(changeVal)
    {

        this.health = this.health + changeVal;

        if(this.health > this.maxHealth)
        {
            this.health = this.maxHealth;
        }

        if(this.health < 0)
        {
            this.health = 0;
        }
    }

    getRotationRadians()
    {
        return this._rotation / 360 * 2 * Math.PI;    // degrees
    }

    addRotation(rotation)
    {
        this._rotation += rotation;    // degrees
    }


    update(dt)
    {
        // Update our position and rotation
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.rotation = this._rotation - 90;

        var player = this;
        app.enemyBullets.forEach(function(bullet){
            if(areActorsColliding(player, bullet))
            {
                player.onCollision(bullet);
                bullet.onCollision(player);
            }
        });
    }

    draw(dt)
    {
        // Any special draw code we need
    }

    onCollision(collidingObject)
    {
        this.health -= collidingObject.info.damage ? collidingObject.info.damage : 0;
        
		if(!collidingObject.info.damage && !(collidingObject instanceof Pickup))
        {
            console.log("WARNING: Player collided with '" + collidingObject.name + "' which does not have a damage value defined ");
        }
		
        app.screen.healthFill.updateFillbar();

        if (this.health <= 0)
        {
            app.state = "postwave";
			app.postWaveTimer = gameSettings.waveIsOverDelay;
			app.screen.waveText.text = polishSettings.lossMessage;
			// make player invisible
			this.container.visible = false;
			// play a sound
			audio.playSound(polishSettings.playerSounds.die);
			// do a particle
			effects.clearAllParticles();
			effects.tryParticle(polishSettings, "playerDeathParticle", this);
			// start some music
			audio.startFinalMusic(false);
        }
		else
		{
			// Make a noise
			audio.playSound(polishSettings.playerSounds.hurt);
			
			//do a particle
			effects.tryParticle(polishSettings, "playerHurtParticle", this);
		}
    }

}