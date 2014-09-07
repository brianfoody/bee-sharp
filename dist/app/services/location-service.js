angular.module('bee-sharp').service('LocationService', function() {
    this.distanceFrom = function(position1, position2) {
        var vector = new Impulse.Vector(position1.x - position2.x, position1.y - position2.y);
        return vector.norm();
    };

    this.getDistance = function(object) {
        return _.pick(object._position, ['x', 'y']);
    };

    this.areWithin = function(p1, p2, threshold) {
		console.log("are within");
		console.log(p1);
		console.log(p2);
		console.log(threshold);
		console.log(this.distanceFrom(p1,p2));
        return this.distanceFrom(p1,p2) < threshold;
    };
});