'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file tech.js
 * @since 2.1.0
 */

var Html5 = videojs.getTech('Html5');

var WavesurferTech = function (_Html) {
    _inherits(WavesurferTech, _Html);

    /**
     * Create an instance of this Tech.
     *
     * @param {Object} [options]
     *        The key/value store of player options.
     *
     * @param {Component~ReadyCallback} ready
     *        Callback function to call when the `Flash` Tech is ready.
     */
    function WavesurferTech(options, ready) {
        _classCallCheck(this, WavesurferTech);

        // never allow for native text tracks, because this isn't actually
        // HTML5 audio. Native tracks fail because we are using wavesurfer
        options.nativeTextTracks = false;

        // we need the player instance so that we can access the current
        // wavesurfer plugin attached to that player
        var _this = _possibleConstructorReturn(this, (WavesurferTech.__proto__ || Object.getPrototypeOf(WavesurferTech)).call(this, options, ready));

        _this.activePlayer = videojs(options.playerId);
        _this.waveready = false;

        // track when wavesurfer is fully initialized (ready)
        _this.activePlayer.on('waveReady', function () {
            _this.waveready = true;
        });

        if (!_this.playerIsUsingWavesurfer()) {
            // the plugin hasn't been initialized for this player, so it
            // likely doesn't need our html5 tech modifications
            return _possibleConstructorReturn(_this);
        }

        // proxy timeupdate events so that the tech emits them too. This will
        // allow the rest of videoJS to work (including text tracks)
        _this.activePlayer.activeWavesurferPlugin.on('timeupdate', function () {
            _this.trigger('timeupdate');
        });
        return _this;
    }

    /**
     * Determine whether or not the player is trying use wavesurfer
     * @returns {boolean}
     */


    _createClass(WavesurferTech, [{
        key: 'playerIsUsingWavesurfer',
        value: function playerIsUsingWavesurfer() {
            return this.activePlayer.activeWavesurferPlugin !== undefined;
        }
    }, {
        key: 'play',
        value: function play() {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'play', this).call(this);
            }

            return this.activePlayer.activeWavesurferPlugin.play();
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (!this.playerIsUsingWavesurfer()) {
                //fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'pause', this).call(this);
            }

            return this.activePlayer.activeWavesurferPlugin.pause();
        }

        /**
         * Get the current time
         * @return {number}
         */

    }, {
        key: 'currentTime',
        value: function currentTime() {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'currentTime', this).call(this);
            }

            if (!this.waveready) {
                return 0;
            }

            return this.activePlayer.activeWavesurferPlugin.getCurrentTime();
        }

        /**
         * Get the current duration
         *
         * @return {number}
         *         The duration of the media or 0 if there is no duration.
         */

    }, {
        key: 'duration',
        value: function duration() {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'duration', this).call(this);
            }

            if (!this.waveready) {
                return 0;
            }

            return this.activePlayer.activeWavesurferPlugin.getDuration();
        }
    }]);

    return WavesurferTech;
}(Html5);

WavesurferTech.isSupported = function () {
    return true;
};

exports.default = WavesurferTech;
