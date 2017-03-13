(function () {
    angular.module('quercy-back')
        .controller('visitreport.controller', ['$scope', '$routeParams', '$location', 'customers.datacontext', 
                    'adverts.datacontext', 'Notification',
            function ($scope, $routeParams, $location, datacontext, advertsdatacontext, Notification) {

                var report_id = $routeParams["report_id"];
                var customer_id = $routeParams["customer_id"];
                $scope.report = {};
                $scope.customer = {};
                $scope.property = {};  

                $scope.report_date = new Date();              

                function main(){
                    datacontext.getCustomer(customer_id)
                        .then(function (res) {
                            $scope.customer = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    if (report_id == "creation") {
                        $scope.report = {
                            "date": "",
                            "comments": "",
                            "customer": customer_id,
                            "prop": 0
                        };
                        if (window.sessionStorage["selectedProperty"] !== undefined){
                            advertsdatacontext.getProperty(window.sessionStorage["selectedProperty"])
                                .then(function (res) {
                                    $scope.property = res.data;
                                    $scope.report.prop = $scope.property.id;
                                })
                                .catch(function (err) {
                                    console.log(err);
                                })
                                .finally(function(){
                                    delete window.sessionStorage["selectedProperty"];
                                });
                        }
                    } else {
                        datacontext.getVisitReport(report_id)
                            .then(function (res) {
                                $scope.report = res.data;
                                $scope.report_date = new Date($scope.report.date);
                                advertsdatacontext.getProperty($scope.report.prop)
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
                    $scope.report.date = $scope.report_date.toISOString().substring(0, 10);
                    if ($scope.report.id) {
                        // Fiche existante
                        datacontext.saveVisitReport($scope.report)
                            .then(function (res) {
                                Notification.success("Modifications enregistrées !");
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                    } else {
                        // Nouvelle fiche
                        datacontext.createVisitReport($scope.report)
                            .then(function (res) {
                                Notification.success("Compte-rendu enregistré !");
                                $location.path('client/' + customer_id);
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                        
                    }
                }

                $scope.delete = function(){
                    if (prompt("Voulez-vous vraiment supprimer définitivement ce compte-rendu de visite ? Tapez OUI pour confirmer.","") == "OUI") { 
                        datacontext.deleteVisitReport($scope.report.id)
                            .then(function (res) {
                                Notification.success("Compte-rendu supprimé.");
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