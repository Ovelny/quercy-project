(function () {
    var app = angular.module('quercy-back');

    app.directive('sidemenu', function ($location) {
        return {
            restrict: 'E',
            templateUrl: 'js/back-office/partials/sidemenu.html',
            controller: function ($scope) {
                $scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1) || '';
                    return page === currentRoute ? 'active' : '';
                };
            }
        }
    });
})();