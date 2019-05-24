class Enemy {
    constructor(parent, name = "enemy", info)
    {
        // Save our info
        this.info = info;
		
		// Set the name
        this._name = name;

        // Set the position and rotation
        var x = -50;
        var y = -50;

        var coinFlip = Math.random() * 2;
        if(coinFlip > 1)
        {
            // top/bottom spawn
            x = Math.random() * 800;

            var coinFlip2 = Math.random() * 2;
            if(coinFlip2 > 1)
            {
                y = -50;
            }
            else
            {
                y = 650;
            }
        }
        else
        {
            // left/right spawn
            y = Math.random() * 600;

            var coinFlip3 = Math.random() * 2;
            if(coinFlip3 > 1)
            {
                x = -50;
            }
            else
            {
                x = 850;
            }
        }

        this._position = {x: x, y: y};
        this._rotation = 0;
		
		// Try to create trail particles
		this._trail = null;
		if(this.enemyHasParticles())
		{
			this._trail = effects.tryParticle(polishSettings.enemyParticles[this._name], "trailParticle", this._position);
		}

        // create and parent the image
        this._container = new createjs.Container();
        this._image = new createjs.Shape();
        this._image.graphics.beginFill(info.color ? info.color : "magenta").dp(0, 0, this.info.enemySize ? this.info.enemySize : 20, this.info.numberOfSides ? this.info.numberOfSides : 6);
        parent.addChild(this._container);
        this._container.addChild(this._image);

        if(!this.info.enemySize)
        {
            console.log("ERROR: enemySize is not defined for " + info.name);
        }

        if(!this.info.color)
        {
            console.log("WARNING: Enemy '" + name + "' does not have a color defined, using default ");
        }

        if(!this.info.numberOfSides)
        {
            console.log("WARNING: Enemy '" + name + "' does not have a numberOfSides defined, using default ");
        }

        

        // Set the attributes of the container
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._image.rotation = this._rotation;    // degrees

        this._radius = 20;

        if(this.info.collisionRadius)
        {
            this._radius = this.info.collisionRadius;
        }
        else
        {
            console.log("ERROR: collisionRadius is not defined for enemy " + name);
        }

        this.health = 1;

        if(this.info.health)
        {
            this.health = this.info.health;
        }
        else
        {
            console.log("ERROR: health is not defined for enemy " + name);
        }


        // Add a healthbar
        var callback = function(enemy)
        {
            this.text.text = enemy.health + "/" + enemy.info.health;
            this.fill.scaleX = enemy.health / enemy.info.health;

            if(!this.container.visible)
            {
                this.container.visible = true;
            }
        };
        var barPos = this.info.enemySize ? this.info.enemySize : 20;
        this.healthBar = ui.makeFillbar(this.container, 0, -10 - barPos, 75, 15, ui.colors.dark, "red", "12px Titan One", "white", callback, 2);
        this.healthBar.container.visible = false;

        if(this.info.bulletSettings)
        {
            if(this.info.bulletSettings.fireRate || this.info.bulletSettings.fireRate === 0)
            {
                this.shootTimer = this.info.bulletSettings.fireRate;
            }
            else
            {
                console.log("ERROR: Enemy '" + this._name + "' does not have a fireRate defined in bulletSettings");
            }
        }
        else
        {
            console.log("ERROR: Enemy '" + this._name + "' does not have a bulletSettings defined");
        }
        

        if(gameSettings.DEBUG_MODE_ON)
        {
            this.debugShape = new createjs.Shape();
            this.debugShape.graphics.beginStroke("black").drawCircle(0,0, this._radius);
            this._container.addChild(this.debugShape);
        }
		
		// Play spawn sound if one exists
		if(polishSettings.enemySounds[name] && polishSettings.enemySounds[name].spawn)
		{
			audio.playSound(polishSettings.enemySounds[name].spawn);
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
    }

    setScale(scaleX, scaleY)
    {
        this._image.scaleX = scaleX;
        this._image.scaleY = scaleY;
    }
    
    get rotation() { return this._rotation; }
    set rotation(r) { this._rotation = r; }

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
        // Start moving us towards the player
        var angleRad = Math.atan2(this._position.y - app.player.position.y, this._position.x - app.player.position.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this._rotation = angleDeg;

        // Now, we get the distance between both points, so that we can stop moving when we're close enough
        var distance = Math.sqrt(Math.pow((this._position.x - app.player.position.x), 2) + Math.pow((this._position.y - app.player.position.y), 2));

        // If the game object is far enough away, moves it towards the player
        var moveSpeed = this.info.moveSpeed;    

        if(this.info.moveSpeed)
        {
            moveSpeed = this.info.moveSpeed;
        }
        else
        {
            console.log("ERROR: moveSpeed is not defined for enemy " + this._name);
        }

        if(distance > 15)
        {	
            // Move towards the player
            this._position.x -= Math.cos(angleRad) * moveSpeed * dt;
            this._position.y -= Math.sin(angleRad) * moveSpeed * dt;
        }

        // Update our position and rotation
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._image.rotation = this._rotation - 90;

        // Test for collisions
        var enemy = this;
        app.bullets.forEach(function(bullet){
            if(areActorsColliding(enemy, bullet))
            {
                enemy.onCollision(bullet);
                bullet.onCollision(enemy);
            }
        });

        if(areActorsColliding(enemy, app.player))
        {
            enemy.onCollision(app.player);
            app.player.onCollision(enemy);
        }

        if(this.info.bulletSettings)
        {
            if(this.info.bulletSettings.fireRate > 0)
            {
                this.shootTimer -= dt;

                if(this.shootTimer <= 0)
                {
                    this.shootTimer = this.info.bulletSettings.fireRate;

					var bulletParticle = null;
					
					// Test for death particle for bullet
					if(polishSettings.enemyParticles[this._name])
					{
						bulletParticle = { definition: polishSettings.enemyParticles[this._name], ID: "bulletHitParticle" };
					}

                    app.enemyBullets.push(new EnemyBullet(app.gamespace, "ebullet" + app.enemyBullets.length, this._position.x, this._position.y, this._rotation, this.info.bulletSettings, bulletParticle));
					
					// Play shoot sound if one exists
					if(polishSettings.enemySounds[this.name] && polishSettings.enemySounds[this.name].shoot)
					{
						audio.playSound(polishSettings.enemySounds[this.name].shoot);
					}
					
					// And try a particle
					if(this.enemyHasParticles())
					{
						effects.tryParticle(polishSettings.enemyParticles[this._name], "shootParticle", this._position);
					}
                }
            }
        }
    }

    draw(dt)
    {
        // Any special draw code we need
    }
    
    killEnemy()
    {
        app.gamespace.removeChild(this._container);
        app.enemies.splice(app.enemies.indexOf(this), 1);
    }

    onCollision(collidingObject)
    {
        this.health -= collidingObject.damage ? collidingObject.damage : this.health;

        this.healthBar.updateFillbar(this);

        if(this.health <= 0)
        {
            this.killEnemy();

			// Play die sound if one exists
			if(polishSettings.enemySounds[this.name] && polishSettings.enemySounds[this.name].die)
			{
				audio.playSound(polishSettings.enemySounds[this.name].die);
			}

			// Remove trail if one exists
			if(this._trail)
			{
				this._trail.kill();
				this._trail = null;
			}
			
			// Create death particle
			if(this.enemyHasParticles())
			{
				effects.tryParticle(polishSettings.enemyParticles[this._name], "deathParticle", this._position);
			}

            app.enemiesKilledThisWave++;
            app.enemiesKilledThisGame++;

            app.screen.waveFill.updateFillbar();

            app.addToScore(this.info.score ? this.info.score : 0);

            if(this.info.droppedPickups && collidingObject instanceof Bullet)
            {
                
                for(var i = 0; i < this.info.droppedPickups.length; i++)
                {
                    var makePickup = false;
                    if(this.info.droppedPickups[i].dropChance >= 1)
                    {
                        makePickup = true;
                    }
                    else if(Math.random() <= this.info.droppedPickups[i].dropChance)
                    {
                        makePickup = true;
                    }
                    else if (!this.info.droppedPickups[i].dropChance)
                    {
                        console.log("ERROR: Enemy " + this.name + " trying to spawn pickup with name '" + this.info.droppedPickups[i].pickupName + "' which does not have a dropChance");
                    }

                    if(makePickup)
                    {
                       if(pickupSettings[this.info.droppedPickups[i].pickupName])
                       {
                        app.pickups.push(new Pickup(app.gamespace, this.info.droppedPickups[i].pickupName, pickupSettings[this.info.droppedPickups[i].pickupName], this._position.x, this._position.y ));
                       }
                       else if(!this.info.droppedPickups[i].pickupName)
                       {
                            console.log("ERROR: Enemy " + this.name + " is trying to spawn a pickup but no pickupName can be found");
                       }
                       else
                       {
                            console.log("ERROR: Enemy " + this.name + " trying to spawn pickup with name '" + this.info.droppedPickups[i].pickupName + "' which is not defined in pickupSettings ");
                       }
                    }
                }
            }
            else if(!this.info.droppedPickups)
            {
                console.log("ERROR: Enemy '" + this._name + "' does not have a droppedPickups array defined");
            }

            if(app.enemiesKilledThisWave >= gameSettings.waveDefs[app.currentWave - 1].enemyList.length)
            {
                app.state = "postwave";
                app.postWaveTimer = gameSettings.waveIsOverDelay;
                if( app.player.health > 0 )
                {
                    app.currentWave++;
                    app.screen.waveText.text += " COMPLETE";
                    app.clearGameObjects(false);

                    if (app.currentWave > gameSettings.waveDefs.length)
                    {
                        app.screen.waveText.text = gameSettings.victoryMessage;
                    }
                }
            }
        }
		else
		{
			// If we didn't die play a sound
			if(polishSettings.enemySounds[this.name] && polishSettings.enemySounds[this.name].hurt)
			{
				audio.playSound(polishSettings.enemySounds[this.name].hurt);
			}
			
			// And try a particle
			if(this.enemyHasParticles())
			{
				effects.tryParticle(polishSettings.enemyParticles[this._name], "hurtParticle", this._position);
			}
		}
    }
	
	enemyHasParticles()
	{
		return polishSettings.enemyParticles[this._name] !== undefined;
	}

}