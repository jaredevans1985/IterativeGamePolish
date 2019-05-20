class Pickup {
    constructor(parent, name = "enemy", info, xPos, yPos)
    {
        // Save our info
        this.info = info;

        // create and parent the image
        this._container = new createjs.Container();
        this._image = new createjs.Shape();
        this._image.graphics.beginFill(info.color ? info.color : "magenta").dc(0, 0, this.info.imageSize ? this.info.imageSize : 20);
        parent.addChild(this._container);
        this._container.addChild(this._image);

        if(!info.color)
        {
            console.log("WARNING: color is not defined for " + name);
        }

        if(!this.info.imageSize)
        {
            console.log("ERROR: imageSize is not defined for " + name);
        }

        var dispText = info.displayText ? info.displayText : "WARNING: displayText not defined"
        
        this.text = ui.makeText(this._container, dispText, 0,0, (this.info.imageSize - 0) + "px Titan One", this.info.textColor ? this.info.textColor : ui.colors.dark, "center");;

        if(!info.textColor)
        {
            console.log("WARNING: textColor is not defined for " + name);
        }

        // Set the name
        this._name = name;

        this._position = {x: 0, y: 0};
        this._position.x = xPos + ((Math.random() * 70) - 35);
        this._position.y = yPos + ((Math.random() * 70) - 35);

        if(this._position.x < 20)    this.position.x = 20;
        if(this._position.x > app.SCREEN_WIDTH - 20)    this.position.x = app.SCREEN_WIDTH - 20;
        if(this._position.y < 20)    this.position.y = 20;
        if(this._position.y > app.SCREEN_HEIGHT - 20)    this.position.y = app.SCREEN_HEIGHT - 20;

        this._rotation = 0;

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
            console.log("ERROR: collisionRadius is not defined for pickup " + name);
        }

        // Add a timerbar
        var callback = function(pickup)
        {
            this.fill.scaleX = pickup.timeLeft / 3;

            if(!this.container.visible)
            {
                this.container.visible = true;
            }
        };
        var barPos = this.info.imageSize ? this.info.imageSize : 20;
        this.timerBar = ui.makeFillbar(this._container, 0, 10 + barPos, 30, 8, ui.colors.dark, "orange", "8px Titan One", "SaddleBrown", callback, 2);
        this.timerBar.container.visible = false;

        this.timeLeft = this.info.timeToLive ? this.info.timeToLive : 3;

        if(!info.timeToLive)
        {
            console.log("WARNING: timeToLive is not defined for " + name);
        }

        if(gameSettings.DEBUG_MODE_ON)
        {
            this.debugShape = new createjs.Shape();
            this.debugShape.graphics.beginStroke("black").drawCircle(0,0, this._radius);
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
        // Update our position and rotation
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._image.rotation = this._rotation - 90;

        // Test for collisions
        var pickup = this;
        if(areActorsColliding(pickup, app.player))
        {
            pickup.onCollision(app.player);
            app.player.onCollision(pickup);
        }

        if(this.timeLeft > 0)
        {
            this.timeLeft -= dt;

            if(this.timeLeft < 3)
            {
                if(!this.timerBar.container.visible)
                {
                    this.timerBar.container.visible = true;
                }

                this.timerBar.updateFillbar(this);

                if(this.timeLeft <= 0)
                {
                    this.killPickup();
                }
            }
        }
    }

    draw(dt)
    {
        // Any special draw code we need
    }
    
    killPickup()
    {
        app.gamespace.removeChild(this._container);
        app.pickups.splice(app.pickups.indexOf(this), 1);
    }

    onCollision()
    {
    
        var somethingHappened = false;

        if(this.info.changeInHealth && this.info.changeInHealth !== 0)
        {
            app.player.changeHealth(this.info.changeInHealth);
            somethingHappened = true;
        }

        if(this.info.changeInScore && this.info.changeInScore !== 0)
        {
            app.score += this.info.changeInScore;
            app.screen.scoreUI.text = app.score;
            somethingHappened = true;
        }

        if(this.info.changeInDamage && this.info.changeInDamage !== 0)
        {
            app.player.bulletDamage += this.info.changeInDamage;
            app.screen.updatePlayerStats("damage");
            somethingHappened = true;
        }

        if(this.info.changeInSpeed && this.info.changeInSpeed !== 0)
        {
            app.player.moveSpeed += this.info.changeInSpeed;
            app.screen.updatePlayerStats("speed");
            somethingHappened = true;
        }

        if(this.info.changeInMaxHealth && this.info.changeInMaxHealth !== 0)
        {
            app.player.maxHealth += this.info.changeInMaxHealth;
            app.player.health += this.info.changeInMaxHealth;
            app.screen.updatePlayerStats("health");
            app.screen.healthFill.updateFillbar();
            somethingHappened = true;
        }

        if(!somethingHappened)
        {
            console.log("ERROR: A " + this._name + " was picked up but no change settings were found or noe of them were equal to a value other than 0");
        }

        this.killPickup();

    }

}