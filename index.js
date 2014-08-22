(function (module) {
    "use strict"
    var extend = require('extend')
    var inherits = require('inherits')
    var EventEmitter = require('events').EventEmitter

        function Compass(game, opts) {
            this.game = game
            if (!game.isClient) {
                return
            }

            var options = extend({}, opts || {}, {
                threshold: 1,
                north: [0, 0, 1]
            })


            var angle = function (v) {
                return Math.atan2(v[0], v[2]) * 180 / Math.PI
            }

            var gameItem = {
                game: game,
                compass: this,
                lastAngle: 360000,
                threshold: options.threshold,
                angle: angle,
                northAngle: angle(options.north),
                
                tick: function () {
                    var cv = this.game.cameraVector()
                    var angle = (this.angle(cv) - this.northAngle) % 360
                    
                    if (Math.abs(angle - this.lastAngle) > this.threshold){
                        this.lastAngle = angle
                        this.compass.emit('compass-direction', angle)
                    }

                }
            }

            game.addItem(gameItem)
        }

    inherits(Compass, EventEmitter)

    var proto = Compass.prototype
    proto.enable = function () {}
    proto.disable = function () {}
    proto.bindEvents = function () {}
    proto.unbindEvents = function () {}


    module.exports = function (game, opts) {
        return new Compass(game, opts)
    }
    module.exports.pluginInfo = {
        loadAfter: [],
        clientOnly: true
    }
})(module)