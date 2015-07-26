// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var GAMEOVER = false;
var SPACEBG = 'images/space-bg.jpg';
var SHIP = 'images/redship.png';
var ROCK = 'images/rock1.png'
var CANVAS = document.getElementsByClassName('canvas')
var CANVAS_WIDTH = CANVAS.width;
var CANVAS_HEIGHT = CANVAS.height;
var CANVAS_CENTER_X = CANVAS_WIDTH / 2;
var CANVAS_CENTER_Y = CANVAS_HEIGHT / 2;
var SHIP_SPEED = 10;
var SHIP_ANGLE = 100;
var VECTOR_X = 0;
var VECTOR_Y = 0;

// helper functions for velocity
var angleToVector = function(angle){
	VECTOR_X = Math.cos(angle);
	VECTOR_Y = Math.sin(angle);
	return [VECTOR_X, VECTOR_Y];
};


// set up basic gameObj as superclass
var gameObj = function(){
	this.sprite ='';
};

gameObj.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
	gameObj.call(this);
	this.sprite = SHIP;
	this.x = 200;
	this.y = 400;
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

var rock = new Rock(100, 100);

var player = new Player();

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