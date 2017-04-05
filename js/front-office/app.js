(function () {
    var app = angular.module('quercy-front', ['front-directives', 'front-controllers', 'ngRoute', 'pascalprecht.translate']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'js/front-office/views/welcome.html' })
<<<<<<< HEAD
            .when('/presentation', { templateUrl: 'js/front-office/views/presentation.html' })
            .when('/recherche', { templateUrl: 'js/front-office/views/recherche.html' })
            .when('/liste/:type', {
=======
            .when('/presentation', { 
                templateUrl: 'js/front-office/views/presentation.html',
                controller: 'presentationController' })
            .when('/liste/:typeliste', { 
>>>>>>> 5ee460ad6ecf5bd01531e0b8f0e0f8969306ff3c
                templateUrl: 'js/front-office/views/listebiens.html',
                controller: 'listeController'
            })
            .when('/estimation', {
                templateUrl: 'js/front-office/views/estimation.html',
                controller: 'estimationController'
            })
            .when('/contact', { templateUrl: 'js/front-office/views/contact.html' })
            .otherwise({ redirectTo: '/' });

<<<<<<< HEAD


=======
>>>>>>> 5ee460ad6ecf5bd01531e0b8f0e0f8969306ff3c
    }]).run(['$rootScope',
        function ($rootScope) {
            $rootScope.language = "fr";
            $rootScope.baseUrl = "http://127.0.0.1:8000/api/";


        }]);;
})();