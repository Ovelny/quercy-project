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
    
    app.directive('menuToggle', [function(){
       return {
           restrict: 'A',
           link: function(scope, element, attributes){
                element.bind('click', function() {
                    var elem = document.getElementById("sidebar-wrapper");
                    left = window.getComputedStyle(elem,null).getPropertyValue("left");
                    if (left == "250px")
                        document.getElementsByClassName("sidebar-toggle")[0].style.left="-250px";
                    else if (left == "-250px")
                        document.getElementsByClassName("sidebar-toggle")[0].style.left="250px";
                });
           }
       }
    }])

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
                    if ($scope.sortfield != $scope.params.orderby)
                        $scope.params.orderby = $scope.sortfield;
                    else
                        $scope.params.asc = !$scope.params.asc;
                    $scope.params.onsort($scope.sortfield);
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