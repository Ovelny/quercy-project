(function () {
    var app = angular.module('quercy-back');

    app.directive('sidemenu', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/back-office/partials/sidemenu.html'
        }

    });

})();