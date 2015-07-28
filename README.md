# project-asteroids
HTML5 clone of classic arcade game Asteroids using game engines courtesy of Udacity
I did a version previously in Python, thought it would be fun to port it over.

## TO DO LIST:

~~ - Initialize README.md ~~
~~ - Render background image ~~
~~ - Build general gameObj Object ~~
	- ~~ Build Player Object ~~
	- ~~Build Asteroids Object ~~
	- ~~ Build Missile Object ~~

###Player
~~ - Render spaceship ~~
- Implement movement controls
	- Ship should move..like a ship..not like a rook
	- Space has no friction...so let's try and simulate that!
	- Ship should be able to wrap around the screen

### Missiles
- Implement missile functionality
	- Can have multiple missiles, we should have an array of these objects
	- Missiles should expire
	- Missiles should blow up asteroids
	- Missiles should wrap around the screen
	- Missiles should come from the tip of the ship

###Asteroids
~~ - Render One Asteroid ~~
~~	- Render multiple asteroids ~~
~~ - Asteroids should have random momentum/movement ~~
	- Asteroids should also be able to wrap around the screen
	~~ - Asteroids should SPIN...this is hard ~~
-Option: Asteroids should be able to split into smaller asteroids

#### Collision (probably last to do..)
- must handle collision between ship and rock, rock and missiles...

###Menu
- able to start game when player ready
- able to choose a space ship
- able to restart game
- pause functionality

###Score and Life system
- Keep track of score based on number of asteroids destroyed
- When lives < 0; game-over


## Initialization

To play the game download the zip file or clone my [repo](github.com/shui91/project-asteroids) and initialize the project at index.html.

-- Features to be implemented --
Press space to begin, r to restart.

Use the arrow keys to move the space shuttle, and the space bar to shoot.

Avoid the asteroids and build up your high score!

## Features

A working HTML5 clone of the classic arcade game Asteroids. 

## Attributions

Thank you to Udacity for providing engine.js and resource.js.
The original source code can be found at [frontend-nanodegree-arcade-game](github.com/udacity/frontend-nanodegree-arcade-game)

Art and sound work provided by Kenney.nl for his [SpaceShooterRedux](http://opengameart.org/content/space-shooter-redux) artpack

## Contribute
Please feel free to contribute and build off of this. Also, let me know of any issues!

- issues: github.com/shui91/project-asteroids/issues
- source: github.com/shui91/project-asteroids

## License

This project is licensed under the MIT License

