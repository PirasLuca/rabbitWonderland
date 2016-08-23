"use strict";

/* This variable will contain all the sprites used in the game. */
var sprites = {};

/* All sprite loading should be done in this function. The function is automatically called in the game engine. */
Game.loadAssets = function () {
    sprites.background = Game.loadSprite("assets/spr_background.png");
    sprites.cannon = Game.loadSprite("assets/spr_cannon_barrel.png");
    sprites.ball = Game.loadSprite("assets/spr_ball.png");
    sprites.ufo = Game.loadSprite("assets/spr_ufo.png");
    sprites.crash = Game.loadSprite("assets/crash.jpg");
};

/* Here we create the game world. In this example, a separate class (called GameWorld) is used for that. */
Game.initialize = function () {
    Game.gameWorld = new GameWorld();
};

// ==================================================================================

/* GameObject is a class for representing a simple object in a game. This is basically a sprite with a
   position, orientation, origin, and velocity. The object can optionally be visible.
 */
function GameObject() {
    this.sprite = undefined;
    this.position = Vector2.zero;
    this.origin = Vector2.zero;
    this.rotation = 0;
    this.visible = true;
};

/* A property that gives the bounding box of the game object. Useful for collision handling. */
Object.defineProperty(GameObject.prototype, "box",
    {
        get: function () {
            var leftTop = this.position.subtract(this.origin);
            return new Rectangle(leftTop.x, leftTop.y, this.sprite.width, this.sprite.height);
        }
    });

/* This method draws the object on the screen. It's called automatically by the game engine. */
GameObject.prototype.draw = function () {
    if (this.visible)
        Canvas2D.drawImage(this.sprite, this.position, this.origin, this.rotation);
};

// ==================================================================================

/* The Cannon class is a subclass of GameObject. It represents a cannon that follows the mouse
   pointer in the y direction.
 */
function Cannon() {
    GameObject.call(this);
    this.sprite = sprites.cannon;
    this.origin = new Vector2(0, 34);
}

Cannon.prototype = Object.create(GameObject.prototype); // needed for proper inheritance in JavaScript

Cannon.prototype.handleInput = function () {
    this.position.y = Mouse.position.y
};

// ==================================================================================

/* The Ball class (also a subclass of GameObject) represents the ball that is shot at the moving ufo. */
function Ball() {
    GameObject.call(this);
    this.sprite = sprites.ball;
    this.origin = new Vector2(11, 11);
    this.visible = false;
}

Ball.prototype = Object.create(GameObject.prototype); // needed for proper inheritance in JavaScript

/* Input handling: if the player presses the left mouse button, the ball gets a velocity and becomes visible. */
Ball.prototype.handleInput = function () {
    if (Mouse.left.pressed && !this.visible) {
        this.visible = true;
        this.velocity = new Vector2(500, 0)
    }
};

/* Updating the ball. */
Ball.prototype.update = function (delta) {
    if (this.visible) {
        // if the ball is visible, simply add the velocity to the current position
        this.position.x += this.velocity.x * delta;
    }
    else {
        // otherwise, simply set ball position at the cannon position.
        this.position.x = 100;
        this.position.y = Game.gameWorld.cannon.position.y;
    }
    if (this.position.x > Game.size.x) {
        // if the ball flies outside of the screen, make it invisible and subtract points
        // for not touching the ufo
        this.visible = false;
        Game.gameWorld.score -= 10;
    }
};

// ==================================================================================

/* The Ufo class represents the moving ufo in the game. */
function Ufo() {
    GameObject.call(this);
    this.sprite = sprites.ufo;
    this.timePassed = 0;
    this.setRandomPosition();
}

function Crash() {
    GameObject.call(this);
    this.sprite = sprites.crash;
    this.timePassed = 0;
    this.setRandomPosition();
}

Ufo.prototype = Object.create(GameObject.prototype); // needed for proper inheritance in JavaScript
Crash.prototype = Object.create(GameObject.prototype); // needed for proper inheritance in JavaScript

/* Updating the ufo. */
Ufo.prototype.update = function (delta) {
    // increase the timer (timePassed)
    this.timePassed += delta;
    if (this.timePassed > 2) {
        // after two seconds, set a new random position and reset the timer
        this.setRandomPosition();
        this.timePassed = 0;
    }
    if (this.box.intersects(Game.gameWorld.ball.box)) {
        // if the ball collides with the ufo, reset the ball and the ufo and add
        // points to the score
        this.setRandomPosition();
        this.timePassed = 0;
        Game.gameWorld.score += 10;
        Game.gameWorld.ball.visible = false;
    }
};

/* Sets the ufo at a random position. */
Ufo.prototype.setRandomPosition = function () {
    this.position.x = Math.random() * (Game.size.x - 200 - this.sprite.width) + 200;
    this.position.y = Math.random() * (Game.size.y - this.sprite.height);
};

Crash.prototype.setRandomPosition = function () {
    this.position.x = Math.random() * (Game.size.x - 200 - this.sprite.width) + 200;
    this.position.y = Math.random() * (Game.size.y - this.sprite.height);
};

// ==================================================================================

/* The GameWorld class aggregates all the game object in the world, in this case the cannon,
   the ball and the ufo. It also contains a variable representing the current score.
 */
function GameWorld() {
    this.cannon = new Cannon();
    this.ball = new Ball();
    this.ufo = new Ufo();
    this.crash = new Crash();
    this.score = 0;
}

/* Let each object handle their own input. */
GameWorld.prototype.handleInput = function () {
    this.cannon.handleInput();
    this.ball.handleInput();
};

/* Let each object update itself. */
GameWorld.prototype.update = function (delta) {
    this.ball.update(delta);
    this.ufo.update(delta);
};

/* Drawing everything on the screen in the right order. */
GameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background);
    this.ball.draw();
    this.cannon.draw();
    this.ufo.draw();
    this.crash.draw();
    Canvas2D.drawText("Score: " + this.score, new Vector2(20, 22), Color.white);
};