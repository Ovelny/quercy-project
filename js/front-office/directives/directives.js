(function () {
    var app = angular.module('front-directives', []);

    app.directive('jumbotron', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/jumbotron.html'
        }

    });

    app.directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/navbar.html'
        }

    });

    app.directive('best-selection', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/best-selection.html'
        }

    });

    app.directive('company-location', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/company-location.html'
        }

    });

    app.directive('footer', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/footer.html'
        }

    });

})();