var test = require('tape')


test('nothing should happen when game.isClient is falsy', function (t) {
    t.plan(1)
    
    var fakeGame = {
        isClient: false
    }
    
    require('./index.js')(fakeGame)
    
    t.ok(true);
})

test('compass adds to game.addItem', function (t){
    t.plan(1)
    var addItemCallCount = 0;
    var fakeGame = {
        isClient: true,
        addItem: function (){ ++ addItemCallCount }
    }
    
    require('./index.js')(fakeGame)
    
    t.equals(addItemCallCount,1)
});

test('compass emits compass-direction', function (t){
    t.plan(2)
    
    var north = [0,0,1]
    var cameraVector = north
    var compassItem
    var emittedAngle = null
    var fakeGame = {
        isClient: true,
        addItem: function (item){ compassItem = item  },
        cameraVector: function () { return cameraVector }
    }
    require('./index.js')(fakeGame, {north: north})
        .on('compass-direction', function (angle) {
            console.log('compass-direction: %s', angle)
            emittedAngle = angle;
        })
    
    // no change in direction
    compassItem.tick()
    t.equals(emittedAngle, 0)

    // rotate
    cameraVector = [1,0,0]
    compassItem.tick()
    t.equals(emittedAngle, 90)
})