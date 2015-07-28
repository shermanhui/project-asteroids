/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        time = 0,
        time2 = 540,
        lastTime;

    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = "1px solid";
    canvas.setAttribute('id', 'canvas');
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        // allEnemies.forEach(function(enemy) {
        //     enemy.update(dt);
        // });
        player.update();
        rocks.forEach(function(rock){
            rock.update(dt);
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        // Draw background
        ctx.drawImage(Resources.get(SPACEBG), 0, 0);

        // time element paces the movement of the background
        // moving background math ported from my python version of asteroids 
        // http://www.codeskulptor.org/#user39_tlhzYVXuHl_17.py on line 299
        time+=0.5; //increase the tick 
        time2+=0.5; // second timer for second round of debris because the image isn't large enough
        // wtime and wtime2 are used to simulate a scrolling down effect as time and time2 tick on
        // we modulo divide with twice the debris width to loop it so we have a changing dy 
        wtime = time % 900 ; 
        wtime2 = time2 % 960;

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        // dWidth and dHeight are to specify the scaled image resolution (can't run without it)
        ctx.drawImage(Resources.get(DEBRIS), 0, 0, 640, 480, 30, wtime - 380, 640, 480);
        ctx.drawImage(Resources.get(DEBRIS), 0, 0, 640, 480, 30, wtime2 - 400, 640, 480);

        //drawImageRot(ROCK, 250, 250, 101, 84, 360);
        // Draw every gameobj like asteroids
        renderEntities();

    }
    setInterval(rock_maker, 1200); // put outside of render because render spawns all rocks at once..

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        rocks.forEach(function(rock) {
            rock.render();
        });
        player.render();


        
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // game state changes SHOULD GO HERE... 
        // Something like the below? Bind reset onto a button to activate onclick
        // SCORE = 0;
        // LIVES = 3;
        // STARTED = false;
        // GAMEOVER = false;
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/space-bg.jpg',
        'images/space-oj.jpg',
        'images/redship.png',
        'images/rock1.png',
        'images/debris.png'
        // 'images/stone-block.png',
        // 'images/water-block.png',
        // 'images/grass-block.png',
        // 'images/enemy-bug.png',
        // 'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);