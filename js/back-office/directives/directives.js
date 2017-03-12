(function () {
    var app = angular.module('quercy-back');

    app.directive('sidemenu', ['$location', function ($location) {
        return {
            restrict: 'E',
            templateUrl: 'js/back-office/partials/sidemenu.html',
            controller: function ($scope) {
                $scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1) || '';
                    return page === currentRoute ? 'active' : '';
                };
            }
        }
    }]);
    
    app.directive("sortable", [function() {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                sortfield: "=sortable",
                params: "=sortParams"
            },
            controller: function($scope){
                $scope.onclick = function(){
                    $scope.params.sortfct($scope.sortfield);
                }
            },
            templateUrl: 'js/back-office/partials/sortable.html'
        }
    }]);

    app.directive("fileinput", [function() {
        return {
            scope: {
                fileinput: "=",
                filepreview: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    scope.fileinput = changeEvent.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.filepreview = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(scope.fileinput);
                });
            }
        }
    }]);
})();