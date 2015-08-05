// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var GAMEOVER = false;

var FPS = 60;
var SHIP_SPEED = 10;
var SHIP_ANGLE = 100;
var VECTOR_X = 0;
var VECTOR_Y = 0;

// canvas variables
var WIDTH = 800;
var HEIGHT = 600;
var TOP = 0;
var LEFT = 0;
var BOTTOM = 600;
var RIGHT = 800;

var SPACEBG = 'images/space-oj.jpg';
var spaceInfo = new ImageInfo(400, 300, 800, 600);

var BGPLANET = 'images/planetBG.png'; //background planet image

var SHIP = 'images/redship.png';
var MINISHIP = 'images/miniship.png'; //ships for lifebar
var shipInfo = new ImageInfo(37.5, 49.5, 75, 99, 30);
//                            cx, cy,    w,  h, r;
var SLASER = 'images/shot.png'; // lasers
var slaserInfo = new ImageInfo(5, 5, 10, 10, 20, 60);
//                             cx, cy, w, h, r, lifespan;

var ROCK = 'images/rock1.png';
var rockInfo = new ImageInfo(50.5, 42, 101, 84, 30); //6
//                            cx, cy, w,    h, radius

var DEBRIS = 'images/debris.png';

// use this to multiply an object to radians
var TO_RADIANS = Math.PI / 180;

// Math functions 
// velocity
var angleToVector = function(angle){
	return [Math.cos(angle), Math.sin(angle)];
};

// disance between to objects
var distToObj = function (px, py, qx, qy) {
	return Math.sqrt(Math.pow(px - qx, 2) + Math.pow(py - qy, 2));
};

function ImageInfo(centerX, centerY, width, height, radius, lifespan) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.width = width;
	this.height = height;
	this.radius = radius;
	this.lifespan = lifespan;
}

var gameObj = function(x, y, vx, vy, angle, angleV, image, info){
	this.sprite ='';
	this.x = x;
	this.y = y;
	this.velocity = [vx, vy];
	this.angle = angle;
	this.angleV = angleV;
	this.age = 0;
	this.lifespan = slaserInfo.lifespan;
};
gameObj.prototype.render = function(){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * TO_RADIANS);
	ctx.drawImage(Resources.get(SHIP), 0, 0, shipInfo.width, shipInfo.height, -shipInfo.centerX, -shipInfo.centerY, shipInfo.width, shipInfo.height);
	ctx.restore();
};
gameObj.prototype.collide = function(otherObj){
	var distance = distToObj(this.x, this.y, otherObj.x, otherObj.y);
	if (distToObj < (this.radius + otherObj.radius)){
		return true;
	} else {
		return false;
	}
};

var Player = function(vx, vy, angle, angleV, image, info){
	gameObj.call(this);
	this.sprite = SHIP;
	this.x = 400;
	this.y = 300;
	this.velocity = [vx, vy];
	this.thrust = false;
	this.angle = angle;
	this.angleV = angleV;
	this.imageCenterX = info.centerX;
	this.imageCenterY = info.centerY;
	this.radius = info.radius;
};

Player.prototype = Object.create(gameObj.prototype);
Player.prototype.constructor = Player;

// For every downKey, the Player will move accordingly
Player.prototype.update = function(dt){
	// control ship movement based on acceleration and not velocity
	// angle and angleV control the orientation of the ship and how fast it rotates respectively
	// key handlers should control angleV and update method should update self.angle += self.angleV

	// basic physics = position = x,y, velocity = vx, vy, accel = angleToVector
	// position update is position += velocity, velocity update is velocity += acceleration

	// ship class has pos, vel, angle, thrust
	// position update is self.pos[0] += self.vel[0], self.pos[1] += self.vel[1]

	// update thrust
	if (38 in keysDown) { // pushing down the up key turns on the thrust
		this.thrust = true;
	} else {
		this.thrust = false;
	}
	// update angular velocity to turn ship
	if (37 in keysDown) { // left rotation
		this.angleV = -5;
	} else if (39 in keysDown) { // right rotation
		this.angleV = +5;
	} else {
		this.angleV = 0;
	}
	// update ang
	this.angle += this.angleV;
	// update position
	if (this.y <= 0) {
		this.y = HEIGHT; // reset to top of screen after you hit bottom
	} else {
		this.y = (this.y + this.velocity[1]) % HEIGHT; // ship update y wrap around screen
	}
	if (this.x <= 0) {
		this.x = WIDTH; // reset to right side when you hit left side
	} else {
		this.x = (this.x + this.velocity[0]) % WIDTH;  // ship update x wrap around screen
	}
	// update velocity
	// velocity update is acceleration in direction of forward vector which is given by angleToVector
	// we update the forward vector on thrust.
	if (this.thrust) {
		var angle = this.angle * TO_RADIANS;
		var accel = angleToVector(angle);
		this.velocity[0] += accel[0] / 10;
		this.velocity[1] += accel[1] / 10;
	}

	// friction needed to help control ship!
	this.velocity[0] *= 0.99;
	this.velocity[1] *= 0.99;
};
Player.prototype.shoot = function(){
	var vangle = this.angle * TO_RADIANS;
	var forwardDir = angleToVector(vangle);
	var laserX = this.x + this.radius * forwardDir[0];
	var laserY = this.y + this.radius * forwardDir[1];
	var laserXVel = this.velocity[0] + 5 * forwardDir[0];
	var laserYVel = this.velocity[1] + 5 * forwardDir[1];
	var laser = new Laser(laserX, laserY, laserXVel, laserYVel, this.angle, 0, SLASER, slaserInfo);
	lasers.push(laser);
};
// collision function takes this object and another object and compares their distances to determine if they collide
Player.prototype.collide = function(otherObj){
	var distance = distToObj(this.x, this.y, otherObj.x, otherObj.y);
	if (distance < (this.radius + otherObj.radius)){
		return true;
	} else {
		return false;
	}
};

// Rock class
var Rock = function(x, y, vx, vy, angle, angleV, image, info){
	gameObj.call(this);
	this.sprite = ROCK;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.angleV = angleV;
	this.velocity = [vx, vy];
	this.imageCenterX = info.centerX;
	this.imageCenterY = info.centerY;
	this.radius = info.radius;
};
Rock.prototype = Object.create(gameObj.prototype);
Rock.prototype.constructor = Rock;
Rock.prototype.render = function (x, y, vx, vy, angle, angleV, image, info) {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * TO_RADIANS);
	ctx.drawImage(Resources.get(ROCK), 0, 0, rockInfo.width, rockInfo.height, -rockInfo.centerX, -rockInfo.centerY, rockInfo.width, rockInfo.height);
	ctx.restore();
};
Rock.prototype.update = function(dt){
	// changes rock position and makes sure they wrap around the screen
	this.x += (this.velocity[0] /2);
	this.y += (this.velocity[1] /2);
	this.angle += this.angleV;
	if (this.x >= RIGHT){
		this.x = LEFT;
	} else if (this.x <= LEFT){
		this.x = RIGHT;
	}
	if (this.y >= BOTTOM){
		this.y = TOP;
	} else if (this.y <= TOP){
		this.y = BOTTOM;
	}
};
Rock.prototype.collide = function(otherObj){
	var distance = distToObj(this.x, this.y, otherObj.x, otherObj.y);
	if (distance < (this.radius + otherObj.radius)){
		return true;
	} else {
		return false;
	}
};

// Laser class
var Laser = function(x, y, vx, vy, angle, angleV, image, info, radius){
	gameObj.call(this);
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.angleV = angleV;
	this.velocity = [vx, vy];
	this.imageCenterX = slaserInfo.centerX;
	this.imageCenterY = slaserInfo.centerY;
	this.radius = info.radius;
	this.lifespan = info.lifespan;
};
Laser.prototype = Object.create(gameObj.prototype);
Laser.prototype.constructor = Laser;
Laser.prototype.render = function(x, y, vx, vy, angle, angleV, image, info){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * TO_RADIANS);
	ctx.drawImage(Resources.get(SLASER), 0, 0, slaserInfo.width, slaserInfo.height, -this.imageCenterX, -this.imageCenterY, slaserInfo.width, slaserInfo.height);
	ctx.restore();
};
Laser.prototype.update = function(){
	this.x += this.velocity[0];
	this.y += this.velocity[1];
	this.angle += this.angleV;
	this.age += 1;

    if (this.y <= 0) {
		this.y = HEIGHT; // reset to top of screen 
	} else {
		this.y = this.y % HEIGHT; // y wrap around screen
	}
	if (this.x <= 0) {
		this.x = WIDTH; // reset to opposite side
	} else {
		this.x = this.x % WIDTH;  // x wrap around screen
	}

	// expiration date for lasers
	if (this.age >= this.lifespan) {
		return false; // end
	} else {
		return true; // keep
	}
};
Laser.prototype.collide = function(otherObj){ // checks if laser hits rocks
	var distance = distToObj(this.x, this.y, otherObj.x, otherObj.y);
	if (distance < (this.radius + otherObj.radius)){
		return true;
	} else {
		return false;
	}
};

// Helper Functions listed below

// array of rocks to be rendered
var rocks = [];
// array of lasers to be rendered
var lasers = [];
// make new Player at default x, y position that's in Player
var player = new Player(0, 0, 0, 0, SHIP, shipInfo);

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// make individual rocks to be pushed to rocks array
var rockMaker = function(){
	if (rocks.length < 3) {
		var x = getRandomIntInclusive(0, WIDTH);
		var y = getRandomIntInclusive(0, HEIGHT);
		var vx = getRandomIntInclusive(-6, 6);
		var vy = getRandomIntInclusive(-6, 6);
		var angle = getRandomIntInclusive(0, 90);
		var angleV = getRandomIntInclusive(-6, 6);
		var image = ROCK;
		var info = rockInfo;
		// new Rock = (x, y, vx, vy, angle, angleV, image, info);
		var rock = new Rock(x, y, vx, vy, angle, angleV, ROCK, rockInfo);
		rocks.push(rock);
	}
};
// handles object collision
var onCollide = function(group, thing){
	var collisions = 0;
	for (var i = 0; i < group.length; i++){
		if (group[i].collide(thing)){
			collisions += 1;
			group.splice(i, 1);
			thing.lifespan = 0;
			i--;
		}
	} 
	return collisions;
};

var groupsCollide = function(groupA, groupB) {
	for (var i = 0; i < groupA.length; i++){
		var collisions = onCollide(groupB, groupA[i]);
		SCORE += (collisions * 10);
	}
};

var updateGroupOnCollide = function (group) {
	for (var i = 0; i < group.length; i++) {
		if (group[i].update() === false) {
			group.splice(i, 1);
			i--;
		}
	}
};

var startGame = function(){
	STARTED = true;
	return STARTED;
};
var reset = function() {
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "18px 'Press Start 2P'";
	ctx.fillText('PRESS START TO PLAY', 250, 300);
	player.x = 400;
	player.y = 300;
	player.velocity = [0, 0];
	player.angle = 0;
	SCORE = 0;
	LIVES = 3;
	STARTED = false;
	GAMEOVER = false;
};


// keysDown is an object that holds an array of keyCodes to be referenced to move the ship
// It makes it much easier to account for two keyDown actions like left+up
var keysDown = {};
var checkTime = 0;

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	var currentTime = new Date();
	console.log(keysDown);
	switch(e.keyCode){
		case 37: case 39: case 38:  case 40: // arrow keys
		case 32: e.preventDefault(); break; // space
		default: break; // do not block other keys
	}
	if (e.keyCode == 32) {
		if ((currentTime.getTime() - checkTime) > 200){ //add time delay to prevent spamming
			player.shoot();
			checkTime = currentTime.getTime();
		}
	}
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Start and Reset Buttons
var startButton = document.createElement('input');
startButton.setAttribute('type', 'button');
startButton.setAttribute('name', 'start');
startButton.setAttribute('value', 'Start Game');
startButton.setAttribute('onClick', 'startGame()');


var restartButton = document.createElement('input');
restartButton.setAttribute('type', 'button');
restartButton.setAttribute('type', 'button');
restartButton.setAttribute('name', 'restart');
restartButton.setAttribute('value', 'Restart Game');
restartButton.setAttribute('onClick', 'reset()');
