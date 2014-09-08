angular.module('bee-sharp').service('BeeKeeperService', function($interval, $timeout, ImpulseService, LocationService, WindowHeight) {
    this.bees = [];
    this.clicks = 0;
    this.successfulClicks = 0;

    var that = this, HIVE_OFFSET = {x:35, y:60};

    this.beeHeight = WindowHeight / 20;

    this.beesAreBuzzing = function() {
        if (_.isEmpty(this.bees)) { return true; } // wait for initialisation
        return (this.beesInHive()||0) + (this.deadBees()||0) < this.bees.length;
    };

    this.beesInHive = function() {
        return _.where(this.bees, {inHive: true}).length;
    };

    this.deadBees = function() {
        return _.where(this.bees, {dead: true}).length;
    };

    this.registerClick = function(position) {
        this.clicks +=1;
        _.each(this.bees, function(bee) {
            if (bee.clicked) {return;}

            var beePosition = ImpulseService.exactPosition(bee);
            if (LocationService.areWithin(position, beePosition, WindowHeight/10)) {
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
