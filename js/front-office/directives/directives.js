(function () {
    var app = angular.module('front-directives', []);

    app.directive('jumbotron', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/jumbotron.html'
        }

    });

    app.directive('navbar', ["$translate", "$rootScope", function ($translate, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/navbar.html',
            controller: function($scope){
                
                $scope.toggleLanguage = function(){
                    if ($rootScope.language == "fr") {
                        $translate.use("en");
                        $rootScope.language = "en";
                    } else {
                        $translate.use("fr");
                        $rootScope.language = "fr";
                    }
                };
            }
        }

    }]);

    app.directive('bestSelection', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/best-selection.html'
        }

    });

    app.directive('companyLocation', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/company-location.html'
        }

    });

    app.directive('companyFooter', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/company-footer.html'
        }

    });

    app.directive('meetTheTeam', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/meet-the-team.html'
        }

    });

    app.directive('presentation', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/presentation.html'
        }

    });

    app.directive('recherche', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/recherche.html'
        }

    });

    app.directive('resultat', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/resultat.html'
        }

    });

})();