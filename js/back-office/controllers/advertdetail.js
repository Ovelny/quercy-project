(function () {
    angular.module('quercy-back')
        .controller('advertdetail.controller', ['$scope', '$routeParams', 'adverts.datacontext',
            function ($scope, $routeParams, datacontext) {

                var advert_id = $routeParams["advert_id"];
                $scope.advert = {};
                $scope.advert_type = "";
                $scope.property_types = [];
                $scope.heating_types = [];
                $scope.kitchen_types = [];

                datacontext.getAdvert(advert_id)
                    .then(function (res) {
                        console.log(res.data);
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

                datacontext.getPropertyTypes()
                    .then(function (res) {
                        console.log(res.data);
                        $scope.property_types = res.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                datacontext.getHeatingTypes()
                    .then(function (res) {
                        $scope.heating_types = res.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                datacontext.getKitchenTypes()
                    .then(function (res) {
                        $scope.kitchen_types = res.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

            }]);

})();