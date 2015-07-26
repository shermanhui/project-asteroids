// global variables
var SCORE = 0;
var LIVES = 3; 
var STARTED = false; // initial game state?
var SPACEBG = 'images/space-bg.jpg';


// set up basic gameObj as superclass
var gameObj = function(){
	this.sprite ='';
}