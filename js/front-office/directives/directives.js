(function () {
    var app = angular.module('front-directives', []);

    app.directive('jumbotron', function () {
        return {
            restrict: 'E',
            templateUrl: 'jumbotron.html'
        }

    });

    app.directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'navbar.html'
        }

    });

    app.directive('best-selection', function () {
        return {
            restrict: 'E',
            templateUrl: 'best-selection.html'
        }

    });

    app.directive('company-location', function () {
        return {
            restrict: 'E',
            templateUrl: 'company-location.html'
        }

    });

    app.directive('footer', function () {
        return {
            restrict: 'E',
            templateUrl: 'footer.html'
        }

    });

})();