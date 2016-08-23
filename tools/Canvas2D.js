"use strict";

/* The Canvas2D class is responsible for drawing sprites and text. */
function Canvas2D_Singleton() {
    console.log("Creating Canvas2D object");
    this._canvas = null;
    this._canvasContext = null;
}

/* Initializing the canvas. */
Canvas2D_Singleton.prototype.initialize = function (canvasName) {
    this._canvas = document.getElementById(canvasName);

    if (this._canvas.getContext)
        this._canvasContext = this._canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible.!');
    }
};

/* Clear the canvas so you can draw on it again. */
Canvas2D_Singleton.prototype.clear = function () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

/* Draw an image on the canvas. */
Canvas2D_Singleton.prototype.drawImage = function (sprite, position, origin, rotation, scale) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        sprite.width, sprite.height * scale);
    this._canvasContext.restore();
};

/* Draw text on the canvas. */
Canvas2D_Singleton.prototype.drawText = function (text, position, color, textAlign, fontname, fontsize) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    color = typeof color !== 'undefined' ? color : Color.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
};

var Canvas2D = new Canvas2D_Singleton();