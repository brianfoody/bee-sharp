angular.module('bee-sharp').service('ImpulseService', function($interval, WindowHeight, WindowWidth) {
    this.screenBoundry = function() {
        var height = WindowHeight/19;
        var width = WindowWidth-50;
        return Impulse.Boundry({
            top: 0,
            left: 0,
            bottom: WindowHeight,
            right: WindowWidth
        });
    };

    this.exactPosition = function(impulseItem) {
        var boundry = impulseItem.els[0].getBoundingClientRect();
        return {x: boundry.left, y: boundry.top};
    };

    this.distanceFrom = function(item1, item2) {
        var item1Loc = this.exactPosition(item1);
        var item2Loc = this.exactPosition(item2);
        var vector = new Impulse.Vector(item1Loc.x - item2Loc.x, item1Loc.y - item2Loc.y);
        return vector.norm();
    };

    this.moveRandomnly = function(item) {
        var x = Math.random() * (WindowWidth/4), y = Math.random() * (WindowHeight/4);
        var destination = {x:x,y:y}, self = this;

        var randomLocation = self.relativePosition(self.exactPosition(item), self.randomDestination());
        item.spring({ tension: 5, damping: 5 }).to(randomLocation.x, randomLocation.y).start();

        return $interval(function() {
            var randomLocation = self.relativePosition(self.exactPosition(item), self.randomDestination());
            item.spring({ tension: 5, damping: 5 }).to(randomLocation.x, randomLocation.y).start();
        }, 750);
    };

    this.randomDestination = function() {
        var x = Math.random() * WindowWidth;
        var y = Math.random() * WindowHeight;
        return {x:x,y:y};
    };

    this.relativePosition = function(vehicle,destination) {
        if (!destination || !vehicle) {
            return;
        }
        return {x: destination.x - vehicle.x, y: destination.y - vehicle.y};
    };

    this.sendTo = function(vehicle, destination, offset) {
        var vehiclePosition = this.exactPosition(vehicle);
        var destinationPosition = this.exactPosition(destination);

        var toPosition = this.relativePosition(vehiclePosition, destinationPosition);
        var distanceMoved = _.pick(vehicle._position, ['x', 'y']);

        toPosition = {x: toPosition.x + distanceMoved.x, y: toPosition.y + distanceMoved.y};

        vehicle.spring({tension : 30, damping: 10})
            .to({x: (toPosition.x+(offset.x||0)), y:(toPosition.y+(offset.y||0))}).start();
    };
});