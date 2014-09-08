angular.module('bee-sharp').directive('clickTracker', function($timeout, BeeKeeperService) {
    return {
        restrict: 'A',
        scope: {},
        replace: true,
        controller: function($scope, $element, $attrs) {
            $element.on('mousedown', function(event) {
                var position = {
                    x: (event.x||event.clientX),
                    y: (event.y||event.clientY)
                };
                $timeout(function() {
                    BeeKeeperService.registerClick(position);
                }, 10);
            });
        }
    };
});