// Give us a random number between a minimum and maximum
// TODO: Put this in a utils file or something
function rand(min, max) {
	return (Math.floor(Math.random() * (max*1000 - min*1000 + 1)) + min*1000)/1000;
}

// Give us a random RGBA color between a min and max RGBA color
function randColor (min, max) {
	return new RGBA(
		rand(min.r, max.r),
		rand(min.g, max.g),
		rand(min.b, max.b),
		rand(min.a, max.a)
	);
}

// Lerp between two colors
function lerpColor(colorA, colorB, value)
{
	// Interpolate between all of the values
	var r = lerp(colorA.r, colorB.r, value);
	var g = lerp(colorA.g, colorB.g, value);
	var b = lerp(colorA.b, colorB.b, value);
	var a = lerp(colorA.a, colorB.a, value);

	// Return our new color
	return new RGBA(r, g, b, a);
}

function lerp(valA, valB, value)
{
	// Clamp the value
	value = value > 1 ? 1 : value;
	value = value < 0 ? 0 : value;
	return valA * (1 - value) + valB * value;
}

// Return a color defined in RGBA format
function RGBA (r,g,b,a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	this.str = function() {
		return "rgba("+Math.round(this.r)+","+Math.round(this.g)+","+Math.round(this.b)+","+Math.round(this.a)+")";
	};
}

// Are two actors colliding with each other?
function areActorsColliding(actor1, actor2)
{

	var distance = getDistance(actor1.position, actor2.position);

	// If the distance is closer than our radii
	if(distance < (actor1.radius + actor2.radius))
	{
		return true;
	}

	return false;
};

// Get the distance between two positions (must be an object in {x: ?, y: ?} format)
function getDistance(pos1, pos2)
{
    // We use the pythagorean theorem to determine the distance between two points,
    // where C is the distance
    //
    //       Point A |
    //               v
    //              /|
    //             / |
    //          C /  | 
    //           /   | B
    //          /    |    
    //         /_____|
    //         ^  A    
    // Point B |


    // pos1.x - pos2.x gets us the length of one side of the triangle (the a)
    // We'll square it here
    var aSqrd = Math.pow((pos1.x - pos2.x), 2);

    // pos1.y - pos2.y gets us the length of the other side (the b)
    var bSqrd = Math.pow((pos1.y - pos2.y), 2);

    // Now we get c, using the pytahgorean theorem
    var distance = Math.sqrt(aSqrd + bSqrd);

    return distance;
}

/*
if()
{

}
else
{
    console.log("ERROR: is not defined");
}
*/