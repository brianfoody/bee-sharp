angular.module('bee-sharp').controller('MainController', function(BeeKeeperService) {
    this.beesKilled = function() {
        return BeeKeeperService.successfulClicks;
    };

    this.shotsLeft = function() {
        return 10 - BeeKeeperService.clickOffset();
    };

    this.gameInProgress = function() {
        return BeeKeeperService.clickOffset() < 10 && !BeeKeeperService.beesAreAllHome();
    };

    this.gameLost = function() {
        return BeeKeeperService.clickOffset() >= 10 && !BeeKeeperService.beesAreAllHome();
    };

    this.gameWon = function() {
        return BeeKeeperService.clickOffset() < 10 && BeeKeeperService.beesAreAllHome();
    };
});