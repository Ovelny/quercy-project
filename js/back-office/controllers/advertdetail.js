(function () {
    angular.module('quercy-back')
        .controller('advertdetail.controller', ['$scope', '$routeParams', 'adverts.datacontext',
            function ($scope, $routeParams, datacontext) {

                var advert_id = $routeParams["advert_id"];
                $scope.advert = {};
                $scope.advert_type = "";

                datacontext.getAdvert(advert_id)
                    .then(function (res) {
                        console.log(res);
                        $scope.advert = res.data;
                        $scope.advert_type = $scope.advert.advert_type == "V" ? "vente" : "location";
                        // Champs de type "decimal" sont renvoyés en chaine, donc convertion
                        $scope.advert.price = Number($scope.advert.price);
                        $scope.advert.living_surface = Number($scope.advert.price);
                        $scope.advert.total_surface = Number($scope.advert.price);
                        $scope.advert.energy_consumption = Number($scope.advert.price);
                        $scope.advert.gas_emission = Number($scope.advert.price);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

            }]);

})();