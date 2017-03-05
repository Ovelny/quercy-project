(function () {
    angular.module('quercy-back')
        .controller('advertdetail.controller', ['$scope', '$routeParams', 'adverts.datacontext', 'Notification',
            function ($scope, $routeParams, datacontext, Notification) {

                var advert_id = $routeParams["advert_id"];
                $scope.advert = {};
                $scope.property_types = [];
                $scope.heating_types = [];
                $scope.kitchen_types = [];

                function main(){
                    datacontext.getAdvert(advert_id)
                        .then(function (res) {
                            // console.log(res.data);
                            $scope.advert = res.data;
                            // Champs de type "decimal" sont renvoyés en chaine, donc convertion
                            $scope.advert.price = Number($scope.advert.price);
                            $scope.advert.living_surface = Number($scope.advert.living_surface);
                            $scope.advert.total_surface = Number($scope.advert.total_surface);
                            $scope.advert.energy_consumption = Number($scope.advert.energy_consumption);
                            $scope.advert.gas_emission = Number($scope.advert.gas_emission);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });

                    datacontext.getPropertyTypes()
                        .then(function (res) {
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
                }

                main();

                $scope.save = function(){
                    datacontext.saveAdvert($scope.advert)
                        .then(function (res) {
                            Notification.success("Modifications enregistrées !");
                        })
                        .catch(function (err) {
                            Notification.error("Une erreur est survenue lors de l'enregistrement.");
                            console.log(err);
                        });
                }

            }]);

})();