(function () {
    angular.module('quercy-back')
        .controller('login.controller', ['$scope', '$location',
            function ($scope, $location) {

                $scope.login = function(){
                    $location.path('accueil');
                }
            }]);
})();