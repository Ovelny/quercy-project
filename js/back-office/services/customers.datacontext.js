(function () {
    var app = angular.module('quercy-back');

    app.service('customers.datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getCustomer: getCustomerImpl,
            getCustomers: getCustomersImpl,
            createCustomer: createCustomerImpl,
            saveCustomer: saveCustomerImpl,
            deleteCustomer: deleteCustomerImpl
        }

        function getCustomerImpl(id){
            return $http.get(baseUrl + "customers/" + id + "/");
        }

        function getCustomersImpl(filter, orderby, orderasc) {
            var ordering = (orderasc ? '' : '-') + orderby;
            return $http.get(baseUrl + "customers/?ordering=" + ordering);
        }

        function saveCustomerImpl(customer){
            var id = customer.id;
            var data = customer;
            return $http.put(baseUrl + "customers/"+id+"/", data);
        }

        function createCustomerImpl(customer){
            delete customer.id;
            return $http.post(baseUrl + "customers/", customer);
        }

        function deleteCustomerImpl(id){
            return $http.delete(baseUrl + "customers/" + id + "/");
        }

        return service;
    }]);
})();