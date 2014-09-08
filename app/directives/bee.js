angular.module('bee-sharp').directive('bee', function($timeout, ImpulseService, BeeKeeperService, WindowHeight, WindowWidth) {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, $element, $attrs) {
            $($element).css('height',  BeeKeeperService.beeHeight)
                       .css('top', (Math.random() * WindowHeight) - BeeKeeperService.beeHeight)
                       .css('left', (Math.random() * WindowWidth) - 25);

            var bee = Impulse($element).style({
                'translate': function(x, y) {
                    return x + 'px, ' + y + 'px';
                },
                'scale': function(x,y) {
                    if (bee.scurrying && ! bee.inHive) {
                        var distance = ImpulseService.distanceFrom(bee, BeeKeeperService.hive);

                        if (distance < 90) {
                            bee.inHive = true;
                            $element.remove();
                        } else {
                            return Math.log(Math.log(distance)) - 1;
                        }
                    }
                    return 1;
                }
            });

            bee.drag(ImpulseService.screenBoundry()).on('start', function() {
                bee.dead = true;
                BeeKeeperService.tagBee(index, bee);
                BeeKeeperService.registerSuccessfulClick(bee);
            });
            bee.drag().on('end', function() {
                $( $element ).animate({opacity: 0}, 500);
            });

            var index = BeeKeeperService.registerBee(bee);
        },
        controllerAs: 'beeCtrl',
        templateUrl: 'app/directives/bee.html'
    };
});