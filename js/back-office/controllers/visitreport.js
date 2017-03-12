(function () {
    angular.module('quercy-back')
        .controller('visitreport.controller', ['$scope', '$routeParams', '$location', 'customers.datacontext', 
                    'adverts.datacontext', 'Notification',
            function ($scope, $routeParams, $location, datacontext, advertsdatacontext, Notification) {

                var report_id = $routeParams["report_id"];
                $scope.report = {};
                $scope.customer = {};
                $scope.property = {};                

                function main(){
                    if (report_id == "creation") {
                        // $scope.report = {
                        //     "date": "",
                        //     "comments": "",
                        // };
                    } else {
                        datacontext.getVisitReport(report_id)
                            .then(function (res) {
                                $scope.report = res.data;
                                datacontext.getCustomer($scope.report.customer)
                                    .then(function (res) {
                                        $scope.customer = res.data;
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    });
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

                $scope.back = function(){
                    $location.path('client/' + $scope.customer.id);
                }

            }]);
})();