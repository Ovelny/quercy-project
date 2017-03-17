(function () {
    var app = angular.module('quercy-back', ['ngRoute', 'ngCookies', 'ui-notification', 'angularFileUpload']);

    app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
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
                controller: 'presentation.controller',
                templateUrl: 'js/back-office/views/presentation.html'
            })
            .when('/annonces', {
                controller: 'advertslist.controller',
                templateUrl: 'js/back-office/views/advertslist.html'
            })
            .when('/coups-de-coeur', {
                controller: 'favoriteslist.controller',
                templateUrl: 'js/back-office/views/favoriteslist.html'
            })
            .when('/annonce/:advert_id', {
                controller: 'advertdetail.controller',
                templateUrl: 'js/back-office/views/advertdetail.html'
            })
            .when('/annonce/:advert_id/photos', {
                controller: 'advertphotos.controller',
                templateUrl: 'js/back-office/views/advertphotos.html'
            })
            .when('/clients', {
                controller: 'customerslist.controller',
                templateUrl: 'js/back-office/views/customerslist.html'
            })
            .when('/client/:customer_id', {
                controller: 'customerdetail.controller',
                templateUrl: 'js/back-office/views/customerdetail.html'
            })
            .when('/client/:customer_id/compte-rendu/:report_id', {
                controller: 'visitreport.controller',
                templateUrl: 'js/back-office/views/visitreport.html'
            })
            .when('/client/:customer_id/devis/:estimate_id', {
                controller: 'estimate.controller',
                templateUrl: 'js/back-office/views/estimate.html'
            })
            .otherwise({ redirectTo: '/' });


            $httpProvider.interceptors.push(function($q, $location) {
                return {
                    'responseError': function(rejection) {
                        if (rejection.status == 401){
                            if (rejection.data.detail == "Token has expired")
                                window.sessionStorage.setItem('expired', true);
                            $location.path('/login');
                        }
                        return $q.reject(rejection);
                    }
                };
            });
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

            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var loggedIn = ($rootScope.currentUser !== undefined);
                var path = $location.path();
                if (!loggedIn && path != '/login') {
                    $location.path('/login').search("returnTo", path);
                }
            });
        }]);
})();