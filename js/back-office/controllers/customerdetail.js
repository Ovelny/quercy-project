(function () {
    angular.module('quercy-back')
        .controller('customerdetail.controller', ['$scope', '$routeParams', '$location', 'customers.datacontext', 'Notification',
            function ($scope, $routeParams, $location, datacontext, Notification) {

                var customer_id = $routeParams["customer_id"];
                $scope.customer = {};

                function main(){
                    if (customer_id == "creation") {
                        $scope.customer = {
                            "last_name": "",
                            "first_name": "",
                            "address": "",
                            "postal_code": "",
                            "city": "",
                            "phone_number":"",
                            "mobile_phone":"",
                            "email_address":""
                        };
                    } else {
                        datacontext.getCustomer(customer_id)
                            .then(function (res) {
                                $scope.customer = res.data;
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }

                }

                main();

                $scope.save = function(){
                    if ($scope.customer.id) {
                        // Fiche existante
                        datacontext.saveCustomer($scope.customer)
                            .then(function (res) {
                                Notification.success("Modifications enregistrées !");
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                    } else {
                        // Nouvelle fiche
                        datacontext.createCustomer($scope.customer)
                            .then(function (res) {
                                Notification.success("Fiche créée !");
                                $scope.customer.id = res.data.id;
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                    }
                }
                
                $scope.delete = function(){
                    if (prompt("Voulez-vous vraiment supprimer définitivement cette fiche client, tous les devis, et tous les compte-rendus de visite associés ? Tapez OUI pour confirmer.","") == "OUI") { 
                        datacontext.deleteCustomer($scope.customer.id)
                            .then(function (res) {
                                Notification.success("Fiche supprimée.");
                                $location.path('clients');
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de la suppression.");
                                console.log(err);
                            });
                    }
                }
                

            }]);

})();