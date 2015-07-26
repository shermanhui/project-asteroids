// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var SPACEBG = 'images/space-bg.jpg';
var CANVAS = document.getElementsByClassName('canvas')
var CANVAS_WIDTH = CANVAS.width;
var CANVAS_HEIGHT = CANVAS.height;
var CANVAS_CENTER_X = CANVAS_WIDTH / 2;
var CANVAS_CENTER_Y = CANVAS_HEIGHT / 2;


// set up basic gameObj as superclass
var gameObj = function(){
	this.sprite ='';
};

gameObj.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
	gameObj.call(this);
	this.sprite = 'images/redship.png';
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
}

var player = new Player();

// downKey Listener provided by Udacity, replaced keyup with keydown 
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});