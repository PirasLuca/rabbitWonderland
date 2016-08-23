"use strict";

/* Mouse handling functions (for internal use only, use the Mouse object to access the
   mouse status.
 */
function handleMouseMove(evt) {
    Mouse._position = new Vector2(evt.pageX, evt.pageY);
}

function handleMouseDown(evt) {
    handleMouseMove(evt);

    if (evt.which === 1) {
        if (!Mouse._left.down)
            Mouse._left.pressed = true;
        Mouse._left.down = true;
    } else if (evt.which === 2) {
        if (!Mouse._middle.down)
            Mouse._middle.pressed = true;
        Mouse._middle.down = true;
    } else if (evt.which === 3) {
        if (!Mouse._right.down)
            Mouse._right.pressed = true;
        Mouse._right.down = true;
    }
}

function handleMouseUp(evt) {
    handleMouseMove(evt);

    if (evt.which === 1)
        Mouse._left.down = false;
    else if (evt.which === 2)
        Mouse._middle.down = false;
    else if (evt.which === 3)
        Mouse._right.down = false;
}

function Mouse_Singleton() {
    this._position = Vector2.zero;
    this._left = new ButtonState();
    this._middle = new ButtonState();
    this._right = new ButtonState();
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

/* Returns the left mouse button state. */
Object.defineProperty(Mouse_Singleton.prototype, "left",
    {
        get: function () {
            return this._left;
        }
    });

/* Returns the middle mouse button state. */
Object.defineProperty(Mouse_Singleton.prototype, "middle",
    {
        get: function () {
            return this._middle;
        }
    });

/* Returns the right mouse button state. */
Object.defineProperty(Mouse_Singleton.prototype, "right",
    {
        get: function () {
            return this._right;
        }
    });

/* Returns the current mouse position. */
Object.defineProperty(Mouse_Singleton.prototype, "position",
    {
        get: function () {
            return this._position;
        }
    });

/* Resets the Mouse object (called automatically) */
Mouse_Singleton.prototype.reset = function () {
    this._left.pressed = false;
    this._middle.pressed = false;
    this._right.pressed = false;
};

/* Indicates whether the mouse is down and the mouse position falls within the bounds of a rectangle
   provided as a parameter.
 */
Mouse_Singleton.prototype.containsMouseDown = function (rect) {
    return this._left.down && rect.contains(this._position);
};

/* Indicates whether the mouse is pressed and the mouse position falls within the bounds of a rectangle
   provided as a parameter. This is particularly useful if you want to check if the player pressed a button
   (represented by a sprite).
 */
Mouse_Singleton.prototype.containsMousePress = function (rect) {
    return this._left.pressed && rect.contains(this._position);
};

/* The single Mouse instance. */
var Mouse = new Mouse_Singleton();