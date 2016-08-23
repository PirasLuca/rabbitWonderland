"use strict";

/* Constructor for creating a Sound object. For loading a sound, you have to provide the name of the sound file
   without the extension. Make sure that there are two files, one with a mp3 extension and one with a ogg
   extension. That way, sounds will work in most browsers. The second parameter is a Boolean indicating if
   the sound should loop or not. For example, you could use looping for background music.
 */
function Sound(sound, looping) {
    this.looping = typeof looping !== 'undefined' ? looping : false;
    this.snd = new Audio();
    if (this.snd.canPlayType("audio/ogg")) {
        this.snd.src = sound + ".ogg";
    } else if (this.snd.canPlayType("audio/mpeg")) {
        this.snd.src = sound + ".mp3";
    } else // we cannot play audio in this browser
        this.snd = null;
}

/* Property for getting/setting the volume by a value between 0 (no sound) and 1 (full volume). */
Object.defineProperty(Sound.prototype, "volume",
    {
        get: function () {
            return this.snd.volume;
        },
        set: function (value) {
            this.snd.volume = value;
        }
    });

/* Play the sound. */
Sound.prototype.play = function () {
    if (this.snd === null)
        return;
    this.snd.load();
    this.snd.autoplay = true;
    if (!this.looping)
        return;
    this.snd.addEventListener('ended', function () {
        this.load();
        this.autoplay = true;
    }, false);
};