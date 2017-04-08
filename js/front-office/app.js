(function () {
    var app = angular.module('quercy-front', ['front-directives', 'front-controllers', 'ngRoute', 
            'pascalprecht.translate', 'bootstrapLightbox']);

    app.config(['$routeProvider', 'LightboxProvider', function ($routeProvider, LightboxProvider) {
        $routeProvider
            .when('/', { 
                templateUrl: 'js/front-office/views/welcome.html' 
            })
            .when('/recherche', { 
                templateUrl: 'js/front-office/views/recherche.html',
                controller: 'searchController'
            })
            .when('/presentation', { 
                templateUrl: 'js/front-office/views/presentation.html',
                controller: 'presentationController' 
            })
            .when('/liste/:typeliste', { 
                templateUrl: 'js/front-office/views/listebiens.html',
                controller: 'listeController'
            })
            .when('/bien/:id', { 
                templateUrl: 'js/front-office/views/detailbien.html',
                controller: 'detailController'
            })
            .when('/estimation', {
                templateUrl: 'js/front-office/views/estimation.html',
                controller: 'estimationController'
            })
            .when('/contact', { 
                templateUrl: 'js/front-office/views/contact.html',
                controller: 'contactController'
            })
            .otherwise({ redirectTo: '/' });

            
        // set a custom template (just to have $translates in there. basically a copy-paste of the original)
        LightboxProvider.templateUrl = 'js/front-office/partials/lightboxtemplate.html';

    }]).run(['$rootScope',
        function ($rootScope) {
            $rootScope.language = "fr";
            $rootScope.baseUrl = "http://127.0.0.1:8000/api/";
            $rootScope.baseImgUrl = "http://127.0.0.1:8000/media/";


        }]);;
})();