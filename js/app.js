(function () {
    var app = angular.module('quercy-front', ['front-directives', 'ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {})
            .when('/presentation', {})
            .when('/vente', {})
            .when('/location', {})
            .when('/coups-de-coeur', {})
            .when('/estimation', {})
            .when('/contact', {})



    }]);



})();