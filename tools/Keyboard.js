"use strict";

/* Keyboard handling functions (for internal use only, use the Keyboard object to access the
   keyboard status.
 */
function handleKeyDown(evt) {
    var code = evt.keyCode;
    if (code < 0 || code > 255)
        return;
    if (!Keyboard._keyStates[code].down)
        Keyboard._keyStates[code].pressed = true;
    Keyboard._keyStates[code].down = true;
}

function handleKeyUp(evt) {
    var code = evt.keyCode;
    if (code < 0 || code > 255)
        return;
    Keyboard._keyStates[code].down = false;
}

function Keyboard_Singleton() {
    this._keyStates = [];
    for (var i = 0; i < 256; ++i)
        this._keyStates.push(new ButtonState());
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}

/* Resets the Keyboard object (called automatically) */
Keyboard_Singleton.prototype.reset = function () {
    for (var i = 0; i < 256; ++i)
        this._keyStates[i].pressed = false;
};

/* Checks if a key has been pressed. (this is true only the first time the game
   loop is executed after the player presses the button).
 */
Keyboard_Singleton.prototype.pressed = function (key) {
    return this._keyStates[key].pressed;
};

/* Checks if a given key is currently down. */
Keyboard_Singleton.prototype.down = function (key) {
    return this._keyStates[key].down;
};

/* The single Keyboard instance. */
var Keyboard = new Keyboard_Singleton();