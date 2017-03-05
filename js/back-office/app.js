(function () {
    var app = angular.module('quercy-back', ['ngRoute', 'ngCookies']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                // templateUrl: 'js/back-office/views/login.html'
                templateUrl: 'js/back-office/views/welcome.html' 
            })
            .when('/login', {
                controller: 'login.controller',
                templateUrl: 'js/back-office/views/login.html'
            })
            .when('/accueil', {
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

        }])
        .run(['$rootScope', '$location', '$http', '$cookies', 
        function ($rootScope, $location, $http, $cookies) {

            $rootScope.displayMenu = function(){
                return $location.path() != '/login';
            }
            
        }]);
})();