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