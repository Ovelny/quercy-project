(function () {
    angular.module('quercy-back')
        .controller('customerslist.controller', ['$scope', 'customers.datacontext', '$location',
            function ($scope, datacontext, $location) {

                $scope.list = [];
                $scope.filterText = "";

                $scope.sortparams = {
                    "orderby": "id",
                    "asc": true,
                    "onsort": function(){
                        $scope.refreshList()
                    }
                }

                $scope.goToCustomer = function(customer_id){
                    $location.path('client/' + customer_id);
                }

                $scope.newCustomer = function(){
                    $location.path('client/creation');
                }

                $scope.refreshList = function(){
                    datacontext.getCustomers($scope.filterText, $scope.sortparams.orderby, $scope.sortparams.asc)
                        .then(function (res) {
                            $scope.list = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

                $scope.refreshList();
            }]);
})();