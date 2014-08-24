require('voxel-land')
require('voxel-compass')
var createGame = require('voxel-engine');

var game = createGame({
    require: require,
    generateChunks: false,
    useAtlas: true,
    worldOrigin: [0, 0, 0],
    pluginOpts: {
        'voxel-registry': {},
        'voxel-stitch': {},
        'voxel-shader': {cameraFOV: 45},
        'voxel-mesher': {},
        'game-shell-fps-camera': {},
        'voxel-land': {},
        'voxel-compass': {element: document.getElementById('compass')}
    }
})