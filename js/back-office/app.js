(function () {
    var app = angular.module('quercy-back',  ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { 
                templateUrl: 'js/back-office/views/welcome.html' 
            })
            .when('/presentation', { 
                templateUrl: 'js/back-office/views/presentation.html' 
            })
            .when('/biens/:advert_type', { 
                controller: 'advertslist.controller',
                templateUrl: 'js/back-office/views/advertslist.html' 
            })
            .when('/coups-de-coeur', { 
                templateUrl: 'js/back-office/views/coupsdecoeur.html' 
            })
            .when('/annonce/:advert_id', {
                controller: 'advertdetail.controller',
                templateUrl: 'js/back-office/views/advertdetail.html' 
            })
            .otherwise({ redirectTo: '/' });

    }]);
})();