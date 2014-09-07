angular.module('bee-sharp').service('BeeKeeperService', function($interval, $timeout, ImpulseService, LocationService, WindowHeight) {
    this.hive, this.bees = [], this.clicks = 0, this.successfulClicks = 0;

    var that = this, HIVE_OFFSET = {x:35, y:60};

    this.beeHeight = WindowHeight / 20;

    this.registerClick = function(position) {
        this.clicks +=1;
        _.each(this.bees, function(bee) {
            if (bee.clicked) {return;}

            var beePosition = ImpulseService.exactPosition(bee);
            if (LocationService.areWithin(position, beePosition, 25)) {
                $interval.cancel(bee.interval);
                bee.scurrying=true;
                ImpulseService.sendTo(bee, that.hive, HIVE_OFFSET);
            }
        });
    };

    this.registerSuccessfulClick = function() {
        this.successfulClicks +=1;
    };

    this.clickOffset = function() {
        return this.clicks - this.successfulClicks;
    };

    this.beesAreAllHome = function() {
        return this.bees.length > 0 && this.bees.length <= this.successfulClicks;
    };

    this.registerHive = function(hive) {
        this.hive = hive;
    };

    this.registerBee = function(item) {
        item.clicked = false;
        item.interval = ImpulseService.moveRandomnly(item);

        return this.bees.push(item);
    };

    this.tagBee = function(index, item) {
        item.clicked = true;
        $interval.cancel(item.interval);
    };
});
