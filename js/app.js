// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var SPACEBG = 'images/space-bg.jpg';


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

	}else if(this.downKey === 'right'){

	}else if(this.downKey === 'up'){

	}else if(this.downKey === 'down'){

	}
	this.downKey = null;
};

var player = new Player();

// downKey Listener provided by Udacity
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});