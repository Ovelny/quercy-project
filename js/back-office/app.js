(function () {
    var app = angular.module('quercy-back', ['ngRoute', 'ngCookies', 'ui-notification']);

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
                controller: 'favoriteslist.controller',
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

            $rootScope.baseUrl = "http://127.0.0.1:8000/api/";

            $rootScope.displayMenu = function(){
                return $location.path() != '/login';
            }
            
            // keep user logged in after page refresh
            $rootScope.currentUser = $cookies.getObject('currentUser');
            if ($rootScope.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Token ' + $rootScope.currentUser.token; 
            }

            // $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var loggedIn = ($rootScope.currentUser !== undefined);
                if (!loggedIn && $location.path() != '/login') {
                    $location.path('/login');
                }
            });
        }]);
})();