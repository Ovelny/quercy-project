(function () {
    angular.module('quercy-back')
        .controller('login.controller', ['$scope', '$location', 'authentication.service', 
        function ($scope, $location, authenticationService) {
            
            $scope.username = "";
            $scope.password = "";
            $scope.errorMessage = "";

            authenticationService.clearAuth(); // Log out user on page load.

            $scope.login = function(){
                if ($scope.username == "" || $scope.password == "")
                    return;

                authenticationService.login($scope.username, $scope.password)
                    .then(function (res) {
                        if (res.data.token) {
                            authenticationService.setAuth($scope.username, res.data.token);
                            $location.path('accueil');
                        }
                    })
                    .catch(function (err) {
                        // Une authentification échouée (mauvais login/pwd) donne un 400.
                        $scope.errorMessage = "L'authentification a échoué. Vérifiez que vous avez entré les bonnes informations.";
                        console.log(err);
                    });
            }
        }]);
})();