(function () {
    var app = angular.module('quercy-front', ['front-directives', 'front-controllers', 'ngRoute', 'pascalprecht.translate']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'js/front-office/views/welcome.html' })
            .when('/presentation', { 
                templateUrl: 'js/front-office/views/presentation.html',
                controller: 'presentationController' })
            .when('/liste/:typeliste', { 
                templateUrl: 'js/front-office/views/listebiens.html',
                controller: 'listeController' })
            .when('/estimation', { 
                templateUrl: 'js/front-office/views/estimation.html',
                controller: 'estimationController' })
            .when('/contact', { templateUrl: 'js/front-office/views/contact.html' })
            .otherwise({ redirectTo: '/' });

    }]).run(['$rootScope', 
        function ($rootScope) {
            $rootScope.language = "en";
            $rootScope.baseUrl = "http://127.0.0.1:8000/api/";
         
         
        }]);;
})();