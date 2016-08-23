"use strict";

/* This is a very basic class for representing a button state. A button has a 'down' state and
   a state that indicates if it has been pressed (this is true only the first time the game
   loop is executed after the player presses the button).
 */
function ButtonState() {
    this.down = false;
    this.pressed = false;
}