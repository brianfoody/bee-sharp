angular.module('bee-sharp').directive('hive', function(BeeKeeperService) {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, $element) {

            var hive = $element.find('img')[0];

            var item = Impulse(hive).style({
                translate:  function(x, y) {
                    return x + 'px, ' + y + 'px'
                }
            });

            BeeKeeperService.registerHive(item);
        },
        templateUrl: 'app/directives/hive.html'
    };
});