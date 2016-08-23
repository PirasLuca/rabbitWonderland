"use strict";

/* Constructs a two-dimensional vector. */
function Vector2(x, y) {
    this.x = typeof x !== 'undefined' ? x : 0;
    this.y = typeof y !== 'undefined' ? y : 0;
}

/* Property that returns a vector with length 0. */
Object.defineProperty(Vector2, "zero",
    {
        get: function () {
            return new Vector2();
        }
    });

/* Calculates the length of a vector. */
Object.defineProperty(Vector2.prototype, "length",
    {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    });

/* Adds another vector or number to this vector. */
Vector2.prototype.addTo = function (v) {
    if (v.constructor === Vector2) {
        this.x += v.x;
        this.y += v.y;
    }
    else if (v.constructor === Number) {
        this.x += v;
        this.y += v;
    }
    return this;
};

/* Returns a new vector that is the sum of this vector and the vector or number passed as a parameter. */
Vector2.prototype.add = function (v) {
    var result = this.copy();
    return result.addTo(v);
};

/* Subtracts a vector or number passed as parameter from this vector. */
Vector2.prototype.subtractFrom = function (v) {
    if (v.constructor === Vector2) {
        this.x -= v.x;
        this.y -= v.y;
    }
    else if (v.constructor === Number) {
        this.x -= v;
        this.y -= v;
    }
    return this;
};

/* Returns a new vector that is this - v. */
Vector2.prototype.subtract = function (v) {
    var result = this.copy();
    return result.subtractFrom(v);
};

/* Divides this vector by v, which can be either a number or a vector. */
Vector2.prototype.divideBy = function (v) {
    if (v.constructor === Vector2) {
        this.x /= v.x;
        this.y /= v.y;
    }
    else if (v.constructor === Number) {
        this.x /= v;
        this.y /= v;
    }
    return this;
};

/* Returns a new vector that is this/v (v can be a number or a vector). */
Vector2.prototype.divide = function (v) {
    var result = this.copy();
    return result.divideBy(v);
};

/* Multiplies this vector with v, which can be either a number or a vector. */
Vector2.prototype.multiplyWith = function (v) {
    if (v.constructor === Vector2) {
        this.x *= v.x;
        this.y *= v.y;
    }
    else if (v.constructor === Number) {
        this.x *= v;
        this.y *= v;
    }
    return this;
};

/* Returns a new vector that is this*v (v can be a number or a vector). */
Vector2.prototype.multiply = function (v) {
    var result = this.copy();
    return result.multiplyWith(v);
};

/* Returns a string representation of this vector (useful for debugging). */
Vector2.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
};

/* Makes a copy of this vector. */
Vector2.prototype.copy = function () {
    return new Vector2(this.x, this.y);
};

/* Indicates whether this vector is equal to another vector. */
Vector2.prototype.equals = function (obj) {
    return this.x === obj.x && this.y === obj.y;
};