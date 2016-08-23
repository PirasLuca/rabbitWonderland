"use strict";

/* Constructs a Rectangle object with a position (x, y) and a width (w) and height (h) in pixels. */
function Rectangle(x, y, w, h) {
    this.x = typeof x !== 'undefined' ? x : 0;
    this.y = typeof y !== 'undefined' ? y : 0;
    this.width = typeof w !== 'undefined' ? w : 1;
    this.height = typeof h !== 'undefined' ? h : 1;
}

/* Returns the left x interval position. */
Object.defineProperty(Rectangle.prototype, "left",
    {
        get: function () {
            return this.x;
        }
    });

/* Returns the right x interval position. */
Object.defineProperty(Rectangle.prototype, "right",
    {
        get: function () {
            return this.x + this.width;
        }
    });

/* Returns the top y interval position. */
Object.defineProperty(Rectangle.prototype, "top",
    {
        get: function () {
            return this.y;
        }
    });

/* Returns the bottom y interval position. */
Object.defineProperty(Rectangle.prototype, "bottom",
    {
        get: function () {
            return this.y + this.height;
        }
    });

/* Returns the center position of the rectangle as a Vector2 object. */
Object.defineProperty(Rectangle.prototype, "center",
    {
        get: function () {
            return this.position.addTo(this.size.divideBy(2));
        }
    });

/* Returns the position (x, y) of the rectangle as a Vector2 object. */
Object.defineProperty(Rectangle.prototype, "position",
    {
        get: function () {
            return new Vector2(this.x, this.y);
        }
    });

/* Returns the size (w, h) of the rectangle as a Vector2 object. */
Object.defineProperty(Rectangle.prototype, "size",
    {
        get: function () {
            return new Vector2(this.width, this.height);
        }
    });

/* Indicates whether a point (Vector2) is within the rectangle. */
Rectangle.prototype.contains = function (v) {
    v = typeof v !== 'undefined' ? v : new Vector2();
    return (v.x >= this.left && v.x <= this.right &&
        v.y >= this.top && v.y <= this.bottom);
};

/* Indicates whether this rectangle intersects with a given rectangle. */
Rectangle.prototype.intersects = function (rect) {
    return (this.left <= rect.right && this.right >= rect.left &&
        this.top <= rect.bottom && this.bottom >= rect.top);
};

/* Draws this rectangle on the screen (useful for debugging). */
Rectangle.prototype.draw = function () {
    Canvas2D.drawRectangle(this.x, this.y, this.width, this.height);
};