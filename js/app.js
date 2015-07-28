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

var WIDTH = 800;
var HEIGHT = 600;

var SPACEBG = 'images/space-oj.jpg';
var spaceInfo = new ImageInfo(400, 300, 800, 600);

var SHIP = 'images/redship.png';
var shipInfo = new ImageInfo(49.5, 37.5, 99, 75, 62, false);

var ROCK = 'images/rock1.png';
var rockInfo = new ImageInfo(50.5, 42, 101, 84, 66);

var DEBRIS = 'images/debris.png';

// use this to multiply an object to radians
var TORADIANS = Math.PI/180;

// helper functions for velocity
var angleToVector = function(angle){
	VECTOR_X = Math.cos(angle);
	VECTOR_Y = Math.sin(angle);
	return [VECTOR_X, VECTOR_Y];
};


function ImageInfo(centerX, centerY, width, height, radius) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.width = width;
  this.height = height;
  this.radius = radius;
};

window.ImageInfo = ImageInfo();

// set up basic gameObj as superclass
var gameObj = function(x, y, vx, vy, angle, angleV, image, info){
	this.sprite ='';
	this.x = 200;
	this.y = 400;
	this.vx = vx;
	this.vy = vy;
	this.angle = angle;
	this.angleV = angleV;
	this.imageCenterX = null;
	this.imageCenterY = null;
	this.radius = null;
	this.animated = null;
};

gameObj.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
gameObj.prototype.drawRotatedImage = function(img, x, y, angle){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(angle * TORADIANS);
	ctx.drawImage(this.img, -(this.img.width/2), -(this.img.height/2));
	ctx.restore();
}

var Player = function(vx, vy, angle, angleV, image, info) {
	gameObj.call(this);
	this.sprite = SHIP;
	this.x = 200;
	this.y = 400;
	this.imageCenterX = info.centerX;
	this.imageCenterY = info.centerY;
	this.radius = info.radius;
	// this.draw = function() {
	// 	ctx.save();
	// }
	console.log(this.imageCenterX);
};

Player.prototype = Object.create(gameObj.prototype);
Player.prototype.constructor = Player;

// For every downKey, the Player will move accordingly
Player.prototype.update = function(dt){
	if (37 in keysDown){ // left
		this.x -= SHIP_SPEED; 
	}else if(39 in keysDown){ // right
		this.x += SHIP_SPEED;
	}else if(38 in keysDown){ // up
		this.y -= SHIP_SPEED;
	}else if(40 in keysDown){ // down
		this.y += SHIP_SPEED;
	}

};

// Rock class
var Rock = function(x, y, vx, vy, angle, angleV, image, info){
	gameObj.call(this);
	this.sprite = ROCK;
	this.x = x;
	this.y = y;
	this.imageCenterX = info.centerX;
	this.imageCenterY = info.centerY;
	this.radius = info.radius;
};

Rock.prototype = Object.create(gameObj.prototype);
Rock.prototype.constructor = Rock;
Rock.prototype.draw = function(rockX, rockY, rockXVEL, rockYVEL, angle, rockAngleVel, ROCK, rockInfo) {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle);
	ctx.drawImage(Resources.get(ROCK), 0 ,0, rockInfo.width, rockInfo.height, -rockInfo.centerX, -rockInfo.centerY, rockInfo.width, rockInfo.height);
	ctx.restore();
};

// Helper Function to make rocks
// array of rocks to be rendered
var rocks = [];

// make individual rocks to be pushed to rocks array
var rock_maker = function(){
	if (rocks.length < 12){
		var rockX = Math.random() * WIDTH;
		var rockY = Math.random() * HEIGHT;
		var rockXVEL = Math.random() * 100; // ensure velocities and angles are always random :)
		var rockYVEL = Math.random() * 100;
		var rockAngleVel = (Math.random() * 5)/(Math.random() < 0.5) * 4;
		// new Rock = (x, y, vx, vy, angle, angleVel, image, info);
		var singleRock = new Rock(rockX, rockY, rockXVEL, rockYVEL, 0, rockAngleVel, ROCK, rockInfo)
		rocks.push(singleRock);
	}
};


// make new Player at default x, y position that's in Player
var player = new Player(0, 0, 0, 0, SHIP, shipInfo);

// keysDown is an object that holds an array of keyCodes to be referenced to move the ship
// It makes it much easier to account for two keyDown actions like left+up
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
  console.log(keysDown);
  switch(e.keyCode){
    case 37: case 39: case 38:  case 40: // arrow keys
    case 32: e.preventDefault(); break; // space
    default: break; // do not block other keys
  }
  if (e.keyCode == 32) {
    null; // Space key to shoot nothing here yet
  }
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);