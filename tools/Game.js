"use strict";

/* Uncomment the part below if your browser doesn't have a requestAnimationFrame method. */
/*var requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();*/

/* The main class responsible for starting, initializing and running the game. */
function Game_Singleton() {
    console.log("Creating game");
    this.size = null;
    this._spritesStillLoading = 0;
    this.gameWorld = null;
}

/* Starting the game. */
Game_Singleton.prototype.start = function (canvasName, x, y) {
    console.log("Starting the game")
    this.size = new Vector2(x, y);

    Canvas2D.initialize(canvasName);
    console.log("Canvas initialized")
    this.loadAssets();
    this.assetLoadingLoop();
    console.log("'");
};

/* Method called when initializing the game (should be replaced by a custom method in your game). */
Game_Singleton.prototype.initialize = function () {
};

/* Method called when assets such as sprites and sound should be loaded (replace by your custom method). */
Game_Singleton.prototype.loadAssets = function () {
};

/* Loads a sound. For loading a sound, you have to provide the name of the sound file
   without the extension. Make sure that there are two files, one with a mp3 extension and one with a ogg
   extension. That way, sounds will work in most browsers.
 */
Game_Singleton.prototype.loadSound = function (sound, looping) {
    return new Sound(sound, looping);
};

/* Loads a sprite, but note that this is done asynchronously, so you should only call this method in the
   loadAssets method.
 */
Game_Singleton.prototype.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    this._spritesStillLoading += 1;
    image.onload = function () {
        Game._spritesStillLoading -= 1;
    };
    return image;
};

/* Loop for loading assets */
Game_Singleton.prototype.assetLoadingLoop = function () {
    if (!this._spritesStillLoading > 0)
        requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.initialize();
        requestAnimationFrame(Game.mainLoop);
    }
};

/* The main game loop. */
Game_Singleton.prototype.mainLoop = function () {
    var delta = 1 / 60;
    Game.gameWorld.handleInput();
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();
    Keyboard.reset();
    Mouse.reset();
    requestAnimationFrame(Game.mainLoop);
};

/* The single game instance. */
var Game = new Game_Singleton();

