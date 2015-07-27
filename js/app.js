// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var GAMEOVER = false;

var CANVAS = document.getElementsByClassName('canvas')

var FPS = 60;
var SHIP_SPEED = 10;
var SHIP_ANGLE = 100;
var VECTOR_X = 0;
var VECTOR_Y = 0;

var SPACEBG = 'images/space-oj.jpg';
var spacebgIMG = new Image();
var spaceInfo = new ImageInfo(400, 300, 800, 600);

var SHIP = 'images/redship.png';
var shipIMG = new Image();
var shipInfo = new ImageInfo(49.5, 37.5, 99, 75, 62, false);

var ROCK = 'images/rock1.png';
var rockIMG = new Image();
var rockInfo = new ImageInfo(50.5, 42, 101, 84, 66, -1);

var DEBRIS = 'images/debris.png';

// helper functions for velocity
var angleToVector = function(angle){
	VECTOR_X = Math.cos(angle);
	VECTOR_Y = Math.sin(angle);
	return [VECTOR_X, VECTOR_Y];
};


function ImageInfo(xCenter, yCenter, width, height, radius, lifespan, animated) {
  this.xCenter = xCenter;
  this.yCenter = yCenter;
  this.width = width;
  this.height = height;
  this.radius = radius;
  this.lifespan = lifespan;
  this.animated = animated;
};

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
};

gameObj.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(vx, vy, angle, angleV, image, info) {
	gameObj.call(this);
	this.sprite = SHIP;
	this.x = 200;
	this.y = 400;
	this.imageCenterX = info.xCenter;
	this.imageCenterY = info.yCenter;
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
	if (37 in keysDown){
		this.x -= SHIP_SPEED; 
	}else if(39 in keysDown){
		this.x += SHIP_SPEED;
	}else if(38 in keysDown){
		this.y -= SHIP_SPEED;
	}else if(40 in keysDown){
		this.y += SHIP_SPEED;
	}
};

// Rock class
var Rock = function(x, y){
	gameObj.call(this);
	this.sprite = ROCK;
	this.x = x;
	this.y = y;
}

Rock.prototype = Object.create(gameObj.prototype);
Rock.prototype.constructor = Rock;

var rock = new Rock(400, 250);

var player = new Player(0, 0, 0, 0, shipIMG, shipInfo);

var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
  switch(e.keyCode){
    case 37: case 39: case 38:  case 40: // arrow keys
    case 32: e.preventDefault(); break; // space
    default: break; // do not block other keys
  }
  if (e.keyCode == 32) {
    null; // Space key to shoot
  }
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);