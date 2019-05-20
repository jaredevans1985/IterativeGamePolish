// This object contains some default values and helper function for setting up UI
var ui = {

    // Set up some default values
    colors : {
        default : '#957bf2',
        dark : '#362868',
        light : '#dad1f9',
        background : '#fff291',
    },

    // fonts
    defaultFont: { font: "26px Titan One", color: '#362868' },
    headerFont: { font: "24px Titan One", color: '#362868' },
    titleFont: { font: "40px Titan One", color: '#362868' },
    buttonFont: { font: "20px Titan One", color: '#362868' },

    // A handy function for creating text
    makeText(container, text = "", x = 0, y = 0, font = this.defaultFont.font, color = this.defaultFont.color, alignment = "center")
    {
        var newText = new createjs.Text(text, font, color);
        newText.x = x; //positions the text
        newText.y = y;
        newText.textAlign = alignment;
        newText.textBaseline = "middle";
        container.addChild(newText);  //adds the text object to the stage

        return newText;
    },

    // Make a button made out of createjs shapes
    makeSimpleButton(container, x = 0, y = 0, w = 200, h = 50, textInfo, colorInfo)
    {
        // Set-up our button's container
        var newButton = new createjs.Container();
        newButton.setBounds(0, 0, w, h);
        newButton.setTransform(x - (w / 2), y - (h / 2));

        // Set our toggle boolean
        newButton.canToggle = false;
        newButton.toggledOn = true;

        // Our colors, either the defaults, or pulled from colorInfo
        newButton.color = ui.colors.default;
        newButton.highlightColor = ui.colors.light;
        newButton.pressedColor = ui.colors.dark;
        newButton.offColor = "#ddd";

        if(colorInfo)
        {
            newButton.color = colorInfo.color ? colorInfo.color : ui.colors.default;
            newButton.highlightColor = colorInfo.highlightColor ? colorInfo.highlightColor : ui.colors.light;
            newButton.pressedColor = colorInfo.pressedColor ? colorInfo.pressedColor : ui.colors.dark;
            newButton.offColor = colorInfo.offColor ? colorInfo.offColor : "#ddd";
        }
        
        // Our fill shape
        newButton.fillShape = new createjs.Shape();
        newButton.fillShape.graphics.setStrokeStyle(2).beginStroke(newButton.pressedColor).beginFill(newButton.color).drawRect(0, 0, w, h);
        newButton.addChild(newButton.fillShape);
        
        // Our callback function which is fired when the button is clicked on
        newButton.callback = function(evt) {
            console.log("WARNING: A button has the default callback");
        }

        // Our mouse action callbacks 
        newButton.on("mouseover", function(evt) {
            this.fillShape.graphics.setStrokeStyle(2).beginStroke(newButton.color).beginFill(newButton.highlightColor).drawRect(0, 0, w, h);
            //console.log("mouseover");
        });        
        newButton.on("mouseout", function(evt) { 
            if(this.toggledOn)
            {
                this.fillShape.graphics.setStrokeStyle(2).beginStroke(newButton.pressedColor).beginFill(newButton.color).drawRect(0, 0, w, h);
            }
            else
            {
                this.fillShape.graphics.setStrokeStyle(2).beginStroke(newButton.highlightColor).beginFill(newButton.offColor).drawRect(0, 0, w, h);
            }

            //console.log("mouseout");
        });        
        newButton.on("mousedown", function(evt) { 
            this.fillShape.graphics.setStrokeStyle(2).beginStroke(newButton.highlightColor).beginFill(newButton.pressedColor).drawRect(0, 0, w, h);
            //console.log("mousedown");

            // Do our toggling
            if(this.canToggle)
            {
                this.toggledOn = !this.toggledOn;
            }

            // Call our callback
            this.callback(evt);
        }); 
        newButton.on("click", function(evt) {
            this.fillShape.graphics.setStrokeStyle(2).beginStroke(newButton.color).beginFill(newButton.highlightColor).drawRect(0, 0, w, h);
            //console.log("click");
        });    

        // If we get a bundle of text info, set up the text
        if (textInfo)
        {
            newButton.text = this.makeText(
                newButton, textInfo.text, w / 2, h / 2, 
                textInfo.font ? textInfo.font : this.buttonFont.font, 
                textInfo.color ? textinfo.color : this.buttonFont.color, 
                textInfo.alignment ? textInfo.alignment : "center"
            );
        }

        container.addChild(newButton);

        return newButton;
    },

    makeFillbar(parent, x, y, w, h, backColor = ui.colors.dark, fillColor = ui.color.light, textFont = ui.defaultFont.font, textColor = "white", callback, borderSize = 5)
    {
        var fillbar = {};

        fillbar.container = new createjs.Container();
        fillbar.container.x = x;
        fillbar.container.y = y;
        fillbar.container.setBounds(0, 0, w, h);
        fillbar.container.regX = w / 2;
        fillbar.container.regY = h / 2;
        parent.addChild(fillbar.container);

        // Add a fillbar
        fillbar.back = new createjs.Shape();
        fillbar.back.graphics.beginFill(backColor).drawRect(0, 0, w, h);
        fillbar.container.addChild(fillbar.back);

        fillbar.fill = new createjs.Shape();
        fillbar.fill.graphics.beginFill(fillColor).drawRect(borderSize, borderSize, w - (borderSize * 2), h - (borderSize * 2));
        fillbar.container.addChild(fillbar.fill);

        // Add Percentage Text
        fillbar.text = ui.makeText(fillbar.container, "", w/2, h/2 - 1, textFont, textColor);

        fillbar.updateFillbar = callback;

        return fillbar;
    },

};

//  // Create a text object
//  myText = new createjs.Text("Hello World", "12px Titan One", "#ff00ff");  //creates text object
//  myText.x = 10; //positions the text
//  myText.y = 50; 
//  this.stage.addChild(myText);  //adds the text object to the stage
 
//  // Create a container
//  var containerObj = new createjs.Container();
//  this.stage.addChild(containerObj);
//  containerObj.setTransform(100,100);

//  // Draw a circle
//  var circle = new createjs.Shape();  //creates object to hold a shape
//  circle.graphics.beginFill("#A66").drawCircle(0, 100, 40);  //creates circle at 0,0, with radius of 40
//  circle.x = circle.y = 50;  //this just sets the x and y equal to 50
//  containerObj.addChild(circle);  //add the circle to the stage but it is not apparent until the stage is updated
//  //circle.visible = false;
//  this.GameObjects[0] = circle;
//  console.log(this.GameObjects[0].x);

//  // Draw un rectangulo
//  var rectangle = new createjs.Shape();
//  rectangle.graphics.beginFill('#447').drawRect(200, 200, 50, 50);
//  rectangle.setBounds(0, 0, 50, 50);
//  rectangle.regX = rectangle.getBounds.width/2;
//  rectangle.regY = rectangle.getBounds.height/2;
//  containerObj.addChild(rectangle);

//  // Basic hit testing
//  if(circle.hitTest(-40, 100))
//  {
//      console.log("circle hit");
//  }
//  else
//  {
//      console.log("no hit");
//  }

 
//  circle.on("click", function(evt) { console.log("Clicked"); });        
//  circle.on("mouseover", function(evt) { console.log("Mouse Over"); });        
//  circle.on("mouseout", function(evt) { console.log("Mouse Out"); });        
//  circle.on("mousedown", function(evt) { console.log("Mouse Down"); }); 