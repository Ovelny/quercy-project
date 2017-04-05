(function () {
    var app = angular.module('quercy-front', ['front-directives', 'front-controllers', 'ngRoute', 'pascalprecht.translate']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'js/front-office/views/welcome.html' })
            .when('/presentation', { templateUrl: 'js/front-office/views/presentation.html' })
            .when('/vente', { templateUrl: 'js/front-office/views/vente.html' })
            .when('/location', { templateUrl: 'js/front-office/views/location.html' })
            .when('/coups-de-coeur', { templateUrl: 'js/front-office/views/coups-de-coeur.html' })
            .when('/estimation', { 
                templateUrl: 'js/front-office/views/estimation.html',
                controller: 'estimationController' })
            .when('/contact', { templateUrl: 'js/front-office/views/contact.html' })
            .otherwise({ redirectTo: '/' });



    }]).run(['$rootScope', 
        function ($rootScope) {

            $rootScope.baseUrl = "http://127.0.0.1:8000/api/";
         
         
        }]);;
})();