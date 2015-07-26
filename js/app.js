// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var GAMEOVER = false;
var SPACEBG = 'images/space-bg.jpg';
var SHIP = 'images/redship.png';
var SHIPINFO = new ImageInfo(49.5, 37.5, 99, 75, 10);
var CANVAS = document.getElementsByClassName('canvas')
var CANVAS_WIDTH = CANVAS.width;
var CANVAS_HEIGHT = CANVAS.height;
var CANVAS_CENTER_X = CANVAS_WIDTH / 2;
var CANVAS_CENTER_Y = CANVAS_HEIGHT / 2;
var SHIP_SPEED = 5;
var SHIP_ANGLE = 100;
var VECTOR_X = 0;
var VECTOR_Y = 0;

// helper functions for velocity
var angleToVector = function(angle){
	VECTOR_X = Math.cos(angle);
	VECTOR_Y = Math.sin(angle);
	return [VECTOR_X, VECTOR_Y];
};

// Class to create and reference information for every image that's used
function ImageInfo(xCenter, yCenter, width, height, radius){
	this.xCenter = xCenter;
	this.yCenter = yCenter;
	this.width = width;
	this.height = height;
	this.radius = radius;
};

// set up basic gameObj as superclass
var gameObj = function(){
	this.sprite ='';
	this.x = 0;
	this.y = 0;
	this.x_vel = 0;
	this.y_vel = 0;
	this.angle = 0;
	this.radius = 0;
	this.image_center_x = 0;
	this.image_center_y = 0;
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
	if (this.downKey === 'left'){
		this.x -= 10; 
	}else if(this.downKey === 'right'){
		this.x += 10;
	}else if(this.downKey === 'up'){
		this.y -= 10;
	}else if(this.downKey === 'down'){
		this.y += 10;
	}
	this.downKey = null;
};
Player.prototype.handleInput = function(e){
	this.downKey = e;
	this.upKey = e;
}

var player = new Player();

// downKey Listener provided by Udacity, need both keydown and keyup
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});