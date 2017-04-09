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
            templateUrl: 'js/front-office/partials/best-selection.html',
            controller: ["$scope", "datacontext",
                function ($scope, datacontext) {
                    $scope.displayAdvertType = true;
                    $scope.favorites = [];
                    $scope.displayAdvertType = true;
                    datacontext.getFavoriteAdverts()
                        .then(function (res) {
                            $scope.favorites = res.data;
                            for (var i = 0; i < $scope.favorites.length; i++) {
                                var pics = $scope.favorites[i].pictures.sort(function(a, b){
                                    return a.display_order - b.display_order;
                                });
                                $scope.favorites[i].displaypic = pics[0].url;
                            }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }]
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

    app.directive('ourCompany', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/partials/our-company.html',
            controller: ['$scope','datacontext', '$rootScope', function ($scope, datacontext, $rootScope) {
                $scope.texte_fr = "";
                $scope.texte_en = "";

                datacontext.getPresentationText()
                    .then(function (res) {
                        $scope.texte_fr = res.data.company_presentation_fr;
                        $scope.texte_en = res.data.company_presentation_en;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        ]
    }});

    app.directive('presentation', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/front-office/views/presentation.html'
        }

    });
    
    app.directive('advertTextbox', ["$rootScope", "$location", function ($rootScope, $location) {
        return {
            restrict: 'E',
            scope: {
                advert: "=",
                displayAdvertType: "="
            },
            controller: function($scope){
                $scope.baseImgUrl = $rootScope.baseImgUrl;
                $scope.language = $rootScope.language;

                $scope.goToAdvert = function(){
                    $location.path("bien/" + $scope.advert.id);
                }
            },
            templateUrl: 'js/front-office/partials/advert-textbox.html'
        }

    }]);

})();