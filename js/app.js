// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var SPACEBG = 'images/space-bg.jpg';


// set up basic gameObj as superclass
var gameObj = function(){
	this.sprite ='';
}

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

var player = new Player();