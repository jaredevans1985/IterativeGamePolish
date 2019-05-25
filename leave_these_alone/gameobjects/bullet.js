class Bullet {
    constructor(parent, name = "bullet", x = 0, y = 0, rotation = 0, scale = 1, deathParticleInfo = null, bulletImage = null)
    {
        // create and parent the image
        this._container = new createjs.Container();
        this._image = new createjs.Shape();
        this._image.graphics.beginFill("DarkTurquoise").dr(0, 0, 15, 7.5);
        parent.addChild(this._container);
        this._container.addChild(this._image);

        // Set the name
        this._name = name;

        // Set the position and rotation
        this._position = {x: x, y: y};
        this._rotation = rotation;

        // Set the attributes of the container
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.scale = scale;
        this._container.rotation = this._rotation;    // degrees

        // Set a central reg x point
        this._image.setBounds(0, 0, 15, 7.5);
        this._image.regX = this._image.getBounds().width/2;
        this._image.regY = this._image.getBounds().height/2;

        this._radius = 10;

        if(playerSettings.bulletCollisionRadius)
        {
            this._radius = playerSettings.bulletCollisionRadius;
        }
        else
        {
            console.log("ERROR: playerSettings.bulletCollisionRadius is not defined");
        }

        this.damage = 5;

        if(app.player.bulletDamage)
        {
            this.damage = app.player.bulletDamage;
        }
        else
        {
            console.log("ERROR: playerSettings.bulletDamage is not defined");
        }

        if(gameSettings.DEBUG_MODE_ON)
        {
            this.debugShape = new createjs.Shape();
            this.debugShape.graphics.beginStroke("black").drawCircle(0,0, this._radius/this.container.scale);
            this._container.addChild(this.debugShape);
        }
		
		// If there's a death particle, set it
		if(deathParticleInfo)
		{
			this._deathParticleInfo = deathParticleInfo;
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
        var bulletSpeed = 50;

        if(playerSettings.bulletSpeed)
        {
            bulletSpeed = playerSettings.bulletSpeed;
        }
        else
        {
            console.log("ERROR: playerSettings.bulletSpeed is not defined");
        }

        // Update our position and rotation
        this._position.x += Math.cos(this.getRotationRadians()) * bulletSpeed * dt;
		this._position.y += Math.sin(this.getRotationRadians()) *  bulletSpeed  * dt;
        this._container.x = this._position.x;
        this._container.y = this._position.y; 

        if(this._position.x < -10 || this._position.x > app.SCREEN_WIDTH + 10 || this._position.y < -10 || this._position.y > app.SCREEN_HEIGHT + 10)
        {
            this.killBullet();
        }
    }

    draw(dt)
    {
        // Any special draw code we need
    }

    killBullet()
    {
        app.gamespace.removeChild(this._container);
        app.bullets.splice(app.bullets.indexOf(this), 1);
    }

    onCollision(collidingObject)
    {
		// If there's a death particle, fire it off
		if(this._deathParticleInfo)
		{
			effects.tryParticle(this._deathParticleInfo.definition, this._deathParticleInfo.ID, this._position);
		}
		
        this.killBullet();
    }

}

class EnemyBullet {
    constructor(parent, name = "eBullet", x = 0, y = 0, rotation = 0, bulletInfo, deathParticleInfo = null)
    {
        // create and parent the image
        this._container = new createjs.Container();
        this._image = new createjs.Shape();
        this._image.graphics.beginFill(bulletInfo.color ? bulletInfo.color : "white").dp(0, 0, bulletInfo.bulletSize ? bulletInfo.bulletSize : 20, 5, 2);
        parent.addChild(this._container);
        this._container.addChild(this._image);

        if(!bulletInfo.color)
        {
            console.log("WARNING: an enemy is trying to fire a bullet that has no color, using default");
        }

        if(!bulletInfo.bulletSize)
        {
            console.log("WARNING: an enemy is trying to fire a bullet that has no bulletSize, using default");
        }

        // Set the name
        this._name = name;

        // Set the position and rotation
        this._position = {x: x, y: y};
        this._rotation = rotation;

        // Set the attributes of the container
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.rotation = this._rotation;    // degrees

        this.info = bulletInfo;

        this._radius = bulletInfo.bulletSize ? bulletInfo.bulletSize : 20;

        this.damage = bulletInfo.damage ? bulletInfo.damage : 1;
        
        if(!bulletInfo.damage)
        {
            console.log("WARNING: an enemy is trying to fire a bullet that has no damage, using default");
        }

        if(gameSettings.DEBUG_MODE_ON)
        {
            this.debugShape = new createjs.Shape();
            this.debugShape.graphics.beginStroke("black").drawCircle(0,0, this._radius);
            this._container.addChild(this.debugShape);
        }
		
		// If there's a death particle, set it
		if(deathParticleInfo)
		{
			this._deathParticleInfo = deathParticleInfo;
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
        var bulletSpeed = 50;

        if(this.info.bulletSpeed)
        {
            bulletSpeed = this.info.bulletSpeed;
        }
        else
        {
            console.log("ERROR: bulletSpeed is not defined in enemysettings");
        }

        // Update our position and rotation
        this._position.x -= Math.cos(this.getRotationRadians()) * bulletSpeed * dt;
		this._position.y -= Math.sin(this.getRotationRadians()) * bulletSpeed * dt;
        this._container.x = this._position.x;
        this._container.y = this._position.y; 
        this._image.rotation += 10;

        if(this._position.x < -10 || this._position.x > app.SCREEN_WIDTH + 10 || this._position.y < -10 || this._position.y > app.SCREEN_HEIGHT + 10)
        {
            this.killBullet();
        }
    }

    draw(dt)
    {
        // Any special draw code we need
    }

    killBullet()
    {
        app.gamespace.removeChild(this._container);
        app.enemyBullets.splice(app.enemyBullets.indexOf(this), 1);
    }

    onCollision(collidingObject)
    {
		if(this._deathParticleInfo)
		{
			effects.tryParticle(this._deathParticleInfo.definition, this._deathParticleInfo.ID, this._position);
		}
		
        this.killBullet();
    }

}