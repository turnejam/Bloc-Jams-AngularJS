(function() {
  function SongPlayer() {
    var SongPlayer = {};

/**
*@desc currently playing song
*@type {Object}
*/
    var currentSong = null;
/**
* @desc Buzz object audio file
* @type {Object}
*/
    var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
    var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentSong = song;
 };

 /**
 * @function playSong
 * @desc Plays audio file at currentBuzzObject and sets song's playing attribute to true
 * @param {Object} song
 */
    var playSong = function(song){
        currentBuzzObject.play();
        song.playing = true;
        }

/**
* @method SongPlayer.play
* @desc runs the setSong and playSong functions on a new song or paused song.
* @param {Object} song
*/
    SongPlayer.play = function(song){
      if (currentSong !== song) {
      setSong(song);
      playSong(song);
      } else if (currentSong === song){
        if (currentBuzzObject.isPaused()){
          playSong(song);
        }
      }
    };

/**
* @method SongPlayer.pause
* @desc Pauses a currently playing audio file and sets corresponding song's playing attribute to false.
* @param {Object} song
*/
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };
  return SongPlayer;
}



angular
.module('blocJams')
.factory('SongPlayer', SongPlayer);
})();
