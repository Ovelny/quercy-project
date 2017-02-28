(function () {
    var app = angular.module('quercy-back',  ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { 
                templateUrl: 'js/back-office/views/welcome.html' 
            })
            .when('/biens/:advert_type', { 
                controller: 'biensenvente.controller',
                templateUrl: 'js/back-office/views/advertslist.html' 
            })
            .when('/coups-de-coeur', { 
                templateUrl: 'js/back-office/views/welcome.html' 
            })
            .otherwise({ redirectTo: '/' });

    }]);
})();