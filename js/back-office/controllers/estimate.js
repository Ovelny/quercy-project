(function () {
    angular.module('quercy-back')
        .controller('estimate.controller', ['$scope', '$routeParams', '$location', 'customers.datacontext', 
                    'adverts.datacontext', 'Notification',
            function ($scope, $routeParams, $location, datacontext, advertsdatacontext, Notification) {

                var estimate_id = $routeParams["estimate_id"];
                var customer_id = $routeParams["customer_id"];
                $scope.estimate = {};
                $scope.customer = {};
                $scope.property = {};  

                $scope.request_date = new Date();              
                $scope.creation_date = new Date();              

                function main(){
                    datacontext.getCustomer(customer_id)
                        .then(function (res) {
                            $scope.customer = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    if (estimate_id == "creation") {
                        $scope.estimate = {
                            "request_date": "",
                            "creation_date": "",
                            "estimated_amount": 0,
                            "customer": customer_id,
                            "prop": 0
                        };
                        if (window.sessionStorage["selectedProperty"] !== undefined && window.sessionStorage["selectedProperty"] != ""){
                            advertsdatacontext.getProperty(window.sessionStorage["selectedProperty"])
                                .then(function (res) {
                                    $scope.property = res.data;
                                    $scope.estimate.prop = $scope.property.id;
                                })
                                .catch(function (err) {
                                    console.log(err);
                                })
                                .finally(function(){
                                    delete window.sessionStorage["selectedProperty"];
                                });
                        }
                    } else {
                        datacontext.getEstimate(estimate_id)
                            .then(function (res) {
                                $scope.estimate = res.data;
                                $scope.estimate.estimated_amount = Number($scope.estimate.estimated_amount); // Champs de type "decimal" sont renvoyés en chaine, donc convertion
                                $scope.request_date = new Date($scope.estimate.request_date); 
                                if ($scope.estimate.creation_date != null)
                                    $scope.creation_date = new Date($scope.estimate.creation_date);
                                advertsdatacontext.getProperty($scope.estimate.prop)
                                    .then(function (res) {
                                        $scope.property = res.data;
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    });
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                }

                main();


                $scope.save = function(){
                    $scope.estimate.request_date = $scope.request_date.toISOString().substring(0, 10);
                    $scope.estimate.creation_date = $scope.creation_date.toISOString().substring(0, 10);
                    if ($scope.estimate.id) {
                        // Devis existant
                        datacontext.saveEstimate($scope.estimate)
                            .then(function (res) {
                                Notification.success("Modifications enregistrées !");
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                    } else {
                        // Nouveau devis
                        datacontext.createEstimate($scope.estimate)
                            .then(function (res) {
                                Notification.success("Devis enregistré !");
                                $location.path('client/' + customer_id);
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                    }
                }

                $scope.delete = function(){
                    if (prompt("Voulez-vous vraiment supprimer définitivement ce devis ? Tapez OUI pour confirmer.","") == "OUI") { 
                        datacontext.deleteEstimate($scope.estimate.id)
                            .then(function (res) {
                                Notification.success("Devis supprimé.");
                                $location.path('client/' + customer_id);
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de la suppression.");
                                console.log(err);
                            });
                    }
                }

                $scope.defineProperty = function(){
                    window.sessionStorage.setItem("returnTo", $location.path());
                    $location.path('annonces').search("mode", "selection");
                }

                $scope.back = function(){
                    $location.path('client/' + customer_id);
                }

            }]);
})();