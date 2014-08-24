# voxel-compass

Compass for voxeljs based games. See demo at http://jlarsson.github.io/voxel-compass/.

## Install
```nmp install voxel-compass```

## Usage
```
var createGame = require('voxel-engine')
require('voxel-compass')
var game = createGame({
  require: require,
  pluginOpts: {
    'voxel-compass': <options>
  }
})
```
*Please refer to https://github.com/maxogden/voxel-engine for how to create a game. At the time of writing this, stuff where in kind of an unstable state...*


## Events

Listen to events with 
```
var compass = game.plugins.get('voxel-compass')
compass.on('compass-direction', function (degrees) {})
```

## Options
Options defaults to
```
{
  threshold: 1,
  north: [0,0,1]
  element: undefined
}
```

### threshold
A value in degrees that represents the minimal change in view direction that will trigger a ```compass-direction``` event.

### north
Vector that represents direction to the nortpole in game coordinates.

### element
If set (as DOM element or id of DOM element), the element will be rotated using CSS transformations.
**Only tested in Chrome.**
