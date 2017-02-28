(function () {
    var app = angular.module('front-directives', []);

    app.directive('jumbotron', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/jumbotron.html'
        }

    });

    app.directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/navbar.html'
        }

    });

    app.directive('bestSelection', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/best-selection.html'
        }

    });

    app.directive('companyLocation', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/company-location.html'
        }

    });

    app.directive('footer', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/footer.html'
        }

    });

})();